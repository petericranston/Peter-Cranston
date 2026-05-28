import { useState } from 'react'
import { TOPICS } from '../data/topics.jsx'
import { ArrowRight, SparkIcon } from '../icons.jsx'

export default function Landing({ onPickTopic, onCustom }) {
  const [custom, setCustom] = useState("")

  const submit = (e) => {
    e.preventDefault()
    const t = custom.trim()
    if (t) onCustom(t)
  }

  return (
    <main className="screen landing">
      <header className="lp-header">
        <h1 className="lp-title">What do you feel like<br />knowing more about?</h1>
        <p className="lp-tag">Pick a topic, or tell us what's on your mind — we'll write a fresh quiz on the spot.</p>
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
          <span>Or quiz me on anything…</span>
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

      <footer className="lp-foot">
        <span>Ten questions · No timer · Just curiosity</span>
      </footer>
    </main>
  )
}
