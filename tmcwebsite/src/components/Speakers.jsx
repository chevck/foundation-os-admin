import Avatar from './Avatar.jsx'
import Reveal from './Reveal.jsx'
import SectionDivider from './SectionDivider.jsx'
import './Speakers.css'

// Drop a speaker's photo in src/assets/speakers/, import it here, and set
// it as that speaker's `photo` below — cards fall back to the initials
// avatar automatically when `photo` is left unset.
const SPEAKERS = [
  { name: 'Ifeoluwa Ogunsanya', topic: 'Vision', tone: 'water', photo: null },
  { name: 'Olatunde Fafolahan', topic: 'Faith', tone: 'soil', photo: null },
  { name: 'David Ohi', topic: 'Identity / Vision', tone: 'gold', photo: null },
  { name: 'Enioluwa Odunjo', topic: 'Relationships', tone: 'soil', photo: null },
  { name: 'Emmanuel Omiwale', topic: 'Grit / Drive / Passion', tone: 'water', photo: null },
  { name: 'Excellence Oyeniran', topic: 'Values', tone: 'gold', photo: null },
]

export default function Speakers() {
  return (
    <section id="speakers" className="speakers">
      <SectionDivider fill="#fffaf0" />

      <div className="container">
        <Reveal as="div" className="section-head speakers-head">
          <p className="eyebrow speakers-eyebrow">Your Mentors For The Day</p>
          <h2>Men who&rsquo;ve stood on this ground before.</h2>
          <p>
            Six mentors sharing the road they took from dry ground to rooted
            growth &mdash; one theme each.
          </p>
        </Reveal>

        <div className="speakers-grid">
          {SPEAKERS.map((speaker, index) => (
            <Reveal as="div" className="speaker-card" key={speaker.name} delay={(index % 3) * 90}>
              {speaker.photo ? (
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="speaker-avatar speaker-avatar-img"
                />
              ) : (
                <Avatar name={speaker.name} tone={speaker.tone} className="speaker-avatar" />
              )}
              <p className="speaker-eyebrow">Mentor</p>
              <h3>{speaker.name}</h3>
              <span className="speaker-topic">{speaker.topic}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
