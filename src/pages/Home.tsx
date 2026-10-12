import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img, Reveal, useTitle } from '../components/ui'
import { destinations, wildlife, safaris } from '../data/content'

function Explorer() {
  const [i, setI] = useState(0); const d = destinations[i]
  return (
    <section className="explorer wrap" aria-labelledby="ex-h">
      <Reveal><p className="eyebrow">Journey through Tanzania</p><h2 id="ex-h">Choose a place. See where it leads.</h2></Reveal>
      <div className="ex-grid">
        <div className="map" role="group" aria-label="Map of northern Tanzania. Select a destination">
          <svg viewBox="0 0 100 60" aria-hidden="true"><path d="M8 10 L40 6 L80 12 L92 34 L70 54 L30 52 L12 34 Z" /></svg>
          {destinations.map((x, k) => (
            <button key={x.slug} className={`pin ${k === i ? 'on' : ''}`} style={{ left: `${x.coords.x}%`, top: `${x.coords.y}%` }} aria-pressed={k === i} onClick={() => setI(k)}><span>{x.name.replace('The ', '')}</span></button>
          ))}
        </div>
        <article className="ex-panel" key={d.slug}>
          <Img src={d.image} alt={d.alt} />
          <div><p className="eyebrow">{d.kicker}</p><h3>{d.name}</h3><p>{d.blurb}</p>
            <ul>{d.highlights.slice(0, 3).map(h => <li key={h}>{h}</li>)}</ul>
            <Link to={`/destinations/${d.slug}`} className="btn gold">Explore {d.name.replace('The ', '')}</Link></div>
        </article>
      </div>
    </section>
  )
}

export default function Home() {
  useTitle('Tanzania safaris, tailor-made', 'Journeys through the Serengeti, Ngorongoro, Tarangire and Kilimanjaro, shaped around you.')
  const steps = ['Tell us what inspires you.', 'We design your journey.', 'Refine your itinerary together.', 'Experience Tanzania.', 'Take home a different perspective.']
  const trust = [['Local Tanzanian knowledge', 'Planning shaped by people who know the ground.'], ['Personalised itineraries', 'Built around you, not picked from a catalogue.'], ['Responsible wildlife tourism', 'Respectful viewing and low-impact choices, explained in plain terms.'], ['Carefully selected accommodation', 'Stays matched to your style and budget.'], ['Experienced guides', 'Guides matched to your interests.'], ['Transparent planning', 'Clear communication at every step.']]
  return (<main id="main">
    <section className="hero">
      <Img eager className="hero-img" src={destinations[0].image} alt={destinations[0].alt} />
      <div className="hero-ov" />
      <div className="hero-copy wrap">
        <p className="eyebrow rise r1">EXTRAORDINARY JOURNEYS · TANZANIA, EAST AFRICA</p>
        <h1 className="rise r2">Some places change the way you see the world.</h1>
        <p className="lede rise r3">Discover the wild heart of Tanzania through journeys shaped by nature, guided by local knowledge, and remembered for a lifetime.</p>
        <div className="cta-row rise r4"><Link className="btn gold" to="/safaris">Explore Our Safaris</Link><Link className="btn ghost" to="/contact">Create Your Journey</Link></div>
      </div>
      <a className="scroll" href="#intro" aria-label="Scroll to introduction"><span /></a>
    </section>

    <section id="intro" className="intro wrap">
      <Reveal className="intro-text"><p className="eyebrow">Editorial · 3°S, 35°E</p><h2>Not just a destination. A world waiting to be felt.</h2>
        <p>Tanzania holds open plains, a volcanic crater, elephant country and Africa's highest mountain within one country. Each journey with us is tailored to the traveller rather than chosen from a generic package list.</p></Reveal>
      <Reveal className="intro-img"><Img src={destinations[1].image} alt={destinations[1].alt} /></Reveal>
    </section>

    <section className="signature">
      {destinations.map((d, k) => (
        <Link key={d.slug} to={`/destinations/${d.slug}`} className={`sig sig${k}`}>
          <Img src={d.image} alt={d.alt} /><div className="sig-t"><p className="eyebrow">{d.type === 'trek' ? 'Mountain trek' : 'Safari'}</p><h3>{d.name}</h3><p>{d.blurb}</p><span className="more">Explore →</span></div>
        </Link>))}
    </section>

    <Explorer />

    <section className="trust wrap"><Reveal><p className="eyebrow">Why travel with us</p><h2>Planned with care, from first message to last farewell.</h2></Reveal>
      <div className="trust-grid">{trust.map(([t, d]) => <Reveal key={t}><h3>{t}</h3><p>{d}</p></Reveal>)}</div></section>

    <section className="journey wrap"><Reveal><p className="eyebrow">The safari journey</p><h2>How it works</h2></Reveal>
      <ol className="steps">{steps.map((s, k) => <li key={s}><span>{String(k + 1).padStart(2, '0')}</span>{s}</li>)}</ol></section>

    <section className="wild"><div className="wrap"><p className="eyebrow">Wildlife</p><h2>The ones you came for.</h2></div>
      <div className="strip" tabIndex={0} aria-label="Wildlife gallery, scrollable">{wildlife.map(w => <figure key={w.n}><Img src={w.img} alt={w.alt} /><figcaption>{w.n}</figcaption></figure>)}</div></section>

    <section className="wrap stories"><p className="eyebrow">Traveller stories</p><h2>Reviews will appear here.</h2>
      <p className="muted">Placeholder: no verified reviews have been supplied yet. This section is intentionally empty until genuine guest feedback is added.</p></section>

    <section className="final"><Img src={safaris[0].image} alt={safaris[0].alt} /><div className="final-ov" />
      <div className="wrap final-c"><h2>Your story belongs out there.</h2><p>Tell us what you've been dreaming of. Let's create a Tanzanian safari around it.</p><Link className="btn gold" to="/contact">Start Planning Your Safari</Link></div></section>
  </main>)
}
