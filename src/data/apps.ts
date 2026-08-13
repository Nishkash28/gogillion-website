import { publicAsset } from '../lib/publicAsset'

export type AppLink = {
  appStoreUrl: string
  googlePlayUrl: string
  websiteUrl: string
}

export type GoGillionApp = {
  id: string
  order: number
  name: string
  logo: string
  detailLogo?: string
  convergenceLogo?: string
  positioning: string
  shortDescription: string
  status: string
  launchDate: string
  logoTagline?: string
  proofPoints: readonly string[]
  links: AppLink
  ctaWording: string
  alt: string
  theme: 'nirvaan' | 'lucida' | 'hera'
}

// The public product story follows the announced launch sequence.
export const apps: readonly GoGillionApp[] = [
  {
    id: 'lucida',
    order: 1,
    name: 'Lucida',
    logo: publicAsset('assets/apps/lucida-logo.webp'),
    detailLogo: publicAsset('assets/apps/lucida-logo-2.webp'),
    positioning: 'Ancient knowledge, finally computable.',
    shortDescription:
      'Lucida structures the calculation systems and interpretive rules of Jyotish Shastra, numerology and palmistry, then uses AI reasoning to converge them into coherent, individualised guidance.',
    status: 'Coming soon',
    launchDate: 'August 2026',
    proofPoints: [
      'Classical Indian schools, structurally codified',
      'Jyotish, numerology and palmistry brought together',
      'Coherent readings through bounded AI reasoning',
    ],
    links: { appStoreUrl: '', googlePlayUrl: '', websiteUrl: '' },
    ctaWording: 'Discover Lucida',
    alt: 'Lucida Celestial Alignment application logo',
    theme: 'lucida',
  },
  {
    id: 'hera',
    order: 2,
    name: 'HerA',
    logo: publicAsset('assets/apps/hera-logo.svg'),
    detailLogo: publicAsset('assets/apps/hera-logo-2.webp'),
    convergenceLogo: publicAsset('assets/apps/hera-logo-2.webp'),
    positioning: 'Her body, understood at every stage.',
    shortDescription:
      'HerA is a women’s health companion for the whole arc of hormonal and reproductive life, from menstrual health and fertility to pregnancy, postpartum and menopause.',
    status: 'Coming soon',
    launchDate: 'October 2026',
    proofPoints: [
      'Life-stage-aware, low-burden tracking',
      'Contextual guidance grounded in expert frameworks',
      'Non-clinical by design, with responsible escalation',
    ],
    links: { appStoreUrl: '', googlePlayUrl: '', websiteUrl: '' },
    ctaWording: 'Discover HerA',
    alt: 'HerA application logo',
    theme: 'hera',
  },
  {
    id: 'nirvaan',
    order: 3,
    name: 'Nirvaan',
    logo: publicAsset('assets/apps/nirvaan-logo.svg'),
    logoTagline: 'Pause. Reflect. Understand.',
    positioning: 'A companion for the everyday, not a replacement for care.',
    shortDescription:
      'Nirvaan offers non-clinical, everyday mental-wellness support through structured self-reflection, mood and habit awareness, and coping frameworks grounded in cultural context.',
    status: 'Coming soon',
    launchDate: 'December 2026',
    proofPoints: [
      'Structured reflection, mood and habit awareness',
      'Coping frameworks grounded in cultural context',
      'Built to escalate when professional care is needed',
    ],
    links: { appStoreUrl: '', googlePlayUrl: '', websiteUrl: '' },
    ctaWording: 'Discover Nirvaan',
    alt: 'Nirvaan application logo',
    theme: 'nirvaan',
  },
] as const
