import { lazy, Suspense } from 'react'
import { Navigation } from './components/navigation/Navigation'
import { Hero } from './sections/Hero/Hero'
import { ProductStory } from './sections/ProductStory/ProductStory'
import { Convergence } from './sections/Convergence/Convergence'
import { BusinessOffering } from './sections/BusinessOffering/BusinessOffering'
import { OfferingPage } from './sections/OfferingPage/OfferingPage'
import { apps } from './data/apps'
import { About } from './sections/About/About'
import { Footer } from './sections/Footer/Footer'
import { usePageMotion } from './animations/usePageMotion'

import { useProductNavigation } from './hooks/useProductNavigation'

const LucidaPrivacy = lazy(() => import('./sections/LucidaPrivacy/LucidaPrivacy').then(({ LucidaPrivacy }) => ({ default: LucidaPrivacy })))

function HomePage() {
  usePageMotion()
  useProductNavigation()
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <ProductStory />
        <BusinessOffering />
        <Convergence />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const app = apps.find((item) => path === `/${item.id}`)
  if (app || path === '/ggt-business') return <OfferingPage app={app} />
  return /^\/lucida\/privacy\/?$/.test(window.location.pathname)
    ? <Suspense fallback={null}><LucidaPrivacy /></Suspense>
    : <HomePage />
}
