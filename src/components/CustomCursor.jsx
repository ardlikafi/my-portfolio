import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Use springs for smooth lagging ring animation
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.spotlight-card') ||
        target.classList.contains('cursor-pointer')

      setHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible, cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#c5a880] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? 'rgba(197, 168, 128, 0.15)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c5a880] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
      />
    </>
  )
}
