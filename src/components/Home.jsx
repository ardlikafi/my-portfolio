import { motion } from 'framer-motion'
import { FiArrowRight, FiCode, FiCpu, FiSmartphone, FiAward } from 'react-icons/fi'
import { AnimatedHero } from './ui/animated-hero'
import { portfolioData } from '../data/portfolioData'
import { CardContainer, CardBody, CardItem } from './ui/card-3d'

export default function Home({ lang, onNavigate }) {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  return (
    <div className="w-full bg-transparent">
      {/* 1. Elegant Animated Hero with R3F 3D Node Mesh */}
      <AnimatedHero lang={lang} onNavigate={onNavigate} />

      {/* 2. Overview Bento Grid using Aceternity 3D Cards */}
      <div className="container mx-auto px-4 max-w-6xl mt-16 pb-24 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {lang === 'id' ? 'Ringkasan Portofolio' : 'Portfolio Synopsis'}
          </motion.h2>
          <motion.p 
            className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {lang === 'id' ? 'Sentuh kartu untuk interaksi 3D Parallax' : 'Hover cards to interact in 3D Parallax'}
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          
          {/* Card 1: Short Bio (Takes 2 columns) */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full md:col-span-2">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <CardItem translateZ={15} className="flex justify-between items-start mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#c5a880] font-body">
                      {lang === 'id' ? 'TENTANG SAYA' : 'BIOGRAPHY'}
                    </span>
                    <span className="text-[10px] font-mono text-[#8888aa] border border-white/5 bg-white/5 px-2.5 py-1 rounded-full">
                      GPA: 3.8+ / 4.0
                    </span>
                  </CardItem>
                  <CardItem translateZ={30}>
                    <h3 className="text-2xl font-semibold text-white mb-4 font-heading tracking-tight">
                      Ardli Kafi Murobby
                    </h3>
                  </CardItem>
                  <CardItem translateZ={20}>
                    <p className="text-sm text-[#8888aa] leading-relaxed mb-6 font-body">
                      {lang === 'id' 
                        ? "Saya adalah mahasiswa Informatika yang berdedikasi untuk menjembatani kode bersih, interaksi pengguna, dan sistem berbasis data. Spesialisasi saya meliputi pengembangan aplikasi mobile Flutter, sistem web React, dan rekayasa Machine Learning. Saya fokus dalam membangun solusi berkualitas tinggi yang andal dan ramah pengguna."
                        : "Dedicated Informatics scholar focused on bridging elegant code, user interaction, and data-driven systems. Specializing in high-fidelity Flutter Mobile Apps, performant React Web Applications, and Machine Learning engineering. I focus on crafting high-quality solutions that are reliable, performant, and delightful."}
                    </p>
                  </CardItem>
                </div>
                <CardItem translateZ={15} className="relative z-10 flex justify-between items-center mt-6 pt-6 border-t border-[rgba(255,255,255,0.03)]">
                  <span className="text-xs text-[#8888aa] font-mono">Location: Indonesia</span>
                  <button 
                    onClick={() => onNavigate('#about')}
                    className="text-xs text-[#c5a880] hover:text-[#d5b890] flex items-center gap-1.5 font-semibold font-body cursor-pointer group"
                  >
                    {lang === 'id' ? 'Baca Selengkapnya' : 'Read Full Biography'}{' '}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 2: Core Expertise */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <CardItem translateZ={15} className="text-xs uppercase tracking-widest text-[#c5a880] mb-6 block font-body">
                    {lang === 'id' ? 'KEAHLIAN UTAMA' : 'KEY SKILLS'}
                  </CardItem>
                  <div className="space-y-4">
                    <CardItem translateZ={25} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(197,168,128,0.06)] flex items-center justify-center text-sm text-[#c5a880]">
                        <FiSmartphone />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Mobile Development</h4>
                        <span className="text-[10px] text-[#8888aa]">Flutter / iOS & Android</span>
                      </div>
                    </CardItem>
                    <CardItem translateZ={30} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(197,168,128,0.06)] flex items-center justify-center text-sm text-[#c5a880]">
                        <FiCode />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Web Engineering</h4>
                        <span className="text-[10px] text-[#8888aa]">React / TailwindCSS / NodeJS</span>
                      </div>
                    </CardItem>
                    <CardItem translateZ={25} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(197,168,128,0.06)] flex items-center justify-center text-sm text-[#c5a880]">
                        <FiCpu />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Intelligence Systems</h4>
                        <span className="text-[10px] text-[#8888aa]">Machine Learning / Python</span>
                      </div>
                    </CardItem>
                  </div>
                </div>
                <CardItem translateZ={15} className="relative z-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.03)]">
                  <button 
                    onClick={() => onNavigate('#skills')}
                    className="text-xs text-[#c5a880] hover:text-[#d5b890] flex items-center gap-1.5 font-semibold font-body cursor-pointer w-full justify-between group"
                  >
                    <span>{lang === 'id' ? 'Detail Keahlian' : 'View Skills Dashboard'}</span>{' '}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 3: Featured Projects */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <CardItem translateZ={15} className="text-xs uppercase tracking-widest text-[#c5a880] mb-4 block font-body">
                    {lang === 'id' ? 'PROYEK UTAMA' : 'FLAGSHIP WORKS'}
                  </CardItem>
                  <CardItem translateZ={30}>
                    <h4 className="text-lg font-semibold text-white mb-2 font-heading">
                      IntelliPredict
                    </h4>
                  </CardItem>
                  <CardItem translateZ={20}>
                    <p className="text-xs text-[#8888aa] leading-relaxed font-body">
                      {lang === 'id' 
                        ? "Aplikasi peramalan saham real-time berbasis AI menggunakan deep learning LSTM."
                        : "AI-driven real-time stock forecasting dashboard utilizing deep learning LSTM models."}
                    </p>
                  </CardItem>
                  <CardItem translateZ={25} className="flex gap-1.5 mt-4">
                    <span className="text-[9px] font-mono text-[#c5a880] bg-[#c5a880]/5 px-2 py-0.5 rounded">Python</span>
                    <span className="text-[9px] font-mono text-[#c5a880] bg-[#c5a880]/5 px-2 py-0.5 rounded">TensorFlow</span>
                  </CardItem>
                </div>
                <CardItem translateZ={15} className="relative z-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.03)]">
                  <button 
                    onClick={() => onNavigate('#projects')}
                    className="text-xs text-[#c5a880] hover:text-[#d5b890] flex items-center gap-1.5 font-semibold font-body cursor-pointer w-full justify-between group"
                  >
                    <span>{lang === 'id' ? 'Lihat Semua Proyek' : 'View All Projects'}</span>{' '}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 4: Timeline Milestone preview */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <CardItem translateZ={15} className="text-xs uppercase tracking-widest text-[#c5a880] mb-4 block font-body">
                    {lang === 'id' ? 'PENGALAMAN TERBARU' : 'RECENT JOURNEY'}
                  </CardItem>
                  <CardItem translateZ={25} className="border-l border-white/5 pl-4 relative space-y-1">
                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[#c5a880] -translate-x-1/2" />
                    <h4 className="text-xs font-semibold text-white">Freelance Mobile Developer</h4>
                    <p className="text-[10px] text-[#8888aa]">PT Hatta Alfarizi Indonesia</p>
                    <p className="text-[9px] font-mono text-[#c5a880]">2023 - Present</p>
                  </CardItem>
                </div>
                <CardItem translateZ={15} className="relative z-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.03)]">
                  <button 
                    onClick={() => onNavigate('#experience')}
                    className="text-xs text-[#c5a880] hover:text-[#d5b890] flex items-center gap-1.5 font-semibold font-body cursor-pointer w-full justify-between group"
                  >
                    <span>{lang === 'id' ? 'Perjalanan Lengkap' : 'Read Journey Logs'}</span>{' '}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 5: Credentials & Certifications preview */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <CardItem translateZ={15} className="text-xs uppercase tracking-widest text-[#c5a880] mb-4 block font-body">
                    {lang === 'id' ? 'SERTIFIKASI' : 'CREDENTIALS'}
                  </CardItem>
                  <CardItem translateZ={25} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(197,168,128,0.06)] flex items-center justify-center text-sm text-[#c5a880]">
                      <FiAward />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Multi-Platform Certified</h4>
                      <span className="text-[9px] text-[#8888aa]">Dicoding & Google Career</span>
                    </div>
                  </CardItem>
                </div>
                <CardItem translateZ={15} className="relative z-10 mt-6 pt-6 border-t border-[rgba(255,255,255,0.03)]">
                  <button 
                    onClick={() => onNavigate('#certificates')}
                    className="text-xs text-[#c5a880] hover:text-[#d5b890] flex items-center gap-1.5 font-semibold font-body cursor-pointer w-full justify-between group"
                  >
                    <span>{lang === 'id' ? 'Galeri Sertifikat' : 'View Certificates'}</span>{' '}
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 6: Quick Connect CTA (Takes 3 columns) */}
          <CardContainer className="w-full h-full" containerClassName="w-full h-full md:col-span-3">
            <CardBody className="w-full h-full">
              <div 
                className="spotlight-card p-8 flex flex-col justify-between w-full h-full"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                  <div>
                    <CardItem translateZ={15} className="text-xs uppercase tracking-widest text-[#c5a880] mb-2 block font-body">
                      {lang === 'id' ? 'HUBUNGI SAYA' : 'COLLABORATION'}
                    </CardItem>
                    <CardItem translateZ={25}>
                      <h3 className="text-2xl font-semibold text-white mb-2 font-heading tracking-tight">
                        {lang === 'id' ? 'Ingin mewujudkan ide digital Anda?' : 'Ready to craft performant digital systems?'}
                      </h3>
                    </CardItem>
                    <CardItem translateZ={20}>
                      <p className="text-sm text-[#8888aa] font-body max-w-2xl leading-relaxed">
                        {lang === 'id' 
                          ? "Mari diskusikan proyek Anda. Saluran komunikasi terbuka untuk freelance, konsultasi arsitektur mobile/web, atau kolaborasi kecerdasan buatan."
                          : "Let's align. The channel is open for technical consulting, custom development services, or intelligence-driven integrations."}
                      </p>
                    </CardItem>
                  </div>
                  <CardItem translateZ={30} className="flex items-center min-w-[150px]">
                    <button 
                      onClick={() => onNavigate('#contact')}
                      className="bg-[#c5a880] text-black hover:bg-[#d5b890] transition-all px-6 py-3 rounded-full text-xs font-bold font-body cursor-pointer flex items-center gap-2 group w-full justify-center shadow-lg hover:shadow-[#c5a880]/10"
                    >
                      <span>{lang === 'id' ? 'Hubungi Sekarang' : 'Start Connection'}</span>{' '}
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>

        </motion.div>
      </div>
    </div>
  )
}
