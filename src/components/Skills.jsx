import React from 'react'
import { CardContainer, CardBody, CardItem } from './ui/card-3d'
import { EvervaultCard } from './ui/evervault-card'

const SKILLS_DATA = {
  id: [
    {
      category: "Mobile Engineering",
      codeName: "sys.mobile",
      desc: "Membangun aplikasi performansi tinggi untuk multi-platform dengan arsitektur bersih.",
      items: ["Flutter", "Dart", "Android SDK", "BLoC / Provider", "Local DB (Hive, SQLite)", "App Store / Play Store Release"]
    },
    {
      category: "Web Engineering",
      codeName: "sys.frontend",
      desc: "Mengembangkan antarmuka modern yang responsif, visual interaktif, dan optimasi SEO.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Three.js / WebGL", "GSAP / Framer Motion", "SEO & Performance Budget"]
    },
    {
      category: "Intelligence & Backend",
      codeName: "sys.backend",
      desc: "Integrasi sistem cerdas, pemrosesan data pipelines, dan skalabilitas database.",
      items: ["Python", "TensorFlow", "Node.js", "Express.js", "MySQL / MongoDB", "RESTful APIs / WebSockets"]
    }
  ],
  en: [
    {
      category: "Mobile Engineering",
      codeName: "sys.mobile",
      desc: "Building high-performance multi-platform applications with clean, production-ready architecture.",
      items: ["Flutter", "Dart", "Android SDK", "BLoC / Provider", "Local DB (Hive, SQLite)", "App Store / Play Store Release"]
    },
    {
      category: "Web Engineering",
      codeName: "sys.frontend",
      desc: "Developing modern, highly responsive web interfaces with custom animations and SEO optimizations.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Three.js / WebGL", "GSAP / Framer Motion", "SEO & Performance Budget"]
    },
    {
      category: "Intelligence & Backend",
      codeName: "sys.backend",
      desc: "Integrating intelligent systems, high-efficiency data pipelines, and scalable database architectures.",
      items: ["Python", "TensorFlow", "Node.js", "Express.js", "MySQL / MongoDB", "RESTful APIs / WebSockets"]
    }
  ]
}

export default function Skills({ lang = 'id' }) {
  const currentSkills = SKILLS_DATA[lang] || SKILLS_DATA['id']

  return (
    <section className="py-24 max-w-6xl mx-auto px-6 border-t border-white/5" id="skills">
      {/* Title */}
      <div className="text-center mb-20">
        <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
          {lang === 'id' ? 'Keahlian' : 'Expertise'}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white font-heading tracking-tight">
          Technical Core Stack
        </h2>
        <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
          {lang === 'id' 
            ? 'Kombinasi 3D Card Parallax dan Evervault Matrix. Dekatkan kursor Anda untuk melihat visualisasi matriks kode.'
            : 'Double combination of 3D Card Parallax and Evervault Matrix. Hover over cards to decrypt the digital code matrix.'}
        </p>
      </div>

      {/* 3-Column Evervault + 3D Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentSkills.map((skill, index) => (
          <CardContainer key={index} className="w-full" containerClassName="w-full">
            <CardBody className="w-full h-full bg-[#0c0c10]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[500px]">
              
              {/* Evervault Card Visual Spotlight */}
              <CardItem translateZ={30} className="w-full h-48 mb-6 overflow-hidden rounded-xl">
                <EvervaultCard text={skill.codeName} />
              </CardItem>

              {/* Title & Desc */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <CardItem translateZ={25} className="text-xl font-bold text-white mb-2 font-heading">
                    {skill.category}
                  </CardItem>
                  <CardItem translateZ={15} className="text-xs text-gray-400 leading-relaxed mb-6 font-body">
                    {skill.desc}
                  </CardItem>
                </div>

                {/* Skill Badges */}
                <CardItem translateZ={20} className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {skill.items.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-mono rounded bg-black/40 border border-white/5 text-gray-300 hover:border-[#c5a880]/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </CardItem>
              </div>

            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  )
}
