import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '../icons.jsx'

export default function MultiplayerHome({ onBack, onCreate, onJoin, error, clearError }) {
  const [mode, setMode]         = useState('choose') // 'choose' | 'create' | 'join'
  const [nickname, setNickname] = useState('')
  const [code, setCode]         = useState('')

  function switchMode(m) { setMode(m); clearError() }

  function handleCreate(e) {
    e.preventDefault()
    const name = nickname.trim()
    if (!name) return
    onCreate(name)
  }

  function handleJoin(e) {
    e.preventDefault()
    const name = nickname.trim()
    const c    = code.trim()
    if (!name || !c) return
    onJoin(c, name)
  }

  return (
    <main className="screen mp-home">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft />
        <span>Back</span>
      </button>

      <header className="mp-home-header">
        <h1 className="lp-title">Play with<br />friends</h1>
        <p className="lp-tag">Create a room and share the code, or join a friend's game.</p>
      </header>

      {mode === 'choose' && (
        <div className="mp-choose">
          <button className="mp-mode-btn" onClick={() => switchMode('create')}>
            <span className="mp-mode-icon">
              <PlusIcon />
            </span>
            <span className="mp-mode-body">
              <span className="mp-mode-title">Create a room</span>
              <span className="mp-mode-sub">Pick a topic, share your code</span>
            </span>
            <ArrowRight />
          </button>
          <button className="mp-mode-btn" onClick={() => switchMode('join')}>
            <span className="mp-mode-icon">
              <UsersIcon />
            </span>
            <span className="mp-mode-body">
              <span className="mp-mode-title">Join a room</span>
              <span className="mp-mode-sub">Enter a friend's room code</span>
            </span>
            <ArrowRight />
          </button>
        </div>
      )}

      {mode === 'create' && (
        <form className="mp-form" onSubmit={handleCreate}>
          <button type="button" className="mp-back-link" onClick={() => switchMode('choose')}>
            <ArrowLeft /> Back
          </button>
          <h2 className="mp-form-title">Create a room</h2>
          <label className="mp-label" htmlFor="create-nick">Your name</label>
          <input
            id="create-nick"
            className="mp-input"
            type="text"
            placeholder="e.g. Alex"
            maxLength={20}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            autoComplete="off"
            autoFocus
          />
          {error && <p className="mp-error">{error}</p>}
          <button className="primary-btn mp-submit" type="submit" disabled={!nickname.trim()}>
            <span>Create room</span>
            <ArrowRight />
          </button>
        </form>
      )}

      {mode === 'join' && (
        <form className="mp-form" onSubmit={handleJoin}>
          <button type="button" className="mp-back-link" onClick={() => switchMode('choose')}>
            <ArrowLeft /> Back
          </button>
          <h2 className="mp-form-title">Join a room</h2>
          <label className="mp-label" htmlFor="join-code">Room code</label>
          <input
            id="join-code"
            className="mp-input mp-input--code"
            type="text"
            placeholder="e.g. KX7F2Q"
            maxLength={6}
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            autoComplete="off"
            autoFocus
          />
          <label className="mp-label" htmlFor="join-nick">Your name</label>
          <input
            id="join-nick"
            className="mp-input"
            type="text"
            placeholder="e.g. Sam"
            maxLength={20}
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            autoComplete="off"
          />
          {error && <p className="mp-error">{error}</p>}
          <button className="primary-btn mp-submit" type="submit" disabled={!nickname.trim() || code.trim().length < 6}>
            <span>Join room</span>
            <ArrowRight />
          </button>
        </form>
      )}
    </main>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
