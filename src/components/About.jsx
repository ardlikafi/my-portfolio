import { motion } from 'framer-motion'
import { FiCheckCircle, FiShield, FiZap, FiTarget } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function About({ lang }) {
  const t = portfolioData.translations[lang]

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    currentTarget.style.setProperty("--mouse-x", `${x}px`)
    currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Decorative background grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Title Block */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "luxury" }}
          >
            {t.aboutTitle}
          </motion.h2>
          <motion.p 
            className="text-sm uppercase tracking-[0.2em] text-[#c5a880] font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.aboutSubtitle}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Bento Card 1: Biography (Takes 2 cols on medium+) */}
          <motion.div 
            className="md:col-span-2 spotlight-card p-8 flex flex-col justify-between"
            variants={itemVariants}
            onMouseMove={handleMouseMove}
          >
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] mb-2 block font-body">
                {lang === 'id' ? 'RIWAYAT SINGKAT' : 'BIOGRAPHY'}
              </span>
              <h3 className="text-3xl font-light text-foreground mb-6 font-heading">
                Ardli Kafi Murobby
              </h3>
              <div className="space-y-4 text-sm md:text-base text-[#8888aa] leading-relaxed font-body">
                <p>{t.aboutP1}</p>
                <p>{t.aboutP2}</p>
                <p>{t.aboutP3}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.03)] flex justify-between items-center relative z-10">
              <span className="text-xs text-[#8888aa] font-mono">
                Location: Indonesia
              </span>
              <span className="text-xs text-[#8888aa] font-mono">
                GPA: 3.8+ / 4.0
              </span>
            </div>
          </motion.div>

          {/* Bento Card 2: Interactive Focus & Strengths */}
          <motion.div 
            className="spotlight-card p-8 flex flex-col justify-between"
            variants={itemVariants}
            onMouseMove={handleMouseMove}
          >
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] mb-2 block font-body">
                {lang === 'id' ? 'FOKUS UTAMA' : 'CORE FOCUS'}
              </span>
              <h3 className="text-2xl font-light text-foreground mb-6 font-heading">
                {lang === 'id' ? 'Karakteristik' : 'Key Traits'}
              </h3>
              
              <ul className="space-y-4">
                {[t.aboutHighlight1, t.aboutHighlight2, t.aboutHighlight3, t.aboutHighlight4].map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#8888aa] font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(197,168,128,0.03)] border border-[rgba(197,168,128,0.08)] relative z-10">
              <p className="text-xs text-[#c5a880] leading-relaxed font-mono">
                {lang === 'id' 
                  ? "// Berkomitmen untuk terus belajar & mengeksplorasi arsitektur perangkat lunak baru."
                  : "// Committed to continuous learning and exploring modern architecture."}
              </p>
            </div>
          </motion.div>

          {/* Bento Card 3: Metrics Grid (Takes 3 columns on desktop, 1 on mobile) */}
          <motion.div 
            className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={gridVariants}
          >
            {[
              { icon: FiZap, metric: '10+', label: lang === 'en' ? 'Builds Completed' : 'Sistem Selesai', color: 'rgba(197, 168, 128, 0.1)' },
              { icon: FiShield, metric: '3+', label: lang === 'en' ? 'ML Models' : 'Model ML', color: 'rgba(255, 255, 255, 0.05)' },
              { icon: FiTarget, metric: '2+', label: lang === 'en' ? 'Years Active' : 'Tahun Aktif', color: 'rgba(197, 168, 128, 0.1)' },
              { icon: FiCheckCircle, metric: '100%', label: lang === 'en' ? 'Delivery Rate' : 'Tingkat Sukses', color: 'rgba(255, 255, 255, 0.05)' }
            ].map((stat, index) => {
              const IconComp = stat.icon
              return (
                <motion.div
                  key={index}
                  className="spotlight-card p-6 flex flex-col items-center text-center justify-center min-h-[160px]"
                  variants={itemVariants}
                  onMouseMove={handleMouseMove}
                  whileHover={{ y: -4 }}
                >
                  <div className="p-3 rounded-full mb-3 relative z-10" style={{ backgroundColor: stat.color }}>
                    <IconComp className="w-5 h-5 text-[#c5a880]" />
                  </div>
                  <h4 className="text-3xl font-light text-foreground mb-1 relative z-10 font-heading">
                    {stat.metric}
                  </h4>
                  <p className="text-xs text-[#8888aa] relative z-10 font-body">
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Engineering Philosophy Subsection */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tighter text-foreground mb-3 font-heading">
              {lang === 'id' ? 'Filosofi Rekayasa' : 'Engineering Philosophy'}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-body">
              {lang === 'id' ? 'Metodologi dalam membangun produk digital' : 'Core methodologies in crafting digital products'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: lang === 'id' ? '1. Perancangan Sistem' : '1. Architecting',
                desc: lang === 'id' 
                  ? 'Merancang skema database, pemetaan API, dan user journey sebelum menulis satu baris kode untuk efisiensi maksimal.'
                  : 'Mapping scalable database schemas, clean API layers, and user journeys prior to writing code for maximum efficiency.',
                accent: 'rgba(197, 168, 128, 0.03)'
              },
              {
                title: lang === 'id' ? '2. Implementasi Bersih' : '2. Engineering',
                desc: lang === 'id'
                  ? 'Menulis kode modular yang dapat dipelihara (clean Dart, TypeScript, Python) menggunakan design pattern yang teruji.'
                  : 'Writing highly modular, clean codebases (Dart, TypeScript, Python) adopting robust industry design patterns.',
                accent: 'rgba(255, 255, 255, 0.02)'
              },
              {
                title: lang === 'id' ? '3. Optimasi Maksimal' : '3. Optimizing',
                desc: lang === 'id'
                  ? 'Pengukuran performa berkala, kompilasi profil aset, GPU rendering overhead, dan caching lokal.'
                  : 'Rigorous profiling of asset loading, GPU hardware acceleration layers, and local memory footprints.',
                accent: 'rgba(197, 168, 128, 0.03)'
              }
            ].map((phil, i) => (
              <div 
                key={i}
                className="spotlight-card p-6 flex flex-col justify-between"
                onMouseMove={handleMouseMove}
                style={{ backgroundColor: phil.accent }}
              >
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-foreground mb-2 font-heading">
                    {phil.title}
                  </h4>
                  <p className="text-xs text-[#8888aa] leading-relaxed font-body">
                    {phil.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
