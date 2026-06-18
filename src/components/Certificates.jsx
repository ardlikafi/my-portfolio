import { motion } from 'framer-motion'
import { FiAward, FiExternalLink } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Certificates({ lang }) {
  const t = portfolioData.translations[lang]

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    currentTarget.style.setProperty("--mouse-x", `${x}px`)
    currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="certificates" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "luxury" }}
          >
            {t.certificatesTitle}
          </motion.h2>
          <motion.p 
            className="text-sm uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.certificatesSubtitle}
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {portfolioData.certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="spotlight-card flex flex-col justify-between"
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              whileHover={{ y: -6 }}
            >
              <div className="relative z-10">
                {/* Image Frame */}
                <div className="relative overflow-hidden h-40 bg-charcoal-dark border-b border-[rgba(255,255,255,0.03)]">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={cert.image} 
                    alt={cert.title} 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 p-2 rounded bg-black/60 backdrop-blur-md border border-white/5">
                    <FiAward className="w-5 h-5 text-[#c5a880]" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-light text-foreground mb-2 font-heading leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#8888aa] font-body">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Bottom verify link */}
              <div className="p-6 pt-0 relative z-10">
                <div className="border-t border-[rgba(255,255,255,0.03)] pt-4 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#8888aa] font-mono">
                    Issued: {cert.date}
                  </span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#c5a880] hover:text-white flex items-center gap-1 font-semibold font-body"
                    >
                      {t.certificatesView} <FiExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
