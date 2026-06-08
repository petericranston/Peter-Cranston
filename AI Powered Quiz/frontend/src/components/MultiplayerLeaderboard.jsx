import { ArrowRight } from '../icons.jsx'

export default function MultiplayerLeaderboard({ room, onPlayAgain, onHome }) {
  const sorted = [...room.players].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const isHost = room.myId === room.hostId
  const total  = room.totalQuestions

  const medals = ['🥇', '🥈', '🥉']

  return (
    <main className="screen mp-leaderboard" style={{ '--h': room.hue ?? 265 }}>
      <header className="mp-lb-header">
        <span className="eyebrow">{room.topic}</span>
        <h1 className="mp-lb-title">
          {winner?.name} wins!
        </h1>
        <p className="mp-lb-sub">
          {winner?.score === total
            ? 'A perfect score — flawless.'
            : `${winner?.score} out of ${total} correct.`}
        </p>
      </header>

      <ol className="mp-lb-list" aria-label="Final standings">
        {sorted.map((p, i) => (
          <li
            key={p.id}
            className={`mp-lb-row ${i === 0 ? 'is-winner' : ''} ${p.id === room.myId ? 'is-me' : ''}`}
          >
            <span className="mp-lb-rank">{medals[i] ?? `#${i + 1}`}</span>
            <span className="mp-lb-avatar">{p.name[0].toUpperCase()}</span>
            <span className="mp-lb-name">
              {p.name}
              {p.id === room.myId && <span className="mp-you-tag">you</span>}
            </span>
            <span className="mp-lb-score">
              <span className="mp-lb-num">{p.score}</span>
              <span className="mp-lb-denom">/{total}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="results-cta">
        {isHost && (
          <button className="primary-btn" onClick={onPlayAgain}>
            <span>Play again</span>
            <ArrowRight />
          </button>
        )}
        <button className="ghost-btn" onClick={onHome}>Back to home</button>
      </div>
    </main>
  )
}
