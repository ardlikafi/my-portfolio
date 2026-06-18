import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import { portfolioData } from '../data/portfolioData'

export default function Footer({ lang }) {
  const t = portfolioData.translations[lang]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        {/* Social Links shortcuts */}
        <div className="footer-socials">
          <a 
            href="https://www.linkedin.com/in/ardli-kafi-murobby-a89a8a19b/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin />
          </a>
          <a 
            href="https://github.com/ardlikafi" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <FiGithub />
          </a>
          <a 
            href="mailto:ardlikafimurobby02@gmail.com"
            aria-label="Send Email"
          >
            <FiMail />
          </a>
        </div>

        {/* Corporate copyright and design note */}
        <p>
          &copy; {currentYear} {t.footerText}
        </p>
      </div>
    </footer>
  )
}
