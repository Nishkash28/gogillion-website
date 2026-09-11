import { navigationStop } from '../lib/navigationState'
import { useEffect } from 'react'
import { apps } from '../data/apps'
import { ScrollTrigger } from '../animations/registerGsap'
import { scrollToDestination } from '../lib/productNavigation'

export function useProductNavigation() {
  useEffect(() => {
    let disposed = false
    const release = () => { navigationStop.progress = null }
    const keyRelease = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) release()
    }
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    window.addEventListener('keydown', keyRelease)
    window.addEventListener('pointerdown', release, { passive: true })
    const resolve = () => {
      const path = location.pathname.replace(/^\/|\/$/g, '')
      const id = location.hash.slice(1) || (apps.some((app) => app.id === path) ? path : 'top')
      scrollToDestination(id)
    }
    const ready = () => {
      if (disposed) return
      ScrollTrigger.refresh()
      resolve()
    }
    void document.fonts.ready.then(() => requestAnimationFrame(ready))
    window.addEventListener('load', ready)
    window.addEventListener('popstate', resolve)
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return
      const url = new URL(link.href)
      if (url.origin !== location.origin) return
      const path = url.pathname.replace(/^\/|\/$/g, '')
      const product = apps.find((app) => app.id === path)
      const id = url.hash.slice(1) || product?.id
      if (!id) return
      event.preventDefault()
      history.pushState(null, '', product && !url.hash ? `/${product.id}` : `/${url.hash}`)
      scrollToDestination(id, true)
    }
    document.addEventListener('click', click)
    return () => {
      disposed = true
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
      window.removeEventListener('keydown', keyRelease)
      window.removeEventListener('pointerdown', release)
      window.removeEventListener('load', ready)
      window.removeEventListener('popstate', resolve)
      document.removeEventListener('click', click)
    }
  }, [])
}
