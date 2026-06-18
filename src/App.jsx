import { useState, useEffect } from 'react'
import { AnimatePresence, useScroll, useSpring, motion } from 'framer-motion'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import Background3D from './components/Background3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('selectedLang') || 'en'
  })

  // Dynamic Scroll Progress logic
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleSetLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('selectedLang', newLang)
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {!loading && (
        <div className="portfolio-wrapper">
          {/* Neon Scroll Progress Indicator */}
          <motion.div
            style={{
              scaleX,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'var(--c-gradient)',
              transformOrigin: '0%',
              zIndex: 1000,
              boxShadow: '0 0 10px rgba(0, 245, 212, 0.6)'
            }}
          />
          <Background3D />
          <Navbar lang={lang} setLang={handleSetLang} />
          <Hero lang={lang} />
          <About lang={lang} />
          <Skills lang={lang} />
          <Projects lang={lang} />
          <Experience lang={lang} />
          <Process lang={lang} />
          <Contact lang={lang} />
          <Footer lang={lang} />
        </div>
      )}
    </>
  )
}
