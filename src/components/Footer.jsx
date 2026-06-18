import React from 'react'
import { FiMail, FiLinkedin, FiGithub, FiMapPin } from 'react-icons/fi'
import { TextHoverEffect, FooterBackgroundGradient } from './ui/hover-footer'
import { portfolioData } from '../data/portfolioData'

export default function Footer({ lang }) {
  const t = portfolioData.translations[lang]
  const currentYear = new Date().getFullYear()

  const handleScroll = (e, targetId) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Footer links
  const sections = [
    {
      title: lang === 'id' ? 'Navigasi' : 'Navigation',
      links: [
        { label: t.navHome, target: '#home' },
        { label: t.navAbout, target: '#about' },
        { label: t.navSkills, target: '#skills' },
        { label: t.navProjects, target: '#projects' },
      ],
    },
    {
      title: lang === 'id' ? 'Lainnya' : 'More',
      links: [
        { label: t.navCertificates, target: '#certificates' },
        { label: t.navExperience, target: '#experience' },
        { label: t.navContact, target: '#contact' },
      ],
    },
  ]

  return (
    <footer className="relative bg-background border-t border-[rgba(255,255,255,0.03)] overflow-hidden m-4 md:m-8 rounded-3xl z-10 font-body">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-12">
          
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#c5a880] text-2xl font-bold font-heading">
                ARDLI KAFI M.
              </span>
            </div>
            <p className="text-xs text-[#8888aa] leading-relaxed max-w-xs">
              {lang === 'id' 
                ? 'Membangun aplikasi mobile, web berkinerja tinggi, dan integrasi kecerdasan buatan.'
                : 'Building performant mobile apps, web ecosystems, and intelligence-driven solutions.'}
            </p>
          </div>

          {/* Navigation link sections */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-foreground text-sm font-semibold uppercase tracking-wider mb-6 font-heading">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.target}
                      onClick={(e) => handleScroll(e, link.target)}
                      className="text-xs text-[#8888aa] hover:text-[#c5a880] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h4 className="text-foreground text-sm font-semibold uppercase tracking-wider mb-6 font-heading">
              {lang === 'id' ? 'Kontak' : 'Contact'}
            </h4>
            <ul className="space-y-4 text-xs text-[#8888aa]">
              <li className="flex items-center space-x-3">
                <FiMail className="text-[#c5a880] text-sm" />
                <a
                  href="mailto:ardlikafimurobby02@gmail.com"
                  className="hover:text-[#c5a880] transition-colors duration-300"
                >
                  ardlikafimurobby02@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-[#c5a880] text-sm" />
                <span>Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-[rgba(255,255,255,0.03)] my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-[#8888aa]">
            <a
              href="https://github.com/ardlikafi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[#c5a880] transition-colors duration-300 text-base"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ardli-kafi-murobby-a89a8a19b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#c5a880] transition-colors duration-300 text-base"
            >
              <FiLinkedin />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[#8888aa]">
            &copy; {currentYear} {t.footerText}
          </p>
        </div>
      </div>

      {/* Text hover effect (Hidden on smaller screens) */}
      <div className="hidden lg:flex h-[20rem] -mt-24 -mb-12">
        <TextHoverEffect text="Ardli Kafi M." className="z-20" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  )
}
