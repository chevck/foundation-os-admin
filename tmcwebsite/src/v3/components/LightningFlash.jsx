import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { playThunder } from '../lib/thunder.js'
import './LightningFlash.css'

// No lightning until the storm has actually built up some (12% down the
// page), then strikes get steadily more frequent as scroll progress (and
// therefore --v3-storm-intensity in AmbientField) climbs toward 1. Purely
// timeout-scheduled, not a loop tied to render, and fully skipped under
// prefers-reduced-motion — a strobing full-screen flash is exactly the
// kind of thing that setting exists to opt out of.
const START_THRESHOLD = 0.12

export default function LightningFlash({ progress, thunderEnabled, audioContextRef }) {
  const flashOpacity = useMotionValue(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    function strike(intensity) {
      animate(flashOpacity, [0, 0.6, 0.15, 0.4, 0], {
        duration: 0.55,
        times: [0, 0.08, 0.22, 0.32, 1],
        ease: 'easeOut',
      })

      if (thunderEnabled && audioContextRef.current) {
        const soundDelay = 150 + Math.random() * 350
        window.setTimeout(() => playThunder(audioContextRef.current, { intensity }), soundDelay)
      }
    }

    function scheduleNext() {
      const intensity = progress.get()

      if (intensity < START_THRESHOLD) {
        timeoutRef.current = window.setTimeout(scheduleNext, 1500)
        return
      }

      const t = (intensity - START_THRESHOLD) / (1 - START_THRESHOLD)
      const minDelay = 5400 - t * 4000
      const maxDelay = 11000 - t * 7500
      const delay = minDelay + Math.random() * (maxDelay - minDelay)

      timeoutRef.current = window.setTimeout(() => {
        strike(progress.get())
        scheduleNext()
      }, delay)
    }

    scheduleNext()
    return () => window.clearTimeout(timeoutRef.current)
  }, [progress, thunderEnabled, audioContextRef, flashOpacity])

  return <motion.div className="v3-lightning" aria-hidden="true" style={{ opacity: flashOpacity }} />
}
