import { RegisteredName } from '../ui/RegisteredName'
import { useEffect, useRef, useState } from 'react'
import { publicAsset } from '../../lib/publicAsset'
import { apps } from '../../data/apps'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])
  return (
    <header className="site-header">
      <a className="brand-link" href="/#top" aria-label="GoGillion Technologies, home">
        <img className="brand-link__logo" src={publicAsset('assets/brand/gogillion-logo-2.webp')} alt="GoGillion Technologies" />
      </a>
      <nav aria-label="Primary navigation">
        <div className="product-menu" ref={menu} onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }} onKeyDown={(event) => {
          if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() }
        }}>
          <button ref={trigger} className="product-menu__trigger" aria-expanded={open} aria-controls="product-menu" onClick={() => setOpen(!open)}>
            Products <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <div id="product-menu" className="product-menu__panel" hidden={!open}>
            <p className="product-menu__eyebrow">Three apps. A world of possibility.</p>
            {apps.map((app) => <a href={`/${app.id}`} key={app.id} onClick={() => setOpen(false)}>
              <span className={`product-menu__dot product-menu__dot--${app.id}`} aria-hidden="true" />
              <span><strong><RegisteredName name={app.name} /></strong><small>{app.launchDate}</small></span>
              <span className="product-menu__arrow" aria-hidden="true">↗</span>
            </a>)}
          </div>
        </div>
        <a className="nav-about" href="/#about">About</a>
        <a className="nav-contact" href="/#contact">Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
