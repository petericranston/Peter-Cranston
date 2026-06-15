import { useState, useEffect } from 'react'
import { CheckIcon, CrossIcon } from '../icons.jsx'

const READ_SECS   = 8
const REVEAL_SECS = 5

export default function MultiplayerQuiz({ room, onSubmit, onLeave }) {
  const [countNum, setCountNum] = useState(3)
  const [nextIn,   setNextIn]   = useState(REVEAL_SECS)
  const [readIn,   setReadIn]   = useState(READ_SECS)

  // Animate countdown 3-2-1 when state is 'countdown'
  useEffect(() => {
    if (room.state !== 'countdown') return
    setCountNum(3)
    const t1 = setTimeout(() => setCountNum(2), 1000)
    const t2 = setTimeout(() => setCountNum(1), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [room.state])

  // Local reveal countdown
  useEffect(() => {
    if (room.state !== 'reveal') { setNextIn(REVEAL_SECS); return }
    setNextIn(REVEAL_SECS)
    const t = setInterval(() => setNextIn(n => Math.max(0, n - 1)), 1000)
    return () => clearInterval(t)
  }, [room.state, room.questionIndex])

  // Local reading countdown
  useEffect(() => {
    if (room.state !== 'reading') { setReadIn(READ_SECS); return }
    setReadIn(READ_SECS)
    const t = setInterval(() => setReadIn(n => Math.max(0, n - 1)), 1000)
    return () => clearInterval(t)
  }, [room.state, room.questionIndex])

  const { state, currentQuestion: q, timeLeft, myAnswer, answeredCount, players, questionIndex, totalQuestions, hue, topic, myId } = room
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  if (state === 'countdown') {
    return (
      <main className="screen mp-quiz" style={{ '--h': hue ?? 265 }}>
        <div className="mp-countdown">
          <p className="mp-countdown-topic">{topic}</p>
          <div className="mp-countdown-num" key={countNum}>{countNum}</div>
          <p className="mp-countdown-label">Get ready…</p>
        </div>
      </main>
    )
  }

  if (!q) return null

  const answered   = myAnswer !== null
  const timerPct   = Math.min(100, (timeLeft / 20) * 100)
  const timerColor = timeLeft > 10 ? 'var(--right)' : timeLeft > 5 ? 'oklch(0.65 0.18 75)' : 'var(--wrong)'
  const readPct    = Math.min(100, (readIn / READ_SECS) * 100)
  const readColor  = 'var(--topic)'

  return (
    <main className="screen mp-quiz" style={{ '--h': hue ?? 265 }}>
      {/* Top bar */}
      <div className="quiz-top">
        <button className="back-btn back-btn--quiet" onClick={onLeave}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <span>Leave</span>
        </button>
        <div className="quiz-meta">
          <span className="quiz-topic" title={topic}>{topic}</span>
          <span className="quiz-count">Question <strong>{questionIndex + 1}</strong> of {totalQuestions}</span>
        </div>
        <div className="quiz-progress" aria-hidden="true">
          <div className="quiz-progress-fill" style={{ width: `${((questionIndex + (state === 'reveal' ? 1 : 0)) / totalQuestions) * 100}%` }} />
        </div>
      </div>

      {/* Reading bar */}
      {state === 'reading' && (
        <div className="mp-timer-bar" aria-hidden="true">
          <div className="mp-timer-fill" style={{ width: `${readPct}%`, background: readColor }} />
          <span className="mp-timer-num" style={{ color: readColor }}>{readIn}</span>
        </div>
      )}

      {/* Answer timer bar */}
      {state === 'question' && (
        <div className="mp-timer-bar" aria-hidden="true">
          <div className="mp-timer-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
          <span className="mp-timer-num" style={{ color: timerColor }}>{timeLeft}</span>
        </div>
      )}

      {/* Players answered dots */}
      <div className="mp-answered-row">
        {players.map(p => (
          <span
            key={p.id}
            className={`mp-dot ${p.answered ? 'is-answered' : ''} ${p.id === myId ? 'is-me' : ''}`}
            title={p.name}
          >
            {p.name[0].toUpperCase()}
          </span>
        ))}
        <span className="mp-answered-count">{answeredCount}/{players.length} answered</span>
      </div>

      {/* Question */}
      <section className="quiz-question">
        <p className="question-text" data-len={q.q.length > 90 ? 'long' : 'short'}>{q.q}</p>
      </section>

      {/* Answers */}
      <section className="quiz-answers" aria-label="Answer options">
        {state === 'reading' && [0, 1, 2, 3].map(i => (
          <div key={i} className="answer-card is-reading" aria-hidden="true">
            <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
          </div>
        ))}
        {state !== 'reading' && q.options?.map((opt, i) => {
          let cardState = ''
          if (state === 'reveal') {
            if (i === q.correct)          cardState = 'is-correct'
            else if (i === myAnswer)      cardState = 'is-wrong'
            else                          cardState = 'is-dim'
          } else if (answered && i === myAnswer) {
            cardState = 'is-picked'
          }
          return (
            <button
              key={i}
              className={`answer-card ${cardState}`}
              onClick={() => state === 'question' && onSubmit(i)}
              disabled={state !== 'question'}
            >
              <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
              <span className="answer-text">{opt}</span>
              <span className="answer-mark">
                {state === 'reveal' && i === q.correct ? <CheckIcon /> : state === 'reveal' && i === myAnswer ? <CrossIcon /> : null}
              </span>
            </button>
          )
        })}
      </section>

      {/* Reveal panel */}
      <section className={`quiz-reveal ${state === 'reveal' ? 'is-open' : ''}`} aria-live="polite">
        {state === 'reveal' && (
          <div className="reveal-inner mp-reveal-inner">
            <div className="mp-reveal-top">
              <div className="reveal-verdict">
                {myAnswer === q.correct ? (
                  <span className="verdict verdict--right"><CheckIcon /> Correct</span>
                ) : myAnswer === null ? (
                  <span className="verdict verdict--wrong">Time's up</span>
                ) : (
                  <span className="verdict verdict--wrong"><CrossIcon /> Not quite</span>
                )}
              </div>
              <span className="mp-next-label">Next in {nextIn}s</span>
            </div>
            <p className="reveal-text">{q.explain}</p>

            {/* Mini leaderboard */}
            <div className="mp-scores">
              <span className="mp-scores-label">Standings</span>
              <ul className="mp-scores-list">
                {sortedPlayers.map((p, i) => (
                  <li key={p.id} className={`mp-score-row ${p.id === myId ? 'is-me' : ''}`}>
                    <span className="mp-rank">#{i + 1}</span>
                    <span className="mp-score-name">{p.name}</span>
                    <span className="mp-score-val">{p.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
