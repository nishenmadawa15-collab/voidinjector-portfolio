import { useReveal } from '../hooks/useReveal'

/**
 * Section shell: numbered mono label, heading, optional intro, content.
 * Renders a semantic <section> with an aria-labelledby heading.
 */
export default function Section({ id, index, title, intro, children, className = '' }) {
  const reveal = useReveal()
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={reveal.ref} className={reveal.className}>
          <div className="mb-8 flex items-start gap-4 border-b border-line pb-5 sm:mb-10">
            <span className="label pt-1.5" aria-hidden="true">
              {index}
            </span>
            <div className="min-w-0">
              <h2 id={headingId} className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h2>
              {intro ? <p className="mt-2 max-w-2xl text-text-dim">{intro}</p> : null}
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
