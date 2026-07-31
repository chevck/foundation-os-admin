// Minimal line-icon set, stroke-based, drawn in-house to keep the site
// dependency-free. All icons share a 24x24 viewBox and inherit color.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconDrop(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5C12 3.5 5.5 12 5.5 16.5C5.5 20.09 8.41 23 12 23C15.59 23 18.5 20.09 18.5 16.5C18.5 12 12 3.5 12 3.5Z" />
      <path d="M8.5 16.5C8.5 18.43 9.9 19.9 12 20.3" />
    </svg>
  )
}

export function IconFlame(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 22c4.1 0 6.5-2.7 6.5-6.2 0-3.1-2-4.9-2.9-6.9-.4.9-.4 1.9-1 2.6-.4-2.4-1.7-4.6-3.7-6-.2 1.9-.6 3.1-1.9 4.6C7.4 11.6 5.5 12.9 5.5 15.8 5.5 19.3 7.9 22 12 22Z" />
      <path d="M12 22c1.8 0 3-1.2 3-2.9 0-1.6-1.2-2.6-1.7-3.6-.6 1.4-1.6 1.9-2.2 3-.4.7-.6 1.2-.6 1.6C10.5 21 11.1 22 12 22Z" />
    </svg>
  )
}

export function IconEye(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconCompass(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </svg>
  )
}

export function IconPeople(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16" cy="9.5" r="2.4" />
      <path d="M2.8 20c.6-3.4 3-5.3 5.7-5.3s5.1 1.9 5.7 5.3" />
      <path d="M14.8 14.9c2.2.2 4 1.9 4.5 5.1" />
    </svg>
  )
}

export function IconMountain(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 19 9 8l4 6.5 2-3L21.5 19Z" />
      <path d="M13.6 19 17 13.3" />
    </svg>
  )
}

export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 20 6v6c0 5-3.4 8.4-8 9.2C7.4 20.4 4 17 4 12V6l8-3.2Z" />
      <path d="M8.7 12.1l2.2 2.2 4.4-4.6" />
    </svg>
  )
}

export function IconCalendar(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  )
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5S4.5 14.4 4.5 9.4a7.5 7.5 0 1 1 15 0c0 5-7.5 12.1-7.5 12.1Z" />
      <circle cx="12" cy="9.3" r="2.6" />
    </svg>
  )
}

export function IconArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7h8.5v8.5" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16" />
      <path d="M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  )
}

export function IconVolumeOff(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.2L12 5.8v12.4l-4.8-3.7H4Z" />
      <path d="M16 9.5 20 14M20 9.5l-4 4.5" />
    </svg>
  )
}

export function IconVolumeOn(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5h3.2L12 5.8v12.4l-4.8-3.7H4Z" />
      <path d="M15.8 9.2a4 4 0 0 1 0 5.6" />
      <path d="M18.3 6.8a7.6 7.6 0 0 1 0 10.4" />
    </svg>
  )
}

export function IconSun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.85 1.85M17.55 17.55l1.85 1.85M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.85-1.85M17.55 6.45l1.85-1.85" />
    </svg>
  )
}

export function IconMoon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.3" />
      <path d="M7.8 12.3l2.7 2.7 5.7-6" />
    </svg>
  )
}

export function IconMenu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  )
}

export function IconInstagram(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    </svg>
  )
}

export function IconWhatsapp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5c5.2 0 9.5-4.3 9.5-9.5S17.2 2.5 12 2.5 2.5 6.8 2.5 12c0 1.7.4 3.3 1.3 4.7L2.8 21.2l4.6-1c1.4.8 2.9 1.3 4.6 1.3Z" />
      <path d="M8.3 8.6c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.8s0 .3-.1.5c-.1.2-.2.3-.4.4-.1.2-.3.3-.1.6.2.4.9 1.3 1.9 2.1 1.3 1 2.3 1.4 2.7 1.5.3.2.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.4 0 .2 0 .9-.4 1.4-.3.5-1.5 1-2.1 1-1.9.1-3.9-.8-5.4-2.1-1.6-1.4-2.6-3-2.9-3.6-.2-.5-.7-1.5-.7-2.6 0-1.1.5-1.6.7-1.8Z" />
    </svg>
  )
}
