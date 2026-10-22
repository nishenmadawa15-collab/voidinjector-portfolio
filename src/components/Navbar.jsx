import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { identity, navLinks } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled || open ? 'border-line bg-ink/90 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-mint focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-2 font-mono text-sm tracking-wide">
          <span className="inline-block h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
          <span className="font-semibold text-text">{identity.handle}</span>
          <span className="hidden text-muted sm:inline">/ {identity.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="inline-flex min-h-11 items-center rounded px-3 font-mono text-sm text-text-dim transition-colors hover:text-mint"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={identity.resumeUrl} className="btn btn-ghost ml-2 py-1.5 text-xs" download>
              CV
            </a>
          </li>
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-text lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="nav-panel border-t border-line bg-ink lg:hidden"
      >
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border-b border-line/60 font-mono text-base text-text"
              >
                {l.label}
                <span className="text-muted" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a href={identity.resumeUrl} className="btn btn-primary w-full" download onClick={() => setOpen(false)}>
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
