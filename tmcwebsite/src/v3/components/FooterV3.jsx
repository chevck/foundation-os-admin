import { IconInstagram, IconWhatsapp, IconX } from '../../components/icons.jsx'
import RevealV3 from './RevealV3.jsx'
import './FooterV3.css'

const LINKS = [
  { href: '#legend', label: 'The Legend' },
  { href: '#trail', label: 'The Ground' },
  { href: '#mentors', label: 'The Voices' },
  { href: '#event', label: 'The Gathering' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function FooterV3() {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-divider" aria-hidden="true" />

      <RevealV3 as="div" className="v3-container v3-footer-inner">
        <div className="v3-footer-brand">
          <span className="v3-navbar-mark" />
          <div>
            <p className="v3-footer-title">The Moisture Conference</p>
            <p className="v3-footer-desc">
              A conference for young men, ages 16-24.
              <br />
              Friday, August 28th, 2026 &middot; University of Ibadan.
            </p>
          </div>
        </div>

        <nav className="v3-footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social handles not yet provided — wire up real links here */}
        <div className="v3-footer-social">
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
      </RevealV3>

      <div className="v3-footer-base">
        <div className="v3-container v3-footer-base-inner">
          <p>&copy; 2026 The Moisture Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
