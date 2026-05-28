import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="app">
      <h1>AI Powered Quiz</h1>
      <p>Backend status: {status ?? 'checking...'}</p>
    </div>
  )
}

export default App
