import { Link, useParams } from 'react-router-dom'
import { useTitle } from '../components/ui'
import { posts } from '../data/content'
export default function Post() {
  const { slug } = useParams(); const p = posts.find(x => x.slug === slug)
  useTitle(p?.title ?? 'Not found', p?.excerpt)
  if (!p) return <main id="main" className="wrap page"><h1>Article not found</h1><Link className="btn gold" to="/journal">Journal</Link></main>
  return <main id="main" className="wrap page narrow"><p className="eyebrow">{p.cat} · {p.mins} min read</p><h1>{p.title}</h1>{p.body.map(t => <p key={t} className="lede dark">{t}</p>)}<Link className="btn gold" to="/contact">Plan Your Safari</Link></main>
}
