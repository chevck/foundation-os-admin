import RevealV4 from './RevealV4.jsx'
import './ScriptureV4.css'

export default function ScriptureV4() {
  return (
    <section className="v4-scripture">
      <div className="v4-container v4-scripture-inner">
        <RevealV4 as="blockquote" className="v4-scripture-quote">
          <p>
            And some fell upon a rock, and as soon as it was sprung up, it
            withered away, because it lacked moisture.
          </p>
          <cite>Luke 8:6, King James Version</cite>
        </RevealV4>
      </div>
    </section>
  )
}
