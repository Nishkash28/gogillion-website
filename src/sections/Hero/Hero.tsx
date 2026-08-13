import { useRef } from 'react'
import { apps } from '../../data/apps'
import { useHeroAnimation } from '../../animations/useHeroAnimation'
import { usePointerPerspective } from '../../hooks/usePointerPerspective'
import { Phone } from '../../components/phone/Phone'
import { MorphingPhone } from '../../components/phone/MorphingPhone'
import { ProductCopy } from '../ProductStory/ProductCopy'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  useHeroAnimation(sectionRef)
  usePointerPerspective(phonesRef)

  return (
    <section className="hero" id="top" ref={sectionRef} aria-labelledby="hero-title">
      <span className="hero__products-anchor" id="products" aria-hidden="true" />
      <div className="hero__stage" data-hero-stage>
        <div className="hero__copy" data-hero-copy>
          <p className="eyebrow">GoGillion Technologies</p>
          <h1 id="hero-title">Intelligence<br />for <em>whatever<br />life asks.</em></h1>
          <p>Human expertise, made computable. Personalised guidance, kept within thoughtful guardrails.</p>
        </div>
        <div className="hero__phones" ref={phonesRef} role="img" aria-label="Lucida, HerA and Nirvaan applications">
          <div className="hero__orbit" aria-hidden="true" />
          <div className="hero__depth-glow" aria-hidden="true" />
          {apps.map((app, index) => (
            <div className={`hero__phone hero__phone--${index + 1}`} data-hero-phone={index} key={app.id}>
              <Phone app={app} className="story-phone" eager />
            </div>
          ))}
        </div>
        <div className="hero__story" data-hero-story>
          <span className="hero__story-divider" data-hero-story-divider aria-hidden="true" />
          <div className="hero__story-phone" data-hero-story-phone><MorphingPhone /></div>
          {apps.map((app, index) => (
            <article
              className={`hero__product hero__product--${index}`}
              data-hero-product={index}
              aria-label={`${app.name} product introduction`}
              key={app.id}
            >
              <ProductCopy app={app} eager />
            </article>
          ))}
        </div>
        <a className="scroll-cue" href="#products"><span />Explore the products</a>
      </div>
    </section>
  )
}
