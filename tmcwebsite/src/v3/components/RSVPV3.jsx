import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowUpRight, IconCheck } from "../../components/icons.jsx";
import MagneticButton from "../../components/MagneticButton.jsx";
import RevealV3 from "./RevealV3.jsx";
import "./RSVPV3.css";
import { submitRSVP } from "../../lib/rsvp.js";

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

export default function RSVPV3() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await submitRSVP(values);
    setSubmitting(true);

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
    <section id='rsvp' className='v3-section v3-rsvp'>
      <div className='v3-container v3-rsvp-inner'>
        <RevealV3 as='div' className='v3-section-head'>
          <p className='v3-eyebrow'>
            <span className='v3-eyebrow-dot' />
            Secure Your Seat
          </p>
          <h2>You in?</h2>
          <p>
            Free to attend. Tell us who you are and where you&rsquo;re coming
            from. We&rsquo;ll take it from there.
          </p>
        </RevealV3>

        <RevealV3 as='div' className='v3-bezel v3-rsvp-card' delay={120}>
          <div className='v3-bezel-core v3-rsvp-card-core'>
            <AnimatePresence mode='wait'>
              {submitted ? (
                <motion.div
                  key='success'
                  className='v3-rsvp-success'
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className='v3-rsvp-success-icon'>
                    <IconCheck />
                  </div>
                  <h3>
                    You&rsquo;re in, {values.fullName.trim().split(" ")[0]}.
                  </h3>
                  <p>
                    We&rsquo;ll see you Friday, August 28th at 12:00 PM,
                    University of Ibadan. Keep an eye on your email for updates
                    before the day.
                  </p>
                  <button
                    type='button'
                    className='v3-btn v3-btn-ghost'
                    onClick={reset}
                  >
                    RSVP Another Person
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key='form'
                  className='v3-rsvp-form'
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className='v3-rsvp-field'>
                    <label htmlFor='v3-fullName'>Full name</label>
                    <input
                      id='v3-fullName'
                      type='text'
                      autoComplete='name'
                      value={values.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && (
                      <span className='v3-rsvp-error'>{errors.fullName}</span>
                    )}
                  </div>

                  <div className='v3-rsvp-row'>
                    <div className='v3-rsvp-field'>
                      <label htmlFor='v3-email'>Email address</label>
                      <input
                        id='v3-email'
                        type='email'
                        autoComplete='email'
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && (
                        <span className='v3-rsvp-error'>{errors.email}</span>
                      )}
                    </div>

                    <div className='v3-rsvp-field'>
                      <label htmlFor='v3-phone'>Phone number</label>
                      <input
                        id='v3-phone'
                        type='tel'
                        autoComplete='tel'
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && (
                        <span className='v3-rsvp-error'>{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className='v3-rsvp-field'>
                    <label htmlFor='v3-region'>
                      Region you&rsquo;re coming from
                    </label>
                    <select
                      id='v3-region'
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
                      <span className='v3-rsvp-error'>{errors.region}</span>
                    )}
                  </div>

                  {values.region === "Other" && (
                    <div className='v3-rsvp-field'>
                      <label htmlFor='v3-otherRegion'>Tell us your area</label>
                      <input
                        id='v3-otherRegion'
                        type='text'
                        value={values.otherRegion}
                        onChange={(e) => update("otherRegion", e.target.value)}
                        aria-invalid={Boolean(errors.otherRegion)}
                      />
                      {errors.otherRegion && (
                        <span className='v3-rsvp-error'>
                          {errors.otherRegion}
                        </span>
                      )}
                    </div>
                  )}

                  <MagneticButton
                    as='button'
                    type='submit'
                    className='v3-btn v3-btn-primary v3-rsvp-submit'
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "RSVP Now"}
                    <span className='v3-btn-icon'>
                      <IconArrowUpRight />
                    </span>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </RevealV3>
      </div>
    </section>
  );
}
