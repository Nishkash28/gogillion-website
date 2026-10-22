import { useEffect } from 'react'
import type { GoGillionApp } from '../../data/apps'
import { business } from '../../data/business'
import { Navigation } from '../../components/navigation/Navigation'
import { Footer } from '../Footer/Footer'
import { BusinessOffering } from '../BusinessOffering/BusinessOffering'
import { Phone } from '../../components/phone/Phone'
import { RegisteredName, RegisteredCopy } from '../../components/ui/RegisteredName'
import { LaunchStoreBadges } from '../../components/ui/LaunchStoreBadges'

export function OfferingPage({ app }: { app?: GoGillionApp }) {
  useEffect(() => {
    document.title = `${app ? `${app.name}®` : business.name} | GoGillion Technologies`
  }, [app])
  return (
    <div id="top">
      <Navigation />
      <main id="main" className="offering-page">
        {app ? (
          <section className={`offering-detail offering-detail--${app.theme}`} aria-labelledby="offering-title">
            <div className="offering-detail__visual"><Phone app={app} eager /></div>
            <div className="offering-detail__copy">
              <p className="eyebrow">A GoGillion application</p>
              <h1 id="offering-title"><RegisteredName name={app.name} /></h1>
              <p className="offering-detail__positioning">{app.positioning}</p>
              <p className="offering-detail__description"><RegisteredCopy text={app.shortDescription} /></p>
              <ul className="product-copy__proof">{app.proofPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              <LaunchStoreBadges app={app} />
            </div>
          </section>
        ) : <BusinessOffering standalone />}
      </main>
      <Footer />
    </div>
  )
}
