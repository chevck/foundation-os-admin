import { motion } from "framer-motion";
import { IconArrowUpRight, IconCalendar, IconCheck } from "../../components/icons.jsx";
import MagneticButton from "../../components/MagneticButton.jsx";
import RevealV3 from "./RevealV3.jsx";
import "./StepsV3.css";

export default function StepsV3() {
  return (
    <section id='how' className='v3-section v3-steps'>
      <div className='v3-container'>
        <RevealV3 as='div' className='v3-section-head'>
          <p className='v3-eyebrow'>
            <span className='v3-eyebrow-dot' />
            How To Join
          </p>
          <h2>Two steps. That&rsquo;s it.</h2>
        </RevealV3>

        <div className='v3-steps-row'>
          <RevealV3 as='div' className='v3-bezel v3-step-card'>
            <div className='v3-bezel-core v3-step-card-core'>
              <div className='v3-step-icon'>
                <IconCheck />
              </div>
              <h3>RSVP your seat</h3>
              <p>
                Fill the form below. Free, takes a minute, holds your spot in
                the room.
              </p>
              <MagneticButton
                as="a"
                href="#rsvp"
                className="v3-btn v3-btn-ghost v3-step-card-cta"
              >
                Go to the form
                <span className="v3-btn-icon">
                  <IconArrowUpRight />
                </span>
              </MagneticButton>
            </div>
          </RevealV3>

          <div className='v3-steps-connector' aria-hidden='true'>
            <svg viewBox='0 0 120 24' preserveAspectRatio='none'>
              <motion.line
                x1='0'
                y1='12'
                x2='120'
                y2='12'
                stroke='url(#v3-steps-grad)'
                strokeWidth='1.4'
                strokeDasharray='4 6'
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
              />
              <defs>
                <linearGradient id='v3-steps-grad' x1='0' y1='0' x2='1' y2='0'>
                  <stop offset='0%' stopColor='#f2b263' />
                  <stop offset='100%' stopColor='#55d9a3' />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <RevealV3 as='div' className='v3-bezel v3-step-card' delay={120}>
            <div className='v3-bezel-core v3-step-card-core'>
              <div className='v3-step-icon v3-step-icon-emerald'>
                <IconCalendar />
              </div>
              <h3>Show up thirsty</h3>
              <p>
                Friday, August 28th, 12PM, University of Ibadan.
                <br />
                Come as you are.
              </p>
            </div>
          </RevealV3>
        </div>
      </div>
    </section>
  );
}
