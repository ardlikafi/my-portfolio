import { motion } from 'framer-motion'
import { FiCheckCircle, FiShield, FiZap, FiTarget } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function About({ lang }) {
  const t = portfolioData.translations[lang]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="about" className="section-padding">
      <div className="container">
        {/* Title Block */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {t.aboutTitle}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.aboutSubtitle}
        </motion.p>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Visual Canvas Block (Left) */}
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-border"></div>
            {/* Using an extremely premium crypto-abstract developer workstation image */}
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
              alt="Developer workspace" 
            />
          </motion.div>

          {/* Descriptive Block (Right) */}
          <motion.div 
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.h3 className="gradient-text" variants={cardVariants}>
              Ardli Kafi Murobby
            </motion.h3>
            <motion.p variants={cardVariants}>
              {t.aboutP1}
            </motion.p>
            <motion.p variants={cardVariants}>
              {t.aboutP2}
            </motion.p>
            <motion.p variants={cardVariants}>
              {t.aboutP3}
            </motion.p>

            {/* Premium Highlights / Stats Cards Grid */}
            <motion.div 
              className="about-highlights" 
              variants={containerVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
                marginTop: '32px'
              }}
            >
              <motion.div 
                className="highlight-card glass glow-border" 
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)'
                }}
              >
                <FiZap className="icon" style={{ fontSize: '1.6rem', color: 'var(--c-accent)', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>10+</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'Builds Completed' : 'Sistem Selesai'}</span>
              </motion.div>

              <motion.div 
                className="highlight-card glass glow-border" 
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)'
                }}
              >
                <FiShield className="icon" style={{ fontSize: '1.6rem', color: 'var(--c-primary-light)', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>3+</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'ML Models' : 'Model ML'}</span>
              </motion.div>

              <motion.div 
                className="highlight-card glass glow-border" 
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)'
                }}
              >
                <FiTarget className="icon" style={{ fontSize: '1.6rem', color: 'var(--c-accent)', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>2+</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'Years Active' : 'Tahun Aktif'}</span>
              </motion.div>

              <motion.div 
                className="highlight-card glass glow-border" 
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)'
                }}
              >
                <FiCheckCircle className="icon" style={{ fontSize: '1.6rem', color: 'var(--c-primary-light)', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>100%</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--c-text-dim)' }}>{lang === 'en' ? 'Delivery Rate' : 'Tingkat Sukses'}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
