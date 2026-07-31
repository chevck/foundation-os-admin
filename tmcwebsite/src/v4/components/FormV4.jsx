import { useState } from 'react'
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react'
import MagneticButton from '../../components/MagneticButton.jsx'
import RevealV4 from './RevealV4.jsx'
import './FormV4.css'

const REGIONS = [
  'UI',
  'Ojoo',
  'Apata',
  'Oluyole',
  'Challenge',
  'Molete',
  'Oke Ado',
  'Ologuneru',
  'Jericho',
  'Eleyele',
  'Other',
]

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  region: '',
  otherRegion: '',
}

function validate(values) {
  const errors = {}

  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!/^[0-9+()\-\s]{7,}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!values.region) errors.region = 'Please select your region.'

  if (values.region === 'Other' && !values.otherRegion.trim()) {
    errors.otherRegion = 'Please tell us your area.'
  }

  return errors
}

export default function FormV4() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    // No backend is wired up yet, this is where the RSVP payload should be
    // sent once a form endpoint or API exists.
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  function reset() {
    setValues(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section id="rsvp" className="v4-section v4-form">
      <div className="v4-container v4-form-inner">
        <div className="v4-form-head">
          <RevealV4 as="p" className="v4-eyebrow">
            Reserve your seat
          </RevealV4>
          <RevealV4 as="h2" delay={60}>
            Tell us who is coming.
          </RevealV4>
          <RevealV4 as="p" className="v4-form-lede" delay={120}>
            Free to attend. Seats are limited, and RSVP secures yours.
          </RevealV4>
        </div>

        <RevealV4 as="div" className="v4-frame v4-form-card" delay={160}>
          {submitted ? (
            <div className="v4-form-success">
              <CheckCircle weight="light" size={40} />
              <h3>You are in, {values.fullName.trim().split(' ')[0]}.</h3>
              <p>
                We will see you Friday, August 28th at 12:00 PM, University of
                Ibadan. Keep an eye on your email for updates before the day.
              </p>
              <button type="button" className="v4-btn v4-btn-ghost" onClick={reset}>
                RSVP another person
              </button>
            </div>
          ) : (
            <form className="v4-form-form" onSubmit={handleSubmit} noValidate>
              <div className="v4-form-field">
                <label htmlFor="v4-fullName">Full name</label>
                <input
                  id="v4-fullName"
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && <span className="v4-form-error">{errors.fullName}</span>}
              </div>

              <div className="v4-form-row">
                <div className="v4-form-field">
                  <label htmlFor="v4-email">Email address</label>
                  <input
                    id="v4-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="v4-form-error">{errors.email}</span>}
                </div>

                <div className="v4-form-field">
                  <label htmlFor="v4-phone">Phone number</label>
                  <input
                    id="v4-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <span className="v4-form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="v4-form-field">
                <label htmlFor="v4-region">Region you are coming from</label>
                <select
                  id="v4-region"
                  value={values.region}
                  onChange={(e) => update('region', e.target.value)}
                  aria-invalid={Boolean(errors.region)}
                >
                  <option value="" disabled>
                    Select a region
                  </option>
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && <span className="v4-form-error">{errors.region}</span>}
              </div>

              {values.region === 'Other' && (
                <div className="v4-form-field">
                  <label htmlFor="v4-otherRegion">Tell us your area</label>
                  <input
                    id="v4-otherRegion"
                    type="text"
                    value={values.otherRegion}
                    onChange={(e) => update('otherRegion', e.target.value)}
                    aria-invalid={Boolean(errors.otherRegion)}
                  />
                  {errors.otherRegion && <span className="v4-form-error">{errors.otherRegion}</span>}
                </div>
              )}

              <MagneticButton
                as="button"
                type="submit"
                className="v4-btn v4-btn-primary v4-btn-block"
                disabled={submitting}
              >
                {submitting ? 'Submitting' : 'RSVP'}
                <ArrowUpRight weight="regular" />
              </MagneticButton>
            </form>
          )}
        </RevealV4>
      </div>
    </section>
  )
}
