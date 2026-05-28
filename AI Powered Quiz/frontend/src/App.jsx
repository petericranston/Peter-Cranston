import { useState, useCallback } from 'react'
import './App.css'
import { TOPICS } from './data/topics.jsx'
import Landing from './components/Landing.jsx'
import SubTopics from './components/SubTopics.jsx'
import Quiz from './components/Quiz.jsx'
import Results from './components/Results.jsx'
import TopicModal from './components/TopicModal.jsx'

async function fetchQuestions(topic) {
  const res = await fetch('/api/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return data.questions
}

export default function App() {
  const [screen, setScreen]     = useState('landing')
  const [topic, setTopic]       = useState(null)   // umbrella topic name
  const [subtopic, setSubtopic] = useState(null)   // chosen subtopic or custom text
  const [bank, setBank]         = useState(null)
  const [answers, setAnswers]   = useState([])
  const [phase, setPhase]       = useState('in')

  // modal: { displayName, umbrellaTopic, hue, questions, loading, error }
  const [modal, setModal] = useState(null)

  const goto = (next) => {
    setPhase('out')
    setTimeout(() => { setScreen(next); setPhase('in') }, 180)
  }

  // Main topic card → subtopics page (unchanged from original)
  const startSub = (topicName) => {
    setTopic(topicName)
    goto('sub')
  }

  // Subtopic card → open modal + start fetch
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

  // Custom search → open modal + start fetch
  const handleCustom = (text) => {
    setTopic(text)
    setSubtopic(text)
    setModal({ displayName: text, umbrellaTopic: null, hue: 265, questions: null, loading: true, error: false })
    fetchQuestions(text)
      .then(questions => setModal(prev => prev && { ...prev, questions, loading: false }))
      .catch(()       => setModal(prev => prev && { ...prev, loading: false, error: true }))
  }

  const retryModal = useCallback(() => {
    if (!modal) return
    const query = modal.umbrellaTopic
      ? `${modal.umbrellaTopic} — ${modal.displayName}`
      : modal.displayName
    setModal(prev => ({ ...prev, loading: true, error: false, questions: null }))
    fetchQuestions(query)
      .then(questions => setModal(prev => prev && { ...prev, questions, loading: false }))
      .catch(()       => setModal(prev => prev && { ...prev, loading: false, error: true }))
  }, [modal])

  const handleStartFromModal = () => {
    if (!modal?.questions) return
    setBank(modal.questions)
    setModal(null)
    goto('quiz')
  }

  const finishQuiz = (all) => { setAnswers(all); goto('results') }

  const topicHue   = (TOPICS.find(t => t.name === topic) || {}).hue
  const topicLabel = topic === subtopic
    ? topic
    : subtopic
      ? `${topic} · ${subtopic}`
      : topic

  return (
    <>
      <div className={`app phase-${phase}`}>
        {screen === 'landing' && (
          <Landing onPickTopic={startSub} onCustom={handleCustom} />
        )}
        {screen === 'sub' && (
          <SubTopics
            topic={topic}
            onBack={() => goto('landing')}
            onPickSub={openModalForSub}
          />
        )}
        {screen === 'quiz' && bank && (
          <Quiz
            bank={bank}
            topicLabel={topicLabel}
            hue={topicHue ?? modal?.hue}
            onBack={() => goto('landing')}
            onFinish={finishQuiz}
          />
        )}
        {screen === 'results' && (
          <Results
            answers={answers}
            topicLabel={topicLabel}
            hue={topicHue ?? modal?.hue}
            onPlayAgain={() => { setAnswers([]); goto('quiz') }}
            onHome={() => {
              setAnswers([]); setTopic(null); setSubtopic(null); setBank(null)
              goto('landing')
            }}
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
