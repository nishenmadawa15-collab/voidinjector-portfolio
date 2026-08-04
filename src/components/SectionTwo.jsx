import { useRef } from 'react'
import { ChevronRight, Radar } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CAPABILITIES = [
  {
    n: '01',
    title: 'Threat detection',
    body: 'Reads network and app context as it happens and surfaces risk before it escalates.',
  },
  {
    n: '02',
    title: 'Layered defense',
    body: 'Moves from rough assessment to hardened output without losing the security thread.',
  },
  {
    n: '03',
    title: 'Adaptive response',
    body: 'Learns your environment and tightens every pass as threats evolve.',
  },
]

/** Capability section — panel always visible + restored row animation. */
export default function SectionTwo() {
  const root = useRef(null)
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const rows = root.current?.querySelectorAll('[data-cap-row]')
      if (!rows?.length) return

      // Never animate opacity on the panel itself — only mild y on rows
      gsap.from(rows, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          once: true,
        },
        onComplete: () => {
          gsap.set(rows, { clearProps: 'all', opacity: 1, visibility: 'visible' })
        },
      })
    },
    { scope: root }
  )

  return (
    <section
      id="capability"
      ref={root}
      className="relative flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <Reveal delay={40}>
          <div className="badge-left-accent inline-flex items-center gap-2">
            <Radar size={12} className="text-[#00FF55]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#00FF55]">
              Defense On Demand
            </span>
          </div>
        </Reveal>

        <Reveal delay={80} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-[#E8FFF0] drop-shadow-md sm:text-xl">
            Security doesn&apos;t just respond — it{' '}
            <span className="font-semibold text-[#00D9FF]">interprets</span>, hardens, and delivers
            the signal you need.
          </p>
        </Reveal>
      </div>

      <div className="mt-auto flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal delay={60}>
            <h2 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-[#E8FFF0] drop-shadow-lg sm:text-6xl lg:text-7xl">
              Learn to see
              <br />
              <span className="text-glow text-[#00FF55]">brilliantly.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-6 max-w-md text-sm text-[#a8c4b0] drop-shadow-md sm:text-base">
              From the first scan to the final report, VOIDINJECTOR turns raw findings into
              decisions your team can act on — quietly, precisely, at speed.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => go('projects')}
                className="btn-neon px-5 py-2.5 text-xs sm:text-sm"
              >
                View missions
                <ChevronRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => go('contact')}
                className="btn-secondary-glass px-5 py-2.5 text-xs sm:text-sm"
              >
                Free consultation
              </button>
            </div>
          </Reveal>
        </div>

        {/* Always-visible capability box */}
        <div
          className="w-full max-w-md rounded-2xl border-2 border-[#00FF55]/4 bg-[#07140c] px-5 py-1 shadow-[0_0_30px_rgba(0,255,85,0.14)] sm:px-6"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          {CAPABILITIES.map((item, i) => (
            <div
              key={item.n}
              data-cap-row
              className={`group flex gap-5 py-5 ${
                i < CAPABILITIES.length - 1 ? 'border-b border-[#00FF55]/2' : ''
              }`}
              style={{ opacity: 1 }}
            >
              <span className="shrink-0 font-mono text-[11px] tracking-[0.15em] text-[#00D9FF]">
                {item.n}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-[#E8FFF0] transition-colors group-hover:text-[#00FF55] sm:text-lg">
                    {item.title}
                  </h3>
                  <ChevronRight
                    size={16}
                    className="text-[#00FF55]/50 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#00FF55]"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#9fbfa8]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
