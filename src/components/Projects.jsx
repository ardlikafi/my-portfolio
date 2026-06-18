import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Projects({ lang }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const t = portfolioData.translations[lang]

  const filters = [
    { key: 'all', label: t.projectsAll },
    { key: 'flutter', label: t.projectsFlutter },
    { key: 'web', label: t.projectsWeb },
    { key: 'ml', label: t.projectsML },
  ]

  // Filter items based on active category
  const filteredProjects = portfolioData.projects.filter(p => {
    if (activeFilter === 'all') return true
    return p.category === activeFilter
  })

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        {/* Header Block */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {t.projectsTitle}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.projectsSubtitle}
        </motion.p>

        {/* Filter Chip Controls */}
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`filter-chip ${activeFilter === filter.key ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Animated Projects Grid */}
        <motion.div 
          layout 
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const projectTitle = lang === 'id' && project.titleId ? project.titleId : project.title;
              const projectDesc = lang === 'id' && project.descId ? project.descId : project.desc;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -12, scale: 1.015, transition: { duration: 0.3 } }}
                  key={project.id}
                  className="project-card glow-border glass"
                  style={{
                    background: 'var(--c-bg-card)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(20px)',
                    webkitBackdropFilter: 'blur(20px)',
                    position: 'relative'
                  }}
                >
                  {/* Image with scaling hover effect */}
                  <div className="project-image-wrapper" style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                    <motion.img 
                      className="project-image" 
                      src={project.image} 
                      alt={projectTitle} 
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Hover Link Overlay */}
                    <div className="project-overlay" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(5, 5, 12, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
                        >
                          <FiGithub /> {t.projectsView}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Info Card Block */}
                  <div className="project-info" style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>{projectTitle}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--c-text-dim)', lineHeight: '1.5', marginBottom: '20px' }}>{projectDesc}</p>
                    </div>
                    <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="project-tag"
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '50px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--c-border)',
                            color: 'var(--c-text-dim)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
