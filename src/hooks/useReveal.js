import { useEffect, useRef, useState } from 'react'

/**
 * Fade-in when element enters viewport.
 * Stable deps — never re-create observer every render.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const threshold = options.threshold ?? 0.1
  const rootMargin = options.rootMargin ?? '0px 0px -10% 0px'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    // If already in view (e.g. fast load), show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible, className: `reveal${visible ? ' visible' : ''}` }
}
