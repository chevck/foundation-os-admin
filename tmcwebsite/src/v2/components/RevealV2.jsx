import useInView from '../../hooks/useInView.js'

// Whimsical version of the reveal-on-scroll wrapper: fades/rises/settles
// with a slight rotation wobble to match the bouncy storybook feel.
export default function RevealV2({
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
      className={`v2-reveal ${inView ? 'v2-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
