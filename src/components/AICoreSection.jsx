import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Shield, Network, Cpu, Eye, Lock, Building2, Users, Briefcase } from 'lucide-react'
import Reveal from './Reveal'
import OrbitNetwork from './OrbitNetwork'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const NODES = [
  { icon: Brain, label: 'AI Assist', sub: 'Threat intel', accent: '#00FF55' },
  { icon: Shield, label: 'Defense', sub: 'Hardened ops', accent: '#00D9FF' },
  { icon: Network, label: 'Network', sub: 'Live map', accent: '#a78bfa' },
  { icon: Eye, label: 'SOC View', sub: 'Signal first', accent: '#00FF55' },
  { icon: Cpu, label: 'Automate', sub: 'Playbooks', accent: '#00D9FF' },
  { icon: Lock, label: 'Zero Trust', sub: 'Access core', accent: '#a78bfa' },
]

const STATS = [
  { icon: Users, value: 16000, suffix: 'k+', label: 'Users & specialists', div: 1000 },
  { icon: Building2, value: 120, suffix: '+', label: 'Companies assessed', div: 1 },
  { icon: Briefcase, value: 48, suffix: '+', label: 'Active missions', div: 1 },
]

function LiveStat({ icon: Icon, value, suffix, label, div }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return
        started = true
        const start = performance.now()
        const dur = 1600
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.floor(value * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  const shown =
    div > 1
      ? `${(n / div).toFixed(n >= value ? 0 : 1).replace(/\.0$/, '')}${suffix}`
      : `${n}${suffix}`

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 rounded-xl border border-[#0a6b32] bg-[#07140c]/90 px-4 py-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00FF55]/30 bg-[#00FF55]/10 text-[#00FF55]">
        <Icon size={18} />
      </span>
      <div>
        <p className="font-display text-xl font-bold text-[#E8FFF0] sm:text-2xl">{shown}</p>
        <p className="font-mono text-[0.65rem] tracking-wide text-[#71917B]">{label}</p>
      </div>
    </div>
  )
}

export default function AICoreSection() {
  const root = useRef(null)
  const canvasRef = useRef(null)

  // Advanced neural canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let nodes = []
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 640 ? 22 : 40
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: 1.5 + Math.random() * 2.8,
        pulse: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.7 ? 'violet' : Math.random() > 0.45 ? 'cyan' : 'green',
      }))
    }

    resize()
    window.addEventListener('resize', resize)
    if (prefersReduced) return () => window.removeEventListener('resize', resize)

    const color = (hue, a) => {
      if (hue === 'cyan') return `rgba(0,217,255,${a})`
      if (hue === 'violet') return `rgba(167,139,250,${a})`
      return `rgba(0,255,85,${a})`
    }

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (document.hidden) return
      t = now * 0.001
      ctx.clearRect(0, 0, w, h)

      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.5)
      g.addColorStop(0, 'rgba(0,255,85,0.07)')
      g.addColorStop(0.35, 'rgba(167,139,250,0.06)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.04
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      const linkDist = w < 640 ? 120 : 160
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.4
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = color(a.hue, alpha)
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 2) {
        const a = nodes[i]
        const b = nodes[(i + 7) % nodes.length]
        const p = (Math.sin(t * 1.6 + i) + 1) / 2
        const x = a.x + (b.x - a.x) * p
        const y = a.y + (b.y - a.y) * p
        ctx.beginPath()
        ctx.arc(x, y, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = color(a.hue, 0.95)
        ctx.shadowColor = ctx.fillStyle
        ctx.shadowBlur = 12
        ctx.fill()
        ctx.shadowBlur = 0
      }

      for (const n of nodes) {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2)
        ctx.fillStyle = color(n.hue, 0.08 * glow)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = color(n.hue, 0.65 + 0.3 * glow)
        ctx.fill()
      }

      const cx = w / 2
      const cy = h / 2
      const coreR = 20 + Math.sin(t * 2.2) * 4
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
      core.addColorStop(0, 'rgba(0,255,85,0.5)')
      core.addColorStop(0.35, 'rgba(167,139,250,0.25)')
      core.addColorStop(1, 'transparent')
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(cx, cy, 60, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,255,85,0.85)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, coreR * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232,255,240,0.95)'
      ctx.fill()
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('[data-ai-card]', {
        y: 28,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
        onComplete: () => gsap.set('[data-ai-card]', { clearProps: 'opacity,transform' }),
      })
    },
    { scope: root }
  )

  return (
    <section
      id="ai-core"
      ref={root}
      className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF55]/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal delay={40}>
              <div className="badge-left-accent mb-4 inline-flex items-center gap-2">
                <Brain size={12} className="text-[#00FF55]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#00FF55]">
                  AI × Cyber Core
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#E8FFF0] sm:text-4xl md:text-5xl">
                Intelligence that
                <br />
                <span className="bg-gradient-to-r from-[#00FF55] via-[#00D9FF] to-[#a78bfa] bg-clip-text text-transparent">
                  defends in real time.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="max-w-md text-base leading-relaxed text-[#a8c4b0] lg:ml-auto lg:text-right">
              Built for users, companies, and security teams — AI-assisted analysis meets ethical
              hacking, with a living network of specialists and missions.
            </p>
          </Reveal>
        </div>

        {/* Live stats — customers / users / companies */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {STATS.map((s) => (
            <LiveStat key={s.label} {...s} />
          ))}
        </div>

        {/* Neural + Orbit side by side */}
        <div className="mb-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#00FF55]/25 bg-[#07140c]/85 shadow-[0_0_40px_rgba(0,255,85,0.1)]">
            <div className="absolute left-4 top-3 z-10 flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-[#00D9FF]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00FF55]" />
              NEURAL_LINK // LIVE
            </div>
            <canvas ref={canvasRef} className="h-[240px] w-full sm:h-[300px]" />
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-[#a78bfa]/30 bg-gradient-to-b from-[#0c1020]/95 to-[#050806] p-4 shadow-[0_0_40px_rgba(167,139,250,0.12)] sm:p-6">
            <p className="mb-2 text-center font-mono text-[0.65rem] tracking-[0.25em] text-[#a78bfa]">
              GLOBAL_NETWORK // USERS
            </p>
            <OrbitNetwork centerValue="16k+" centerLabel="Specialists" />
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {NODES.map((n) => {
            const Icon = n.icon
            return (
              <div
                key={n.label}
                data-ai-card
                className="group relative overflow-hidden rounded-xl border border-[#0a6b32] bg-[#07140c]/95 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00FF55]/55 hover:shadow-[0_0_28px_rgba(0,255,85,0.16)] sm:p-5"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl transition-transform duration-500 group-hover:scale-150"
                  style={{ background: n.accent }}
                />
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border bg-[#050806]/80 transition-all group-hover:shadow-[0_0_16px_rgba(0,255,85,0.3)]"
                  style={{ borderColor: `${n.accent}66`, color: n.accent }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-sm font-semibold tracking-wide text-[#E8FFF0] sm:text-base">
                  {n.label}
                </h3>
                <p className="mt-1 font-mono text-[0.7rem]" style={{ color: n.accent }}>
                  {n.sub}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
