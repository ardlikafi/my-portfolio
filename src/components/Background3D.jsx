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

    // Morphing luxury color blobs
    const blobs = [
      {
        x: width * 0.2,
        y: height * 0.3,
        r: Math.min(width, height) * 0.5,
        vx: 0.3,
        vy: 0.2,
        color: 'rgba(197, 168, 128, 0.04)', // luxury gold
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        r: Math.min(width, height) * 0.6,
        vx: -0.2,
        vy: 0.3,
        color: 'rgba(99, 102, 241, 0.05)', // indigo
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        r: Math.min(width, height) * 0.55,
        vx: 0.15,
        vy: -0.15,
        color: 'rgba(30, 27, 75, 0.3)', // dark navy
      }
    ]

    // Render loop
    const render = () => {
      // Clear background with obsidian black
      ctx.fillStyle = '#050508'
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
        grad.addColorStop(1, 'rgba(5, 5, 8, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Revert composite operation
      ctx.globalCompositeOperation = 'source-over'

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
