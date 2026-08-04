import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Code2, Monitor, Crosshair } from 'lucide-react'
import SkillCard from './SkillCard'
import {
  skillsIntro,
  securityTools,
  coreProgramming,
  webTech,
  cyberExpertise,
} from '../data/siteData'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PANEL_META = {
  'Security Tools': {
    icon: Shield,
    tag: 'ARSENAL // OFFENSIVE',
  },
  'Programming Languages': {
    icon: Code2,
    tag: 'CODE // WEAPONRY',
  },
  'Operating Systems': {
    icon: Monitor,
    tag: 'HOST // ENVIRONMENT',
  },
}

function SkillPanel({ title, items, variant = 'default' }) {
  const meta = PANEL_META[title] || { icon: Crosshair, tag: 'MODULE' }
  const Icon = meta.icon
  const gridCols =
    items.length >= 6
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-3'

  return (
    <div
      data-skill-panel
      className="relative rounded-2xl border-2 border-[#0a6b32] bg-[#07140c] p-4 sm:p-6"
      style={{ opacity: 1, visibility: 'visible' }}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF55] to-transparent" />
      <div className="pointer-events-none absolute right-4 top-4 flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2.5 w-2.5 rotate-45 border-r-2 border-t-2 border-[#00D9FF]"
            style={{ opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>

      <div className="relative mb-5 flex items-center gap-3 border-b border-[#0a6b32] pb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#00FF55]/40 bg-[#050806] text-[#00FF55]">
          <Icon size={20} strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-[#00D9FF]">
            {meta.tag}
          </p>
          <h3 className="font-display text-lg font-bold tracking-wide text-white sm:text-xl">
            {title}
          </h3>
        </div>
        <span className="ml-auto shrink-0 rounded-full border border-[#00FF55]/40 bg-[#00FF55]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#00FF55]">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <div className={`grid gap-3 sm:gap-4 ${gridCols}`}>
        {items.map((item) => (
          <SkillCard key={item.name} item={item} variant={variant} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const panelsRef = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const panels = panelsRef.current?.querySelectorAll('[data-skill-panel]')
      const cards = panelsRef.current?.querySelectorAll('[data-skill-card]')

      // CRITICAL: always force full visibility first (fixes invisible skills bug)
      if (panels?.length) gsap.set(panels, { opacity: 1, visibility: 'visible', clearProps: 'opacity' })
      if (cards?.length) gsap.set(cards, { opacity: 1, visibility: 'visible', clearProps: 'opacity' })
      if (leftRef.current) gsap.set(leftRef.current, { opacity: 1, visibility: 'visible' })

      if (prefersReduced) return

      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          y: 36,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
          onComplete: () => {
            if (leftRef.current) gsap.set(leftRef.current.children, { clearProps: 'opacity,transform' })
          },
        })
      }

      panels?.forEach((panel) => {
        const panelCards = panel.querySelectorAll('[data-skill-card]')

        gsap.from(panel, {
          y: 50,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            once: true,
          },
          onComplete: () => gsap.set(panel, { clearProps: 'transform', opacity: 1 }),
        })

        if (panelCards.length) {
          gsap.from(panelCards, {
            y: 32,
            scale: 0.92,
            duration: 0.5,
            stagger: 0.06,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: panel,
              start: 'top 86%',
              once: true,
            },
            onComplete: () =>
              gsap.set(panelCards, { clearProps: 'transform', opacity: 1, visibility: 'visible' }),
          })
        }
      })
    },
    { scope: sectionRef }
  )

  const scrollToSecurity = () => {
    document.getElementById('security-tools')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24"
      style={{ opacity: 1 }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[5%] top-[20%] h-40 w-40 rounded-full bg-[#00FF55]/8 blur-3xl" />
        <div className="absolute right-[8%] top-[45%] h-48 w-48 rounded-full bg-[#00D9FF]/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
          <div ref={leftRef} className="lg:col-span-4 lg:sticky lg:top-28" style={{ opacity: 1 }}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-[#0a6b32] bg-[#07140c] px-3 py-1.5">
              <Crosshair className="h-4 w-4 text-[#00FF55]" />
              <span className="font-mono text-xs font-semibold tracking-[0.15em] text-[#00D9FF]">
                TECH_ARSENAL
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-wide text-white sm:text-4xl">
              My Core{' '}
              <span className="text-glow bg-gradient-to-r from-[#00FF55] to-[#00D9FF] bg-clip-text text-transparent">
                Skills
              </span>
            </h2>

            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#b5d0c0]">{skillsIntro}</p>

            <button
              type="button"
              onClick={scrollToSecurity}
              className="btn-neon mt-6 min-h-[48px] text-sm"
            >
              Access Threats
            </button>

            <div className="mt-8">
              <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-[#00D9FF]">
                EXPERTISE_MODULES
              </p>
              <div className="flex flex-wrap gap-2">
                {cyberExpertise.slice(0, 10).map((e) => (
                  <span
                    key={e}
                    className="rounded-md border border-[#0a6b32] bg-[#0a1410] px-2.5 py-1 text-xs text-[#c8e0d0] transition-colors hover:border-[#00FF55]/50 hover:text-[#00FF55]"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div ref={panelsRef} className="flex flex-col gap-6 lg:col-span-8">
            <div id="security-tools">
              <SkillPanel title="Security Tools" items={securityTools} />
            </div>
            <SkillPanel title="Programming Languages" items={coreProgramming} />
            <SkillPanel title="Operating Systems" items={webTech} variant="os" />
          </div>
        </div>
      </div>
    </section>
  )
}
