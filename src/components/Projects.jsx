import { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FolderKanban, Filter } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { projects, projectCategories } from '../data/siteData'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const filtersRef = useRef(null)
  const gridRef = useRef(null)
  const decoRef = useRef(null)
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return projects
    return projects.filter((p) => p.category === active)
  }, [active])

  const showFeatured = active === 'all'
  const featured = showFeatured ? filtered.filter((p) => p.featured) : []
  const rest = showFeatured ? filtered.filter((p) => !p.featured) : filtered

  // Intro + scroll animations
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set([headingRef.current, filtersRef.current], { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      const headingKids = headingRef.current ? Array.from(headingRef.current.children) : []
      tl.from(headingKids, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })

      const filterBtns = filtersRef.current?.querySelectorAll('[data-filter-btn]')
      if (filterBtns?.length) {
        tl.from(
          filterBtns,
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
            duration: 0.45,
            stagger: 0.06,
            ease: 'back.out(1.4)',
          },
          '-=0.35'
        )
      }

      if (decoRef.current) {
        tl.from(
          decoRef.current,
          { scaleX: 0, opacity: 0, duration: 0.8, ease: 'power2.inOut' },
          '-=0.4'
        )
      }

      gsap.utils.toArray('[data-float]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -14 : 14,
          x: i % 2 === 0 ? 8 : -8,
          duration: 2.8 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      })
    },
    { scope: sectionRef }
  )

  // Card enter when filter / list changes
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll('[data-project-card]')
      if (!cards?.length) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        cards,
        { y: 32, scale: 0.96 },
        {
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          onComplete: () => gsap.set(cards, { opacity: 1, visibility: 'visible' }),
        }
      )
      gsap.set(cards, { opacity: 1, visibility: 'visible' })
    },
    { scope: gridRef, dependencies: [active, filtered.map((p) => p.id).join(',')], revertOnUpdate: true }
  )

  const onFilter = (id) => {
    if (id === active) return
    setActive(id)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-24"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          data-float
          className="absolute left-[8%] top-[20%] h-40 w-40 rounded-full bg-[#00FF55]/5 blur-3xl"
        />
        <div
          data-float
          className="absolute right-[10%] top-[40%] h-56 w-56 rounded-full bg-[#00D9FF]/5 blur-3xl"
        />
        <div
          data-float
          className="absolute bottom-[15%] left-[40%] h-32 w-32 rounded-full bg-[#00FF55]/4 blur-2xl"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,85,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,85,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div ref={headingRef} className="mb-8 text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0a6b32] bg-[#07140c]/80 px-3 py-1">
            <FolderKanban className="h-3.5 w-3.5 text-[#00FF55]" />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00D9FF]">
              ARCHIVE // MISSIONS
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-wide text-[#E8FFF0] sm:text-3xl md:text-4xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-[#00FF55] via-[#00D9FF] to-[#a78bfa] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-[#71917B] sm:text-base">
            Cyber mission archive — large previews, HUD status, live filters
          </p>
        </div>

        <div
          ref={decoRef}
          className="mx-auto mb-8 h-px w-full max-w-md origin-center bg-gradient-to-r from-transparent via-[#00FF55]/50 to-transparent"
        />

        {/* Category filters */}
        <div
          ref={filtersRef}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Project categories"
        >
          <span className="mr-1 hidden items-center gap-1 font-mono text-[0.65rem] text-[#71917B] sm:inline-flex">
            <Filter size={12} className="text-[#00FF55]" />
            FILTER
          </span>
          {projectCategories.map((cat) => {
            const count =
              cat.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === cat.id).length
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                data-filter-btn
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilter(cat.id)}
                className={`relative overflow-hidden rounded-full border px-3.5 py-2 font-mono text-[0.7rem] tracking-wide transition-colors sm:px-4 sm:text-xs ${
                  isActive
                    ? 'border-[#00FF55] bg-[#00FF55]/15 text-[#00FF55] shadow-[0_0_20px_rgba(0,255,85,0.25)]'
                    : 'border-[#0a6b32] bg-[#050806]/50 text-[#71917B] hover:border-[#00FF55]/45 hover:text-[#E8FFF0]'
                }`}
              >
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 animate-pulse bg-[#00FF55]/5" />
                )}
                <span className="relative">{cat.label}</span>
                <span
                  className={`relative ml-1.5 rounded px-1 text-[0.6rem] ${
                    isActive ? 'bg-[#00FF55]/20 text-[#00FF55]' : 'bg-[#0a6b32]/40 text-[#71917B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Unified animated grid container */}
        <div ref={gridRef} className="space-y-5 lg:space-y-6">
          {showFeatured && featured.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
              {featured.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={projects.findIndex((p) => p.id === project.id)}
                  large
                />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div
              className={`grid gap-5 sm:grid-cols-2 lg:gap-6 ${
                rest.length === 1 ? 'mx-auto max-w-xl sm:grid-cols-1' : ''
              }`}
            >
              {rest.map((project) => (
                <ProjectCard
                  key={`${active}-${project.id}`}
                  project={project}
                  index={projects.findIndex((p) => p.id === project.id)}
                  large={!showFeatured && rest.length <= 2}
                />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="py-16 text-center font-mono text-sm text-[#71917B]">
              // No missions in this category
            </p>
          )}
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Missions', value: String(projects.length).padStart(2, '0') },
            { label: 'Domains', value: String(projectCategories.length - 1).padStart(2, '0') },
            { label: 'Stack Tags', value: '12+' },
            { label: 'Status', value: 'ONLINE' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[#0a6b32]/60 bg-[#07140c]/60 px-4 py-3 text-center transition-all duration-300 hover:border-[#00FF55]/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.1)]"
            >
              <p className="font-display text-lg font-bold text-[#00FF55] sm:text-xl">{s.value}</p>
              <p className="font-mono text-[0.6rem] tracking-widest text-[#71917B]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
