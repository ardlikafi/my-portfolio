import { useState } from 'react'

export default function Contact({ lang = 'id' }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    }, 1200)
  }

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 border-t border-white/5" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Kolom Kiri: Formulir Kontak */}
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase">
            {lang === 'id' ? 'Hubungi Saya' : 'Get In Touch'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8 text-white">Let's Connect</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={lang === 'id' ? 'Nama Anda' : 'Your Name'} 
              className="w-full bg-white/[0.01] border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]/40 transition-colors"
            />
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={lang === 'id' ? 'Alamat Email' : 'Email Address'} 
              className="w-full bg-white/[0.01] border border-white/5 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]/40 transition-colors"
            />
            <textarea 
              name="message"
              required
              rows="4" 
              value={formData.message}
              onChange={handleChange}
              placeholder={lang === 'id' ? 'Pesan Anda' : 'Your Message'} 
              className="w-full bg-white/[0.01] border border-white/5 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#c5a880]/40 transition-colors resize-none"
            />
            <button 
              type="submit"
              disabled={isSending}
              className="w-full py-3 rounded-lg bg-[#c5a880] text-[#050508] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {isSending 
                ? (lang === 'id' ? 'Mengirim...' : 'Sending...') 
                : (lang === 'id' ? 'Kirim Pesan' : 'Send Message')}
            </button>

            {success && (
              <p className="text-xs text-green-400 mt-2 font-mono">
                {lang === 'id' 
                  ? '✔ Pesan berhasil dikirim. Terima kasih!' 
                  : '✔ Message sent successfully. Thank you!'}
              </p>
            )}
          </form>
        </div>

        {/* Kolom Kanan: Informasi Kontak Premium (Bukan CLI) */}
        <div className="flex flex-col justify-center space-y-8 md:pl-12">
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#c5a880] uppercase mb-2">
              {lang === 'id' ? 'Kolaborasi' : 'Collaboration'}
            </h3>
            <p className="text-2xl font-light text-gray-300 leading-relaxed font-heading">
              {lang === 'id'
                ? 'Membuka peluang kerja sama proyek, kolaborasi penelitian sistem cerdas, dan peran rekayasa perangkat lunak.'
                : 'Open for project collaboration, research integrations in intelligent systems, and software engineering roles.'}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div>
              <span className="text-xs text-gray-500 block">{lang === 'id' ? 'Email Resmi' : 'Official Email'}</span>
              <a href="mailto:ardlikafimurobby02@gmail.com" className="text-white hover:text-[#c5a880] text-sm transition-colors">
                ardlikafimurobby02@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">{lang === 'id' ? 'Lokasi' : 'Location'}</span>
              <span className="text-white text-sm">{lang === 'id' ? 'Indonesia (WIB)' : 'Indonesia (WIB / UTC+7)'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
