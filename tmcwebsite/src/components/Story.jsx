import Reveal from './Reveal.jsx'
import SectionDivider from './SectionDivider.jsx'
import './Story.css'

export default function Story() {
  return (
    <section id="story" className="story">
      <SectionDivider fill="#f7f1e3" />

      <div className="container story-inner">
        <Reveal as="blockquote" className="story-verse">
          <p>
            &ldquo;And some fell upon a rock; and as soon as it was sprung up, it
            withered away, because it lacked moisture.&rdquo;
          </p>
          <cite>Luke 8:6, KJV</cite>
        </Reveal>

        <Reveal className="story-body" delay={120}>
          <p className="eyebrow story-eyebrow">The Vision</p>
          <h2>Every one of us stands on dry ground somewhere.</h2>

          <p>
            As growing men, we spend a lot of our lives standing on dry ground. Our
            families, our feelings, our desires, our country, our community, our
            careers, our schoolwork &mdash; soil that should be helping us grow, but too
            often leaves us cracked and thirsty instead.
          </p>
          <p>
            And when that dryness goes untreated &mdash; when we don&rsquo;t get the
            help, the honesty, or the support we need &mdash; we don&rsquo;t just
            struggle. We wither.
          </p>
          <p>
            <strong>THE MOISTURE CONFERENCE</strong> exists to interrupt that. Once a
            year, we gather men aged 16 to 24 &mdash; brothers, mentors, men who&rsquo;ve
            stood exactly where we&rsquo;re standing &mdash; for a Friday afternoon of
            honest, unfiltered conversation about the ground beneath our feet. Not to
            perform. Not to pretend. To get the moisture we&rsquo;ve been lacking, so
            what&rsquo;s planted in us can actually grow.
          </p>
        </Reveal>
      </div>

      <SectionDivider fill="#2f4a34" flip />
    </section>
  )
}
