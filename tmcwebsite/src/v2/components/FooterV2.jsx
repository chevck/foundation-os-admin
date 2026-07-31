import { Link } from 'react-router-dom'
import { IconInstagram, IconWhatsapp, IconX } from '../../components/icons.jsx'
import Mascot from './Mascot.jsx'
import RevealV2 from './RevealV2.jsx'
import './FooterV2.css'

const LINKS = [
  { href: '#legend', label: 'The Legend' },
  { href: '#trail', label: 'The Trail' },
  { href: '#mentors', label: 'Mentors' },
  { href: '#event', label: 'Event Info' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function FooterV2() {
  return (
    <footer className="v2-footer">
      <RevealV2 as="div" className="v2-container v2-footer-inner">
        <div className="v2-footer-brand">
          <Mascot variant="drip" size={40} bob={false} />
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

        <nav className="v2-footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social handles not yet provided — wire up real links here */}
        <div className="v2-footer-social">
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
      </RevealV2>

      <div className="v2-footer-base">
        <div className="v2-container v2-footer-base-inner">
          <p>&copy; 2026 The Moisture Conference. All rights reserved.</p>
          <div className="v2-footer-switches">
            <Link to="/v3" className="v2-footer-switch">
              ← Visit the classic edition
            </Link>
            <Link to="/" className="v2-footer-switch">
              See the Night Garden edition →
            </Link>
            <Link to="/v4" className="v2-footer-switch">
              See the Dossier edition →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
