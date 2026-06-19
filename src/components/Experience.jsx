import { TracingBeam } from './ui/tracing-beam'

const EXPERIENCE_DATA = {
  id: [
    {
      role: "Software Development Intern",
      company: "PT Hatta Alfarizi Indonesia",
      period: "2023 - Sekarang",
      desc: "Fokus pada integrasi gerbang pembayaran (payment gateway) yang aman serta pengoptimalan manajemen state pada aplikasi mobile.",
      bullets: [
        "Mengintegrasikan API pembayaran menggunakan enkripsi RESTful.",
        "Mendesain ulang sistem caching lokal untuk meningkatkan kecepatan memuat data sebesar 30%.",
        "Berkolaborasi dalam tim pengembang dengan kontrol Git standar industri."
      ]
    },
    {
      role: "Dev Lead & Technical Director",
      company: "Student Tech Association",
      period: "2022 - 2023",
      desc: "Memimpin perancangan infrastruktur web untuk acara kampus skala besar.",
      bullets: [
        "Mengatur modul pengembangan backend yang efisien bagi tim pengembang mahasiswa.",
        "Menyusun standar dokumentasi pengujian unit (unit testing) sebelum proses rilis."
      ]
    }
  ],
  en: [
    {
      role: "Software Development Intern",
      company: "PT Hatta Alfarizi Indonesia",
      period: "2023 - Present",
      desc: "Focused on secure payment gateway integration and state management optimization for mobile applications.",
      bullets: [
        "Integrated payment API processing via encrypted RESTful interfaces.",
        "Redesigned the local caching system, improving data-loading speed by 30%.",
        "Collaborated with developers adopting industry-standard Git controls."
      ]
    },
    {
      role: "Dev Lead & Technical Director",
      company: "Student Tech Association",
      period: "2022 - 2023",
      desc: "Led the web infrastructure design and execution for large-scale campus events.",
      bullets: [
        "Architected highly efficient backend routes for the student engineering team.",
        "Established automated unit testing guidelines prior to launch cycles."
      ]
    }
  ]
}

export default function Experience({ lang = 'id' }) {
  const currentExperience = EXPERIENCE_DATA[lang] || EXPERIENCE_DATA['id']

  return (
    <section className="py-24 max-w-4xl mx-auto px-6 border-t border-white/5" id="experience">
      <div className="mb-20 text-center">
        <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
          {lang === 'id' ? 'Riwayat' : 'History'}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white font-heading tracking-tight">
          Professional Journey
        </h2>
        <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
          {lang === 'id' 
            ? 'Gulir ke bawah untuk melihat tracing beam melacak perkembangan perjalanan profesional saya.'
            : 'Scroll down to watch the tracing beam highlight the timeline of my engineering milestones.'}
        </p>
      </div>

      <TracingBeam>
        <div className="space-y-16">
          {currentExperience.map((exp, i) => (
            <div key={i} className="relative group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#c5a880] transition-colors duration-300 font-heading">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-[#8888aa]">{exp.company}</span>
                </div>
                <span className="text-xs font-mono text-[#c5a880] bg-[#c5a880]/5 px-3 py-1 rounded-full border border-[#c5a880]/10">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl font-body">
                {exp.desc}
              </p>

              <ul className="space-y-2 max-w-2xl">
                {exp.bullets.map((bullet, index) => (
                  <li key={index} className="text-xs text-[#8888aa] flex items-start gap-2">
                    <span className="text-[#c5a880] mt-0.5">•</span>
                    <span className="font-body">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TracingBeam>
    </section>
  )
}
