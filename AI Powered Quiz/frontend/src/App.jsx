import { useState } from 'react'
import './App.css'
import { TOPICS } from './data/topics.jsx'
import { QUESTION_BANKS, makeCustomBank } from './data/questions.js'
import Landing from './components/Landing.jsx'
import SubTopics from './components/SubTopics.jsx'
import Quiz from './components/Quiz.jsx'
import Results from './components/Results.jsx'

export default function App() {
  const [screen, setScreen] = useState("landing")
  const [topic, setTopic] = useState(null)
  const [subtopic, setSubtopic] = useState(null)
  const [bank, setBank] = useState(null)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState("in")

  const goto = (next) => {
    setPhase("out")
    setTimeout(() => {
      setScreen(next)
      setPhase("in")
    }, 180)
  }

  const startSub = (topicName) => {
    setTopic(topicName)
    goto("sub")
  }

  const startQuiz = (subName) => {
    setSubtopic(subName)
    const b = QUESTION_BANKS[topic] ?? makeCustomBank(subName)
    setBank(b)
    goto("quiz")
  }

  const handleCustom = (text) => {
    setTopic("Custom")
    setSubtopic(text)
    setBank(makeCustomBank(text))
    goto("quiz")
  }

  const finishQuiz = (all) => {
    setAnswers(all)
    goto("results")
  }

  const topicHue = (TOPICS.find(t => t.name === topic) || {}).hue

  const topicLabel = topic === "Custom"
    ? `Custom · ${subtopic}`
    : subtopic
      ? `${topic} · ${subtopic}`
      : topic

  return (
    <div className={`app phase-${phase}`}>
      {screen === "landing" && (
        <Landing onPickTopic={startSub} onCustom={handleCustom} />
      )}
      {screen === "sub" && (
        <SubTopics
          topic={topic}
          onBack={() => goto("landing")}
          onPickSub={startQuiz}
        />
      )}
      {screen === "quiz" && bank && (
        <Quiz
          bank={bank}
          topicLabel={topicLabel}
          hue={topicHue}
          onBack={() => goto("landing")}
          onFinish={finishQuiz}
        />
      )}
      {screen === "results" && (
        <Results
          answers={answers}
          topicLabel={topicLabel}
          hue={topicHue}
          onPlayAgain={() => {
            setAnswers([])
            goto("quiz")
          }}
          onHome={() => {
            setAnswers([])
            setTopic(null)
            setSubtopic(null)
            setBank(null)
            goto("landing")
          }}
        />
      )}
    </div>
  )
}
