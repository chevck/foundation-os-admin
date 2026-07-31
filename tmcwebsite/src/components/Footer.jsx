import { Link } from 'react-router-dom'
import { IconDrop, IconInstagram, IconWhatsapp, IconX } from './icons.jsx'
import Reveal from './Reveal.jsx'
import SectionDivider from './SectionDivider.jsx'
import './Footer.css'

const LINKS = [
  { href: '#story', label: 'The Vision' },
  { href: '#themes', label: 'Themes' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#event', label: 'Event Info' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <SectionDivider fill="#dcedf0" />

      <Reveal as="div" className="container footer-inner">
        <div className="footer-brand">
          <IconDrop className="footer-brand-icon" />
          <span>
            The Moisture
            <br />
            Conference
          </span>
          <p>
            A conference for young men, ages 16&ndash;24.
            <br />
            Friday, August 28th, 2026 &middot; University of Ibadan.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social handles not yet provided — wire up real links here */}
        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            <IconInstagram />
          </a>
          <a href="#" aria-label="X (Twitter)">
            <IconX />
          </a>
          <a href="#" aria-label="WhatsApp">
            <IconWhatsapp />
          </a>
        </div>
      </Reveal>

      <div className="footer-base">
        <div className="container footer-base-inner">
          <p>&copy; 2026 The Moisture Conference. All rights reserved.</p>
          <div className="footer-switches">
            <Link to="/" className="footer-switch">
              See the Night Garden Edition
            </Link>
            <Link to="/v2" className="footer-switch">
              See the Storybook Edition
            </Link>
            <Link to="/v4" className="footer-switch">
              See the Dossier Edition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
