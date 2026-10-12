import { Link } from 'react-router-dom'
import { Img, useTitle } from '../components/ui'
import { destinations } from '../data/content'
export default function Destinations() {
  useTitle('Destinations', 'Serengeti, Ngorongoro, Tarangire and Kilimanjaro.')
  return <main id="main" className="wrap page"><p className="eyebrow">Destinations</p><h1>Four ways into Tanzania.</h1>
    <div className="cards">{destinations.map(d => <Link key={d.slug} to={`/destinations/${d.slug}`} className="card"><Img src={d.image} alt={d.alt} /><div><p className="eyebrow">{d.kicker}</p><h2>{d.name}</h2><p>{d.blurb}</p></div></Link>)}</div></main>
}
