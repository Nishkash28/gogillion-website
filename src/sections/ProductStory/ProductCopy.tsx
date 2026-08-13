import type { GoGillionApp } from '../../data/apps'
import { getPrimaryLink } from '../../lib/appLinks'
import { ArrowLink } from '../../components/ui/ArrowLink'
import { AppLogo } from '../../components/ui/AppLogo'
import { LaunchStoreBadges } from '../../components/ui/LaunchStoreBadges'

export function ProductCopy({ app, eager = false }: { app: GoGillionApp; eager?: boolean }) {
  const primaryLink = getPrimaryLink(app)
  return (
    <div className="product-copy">
      <p className="product-copy__index">0{app.order} / CURRENT RELEASES</p>
      <LaunchStoreBadges app={app} />
      <h2 className={`product-copy__brand product-copy__brand--${app.theme}`} aria-label={app.name}>
        <AppLogo app={app} className="product-copy__logo" src={app.detailLogo} decorative eager={eager} />
      </h2>
      <p className="product-copy__positioning">{app.positioning}</p>
      <p className="product-copy__description">{app.shortDescription}</p>
      <ul className="product-copy__proof">
        {app.proofPoints.map((point) => <li key={point}>{point}</li>)}
      </ul>
      {primaryLink && <ArrowLink href={primaryLink.url}>{primaryLink.label}</ArrowLink>}
    </div>
  )
}
