import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowUpRight, IconMenu, IconClose } from '../../components/icons.jsx'
import MagneticButton from '../../components/MagneticButton.jsx'
import Mascot from './Mascot.jsx'
import './NavbarV2.css'

const LINKS = [
  { href: '#legend', label: 'The Legend' },
  { href: '#trail', label: 'The Trail' },
  { href: '#mentors', label: 'Mentors' },
  { href: '#event', label: 'Event Info' },
]

export default function NavbarV2() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="v2-navbar">
      <div className="v2-container v2-navbar-inner">
        <a className="v2-navbar-brand" href="#top" onClick={() => setOpen(false)}>
          <Mascot variant="drip" size={34} bob={false} />
          <span>
            The Moisture
            <br />
            Conference
          </span>
        </a>

        <nav className="v2-navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton as="a" href="#rsvp" className="v2-btn v2-btn-coral v2-btn-with-icon v2-navbar-cta">
          RSVP
          <span className="v2-btn-icon">
            <IconArrowUpRight />
          </span>
        </MagneticButton>

        <button
          type="button"
          className="v2-navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="v2-navbar-mobile">
          <nav aria-label="Mobile">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              className="v2-btn v2-btn-coral v2-btn-block"
              onClick={() => setOpen(false)}
            >
              RSVP
            </a>
            <Link to="/v3" className="v2-navbar-switch" onClick={() => setOpen(false)}>
              ← Back to the classic edition
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
