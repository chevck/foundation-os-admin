import { motion } from 'framer-motion'

// Heavy fade-up-blur entrance, fired once via whileInView — the site's
// standard scroll choreography. Never re-triggers on scroll-back.
export default function RevealV3({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 28,
  ...rest
}) {
  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
