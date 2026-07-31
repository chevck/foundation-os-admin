import { useEffect } from 'react'
import './v4.css'
import NavbarV4 from './components/NavbarV4.jsx'
import IntroV4 from './components/IntroV4.jsx'
import SpeakersV4 from './components/SpeakersV4.jsx'
import VisionV4 from './components/VisionV4.jsx'
import ScriptureV4 from './components/ScriptureV4.jsx'
import TopicsV4 from './components/TopicsV4.jsx'
import FormV4 from './components/FormV4.jsx'
import FooterV4 from './components/FooterV4.jsx'

export default function AppV4() {
  useEffect(() => {
    document.title = 'The Moisture Conference · Dossier Edition'
  }, [])

  return (
    <div className="v4-page">
      <NavbarV4 />
      <main>
        <IntroV4 />
        <SpeakersV4 />
        <VisionV4 />
        <ScriptureV4 />
        <TopicsV4 />
        <FormV4 />
      </main>
      <FooterV4 />
    </div>
  )
}
