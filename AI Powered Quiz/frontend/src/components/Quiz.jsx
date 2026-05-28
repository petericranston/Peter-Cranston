import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckIcon, CrossIcon } from '../icons.jsx'

export default function Quiz({ bank, topicLabel, hue, onBack, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [answers, setAnswers] = useState([])

  const q = bank[idx]
  const total = bank.length
  const revealed = picked !== null
  const isLast = idx === total - 1

  const choose = (i) => {
    if (revealed) return
    setPicked(i)
  }

  const next = () => {
    const entry = { picked, correct: q.correct, q: q.q, options: q.options }
    const all = [...answers, entry]
    if (isLast) {
      onFinish(all)
    } else {
      setAnswers(all)
      setIdx(idx + 1)
      setPicked(null)
    }
  }

  const pct = ((idx + (revealed ? 1 : 0)) / total) * 100

  return (
    <main className="screen quiz" style={{ "--h": hue ?? 265 }}>
      <div className="quiz-top">
        <button className="back-btn back-btn--quiet" onClick={onBack}>
          <ArrowLeft />
          <span>Quit</span>
        </button>
        <div className="quiz-meta">
          <span className="quiz-topic" title={topicLabel}>{topicLabel}</span>
          <span className="quiz-count">Question <strong>{idx + 1}</strong> of {total}</span>
        </div>
        <div className="quiz-progress" aria-hidden="true">
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <section className="quiz-question">
        <p className="question-text" data-len={q.q.length > 90 ? "long" : "short"}>{q.q}</p>
      </section>

      <section className="quiz-answers" aria-label="Answer options">
        {q.options.map((opt, i) => {
          const state =
            !revealed ? "" :
            i === q.correct ? "is-correct" :
            i === picked ? "is-wrong" : "is-dim"
          return (
            <button
              key={i}
              className={`answer-card ${state}`}
              onClick={() => choose(i)}
              disabled={revealed}
            >
              <span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              <span className="answer-text">{opt}</span>
              <span className="answer-mark" aria-hidden="true">
                {revealed && i === q.correct ? <CheckIcon /> : revealed && i === picked ? <CrossIcon /> : null}
              </span>
            </button>
          )
        })}
      </section>

      <section className={`quiz-reveal ${revealed ? "is-open" : ""}`} aria-live="polite">
        {revealed && (
          <div className="reveal-inner">
            <div className="reveal-verdict">
              {picked === q.correct ? (
                <span className="verdict verdict--right"><CheckIcon /> Correct</span>
              ) : (
                <span className="verdict verdict--wrong"><CrossIcon /> Not quite</span>
              )}
            </div>
            <p className="reveal-text">{q.explain}</p>
            <button className="primary-btn" onClick={next}>
              <span>{isLast ? "See results" : "Next question"}</span>
              <ArrowRight />
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
