import { Link, useParams } from 'react-router-dom'
import { Img, useTitle } from '../components/ui'
import { destinations } from '../data/content'
export default function Destination() {
  const { slug } = useParams(); const d = destinations.find(x => x.slug === slug)
  useTitle(d?.name ?? 'Not found', d?.blurb)
  if (!d) return <main id="main" className="wrap page"><h1>Destination not found</h1><Link className="btn gold" to="/destinations">All destinations</Link></main>
  return <main id="main"><section className="dhero"><Img eager src={d.image} alt={d.alt} /><div className="hero-ov" /><div className="wrap hero-copy"><p className="eyebrow">{d.kicker}</p><h1>{d.name}</h1></div></section>
    <div className="wrap page two">
      <div><p className="lede dark">{d.story}</p><h2>Highlights</h2><ul className="list">{d.highlights.map(h => <li key={h}>{h}</li>)}</ul></div>
      <aside className="fact"><h3>Best time to visit</h3><p>{d.best}</p><h3>Suggested duration</h3><p>{d.duration}</p>
        <Link className="btn gold" to={`/contact?interest=${d.slug}`}>Inquire about {d.name.replace('The ', '')}</Link></aside>
    </div>
    <section className="wrap page"><h2>Related destinations</h2><div className="cards">{d.related.map(r => destinations.find(x => x.slug === r)!).map(x => <Link key={x.slug} to={`/destinations/${x.slug}`} className="card"><Img src={x.image} alt={x.alt} /><div><h3>{x.name}</h3><p>{x.blurb}</p></div></Link>)}</div></section></main>
}
