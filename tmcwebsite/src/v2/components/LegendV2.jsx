import RevealV2 from './RevealV2.jsx'
import ScallopDivider from './ScallopDivider.jsx'
import './LegendV2.css'

export default function LegendV2() {
  return (
    <section id="legend" className="v2-legend">
      <ScallopDivider fill="#fff3e2" />

      <RevealV2 as="div" className="v2-container v2-legend-inner">
        <p className="v2-eyebrow v2-legend-eyebrow">The Legend</p>
        <h2>Once upon a season, in the heart of Ibadan&hellip;</h2>

        <p className="v2-legend-lede">
          There was a generation of young men standing on ground that never got
          watered. Their families, their feelings, their futures &mdash; soil that
          should have helped them grow, cracked and thirsty instead.
        </p>

        <blockquote className="v2-legend-verse">
          <p>
            &ldquo;And some fell upon a rock; and as soon as it was sprung up, it
            withered away, because it lacked moisture.&rdquo;
          </p>
          <cite>Luke 8:6, KJV</cite>
        </blockquote>

        <p>
          Some of them withered quietly. Nobody warned them dry ground could do
          that. But a few found rain &mdash; older brothers, mentors, honest rooms
          where the truth was finally allowed to be said out loud. And where there
          is moisture, even cracked ground can grow again.
        </p>

        <p className="v2-legend-close">
          <strong>So once a year</strong>, we gather. Not to perform. Not to
          pretend. To hand each other the moisture we&rsquo;ve been lacking &mdash;
          so what&rsquo;s planted in us can finally take root.
        </p>
      </RevealV2>

      <ScallopDivider fill="#fff3e2" flip />
    </section>
  )
}
