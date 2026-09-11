import { apps } from '../../data/apps'
import { Phone } from '../../components/phone/Phone'
import { ProductCopy } from './ProductCopy'

export function ProductStory() {
  return (
    <section className="product-story" aria-label="GoGillion applications">
      <div className="product-story__mobile">
        {apps.map((app) => (
          <article className="mobile-product" data-mobile-product id={app.id} tabIndex={-1} aria-label={`${app.name}®`} key={app.id}>
            <Phone app={app} />
            <ProductCopy app={app} />
          </article>
        ))}
      </div>
    </section>
  )
}
