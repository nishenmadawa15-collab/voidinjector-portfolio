import Section from './Section'
import { ctf } from '../data/siteData'

export default function CTF() {
  const h = ctf.headline
  return (
    <Section id="ctf" index="03" title="CTF & achievements" intro={`Competing as ${ctf.team}. ${ctf.practice}`}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:gap-6">
        <article className="card overflow-hidden sm:grid sm:grid-cols-[11rem_1fr] lg:grid-cols-1 xl:grid-cols-[13rem_1fr]">
          <div className="relative aspect-[16/10] border-b border-line bg-surface-2 sm:aspect-auto sm:min-h-[14rem] sm:border-b-0 sm:border-r lg:aspect-[16/9] lg:border-b lg:border-r-0 xl:aspect-auto xl:border-b-0 xl:border-r">
            <img
              src={h.image.src}
              width={h.image.width}
              height={h.image.height}
              alt={h.image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
            />
          </div>
          <div className="p-5 sm:p-6">
            <span className="label">Headline result · {h.year}</span>
            <h3 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              {h.result}
            </h3>
            <p className="mt-2 text-lg text-text">{h.event}</p>
            <p className="mt-1 text-sm text-muted">{h.host}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Challenge domains">
              {h.domains.map((d) => (
                <li key={d} className="chip">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="card divide-y divide-line">
          <div className="flex items-center justify-between px-5 py-3 sm:px-6">
            <span className="label">Other competitions</span>
            <span className="font-mono text-xs text-muted">{ctf.events.length}</span>
          </div>
          <ol className="divide-y divide-line">
            {ctf.events.map((e) => (
              <li key={e.event} className="px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold text-text">{e.event}</h3>
                  <span className="font-mono text-xs text-mint">
                    {e.scope}
                    {e.when ? ` · ${e.when}` : ''}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.host}</p>
                {e.note ? <p className="mt-1.5 text-sm text-text-dim">{e.note}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
