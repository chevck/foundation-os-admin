import RevealV4 from './RevealV4.jsx'
import './SpeakersV4.css'

// Placeholder portrait photography (randomuser.me) toned to monochrome for
// a consistent dossier feel across mismatched source lighting. Swap `photo`
// for real speaker photography before launch — see note at bottom of file.
const SPEAKERS = [
  { name: 'Ifeoluwa Ogunsanya', topic: 'Vision', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Olatunde Fafolahan', topic: 'Faith', photo: 'https://randomuser.me/api/portraits/men/47.jpg' },
  { name: 'David Ohi', topic: 'Identity / Purpose', photo: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { name: 'Enioluwa Odunjo', topic: 'Relationships', photo: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Emmanuel Omiwale', topic: 'Grit / Drive / Passion', photo: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { name: 'Excellence Oyeniran', topic: 'Values', photo: 'https://randomuser.me/api/portraits/men/53.jpg' },
]

export default function SpeakersV4() {
  return (
    <section id="speakers" className="v4-section v4-speakers">
      <div className="v4-container">
        <RevealV4 as="h2" className="v4-speakers-head">
          Six speakers. Six seasons they walked out of.
        </RevealV4>

        <div className="v4-speakers-row">
          {SPEAKERS.map((speaker, index) => (
            <RevealV4 as="figure" className="v4-speaker-card" key={speaker.name} delay={index * 60}>
              <div className="v4-speaker-photo-frame">
                <img src={speaker.photo} alt={speaker.name} />
              </div>
              <figcaption>
                <span className="v4-speaker-name">{speaker.name}</span>
                <span className="v4-speaker-topic">{speaker.topic}</span>
              </figcaption>
            </RevealV4>
          ))}
        </div>
      </div>
    </section>
  )
}

// NOTE: no image-generation tool was available when this section was built,
// so these are realistic stock placeholder photos, not the actual speakers.
// Replace each `photo` above with real speaker photography before launch.
