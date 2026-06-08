import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || ''

export function useMultiplayer() {
  const [room, setRoom]   = useState(null)
  const [error, setError] = useState(null)
  const socketRef         = useRef(null)

  function getSocket() {
    if (!socketRef.current) {
      const s = io(SOCKET_URL, { autoConnect: false })
      s.on('room-joined', setRoom)
      s.on('room-update',  setRoom)
      s.on('create-error', e => setError(e.message))
      s.on('join-error',   e => setError(e.message))
      s.on('start-error',  e => setError(e.message))
      socketRef.current = s
    }
    return socketRef.current
  }

  function createRoom(nickname) {
    setError(null)
    const s = getSocket()
    if (s.connected) { s.emit('create-room', { nickname }) }
    else { s.once('connect', () => s.emit('create-room', { nickname })); s.connect() }
  }

  function joinRoom(code, nickname) {
    setError(null)
    const s = getSocket()
    if (s.connected) { s.emit('join-room', { code, nickname }) }
    else { s.once('connect', () => s.emit('join-room', { code, nickname })); s.connect() }
  }

  function startGame(topic, hue) {
    setError(null)
    socketRef.current?.emit('start-game', { topic, hue })
  }

  function submitAnswer(answerIndex) {
    socketRef.current?.emit('submit-answer', { answerIndex })
  }

  function leave() {
    socketRef.current?.disconnect()
    socketRef.current = null
    setRoom(null)
    setError(null)
  }

  useEffect(() => () => socketRef.current?.disconnect(), [])

  return { room, error, createRoom, joinRoom, startGame, submitAnswer, leave, clearError: () => setError(null) }
}
