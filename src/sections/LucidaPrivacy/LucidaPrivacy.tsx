import ReactMarkdown from 'react-markdown'
import { Navigation } from '../../components/navigation/Navigation'
import { Footer } from '../Footer/Footer'
import policy from '../../content/lucida_privacy_policy.md?raw'
import './lucida-privacy.css'

export function LucidaPrivacy() {
  return (
    <div id="top">
      <Navigation />
      <main className="privacy-page" id="main">
        <article className="privacy-page__content" aria-label="Lucida Privacy Policy">
          <ReactMarkdown>{policy}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  )
}
