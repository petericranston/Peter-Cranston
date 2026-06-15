import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { createServer } from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;
const client = new Anthropic();

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const quizTool = {
  name: "set_quiz_questions",
  description: "Set the 10 quiz questions for the given topic",
  input_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        minItems: 10,
        maxItems: 10,
        items: {
          type: "object",
          required: ["q", "options", "correct", "explain"],
          properties: {
            q: { type: "string", description: "The question text" },
            options: {
              type: "array",
              minItems: 4,
              maxItems: 4,
              items: { type: "string" },
            },
            correct: {
              type: "integer",
              minimum: 0,
              maximum: 3,
              description:
                "Index into options[] of the single correct answer. Verify this matches before returning.",
            },
            explain: {
              type: "string",
              description:
                "One sentence explaining why the correct answer is right, citing a specific fact.",
            },
          },
        },
      },
    },
    required: ["questions"],
  },
};

async function generateQuestions(topic) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    tools: [quizTool],
    tool_choice: { type: "any" },
    system: `You are a quiz question writer. Rules:
- Every question must have exactly one unambiguously correct answer.
- The other three options must be plausible but clearly wrong to someone who knows the topic.
- Double-check that the 'correct' index (0–3) matches the right option in the array before outputting.
- Never use "all of the above", "none of the above", or negative phrasing like "which is NOT".
- State facts that were true as of 2024 — avoid questions about rapidly changing data (prices, records, rankings).`,
    messages: [
      {
        role: "user",
        content: `Generate 10 quiz questions about "${topic.trim()}". Before finalising each question, verify: (1) the answer at index 'correct' is definitely right, (2) no other option is also correct, (3) the question is unambiguous. Use real, accurate facts. Mix difficulty levels.`,
      },
    ],
  });
  const toolBlock = message.content.find((b) => b.type === "tool_use");
  if (!toolBlock) throw new Error("No tool_use block");
  return toolBlock.input.questions;
}

