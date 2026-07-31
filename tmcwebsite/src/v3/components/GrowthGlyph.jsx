import { motion } from 'framer-motion'

// Hand-built illustration: a vine of light climbing out of dry, cracked
// ground into a bursting bud — the hero's visual thesis. Rain (RainField,
// rendered as a sibling over this same viewBox) starts falling immediately;
// GROW_START is when the ground has taken on enough of that rain to visibly
// respond, and the vine then climbs gradually — leaf by leaf — rather than
// snapping open all at once, finishing as the shower tapers off. Keep
// GROW_START + GROW_DURATION in the neighbourhood of RainField's
// RAIN_DURATION (currently 6.5s) so the bud bursts just as the rain lets up.
const GROW_START = 2
const GROW_DURATION = 5

const VINE_PATH =
  'M170 470 C150 420 190 400 178 350 C168 305 128 300 138 250 C146 210 190 208 182 165 C176 132 150 128 156 92 C160 66 176 46 178 20'

// Each leaf's delay is GROW_START plus how far along the stem's vertical
// climb (ground y=470 to tip y=20) it sits, so leaves open in step with the
// vine actually reaching them instead of clustering right after the stem starts.
const stemProgress = (cy) => (470 - cy) / (470 - 20)

const LEAVES = [
  { cx: 141, cy: 388, r: 10, rot: -18 },
  { cx: 205, cy: 322, r: 12, rot: 22 },
  { cx: 128, cy: 258, r: 9, rot: -24 },
  { cx: 198, cy: 190, r: 11, rot: 20 },
  { cx: 142, cy: 118, r: 9, rot: -16 },
].map((leaf) => ({ ...leaf, delay: GROW_START + stemProgress(leaf.cy) * GROW_DURATION }))

const GROW_END = GROW_START + GROW_DURATION

export default function GrowthGlyph({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 -50 340 570"
      className={`v3-growth-glyph ${className}`}
      initial="hidden"
      animate="show"
    >
      <defs>
        <linearGradient id="v3-vine-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f2b263" />
          <stop offset="100%" stopColor="#55d9a3" />
        </linearGradient>
        <radialGradient id="v3-bud-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3df" />
          <stop offset="45%" stopColor="#f2b263" />
          <stop offset="100%" stopColor="#f2b263" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="v3-ground-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#55d9a3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#55d9a3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground glow */}
      <ellipse cx="172" cy="486" rx="120" ry="26" fill="url(#v3-ground-grad)" />

      {/* cracked ground line-art, already visible before the rain lands */}
      <motion.path
        d="M40 492 L118 478 L150 494 L196 476 L236 494 L305 480"
        stroke="rgba(245,241,230,0.22)"
        strokeWidth="1.4"
        fill="none"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0, duration: 0.5 } } }}
      />
      <motion.path
        d="M96 480 L104 500 M182 486 L176 503 M258 486 L266 502"
        stroke="rgba(245,241,230,0.16)"
        strokeWidth="1.2"
        fill="none"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.1, duration: 0.5 } } }}
      />

      {/* the vine stem — climbs gradually as the rain falls */}
      <motion.path
        d={VINE_PATH}
        stroke="url(#v3-vine-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { delay: GROW_START, duration: GROW_DURATION, ease: [0.45, 0, 0.55, 1] },
          },
        }}
      />

      {/* leaf nodes */}
      {LEAVES.map((leaf) => (
        <motion.g
          key={leaf.cx}
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            show: {
              opacity: 1,
              scale: 1,
              transition: { delay: leaf.delay, type: 'spring', stiffness: 220, damping: 16 },
            },
          }}
          style={{ transformOrigin: `${leaf.cx}px ${leaf.cy}px` }}
        >
          <ellipse
            cx={leaf.cx}
            cy={leaf.cy}
            rx={leaf.r}
            ry={leaf.r * 0.62}
            fill="none"
            stroke="#55d9a3"
            strokeWidth="1.6"
            transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
          />
        </motion.g>
      ))}

      {/* bursting bud at the tip. cy=20, r=46 reaches up to y=-26, which is
          why the viewBox above starts at -50 instead of 0: without that
          headroom the glow gets clipped flat across the top. */}
      <motion.circle
        cx="178"
        cy="20"
        r="46"
        fill="url(#v3-bud-grad)"
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { delay: GROW_END + 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
      <motion.circle
        cx="178"
        cy="20"
        r="6.5"
        fill="#fff3df"
        variants={{
          hidden: { opacity: 0, scale: 0.3 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { delay: GROW_END + 0.25, type: 'spring', stiffness: 260, damping: 14 },
          },
        }}
      />
    </motion.svg>
  )
}
