import { Download, Mail } from 'lucide-react'
import Section from './Section'
import ExternalLink from './ExternalLink'
import { identity, links } from '../data/siteData'

export default function Contact() {
  const mailto = `mailto:${identity.email}?subject=${encodeURIComponent('Hello from your portfolio')}`
  return (
    <Section
      id="contact"
      index="07"
      title="Contact"
      intro={`Open to ${identity.openToShort}. Email is the fastest way to reach me.`}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:gap-6">
        <div className="card p-5 sm:p-7">
          <p className="label">Direct</p>
          <a href={mailto} className="mt-3 inline-block break-all py-1 font-display text-[1.35rem] font-bold text-text hover:text-mint sm:text-2xl lg:text-3xl">
            {identity.email}
          </a>
          <p className="mt-3 text-sm text-muted">
            Based in {identity.location}. Languages: {identity.languages.join(', ')}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={mailto} className="btn btn-primary">
              <Mail aria-hidden="true" />
              Send an email
            </a>
            <a href={identity.resumeUrl} className="btn btn-ghost" download>
              <Download aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
        <div className="card">
          <p className="label border-b border-line px-5 py-3 sm:px-6">Profiles</p>
          <ul className="divide-y divide-line">
            {links.map((l) => (
              <li key={l.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3.5 sm:px-6">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">{l.label}</span>
                {l.external ? (
                  <ExternalLink href={l.href} className="link font-mono text-sm">
                    {l.value}
                  </ExternalLink>
                ) : (
                  <a href={l.href} className="link inline-flex min-h-11 items-center break-all font-mono text-sm">
                    {l.value}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
