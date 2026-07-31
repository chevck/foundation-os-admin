import { Link } from 'react-router-dom'
import { IconArrowUpRight, IconCalendar, IconClock, IconPin } from '../../components/icons.jsx'
import MagneticButton from '../../components/MagneticButton.jsx'
import Mascot from './Mascot.jsx'
import './HeroV2.css'

export default function HeroV2() {
  return (
    <section id="top" className="v2-hero">
      <div className="v2-hero-cloud v2-hero-cloud-a" aria-hidden="true" />
      <div className="v2-hero-cloud v2-hero-cloud-b" aria-hidden="true" />

      <div className="v2-container v2-hero-inner">
        <div className="v2-hero-cast v2-rise-in" style={{ animationDelay: '0ms' }}>
          <Mascot variant="sprout" size={92} className="v2-hero-cast-side" />
          <div className="v2-hero-cast-center">
            <Mascot variant="drip" size={148} />
            <span className="v2-hero-cast-tag">Drip</span>
          </div>
          <Mascot variant="ray" size={92} className="v2-hero-cast-side" />
        </div>

        <p className="v2-eyebrow v2-hero-eyebrow v2-rise-in" style={{ animationDelay: '80ms' }}>
          Luke 8:6 &middot; A Storybook For Young Men
        </p>

        <h1 className="v2-hero-title v2-rise-in" style={{ animationDelay: '160ms' }}>
          Once upon a season,
          <br />
          the ground ran <span>dry.</span>
        </h1>

        <p className="v2-hero-sub v2-rise-in" style={{ animationDelay: '240ms' }}>
          THE MOISTURE CONFERENCE is a gathering for men ages 16&ndash;24 who are
          tired of withering. One Friday. Real conversations. The moisture your
          roots have been waiting for.
        </p>

        <div className="v2-hero-actions v2-rise-in" style={{ animationDelay: '320ms' }}>
          <MagneticButton as="a" href="#rsvp" className="v2-btn v2-btn-coral v2-btn-with-icon">
            RSVP &mdash; Join The Story
            <span className="v2-btn-icon">
              <IconArrowUpRight />
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="#legend" className="v2-btn v2-btn-mint v2-btn-with-icon">
            Read The Legend
            <span className="v2-btn-icon">
              <IconArrowUpRight />
            </span>
          </MagneticButton>
        </div>

        <div className="v2-hero-info v2-rise-in" style={{ animationDelay: '400ms' }}>
          <div className="v2-hero-info-item">
            <IconCalendar />
            <span>Fri, Aug 28th, 2026</span>
          </div>
          <div className="v2-hero-info-item">
            <IconClock />
            <span>12:00 PM</span>
          </div>
          <div className="v2-hero-info-item">
            <IconPin />
            <span>University of Ibadan</span>
          </div>
        </div>

        <Link to="/v3" className="v2-hero-switch">
          Prefer the classic look? Visit the original site →
        </Link>
      </div>
    </section>
  )
}
