import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './animations/registerGsap'

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GoGillion Technologies',
  url: 'https://gogillion.com',
  logo: 'https://gogillion.com/assets/brand/gogillion-logo.svg',
  email: 'info@gogillion.com',
}

const structuredData = document.createElement('script')
structuredData.type = 'application/ld+json'
structuredData.text = JSON.stringify(organizationData)
document.head.appendChild(structuredData)

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
