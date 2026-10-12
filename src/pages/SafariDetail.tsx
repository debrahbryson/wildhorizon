import { Link, useParams } from 'react-router-dom'
import { Img, useTitle } from '../components/ui'
import { safaris } from '../data/content'
export default function SafariDetail() {
  const { slug } = useParams(); const s = safaris.find(x => x.slug === slug)
  useTitle(s?.title ?? 'Not found', s?.blurb)
  if (!s) return <main id="main" className="wrap page"><h1>Safari not found</h1><Link className="btn gold" to="/safaris">All safaris</Link></main>
  return <main id="main"><section className="dhero"><Img eager src={s.image} alt={s.alt} /><div className="hero-ov" /><div className="wrap hero-copy"><p className="eyebrow">{s.style}</p><h1>{s.title}</h1></div></section>
    <div className="wrap page two"><div><p className="lede dark">{s.blurb}</p><h2>Day by day</h2><ol className="days">{s.days.map(d => <li key={d.t}><strong>{d.t}</strong><p>{d.d}</p></li>)}</ol>
      <h2>Accommodation</h2><p className="muted">Placeholder: accommodation is selected with you once your style and budget are known.</p>
      <div className="inex"><div><h3>Included</h3><ul className="list">{s.included.map(x => <li key={x}>{x}</li>)}</ul></div><div><h3>Not included</h3><ul className="list">{s.excluded.map(x => <li key={x}>{x}</li>)}</ul></div></div></div>
      <aside className="fact"><h3>Duration</h3><p>{s.duration}</p><h3>Route</h3><p>{s.route.join(' → ')}</p><h3>Price</h3><p>Price on request</p><Link className="btn gold" to={`/contact?interest=${s.slug}`}>Request this journey</Link></aside></div></main>
}
