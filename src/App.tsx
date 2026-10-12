import { Suspense, lazy } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { Header, Footer, useTitle } from './components/ui'
import Home from './pages/Home'
const Destinations = lazy(() => import('./pages/Destinations'))
const Destination = lazy(() => import('./pages/Destination'))
const Safaris = lazy(() => import('./pages/Safaris'))
const SafariDetail = lazy(() => import('./pages/SafariDetail'))
const About = lazy(() => import('./pages/About'))
const Journal = lazy(() => import('./pages/Journal'))
const Post = lazy(() => import('./pages/Post'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))

function NotFound() { useTitle('Page not found'); return <main className="wrap page"><h1>This path leads nowhere.</h1><p><Link className="btn gold" to="/">Return home</Link></p></main> }

export default function App() {
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <Header />
    <Suspense fallback={<div className="page wrap" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<Destination />} />
        <Route path="/safaris" element={<Safaris />} />
        <Route path="/safaris/:slug" element={<SafariDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal kind="Privacy policy" />} />
        <Route path="/terms" element={<Legal kind="Terms & conditions" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </>)
}
