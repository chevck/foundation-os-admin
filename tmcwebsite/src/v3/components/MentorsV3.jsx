import RevealV3 from './RevealV3.jsx'
import './MentorsV3.css'

// Drop a mentor's photo in src/assets/mentors/, import it here, and set it
// as that mentor's `photo` below — cards fall back to the glowing initials
// ring automatically when `photo` is left unset.
const MENTORS = [
  { name: 'Ifeoluwa Ogunsanya', topic: 'Vision', tone: 'emerald', tilt: -2.5, photo: null },
  { name: 'Olatunde Fafolahan', topic: 'Faith', tone: 'amber', tilt: 2, photo: null },
  { name: 'David Ohi', topic: 'Identity / Vision', tone: 'emerald', tilt: -1.5, photo: null },
  { name: 'Enioluwa Odunjo', topic: 'Relationships', tone: 'amber', tilt: 2.5, photo: null },
  { name: 'Emmanuel Omiwale', topic: 'Grit / Drive / Passion', tone: 'emerald', tilt: -2, photo: null },
  { name: 'Excellence Oyeniran', topic: 'Values', tone: 'amber', tilt: 1.5, photo: null },
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

export default function MentorsV3() {
  return (
    <section id="mentors" className="v3-section v3-mentors">
      <div className="v3-container">
        <RevealV3 as="div" className="v3-section-head">
          <p className="v3-eyebrow">
            <span className="v3-eyebrow-dot" />
            Your Mentors For The Day
          </p>
          <h2>Men who&rsquo;ve stood on this ground before.</h2>
          <p>
            Six mentors sharing the road they took from dry ground to
            rooted growth, one theme each.
          </p>
        </RevealV3>

        <div className="v3-mentors-grid">
          {MENTORS.map((mentor, index) => (
            <RevealV3
              as="div"
              className="v3-bezel v3-mentor-card"
              key={mentor.name}
              delay={(index % 3) * 90}
              style={{ rotate: mentor.tilt }}
              whileHover={{ rotate: 0, y: -6 }}
            >
              <div className="v3-bezel-core v3-mentor-card-core">
                <div className={`v3-mentor-ring v3-mentor-ring-${mentor.tone}`}>
                  {mentor.photo ? (
                    <img src={mentor.photo} alt={mentor.name} className="v3-mentor-photo" />
                  ) : (
                    <span>{initials(mentor.name)}</span>
                  )}
                </div>
                <p className="v3-mentor-eyebrow">Mentor</p>
                <h3>{mentor.name}</h3>
                <span className="v3-mentor-topic">{mentor.topic}</span>
              </div>
            </RevealV3>
          ))}
        </div>
      </div>
    </section>
  )
}
