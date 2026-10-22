import { business } from '../../data/business'

export function BusinessOffering({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2'
  return (
    <section className="business-offering" id="ggt-business" tabIndex={-1} aria-labelledby="business-title">
      <div className="business-offering__inner">
        <div className="business-offering__identity">
          <img src={business.logo} alt="GoGillion Technologies logo" width="420" height="150" loading={standalone ? 'eager' : 'lazy'} />
          <Heading id="business-title">{business.name}</Heading>
        </div>
        <div className="business-offering__copy">
          <p className="eyebrow">{standalone ? 'Intelligence for business' : '04 / The collection'}</p>
          <p className="business-offering__positioning">Human expertise.<br />AI-led clarity.<br /><em>Business decisions.</em></p>
          <p className="business-offering__description">{business.description}</p>
          {standalone && <p className="business-offering__description">{business.detail}</p>}
          <p className="business-offering__launch">{business.launchNote}</p>
        </div>
      </div>
    </section>
  )
}
