import { useRef } from 'react'
import { ExternalLink, Code2, Shield } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const STATUS_COLOR = {
  DEPLOYED: '#00FF55',
  ACTIVE: '#00D9FF',
  RESEARCH: '#a78bfa',
  SECURED: '#00FF55',
}

/** Large cyber mission card — image-first HUD design */
export default function ProjectCard({ project, index = 0, large = false }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const scanRef = useRef(null)

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const onEnter = () => {
        gsap.to(card, {
          y: -8,
          borderColor: 'rgba(0,255,85,0.65)',
          boxShadow: '0 0 0 1px rgba(0,255,85,0.35), 0 16px 40px rgba(0,255,85,0.15)',
          duration: 0.3,
          overwrite: 'auto',
        })
        gsap.to(imgRef.current, { scale: 1.06, duration: 0.55, ease: 'power2.out', overwrite: 'auto' })
        if (scanRef.current) {
          gsap.fromTo(
            scanRef.current,
            { yPercent: -120, opacity: 0.85 },
            { yPercent: 220, opacity: 0, duration: 0.9, ease: 'power2.inOut' }
          )
        }
      }
      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          borderColor: 'rgba(10,107,50,0.9)',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.35,
          overwrite: 'auto',
        })
        gsap.to(imgRef.current, { scale: 1, duration: 0.45, overwrite: 'auto' })
      }
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: cardRef, dependencies: [project.id] }
  )

  const statusColor = STATUS_COLOR[project.status] || '#00FF55'
  const code = `0x${String(project.id).padStart(2, '0').toUpperCase()}`

  return (
    <article
      ref={cardRef}
      data-project-card
      className="project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[#0a6b32] bg-[#07140c]"
      style={{ opacity: 1 }}
    >
      <span className="pointer-events-none absolute left-0 top-0 z-20 h-4 w-4 border-l-2 border-t-2 border-[#00FF55]" />
      <span className="pointer-events-none absolute right-0 top-0 z-20 h-4 w-4 border-r-2 border-t-2 border-[#00FF55]" />
      <span className="pointer-events-none absolute bottom-0 left-0 z-20 h-4 w-4 border-b-2 border-l-2 border-[#00D9FF]/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-4 w-4 border-b-2 border-r-2 border-[#00D9FF]/60" />

      {/* LARGE image zone */}
      <div
        className={`relative overflow-hidden border-b border-[#0a6b32]/60 bg-[#050806] ${
          large ? 'aspect-[16/10] sm:aspect-[16/9] min-h-[200px]' : 'aspect-[16/10] min-h-[180px]'
        }`}
      >
        <img
          ref={imgRef}
          src={project.image}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover object-center will-change-transform"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/25 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,85,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,85,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          ref={scanRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-14 bg-gradient-to-b from-transparent via-[#00FF55]/40 to-transparent"
          style={{ opacity: 0 }}
          aria-hidden
        />

        <div className="absolute left-3 right-3 top-3 z-10 flex items-start justify-between gap-2">
          <span className="rounded border border-[#0a6b32] bg-[#050806]/85 px-2 py-1 font-mono text-[0.6rem] tracking-widest text-[#00D9FF] backdrop-blur-sm">
            {code} // {project.category?.toUpperCase()}
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] tracking-wider backdrop-blur-sm"
            style={{
              color: statusColor,
              borderColor: `${statusColor}66`,
              background: `${statusColor}18`,
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: statusColor }} />
            {project.status}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-10 font-display text-4xl font-bold leading-none text-[#00FF55]/20 sm:text-5xl">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Body */}
      <div className={`relative flex flex-1 flex-col p-4 sm:p-5 ${large ? 'lg:p-6' : ''}`}>
        <div className="mb-2 flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#00FF55]" aria-hidden />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#71917B]">
            Mission File
          </span>
        </div>

        <h3
          className={`font-display font-semibold tracking-wide text-[#E8FFF0] transition-colors group-hover:text-[#00FF55] ${
            large ? 'text-base sm:text-xl' : 'text-sm sm:text-base'
          }`}
        >
          {project.title}
        </h3>

        <p className={`mt-2 text-[#9fbfa8] ${large ? 'text-sm' : 'text-xs sm:text-sm'}`}>
          {project.description}
        </p>

        {project.features?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {project.features.slice(0, large ? 3 : 2).map((f) => (
              <li key={f} className="flex items-center gap-1.5 font-mono text-[0.65rem] text-[#E8FFF0]/75">
                <span className="text-[#00FF55]">▸</span> {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded border border-[#0a6b32] bg-[#050806]/60 px-2 py-0.5 font-mono text-[0.6rem] text-[#00D9FF]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <a
            href={project.githubUrl?.startsWith('https://') ? project.githubUrl : '#'}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-neon-outline !min-h-[2.5rem] !px-4 !text-[0.7rem]"
          >
            <Code2 size={14} aria-hidden />
            <span>Code</span>
          </a>
          <a
            href={project.demoUrl?.startsWith('https://') ? project.demoUrl : '#'}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-neon !min-h-[2.5rem] !px-4 !text-[0.7rem]"
          >
            <ExternalLink size={14} aria-hidden />
            <span>Case Study</span>
          </a>
        </div>
      </div>
    </article>
  )
}
