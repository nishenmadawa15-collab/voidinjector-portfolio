import { useEffect, useState } from 'react'
import { Hexagon, Menu, X } from 'lucide-react'
import Reveal from './Reveal'

const links = [
  { id: 'projects', label: 'Projects', badge: '4' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'border-[#00FF55]/25 bg-[#050806]/85 shadow-[0_0_30px_rgba(0,255,85,0.08)] backdrop-blur-md'
            : 'border-[#00FF55]/15 bg-[#050806]/35 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-8 md:px-12">
          <Reveal delay={0}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex items-center gap-2"
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <Hexagon
                  size={26}
                  strokeWidth={1.5}
                  className="text-[#00FF55] drop-shadow-[0_0_10px_rgba(0,255,85,0.6)] transition-transform duration-300 group-hover:rotate-12"
                />
                <span className="absolute h-1.5 w-1.5 rounded-full bg-[#00FF55] shadow-[0_0_8px_#00FF55] pulse-dot" />
              </span>
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-[#00FF55] sm:text-base">
                voidinjector
              </span>
            </a>
          </Reveal>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {links.map((link, i) => (
              <Reveal key={link.id} delay={100 + i * 90}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className="nav-link-cyber text-sm text-[#E8FFF0]/85"
                >
                  {link.label}
                  {link.badge && (
                    <sup className="ml-0.5 font-mono text-[10px] text-[#00D9FF]">{link.badge}</sup>
                  )}
                </button>
              </Reveal>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Reveal delay={480}>
              <button
                type="button"
                onClick={() => go('contact')}
                className="btn-neon px-4 py-2 text-[0.65rem] sm:px-5 sm:text-xs"
              >
                Hire Me
              </button>
            </Reveal>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0a6b32] text-[#00FF55] md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-[#00FF55]/20 bg-[#050806]/95 px-5 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className="w-full rounded-lg px-3 py-3 text-left text-sm text-[#E8FFF0] transition-colors hover:bg-[#00FF55]/10 hover:text-[#00FF55]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
