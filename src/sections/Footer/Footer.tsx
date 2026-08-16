import { company } from '../../data/company'

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
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
