import { Compass, Eye, Flame, Mountains, ShieldCheck, UsersThree } from '@phosphor-icons/react'
import RevealV4 from './RevealV4.jsx'
import './TopicsV4.css'

const TOPICS = [
  { icon: Flame, label: 'Faith', text: 'What we believe when no one is watching.' },
  { icon: Eye, label: 'Vision', text: 'Seeing past today into who you are becoming.', tone: 'tint' },
  { icon: Compass, label: 'Identity / Purpose', text: 'Knowing who you are before the world names you.' },
  { icon: UsersThree, label: 'Relationships', text: 'The connections that water us, or wear us down.' },
  { icon: Mountains, label: 'Grit / Drive / Passion', text: 'Showing up when motivation runs out.' },
  { icon: ShieldCheck, label: 'Values', text: 'The non-negotiables nobody is grading you on.', tone: 'dark' },
]

export default function TopicsV4() {
  return (
    <section id="topics" className="v4-section v4-topics">
      <div className="v4-container">
        <RevealV4 as="p" className="v4-eyebrow">
          What we are covering
        </RevealV4>
        <RevealV4 as="h2" className="v4-topics-head" delay={60}>
          Six topics, one honest room.
        </RevealV4>

        <div className="v4-topics-grid">
          {TOPICS.map(({ icon: Icon, label, text, tone }, index) => (
            <RevealV4
              as="div"
              className={`v4-frame v4-topic-tile ${tone ? `v4-topic-tile-${tone}` : ''}`}
              key={label}
              delay={(index % 3) * 70}
            >
              <Icon weight="light" size={26} />
              <h3>{label}</h3>
              <p>{text}</p>
            </RevealV4>
          ))}
        </div>
      </div>
    </section>
  )
}
