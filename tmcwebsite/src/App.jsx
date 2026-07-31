import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Story from './components/Story.jsx'
import Themes from './components/Themes.jsx'
import EventDetails from './components/EventDetails.jsx'
import Speakers from './components/Speakers.jsx'
import RSVPForm from './components/RSVPForm.jsx'
import Footer from './components/Footer.jsx'

function App() {
  useEffect(() => {
    document.title = 'The Moisture Conference · Classic Edition'
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Themes />
        <EventDetails />
        <Speakers />
        <RSVPForm />
      </main>
      <Footer />
    </>
  )
}

export default App
