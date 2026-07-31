import { IconArrowUpRight, IconCalendar, IconClock, IconPin } from '../../components/icons.jsx'
import MagneticButton from '../../components/MagneticButton.jsx'
import RevealV3 from './RevealV3.jsx'
import SkylineArt from './SkylineArt.jsx'
import './EventV3.css'

export default function EventV3() {
  return (
    <section id="event" className="v3-section v3-event">
      <div className="v3-container">
        <RevealV3 as="div" className="v3-bezel v3-event-card">
          <div className="v3-bezel-core v3-event-card-core">
            <div className="v3-event-art">
              <SkylineArt className="v3-event-art-svg" />
            </div>

            <div className="v3-event-info">
              <p className="v3-eyebrow">
                <span className="v3-eyebrow-dot" />
                Save The Date
              </p>
              <h2>Mark it. Circle it. Show up.</h2>

              <ul className="v3-event-list">
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

              <p className="v3-event-note">
                Free to attend. Open to all young men ages 16-24. Seats
                are limited, so RSVP secures your spot.
              </p>

              <div className="v3-event-actions">
                <MagneticButton as="a" href="#rsvp" className="v3-btn v3-btn-primary">
                  RSVP Now
                  <span className="v3-btn-icon">
                    <IconArrowUpRight />
                  </span>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://www.google.com/maps/search/?api=1&query=University+of+Ibadan"
                  target="_blank"
                  rel="noreferrer"
                  className="v3-btn v3-btn-ghost"
                >
                  Get Directions
                  <span className="v3-btn-icon">
                    <IconArrowUpRight />
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </RevealV3>
      </div>
    </section>
  )
}
