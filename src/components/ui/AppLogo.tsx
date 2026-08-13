import type { GoGillionApp } from '../../data/apps'

type AppLogoProps = {
  app: GoGillionApp
  decorative?: boolean
  className?: string
  eager?: boolean
  src?: string
}

export function AppLogo({ app, decorative = false, className = '', eager = false, src }: AppLogoProps) {
  return (
    <span className={`app-logo app-logo--${app.theme} ${className}`}>
      <img
        src={src ?? app.logo}
        alt={decorative ? '' : app.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
      {app.logoTagline && <span className="app-logo__tagline">{app.logoTagline}</span>}
    </span>
  )
}
