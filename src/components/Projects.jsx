import { Lock } from 'lucide-react'
import Section from './Section'
import ExternalLink from './ExternalLink'
import { projects } from '../data/siteData'

function StatusPill({ status }) {
  const tone = status === 'In development' ? 'pill-warn' : 'pill-ok'
  return <span className={`pill ${tone}`}>{status}</span>
}

function ProjectLinks({ project }) {
  if (project.links.length === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        {project.privateRepo ? 'Private repository' : 'No public link'}
      </span>
    )
  }
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
      {project.links.map((l) => (
        <li key={l.href}>
          <ExternalLink href={l.href}>{l.label}</ExternalLink>
        </li>
      ))}
    </ul>
  )
}

function Featured({ project }) {
  return (
    <article className="card card-hover overflow-hidden lg:grid lg:grid-cols-[1.1fr_1fr]">
      <a
        href={project.links[0]?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block border-b border-line bg-surface-2 lg:min-h-[22rem] lg:border-b-0 lg:border-r"
        aria-label={`${project.name} screenshot (opens GitHub in a new tab)`}
      >
        <img
          src={project.image.src}
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="w-full object-cover object-left-top lg:absolute lg:inset-0 lg:h-full"
        />
      </a>
      <div className="flex flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="label">{project.kind}</span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{project.name}</h3>
        <p className="mt-3 text-text-dim">{project.summary}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs text-text-dim" aria-label="Highlights">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-mint" aria-hidden="true">
                +
              </span>
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 lg:pt-6">
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

function Card({ project }) {
  return (
    <article className="card card-hover flex flex-col p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="label">{project.kind}</span>
        <StatusPill status={project.status} />
      </div>
      <h3 className="mt-3 font-display text-xl font-bold">{project.name}</h3>
      <p className="mt-2 text-[0.95rem] text-text-dim">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
        {project.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-line pt-4">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      intro="Security labs and web applications I have built. Links are shown where the code is public; private work is labelled as such."
    >
      <div className="space-y-6">
        {featured ? <Featured project={featured} /> : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rest.map((p) => (
            <Card key={p.id} project={p} />
          ))}
        </div>
      </div>
    </Section>
  )
}
