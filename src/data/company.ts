import { publicAsset } from '../lib/publicAsset'

export const company = {
  name: 'GoGillion Technologies',
  logo: publicAsset('assets/brand/gogillion-logo.svg'),
  description:
    'GoGillion Technologies is a Bengaluru-based consumer technology company building AI-enabled mobile applications for the decisions that matter most. We turn complex life questions into clear, personalised and trustworthy guidance.',
  mission:
    'To build trusted, intelligent applications that combine AI-powered insights with human expertise, helping people make clearer, more confident decisions.',
  vision:
    'A world where everyone has a guiding light for the decisions that shape their lives — where no one has to face their health or the uncertainties ahead alone.',
  philosophy:
    'Human domain expertise is codified into computable frameworks. AI generates personalised insight within those bounds. Safety systems govern every output.',
  foundation: 'Built in India, on Indian knowledge, for a global audience.',
  architecture: [
    {
      number: '01',
      name: 'Codified expertise',
      description: 'Human domain knowledge translated into structured, computable frameworks.',
    },
    {
      number: '02',
      name: 'Guardrailed intelligence',
      description: 'AI-generated personal insight that reasons within the bounds of those frameworks.',
    },
    {
      number: '03',
      name: 'Safety by design',
      description: 'Systems that govern every output and recognise when human expertise should take over.',
    },
  ],
  email: 'info@gogillion.com',
  privacyUrl: '',
  termsUrl: '',
  socialLinks: [] as { label: string; url: string }[],
} as const
