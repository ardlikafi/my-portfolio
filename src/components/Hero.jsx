import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiCpu, FiGithub } from 'react-icons/fi'
import ThreeDObject from './ThreeDObject'
import { portfolioData } from '../data/portfolioData'

export default function Hero({ lang }) {
  const t = portfolioData.translations[lang]
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 45 // max 45px displacement
      const y = (clientY / window.innerHeight - 0.5) * 45
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Magnetic Button Spring Hook implementation
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 120, damping: 15 })
  const springY = useSpring(y, { stiffness: 120, damping: 15 })

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left - rect.width / 2
    const mouseY = e.clientY - rect.top - rect.height / 2
    x.set(mouseX * 0.45) // magnetic drag weight
    y.set(mouseY * 0.45)
  }

  const handleMagneticLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Smooth scroll handler
  const handleScroll = (e, targetId) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="home" className="hero" style={{ overflow: 'visible', position: 'relative' }}>
      {/* Background elegant slow glowing mesh spots */}
      <div className="hero-gradient-orb hero-orb-1" style={{ opacity: 0.35 }}></div>
      <div className="hero-gradient-orb hero-orb-2" style={{ opacity: 0.35 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-grid-split" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '50px', alignItems: 'center', width: '100%' }}>
          
          {/* Left Column: Premium Text & CTA */}
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Safe Pushed Badge */}
            <motion.div 
              className="hero-badge" 
              variants={itemVariants}
              style={{
                borderColor: 'rgba(0, 245, 212, 0.15)',
                background: 'rgba(0, 245, 212, 0.03)'
              }}
            >
              <span className="dot"></span>
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Word-level Text Reveal Animation */}
            <motion.h1 
              variants={itemVariants} 
              style={{ 
                fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
                lineHeight: '1.1',
                fontWeight: '700',
                letterSpacing: '-1.5px',
                marginBottom: '20px'
              }}
            >
              {t.heroTitle} <br />
              <span className="gradient-text">{t.heroTitleHighlight}</span>
            </motion.h1>

            <motion.p 
              className="hero-desc" 
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 1.15vw, 1.25rem)',
                color: 'var(--c-text-dim)',
                lineHeight: '1.6',
                marginBottom: '32px',
                maxWidth: '540px'
              }}
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div className="hero-buttons" variants={itemVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                onClick={(e) => handleScroll(e, '#projects')}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                {t.heroCTAExplore} <FiArrowRight />
              </motion.a>
              
              <a 
                href="#contact" 
                className="btn btn-outline"
                onClick={(e) => handleScroll(e, '#contact')}
                style={{ backdropFilter: 'blur(10px)' }}
              >
                {t.heroCTALetsTalk}
              </a>
            </motion.div>

            {/* Premium Stats Row */}
            <motion.div 
              className="hero-stats" 
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '40px',
                borderTop: '1px solid var(--c-border)',
                paddingTop: '32px'
              }}
            >
              <div className="hero-stat">
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>10+</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'Builds Completed' : 'Sistem Selesai'}</p>
              </div>
              <div className="hero-stat">
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>3+</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'ML Models Deployed' : 'Model ML Diterapkan'}</p>
              </div>
              <div className="hero-stat">
                <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fff' }}>2+</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'Years Active' : 'Tahun Aktif'}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Stunning Interactive 3D Sphere + Parallax Floating Glass UI Panels */}
          <div className="hero-3d-wrapper" style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Behind Layer: 3D Morphing Orb */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
              <ThreeDObject />
            </div>

            {/* Front Floating Panel 1 (Top Left Parallax Glass Panel) */}
            <motion.div
              className="glass glow-border"
              style={{
                position: 'absolute',
                top: '20px',
                left: '-20px',
                zIndex: 5,
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--c-border)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                x: useSpring(useTransform(useMotionValue(mousePos.x), (val) => val * 0.75), { stiffness: 90 }),
                y: useSpring(useTransform(useMotionValue(mousePos.y), (val) => val * 0.75), { stiffness: 90 })
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 245, 212, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--c-accent)', fontSize: '1.1rem' }}>
                <FiCpu style={{ margin: 'auto' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--c-text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>MODEL STATUS</span>
                <strong style={{ fontSize: '0.85rem', color: '#fff' }}>98.4% Accuracy</strong>
              </div>
            </motion.div>

            {/* Front Floating Panel 2 (Bottom Right Parallax Glass Panel) */}
            <motion.div
              className="glass glow-border"
              style={{
                position: 'absolute',
                bottom: '25px',
                right: '-10px',
                zIndex: 5,
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--c-border)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                x: useSpring(useTransform(useMotionValue(mousePos.x), (val) => -val * 0.85), { stiffness: 90 }),
                y: useSpring(useTransform(useMotionValue(mousePos.y), (val) => -val * 0.85), { stiffness: 90 })
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--c-primary-light)', fontSize: '1.1rem' }}>
                <FiCheckCircle style={{ margin: 'auto' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--c-text-dim)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ECOSYSTEM STATUS</span>
                <strong style={{ fontSize: '0.85rem', color: '#fff' }}>HMR Online</strong>
              </div>
            </motion.div>

            {/* Floating Telemetry Hint */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-25px',
                fontSize: '0.75rem',
                color: 'var(--c-text-dim)',
                fontFamily: 'var(--font-mono)',
                zIndex: 6,
                letterSpacing: '1.5px',
                opacity: 0.6
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              // PORTFOLIO_SYSTEMS_ACTIVE
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
