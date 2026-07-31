function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, tone = 'soil', className = '' }) {
  return (
    <div className={`avatar avatar-${tone} ${className}`} aria-hidden="true">
      <span>{initials(name)}</span>
    </div>
  )
}
