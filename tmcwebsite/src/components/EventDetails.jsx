import { IconArrowRight, IconCalendar, IconClock, IconPin } from './icons.jsx'
import Reveal from './Reveal.jsx'
import './EventDetails.css'

export default function EventDetails() {
  return (
    <section id="event" className="event">
      <div className="container event-inner">
        <Reveal as="div" className="event-card">
          <div className="event-card-item">
            <div className="event-card-icon">
              <IconCalendar />
            </div>
            <div>
              <p className="event-card-label">Date</p>
              <p className="event-card-value">Friday, August 28th, 2026</p>
            </div>
          </div>

          <div className="event-card-sep" />

          <div className="event-card-item">
            <div className="event-card-icon">
              <IconClock />
            </div>
            <div>
              <p className="event-card-label">Time</p>
              <p className="event-card-value">12:00 PM</p>
            </div>
          </div>

          <div className="event-card-sep" />

          <div className="event-card-item">
            <div className="event-card-icon">
              <IconPin />
            </div>
            <div>
              <p className="event-card-label">Venue</p>
              <p className="event-card-value">University of Ibadan</p>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" className="event-note" delay={120}>
          <p>
            Free to attend. Open to all young men ages 16&ndash;24. Seats are limited,
            so RSVP secures your spot.
          </p>
          <div className="event-note-actions">
            <a href="#rsvp" className="btn btn-primary">
              RSVP Now
              <IconArrowRight />
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=University+of+Ibadan"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
