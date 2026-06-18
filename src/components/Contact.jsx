import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiTerminal, FiMail, FiLinkedin, FiGithub, FiCornerDownLeft } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Contact({ lang }) {
  const t = portfolioData.translations[lang]
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState([
    { text: 'AKM_SYSTEMS_CORE_INIT_OK', type: 'system' },
    { text: lang === 'en' ? 'Establishing secure connection...' : 'Membangun koneksi aman...', type: 'system' },
    { text: 'Neural handshake complete on port 5173.', type: 'system' },
    { text: '', type: 'empty' },
    { text: lang === 'en' ? "Welcome to Ardli's terminal. Type 'help' or click the buttons below." : "Selamat datang di terminal Ardli. Ketik 'help' atau klik tombol di bawah.", type: 'success' },
    { text: '', type: 'empty' }
  ])
  const [wizardStep, setWizardStep] = useState(0) // 0: normal, 1: name, 2: email, 3: message
  const [wizardData, setWizardData] = useState({ name: '', email: '', message: '' })
  const logEndRef = useRef(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs])

  const appendLog = (text, type = 'output') => {
    setTerminalLogs((prev) => [...prev, { text, type }])
  }

  // Interactive Command Logic
  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase()
    appendLog(`akm@guest:~$ ${cmdText}`, 'input')

    // Handle Wizard stages
    if (wizardStep === 1) {
      setWizardData(prev => ({ ...prev, name: cmdText }))
      setWizardStep(2)
      appendLog(lang === 'en' ? '>> Enter your email address:' : '>> Masukkan alamat email Anda:', 'wizard')
      setTerminalInput('')
      return
    }
    if (wizardStep === 2) {
      setWizardData(prev => ({ ...prev, email: cmdText }))
      setWizardStep(3)
      appendLog(lang === 'en' ? '>> Enter your message:' : '>> Masukkan pesan Anda:', 'wizard')
      setTerminalInput('')
      return
    }
    if (wizardStep === 3) {
      const finalMsg = cmdText
      appendLog(lang === 'en' ? '>> Packing secure cargo payload...' : '>> Membungkus muatan kargo aman...', 'system')
      
      // Simulate transmitting
      setTimeout(() => {
        appendLog(lang === 'en' ? '✔ TRANSMISSION SUCCESSFUL! Core server acknowledged.' : '✔ TRANSMISI SUKSES! Server utama menerima pesan.', 'success')
        appendLog(lang === 'en' ? `Sender: ${wizardData.name} <${wizardData.email}>` : `Pengirim: ${wizardData.name} <${wizardData.email}>`, 'output')
        appendLog(lang === 'en' ? `Payload: "${finalMsg}"` : `Muatan: "${finalMsg}"`, 'output')
        appendLog('', 'empty')
      }, 1000)

      setWizardStep(0)
      setWizardData({ name: '', email: '', message: '' })
      setTerminalInput('')
      return
    }

    // Normal command list
    switch (cleanCmd) {
      case 'help':
        appendLog(lang === 'en' ? 'Available commands:' : 'Perintah yang tersedia:', 'system')
        appendLog('  bio     - ' + (lang === 'en' ? 'Display summary of who I am.' : 'Tampilkan ringkasan siapa saya.'), 'output')
        appendLog('  skills  - ' + (lang === 'en' ? 'Show main technical focus stack.' : 'Tampilkan fokus stack teknis utama.'), 'output')
        appendLog('  contact - ' + (lang === 'en' ? 'Launch interactive mail wizard.' : 'Luncurkan panduan surat interaktif.'), 'output')
        appendLog('  clear   - ' + (lang === 'en' ? 'Clear the terminal output.' : 'Bersihkan tampilan terminal.'), 'output')
        break
      case 'clear':
        setTerminalLogs([])
        break
      case 'bio':
        appendLog(lang === 'en' ? '===================================================' : '===================================================', 'system')
        appendLog('  Name      : Ardli Kafi Murobby', 'output')
        appendLog('  Role      : Full-Stack & ML Specialist', 'output')
        appendLog('  Education : Informatics Scholar', 'output')
        appendLog('  Mission   : Engineering high-performance digital ecosystems.', 'output')
        appendLog(lang === 'en' ? '===================================================' : '===================================================', 'system')
        break
      case 'skills':
        appendLog('🚀 Focus Stack Node:', 'success')
        appendLog('  [Mobile]  Flutter, Dart, Provider/Bloc', 'output')
        appendLog('  [Web]     React, Vite, CSS Glassmorphism, Node.js', 'output')
        appendLog('  [ML/AI]   Python, PyTorch, TensorFlow, Scikit-learn', 'output')
        break
      case 'contact':
        setWizardStep(1)
        appendLog(lang === 'en' ? '🔑 Launching SECURE_MAIL_WIZARD_v1.0' : '🔑 Meluncurkan SECURE_MAIL_WIZARD_v1.0', 'success')
        appendLog(lang === 'en' ? '>> Enter your name:' : '>> Masukkan nama Anda:', 'wizard')
        break
      default:
        appendLog(lang === 'en' ? `command not found: '${cleanCmd}'. Type 'help' for support.` : `perintah tidak ditemukan: '${cleanCmd}'. Ketik 'help' untuk bantuan.`, 'error')
    }

    setTerminalInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput)
    }
  }

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {t.contactTitle}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.contactSubtitle}
        </motion.p>

        {/* Terminal Grid */}
        <div 
          className="terminal-layout" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 340px', 
            gap: '40px', 
            marginTop: '40px',
            alignItems: 'start'
          }}
        >
          {/* Main Terminal Window */}
          <motion.div 
            className="terminal-window glow-border glass"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'rgba(5, 5, 12, 0.85)',
              border: '1px solid var(--c-border)',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Header / Window Controls */}
            <div 
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid var(--c-border)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eb5e55', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f7b05b', display: 'inline-block' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00f5d4', display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--c-text-dim)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiTerminal /> SECURE_CONSOLE // PORT_5173
              </div>
              <div style={{ width: '48px' }} />
            </div>

            {/* Terminal Body logs */}
            <div 
              style={{
                height: '320px',
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                scrollBehavior: 'smooth'
              }}
            >
              {terminalLogs.map((log, idx) => {
                let color = 'var(--c-text)'
                if (log.type === 'system') color = 'var(--c-text-dim)'
                if (log.type === 'success') color = 'var(--c-accent)'
                if (log.type === 'wizard') color = 'var(--c-primary-light)'
                if (log.type === 'error') color = '#eb5e55'
                if (log.type === 'input') color = '#ffffff'

                return (
                  <div key={idx} style={{ color, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                    {log.text}
                  </div>
                )
              })}
              <div ref={logEndRef} />
            </div>

            {/* Input Bar */}
            <div 
              style={{
                borderTop: '1px solid var(--c-border)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <span style={{ color: 'var(--c-accent)' }}>akm@guest:~$</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={wizardStep > 0 ? (lang === 'en' ? 'Type and press Enter...' : 'Ketik lalu tekan Enter...') : (lang === 'en' ? "Type 'help'..." : "Ketik 'help'...")}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem'
                }}
              />
              <button 
                onClick={() => handleCommand(terminalInput)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <FiCornerDownLeft />
              </button>
            </div>
          </motion.div>

          {/* Quick Click Commands & Socials (Right Column) */}
          <motion.div
            className="terminal-sidebar"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Quick Actions Panel */}
            <div className="glass" style={{ padding: '28px', border: '1px solid var(--c-border)', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '16px', fontWeight: '600' }}>
                {lang === 'en' ? 'Quick Operations' : 'Operasi Cepat'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={() => handleCommand('contact')}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                >
                  &gt; run contact_wizard
                </button>
                <button 
                  onClick={() => handleCommand('skills')}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                >
                  &gt; get skill_matrix
                </button>
                <button 
                  onClick={() => handleCommand('bio')}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                >
                  &gt; cat profile_summary
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="glass" style={{ padding: '24px', border: '1px solid var(--c-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-around' }}>
              <a 
                href="mailto:ardlikafimurobby02@gmail.com" 
                className="social-icon-btn glow-border"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: 'var(--c-text)',
                  transition: 'all 0.3s'
                }}
              >
                <FiMail />
              </a>
              <a 
                href="https://www.linkedin.com/in/ardli-kafi-murobby-a89a8a19b/" 
                target="_blank" 
                rel="noreferrer"
                className="social-icon-btn glow-border"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: 'var(--c-text)',
                  transition: 'all 0.3s'
                }}
              >
                <FiLinkedin />
              </a>
              <a 
                href="https://github.com/ardlikafi" 
                target="_blank" 
                rel="noreferrer"
                className="social-icon-btn glow-border"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--c-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: 'var(--c-text)',
                  transition: 'all 0.3s'
                }}
              >
                <FiGithub />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
