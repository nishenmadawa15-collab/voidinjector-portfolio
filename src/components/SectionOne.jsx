import { useRef, lazy, Suspense } from 'react'
import { ChevronRight, Shield } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { personalInfo, socialLinks } from '../data/siteData'

const Hero3D = lazy(() => import('./Hero3D'))

gsap.registerPlugin(useGSAP)

const SERVICES = ['ETHICAL HACKING', 'PENETRATION TESTING', 'SECURITY AUTOMATION']

/**
 * Hero — Three.js 3D cyber core + UI overlay.
 */
export default function SectionOne() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero-line]', { opacity: 0, x: -36, duration: 0.5, stagger: 0.09 })
        .from('[data-hero-intro]', { opacity: 0, x: 28, duration: 0.45 }, '-=0.3')
        .from('[data-hero-badge]', { opacity: 0, y: 16, duration: 0.35 }, '-=0.2')
        .from('[data-hero-title]', { opacity: 0, y: 40, duration: 0.55 }, '-=0.15')
        .from(
          '[data-hero-card]',
          { opacity: 0, y: 28, scale: 0.96, duration: 0.5, ease: 'back.out(1.3)' },
          '-=0.3'
        )
    },
    { scope: root }
  )

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      {/* Three.js 3D layer (lazy-loaded) */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      {/* Soft vignette so text stays readable over 3D */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(90deg, rgba(5,8,6,0.75) 0%, rgba(5,8,6,0.25) 35%, rgba(5,8,6,0.2) 65%, rgba(5,8,6,0.7) 100%),
            linear-gradient(180deg, rgba(5,8,6,0.55) 0%, transparent 30%, transparent 70%, rgba(5,8,6,0.75) 100%)
          `,
        }}
        aria-hidden
      />

      {/* UI content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <p
                key={s}
                data-hero-line
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#00FF55] drop-shadow-[0_0_10px_rgba(0,255,85,0.45)] sm:text-sm"
              >
                <span className="text-[#00D9FF]">//</span> {s}
              </p>
            ))}
          </div>

          <p
            data-hero-intro
            className="max-w-xs text-lg leading-relaxed text-[#E8FFF0] drop-shadow-md sm:text-right sm:text-xl"
          >
            I design defenses that bring{' '}
            <span className="font-semibold text-[#00FF55]">clarity</span>,{' '}
            <span className="font-semibold text-[#00D9FF]">precision</span>, and resilience to the
            way your systems operate.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-hero-badge className="badge-left-accent mb-5 inline-flex items-center gap-2">
              <Shield size={12} className="text-[#00FF55]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#00FF55]">
                Secured 100+ Assessments
              </span>
            </div>

            <h1
              data-hero-title
              className="font-display text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="cyber-glitch text-glow block" data-text="Clear. Precise.">
                Clear. Precise.
              </span>
              <span className="mt-1 block text-[#E8FFF0] drop-shadow-lg">Secured.</span>
            </h1>
          </div>

          <div
            data-hero-card
            className="max-w-sm rounded-xl border-2 border-[#00FF55]/35 bg-[#07140c]/92 p-3 shadow-[0_0_24px_rgba(0,255,85,0.15)] backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 overflow-hidden rounded-lg border border-[#00FF55]/45">
                <img
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.displayName}, cyber security professional`}
                  className="h-24 w-20 object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5 pr-1">
                <p className="text-sm font-medium text-[#E8FFF0]">
                  Talk with {personalInfo.shortName}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#00D9FF]">
                  Cyber Security · VOIDINJECTOR
                </p>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-neon mt-1.5 px-4 py-2 text-xs"
                >
                  Book 15-mins call
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
