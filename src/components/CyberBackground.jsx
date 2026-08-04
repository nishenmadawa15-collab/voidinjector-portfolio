import { useEffect, useRef } from 'react'

/**
 * Advanced animated cyber background:
 * - Multi-layer matrix rain (bright heads + cyan accent streams)
 * - Floating particles / energy orbs
 * - Moving grid + pulse rings
 * - Soft scroll parallax
 * Stays behind UI (pointer-events: none). Respects prefers-reduced-motion.
 */
export default function CyberBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY || 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: true })
    let w = 0
    let h = 0
    let dpr = 1

    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>{}[]#$%&*@0x'

    /** @type {{x:number,y:number,speed:number,len:number,cyan:boolean,size:number}[]} */
    let streams = []
    /** @type {{x:number,y:number,vx:number,vy:number,r:number,a:number,pulse:number}[]} */
    let particles = []
    let t = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const fontSize = w < 640 ? 13 : 16
      const cols = Math.floor(w / fontSize)
      streams = Array.from({ length: cols }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -h,
        speed: 1.2 + Math.random() * 2.8,
        len: 8 + Math.floor(Math.random() * 18),
        cyan: Math.random() > 0.82,
        size: fontSize,
      }))

      particles = Array.from({ length: w < 640 ? 28 : 48 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.55,
        r: 0.8 + Math.random() * 2.2,
        a: 0.25 + Math.random() * 0.55,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReduced) {
      // Static soft draw once
      ctx.fillStyle = '#050806'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(0,255,85,0.06)'
      for (let i = 0; i < 40; i++) {
        ctx.fillText(chars[i % chars.length], Math.random() * w, Math.random() * h)
      }
      return () => window.removeEventListener('resize', resize)
    }

    const drawGrid = (offset) => {
      const size = 48
      const ox = (offset * 0.08) % size
      const oy = (offset * 0.05) % size
      ctx.strokeStyle = 'rgba(0,255,85,0.07)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = -size + ox; x < w + size; x += size) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = -size + oy; y < h + size; y += size) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()
    }

    const drawRings = (time) => {
      const cx = w * 0.5
      const cy = h * 0.38 + Math.sin(time * 0.0004) * 12
      for (let i = 0; i < 4; i++) {
        const r = 60 + i * 70 + Math.sin(time * 0.001 + i) * 18
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0,255,85,${0.045 + i * 0.012})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
      // Core glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180)
      g.addColorStop(0, 'rgba(0,255,85,0.14)')
      g.addColorStop(0.4, 'rgba(0,217,255,0.05)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw)
      if (document.hidden) return
      t = now

      const parallax = scrollY.current * 0.12

      // Clear with trail
      ctx.fillStyle = 'rgba(5, 8, 6, 0.18)'
      ctx.fillRect(0, 0, w, h)

      // Base tint
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, 'rgba(5,12,8,0.35)')
      bg.addColorStop(0.5, 'rgba(5,8,6,0.1)')
      bg.addColorStop(1, 'rgba(3,10,8,0.45)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.translate(0, -parallax * 0.35)

      drawGrid(now * 0.02 + parallax)
      drawRings(now)

      // Matrix streams
      for (const s of streams) {
        const headY = s.y
        for (let j = 0; j < s.len; j++) {
          const y = headY - j * s.size
          if (y < -20 || y > h + 40) continue
          const fade = 1 - j / s.len
          const ch = chars[Math.floor(Math.random() * chars.length)]
          ctx.font = `${s.size}px "Share Tech Mono", monospace`
          if (j === 0) {
            ctx.fillStyle = s.cyan
              ? `rgba(180,255,255,${0.95})`
              : `rgba(180,255,200,${0.95})`
            ctx.shadowColor = s.cyan ? '#00D9FF' : '#00FF55'
            ctx.shadowBlur = 12
          } else if (j < 3) {
            ctx.shadowBlur = 0
            ctx.fillStyle = s.cyan
              ? `rgba(0,217,255,${0.55 * fade})`
              : `rgba(0,255,85,${0.6 * fade})`
          } else {
            ctx.shadowBlur = 0
            ctx.fillStyle = s.cyan
              ? `rgba(0,160,200,${0.22 * fade})`
              : `rgba(0,180,70,${0.25 * fade})`
          }
          ctx.fillText(ch, s.x, y)
        }
        ctx.shadowBlur = 0
        s.y += s.speed
        if (s.y - s.len * s.size > h) {
          s.y = -Math.random() * 120
          s.speed = 1.2 + Math.random() * 2.8
          s.cyan = Math.random() > 0.82
        }
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.04
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        const a = p.a * (0.55 + 0.45 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,85,${a})`
        ctx.fill()
        // small cyan ones
        if (p.r < 1.4) {
          ctx.beginPath()
          ctx.arc(p.x + 8, p.y + 4, p.r * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,217,255,${a * 0.7})`
          ctx.fill()
        }
      }

      // Horizontal data beams (occasional)
      if (Math.floor(now / 1800) % 2 === 0) {
        const by = ((now * 0.08) % (h + 40)) - 20
        const beam = ctx.createLinearGradient(0, by, w, by)
        beam.addColorStop(0, 'transparent')
        beam.addColorStop(0.4, 'rgba(0,255,85,0.12)')
        beam.addColorStop(0.5, 'rgba(0,217,255,0.2)')
        beam.addColorStop(0.6, 'rgba(0,255,85,0.12)')
        beam.addColorStop(1, 'transparent')
        ctx.fillStyle = beam
        ctx.fillRect(0, by, w, 2)
      }

      ctx.restore()

      // Vignette on top of animation
      const vig = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.2,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.72
      )
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(5,8,6,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050806]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Extra CSS floating orbs for depth */}
      <div className="cyber-orb cyber-orb-a" />
      <div className="cyber-orb cyber-orb-b" />
      <div className="cyber-orb cyber-orb-c" />
    </div>
  )
}
