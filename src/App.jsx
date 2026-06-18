import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { BeamsBackground } from './components/ui/beams-background'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('#home')
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('selectedLang') || 'en'
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
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSetLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('selectedLang', newLang)
  }

  // Active section renderer with animation wrapper
  const renderSection = () => {
    switch (activeSection) {
      case '#home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Home lang={lang} onNavigate={setActiveSection} />
          </motion.div>
        )
      case '#about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <About lang={lang} />
          </motion.div>
        )
      case '#skills':
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Skills lang={lang} />
          </motion.div>
        )
      case '#projects':
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Projects lang={lang} />
          </motion.div>
        )
      case '#certificates':
        return (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Certificates lang={lang} />
          </motion.div>
        )
      case '#experience':
        return (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Experience lang={lang} />
          </motion.div>
        )
      case '#contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Contact lang={lang} />
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Home lang={lang} onNavigate={setActiveSection} />
          </motion.div>
        )
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {!loading && (
        <BeamsBackground className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-[#c5a880]/30 selection:text-white">
          
          {/* Subtle noise grain filter overlay */}
          <div className="noise-overlay" />

          {/* Interactive premium custom magnetic cursor */}
          <CustomCursor />

          {/* Sticky Navbar with Routing props */}
          <Navbar 
            lang={lang} 
            setLang={handleSetLang} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          
          {/* Animated Page Container */}
          <div className="pt-24 min-h-[calc(100vh-100px)] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
            <Footer lang={lang} />
          </div>

        </BeamsBackground>
      )}
    </>
  )
}
