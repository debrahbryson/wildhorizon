import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, nav } from '../data/config'

export function useTitle(title: string, desc?: string) {
  useEffect(() => {
    document.title = `${title} · ${brand.name}`
    if (desc) document.querySelector('meta[name=description]')?.setAttribute('content', desc)
    window.scrollTo(0, 0)
  }, [title, desc])
}

export function Img({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [bad, setBad] = useState(false)
  return bad ? <div className={`img-fallback ${className ?? ''}`} role="img" aria-label={alt} /> :
    <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setBad(true)} />
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (!('IntersectionObserver' in window)) { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])
  return (
    <header className={`hdr ${solid || open || pathname !== '/' ? 'solid' : ''}`}>
      <Link to="/" className="logo" aria-label={`${brand.name} home`}>{brand.short}</Link>
      <nav aria-label="Primary" className={`nav ${open ? 'open' : ''}`} id="nav">
        {nav.map(n => <NavLink key={n.to} to={n.to} className={({ isActive }) => isActive ? 'active' : ''}>{n.label}</NavLink>)}
        <Link to="/contact" className="btn gold nav-cta">Plan Your Safari</Link>
      </nav>
      <button className="burger" aria-expanded={open} aria-controls="nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}><span /><span /></button>
    </header>
  )
}

export function Footer() {
  const socials = Object.entries(brand.social).filter(([, v]) => v)
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div><div className="logo">{brand.short}</div><p>Tailor-made journeys through Tanzania, guided by local knowledge.</p></div>
        <div><h4>Destinations</h4>{['serengeti', 'ngorongoro', 'tarangire', 'kilimanjaro'].map(s => <Link key={s} to={`/destinations/${s}`}>{s[0].toUpperCase() + s.slice(1)}</Link>)}</div>
        <div><h4>Experiences</h4><Link to="/safaris">Luxury &amp; private</Link><Link to="/safaris">Family &amp; honeymoon</Link><Link to="/safaris">Photography</Link></div>
        <div><h4>Contact</h4>
          {brand.email ? <a href={`mailto:${brand.email}`}>{brand.email}</a> : <span className="muted">Email: to be added</span>}
          {brand.phone ? <a href={`tel:${brand.phone}`}>{brand.phone}</a> : <span className="muted">Phone: to be added</span>}
          {socials.length ? socials.map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener noreferrer">{k}</a>) : <span className="muted">Social links: to be added</span>}
        </div>
      </div>
      <div className="wrap ftr-base"><span>© {new Date().getFullYear()} {brand.name}</span><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms &amp; conditions</Link></div>
    </footer>
  )
}
