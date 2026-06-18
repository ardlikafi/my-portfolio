import { useEffect, useRef } from 'react'

export default function Background3D() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Morphing color blobs/spots
    const blobs = [
      {
        x: width * 0.2,
        y: height * 0.3,
        r: Math.min(width, height) * 0.5,
        vx: 0.8,
        vy: 0.6,
        color: 'rgba(108, 92, 231, 0.15)', // var(--c-primary) purple
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        r: Math.min(width, height) * 0.6,
        vx: -0.6,
        vy: 0.7,
        color: 'rgba(0, 245, 212, 0.12)', // var(--c-accent) cyan
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        r: Math.min(width, height) * 0.55,
        vx: 0.5,
        vy: -0.5,
        color: 'rgba(0, 187, 249, 0.12)', // var(--c-accent-2) blue
      },
      {
        x: width * 0.3,
        y: height * 0.7,
        r: Math.min(width, height) * 0.45,
        vx: -0.7,
        vy: -0.6,
        color: 'rgba(15, 15, 35, 0.5)', // deep violet
      }
    ]

    // Render loop
    const render = () => {
      // Clear background with extremely deep dark space color
      ctx.fillStyle = '#03030b'
      ctx.fillRect(0, 0, width, height)

      // Enable screen blending for smooth gradient overlaps
      ctx.globalCompositeOperation = 'screen'

      blobs.forEach((blob) => {
        // Move blobs organically
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce back from margins gently
        if (blob.x - blob.r < 0 || blob.x + blob.r > width) {
          blob.vx = -blob.vx
        }
        if (blob.y - blob.r < 0 || blob.y + blob.r > height) {
          blob.vy = -blob.vy
        }

        // Draw radial gradient for this morphing spot
        const grad = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.r
        )
        grad.addColorStop(0, blob.color)
        grad.addColorStop(1, 'rgba(3, 3, 11, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Revert composite operation
      ctx.globalCompositeOperation = 'source-over'

      // Subtle noise texture overlay for high-fidelity cinema feel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.003)'
      for (let i = 0; i < 4; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        ctx.fillRect(x, y, 2, 2)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%' 
        }} 
      />
    </div>
  )
}
