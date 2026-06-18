import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const move = (e) => setPos({ x: e.clientX - 10, y: e.clientY - 10 })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="custom-cursor"
      style={{ left: pos.x, top: pos.y }}
    />
  )
}
