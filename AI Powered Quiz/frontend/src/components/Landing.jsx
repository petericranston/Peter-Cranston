import { useState } from "react";
import { TOPICS } from "../data/topics.jsx";
import { ArrowRight, SparkIcon } from "../icons.jsx";

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 18, height: 18 }}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Landing({ onPickTopic, onCustom, onMultiplayer }) {
  const [custom, setCustom] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = custom.trim();
    if (t) onCustom(t);
  };

  return (
    <main className="screen landing">
      <header className="lp-header">
        <h1 className="lp-title">
          What do you feel like
          <br />
          quizzing more about?
        </h1>
        <p className="lp-tag">
          Pick a topic, or tell us what's on your mind — we'll write a fresh
          quiz on the spot.
        </p>
      </header>

      <section className="topic-grid" aria-label="Quiz topics">
        {TOPICS.map((t) => (
          <button
            key={t.name}
            className="topic-card"
            style={{ "--h": t.hue }}
            onClick={() => onPickTopic(t.name)}
            aria-label={`Start a ${t.name} quiz`}
          >
            <span className="topic-icon">{t.icon}</span>
            <span className="topic-body">
              <span className="topic-name">{t.name}</span>
              <span className="topic-blurb">{t.blurb}</span>
            </span>
            <span className="topic-chevron" aria-hidden="true">
              <ArrowRight />
            </span>
          </button>
        ))}
      </section>

      <form className="custom-row" onSubmit={submit}>
        <label htmlFor="custom-topic" className="custom-label">
          <SparkIcon className="custom-spark" />
          <span>Or choose on anything…</span>
        </label>
        <div className="custom-field">
          <input
            id="custom-topic"
            type="text"
            placeholder="e.g. medieval cathedrals, jazz in the 1950s, vegetable biology"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="custom-go" disabled={!custom.trim()}>
            <span>Start</span>
            <ArrowRight />
          </button>
        </div>
      </form>

      <div className="lp-multiplayer">
        <button className="mp-entry-btn" onClick={onMultiplayer}>
          <UsersIcon />
          <span>Play with friends</span>
          <ArrowRight />
        </button>
      </div>
    </main>
  );
}
