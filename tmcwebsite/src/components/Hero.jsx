import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconDrop,
  IconPin,
} from "./icons.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section id='top' className='hero'>
      <div className='hero-blob hero-blob-a' aria-hidden='true' />
      <div className='hero-blob hero-blob-b' aria-hidden='true' />

      <div className='container hero-inner'>
        <p
          className='eyebrow hero-eyebrow rise-in'
          style={{ animationDelay: "0ms" }}
        >
          <IconDrop className='hero-eyebrow-icon' />
          Luke 8:6 &middot; A Conference For Young Men
        </p>

        <h1 className='hero-title rise-in' style={{ animationDelay: "90ms" }}>
          You Were Not
          <br />
          Made To <span>Wither.</span>
        </h1>

        <p className='hero-sub rise-in' style={{ animationDelay: "180ms" }}>
          THE MOISTURE CONFERENCE brings men ages 16&ndash;24 into honest,
          unfiltered conversation about the dry ground we all stand on &mdash;
          family, feelings, desires, career, community, faith &mdash; before it
          costs us the life we were meant to grow into.
        </p>

        <div
          className='hero-actions rise-in'
          style={{ animationDelay: "270ms" }}
        >
          <a href='#rsvp' className='btn btn-primary'>
            RSVP &mdash; It&rsquo;s Free
            <IconArrowRight />
          </a>
          <a href='#story' className='btn btn-outline'>
            Read The Vision
          </a>
        </div>

        <div className='hero-info rise-in' style={{ animationDelay: "360ms" }}>
          <div className='hero-info-item'>
            <IconCalendar />
            <span>Friday, August 28th, 2026</span>
          </div>
          <div className='hero-info-divider' />
          <div className='hero-info-item'>
            <IconClock />
            <span>12:00 PM</span>
          </div>
          <div className='hero-info-divider' />
          <div className='hero-info-item'>
            <IconPin />
            <span>University of Ibadan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
