import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSmartphone, FiCode, FiCpu, FiSettings, FiTerminal, FiDatabase, FiLayers } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Skills({ lang }) {
  const t = portfolioData.translations[lang]
  const [activeTab, setActiveTab] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'system', text: '$ npx init-skills-analyzer' },
    { type: 'info', text: 'Initializing interactive skills explorer...' },
    { type: 'success', text: 'System ready. Click on any skill badge below to analyze.' }
  ])

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    currentTarget.style.setProperty("--mouse-x", `${x}px`)
    currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  // Expanded detailed skill data to prevent "sepi" look
  const skillDetails = {
    // Mobile Development
    'Flutter': { depth: 'Production Ready', useCase: 'Membangun aplikasi mobile berpresisi tinggi dengan State Management BLoC/Provider.', project: 'VisionNeuro / NextGen Crypto' },
    'Dart': { depth: 'Core Architecture', useCase: 'Pemrograman berorientasi objek asinkron tingkat tinggi, isolate computation.', project: 'VisionNeuro Mobile' },
    'Firebase': { depth: 'Integration Expert', useCase: 'Autentikasi pengguna, real-time database sync, cloud messaging, FCM.', project: 'NextGen Crypto App' },
    'Android/iOS SDK': { depth: 'Integration API', useCase: 'Konfigurasi native platform, custom method channels, setup deployment.', project: 'Flutter Native Plugins' },
    // Web Systems
    'React': { depth: 'Production Ready', useCase: 'Arsitektur komponen modular, state management terdistribusi, performance optimization.', project: 'E-Commerce Ecosystem' },
    'Javascript/TypeScript': { depth: 'Core Language', useCase: 'Pemrograman fungsional, tipe data ketat, manipulasi DOM modern.', project: 'React Web Apps' },
    'Tailwind CSS': { depth: 'Layout Architecture', useCase: 'Penerapan utility-first design system kustom, animasi transisi premium.', project: 'Luxury Portfolio' },
    'NodeJS': { depth: 'Backend Logic', useCase: 'REST API, Express backend orchestration, serverless function routing.', project: 'Backend API Gateway' },
    // Machine Learning
    'Python': { depth: 'Core Language', useCase: 'Analisis data numerik, implementasi komputasi tensor, scripting otomasi.', project: 'IntelliPredict LSTM' },
    'TensorFlow/Keras': { depth: 'Deep Learning', useCase: 'Desain arsitektur jaringan saraf tiruan, model LSTM, Convolutional Neural Networks (CNN).', project: 'IntelliPredict / VisionNeuro' },
    'PyTorch': { depth: 'Neural Research', useCase: 'Eksperimen transfer learning, deteksi objek computer vision.', project: 'VisionNeuro Web Interface' },
    'Scikit-Learn': { depth: 'Machine Learning', useCase: 'Pemrosesan data awal (preprocessing), model klasifikasi, regresi linear.', project: 'Predictive Analytics Models' },
    // Tools & Databases
    'Git & GitHub': { depth: 'Collaboration Flow', useCase: 'Penerapan GitFlow, automated CI/CD pipelines, code review workflow.', project: 'All Repositories' },
    'Docker': { depth: 'Containerization', useCase: 'Standardisasi lingkungan development, docker-compose orchestration.', project: 'Microservices Deployment' },
    'PostgreSQL': { depth: 'Database Architecture', useCase: 'Desain relasional database skema, query optimization, indexing.', project: 'Financial Ledger Backend' },
    'REST APIs': { depth: 'Interface Design', useCase: 'Desain endpoint RESTful terdokumentasi, middleware auth.', project: 'Integration Middleware' },
  }

  const runSkillAnalysis = (skillName) => {
    setSelectedSkill(skillName)
    const detail = skillDetails[skillName] || { depth: 'Proficient', useCase: 'Pengembangan sistem terintegrasi.', project: 'General Projects' }
    
    setTerminalLogs([
      { type: 'system', text: `$ npx analyze-skill --name="${skillName.toLowerCase()}"` },
      { type: 'info', text: `Analyzing capability and production depth for "${skillName}"...` },
      { type: 'success', text: `Depth Profile: ${detail.depth}` },
      { type: 'info', text: `Production Use Case: ${detail.useCase}` },
      { type: 'success', text: `Associated Flagship Project: ${detail.project}` }
    ])
  }

  const tabs = [
    { id: 'all', label: lang === 'id' ? 'Semua Keahlian' : 'All Capabilities', icon: FiLayers },
    { id: 'mobile', label: lang === 'id' ? 'Aplikasi Mobile' : 'Mobile Development', icon: FiSmartphone },
    { id: 'web', label: lang === 'id' ? 'Rekayasa Web' : 'Web Engineering', icon: FiCode },
    { id: 'ml', label: lang === 'id' ? 'AI & Data Science' : 'Machine Learning', icon: FiCpu },
    { id: 'tools', label: lang === 'id' ? 'Database & Tools' : 'Tools & Databases', icon: FiSettings }
  ]

  const categories = portfolioData.skills

  const getFilteredSkills = () => {
    if (activeTab === 'all') return categories
    return categories.filter(c => c.category === activeTab)
  }

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t.skillsTitle}
          </motion.h2>
          <motion.p 
            className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.skillsSubtitle}
          </motion.p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-white/5 pb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedSkill(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-[#c5a880] text-black shadow-lg shadow-[#c5a880]/15' 
                    : 'bg-white/5 border border-white/5 text-[#8888aa] hover:text-foreground hover:bg-white/10'
                }`}
              >
                <Icon className="text-sm" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left / Middle: Interactive Grid */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {getFilteredSkills().map((skillCategory, idx) => {
                  const Icon = skillCategory.icon
                  let displayTitle = skillCategory.title
                  if (skillCategory.category === 'mobile') displayTitle = t.skillsMobile
                  if (skillCategory.category === 'web') displayTitle = t.skillsWeb
                  if (skillCategory.category === 'backend') displayTitle = t.skillsBackend
                  if (skillCategory.category === 'tools') displayTitle = t.skillsTools

                  return (
                    <div 
                      key={idx}
                      className="spotlight-card p-6 flex flex-col justify-between"
                      onMouseMove={handleMouseMove}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-lg bg-[rgba(197,168,128,0.06)] border border-[rgba(197,168,128,0.15)] flex items-center justify-center text-xl text-[#c5a880]">
                            <Icon />
                          </div>
                          <h3 className="text-base font-semibold text-foreground font-heading">
                            {displayTitle}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {skillCategory.tags.map((tag, tagIdx) => {
                            const isSelected = selectedSkill === tag
                            return (
                              <button
                                key={tagIdx}
                                onClick={() => runSkillAnalysis(tag)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-all duration-300 border cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#c5a880] text-black border-[#c5a880]' 
                                    : 'bg-white/5 text-[#8888aa] border-white/5 hover:text-foreground hover:bg-white/10 hover:border-[#c5a880]/30'
                                }`}
                              >
                                {tag}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Live Interactive Terminal & Analysis */}
          <div className="space-y-6">
            
            {/* Terminal Window */}
            <div className="spotlight-card p-6 font-mono text-xs border border-white/5 bg-[#08080c]/60 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-8 bg-[#0c0c14]/80 border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eb5e55]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f4b400]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00b0ff]" />
                </div>
                <span className="text-[10px] text-[#8888aa] font-sans">skills-analyser.sh</span>
                <FiTerminal className="text-[#8888aa]" />
              </div>

              <div className="pt-6 space-y-3 min-h-[180px]">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed break-words">
                    {log.type === 'system' && (
                      <span className="text-[#c5a880]">{log.text}</span>
                    )}
                    {log.type === 'info' && (
                      <span className="text-[#8888aa]">{log.text}</span>
                    )}
                    {log.type === 'success' && (
                      <span className="text-[#00e676]">{log.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis card details */}
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="spotlight-card p-6 border border-[#c5a880]/20 bg-[rgba(197,168,128,0.02)]"
                  onMouseMove={handleMouseMove}
                >
                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block mb-1 font-body">
                      {lang === 'id' ? 'ANALISIS KEALIAN' : 'CAPABILITY BRIEF'}
                    </span>
                    <h4 className="text-xl font-bold text-foreground mb-3 font-heading">
                      {selectedSkill}
                    </h4>
                    <div className="space-y-3 text-xs text-[#8888aa] leading-relaxed">
                      <div>
                        <strong className="text-foreground font-semibold block mb-1">
                          {lang === 'id' ? 'Kedalaman Penguasaan:' : 'Expertise Depth:'}
                        </strong>
                        <span className="font-mono text-[#c5a880] bg-[#c5a880]/5 px-2 py-0.5 rounded border border-[#c5a880]/15">
                          {skillDetails[selectedSkill]?.depth || 'Production Ready'}
                        </span>
                      </div>
                      <div>
                        <strong className="text-foreground font-semibold block mb-1">
                          {lang === 'id' ? 'Kasus Penggunaan Produksi:' : 'Production Case:'}
                        </strong>
                        <p>{skillDetails[selectedSkill]?.useCase || 'Membangun fungsionalitas inti dan integrasi sistem.'}</p>
                      </div>
                      <div>
                        <strong className="text-foreground font-semibold block mb-1">
                          {lang === 'id' ? 'Implementasi Proyek:' : 'Associated Project:'}
                        </strong>
                        <p className="font-mono text-foreground">{skillDetails[selectedSkill]?.project || 'General Portfolio Works'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  )
}
