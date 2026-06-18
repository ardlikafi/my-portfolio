import { motion } from 'framer-motion'
import { FiSearch, FiLayers, FiCpu, FiCheckSquare, FiSend } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Process({ lang }) {
  // Translate labels based on active language
  const steps = [
    {
      step: "01",
      title: lang === 'en' ? "Research" : "Riset",
      desc: lang === 'en' 
        ? "Deeply analyzing project requirements, user personas, and target architectures to form solid logic patterns."
        : "Menganalisis kebutuhan proyek, persona pengguna, dan arsitektur target secara mendalam untuk membentuk pola logika.",
      icon: FiSearch,
      glow: "rgba(0, 245, 212, 0.15)"
    },
    {
      step: "02",
      title: lang === 'en' ? "Design" : "Desain",
      desc: lang === 'en'
        ? "Drafting high-end glassmorphic wireframes, schema architectures, and interactive state models."
        : "Merancang wireframe glassmorphic kelas tinggi, arsitektur skema, dan model state interaktif.",
      icon: FiLayers,
      glow: "rgba(108, 92, 231, 0.15)"
    },
    {
      step: "03",
      title: lang === 'en' ? "Build" : "Kembangkan",
      desc: lang === 'en'
        ? "Engineering clean, highly modular codebases in Flutter, React, and robust AI integrations."
        : "Merekayasa codebase yang bersih dan modular dalam Flutter, React, serta integrasi AI yang kuat.",
      icon: FiCpu,
      glow: "rgba(0, 187, 249, 0.15)"
    },
    {
      step: "04",
      title: lang === 'en' ? "Test" : "Validasi",
      desc: lang === 'en'
        ? "Automating validation processes, unit testing, and rigorous cross-platform device performance audits."
        : "Mengotomatiskan proses validasi, unit testing, dan audit performa lintas platform perangkat.",
      icon: FiCheckSquare,
      glow: "rgba(0, 245, 212, 0.15)"
    },
    {
      step: "05",
      title: lang === 'en' ? "Deploy" : "Luncurkan",
      desc: lang === 'en'
        ? "Distributing performant bundles to Production, setting up CI/CD, and scaling the infrastructure."
        : "Mendistribusikan bundle performa tinggi ke Produksi, mengatur CI/CD, dan meningkatkan skala infrastruktur.",
      icon: FiSend,
      glow: "rgba(108, 92, 231, 0.15)"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 }
    }
  }

  const stepVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="process" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {lang === 'en' ? "Engineering Process" : "Alur Proses Rekayasa"}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {lang === 'en'
            ? "How I transform high-level requirements into scalable digital systems."
            : "Bagaimana saya mengubah kebutuhan tingkat tinggi menjadi sistem digital yang skalabel."}
        </motion.p>

        {/* Process Timeline Line Grid */}
        <motion.div 
          className="process-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            position: 'relative',
            marginTop: '60px'
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                variants={stepVariants}
                className="process-card glass glow-border"
                style={{
                  padding: '40px 30px',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3)`,
                  backdropFilter: 'blur(20px)',
                  webkitBackdropFilter: 'blur(20px)',
                  overflow: 'hidden'
                }}
              >
                {/* Back light glow */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '-60px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: step.glow,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />

                {/* Badge Node */}
                <div 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid var(--c-border)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--c-text-dim)',
                    marginBottom: '28px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {step.step}
                </div>

                {/* Icon Circle */}
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: idx % 2 === 0 ? 'var(--c-accent)' : 'var(--c-primary-light)',
                    marginBottom: '24px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <Icon />
                </div>

                <h3 
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '14px',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {step.title}
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '0.88rem',
                    color: 'var(--c-text-dim)',
                    lineHeight: '1.6',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
