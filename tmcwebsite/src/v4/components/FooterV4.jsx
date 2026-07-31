import { Link } from 'react-router-dom'
import { InstagramLogo, WhatsappLogo, XLogo } from '@phosphor-icons/react'
import RevealV4 from './RevealV4.jsx'
import './FooterV4.css'

const LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#vision', label: 'The Vision' },
  { href: '#topics', label: 'Topics' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function FooterV4() {
  return (
    <footer className="v4-footer">
      <RevealV4 as="div" className="v4-container v4-footer-inner">
        <div className="v4-footer-brand">
          <p className="v4-footer-title">The Moisture Conference</p>
          <p className="v4-footer-desc">
            A conference for young men, ages 16 to 24.
            <br />
            Friday, August 28th, 2026, University of Ibadan.
          </p>
        </div>

        <nav className="v4-footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social handles not yet provided, wire up real links here */}
        <div className="v4-footer-social">
          <a href="#" aria-label="Instagram">
            <InstagramLogo weight="regular" size={17} />
          </a>
          <a href="#" aria-label="X">
            <XLogo weight="regular" size={17} />
          </a>
          <a href="#" aria-label="WhatsApp">
            <WhatsappLogo weight="regular" size={17} />
          </a>
        </div>
      </RevealV4>

      <div className="v4-footer-base">
        <div className="v4-container v4-footer-base-inner">
          <p>Copyright 2026 The Moisture Conference. All rights reserved.</p>
          <div className="v4-footer-switches">
            <Link to="/v3">Classic edition</Link>
            <Link to="/v2">Storybook edition</Link>
            <Link to="/">Night Garden edition</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
