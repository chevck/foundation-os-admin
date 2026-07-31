import {
  IconCompass,
  IconEye,
  IconFlame,
  IconMountain,
  IconPeople,
  IconShield,
} from '../../components/icons.jsx'
import RevealV3 from './RevealV3.jsx'
import './TrailV3.css'

const STOPS = [
  {
    icon: IconFlame,
    tag: 'Faith',
    tone: 'amber',
    span: 'v3-trail-tile-lg',
    text: 'What we actually believe when no one’s watching, and how it holds up under pressure.',
  },
  {
    icon: IconEye,
    tag: 'Vision',
    tone: 'emerald',
    span: 'v3-trail-tile-md',
    text: 'Seeing past today’s confusion into who you’re becoming, and building toward it on purpose.',
  },
  {
    icon: IconCompass,
    tag: 'Identity / Purpose',
    tone: 'amber',
    span: 'v3-trail-tile-md',
    text: 'Knowing who you are before the world hands you a label, and why you’re here.',
  },
  {
    icon: IconPeople,
    tag: 'Relationships',
    tone: 'emerald',
    span: 'v3-trail-tile-sm',
    text: 'Friendships, family, romance: the connections that either water us or wear us down.',
  },
  {
    icon: IconMountain,
    tag: 'Grit / Drive / Passion',
    tone: 'amber',
    span: 'v3-trail-tile-sm',
    text: 'What it takes to keep showing up when motivation runs out and the work gets hard.',
  },
  {
    icon: IconShield,
    tag: 'Values',
    tone: 'emerald',
    span: 'v3-trail-tile-sm',
    text: 'The non-negotiables that decide who you become when nobody’s grading the outcome.',
  },
]

export default function TrailV3() {
  return (
    <section id="trail" className="v3-section v3-trail">
      <div className="v3-container">
        <RevealV3 as="div" className="v3-section-head">
          <p className="v3-eyebrow">
            <span className="v3-eyebrow-dot" />
            The Trail Guide
          </p>
          <h2>Six stops on the way out of dry ground.</h2>
          <p>Each stop is a conversation we&rsquo;re not skipping this year.</p>
        </RevealV3>

        <div className="v3-trail-grid">
          {STOPS.map(({ icon: Icon, tag, tone, span, text }, index) => (
            <RevealV3
              key={tag}
              className={`v3-bezel v3-trail-tile ${span}`}
              delay={(index % 3) * 90}
              whileHover={{ y: -5 }}
            >
              <div className="v3-bezel-core v3-trail-tile-core">
                <div className={`v3-trail-tile-icon v3-trail-tile-icon-${tone}`}>
                  <Icon />
                </div>
                <span className="v3-trail-tile-index">{`0${index + 1}`}</span>
                <h3>{tag}</h3>
                <p>{text}</p>
              </div>
            </RevealV3>
          ))}
        </div>
      </div>
    </section>
  )
}
