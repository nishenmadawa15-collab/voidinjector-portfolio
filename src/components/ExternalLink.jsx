import { ArrowUpRight } from 'lucide-react'

/** Text link that opens in a new tab, with icon and screen-reader hint. */
export default function ExternalLink({ href, children, className = 'link' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} inline-flex min-h-11 items-center gap-1`}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
