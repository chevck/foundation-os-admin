import { useState } from "react";
import { IconArrowUpRight, IconCheck } from "../../components/icons.jsx";
import MagneticButton from "../../components/MagneticButton.jsx";
import Mascot from "./Mascot.jsx";
import RevealV2 from "./RevealV2.jsx";
import "./RSVPFormV2.css";

const REGIONS = [
  "UI",
  "Ojoo",
  "Apata",
  "Oluyole",
  "Challenge",
  "Molete",
  "Oke Ado",
  "Ologuneru",
  "Jericho",
  "Eleyele",
  "Other",
];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  region: "",
  otherRegion: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[0-9+()\-\s]{7,}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.region) errors.region = "Please select your region.";

  if (values.region === "Other" && !values.otherRegion.trim()) {
    errors.otherRegion = "Please tell us your area.";
  }

  return errors;
}

export default function RSVPFormV2() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    console.log({ values });

    // No backend is wired up yet — this is where the RSVP payload should be
    // sent once a form endpoint / API exists.
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  function reset() {
    setValues(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <section id='rsvp' className='v2-section v2-rsvp'>
      <div className='v2-container v2-rsvp-inner'>
        <RevealV2 as='div' className='v2-section-head'>
          <p className='v2-eyebrow v2-rsvp-eyebrow'>Turn The Page</p>
          <h2>Write yourself into the story.</h2>
          <p>
            Free to attend. Tell us who you are and where you&rsquo;re coming
            from.
          </p>
        </RevealV2>

        <RevealV2 as='div' className='v2-bezel v2-bezel-butter v2-rsvp-card' delay={120}>
          <div className='v2-bezel-core v2-rsvp-card-core'>
          {submitted ? (
            <div className='v2-rsvp-success v2-rise-in'>
              <Mascot
                variant='drip'
                size={72}
                className='v2-rsvp-success-mascot'
              />
              <div className='v2-rsvp-success-icon'>
                <IconCheck />
              </div>
              <h3>You&rsquo;re in, {values.fullName.trim().split(" ")[0]}.</h3>
              <p>
                We&rsquo;ll see you Friday, August 28th at 12:00 PM, University
                of Ibadan. Keep an eye on your email for updates before the day.
              </p>
              <MagneticButton
                as='button'
                type='button'
                className='v2-btn v2-btn-mint v2-btn-with-icon'
                onClick={reset}
              >
                RSVP Another Person
                <span className='v2-btn-icon'>
                  <IconArrowUpRight />
                </span>
              </MagneticButton>
            </div>
          ) : (
            <form className='v2-rsvp-form' onSubmit={handleSubmit} noValidate>
              <div className='v2-rsvp-field'>
                <label htmlFor='v2-fullName'>Full name</label>
                <input
                  id='v2-fullName'
                  type='text'
                  autoComplete='name'
                  value={values.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errors.fullName && (
                  <span className='v2-rsvp-error'>{errors.fullName}</span>
                )}
              </div>

              <div className='v2-rsvp-row'>
                <div className='v2-rsvp-field'>
                  <label htmlFor='v2-email'>Email address</label>
                  <input
                    id='v2-email'
                    type='email'
                    autoComplete='email'
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <span className='v2-rsvp-error'>{errors.email}</span>
                  )}
                </div>

                <div className='v2-rsvp-field'>
                  <label htmlFor='v2-phone'>Phone number</label>
                  <input
                    id='v2-phone'
                    type='tel'
                    autoComplete='tel'
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <span className='v2-rsvp-error'>{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className='v2-rsvp-field'>
                <label htmlFor='v2-region'>
                  Region you&rsquo;re coming from
                </label>
                <select
                  id='v2-region'
                  value={values.region}
                  onChange={(e) => update("region", e.target.value)}
                  aria-invalid={Boolean(errors.region)}
                >
                  <option value='' disabled>
                    Select a region
                  </option>
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className='v2-rsvp-error'>{errors.region}</span>
                )}
              </div>

              {values.region === "Other" && (
                <div className='v2-rsvp-field'>
                  <label htmlFor='v2-otherRegion'>Tell us your area</label>
                  <input
                    id='v2-otherRegion'
                    type='text'
                    value={values.otherRegion}
                    onChange={(e) => update("otherRegion", e.target.value)}
                    aria-invalid={Boolean(errors.otherRegion)}
                  />
                  {errors.otherRegion && (
                    <span className='v2-rsvp-error'>{errors.otherRegion}</span>
                  )}
                </div>
              )}

              <MagneticButton
                as='button'
                type='submit'
                className='v2-btn v2-btn-coral v2-btn-block v2-btn-with-icon'
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "RSVP Now"}
                <span className='v2-btn-icon'>
                  <IconArrowUpRight />
                </span>
              </MagneticButton>
            </form>
          )}
          </div>
        </RevealV2>
      </div>
    </section>
  );
}
