import {
  IconCompass,
  IconEye,
  IconFlame,
  IconMountain,
  IconPeople,
  IconShield,
} from '../../components/icons.jsx'
import RevealV2 from './RevealV2.jsx'
import './TrailV2.css'

const STOPS = [
  {
    icon: IconFlame,
    tone: 'coral',
    tag: 'Faith',
    text: 'What we actually believe when no one’s watching, and how it holds up under pressure.',
  },
  {
    icon: IconEye,
    tone: 'sky',
    tag: 'Vision',
    text: 'Seeing past today’s confusion into who you’re becoming, and building toward it on purpose.',
  },
  {
    icon: IconCompass,
    tone: 'butter',
    tag: 'Identity / Purpose',
    text: 'Knowing who you are before the world hands you a label, and why you’re here.',
  },
  {
    icon: IconPeople,
    tone: 'mint',
    tag: 'Relationships',
    text: 'Friendships, family, romance — the connections that either water us or wear us down.',
  },
  {
    icon: IconMountain,
    tone: 'coral',
    tag: 'Grit / Drive / Passion',
    text: 'What it takes to keep showing up when motivation runs out and the work gets hard.',
  },
  {
    icon: IconShield,
    tone: 'sky',
    tag: 'Values',
    text: 'The non-negotiables that decide who you become when nobody’s grading the outcome.',
  },
]

export default function TrailV2() {
  return (
    <section id="trail" className="v2-section v2-trail">
      <div className="v2-container">
        <RevealV2 as="div" className="v2-section-head">
          <p className="v2-eyebrow v2-trail-eyebrow">The Trail Guide</p>
          <h2>Six stops on the way out of dry ground.</h2>
          <p>Follow the trail &mdash; each stop is a conversation we&rsquo;re not skipping this year.</p>
        </RevealV2>

        <div className="v2-trail-path">
          {STOPS.map(({ icon: Icon, tone, tag, text }, index) => (
            <div className="v2-trail-stop" key={tag}>
              <RevealV2 as="div" className={`v2-trail-card v2-trail-card-${tone}`}>
                <div className="v2-trail-card-icon">
                  <Icon />
                </div>
                <h3>{tag}</h3>
                <p>{text}</p>
              </RevealV2>
              <div className="v2-trail-marker">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
