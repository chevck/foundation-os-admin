import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import './v3.css'
import AmbientField from './components/AmbientField.jsx'
import LightningFlash from './components/LightningFlash.jsx'
import NavbarV3 from './components/NavbarV3.jsx'
import HeroV3 from './components/HeroV3.jsx'
import LegendV3 from './components/LegendV3.jsx'
import StepsV3 from './components/StepsV3.jsx'
import TrailV3 from './components/TrailV3.jsx'
import EventV3 from './components/EventV3.jsx'
import MentorsV3 from './components/MentorsV3.jsx'
import RSVPV3 from './components/RSVPV3.jsx'
import FooterV3 from './components/FooterV3.jsx'

const THEME_STORAGE_KEY = 'v3-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  return saved === 'light' ? 'light' : 'dark'
}

export default function AppV3() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [thunderEnabled, setThunderEnabled] = useState(false)
  const audioContextRef = useRef(null)
  // Tracks scroll through the whole document, 0 at top to 1 at bottom.
  // Drives rain density/speed (AmbientField) and lightning frequency
  // (LightningFlash) so the storm builds as you read further down.
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    document.title = 'The Moisture Conference · Night Garden Edition'
  }, [])

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  function toggleThunder() {
    // AudioContext must be created/resumed synchronously inside a user
    // gesture handler, or browsers refuse to let it produce sound. This
    // runs directly from the toggle button's onClick, so it qualifies.
    if (!thunderEnabled) {
      audioContextRef.current ??= new (window.AudioContext || window.webkitAudioContext)()
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
    }
    setThunderEnabled((v) => !v)
  }

  return (
    <div className="v3-page" data-theme={theme}>
      <AmbientField progress={scrollYProgress} />
      <LightningFlash progress={scrollYProgress} thunderEnabled={thunderEnabled} audioContextRef={audioContextRef} />
      <NavbarV3
        theme={theme}
        onToggleTheme={toggleTheme}
        thunderEnabled={thunderEnabled}
        onToggleThunder={toggleThunder}
      />
      <main>
        <HeroV3 />
        <LegendV3 />
        <StepsV3 />
        <TrailV3 />
        <EventV3 />
        <MentorsV3 />
        <RSVPV3 />
      </main>
      <FooterV3 />
    </div>
  )
}
