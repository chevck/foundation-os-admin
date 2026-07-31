import { useState } from 'react'
import { IconArrowRight, IconCheck } from './icons.jsx'
import Reveal from './Reveal.jsx'
import SectionDivider from './SectionDivider.jsx'
import { submitRSVP } from '../lib/rsvp.js'
import './RSVPForm.css'

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

export default function RSVPForm() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')

    try {
      await submitRSVP(values)
      setSubmitted(true)
    } catch (error) {
      console.error('RSVP submission failed:', error)
      setSubmitError("Something went wrong sending your RSVP. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setValues(EMPTY_FORM)
    setErrors({})
    setSubmitError('')
    setSubmitted(false)
  }

  return (
    <section id="rsvp" className="rsvp">
      <SectionDivider fill="#efe4cd" />

      <div className="container rsvp-inner">
        <Reveal as="div" className="section-head rsvp-head">
          <p className="eyebrow rsvp-eyebrow">Secure Your Seat</p>
          <h2>You in?</h2>
          <p>
            Free to attend. Tell us who you are and where you&rsquo;re coming from
            &mdash; we&rsquo;ll take it from there.
          </p>
        </Reveal>

        <Reveal as="div" className="rsvp-card" delay={120}>
          {submitted ? (
            <div className="rsvp-success rise-in">
              <div className="rsvp-success-icon">
                <IconCheck />
              </div>
              <h3>You&rsquo;re in, {values.fullName.trim().split(' ')[0]}.</h3>
              <p>
                We&rsquo;ll see you Friday, August 28th at 12:00 PM, University of
                Ibadan. Keep an eye on your email for updates before the day.
              </p>
              <button type="button" className="btn btn-outline" onClick={reset}>
                RSVP Another Person
              </button>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
              <div className="rsvp-field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && <span className="rsvp-error">{errors.fullName}</span>}
              </div>

              <div className="rsvp-row">
                <div className="rsvp-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="rsvp-error">{errors.email}</span>}
                </div>

                <div className="rsvp-field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <span className="rsvp-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="rsvp-field">
                <label htmlFor="region">Region you&rsquo;re coming from</label>
                <select
                  id="region"
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
                {errors.region && <span className="rsvp-error">{errors.region}</span>}
              </div>

              {values.region === 'Other' && (
                <div className="rsvp-field">
                  <label htmlFor="otherRegion">Tell us your area</label>
                  <input
                    id="otherRegion"
                    type="text"
                    value={values.otherRegion}
                    onChange={(e) => update('otherRegion', e.target.value)}
                    aria-invalid={Boolean(errors.otherRegion)}
                  />
                  {errors.otherRegion && (
                    <span className="rsvp-error">{errors.otherRegion}</span>
                  )}
                </div>
              )}

              {submitError && <span className="rsvp-error rsvp-submit-error">{submitError}</span>}

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Submitting…' : 'RSVP Now'}
                {!submitting && <IconArrowRight />}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
