import Section from './Section'
import ExternalLink from './ExternalLink'
import { experience } from '../data/siteData'

export default function Experience() {
  return (
    <Section id="experience" index="01" title="Experience">
      <ol className="space-y-8">
        {experience.map((job) => (
          <li key={job.org + job.role} className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:gap-10">
            <div className="font-mono text-sm">
              <p className="text-mint">{job.period}</p>
              <p className="mt-1 text-muted">{job.duration}</p>
            </div>
            <article className="card p-5 sm:p-7">
              <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  {job.role} <span className="text-muted">·</span> {job.org}
                </h3>
              </header>
              <p className="mt-3 text-text-dim">{job.summary}</p>
              <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-text-dim">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-mint" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                {job.link ? <ExternalLink href={job.link.href}>{job.link.label}</ExternalLink> : null}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
