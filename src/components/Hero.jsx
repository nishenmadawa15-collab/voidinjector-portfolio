import MatrixBackground from './MatrixBackground'
import GlitchText from './GlitchText'
import { personalInfo } from '../data/siteData'

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[min(92vh,820px)] flex-col items-center justify-center overflow-hidden pt-24 pb-16 sm:min-h-[70vh] sm:pt-28"
    >
      <MatrixBackground opacity={0.14} density={0.9} speed={0.55} />
      <div className="pointer-events-none absolute inset-0 glow-radial" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050806] to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-[#00D9FF]/80 sm:text-sm">
          Hi, I&apos;m {personalInfo.displayName.toUpperCase()}
        </p>
        <GlitchText
          text={personalInfo.heroHeadline}
          className="max-w-[95vw] text-[clamp(1.25rem,5.2vw,3.5rem)] leading-[1.15] sm:leading-tight"
        />

        <p className="mt-5 max-w-3xl font-mono text-[0.6rem] font-normal uppercase tracking-[0.14em] text-[#71917B] sm:mt-6 sm:text-xs sm:tracking-[0.18em]">
          {personalInfo.heroTagline}
        </p>

        <p className="mt-4 max-w-xl font-body text-sm text-[#71917B]/90 sm:text-base">
          Passionate about protecting digital assets, ethical hacking, penetration testing, and CTF
          competitions.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="btn-neon min-h-[44px] min-w-[140px]"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="btn-neon min-h-[44px] min-w-[140px]"
          >
            Access Archive
          </button>
        </div>
      </div>
    </section>
  )
}
