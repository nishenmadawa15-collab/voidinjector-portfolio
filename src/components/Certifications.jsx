import { useState } from 'react'
import { X, Award } from 'lucide-react'
import { certifications } from '../data/siteData'
import { useReveal } from '../hooks/useReveal'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'academic', label: 'Academic' },
  { id: 'online', label: 'Online' },
]

export default function Certifications() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const heading = useReveal()
  const grid = useReveal()

  const list =
    filter === 'all' ? certifications : certifications.filter((c) => c.category === filter)

  return (
    <section id="certifications" className="relative py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={heading.ref} className={`${heading.className} mb-8 text-center sm:mb-12`}>
          <h2 className="font-display text-2xl font-bold tracking-wide text-[#E8FFF0] sm:text-3xl md:text-4xl">
            Certifications &amp; Achievements
          </h2>
          <p className="mt-3 font-body text-sm text-[#71917B] sm:text-base">
            Professional credentials and academic accomplishments
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide transition-all ${
                filter === f.id
                  ? 'border-[#00FF55] bg-[#00FF55]/15 text-[#00FF55] shadow-[0_0_12px_rgba(0,255,85,0.2)]'
                  : 'border-[#0a6b32] text-[#71917B] hover:border-[#00FF55]/50 hover:text-[#E8FFF0]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          ref={grid.ref}
          className={`${grid.className} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {list.map((cert) => (
            <article
              key={cert.name + cert.issuer}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#0a6b32] bg-[#07140c]/85 transition-all duration-300 hover:-translate-y-1 hover:border-[#00FF55]/45 hover:shadow-[0_8px_28px_rgba(0,255,85,0.12)]"
            >
              <button
                type="button"
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#050806] text-left"
                onClick={() => setLightbox(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/80 to-transparent opacity-60" />
              </button>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[#00D9FF]">
                  {cert.category}
                </span>
                <h3 className="font-display text-sm font-semibold leading-snug text-[#E8FFF0]">
                  {cert.name}
                </h3>
                <p className="font-body text-xs text-[#71917B]">{cert.issuer}</p>
                <button
                  type="button"
                  onClick={() => setLightbox(cert)}
                  className="btn-neon-outline btn-cert"
                >
                  <Award size={14} aria-hidden />
                  <span>View Certificate</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.name}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#0a6b32] text-[#00FF55] hover:border-[#00FF55]"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox.image}
            alt={lightbox.name}
            className="max-h-[85vh] max-w-full rounded-lg border border-[#0a6b32] object-contain shadow-[0_0_40px_rgba(0,255,85,0.15)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
