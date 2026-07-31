import { memo, useMemo, useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import './AmbientField.css'

// Fixed, pointer-events-none ambience layer: two slow-drifting mesh glows
// plus rain that builds as the page scrolls. 16 drops are always active
// (the baseline light rain you see on load); 24 more join in, gated by
// their own scroll threshold, so the shower thickens the deeper you go.
// A single --v3-storm-intensity custom property (set on the container,
// inherited by every drop) drives fall speed and wind drift for all of
// them at once — see AmbientField.css.
const DROP_COUNT = 40
const BASELINE_COUNT = 16

const RAINDROPS = Array.from({ length: DROP_COUNT }).map((_, i) => {
  const isBaseline = i < BASELINE_COUNT
  return {
    id: i,
    left: `${(i * 6.7 + (i % 3) * 11) % 100}%`,
    length: 14 + ((i * 7) % 4) * 4,
    duration: 1.8 + ((i * 5) % 10) * 0.14,
    delay: -((i * 0.97) % 3.4),
    drift: (i % 2 === 0 ? 1 : -1) * (4 + (i % 5) * 2),
    threshold: isBaseline ? 0 : 0.04 + ((i - BASELINE_COUNT) / (DROP_COUNT - BASELINE_COUNT)) * 0.88,
  }
})

// One drop, one component instance — keeps the scroll-threshold hook legal
// (each gets its own useMotionValueEvent subscription) and means a drop
// only ever re-renders once, the moment it crosses its threshold.
function Raindrop({ progress, threshold, left, length, duration, delay, drift }) {
  const [active, setActive] = useState(threshold <= 0)

  useMotionValueEvent(progress, 'change', (v) => {
    if (!active && v >= threshold) setActive(true)
  })

  if (!active) return null

  return (
    <span
      className="v3-ambient-raindrop"
      style={{
        left,
        '--v3-raindrop-length': `${length}px`,
        '--v3-raindrop-base-duration': `${duration}s`,
        '--v3-drift': `${drift}px`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function AmbientField({ progress }) {
  const raindrops = useMemo(() => RAINDROPS, [])
  const intensity = useTransform(progress, [0, 0.3, 0.65, 1], [0, 0.15, 0.55, 1])

  return (
    <motion.div className="v3-ambient" aria-hidden="true" style={{ '--v3-storm-intensity': intensity }}>
      <div className="v3-glow v3-glow-amber" />
      <div className="v3-glow v3-glow-emerald" />
      {raindrops.map((d) => (
        <Raindrop key={d.id} progress={progress} {...d} />
      ))}
    </motion.div>
  )
}

export default memo(AmbientField)
