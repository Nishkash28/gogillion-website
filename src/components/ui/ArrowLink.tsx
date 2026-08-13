import type { ReactNode } from 'react'

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="arrow-link" href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true">↗</span>
    </a>
  )
}
