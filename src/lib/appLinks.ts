import type { GoGillionApp } from '../data/apps'

export function getPrimaryLink(app: GoGillionApp) {
  const destinations = [
    { url: app.links.websiteUrl, label: app.ctaWording },
    { url: app.links.appStoreUrl, label: 'View on the App Store' },
    { url: app.links.googlePlayUrl, label: 'Get it on Google Play' },
  ]

  return destinations.find(({ url }) => /^https:\/\//.test(url))
}
