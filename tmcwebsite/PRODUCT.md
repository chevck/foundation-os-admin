# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: young men ages 16-24 deciding whether to attend and RSVP for a single in-person event. Secondary: parents, church leaders, and mentors who share, vet, or recommend the event to that age group. The site must read as credible to both audiences, not only speak youth-to-youth.

## Product Purpose

A one-time event landing/RSVP site for THE MOISTURE CONFERENCE, a single-day gathering in Ibadan, Nigeria, for young men to have honest conversations on faith, identity, relationships, and purpose. Success means qualified attendees RSVP and show up Friday, August 28, 2026.

## Positioning

Not a commercial product. Its point of difference is tone and craft: a youth-faith event site that deliberately avoids generic "conference landing page" and templated AI-generated visual and copy patterns, in favor of a distinct, considered identity. That identity is currently expressed as four competing full editions of the same event (see Operating Context) rather than one settled design.

## Operating Context

- The event: Friday, August 28, 2026, 12:00 PM, University of Ibadan. Free, open to men ages 16-24, seats limited.
- Central scripture and thesis: Luke 8:6 (KJV), the seed that withered "because it lacked moisture." The dry-ground/growth metaphor runs through every edition's copy and visuals.
- Six confirmed mentors/speakers, each paired with one discussion topic: Ifeoluwa Ogunsanya (Vision), Olatunde Fafolahan (Faith), David Ohi (Identity/Purpose), Enioluwa Odunjo (Relationships), Emmanuel Omiwale (Grit/Drive/Passion), Excellence Oyeniran (Values).
- Four parallel front-end editions exist right now, cross-linked to each other via footer. Confirmed: this is a deliberate comparison exercise, and one edition will eventually be chosen as the real site with the others retired. Which one, and on what timeline, is undecided.
- RSVP forms currently validate input and simulate success client-side only; no submission is persisted anywhere yet.
- A Firebase project (`themoistureconference`) and Firestore/Realtime Database are provisioned at the infrastructure level (`firebase.json`, `firestore.rules`, `database.rules.json`) but not yet called from any edition's code. Netlify is the configured deploy target (`netlify.toml`, SPA redirect already set up).

## Capabilities and Constraints

- Confirmed in scope for future work: wire the RSVP form(s) to a real backend (Firestore, given the existing provisioning) so submissions are actually captured.
- The current Firestore rules are open read/write for anyone with the database reference, explicitly marked as a placeholder, and set to expire 2026-08-29. They must be locked down before or as part of that backend work.
- Undecided: which of the four editions becomes canonical, and by what criteria or timeline.
- Existing stack: Vite + React 19 + react-router-dom SPA. Each edition's CSS is scoped under its own page-wrapper class (`.v2-page`, `.v3-page`, `.v4-page`, etc.) because all editions currently ship in one bundle with no route-based code-splitting; a class-scoping mistake lets one edition's styles bleed into another.
- No real speaker photography exists yet. The Dossier edition (`/v4`) currently uses realistic placeholder portrait photos (randomuser.me), explicitly flagged in code comments as placeholders to replace before launch.
- Social links (Instagram, X, WhatsApp) are placeholder `#` hrefs pending real handles.

## Brand Commitments

- Name: "THE MOISTURE CONFERENCE" (short form "TMC"). Consistent across all editions.
- Scripture anchor: Luke 8:6 (KJV), quoted verbatim, present in every edition.
- Existing mark: a moss-green rounded-square favicon with a gold water-droplet glyph (`public/favicon.svg`), the one brand asset that predates and sits outside the four page editions.
- Each of the four editions already has its own shipped, internally consistent visual language (see Evidence on Hand). They are not blank starting points for a fifth aesthetic; new visual work extends one of the four unless the user explicitly asks for a new direction.

## Evidence on Hand

- Real and confirmed: event date, time, venue, age range, the six named mentors with topics, price (free), and the scripture reference.
- Not real, must not be fabricated as if real: speaker photography, social handles, testimonials, past-event proof. Current speaker photos in `/v4` are clearly-flagged stand-ins.
- Four shipped visual editions, each treated as incumbent authority for its own route:
  - Classic, `/`, `src/App.jsx` + `src/components/*`: warm editorial, Fraunces/Manrope, moss/gold/cream palette.
  - Storybook, `/v2`, `src/v2/`: whimsical pastel, illustrated CSS mascots, Bricolage Grotesque/Plus Jakarta Sans, hard "sticker" drop-shadows.
  - Night Garden, `/v3`, `src/v3/`: dark cinematic glass, amber/emerald glow, Space Grotesk/Sora, Framer Motion throughout.
  - Dossier, `/v4`, `src/v4/`: editorial "conference program," cool paper/ink with a cobalt accent, Cormorant Garamond/Archivo, speaker-portrait-led.

## Product Principles

1. Speak to both the 16-24 attendee and the adult who vouches for them; never youth-only slang, never corporate-adult-only tone.
2. The dry-ground/moisture/growth metaphor (Luke 8:6) is the throughline. New copy or visuals extend it rather than introducing an unrelated device.
3. Real event facts (date, venue, speakers, topics, scripture) are fixed and must never be altered or fictionalized when editions are extended or rebuilt.
4. Each of the four editions is a complete, internally consistent visual world; don't blend their languages within one edition.
5. Nothing is presented as real evidence (photos, testimonials, social proof) unless it actually is. Placeholders stay clearly swappable and are called out, not disguised.

## Accessibility & Inclusion

No accessibility standard has been explicitly required yet. Undecided; do not assume a target such as WCAG AA without asking.
