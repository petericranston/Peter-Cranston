import { useState } from 'react'
import { ArrowLeft, ArrowRight, SparkIcon } from '../icons.jsx'
import { TOPICS } from '../data/topics.jsx'

export default function MultiplayerLobby({ room, onStart, onLeave, error, clearError }) {
  const [umbrella, setUmbrella] = useState(null)   // selected TOPICS entry
  const [sub, setSub]           = useState(null)   // selected subtopic string
  const [custom, setCustom]     = useState('')
  const [copied, setCopied]     = useState(false)

  const isHost = room.myId === room.hostId

  // Derived: what we'll send to the server
  const topic  = sub ? `${umbrella.name} — ${sub}` : custom.trim()
  const selHue = umbrella?.hue ?? 265

  function pickUmbrella(t) {
    if (umbrella?.name === t.name) {
      // Second click collapses it
      setUmbrella(null)
      setSub(null)
    } else {
      setUmbrella(t)
      setSub(null)
      setCustom('')
      clearError()
    }
  }

  function pickSub(s) {
    setSub(s)
    clearError()
  }

  function handleCustomChange(e) {
    setCustom(e.target.value)
    setUmbrella(null)
    setSub(null)
    clearError()
  }

  function handleStart(e) {
    e.preventDefault()
    if (!topic) return
    onStart(topic, selHue)
  }

  function copyCode() {
    navigator.clipboard.writeText(room.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (room.state === 'generating') {
    return (
      <main className="screen mp-lobby" style={{ '--h': room.hue }}>
        <div className="mp-generating">
          <div className="modal-spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
          <p className="mp-gen-title">Generating quiz…</p>
          <p className="mp-gen-sub">Writing 10 questions about <strong>{room.topic}</strong></p>
        </div>
      </main>
    )
  }

  return (
    <main className="screen mp-lobby">
      <button className="back-btn" onClick={onLeave}>
        <ArrowLeft />
        <span>Leave</span>
      </button>

      <div className="mp-lobby-layout">
        {/* Left: code + players */}
        <div className="mp-lobby-left">
          <div className="mp-code-block">
            <span className="mp-code-label">Room code</span>
            <div className="mp-code-row">
              <span className="mp-code">{room.code}</span>
              <button className="mp-copy-btn" onClick={copyCode} title="Copy code">
                {copied ? <CheckSmallIcon /> : <CopyIcon />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mp-code-hint">Share this code so friends can join</p>
          </div>

          <div className="mp-players-block">
            <span className="mp-section-label">
              Players <span className="mp-player-count">{room.players.length}/10</span>
            </span>
            <ul className="mp-player-list">
              {room.players.map(p => (
                <li key={p.id} className={`mp-player-row ${p.id === room.myId ? 'is-me' : ''}`}>
                  <span className="mp-avatar">{p.name[0].toUpperCase()}</span>
                  <span className="mp-player-name">
                    {p.name}
                    {p.id === room.myId && <span className="mp-you-tag">you</span>}
                  </span>
                  {p.id === room.hostId && <span className="mp-host-tag">host</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: topic picker (host only) or waiting message */}
        <div className="mp-lobby-right">
          {isHost ? (
            <form className="mp-topic-form" onSubmit={handleStart}>
              <span className="mp-section-label">Choose a topic</span>

              {/* Umbrella topic chips */}
              <div className="mp-topic-chips">
                {TOPICS.map(t => (
                  <button
                    key={t.name}
                    type="button"
                    className={`mp-topic-chip ${umbrella?.name === t.name ? 'is-selected' : ''}`}
                    style={{ '--h': t.hue }}
                    onClick={() => pickUmbrella(t)}
                  >
                    <span className="mp-chip-icon">{t.icon}</span>
                    <span>{t.name}</span>
                    <ChevronIcon open={umbrella?.name === t.name} />
                  </button>
                ))}
              </div>

              {/* Subtopics panel — slides open when an umbrella is selected */}
              <div className={`mp-subs-panel ${umbrella ? 'is-open' : ''}`}>
                <div className="mp-subs-inner">
                  {umbrella && (
                    <div className="mp-subs-grid" style={{ '--h': umbrella.hue }}>
                      {umbrella.subs.map(s => (
                        <button
                          key={s}
                          type="button"
                          className={`mp-sub-btn ${sub === s ? 'is-selected' : ''}`}
                          onClick={() => pickSub(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mp-or-row">
                <span className="mp-or-line" />
                <span className="mp-or-text">or type your own</span>
                <span className="mp-or-line" />
              </div>

              <div className={`mp-custom-field ${custom ? 'is-active' : ''}`}>
                <SparkIcon className="custom-spark" />
                <input
                  className="mp-custom-input"
                  type="text"
                  placeholder="e.g. 90s cartoons, space exploration…"
                  maxLength={100}
                  value={custom}
                  onChange={handleCustomChange}
                  autoComplete="off"
                />
              </div>

              {error && <p className="mp-error">{error}</p>}

              <button
                className="primary-btn mp-start-btn"
                type="submit"
                disabled={!topic}
                style={{ '--h': selHue, '--topic': `oklch(0.5 0.16 ${selHue})`, '--topic-deep': `oklch(0.42 0.17 ${selHue})` }}
              >
                <span>Start game</span>
                <ArrowRight />
              </button>

              {room.players.length === 1 && (
                <p className="mp-solo-note">You can start alone or wait for friends to join.</p>
              )}
            </form>
          ) : (
            <div className="mp-waiting">
              <div className="mp-waiting-dots">
                <span /><span /><span />
              </div>
              <p className="mp-waiting-title">Waiting for the host to start</p>
              <p className="mp-waiting-sub">
                {room.players.find(p => p.id === room.hostId)?.name ?? 'The host'} will pick a topic and kick things off.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ width: 13, height: 13, marginLeft: 2, transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}
