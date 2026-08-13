import { useRef } from 'react'
import { apps } from '../../data/apps'
import { company } from '../../data/company'
import { gsap, useGSAP } from '../../animations/registerGsap'
import { AppLogo } from '../../components/ui/AppLogo'

export function Convergence() {
  const sectionRef = useRef<HTMLElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-convergence-logo]', {
        scale: 0.9,
        opacity: 0,
        y: 54,
        z: -150,
        rotateX: 8,
        stagger: 0.12,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      })
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section className="convergence" ref={sectionRef} aria-labelledby="convergence-title">
      <p className="eyebrow">The GoGillion architecture</p>
      <h2 id="convergence-title">Different questions.<br /><em>One trusted engine.</em></h2>
      <p className="convergence__intro">An expanding portfolio, built on a shared foundation: codified human expertise, guardrailed AI and safety systems that govern every output.</p>
      <div className="convergence__logos">
        {apps.map((app) => (
          <figure data-convergence-logo key={app.id}>
            <span className={`convergence__logo convergence__logo--${app.theme}`}>
              <AppLogo app={app} src={app.convergenceLogo} decorative />
            </span>
            <figcaption>{app.name} · {app.launchDate}</figcaption>
          </figure>
        ))}
      </div>
      <ol className="architecture-flow" data-reveal>
        {company.architecture.map((layer) => (
          <li key={layer.number}>
            <span>{layer.number}</span>
            <strong>{layer.name}</strong>
            <p>{layer.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
