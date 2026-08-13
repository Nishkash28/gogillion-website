import type { GoGillionApp } from '../../data/apps'
import { AppLogo } from '../ui/AppLogo'

type PhoneProps = {
  app: GoGillionApp
  className?: string
  eager?: boolean
}

export function Phone({ app, className = '', eager = false }: PhoneProps) {
  return (
    <div className={`phone phone--${app.theme} ${className}`} aria-hidden="true">
      <div className="phone__edge" />
      <div className="phone__screen">
        <span className="phone__speaker" />
        <div className="phone__screen-light" />
        <AppLogo app={app} decorative eager={eager} className="phone__app-logo" />
        <span className="phone__app-name">{app.name}</span>
      </div>
    </div>
  )
}
