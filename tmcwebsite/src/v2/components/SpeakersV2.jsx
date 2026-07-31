import RevealV2 from './RevealV2.jsx'
import './SpeakersV2.css'

// Drop a speaker's photo in src/assets/speakers/, import it here, and set
// it as that speaker's `photo` below — cards fall back to the initials
// blob automatically when `photo` is left unset.
const SPEAKERS = [
  { name: 'Ifeoluwa Ogunsanya', topic: 'Vision', tone: 'sky', photo: null },
  { name: 'Olatunde Fafolahan', topic: 'Faith', tone: 'coral', photo: null },
  { name: 'David Ohi', topic: 'Identity / Vision', tone: 'butter', photo: null },
  { name: 'Enioluwa Odunjo', topic: 'Relationships', tone: 'mint', photo: null },
  { name: 'Emmanuel Omiwale', topic: 'Grit / Drive / Passion', tone: 'coral', photo: null },
  { name: 'Excellence Oyeniran', topic: 'Values', tone: 'sky', photo: null },
]

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function SpeakersV2() {
  return (
    <section id="mentors" className="v2-section v2-speakers">
      <div className="v2-container">
        <RevealV2 as="div" className="v2-section-head">
          <p className="v2-eyebrow v2-speakers-eyebrow">Meet The Mentors</p>
          <h2>Men who&rsquo;ve walked out of dry ground before.</h2>
          <p>Six mentors, six chapters of their own story &mdash; one theme each.</p>
        </RevealV2>

        <div className="v2-speakers-grid">
          {SPEAKERS.map((speaker, index) => (
            <RevealV2
              as="div"
              className="v2-speaker-card"
              key={speaker.name}
              delay={(index % 3) * 90}
            >
              <div className={`v2-speaker-blob v2-speaker-blob-${speaker.tone}`}>
                {speaker.photo ? (
                  <img src={speaker.photo} alt={speaker.name} className="v2-speaker-blob-img" />
                ) : (
                  <span>{initials(speaker.name)}</span>
                )}
              </div>
              <p className="v2-speaker-eyebrow">Mentor</p>
              <h3>{speaker.name}</h3>
              <span className="v2-speaker-topic">{speaker.topic}</span>
            </RevealV2>
          ))}
        </div>
      </div>
    </section>
  )
}
