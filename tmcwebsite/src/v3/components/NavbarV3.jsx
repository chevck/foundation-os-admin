import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from '../../components/MagneticButton.jsx'
import {
  IconArrowUpRight,
  IconMoon,
  IconSun,
  IconVolumeOff,
  IconVolumeOn,
} from '../../components/icons.jsx'
import './NavbarV3.css'

const LINKS = [
  { href: '#legend', label: 'The Legend' },
  { href: '#trail', label: 'The Ground' },
  { href: '#mentors', label: 'The Voices' },
  { href: '#event', label: 'The Gathering' },
]

const menuVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function NavbarV3({ theme = 'dark', onToggleTheme, thunderEnabled = false, onToggleThunder }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="v3-navbar">
        <div className="v3-navbar-pill">
          <a className="v3-navbar-brand" href="#top" onClick={() => setOpen(false)}>
            <span className="v3-navbar-mark" />
            The Moisture Conference
          </a>

          <nav className="v3-navbar-links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <MagneticButton as="a" href="#rsvp" className="v3-btn v3-btn-primary v3-navbar-cta">
            RSVP
            <span className="v3-btn-icon">
              <IconArrowUpRight />
            </span>
          </MagneticButton>

          <button
            type="button"
            className="v3-navbar-theme"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          <button
            type="button"
            className="v3-navbar-theme"
            aria-label={thunderEnabled ? 'Mute storm thunder' : 'Unmute storm thunder'}
            aria-pressed={thunderEnabled}
            onClick={onToggleThunder}
          >
            {thunderEnabled ? <IconVolumeOn /> : <IconVolumeOff />}
          </button>

          <button
            type="button"
            className="v3-navbar-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`v3-navbar-toggle-line ${open ? 'is-open' : ''}`} />
            <span className={`v3-navbar-toggle-line ${open ? 'is-open' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="v3-navbar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <motion.nav
              className="v3-navbar-overlay-links"
              aria-label="Mobile"
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {LINKS.map((link) => (
                <motion.a key={link.href} href={link.href} variants={linkVariants} onClick={() => setOpen(false)}>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#rsvp"
                className="v3-btn v3-btn-primary v3-navbar-overlay-cta"
                variants={linkVariants}
                onClick={() => setOpen(false)}
              >
                RSVP &middot; It&rsquo;s Free
                <span className="v3-btn-icon">
                  <IconArrowUpRight />
                </span>
              </motion.a>
              <motion.button
                type="button"
                className="v3-navbar-theme v3-navbar-theme-mobile"
                variants={linkVariants}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={onToggleTheme}
              >
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </motion.button>

              <motion.button
                type="button"
                className="v3-navbar-theme v3-navbar-theme-mobile"
                variants={linkVariants}
                aria-label={thunderEnabled ? 'Mute storm thunder' : 'Unmute storm thunder'}
                aria-pressed={thunderEnabled}
                onClick={onToggleThunder}
              >
                {thunderEnabled ? <IconVolumeOn /> : <IconVolumeOff />}
                {thunderEnabled ? 'Thunder on' : 'Thunder off'}
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
