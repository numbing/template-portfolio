'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ====== CONFIG ======
const BOARD_SIZE = 10
const CELL_SIZE = 32
const INIT_SNAKE = [
  { x: 4, y: 5 },
  { x: 3, y: 5 },
]
const INIT_DIR = { x: 1, y: 0 }
const APPLE_EMOJI = '🍏'
const HEAD_EMOJI = '🟩'
const BODY_EMOJI = '🟢'
const WIN_LENGTH = 7 // (Eat 5 apples to win)

const palette = {
  bg: '#BDD1BD',
  board: '#85B093',
  grid: '#568F7C',
  head: '#326D6C',
  apple: '#FFD700',
  text: '#173C4C'
}

// ====== UTILS ======
function randomApple(snake: { x: number, y: number }[]): { x: number, y: number } {
  let pos: { x: number, y: number }
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    }
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y))
  return pos
}

// ====== SNAKE GAME ======
export default function SnakeGame() {
  const [snake, setSnake] = useState(INIT_SNAKE)
  const [dir, setDir] = useState(INIT_DIR)
  const [apple, setApple] = useState<{ x: number, y: number } | null>(null)
  const [playing, setPlaying] = useState(false)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const moveRef = useRef(dir)
  const animRef = useRef<number | undefined>(undefined)
  const firstMounted = useRef(false)

  // Hydration bug fix: Only set apple after first mount
  useEffect(() => {
    if (!firstMounted.current) {
      setApple(randomApple(INIT_SNAKE))
      firstMounted.current = true
    }
  }, [])

  // Keyboard controls
  useEffect(() => {
    if (!playing) return
    const handle = (e: KeyboardEvent) => {
      const nd = moveRef.current
      if (e.key === 'ArrowUp' && nd.y !== 1) setDir({ x: 0, y: -1 })
      if (e.key === 'ArrowDown' && nd.y !== -1) setDir({ x: 0, y: 1 })
      if (e.key === 'ArrowLeft' && nd.x !== 1) setDir({ x: -1, y: 0 })
      if (e.key === 'ArrowRight' && nd.x !== -1) setDir({ x: 1, y: 0 })
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [playing])

  useEffect(() => {
    moveRef.current = dir
  }, [dir])

  // Move snake timer
  useEffect(() => {
    if (!playing || win || lose || !apple) return

    function move() {
      setSnake(prev => {
        const head = { x: prev[0].x + moveRef.current.x, y: prev[0].y + moveRef.current.y }
        // Wall collision
        if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE) {
          setLose(true)
          setPlaying(false)
          return prev
        }
        // Self collision
        if (prev.some(seg => seg.x === head.x && seg.y === head.y)) {
          setLose(true)
          setPlaying(false)
          return prev
        }
        // Apple eaten
        let grow = false
        if (apple && head.x === apple.x && head.y === apple.y) {
          grow = true
          if (prev.length + 1 === WIN_LENGTH) {
            setWin(true)
            setPlaying(false)
          }
        }
        const next = [head, ...prev]
        if (!grow) next.pop()
        else setApple(randomApple(next))
        return next
      })
    }
    animRef.current = window.setTimeout(move, 120)
    return () => clearTimeout(animRef.current)
  }, [snake, playing, win, lose, apple])

  // Start/restart
  function startGame() {
    setSnake(INIT_SNAKE)
    setDir(INIT_DIR)
    setApple(randomApple(INIT_SNAKE))
    setPlaying(true)
    setWin(false)
    setLose(false)
  }

  return (
    <section
      className="min-h-[90vh] flex flex-col items-center justify-center"
      style={{ background: palette.bg }}
    >
      <h1
        className="mb-3 text-center font-[var(--font-pressstart)]"
        style={{ color: palette.text, fontSize: 30, textShadow: '0 2px #85B093' }}
      >
        🐍 SNAKE
      </h1>
      <div
        style={{
          background: palette.board,
          border: `5px solid ${palette.head}`,
          width: BOARD_SIZE * CELL_SIZE,
          height: BOARD_SIZE * CELL_SIZE,
          borderRadius: 12,
          position: 'relative',
          boxShadow: '0 4px 24px #173C4C33',
          margin: '0 auto',
          marginBottom: 22,
        }}
        tabIndex={0}
      >
        {/* Grid */}
        {Array.from({ length: BOARD_SIZE }).map((_, y) =>
          Array.from({ length: BOARD_SIZE }).map((_, x) => {
            // Apple
            if (apple && apple.x === x && apple.y === y)
              return (
                <motion.div
                  key={`a${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: x * CELL_SIZE,
                    top: y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    fontSize: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                >
                  {APPLE_EMOJI}
                </motion.div>
              )
            // Snake head/body
            const snakeIdx = snake.findIndex(seg => seg.x === x && seg.y === y)
            if (snakeIdx === 0)
              return (
                <motion.div
                  key={`h${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: x * CELL_SIZE,
                    top: y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    fontSize: 22,
                    background: palette.head,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Press Start 2P', cursive",
                    borderRadius: 6,
                    zIndex: 3,
                    border: `2px solid #173C4C`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                >
                  {HEAD_EMOJI}
                </motion.div>
              )
            if (snakeIdx > 0)
              return (
                <motion.div
                  key={`b${x}-${y}`}
                  style={{
                    position: 'absolute',
                    left: x * CELL_SIZE,
                    top: y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    fontSize: 20,
                    background: palette.grid,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Press Start 2P', cursive",
                    borderRadius: 5,
                    zIndex: 2,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.25 }}
                >
                  {BODY_EMOJI}
                </motion.div>
              )
            // Empty cell
            return null
          })
        )}
        {/* Board grid lines */}
        <svg width={BOARD_SIZE * CELL_SIZE} height={BOARD_SIZE * CELL_SIZE} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.16, pointerEvents: 'none' }}>
          {Array.from({ length: BOARD_SIZE + 1 }).map((_, i) => (
            <g key={i}>
              <line x1={i * CELL_SIZE} y1={0} x2={i * CELL_SIZE} y2={BOARD_SIZE * CELL_SIZE} stroke={palette.text} strokeWidth={1} />
              <line x1={0} y1={i * CELL_SIZE} x2={BOARD_SIZE * CELL_SIZE} y2={i * CELL_SIZE} stroke={palette.text} strokeWidth={1} />
            </g>
          ))}
        </svg>
      </div>
      {/* Status and controls */}
      <AnimatePresence>
        {win && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <div
              className="mb-2 font-[var(--font-pressstart)]"
              style={{ color: palette.head, fontSize: 22 }}
            >
              🎉 YOU WIN! 🎉
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl mt-2 font-[var(--font-pressstart)]"
              style={{ background: palette.head, color: '#fff', fontSize: 16 }}
            >
              Play Again
            </button>
          </motion.div>
        )}
        {lose && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <div
              className="mb-2 font-[var(--font-pressstart)]"
              style={{ color: '#c0392b', fontSize: 22 }}
            >
              💀 GAME OVER
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl mt-2 font-[var(--font-pressstart)]"
              style={{ background: palette.head, color: '#fff', fontSize: 16 }}
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!playing && !win && !lose && (
        <button
          onClick={startGame}
          className="px-8 py-4 rounded-xl mt-4 font-[var(--font-pressstart)]"
          style={{
            background: palette.head,
            color: '#fff',
            fontSize: 18,
            letterSpacing: 2,
            boxShadow: '0 4px 18px #326D6C22',
          }}
        >
          Start Snake
        </button>
      )}
      {/* Instructions */}
      <div
        className="mt-8 text-center"
        style={{
          color: palette.text,
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 13,
          opacity: 0.77,
        }}
      >
        {playing
          ? 'Use arrow keys to move.'
          : 'Eat 5 apples to win!'}
      </div>
      <div
        className="mt-3 text-center"
        style={{
          color: '#568F7C',
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 11,
          opacity: 0.7,
        }}
      >
        {`Made with <3, React & Next.js`}
      </div>
    </section>
  )
}
