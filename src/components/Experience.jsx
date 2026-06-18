import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function Experience({ lang }) {
  const t = portfolioData.translations[lang]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="experience" className="section-padding" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Title Heading */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {t.experienceTitle}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.experienceSubtitle}
        </motion.p>

        {/* Timeline Component */}
        <motion.div 
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {portfolioData.experience.map((item, index) => {
            const position = lang === 'id' && item.positionId ? item.positionId : item.position
            const desc = lang === 'id' && item.descId ? item.descId : item.desc

            return (
              <motion.div 
                key={index} 
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-card glass glow-border">
                  <span className="date">{item.date}</span>
                  <h3>{position}</h3>
                  <span className="company">{item.company}</span>
                  <p>{desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
