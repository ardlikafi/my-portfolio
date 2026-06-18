import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Projects({ lang }) {
  const [activeTab, setActiveTab] = useState('featured') // 'featured' or 'github'
  const [activeFilter, setActiveFilter] = useState('all')
  const [repos, setRepos] = useState([])
  const [reposLoading, setReposLoading] = useState(true)
  const [reposError, setReposError] = useState(false)

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

  // Fetch GitHub repos
  useEffect(() => {
    if (activeTab === 'github' && repos.length === 0) {
      setReposLoading(true)
      fetch('https://api.github.com/users/ardlikafi/repos?sort=updated&per_page=30')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch')
          return res.json()
        })
        .then(data => {
          // Filter out forks, limit to 6 top repos, sort by stars
          const filtered = data
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6)
          setRepos(filtered)
          setReposLoading(false)
        })
        .catch(err => {
          console.error(err)
          setReposError(true)
          setReposLoading(false)
        })
    }
  }, [activeTab, repos.length])

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
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "luxury" }}
          >
            {t.projectsTitle}
          </motion.h2>
          <motion.p 
            className="text-sm uppercase tracking-[0.2em] text-[#c5a880] font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.projectsSubtitle}
          </motion.p>
        </div>

        {/* Tab Controls: Featured vs Github */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 font-body ${
              activeTab === 'featured'
                ? 'bg-[#c5a880] text-black border-[#c5a880] shadow-[0_4px_20px_rgba(197,168,128,0.2)]'
                : 'bg-transparent text-[#8888aa] border-border hover:text-foreground hover:border-[#c5a880]/30'
            }`}
          >
            {lang === 'id' ? 'Proyek Unggulan' : 'Featured Projects'}
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 font-body ${
              activeTab === 'github'
                ? 'bg-[#c5a880] text-black border-[#c5a880] shadow-[0_4px_20px_rgba(197,168,128,0.2)]'
                : 'bg-transparent text-[#8888aa] border-border hover:text-foreground hover:border-[#c5a880]/30'
            }`}
          >
            {lang === 'id' ? 'Repositori GitHub' : 'GitHub Repositories'}
          </button>
        </div>

        {/* Filter Controls (Only for Featured Projects) */}
        {activeTab === 'featured' && (
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 font-body ${
                  activeFilter === filter.key
                    ? 'bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30'
                    : 'bg-transparent text-[#8888aa] border border-transparent hover:text-foreground'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Featured Projects View */}
        {activeTab === 'featured' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => {
                const projectTitle = lang === 'id' && project.titleId ? project.titleId : project.title
                const projectDesc = lang === 'id' && project.descId ? project.descId : project.desc

                return (
                  <motion.div
                    key={project.id}
                    className="spotlight-card flex flex-col justify-between"
                    variants={cardVariants}
                    onMouseMove={handleMouseMove}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative z-10">
                      {/* Image Frame */}
                      <div className="relative overflow-hidden h-48 bg-charcoal-dark border-b border-[rgba(255,255,255,0.03)]">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          src={project.image} 
                          alt={projectTitle} 
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-light text-foreground mb-3 font-heading">
                          {projectTitle}
                        </h3>
                        <p className="text-xs text-[#8888aa] leading-relaxed mb-6 font-body">
                          {projectDesc}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 relative z-10">
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-2.5 py-1 rounded bg-[rgba(255,255,255,0.02)] border border-border text-[10px] font-mono text-[#8888aa]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-[rgba(255,255,255,0.03)] pt-4 flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-mono">
                          {project.category}
                        </span>
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-[#c5a880] hover:text-white flex items-center gap-1.5 font-semibold font-body"
                        >
                          <FiGithub /> {t.projectsView}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* GitHub Repositories View */}
        {activeTab === 'github' && (
          <div className="w-full">
            {reposLoading ? (
              /* Skeletal Loading Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-charcoal-dark border border-border rounded-2xl p-6 animate-pulse min-h-[200px] flex flex-col justify-between">
                    <div>
                      <div className="h-5 bg-white/5 rounded w-2/3 mb-4"></div>
                      <div className="h-3 bg-white/5 rounded w-full mb-2"></div>
                      <div className="h-3 bg-white/5 rounded w-5/6"></div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <div className="h-3 bg-white/5 rounded w-1/4"></div>
                      <div className="h-3 bg-white/5 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : reposError ? (
              /* Error State */
              <div className="text-center py-12">
                <p className="text-red-400 font-body text-sm mb-4">
                  {lang === 'id' 
                    ? 'Gagal memuat data dari GitHub API.' 
                    : 'Failed to fetch repositories from GitHub.'}
                </p>
                <button 
                  onClick={() => { setRepos([]); setReposLoading(true); }}
                  className="px-4 py-2 border border-border rounded-full text-xs text-foreground hover:bg-white/5 font-body"
                >
                  {lang === 'id' ? 'Coba Lagi' : 'Try Again'}
                </button>
              </div>
            ) : (
              /* Repositories Grid */
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {repos.map(repo => (
                  <motion.div
                    key={repo.id}
                    className="spotlight-card p-6 flex flex-col justify-between min-h-[220px]"
                    variants={cardVariants}
                    onMouseMove={handleMouseMove}
                    whileHover={{ y: -4 }}
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-light text-foreground font-heading hover:text-[#c5a880] transition-colors truncate max-w-[80%]">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                          </a>
                        </h3>
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1 text-[#c5a880] text-xs font-mono">
                            <FiStar className="fill-[#c5a880]/20" />
                            {repo.stargazers_count}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#8888aa] leading-relaxed mb-6 font-body line-clamp-3">
                        {repo.description || (lang === 'id' ? 'Tidak ada deskripsi yang disediakan.' : 'No description provided.')}
                      </p>
                    </div>

                    <div className="relative z-10 border-t border-[rgba(255,255,255,0.03)] pt-4 flex justify-between items-center">
                      <span className="text-xs text-[#c5a880] font-mono">
                        {repo.language || 'JS / Dart'}
                      </span>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-[#8888aa] hover:text-white flex items-center gap-1.5 font-body"
                      >
                        <FiGithub /> {t.projectsView}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Development Standards and Metrics subsection */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tighter text-foreground mb-3 font-heading">
              {lang === 'id' ? 'Standar Kualitas & Metrik Kode' : 'Code Quality Standards & Metrics'}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-body">
              {lang === 'id' ? 'Komitmen terhadap keunggulan teknis sistem' : 'Commitment to technical engineering excellence'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: lang === 'id' ? 'Static Analysis' : 'Static Analysis',
                metric: 'Strict Lints',
                desc: lang === 'id'
                  ? 'Konfigurasi analisis kode yang ketat untuk Flutter Lints & ESLint guna mendeteksi bug potensial sejak dini.'
                  : 'Enforcing strict linting rules for Flutter and ESLint to eliminate code smells and catch bugs early.'
              },
              {
                title: lang === 'id' ? 'Branching Workflow' : 'GitFlow Standard',
                metric: 'Zero Conflict',
                desc: lang === 'id'
                  ? 'Penggunaan pola branch GitFlow untuk memisahkan fitur, perbaikan bug, dan perilisan produksi.'
                  : 'Adopting modular branching patterns for development features, hotfixes, and production releases.'
              },
              {
                title: lang === 'id' ? 'CI/CD Pipelines' : 'Automated CI/CD',
                metric: 'GitHub Actions',
                desc: lang === 'id'
                  ? 'Pipeline otomatis untuk menjalankan tes unit, analisis statis, dan build rilis di setiap commit.'
                  : 'Automated test suites, static analysis, and release building workflows running on push/pull requests.'
              },
              {
                title: lang === 'id' ? 'Performance Budgets' : 'Performance Limits',
                metric: '60 FPS Target',
                desc: lang === 'id'
                  ? 'Pengukuran render GPU / CPU secara berkala untuk memastikan aplikasi mobile dan web berjalan tanpa lag.'
                  : 'Rigorous GPU frame rendering checks, keeping applications extremely fast and responsive.'
              }
            ].map((stat, i) => (
              <div 
                key={i}
                className="spotlight-card p-6 flex flex-col justify-between"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-mono text-[#c5a880] bg-[#c5a880]/5 px-2 py-0.5 rounded border border-[#c5a880]/15 w-fit block mb-3">
                    {stat.metric}
                  </span>
                  <h4 className="text-base font-bold text-foreground mb-2 font-heading">
                    {stat.title}
                  </h4>
                  <p className="text-xs text-[#8888aa] leading-relaxed font-body">
                    {stat.desc}
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
