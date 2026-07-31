// Organic hand-drawn edge used to break up section blocks instead of hard
// straight lines — echoes torn/ground-line shapes rather than a stock wave.
export default function SectionDivider({ fill = '#f7f1e3', flip = false, className = '' }) {
  return (
    <div className={`divider ${flip ? 'divider-flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path
          d="M0,32 C120,68 240,4 360,30 C480,56 600,10 720,26 C840,42 960,4 1080,24 C1140,34 1170,44 1200,40 L1200,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
