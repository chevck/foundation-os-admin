import './ScallopDivider.css'

// Repeating scalloped edge — a storybook page-torn feel, used between the
// brighter sections and the deep "Legend" narrative panel.
export default function ScallopDivider({ fill = '#fff3e2', flip = false, className = '' }) {
  return (
    <div className={`scallop ${flip ? 'scallop-flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 20" preserveAspectRatio="none">
        <path
          d="M0,20 L0,10 C10,10 10,0 20,0 C30,0 30,10 40,10 C50,10 50,0 60,0 C70,0 70,10 80,10 C90,10 90,0 100,0 C110,0 110,10 120,10 C130,10 130,0 140,0 C150,0 150,10 160,10 C170,10 170,0 180,0 C190,0 190,10 200,10 C210,10 210,0 220,0 C230,0 230,10 240,10 L240,20 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
