import { useEffect, useState } from 'react'
import { IconDrop, IconMenu, IconClose } from './icons.jsx'
import './Navbar.css'

const LINKS = [
  { href: '#story', label: 'The Vision' },
  { href: '#themes', label: 'Themes' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#event', label: 'Event Info' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a className="navbar-brand" href="#top" onClick={() => setOpen(false)}>
          <IconDrop className="navbar-brand-icon" />
          <span>
            The Moisture
            <br />
            Conference
          </span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#rsvp" className="btn btn-primary navbar-cta">
          RSVP
        </a>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="navbar-mobile">
          <nav aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar-mobile-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#rsvp" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              RSVP
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
