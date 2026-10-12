import { Link } from 'react-router-dom'
import { useTitle } from '../components/ui'
export default function About() {
  useTitle('Our story', 'Local knowledge and personalised Tanzania journeys.')
  return <main id="main" className="wrap page narrow"><p className="eyebrow">Our story</p><h1>Rooted in Tanzania.</h1>
    <p className="lede dark">Placeholder: the company's real story goes here. We design journeys around the people who take them, using local knowledge of the parks, seasons and people who make Tanzania remarkable.</p>
    <h2>Responsible travel</h2><p>Respectful wildlife viewing, thoughtful stays and clear communication are the principles we plan around. Specific practices, partners and certifications will be listed here only once confirmed.</p>
    <h2>The team</h2><p className="muted">Placeholder: team profiles to be added with real names, roles and photographs.</p>
    <Link className="btn gold" to="/contact">Plan Your Safari</Link></main>
}
