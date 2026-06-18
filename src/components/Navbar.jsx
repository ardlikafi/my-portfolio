import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Navbar({ lang, setLang, activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = portfolioData.translations[lang]

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#skills', label: t.navSkills },
    { href: '#projects', label: t.navProjects },
    { href: '#certificates', label: t.navCertificates },
    { href: '#experience', label: t.navExperience },
    { href: '#contact', label: t.navContact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    setActiveSection(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-luxury ${
          scrolled 
            ? 'bg-background/85 backdrop-blur-xl border-b border-border py-4' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <a 
            href="#home" 
            className="text-lg md:text-xl font-bold font-heading text-foreground tracking-tight hover:text-[#c5a880] transition-colors"
            onClick={(e) => handleClick(e, '#home')}
          >
            Ardli Kafi<span className="text-[#c5a880]">.</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8 font-body">
            <ul className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
              {links.map((l) => {
                const isActive = activeSection === l.href
                return (
                  <li key={l.href} className="relative">
                    <a 
                      href={l.href} 
                      onClick={(e) => handleClick(e, l.href)}
                      className={`transition-colors duration-300 relative py-1 ${
                        isActive ? 'text-[#c5a880]' : 'text-[#8888aa] hover:text-foreground'
                      }`}
                    >
                      {l.label}
                    </a>
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c5a880]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Language Switcher */}
            <div className="flex gap-1.5 border border-border rounded-full p-1 bg-white/5">
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  lang === 'en' 
                    ? 'bg-[#c5a880] text-black shadow-md' 
                    : 'text-[#8888aa] hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('id')} 
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  lang === 'id' 
                    ? 'bg-[#c5a880] text-black shadow-md' 
                    : 'text-[#8888aa] hover:text-foreground'
                }`}
              >
                ID
              </button>
            </div>
          </nav>
          
          <button 
            className="md:hidden text-foreground text-2xl" 
            onClick={() => setMobileOpen(true)} 
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 w-72 h-full bg-[#0c0c10] border-l border-border z-50 p-8 flex flex-col gap-6 md:hidden font-body"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-heading text-lg font-bold">Menu</span>
                <button 
                  className="text-foreground text-2xl" 
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>
              
              {/* Language Selector for mobile */}
              <div className="flex gap-2 border border-border rounded-xl p-1 bg-white/5">
                <button 
                  onClick={() => { setLang('en'); setMobileOpen(false); }} 
                  className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${
                    lang === 'en' ? 'bg-[#c5a880] text-black' : 'text-[#8888aa]'
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLang('id'); setMobileOpen(false); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${
                    lang === 'id' ? 'bg-[#c5a880] text-black' : 'text-[#8888aa]'
                  }`}
                >
                  Indonesia
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4 text-sm font-semibold uppercase tracking-wider">
                {links.map((l) => {
                  const isActive = activeSection === l.href
                  return (
                    <a 
                      key={l.href} 
                      href={l.href} 
                      onClick={(e) => handleClick(e, l.href)}
                      className={`py-2 border-b border-white/5 transition-colors ${
                        isActive ? 'text-[#c5a880]' : 'text-[#8888aa] hover:text-[#c5a880]'
                      }`}
                    >
                      {l.label}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
