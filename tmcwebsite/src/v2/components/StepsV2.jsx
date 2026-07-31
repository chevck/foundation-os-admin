import { IconArrowRight, IconCalendar, IconCheck } from '../../components/icons.jsx'
import RevealV2 from './RevealV2.jsx'
import './StepsV2.css'

export default function StepsV2() {
  return (
    <section id="how" className="v2-section v2-steps">
      <div className="v2-container">
        <RevealV2 as="div" className="v2-section-head">
          <p className="v2-eyebrow v2-steps-eyebrow">How To Join The Story</p>
          <h2>Two steps. That&rsquo;s it.</h2>
        </RevealV2>

        <div className="v2-steps-row">
          <RevealV2 as="div" className="v2-step-card">
            <div className="v2-step-icon v2-step-icon-coral">
              <IconCheck />
            </div>
            <h3>RSVP Your Seat</h3>
            <p>Fill the form below. It&rsquo;s free, it takes a minute, and it holds your spot.</p>
          </RevealV2>

          <IconArrowRight className="v2-steps-arrow" />

          <RevealV2 as="div" className="v2-step-card" delay={120}>
            <div className="v2-step-icon v2-step-icon-sky">
              <IconCalendar />
            </div>
            <h3>Show Up Thirsty</h3>
            <p>Friday, August 28th, 12PM, University of Ibadan. Come as you are.</p>
          </RevealV2>
        </div>
      </div>
    </section>
  )
}
