import { Link } from 'react-router-dom'
import { Img, useTitle } from '../components/ui'
import { safaris } from '../data/content'
export default function Safaris() {
  useTitle('Safari experiences', 'Luxury, private, family, honeymoon, photography and mountain journeys.')
  return <main id="main" className="wrap page"><p className="eyebrow">Safari experiences</p><h1>Choose a style. We shape the rest.</h1>
    <p className="muted">Example itineraries only. Routes, lengths and prices are confirmed in a personal quotation.</p>
    <div className="cards">{safaris.map(s => <Link key={s.slug} to={`/safaris/${s.slug}`} className="card"><Img src={s.image} alt={s.alt} /><div><p className="eyebrow">{s.style}</p><h2>{s.title}</h2><p>{s.blurb}</p></div></Link>)}</div></main>
}
