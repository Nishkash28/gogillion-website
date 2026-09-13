import { company } from '../../data/company'
import { publicAsset } from '../../lib/publicAsset'

export function Footer() {
  return (
    <footer className="footer" id="contact" data-reveal>
      <p className="eyebrow">Start a conversation</p>
      <h2>What should<br />intelligence <em>unlock next?</em></h2>
      <address className="footer__contacts" aria-label="Contact email addresses">
        {company.contacts.map((contact) => (
          <a className="footer__contact" href={`mailto:${contact.email}`} key={contact.email}>
            <span className="footer__contact-label">
              {contact.label}
              {'detail' in contact && <small>{contact.detail}</small>}
            </span>
            <strong>{contact.email}</strong>
            <span className="footer__contact-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </address>
      <div className="footer__company">
        <address className="footer__office">
          <span className="footer__office-label">Registered Office:</span>
          Plot No. 37 21&amp;24, Workhub by Novel Office,<br />
          Whitefield Road, Doddanekundi, II Phase,<br />
          Industrial Area, Bengaluru - 560048
        </address>
        <div className="footer__brands" aria-label="GoGillion and startup recognition">
          <figure className="footer__brand">
            <div className="footer__logo-frame footer__logo-frame--gogillion">
              <img src={publicAsset('assets/brand/gogillion-footer-logo.png')} alt="GoGillion Technologies" width="960" height="720" loading="lazy" />
            </div>
            <figcaption>Intelligence for Whatever Life Asks.</figcaption>
          </figure>
          <figure className="footer__brand">
            <div className="footer__logo-frame footer__logo-frame--dpiit">
              <img src={publicAsset('assets/brand/dpiit-startup-india.png')} alt="DPIIT Startup India" width="993" height="410" loading="lazy" />
            </div>
            <figcaption>A DPIIT recognized startup.</figcaption>
          </figure>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
