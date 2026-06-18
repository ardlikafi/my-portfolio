import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiTerminal, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Contact({ lang }) {
  const t = portfolioData.translations[lang]
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const [consoleLogs, setConsoleLogs] = useState([
    { text: '[SYSTEM] Initializing client routing gateway...', type: 'system' },
    { text: '[SYSTEM] Secure TLS handshake verified. Status: OK', type: 'success' },
    { text: '[SYSTEM] Port 465 (SMTP) and DB nodes: Connected', type: 'success' },
    { text: '[SYSTEM] Awaiting user telemetry input...', type: 'info' }
  ])

  const logEndRef = useRef(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [consoleLogs])

  const addLog = (text, type = 'info') => {
    setConsoleLogs(prev => {
      // Limit logs history so it doesn't overflow container height
      const currentLogs = prev.length > 20 ? prev.slice(prev.length - 20) : prev
      return [...currentLogs, { text, type }]
    })
  }

  // Periodic simulated server ping logs
  useEffect(() => {
    const interval = setInterval(() => {
      const pings = [14, 18, 22, 16, 29, 15]
      const activePing = pings[Math.floor(Math.random() * pings.length)]
      addLog(`[PING] API ping latency: ${activePing}ms | Memory: 42MB | DB: Online`, 'info')
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  // Live form typing validation logging
  useEffect(() => {
    if (!formData.name && !formData.email && !formData.subject && !formData.message) return
    const debounceTimer = setTimeout(() => {
      const emailStatus = formData.email ? (formData.email.includes('@') ? 'OK' : 'PENDING_AT') : 'EMPTY'
      addLog(`[TELEMETRY] BufState: Name(${formData.name.length} ch) | Email(${emailStatus}) | Payload(${formData.message.length} ch)`, 'system')
    }, 1200)
    return () => clearTimeout(debounceTimer)
  }, [formData])

  const handleFocus = (field) => {
    if (field === 'name') {
      addLog('> Focus: CLIENT_NAME_FIELD allocated.', 'input')
    } else if (field === 'email') {
      addLog('> Focus: CLIENT_EMAIL_FIELD allocated.', 'input')
    } else if (field === 'subject') {
      addLog('> Focus: PAYLOAD_SUBJECT_FIELD allocated.', 'input')
    } else if (field === 'message') {
      addLog('> Focus: TRANSMISSION_PAYLOAD_BUFFER opened.', 'input')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    currentTarget.style.setProperty("--mouse-x", `${x}px`)
    currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      addLog('[ERROR] Input validation failed. Required fields empty.', 'error')
      return
    }

    setIsSending(true)
    addLog('[SYS] Compiling payload parameters...', 'system')
    addLog(`[SYS] Source: ${formData.name} <${formData.email}>`, 'info')
    
    setTimeout(() => {
      addLog('[SYS] Initiating secure routing sequence...', 'system')
      setTimeout(() => {
        addLog('[COM] Remote gateway authenticated.', 'info')
        addLog('[COM] Transmitting secure message pack...', 'info')
        
        setTimeout(() => {
          setIsSending(false)
          setSuccess(true)
          addLog('✔ TRANSMISSION COMPLETED SUCCESSFULLY. Acknowledged.', 'success')
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1200)
      }, 1000)
    }, 800)
  }

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "luxury" }}
          >
            {t.contactTitle}
          </motion.h2>
          <motion.p 
            className="text-sm uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.contactSubtitle}
          </motion.p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Premium Glassmorphic Form */}
          <motion.div 
            className="spotlight-card p-8"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseMove={handleMouseMove}
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 font-body">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8888aa] mb-2">
                  {t.contactFormName}
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0c0c10]/70 border border-white/10 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#8888aa]/40 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8888aa] mb-2">
                  {t.contactFormEmail}
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  required
                  placeholder="johndoe@example.com"
                  className="w-full bg-[#0c0c10]/70 border border-white/10 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#8888aa]/40 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8888aa] mb-2">
                  {t.contactFormSubject}
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  placeholder="Let's build something"
                  className="w-full bg-[#0c0c10]/70 border border-white/10 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#8888aa]/40 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8888aa] mb-2">
                  {t.contactFormMessage}
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full bg-[#0c0c10]/70 border border-white/10 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl px-4 py-3 text-sm text-white placeholder-[#8888aa]/40 outline-none transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#c5a880] text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-[#d5b890] transition-colors duration-300 disabled:opacity-50"
              >
                {isSending ? t.contactFormSending : t.contactFormSubmit}
              </button>

              {success && (
                <p className="text-xs text-green-400 mt-2 text-center font-mono">
                  {t.contactFormSuccess}
                </p>
              )}
            </form>
          </motion.div>

          {/* Right: Interactive Console Output */}
          <motion.div 
            className="spotlight-card h-[450px] flex flex-col justify-between"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onMouseMove={handleMouseMove}
          >
            {/* Console top bar */}
            <div className="relative z-10 px-6 py-4 bg-white/5 border-b border-[rgba(255,255,255,0.03)] flex items-center justify-between">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-[#8888aa] flex items-center gap-1.5">
                <FiTerminal /> TELEMETRY_CONSOLE // LIVE_DASHBOARD
              </span>
            </div>

            {/* Console log outputs */}
            <div className="relative z-10 p-6 flex-1 overflow-y-auto font-mono text-xs space-y-2.5 text-[#8888aa]">
              {consoleLogs.map((log, idx) => {
                let color = 'text-[#8888aa]'
                if (log.type === 'system') color = 'text-[#c5a880]'
                if (log.type === 'success') color = 'text-green-400'
                if (log.type === 'error') color = 'text-red-400'
                if (log.type === 'input') color = 'text-white'

                return (
                  <div key={idx} className={`${color} leading-relaxed break-all`}>
                    {log.text}
                  </div>
                )
              })}
              <div ref={logEndRef} />
            </div>

            {/* Quick channels bottom */}
            <div className="relative z-10 px-6 py-4 bg-white/5 border-t border-[rgba(255,255,255,0.03)] flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#8888aa]">
                Channels:
              </span>
              <div className="flex gap-4">
                <a 
                  href="mailto:ardlikafimurobby02@gmail.com" 
                  className="text-sm text-[#8888aa] hover:text-[#c5a880] transition-colors"
                  title="Email"
                >
                  <FiMail />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ardli-kafi-murobby-a89a8a19b/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-[#8888aa] hover:text-[#c5a880] transition-colors"
                  title="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a 
                  href="https://github.com/ardlikafi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-[#8888aa] hover:text-[#c5a880] transition-colors"
                  title="GitHub"
                >
                  <FiGithub />
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
