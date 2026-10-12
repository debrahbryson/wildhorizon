import { useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { brand } from '../data/config'
import { destinations, safaris } from '../data/content'
import { useTitle } from '../components/ui'

const interests = ['Serengeti', 'Ngorongoro', 'Tarangire', 'Kilimanjaro', 'Photography', 'Family', 'Honeymoon']
type Errs = Record<string, string>
export default function Contact() {
  useTitle('Plan your safari', 'Tell us what you are dreaming of.')
  const [sp] = useSearchParams(); const pre = sp.get('interest')
  const preName = destinations.find(d => d.slug === pre)?.name.replace('The ', '') ?? safaris.find(s => s.slug === pre)?.style
  const [errs, setErrs] = useState<Errs>({}); const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle'); const [msg, setMsg] = useState('')
  const busy = useRef(false)
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy.current) return
    const f = new FormData(e.currentTarget); const v = (k: string) => String(f.get(k) ?? '').trim(); const er: Errs = {}
    if (v('name').length < 2) er.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) er.email = 'Please enter a valid email address.'
    if (!v('country')) er.country = 'Please enter your country of residence.'
    if (!v('dates')) er.dates = 'Tell us your dates or that you are flexible.'
    const n = Number(v('travelers')); if (!(n >= 1 && n <= 50)) er.travelers = 'Enter a number from 1 to 50.'
    if (!f.get('consent')) er.consent = 'Please agree so we can reply to you.'
    setErrs(er); if (Object.keys(er).length) return
    const payload = { name: v('name'), email: v('email'), country: v('country'), dates: v('dates'), travelers: n, interests: f.getAll('interests'), budget: v('budget'), notes: v('notes'), consent: true }
    if (!brand.inquiryEndpoint) { setState('fail'); setMsg('Inquiries are not connected yet: no VITE_INQUIRY_ENDPOINT is configured, so nothing was sent. Please try again later.'); if (import.meta.env.DEV) console.info('Dev mode: inquiry not delivered', payload); return }
    busy.current = true; setState('sending')
    try { const r = await fetch(brand.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error(String(r.status)); setState('ok') }
    catch { setState('fail'); setMsg('We could not send your inquiry. Please try again.') } finally { busy.current = false }
  }
  if (state === 'ok') return <main id="main" className="wrap page narrow"><h1>Thank you.</h1><p className="lede dark" role="status">Your inquiry was received. We will reply by email.</p></main>
  const F = (id: string, label: string, props: Record<string, unknown> = {}) => (<div className="field"><label htmlFor={id}>{label}</label><input id={id} name={id} aria-invalid={!!errs[id]} aria-describedby={errs[id] ? id + '-e' : undefined} {...props} />{errs[id] && <span id={id + '-e'} className="err">{errs[id]}</span>}</div>)
  return <main id="main" className="wrap page narrow"><p className="eyebrow">Plan your safari</p><h1>Tell us what you're dreaming of.</h1>
    <form onSubmit={submit} noValidate className="form">
      {F('name', 'Name', { autoComplete: 'name' })}{F('email', 'Email', { type: 'email', autoComplete: 'email' })}{F('country', 'Country of residence', { autoComplete: 'country-name' })}
      {F('dates', 'Preferred travel dates or flexibility')}{F('travelers', 'Number of travelers', { type: 'number', min: 1, max: 50, defaultValue: 2 })}
      <fieldset><legend>Safari interests</legend>{interests.map(i => <label key={i} className="check"><input type="checkbox" name="interests" value={i} defaultChecked={i === preName} />{i}</label>)}</fieldset>
      <div className="field"><label htmlFor="budget">Approximate budget (optional)</label><input id="budget" name="budget" /></div>
      <div className="field"><label htmlFor="notes">Additional preferences</label><textarea id="notes" name="notes" rows={4} /></div>
      <label className="check"><input type="checkbox" name="consent" />I agree to be contacted about my inquiry.</label>{errs.consent && <span className="err">{errs.consent}</span>}
      {state === 'fail' && <p className="err" role="alert">{msg}</p>}
      <button className="btn gold" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send inquiry'}</button>
    </form></main>
}
