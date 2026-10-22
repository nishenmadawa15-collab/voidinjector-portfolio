import Section from './Section'
import { skills } from '../data/siteData'

export default function Skills() {
  return (
    <Section id="skills" index="05" title="Skills">
      <dl className="divide-y divide-line border-b border-line">
        {skills.map((g) => (
          <div key={g.group} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[12rem_1fr] sm:gap-8 lg:grid-cols-[14rem_1fr]">
            <dt className="label pt-1">{g.group}</dt>
            <dd className="m-0 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