app.post("/api/quiz", async (req, res) => {
  const { topic } = req.body;
  if (!topic || typeof topic !== "string")
    return res.status(400).json({ error: "topic is required" });
  try {
    res.json({ questions: await generateQuestions(topic) });
  } catch (err) {
    console.error("Quiz generation error:", err.message);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

// ── Multiplayer rooms ─────────────────────────────────────────────────────────

const rooms = new Map(); // code → room
const socketRoom = new Map(); // socketId → code

const ROOM_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const MAX_PLAYERS = 10;
const READ_SECS = 8;
const QUESTION_SECS = 20;
const REVEAL_MS = 5000;
const ROOM_TTL_MS = 90 * 60 * 1000;

// Per-IP rate limit for room creation
const ipRateMap = new Map();
const IP_WINDOW = 60 * 60 * 1000;
const IP_MAX = 10;

function checkIpLimit(ip) {
  const now = Date.now();
  const e = ipRateMap.get(ip);
  if (!e || now > e.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + IP_WINDOW });
    return true;
  }
  if (e.count >= IP_MAX) return false;
  e.count++;
  return true;
}

function makeCode() {
  let c;
  do {
    c = Array.from(
      { length: 6 },
      () => ROOM_CHARS[Math.floor(Math.random() * ROOM_CHARS.length)],
    ).join("");
  } while (rooms.has(c));
  return c;
}

function sanitize(val, max) {
  return (
    String(val ?? "")
      .trim()
      .slice(0, max)
      .replace(/[<>&"]/g, "") || undefined
  );
}

function roomSnapshot(room, forId) {
  const q = room.quiz?.[room.questionIndex];
  let currentQuestion = null;
  if (q) {
    if (room.state === "reading") {
      currentQuestion = { q: q.q };
    } else if (room.state === "question") {
      currentQuestion = { q: q.q, options: q.options };
    } else if (room.state === "reveal" || room.state === "finished") {
      currentQuestion = {
        q: q.q,
        options: q.options,
        correct: q.correct,
        explain: q.explain,
      };
    }
  }
  return {
    code: room.code,
    hostId: room.hostId,
    myId: forId,
    myAnswer: room.players.get(forId)?.answer ?? null,
    players: [...room.players.entries()].map(([id, p]) => ({
      id,
      name: p.name,
      score: p.score,
      answered: p.answer !== null,
    })),
    state: room.state,
    questionIndex: room.questionIndex,
    totalQuestions: room.quiz?.length ?? 10,
    topic: room.topic,
    hue: room.hue,
    currentQuestion,
    timeLeft: room.timeLeft,
    answeredCount: [...room.players.values()].filter((p) => p.answer !== null)
      .length,
  };
}

function broadcast(room) {
  room.players.forEach((_, sid) =>
    io.to(sid).emit("room-update", roomSnapshot(room, sid)),
  );
}

function startReading(room) {
  room.state = "reading";
  room.players.forEach((p) => {
    p.answer = null;
  });
  broadcast(room);
  room.readingTimeout = setTimeout(() => {
    room.readingTimeout = null;
    startQuestion(room);
  }, READ_SECS * 1000);
}

function startQuestion(room) {
  room.state = "question";
  room.timeLeft = QUESTION_SECS;
  room.players.forEach((p) => {
    p.answer = null;
  });
  broadcast(room);
  room.timerInterval = setInterval(() => {
    room.timeLeft--;
    if (room.timeLeft <= 0) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      reveal(room);
    } else broadcast(room);
  }, 1000);
}

function reveal(room) {
  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }
  room.state = "reveal";
  const correct = room.quiz[room.questionIndex].correct;
  room.players.forEach((p) => {
    if (p.answer === correct) p.score++;
  });
  broadcast(room);
  room.revealTimeout = setTimeout(() => {
    room.revealTimeout = null;
    if (room.questionIndex < room.quiz.length - 1) {
      room.questionIndex++;
      startReading(room);
    } else {
      room.state = "finished";
      broadcast(room);
    }
  }, REVEAL_MS);
}

function destroyRoom(code) {
  const room = rooms.get(code);
  if (!room) return;
  clearInterval(room.timerInterval);
  clearTimeout(room.readingTimeout);
  clearTimeout(room.revealTimeout);
  clearTimeout(room.ttlTimeout);
  room.players.forEach((_, sid) => socketRoom.delete(sid));
  rooms.delete(code);
}

const io = new Server(httpServer, {
  cors: { origin: allowedOrigins },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  const ip = socket.handshake.address;

  socket.on("create-room", ({ nickname } = {}) => {
    if (socketRoom.has(socket.id)) return;
    if (!checkIpLimit(ip))
      return socket.emit("create-error", {
        message: "Too many rooms created recently. Try again in an hour.",
      });
    const name = sanitize(nickname, 20) || "Host";
    const code = makeCode();
    const room = {
      code,
      hostId: socket.id,
      players: new Map([[socket.id, { name, score: 0, answer: null }]]),
      state: "waiting",
      questionIndex: 0,
      quiz: null,
      topic: null,
      hue: 265,
      timeLeft: QUESTION_SECS,
      timerInterval: null,
      readingTimeout: null,
      revealTimeout: null,
      ttlTimeout: null,
    };
    rooms.set(code, room);
    socketRoom.set(socket.id, code);
    socket.join(code);
    socket.emit("room-joined", roomSnapshot(room, socket.id));
    room.ttlTimeout = setTimeout(() => destroyRoom(code), ROOM_TTL_MS);
  });

  socket.on("join-room", ({ code, nickname } = {}) => {
    if (socketRoom.has(socket.id))
      return socket.emit("join-error", { message: "Already in a room." });
    const room = rooms.get(
      String(code ?? "")
        .toUpperCase()
        .trim(),
    );
    if (!room)
      return socket.emit("join-error", {
        message: "Room not found. Check the code and try again.",
      });
    if (room.state !== "waiting")
      return socket.emit("join-error", {
        message: "This game has already started.",
      });
    if (room.players.size >= MAX_PLAYERS)
      return socket.emit("join-error", {
        message: "Room is full (10 players max).",
      });
    const name = sanitize(nickname, 20) || "Player";
    room.players.set(socket.id, { name, score: 0, answer: null });
    socketRoom.set(socket.id, room.code);
    socket.join(room.code);
    socket.emit("room-joined", roomSnapshot(room, socket.id));
    broadcast(room);
  });

  socket.on("start-game", async ({ topic, hue } = {}) => {
    const code = socketRoom.get(socket.id);
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id || room.state !== "waiting") return;
    const cleanTopic = sanitize(topic, 100);
    if (!cleanTopic)
      return socket.emit("start-error", { message: "Pick a topic first." });
    room.state = "generating";
    room.topic = cleanTopic;
    room.hue = typeof hue === "number" ? hue : 265;
    broadcast(room);
    try {
      room.quiz = await generateQuestions(cleanTopic);
      room.state = "countdown";
      broadcast(room);
      setTimeout(() => startReading(room), 3000);
    } catch (err) {
      console.error("MP quiz gen error:", err.message);
      room.state = "waiting";
      broadcast(room);
      socket.emit("start-error", {
        message: "Failed to generate questions. Try again.",
      });
    }
  });

  socket.on("submit-answer", ({ answerIndex } = {}) => {
    const room = rooms.get(socketRoom.get(socket.id));
    if (!room || room.state !== "question") return;
    const player = room.players.get(socket.id);
    if (!player) return;
    if (typeof answerIndex !== "number" || answerIndex < 0 || answerIndex > 3)
      return;
    player.answer = answerIndex;
    broadcast(room);
    if ([...room.players.values()].every((p) => p.answer !== null)) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      reveal(room);
    }
  });

  socket.on("disconnect", () => {
    const code = socketRoom.get(socket.id);
    if (!code) return;
    const room = rooms.get(code);
    if (!room) return;
    socketRoom.delete(socket.id);
    room.players.delete(socket.id);
    if (room.players.size === 0) {
      destroyRoom(code);
      return;
    }
    if (room.hostId === socket.id)
      room.hostId = room.players.keys().next().value;
    if (
      room.state === "question" &&
      [...room.players.values()].every((p) => p.answer !== null)
    ) {
      clearInterval(room.timerInterval);
      room.timerInterval = null;
      reveal(room);
    } else {
      broadcast(room);
    }
  });
});

httpServer.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
