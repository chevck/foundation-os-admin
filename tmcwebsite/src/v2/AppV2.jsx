import { useEffect } from 'react'
import './v2.css'
import NavbarV2 from './components/NavbarV2.jsx'
import HeroV2 from './components/HeroV2.jsx'
import LegendV2 from './components/LegendV2.jsx'
import StepsV2 from './components/StepsV2.jsx'
import TrailV2 from './components/TrailV2.jsx'
import EventStripV2 from './components/EventStripV2.jsx'
import SpeakersV2 from './components/SpeakersV2.jsx'
import RSVPFormV2 from './components/RSVPFormV2.jsx'
import FooterV2 from './components/FooterV2.jsx'

export default function AppV2() {
  useEffect(() => {
    document.title = 'The Moisture Conference · Storybook Edition'
  }, [])

  return (
    <div className="v2-page">
      <NavbarV2 />
      <main>
        <HeroV2 />
        <LegendV2 />
        <StepsV2 />
        <TrailV2 />
        <EventStripV2 />
        <SpeakersV2 />
        <RSVPFormV2 />
      </main>
      <FooterV2 />
    </div>
  )
}
