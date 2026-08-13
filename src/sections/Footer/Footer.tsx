import { company } from '../../data/company'

export function Footer() {
  return (
    <footer className="footer" id="contact" data-reveal>
      <p className="eyebrow">Start a conversation</p>
      <h2>What should<br />intelligence <em>unlock next?</em></h2>
      <a className="footer__email" href={`mailto:${company.email}`}>{company.email}<span aria-hidden="true">↗</span></a>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
