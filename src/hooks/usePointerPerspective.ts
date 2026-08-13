import { useEffect, type RefObject } from 'react'

export function usePointerPerspective(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current
    const enabled = window.matchMedia(
      '(prefers-reduced-motion: no-preference) and (pointer: fine)',
    )
    if (!element || !enabled.matches) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      element.style.setProperty('--pointer-x', `${x * 4.5}deg`)
      element.style.setProperty('--pointer-y', `${y * -3.5}deg`)
    }
    const onLeave = () => {
      element.style.setProperty('--pointer-x', '0deg')
      element.style.setProperty('--pointer-y', '0deg')
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])
}
