import { Navigation } from './components/navigation/Navigation'
import { Hero } from './sections/Hero/Hero'
import { ProductStory } from './sections/ProductStory/ProductStory'
import { Convergence } from './sections/Convergence/Convergence'
import { About } from './sections/About/About'
import { Footer } from './sections/Footer/Footer'
import { usePageMotion } from './animations/usePageMotion'

export default function App() {
  usePageMotion()
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <ProductStory />
        <Convergence />
        <About />
      </main>
      <Footer />
    </>
  )
}
