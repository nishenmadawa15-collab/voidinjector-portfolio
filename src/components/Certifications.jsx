import { useState } from 'react'
import { Award } from 'lucide-react'
import Section from './Section'
import { certifications } from '../data/siteData'

function CertImage({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full border-b border-line bg-surface-2 text-left"
        aria-label={`View certificate: ${item.name}`}
      >
        <img
          src={item.image}
          width={item.w}
          height={item.h}
          alt={`${item.name} certificate`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </button>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.name} certificate`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
          <div className="max-h-full w-full max-w-4xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={item.image} width={item.w} height={item.h} alt={`${item.name} certificate, enlarged`} className="w-full" />
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function Certifications() {
  return (
    <Section id="certifications" index="04" title="Certifications">
      <div className="space-y-10">
        {certifications.map((group) => (
          <div key={group.group}>
            <h3 className="label mb-4">{group.group}</h3>
            <ul className={`grid gap-4 sm:grid-cols-2 ${group.cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {group.items.map((item) => (
                <li key={item.name} className="card card-hover flex flex-col overflow-hidden">
                  {item.image ? (
                    <CertImage item={item} />
                  ) : (
                    <div className="flex h-12 items-center border-b border-line bg-surface-2 px-4">
                      <Award className="h-4 w-4 text-mint" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-semibold leading-snug text-text">{item.name}</p>
                    {item.issuer ? <p className="mt-1 text-sm text-muted">{item.issuer}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
