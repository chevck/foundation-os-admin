import { motion } from 'framer-motion'

// Standard scroll-entry choreography for the Dossier edition: a quiet
// fade-up-blur settle, fired once via whileInView (never a raw scroll
// listener). See design-taste-frontend skill, Section 5.C.
export default function RevealV4({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 22,
  ...rest
}) {
  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
