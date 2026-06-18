import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = portfolioData.translations[lang]

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#skills', label: t.navSkills },
    { href: '#projects', label: t.navProjects },
    { href: '#experience', label: t.navExperience },
    { href: '#contact', label: t.navContact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container">
          <a href="#home" className="nav-logo" onClick={(e) => handleClick(e, '#home')}>
            AKM<span>.</span>
          </a>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => handleClick(e, l.href)}>{l.label}</a>
                </li>
              ))}
              
              {/* Language Switcher */}
              <li style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
                <button 
                  onClick={() => setLang('en')} 
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--c-border)',
                    color: lang === 'en' ? 'var(--c-accent)' : 'var(--c-text-dim)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    borderColor: lang === 'en' ? 'var(--c-accent)' : 'var(--c-border)',
                    transition: 'all 0.3s'
                  }}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('id')} 
                  className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--c-border)',
                    color: lang === 'id' ? 'var(--c-accent)' : 'var(--c-text-dim)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    borderColor: lang === 'id' ? 'var(--c-accent)' : 'var(--c-border)',
                    transition: 'all 0.3s'
                  }}
                >
                  ID
                </button>
              </li>

              <li>
                <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => handleClick(e, '#contact')}>
                  {t.navContact}
                </a>
              </li>
            </ul>
          </nav>
          
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FiMenu />
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-nav open"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
                <FiX />
              </button>
              
              {/* Language Selector for mobile */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button 
                  onClick={() => { setLang('en'); setMobileOpen(false); }} 
                  style={{
                    flex: 1,
                    background: lang === 'en' ? 'rgba(0,245,212,0.1)' : 'transparent',
                    border: '1px solid',
                    borderColor: lang === 'en' ? 'var(--c-accent)' : 'var(--c-border)',
                    color: lang === 'en' ? 'var(--c-accent)' : '#fff',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLang('id'); setMobileOpen(false); }}
                  style={{
                    flex: 1,
                    background: lang === 'id' ? 'rgba(0,245,212,0.1)' : 'transparent',
                    border: '1px solid',
                    borderColor: lang === 'id' ? 'var(--c-accent)' : 'var(--c-border)',
                    color: lang === 'id' ? 'var(--c-accent)' : '#fff',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Indonesia
                </button>
              </div>

              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
