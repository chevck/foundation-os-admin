import { IconArrowUpRight, IconCalendar, IconClock, IconPin } from '../../components/icons.jsx'
import MagneticButton from '../../components/MagneticButton.jsx'
import Mascot from './Mascot.jsx'
import RevealV2 from './RevealV2.jsx'
import './EventStripV2.css'

export default function EventStripV2() {
  return (
    <section id="event" className="v2-eventstrip">
      <div className="v2-container">
        <RevealV2 as="div" className="v2-bezel v2-bezel-coral v2-eventstrip-frame">
          <div className="v2-bezel-core v2-eventstrip-card">
            <div className="v2-eventstrip-art">
              <Mascot variant="sprout" size={80} className="v2-eventstrip-mascot v2-eventstrip-mascot-a" />
              <Mascot variant="ray" size={64} className="v2-eventstrip-mascot v2-eventstrip-mascot-b" />
            </div>

            <div className="v2-eventstrip-info">
              <p className="v2-eyebrow v2-eventstrip-eyebrow">Save The Date</p>
              <h2>Mark it. Circle it. Show up.</h2>

              <ul className="v2-eventstrip-list">
                <li>
                  <IconCalendar />
                  <span>Friday, August 28th, 2026</span>
                </li>
                <li>
                  <IconClock />
                  <span>12:00 PM</span>
                </li>
                <li>
                  <IconPin />
                  <span>University of Ibadan</span>
                </li>
              </ul>

              <p className="v2-eventstrip-note">
                Free to attend. Open to all young men ages 16&ndash;24. Seats are
                limited &mdash; RSVP secures yours.
              </p>

              <div className="v2-eventstrip-actions">
                <MagneticButton as="a" href="#rsvp" className="v2-btn v2-btn-coral v2-btn-with-icon">
                  RSVP Now
                  <span className="v2-btn-icon">
                    <IconArrowUpRight />
                  </span>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://www.google.com/maps/search/?api=1&query=University+of+Ibadan"
                  target="_blank"
                  rel="noreferrer"
                  className="v2-btn v2-btn-mint v2-btn-with-icon"
                >
                  Get Directions
                  <span className="v2-btn-icon">
                    <IconArrowUpRight />
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </RevealV2>
      </div>
    </section>
  )
}
