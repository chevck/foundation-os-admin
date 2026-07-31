import useInView from '../hooks/useInView.js'

// Fades + rises into place the first time it scrolls into view.
// `delay` (ms) lets siblings in a grid stagger in one after another.
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
