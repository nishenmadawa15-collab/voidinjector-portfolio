import { identity, links } from '../data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} {identity.name} · {identity.handle}. Built with React and Vite, hosted on Netlify.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links
            .filter((l) => l.external)
            .map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-mint sm:min-h-0">
                  {l.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  )
}
