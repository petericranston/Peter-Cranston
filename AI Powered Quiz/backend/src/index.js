import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = process.env.PORT || 3001
const client = new Anthropic()

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const quizTool = {
  name: 'set_quiz_questions',
  description: 'Set the 10 quiz questions for the given topic',
  input_schema: {
    type: 'object',
    properties: {
      questions: {
        type: 'array',
        minItems: 10,
        maxItems: 10,
        items: {
          type: 'object',
          required: ['q', 'options', 'correct', 'explain'],
          properties: {
            q:       { type: 'string', description: 'The question text' },
            options: { type: 'array', minItems: 4, maxItems: 4, items: { type: 'string' } },
            correct: { type: 'integer', minimum: 0, maximum: 3, description: 'Index of the correct option (0–3)' },
            explain: { type: 'string', description: 'One-sentence explanation of the correct answer' },
          },
        },
      },
    },
    required: ['questions'],
  },
}

app.post('/api/quiz', async (req, res) => {
  const { topic } = req.body
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'topic is required' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [quizTool],
      tool_choice: { type: 'any' },
      messages: [{
        role: 'user',
        content: `Generate 10 quiz questions about "${topic.trim()}". Mix difficulty levels and question lengths — include some short punchy questions and some longer ones so the layout is stress-tested. Use real, interesting, accurate facts.`,
      }],
    })

    const toolBlock = message.content.find(b => b.type === 'tool_use')
    if (!toolBlock) throw new Error('Claude did not return tool_use block')

    res.json({ questions: toolBlock.input.questions })
  } catch (err) {
    console.error('Quiz generation error:', err.message)
    res.status(500).json({ error: 'Failed to generate questions' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
