import { company } from '../../data/company'

const principles = [
  { label: 'Mission', value: company.mission },
  { label: 'Vision', value: company.vision },
  { label: 'Architecture', value: company.philosophy },
]

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title" data-reveal>
      <div className="about__mark"><img src={company.logo} alt="GoGillion Technologies logo" loading="lazy" /></div>
      <div className="about__content">
        <p className="eyebrow">The parent company</p>
        <h2 id="about-title">GoGillion<br /><em>Technologies</em></h2>
        <p className="about__description">{company.description}</p>
        <p className="about__foundation">{company.foundation}</p>
        <dl>
          {principles.map((principle) => (
            <div key={principle.label}>
              <dt>{principle.label}</dt><dd>{principle.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
