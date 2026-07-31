// Decorative line-art night skyline for the Event card — campus towers,
// a bell spire and tree line beneath a glowing crescent moon.
export default function SkylineArt({ className = '' }) {
  return (
    <svg viewBox="0 0 420 260" className={className} preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="v3-moon-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3df" />
          <stop offset="55%" stopColor="#f2b263" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f2b263" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="v3-skyline-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(245,241,230,0.5)" />
          <stop offset="100%" stopColor="rgba(245,241,230,0.14)" />
        </linearGradient>
      </defs>

      <circle cx="332" cy="58" r="60" fill="url(#v3-moon-grad)" />
      <circle cx="332" cy="58" r="19" fill="none" stroke="#fff3df" strokeWidth="1.4" opacity="0.85" />

      {Array.from({ length: 26 }).map((_, i) => {
        const cx = (i * 53) % 420
        const cy = 20 + ((i * 37) % 70)
        const r = 0.6 + (i % 3) * 0.4
        return <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f1e6" opacity={0.25 + (i % 4) * 0.12} />
      })}

      <path
        d="M0 210 L0 190 L18 190 L18 170 L34 170 L34 195 L50 195 L50 150 L58 150 L58 130 L66 130 L66 150 L74 150 L74 195 L98 195 L98 205 L120 205 L120 160 L138 160 L138 145 L150 145 L150 128 L162 128 L162 145 L174 145 L174 160 L192 160 L192 205 L214 205 L214 175 L230 175 L230 150 L246 150 L246 120 L256 120 L256 96 L262 96 L262 120 L272 120 L272 150 L288 150 L288 175 L304 175 L304 205 L420 205 L420 260 L0 260 Z"
        fill="url(#v3-skyline-grad)"
      />
      <path d="M150 128 L150 108 M144 114 L156 114" stroke="rgba(245,241,230,0.5)" strokeWidth="1.4" strokeLinecap="round" />

      <line x1="0" y1="210" x2="420" y2="210" stroke="rgba(245,241,230,0.18)" strokeWidth="1" />
    </svg>
  )
}
