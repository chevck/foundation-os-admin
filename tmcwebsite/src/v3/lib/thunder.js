// Synthesized thunder. No audio file needed, opt-in only (see
// LightningFlash) since autoplaying sound is not okay and browsers won't
// permit it without a user gesture anyway.
//
// A single fast-attack noise burst reads as a gunshot, not thunder — real
// thunder rolls: several overlapping rumbles with soft, gradual attacks
// (no sharp transient), low starting frequencies (no bright "crack"), long
// decays, and a felt sub-bass layer underneath for weight. That's what
// this builds: 2-3 staggered noise "rolls" plus one low sine rumble.
export function playThunder(audioContext, { intensity = 0.5 } = {}) {
  if (!audioContext) return

  const now = audioContext.currentTime
  const master = audioContext.createGain()
  master.gain.value = 0.9
  master.connect(audioContext.destination)

  const rollCount = 2 + Math.floor(Math.random() * 2)
  for (let i = 0; i < rollCount; i++) {
    const startTime = now + i * (0.25 + Math.random() * 0.35)
    const duration = 2.4 + intensity * 1.4 + Math.random() * 0.6
    createRumbleRoll(audioContext, master, startTime, duration, intensity)
  }

  createSubRumble(audioContext, master, now, 3 + intensity * 1.5)
}

function createRumbleRoll(ctx, destination, startTime, duration, intensity) {
  const bufferSize = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.Q.value = 0.5
  // Low starting point on purpose: no bright top end, so there is no
  // "crack" transient to read as a gunshot.
  const startFreq = 420 + Math.random() * 260
  filter.frequency.setValueAtTime(startFreq, startTime)
  filter.frequency.exponentialRampToValueAtTime(55 + Math.random() * 25, startTime + duration * 0.85)

  const gain = ctx.createGain()
  const peak = (0.22 + intensity * 0.2) / 2
  gain.gain.setValueAtTime(0.0001, startTime)
  // Slow attack: it rolls in rather than hitting.
  gain.gain.exponentialRampToValueAtTime(peak, startTime + 0.35 + Math.random() * 0.3)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(destination)

  noise.start(startTime)
  noise.stop(startTime + duration)
}

function createSubRumble(ctx, destination, startTime, duration) {
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(55, startTime)
  osc.frequency.exponentialRampToValueAtTime(34, startTime + duration)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, startTime)
  gain.gain.exponentialRampToValueAtTime(0.16, startTime + 0.4)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  osc.connect(gain)
  gain.connect(destination)

  osc.start(startTime)
  osc.stop(startTime + duration)
}
