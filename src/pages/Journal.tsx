import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTitle } from '../components/ui'
import { posts } from '../data/content'
export default function Journal() {
  useTitle('Journal', 'Notes on the migration, seasons, photography and Kilimanjaro.')
  const cats = ['All', ...Array.from(new Set(posts.map(p => p.cat)))]; const [c, setC] = useState('All')
  return <main id="main" className="wrap page"><p className="eyebrow">Journal</p><h1>Field notes.</h1>
    <div className="chips" role="group" aria-label="Filter by category">{cats.map(x => <button key={x} aria-pressed={c === x} className={c === x ? 'on' : ''} onClick={() => setC(x)}>{x}</button>)}</div>
    <div className="cards">{posts.filter(p => c === 'All' || p.cat === c).map(p => <Link key={p.slug} to={`/journal/${p.slug}`} className="card textcard"><div><p className="eyebrow">{p.cat} · {p.mins} min read</p><h2>{p.title}</h2><p>{p.excerpt}</p></div></Link>)}</div></main>
}
