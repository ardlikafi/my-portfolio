import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function Skills({ lang }) {
  const t = portfolioData.translations[lang]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="skills" className="section-padding" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Title Block */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {t.skillsTitle}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.skillsSubtitle}
        </motion.p>

        {/* Categories Grid */}
        <motion.div 
          className="skills-categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {portfolioData.skills.map((skill, index) => {
            const Icon = skill.icon
            
            // Map index/category to a dynamic title translation key
            let categoryTitle = skill.title
            if (skill.category === 'mobile') categoryTitle = t.skillsMobile
            if (skill.category === 'web') categoryTitle = t.skillsWeb
            if (skill.category === 'backend') categoryTitle = t.skillsBackend
            if (skill.category === 'tools') categoryTitle = t.skillsTools

             return (
              <motion.div 
                key={index}
                className="skill-card glass glow-border"
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius)',
                  padding: '35px 28px',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(20px)',
                  webkitBackdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, box-shadow 0.3s'
                }}
              >
                {/* Micro backlight glow based on index to differentiate categories */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '-40px',
                    right: '-40px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: index % 2 === 0 ? 'rgba(0, 245, 212, 0.08)' : 'rgba(108, 92, 231, 0.08)',
                    filter: 'blur(30px)',
                    pointerEvents: 'none'
                  }}
                />

                <div className="skill-card-icon" style={{ fontSize: '2rem', color: index % 2 === 0 ? 'var(--c-accent)' : 'var(--c-primary-light)', marginBottom: '20px' }}>
                  <Icon />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>{categoryTitle}</h3>
                <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skill.tags.map((tag, tagIndex) => {
                    const isPrimaryFocus = 
                      tag.toLowerCase().includes('primary') || 
                      tag.toLowerCase().includes('react') || 
                      tag.toLowerCase().includes('tensorflow') ||
                      tag.toLowerCase().includes('pytorch')
                    
                    return (
                      <span 
                        key={tagIndex} 
                        className={`skill-tag ${isPrimaryFocus ? 'primary' : ''}`}
                        style={{
                          fontSize: '0.8rem',
                          padding: '6px 12px',
                          borderRadius: '50px',
                          border: '1px solid var(--c-border)',
                          background: isPrimaryFocus ? 'rgba(0, 245, 212, 0.08)' : 'rgba(255,255,255,0.02)',
                          color: isPrimaryFocus ? 'var(--c-accent)' : 'var(--c-text-dim)',
                          borderColor: isPrimaryFocus ? 'rgba(0, 245, 212, 0.3)' : 'var(--c-border)',
                          transition: 'all 0.3s'
                        }}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
