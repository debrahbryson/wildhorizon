import { useTitle } from '../components/ui'
export default function Legal({ kind }: { kind: string }) {
  useTitle(kind)
  return <main id="main" className="wrap page narrow"><h1>{kind}</h1><p className="muted">Placeholder: replace with legally reviewed text for your business before launch.</p></main>
}
