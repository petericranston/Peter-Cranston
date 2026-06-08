import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { TOPICS } from './data/topics.jsx'
import Landing from './components/Landing.jsx'
import SubTopics from './components/SubTopics.jsx'
import Quiz from './components/Quiz.jsx'
import Results from './components/Results.jsx'
import TopicModal from './components/TopicModal.jsx'
import MultiplayerHome from './components/MultiplayerHome.jsx'
import MultiplayerLobby from './components/MultiplayerLobby.jsx'
import MultiplayerQuiz from './components/MultiplayerQuiz.jsx'
import MultiplayerLeaderboard from './components/MultiplayerLeaderboard.jsx'
import { useMultiplayer } from './hooks/useMultiplayer.js'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function fetchQuestions(topic) {
  const res = await fetch(`${API_BASE}/api/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return data.questions
}

export default function App() {
  // ── Solo state ────────────────────────────────────────────────────────────
  const [screen, setScreen]     = useState('landing')
  const [topic, setTopic]       = useState(null)
  const [subtopic, setSubtopic] = useState(null)
  const [bank, setBank]         = useState(null)
  const [answers, setAnswers]   = useState([])
  const [phase, setPhase]       = useState('in')
  const [modal, setModal]       = useState(null)

  // ── Multiplayer state ─────────────────────────────────────────────────────
  const mp = useMultiplayer()

  const goto = (next) => {
    setPhase('out')
    setTimeout(() => { setScreen(next); setPhase('in') }, 180)
  }

  // ── Solo flow ─────────────────────────────────────────────────────────────
  const startSub = (topicName) => { setTopic(topicName); goto('sub') }

  const openModalForSub = useCallback((subtopicName) => {
    setSubtopic(subtopicName)
    const topicDef = TOPICS.find(t => t.name === topic)
    const hue = topicDef?.hue ?? 265
    const query = `${topic} — ${subtopicName}`
    setModal({ displayName: subtopicName, umbrellaTopic: topic, hue, questions: null, loading: true, error: false })
    fetchQuestions(query)
      .then(questions => setModal(prev => prev && { ...prev, questions, loading: false }))
      .catch(()       => setModal(prev => prev && { ...prev, loading: false, error: true }))
  }, [topic])

  const handleCustom = (text) => {
    setTopic(text); setSubtopic(text)
    setModal({ displayName: text, umbrellaTopic: null, hue: 265, questions: null, loading: true, error: false })
    fetchQuestions(text)
      .then(questions => setModal(prev => prev && { ...prev, questions, loading: false }))
      .catch(()       => setModal(prev => prev && { ...prev, loading: false, error: true }))
  }

  const retryModal = useCallback(() => {
    if (!modal) return
    const query = modal.umbrellaTopic ? `${modal.umbrellaTopic} — ${modal.displayName}` : modal.displayName
    setModal(prev => ({ ...prev, loading: true, error: false, questions: null }))
    fetchQuestions(query)
      .then(questions => setModal(prev => prev && { ...prev, questions, loading: false }))
      .catch(()       => setModal(prev => prev && { ...prev, loading: false, error: true }))
  }, [modal])

  const handleStartFromModal = () => {
    if (!modal?.questions) return
    setBank(modal.questions); setModal(null); goto('quiz')
  }

  const finishQuiz = (all) => { setAnswers(all); goto('results') }

  const topicHue   = (TOPICS.find(t => t.name === topic) || {}).hue
  const topicLabel = topic === subtopic ? topic : subtopic ? `${topic} · ${subtopic}` : topic

  // ── Multiplayer navigation ────────────────────────────────────────────────
  useEffect(() => {
    if (mp.room && screen === 'mp-home') {
      goto('mp-lobby')
    }
  }, [mp.room?.code]) // eslint-disable-line

  useEffect(() => {
    if (!mp.room) return
    const { state } = mp.room
    if ((state === 'countdown' || state === 'question' || state === 'reveal') && screen !== 'mp-quiz') {
      goto('mp-quiz')
    } else if (state === 'finished' && screen !== 'mp-leaderboard') {
      goto('mp-leaderboard')
    }
  }, [mp.room?.state]) // eslint-disable-line

  function enterMultiplayer() { goto('mp-home') }

  function leaveMultiplayer() {
    mp.leave()
    goto('landing')
  }

  function mpPlayAgain() {
    // Return host to lobby so they can pick a new topic with same players
    mp.leave()
    goto('landing')
  }

  return (
    <>
      <div className={`app phase-${phase}`}>
        {/* ── Solo screens ── */}
        {screen === 'landing' && (
          <Landing onPickTopic={startSub} onCustom={handleCustom} onMultiplayer={enterMultiplayer} />
        )}
        {screen === 'sub' && (
          <SubTopics topic={topic} onBack={() => goto('landing')} onPickSub={openModalForSub} />
        )}
        {screen === 'quiz' && bank && (
          <Quiz
            bank={bank} topicLabel={topicLabel} hue={topicHue ?? modal?.hue}
            onBack={() => goto('landing')} onFinish={finishQuiz}
          />
        )}
        {screen === 'results' && (
          <Results
            answers={answers} topicLabel={topicLabel} hue={topicHue ?? modal?.hue}
            onPlayAgain={() => { setAnswers([]); goto('quiz') }}
            onHome={() => { setAnswers([]); setTopic(null); setSubtopic(null); setBank(null); goto('landing') }}
          />
        )}

        {/* ── Multiplayer screens ── */}
        {screen === 'mp-home' && (
          <MultiplayerHome
            onBack={() => goto('landing')}
            onCreate={mp.createRoom}
            onJoin={mp.joinRoom}
            error={mp.error}
            clearError={mp.clearError}
          />
        )}
        {screen === 'mp-lobby' && mp.room && (
          <MultiplayerLobby
            room={mp.room}
            onStart={mp.startGame}
            onLeave={leaveMultiplayer}
            error={mp.error}
            clearError={mp.clearError}
          />
        )}
        {screen === 'mp-quiz' && mp.room && (
          <MultiplayerQuiz
            room={mp.room}
            onSubmit={mp.submitAnswer}
            onLeave={leaveMultiplayer}
          />
        )}
        {screen === 'mp-leaderboard' && mp.room && (
          <MultiplayerLeaderboard
            room={mp.room}
            onPlayAgain={mpPlayAgain}
            onHome={leaveMultiplayer}
          />
        )}
      </div>

      {modal && (
        <TopicModal
          topic={modal.displayName}
          umbrellaTopic={modal.umbrellaTopic}
          hue={modal.hue}
          questions={modal.questions}
          loading={modal.loading}
          error={modal.error}
          onStart={handleStartFromModal}
          onClose={() => setModal(null)}
          onRetry={retryModal}
        />
      )}
    </>
  )
}
