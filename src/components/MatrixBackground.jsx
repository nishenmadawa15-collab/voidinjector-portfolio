import { useEffect, useRef } from 'react'

/**
 * Canvas matrix rain — low opacity falling green characters.
 * Lightweight; pauses when tab hidden; respects prefers-reduced-motion.
 */
export default function MatrixBackground({
  opacity = 0.12,
  className = '',
  density = 0.85,
  speed = 0.65,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Static subtle grid only — no animation
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    let width = 0
    let height = 0
    let columns = 0
    let drops = []
    let fontSize = 14

    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>{}[]#$%&*@'

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fontSize = width < 640 ? 12 : 14
      columns = Math.floor(width / fontSize)
      drops = Array.from({ length: columns }, () => Math.random() * -40)
    }

    resize()
    window.addEventListener('resize', resize)

    let last = 0
    const frameInterval = 1000 / (30 * speed)

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw)
      if (document.hidden) return
      if (now - last < frameInterval) return
      last = now

      // Fade trail
      ctx.fillStyle = `rgba(5, 8, 6, ${0.08 + (1 - density) * 0.06})`
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px "Share Tech Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head brighter
        ctx.fillStyle = `rgba(0, 255, 85, ${0.55 * opacity * 8})`
        ctx.fillText(ch, x, y)

        // Dim trail char above
        if (y > fontSize) {
          ctx.fillStyle = `rgba(0, 180, 70, ${0.15 * opacity * 8})`
          ctx.fillText(
            chars[Math.floor(Math.random() * chars.length)],
            x,
            y - fontSize
          )
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += speed * (0.7 + Math.random() * 0.6)
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [opacity, density, speed])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,85,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,85,0.35) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />
      {/* Circuit-ish radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,85,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,217,255,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 20% 70%, rgba(0,255,85,0.05) 0%, transparent 50%)
          `,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity }} />
    </div>
  )
}
