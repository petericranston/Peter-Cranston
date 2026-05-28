import { ArrowRight, CheckIcon, CrossIcon } from '../icons.jsx'

export default function Results({ answers, topicLabel, hue, onPlayAgain, onHome }) {
  const correctCount = answers.filter(a => a.picked === a.correct).length
  const total = answers.length

  const message = (() => {
    if (correctCount === total) return { hed: "Flawless.", sub: "A perfect run. You clearly know your stuff." }
    if (correctCount >= 8) return { hed: "Brilliant.", sub: "A near-perfect score — you should pick a harder topic next." }
    if (correctCount >= 6) return { hed: "Solid work.", sub: "A respectable score with room to grow." }
    if (correctCount >= 4) return { hed: "Getting there.", sub: "A few right, a few learned. That counts too." }
    if (correctCount >= 1) return { hed: "Tough round.", sub: "Even a couple right is a step forward — try again?" }
    return { hed: "Rough one.", sub: "Everyone has their day. Today is a learning day." }
  })()

  return (
    <main className="screen results" style={{ "--h": hue ?? 265 }}>
      <header className="results-head">
        <span className="eyebrow">{topicLabel}</span>
        <div className="score-display">
          <span className="score-num">{correctCount}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{total}</span>
        </div>
        <h2 className="results-hed">{message.hed}</h2>
        <p className="results-sub">{message.sub}</p>
      </header>

      <section className="results-list" aria-label="Question review">
        {answers.map((a, i) => {
          const right = a.picked === a.correct
          return (
            <div key={i} className={`review-row ${right ? "is-right" : "is-wrong"}`}>
              <span className="review-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="review-body">
                <p className="review-q">{a.q}</p>
                <p className="review-a">
                  {right ? (
                    <>
                      <span className="review-tag review-tag--right"><CheckIcon /> Correct</span>
                      <span className="review-ans">{a.options[a.correct]}</span>
                    </>
                  ) : (
                    <>
                      <span className="review-tag review-tag--wrong"><CrossIcon /> You picked</span>
                      <span className="review-ans review-ans--strike">{a.picked != null ? a.options[a.picked] : "—"}</span>
                      <span className="review-sep">·</span>
                      <span className="review-tag review-tag--muted">Answer</span>
                      <span className="review-ans">{a.options[a.correct]}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </section>

      <div className="results-cta">
        <button className="primary-btn" onClick={onPlayAgain}>
          <span>Play again</span>
          <ArrowRight />
        </button>
        <button className="ghost-btn" onClick={onHome}>Back to topics</button>
      </div>
    </main>
  )
}
