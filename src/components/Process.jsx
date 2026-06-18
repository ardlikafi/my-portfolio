import { motion } from 'framer-motion'
import { FiSearch, FiLayers, FiCpu, FiCheckSquare, FiSend } from 'react-icons/fi'

export default function Process({ lang }) {
  const steps = [
    {
      step: "01",
      title: lang === 'en' ? "Research" : "Riset",
      desc: lang === 'en' 
        ? "Analyzing project scope, user workflows, and system requirements to draft architecture models."
        : "Menganalisis cakupan proyek, alur kerja pengguna, dan kebutuhan sistem untuk menyusun model arsitektur.",
      icon: FiSearch
    },
    {
      step: "02",
      title: lang === 'en' ? "Design" : "Desain",
      desc: lang === 'en'
        ? "Drafting high-end responsive wireframes, database schemas, and state-management diagrams."
        : "Merancang wireframe responsif kelas tinggi, skema database, dan diagram manajemen state.",
      icon: FiLayers
    },
    {
      step: "03",
      title: lang === 'en' ? "Build" : "Kembangkan",
      desc: lang === 'en'
        ? "Engineering clean, highly performant cross-platform mobile apps, web systems, and AI models."
        : "Merekayasa aplikasi mobile lintas platform, sistem web, dan model AI yang bersih dan berkinerja tinggi.",
      icon: FiCpu
    },
    {
      step: "04",
      title: lang === 'en' ? "Test" : "Validasi",
      desc: lang === 'en'
        ? "Executing automated unit tests, UI testing, and rigorous performance and device audits."
        : "Menjalankan unit test otomatis, pengujian UI, serta audit performa dan kompatibilitas perangkat yang ketat.",
      icon: FiCheckSquare
    },
    {
      step: "05",
      title: lang === 'en' ? "Deploy" : "Luncurkan",
      desc: lang === 'en'
        ? "Deploying optimized bundles, setting up CI/CD automation, and establishing system monitoring."
        : "Menyebarkan bundle teroptimasi, menyiapkan otomatisasi CI/CD, dan membangun pemantauan sistem.",
      icon: FiSend
    }
  ]

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
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "luxury" }}
          >
            {lang === 'en' ? "Engineering Process" : "Alur Proses Rekayasa"}
          </motion.h2>
          <motion.p 
            className="text-sm uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {lang === 'en'
              ? "How I transform high-level requirements into scalable digital systems."
              : "Bagaimana saya mengubah kebutuhan tingkat tinggi menjadi sistem digital yang skalabel."}
          </motion.p>
        </div>

        {/* Process Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                className="spotlight-card p-6 flex flex-col justify-between min-h-[260px]"
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                whileHover={{ y: -4 }}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step ID Badge */}
                  <div className="w-8 h-8 rounded-full border border-border bg-white/5 flex items-center justify-center text-[10px] font-mono text-[#8888aa] mb-4">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[rgba(197,168,128,0.06)] border border-[rgba(197,168,128,0.15)] flex items-center justify-center text-xl text-[#c5a880] mb-4">
                    <Icon />
                  </div>

                  <h3 className="text-base font-light text-foreground mb-2 font-heading">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-[#8888aa] leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
