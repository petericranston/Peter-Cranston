import { TOPICS } from '../data/topics.jsx'
import { ArrowLeft, ArrowRight } from '../icons.jsx'

export default function SubTopics({ topic, onBack, onPickSub }) {
  const def = TOPICS.find((t) => t.name === topic)
  const hue = def?.hue ?? 265

  return (
    <main className="screen subtopics" style={{ "--h": hue }}>
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft />
        <span>All topics</span>
      </button>

      <header className="sub-header">
        <span className="eyebrow">Choose a focus</span>
        <h2 className="sub-title">{topic}</h2>
        <p className="sub-tag">Eight more specific corners of {topic.toLowerCase()} — pick one to begin.</p>
      </header>

      <section className="sub-grid" aria-label={`Sub-topics for ${topic}`}>
        {def.subs.map((s, i) => (
          <button
            key={s}
            className="sub-card"
            style={{ "--h": hue }}
            onClick={() => onPickSub(s)}
          >
            <span className="sub-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="sub-name">{s}</span>
            <span className="sub-chevron" aria-hidden="true"><ArrowRight /></span>
          </button>
        ))}
      </section>
    </main>
  )
}
