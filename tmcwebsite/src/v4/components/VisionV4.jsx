import RevealV4 from './RevealV4.jsx'
import './VisionV4.css'

export default function VisionV4() {
  return (
    <section id="vision" className="v4-section v4-vision">
      <div className="v4-container v4-vision-grid">
        <RevealV4 as="div" className="v4-vision-art">
          <img src="https://picsum.photos/seed/tmc-vision-field/900/1100" alt="" loading="lazy" />
        </RevealV4>

        <RevealV4 as="div" className="v4-vision-copy" delay={100}>
          <h2>The Vision</h2>
          <p>
            Most young men learn to survive dry ground quietly, mistaking the
            silence for strength. THE MOISTURE CONFERENCE exists to interrupt
            that silence once a year.
          </p>
          <p>
            We are not building an audience. We are building a room where
            faith, identity, relationships, and purpose can be discussed
            honestly, by men who have already walked through the season you
            are in now.
          </p>
          <p>
            One Friday. Six speakers. No performance, no easy answers, and no
            pretending the ground was never dry.
          </p>
        </RevealV4>
      </div>
    </section>
  )
}
