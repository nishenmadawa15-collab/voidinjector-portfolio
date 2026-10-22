import Section from './Section'
import { education, leadership } from '../data/siteData'

export default function Background() {
  return (
    <Section id="background" index="06" title="Education & leadership">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="card">
          <h3 className="label border-b border-line px-5 py-3 sm:px-6">Education</h3>
          <ol className="divide-y divide-line">
            {education.map((e) => (
              <li key={e.degree} className="px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold text-text">{e.degree}</p>
                  {e.period ? <span className="font-mono text-xs text-mint">{e.period}</span> : null}
                </div>
                <p className="mt-1 text-sm text-muted">{e.school}</p>
                {e.note ? <p className="mt-2 text-sm text-text-dim">{e.note}</p> : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="card">
          <h3 className="label border-b border-line px-5 py-3 sm:px-6">Leadership & community</h3>
          <ul className="divide-y divide-line">
            {leadership.map((l) => (
              <li key={l.role + l.org} className="px-5 py-4 sm:px-6">
                <p className="font-semibold text-text">{l.role}</p>
                <p className="mt-1 text-sm text-muted">{l.org}</p>
                <p className="mt-2 text-sm text-text-dim">{l.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
