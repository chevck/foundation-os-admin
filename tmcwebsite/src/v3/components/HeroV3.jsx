import { motion } from "framer-motion";
import {
  IconArrowUpRight,
  IconCalendar,
  IconClock,
  IconPin,
} from "../../components/icons.jsx";
import GrowthGlyph from "./GrowthGlyph.jsx";
import RainField from "./RainField.jsx";
import MagneticButton from "../../components/MagneticButton.jsx";
import "./HeroV3.css";

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroV3() {
  return (
    <section id='top' className='v3-hero'>
      <div className='v3-container v3-hero-grid'>
        <motion.div className='v3-hero-copy' initial='hidden' animate='show'>
          {/* <motion.p className="v3-eyebrow" custom={0} variants={fadeUp}>
            <span className="v3-eyebrow-dot" />
            <span className="v3-eyebrow-full">Luke 8:6 &middot; Night Garden Edition</span>
            <span className="v3-eyebrow-short">Night Garden Edition</span>
          </motion.p> */}

          <motion.h1 className='v3-hero-title' custom={0.1} variants={fadeUp}>
            You were not
            <br />
            made to <span className='v3-hero-title-glow'>wither.</span>
          </motion.h1>

          <motion.p className='v3-hero-sub' custom={0.22} variants={fadeUp}>
            THE MOISTURE CONFERENCE brings men ages 16-24 into honest,
            unfiltered conversation about the dry ground we all stand on:
            family, feelings, desires, career, community, faith, before it costs
            us the life we were meant to grow into.
          </motion.p>

          <motion.div
            className='v3-hero-actions'
            custom={0.34}
            variants={fadeUp}
          >
            <MagneticButton
              as='a'
              href='#rsvp'
              className='v3-btn v3-btn-primary'
            >
              RSVP &middot; It&rsquo;s Free
              <span className='v3-btn-icon'>
                <IconArrowUpRight />
              </span>
            </MagneticButton>
            <MagneticButton
              as='a'
              href='#legend'
              className='v3-btn v3-btn-ghost'
            >
              Read The Legend
              <span className='v3-btn-icon'>
                <IconArrowUpRight />
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div className='v3-hero-info' custom={0.46} variants={fadeUp}>
            <div className='v3-hero-info-item'>
              <IconCalendar />
              <span>Fri, Aug 28th, 2026</span>
            </div>
            <div className='v3-hero-info-item'>
              <IconClock />
              <span>12:00 PM</span>
            </div>
            <div className='v3-hero-info-item'>
              <IconPin />
              <span>University of Ibadan</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className='v3-hero-art'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className='v3-hero-art-glow' aria-hidden='true' />
          <div className='v3-hero-art-stage'>
            <GrowthGlyph className='v3-hero-art-glyph' />
            <RainField className='v3-hero-art-rain' />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
