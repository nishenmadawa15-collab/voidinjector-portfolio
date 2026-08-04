import Reveal from './Reveal'

/** Shared shell for content sections over dark / video */
export default function GlassSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-20 sm:px-8 md:px-12 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <div className="mb-10 md:mb-14">
            {eyebrow && (
              <Reveal delay={80}>
                <div className="badge-left-accent mb-4 inline-block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
                    {eyebrow}
                  </span>
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={160}>
                <h2 className="text-3xl font-normal tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {subtitle && (
              <Reveal delay={240}>
                <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">{subtitle}</p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
