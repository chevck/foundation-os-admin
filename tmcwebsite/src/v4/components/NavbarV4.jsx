import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'
import MagneticButton from '../../components/MagneticButton.jsx'
import './NavbarV4.css'

const LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#vision', label: 'The Vision' },
  { href: '#topics', label: 'Topics' },
]

export default function NavbarV4() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="v4-navbar">
      <div className="v4-container v4-navbar-inner">
        <a href="#top" className="v4-navbar-brand" onClick={() => setOpen(false)}>
          The Moisture Conference
        </a>

        <nav className="v4-navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton as="a" href="#rsvp" className="v4-btn v4-btn-primary v4-navbar-cta">
          RSVP
          <ArrowUpRight weight="regular" />
        </MagneticButton>

        <button
          type="button"
          className="v4-navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X weight="regular" size={20} /> : <List weight="regular" size={20} />}
        </button>
      </div>

      {open && (
        <div className="v4-navbar-mobile">
          <nav aria-label="Mobile">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="v4-navbar-mobile-link" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#rsvp" className="v4-btn v4-btn-primary v4-btn-block" onClick={() => setOpen(false)}>
              RSVP
              <ArrowUpRight weight="regular" />
            </a>
            <div className="v4-navbar-switches">
              <Link to="/v2" onClick={() => setOpen(false)}>
                Storybook edition
              </Link>
              <Link to="/" onClick={() => setOpen(false)}>
                Night Garden edition
              </Link>
              <Link to="/v3" onClick={() => setOpen(false)}>
                Classic edition
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
