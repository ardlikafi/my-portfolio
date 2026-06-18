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
      <div className="mb-16">
        <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
          {lang === 'id' ? 'Riwayat' : 'History'}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">Professional Journey</h2>
      </div>

      <div className="relative border-l border-white/5 pl-8 ml-4 space-y-16">
        {currentExperience.map((exp, i) => (
          <div key={i} className="relative group">
            {/* Titik indikator timeline yang minimalis */}
            <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030305] border border-white/10 group-hover:border-[#c5a880] transition-colors duration-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#c5a880] transition-colors duration-300" />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-[#c5a880] transition-colors duration-300">
                  {exp.role}
                </h3>
                <span className="text-sm text-gray-500">{exp.company}</span>
              </div>
              <span className="text-xs font-mono text-[#c5a880] bg-[#c5a880]/5 px-3 py-1 rounded-full border border-[#c5a880]/10">
                {exp.period}
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">
              {exp.desc}
            </p>

            <ul className="space-y-2 max-w-2xl">
              {exp.bullets.map((bullet, index) => (
                <li key={index} className="text-xs text-gray-500 flex items-start gap-2">
                  <span className="text-[#c5a880] mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
