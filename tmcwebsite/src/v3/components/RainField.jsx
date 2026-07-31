import { motion } from 'framer-motion'

// A shower of rain falling onto the growth glyph's ground line — the cause
// half of "rain falls, the plant grows." Shares the glyph's viewBox exactly
// (both the 340x570 box and its -50 top offset) so drops land exactly where
// the vine sprouts and don't get clipped entering from above. One-shot on
// mount, not a loop: it plays once as the hero's entrance, same as the vine
// used to. RAIN_DURATION must match GrowthGlyph's RAIN_DELAY so the vine
// starts growing right as the shower tapers off.
const GROUND_Y = 480
const RAIN_DURATION = 6.5
const DROP_COUNT = 30

const DROPS = Array.from({ length: DROP_COUNT }).map((_, i) => ({
  id: i,
  x: 20 + ((i * 37) % 305),
  length: 20 + ((i * 13) % 5) * 6,
  delay: (i / DROP_COUNT) * RAIN_DURATION + (((i * 53) % 100) / 100) * 0.35,
  duration: 0.42 + ((i * 17) % 6) * 0.02,
}))

const RIPPLES = [
  { cx: 132, delay: 0.5 },
  { cx: 176, delay: 1.6 },
  { cx: 214, delay: 2.4 },
  { cx: 150, delay: 3.5 },
  { cx: 200, delay: 4.4 },
  { cx: 128, delay: 5.3 },
  { cx: 182, delay: 6.1 },
]

export default function RainField({ className = '' }) {
  return (
    <svg viewBox="0 -50 340 570" className={`v3-rain-field ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id="v3-rain-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--v3-rain-color)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--v3-rain-color)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {DROPS.map((d) => (
        <motion.line
          key={d.id}
          x1={d.x}
          x2={d.x - 5}
          stroke="url(#v3-rain-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ y1: -40, y2: -40 + d.length, opacity: 0 }}
          animate={{
            y1: GROUND_Y,
            y2: GROUND_Y + d.length,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            ease: 'easeIn',
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}

      {RIPPLES.map((r) => (
        <motion.circle
          key={r.cx}
          cx={r.cx}
          cy={GROUND_Y}
          r={4}
          fill="none"
          stroke="var(--v3-rain-color)"
          strokeWidth="1.2"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.3, 1.8, 2.4] }}
          transition={{ duration: 0.7, delay: r.delay, ease: 'easeOut' }}
          style={{ transformOrigin: `${r.cx}px ${GROUND_Y}px` }}
        />
      ))}
    </svg>
  )
}
