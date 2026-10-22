import { ArrowDown, Download, Mail } from 'lucide-react'
import { identity, timeline } from '../data/siteData'

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="flex flex-col justify-center lg:justify-start lg:pt-6">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{identity.handle}</span>
            <span className="text-muted" aria-hidden="true">
              //
            </span>
            <span className="text-muted">{identity.location}</span>
          </p>

          <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {identity.name}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-text-dim sm:text-xl">
            {identity.headline}
            <span className="text-muted"> · </span>
            {identity.subline}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{identity.summary}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="btn btn-primary">
              View projects
              <ArrowDown aria-hidden="true" />
            </a>
            <a href={identity.resumeUrl} className="btn btn-ghost" download>
              <Download aria-hidden="true" />
              Download CV
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail aria-hidden="true" />
              Contact
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-muted">
            <span className="text-mint">status:</span> open to {identity.openToShort}
          </p>
        </div>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:items-start lg:flex lg:flex-col lg:pt-4">
          <figure className="card relative mx-auto w-full max-w-sm overflow-hidden md:mx-0 md:max-w-none">
            <img
              src={identity.photo.src}
              width={identity.photo.width}
              height={identity.photo.height}
              alt={identity.photo.alt}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top sm:aspect-square md:aspect-[4/5] lg:aspect-[5/4]"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 font-mono text-xs text-muted">
              <span>{identity.team}</span>
              <span className="text-mint">BSc (Hons) Cyber Security · SLTC</span>
            </figcaption>
          </figure>

          <div className="card overflow-hidden" aria-label="Recent milestones">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="label">capture.log</span>
              <span className="font-mono text-xs text-muted">{timeline.length} entries</span>
            </div>
            <ol className="divide-y divide-line/70 font-mono text-[0.8rem] leading-snug">
              {timeline.map((t, i) => (
                <li key={t.when + t.text} className="flex gap-3 px-4 py-2.5">
                  <span className="w-16 flex-none text-mint">{t.when}</span>
                  <span className={`text-text-dim ${i === 0 ? 'cursor' : ''}`}>{t.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
