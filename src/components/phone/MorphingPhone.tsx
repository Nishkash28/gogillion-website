import { apps } from '../../data/apps'
import { AppLogo } from '../ui/AppLogo'

export function MorphingPhone() {
  return (
    <div className="phone story-phone" aria-hidden="true">
      <div className="phone__edge" />
      <div className="phone__screen">
        <span className="phone__speaker" />
        <div className="phone__screen-light" />
        {apps.map((app, index) => (
          <div
            className={`story-phone__identity story-phone__identity--${app.theme}`}
            data-phone-identity={index}
            key={app.id}
          >
            <AppLogo app={app} decorative eager />
          </div>
        ))}
      </div>
    </div>
  )
}
