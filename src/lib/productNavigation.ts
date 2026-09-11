import { ScrollTrigger } from '../animations/registerGsap'
import { navigationStop } from './navigationState'
import { apps } from '../data/apps'

export function scrollToDestination(id: string, focus = false) {
  const product = apps.find((app) => app.id === id)
  const story = ScrollTrigger.getById('product-story')
  if ((product || id === 'products') && story?.animation) {
    const label = product?.id || 'lucida'
    const time = (story.animation as gsap.core.Timeline).labels[label]
    const progress = time / story.animation.duration()
    navigationStop.progress = progress
    window.scrollTo({ top: story.start + (story.end - story.start) * progress, behavior: 'instant' })
    story.getTween()?.progress(1)
    story.animation.progress(progress)
    ScrollTrigger.update()
    if (focus) document.querySelector<HTMLElement>(`[data-product-id="${label}"]`)?.focus({ preventScroll: true })
    return
  }
  navigationStop.progress = null
  const target = document.getElementById(id === 'products' ? 'lucida' : id)
  target?.scrollIntoView({ behavior: 'instant', block: 'start' })
  if (focus) target?.focus({ preventScroll: true })
}
