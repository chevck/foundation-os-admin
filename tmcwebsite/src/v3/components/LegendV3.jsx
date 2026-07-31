import RevealV3 from "./RevealV3.jsx";
import "./LegendV3.css";

export default function LegendV3() {
  return (
    <section id='legend' className='v3-section v3-legend'>
      <div className='v3-container v3-legend-inner'>
        <RevealV3 as='div' className='v3-legend-head'>
          <p className='v3-eyebrow'>
            <span className='v3-eyebrow-dot' />
            The Legend
          </p>
          <h2>Every one of us stands on dry ground somewhere.</h2>
        </RevealV3>

        <RevealV3 as='p' className='v3-legend-lede' delay={80}>
          As growing men, we spend a lot of our lives standing on dry ground.
          Our families, our feelings, our desires, our country, our community,
          our careers, our schoolwork: soil that should be helping us grow, but
          too often leaves us cracked and thirsty instead.
        </RevealV3>

        <RevealV3
          as='blockquote'
          className='v3-bezel v3-legend-verse'
          delay={160}
        >
          <div className='v3-bezel-core v3-legend-verse-core'>
            <p>
              &ldquo;And some fell upon a rock; and as soon as it was sprung up,
              it withered away, because it lacked moisture.&rdquo;
            </p>
            <cite>Luke 8:6, KJV</cite>
          </div>
        </RevealV3>

        <RevealV3 as='p' className='v3-legend-body' delay={220}>
          And when that dryness goes untreated, when we don&rsquo;t get the
          help, the honesty, or the support we need, we don&rsquo;t just
          struggle. We wither.
        </RevealV3>

        <RevealV3 as='p' className='v3-legend-close' delay={280}>
          <strong>THE MOISTURE CONFERENCE exists to interrupt that.</strong> On
          the <b>28th August, 2026</b>, we gather men aged <b>16 to 24:</b>{" "}
          brothers, mentors, men who&rsquo;ve stood exactly where we&rsquo;re
          standing, for a day of honest, unfiltered conversation about the
          ground beneath our feet. We're not coming to perform, or to pretend,
          but to get the moisture we&rsquo;ve been lacking, so what&rsquo;s
          planted in us can actually grow.
        </RevealV3>
      </div>
    </section>
  );
}
