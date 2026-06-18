import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiActivity, FiMapPin, FiCode, FiAward } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Experience({ lang }) {
  const t = portfolioData.translations[lang]
  const [expandedIndex, setExpandedIndex] = useState(0) // Default expand the first item

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    currentTarget.style.setProperty("--mouse-x", `${x}px`)
    currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  // Highly detailed accomplishments and tech badges for each position to make it complete & complex
  const experienceDetails = [
    {
      company: 'PT Hatta Alfarizi Indonesia',
      location: 'Indonesia (Remote)',
      tech: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'GitFlow', 'Bloc'],
      metrics: lang === 'id' 
        ? ['Peningkatan performa load data sebesar 30%', '98.5% Crash-Free Users di Google Play'] 
        : ['30% faster data-loading latency', '98.5% Crash-Free Users on Google Play'],
      bulletPoints: lang === 'id'
        ? [
            'Memimpin pengembangan modul pembayaran (payment gateway integration) menggunakan API terenkripsi.',
            'Merancang ulang cache manajemen lokal untuk menghemat penggunaan kuota internet pengguna.',
            'Bekerja sama dalam tim berisi 4 developer menggunakan GitFlow untuk delivery fitur mingguan.'
          ]
        : [
            'Led integration of secure payment gateway endpoints using encrypted REST APIs.',
            'Redesigned local SQLite/Hive caching layers, saving client internet overhead.',
            'Collaborated with a agile team of 4 developers, maintaining strict GitFlow guidelines.'
          ]
    },
    {
      company: 'Informatics Laboratory',
      location: 'Malang, Indonesia',
      tech: ['Python', 'SQL', 'Data structures', 'C++', 'Java'],
      metrics: lang === 'id'
        ? ['Membimbing 120+ mahasiswa praktikan', '94% Kelulusan Praktikum Berhasil']
        : ['Assisted 120+ computer science students', '94% Student Pass & Graduation Rate'],
      bulletPoints: lang === 'id'
        ? [
            'Mengajar materi Struktur Data, Algoritma, dan Pemrograman Dasar kepada mahasiswa tingkat satu.',
            'Menilai dan memberikan review kode terperinci pada tugas pemrograman mingguan mahasiswa.',
            'Membantu merancang modul praktikum baru berbasis kasus nyata industri.'
          ]
        : [
            'Instructed key modules in Object Oriented Programming, Data Structures, and Algorithms.',
            'Provided structured code reviews and feedback on weekly assignment repositories.',
            'Authored new lab documentation modules based on modern industry paradigms.'
          ]
    },
    {
      company: 'Self-Employed (Freelance)',
      location: 'Global / Remote',
      tech: ['React', 'NodeJS', 'Python', 'TailwindCSS', 'TensorFlow', 'PostgreSQL'],
      metrics: lang === 'id'
        ? ['Menyelesaikan 8+ kontrak proyek klien', '100% Client Satisfaction Rate']
        : ['Completed 8+ dynamic client contracts', '100% Client Satisfaction Rate'],
      bulletPoints: lang === 'id'
        ? [
            'Mengembangkan landing page interaktif & aplikasi dashboard manajemen internal untuk startup lokal.',
            'Membangun model machine learning kustom untuk peramalan time-series bisnis retail.',
            'Melakukan deployment web apps di VPS Linux dengan Docker & reverse proxy Nginx.'
          ]
        : [
            'Developed high-fidelity landing pages and custom internal metrics dashboards.',
            'Built custom time-series regression models forecasting customer demand spikes.',
            'Deployed fullstack assets on Linux VPS ecosystems utilizing Docker containers.'
          ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Title Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t.experienceTitle}
          </motion.h2>
          <motion.p 
            className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.experienceSubtitle}
          </motion.p>
        </div>

        {/* Timeline Component */}
        <motion.div 
          className="relative border-l border-[rgba(197,168,128,0.2)] ml-4 md:ml-6 space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {portfolioData.experience.map((item, index) => {
            const position = lang === 'id' && item.positionId ? item.positionId : item.position
            const desc = lang === 'id' && item.descId ? item.descId : item.desc
            const isExpanded = expandedIndex === index
            const details = experienceDetails[index] || { tech: [], metrics: [], bulletPoints: [] }

            return (
              <motion.div 
                key={index} 
                className="relative pl-8 md:pl-10"
                variants={itemVariants}
              >
                {/* Bullet node indicator */}
                <div 
                  className={`absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-[3px] transition-all duration-500 z-10 ${
                    isExpanded 
                      ? 'bg-[#c5a880] border-[#c5a880] scale-125 shadow-[0_0_15px_rgba(197,168,128,0.6)]' 
                      : 'bg-[#050508] border-[#c5a880]/40'
                  }`}
                />
                
                {/* Timeline Card */}
                <div 
                  className={`spotlight-card p-6 md:p-8 transition-all duration-500 cursor-pointer ${
                    isExpanded ? 'border-[#c5a880]/30 bg-[#0c0c14]/40 shadow-lg' : 'hover:border-white/10'
                  }`}
                  onMouseMove={handleMouseMove}
                  onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                >
                  {/* Title Bar */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground font-heading tracking-tight flex items-center gap-2">
                        {position}
                        <motion.span 
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="text-[#c5a880] text-sm md:hidden"
                        >
                          <FiChevronDown />
                        </motion.span>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#c5a880] font-body font-medium mt-1">
                        <span>{item.company}</span>
                        {details.location && (
                          <span className="text-[10px] text-[#8888aa] flex items-center gap-1 font-mono font-normal">
                            <FiMapPin /> {details.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#8888aa] px-3 py-1 rounded bg-white/5 border border-white/5 w-fit">
                        {item.date}
                      </span>
                      <motion.span 
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-[#c5a880] hidden md:inline-block text-base"
                      >
                        <FiChevronDown />
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* Brief Intro */}
                  <p className="text-sm text-[#8888aa] leading-relaxed relative z-10 font-body">
                    {desc}
                  </p>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden mt-6 pt-6 border-t border-white/5 relative z-10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Deliverables / Accomplishments (Takes 2 columns) */}
                          <div className="md:col-span-2 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
                              <FiAward /> {lang === 'id' ? 'Kontribusi & Pencapaian' : 'Contributions & Achievements'}
                            </h4>
                            <ul className="space-y-2.5 text-xs text-[#8888aa] list-disc list-inside leading-relaxed font-body">
                              {details.bulletPoints.map((bp, i) => (
                                <li key={i}>{bp}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech stack and metrics */}
                          <div className="space-y-4">
                            {/* Metrics */}
                            {details.metrics.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
                                  <FiActivity /> {lang === 'id' ? 'Metrik Dampak' : 'Impact Metrics'}
                                </h4>
                                <div className="space-y-1.5">
                                  {details.metrics.map((metric, i) => (
                                    <div key={i} className="text-[11px] font-semibold text-foreground font-mono bg-white/5 border border-white/5 rounded px-2.5 py-1">
                                      {metric}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tech Badges */}
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c5a880] flex items-center gap-2">
                                <FiCode /> {lang === 'id' ? 'Teknologi' : 'Stack'}
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {details.tech.map((t, i) => (
                                  <span key={i} className="text-[9px] font-mono text-[#8888aa] bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
