import { motion, useMotionValue, useSpring } from 'framer-motion'

// Buttons pull slightly toward the cursor. Position is driven entirely by
// Framer Motion's motion values (never React state) so the pointer-move
// loop stays off the render cycle and stays smooth on mobile-class CPUs.
export default function MagneticButton({
  as = 'a',
  className = '',
  children,
  strength = 12,
  ...rest
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const relX = event.clientX - rect.left - rect.width / 2
    const relY = event.clientY - rect.top - rect.height / 2
    x.set((relX / rect.width) * strength)
    y.set((relY / rect.height) * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
