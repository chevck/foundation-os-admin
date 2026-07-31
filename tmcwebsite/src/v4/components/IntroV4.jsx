import { ArrowUpRight } from '@phosphor-icons/react'
import MagneticButton from '../../components/MagneticButton.jsx'
import RevealV4 from './RevealV4.jsx'
import './IntroV4.css'

export default function IntroV4() {
  return (
    <section id="top" className="v4-intro">
      <div className="v4-container v4-intro-inner">
        <RevealV4 as="p" className="v4-eyebrow">
          Friday, August 28 · University of Ibadan
        </RevealV4>

        <RevealV4 as="h1" className="v4-intro-title" delay={70}>
          Six men who made it through dry ground. One night to hear how.
        </RevealV4>

        <RevealV4 as="p" className="v4-intro-sub" delay={140}>
          THE MOISTURE CONFERENCE gathers young men ages 16 to 24 for honest
          conversations on faith, identity, and growth.
        </RevealV4>

        <RevealV4 as="div" className="v4-intro-actions" delay={210}>
          <MagneticButton as="a" href="#rsvp" className="v4-btn v4-btn-primary">
            RSVP
            <ArrowUpRight weight="regular" />
          </MagneticButton>
          <a href="#vision" className="v4-btn v4-btn-ghost">
            Read the vision
          </a>
        </RevealV4>
      </div>
    </section>
  )
}
