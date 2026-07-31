import { IconCompass, IconEye, IconFlame, IconMountain, IconPeople, IconShield } from './icons.jsx'
import Reveal from './Reveal.jsx'
import SectionDivider from './SectionDivider.jsx'
import './Themes.css'

const THEMES = [
  {
    icon: IconFlame,
    tone: 'soil',
    tag: 'Faith',
    text: 'What we actually believe when no one’s watching, and how it holds up under pressure.',
  },
  {
    icon: IconEye,
    tone: 'water',
    tag: 'Vision',
    text: 'Seeing past today’s confusion into who you’re becoming, and building toward it on purpose.',
  },
  {
    icon: IconCompass,
    tone: 'gold',
    tag: 'Identity / Purpose',
    text: 'Knowing who you are before the world hands you a label, and why you’re here.',
  },
  {
    icon: IconPeople,
    tone: 'soil',
    tag: 'Relationships',
    text: 'Friendships, family, romance — the connections that either water us or wear us down.',
  },
  {
    icon: IconMountain,
    tone: 'water',
    tag: 'Grit / Drive / Passion',
    text: 'What it takes to keep showing up when motivation runs out and the work gets hard.',
  },
  {
    icon: IconShield,
    tone: 'gold',
    tag: 'Values',
    text: 'The non-negotiables that decide who you become when nobody’s grading the outcome.',
  },
]

export default function Themes() {
  return (
    <section id="themes" className="themes">
      <div className="container">
        <Reveal as="div" className="section-head themes-head">
          <p className="eyebrow themes-eyebrow">Six Conversations, One Ground</p>
          <h2>Where the dryness shows up most.</h2>
          <p>
            This year, we&rsquo;re digging into six areas where young men most often find
            themselves running on empty.
          </p>
        </Reveal>

        <div className="themes-grid">
          {THEMES.map(({ icon: Icon, tone, tag, text }, index) => (
            <Reveal as="div" className="theme-card" key={tag} delay={(index % 3) * 90}>
              <div className={`theme-icon theme-icon-${tone}`}>
                <Icon />
              </div>
              <h3>{tag}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <SectionDivider fill="#f7f1e3" flip />
    </section>
  )
}
