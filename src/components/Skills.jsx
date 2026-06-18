import { useState } from 'react'

const SKILLS_DATA = {
  id: [
    {
      category: "Mobile Engineering",
      desc: "Membangun aplikasi performansi tinggi untuk multi-platform dengan arsitektur bersih.",
      items: ["Flutter", "Dart", "Android SDK", "BLoC/Provider", "Local DB (Hive, SQLite)"]
    },
    {
      category: "Web Engineering",
      desc: "Mengembangkan antarmuka modern yang responsif dan optimasi SEO.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Three.js / WebGL", "GSAP / Framer Motion"]
    },
    {
      category: "Intelligence & Backend",
      desc: "Integrasi sistem cerdas, pemrosesan data, dan skalabilitas database.",
      items: ["Python", "TensorFlow", "Node.js", "Express.js", "MySQL / MongoDB", "RESTful APIs"]
    }
  ],
  en: [
    {
      category: "Mobile Engineering",
      desc: "Building high-performance multi-platform applications with clean, production-ready architecture.",
      items: ["Flutter", "Dart", "Android SDK", "BLoC/Provider", "Local DB (Hive, SQLite)"]
    },
    {
      category: "Web Engineering",
      desc: "Developing modern, highly responsive web interfaces with custom SEO optimizations.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Three.js / WebGL", "GSAP / Framer Motion"]
    },
    {
      category: "Intelligence & Backend",
      desc: "Integrating intelligent systems, high-efficiency data pipelines, and scalable database architectures.",
      items: ["Python", "TensorFlow", "Node.js", "Express.js", "MySQL / MongoDB", "RESTful APIs"]
    }
  ]
}

export default function Skills({ lang = 'id' }) {
  const [activeTab, setActiveTab] = useState(0)
  const currentSkills = SKILLS_DATA[lang] || SKILLS_DATA['id']

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 border-t border-white/5" id="skills">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        
        {/* Kolom Kiri: Header & Navigasi Kategori */}
        <div className="md:w-1/3 flex flex-col justify-between py-2">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
              {lang === 'id' ? 'Keahlian' : 'Expertise'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">Technical Core</h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              {lang === 'id' 
                ? 'Fokus pada kualitas kode standar industri, struktur data yang optimal, dan integrasi kecerdasan buatan.'
                : 'Focusing on industry-standard code quality, optimal data structures, and intelligent system integrations.'}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-8 md:mt-0">
            {currentSkills.map((skill, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`text-left py-3 px-4 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === i 
                    ? 'bg-white/5 text-white border-l-2 border-[#c5a880] pl-6' 
                    : 'text-gray-500 hover:text-gray-300 pl-4'
                }`}
              >
                {skill.category}
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Detail Deskripsi & Tag Keahlian */}
        <div className="md:w-2/3 p-8 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col justify-center min-h-[300px]">
          <span className="text-xs text-[#c5a880] font-mono mb-2">
            {lang === 'id' ? 'Fokus Kategori' : 'Category Focus'}
          </span>
          <h3 className="text-2xl font-semibold text-white mb-4">
            {currentSkills[activeTab].category}
          </h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xl">
            {currentSkills[activeTab].desc}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {currentSkills[activeTab].items.map((item, index) => (
              <span 
                key={index} 
                className="px-4 py-2 text-xs rounded-full bg-[#0c0c10] border border-white/5 text-gray-300 hover:border-[#c5a880]/30 transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
