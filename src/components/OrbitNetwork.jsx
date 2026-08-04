import { useEffect, useRef, useState } from 'react'

/**
 * Live orbital network — inspired by specialists/users UI,
 * styled in cyber green + cyan + violet (company-friendly palette).
 */
const ORBIT_ITEMS = [
  { type: 'avatar', label: 'N', color: '#00FF55' },
  { type: 'icon', label: '🛡', color: '#00D9FF' },
  { type: 'avatar', label: 'A', color: '#a78bfa' },
  { type: 'icon', label: '⚡', color: '#00FF55' },
  { type: 'avatar', label: 'S', color: '#00D9FF' },
  { type: 'icon', label: '🔐', color: '#a78bfa' },
  { type: 'avatar', label: 'C', color: '#00FF55' },
  { type: 'icon', label: '◎', color: '#00D9FF' },
]

export default function OrbitNetwork({
  centerValue = '16k+',
  centerLabel = 'Specialists',
  className = '',
}) {
  const root = useRef(null)
  const [count, setCount] = useState(0)
  const [angle, setAngle] = useState(0)

  // Live counter
  useEffect(() => {
    const target = 16000
    const start = performance.now()
    const dur = 1800
    let raf = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Continuous orbit rotation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = performance.now()
    const loop = (now) => {
      const dt = now - last
      last = now
      setAngle((a) => a + dt * 0.012)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const display =
    count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k+` : `${count}+`

  const rings = [28, 42, 56, 70]
  const size = 320

  return (
    <div
      ref={root}
      className={`relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px] ${className}`}
      style={{ minHeight: size }}
    >
      {/* Purple-cyan ambient like reference, cyber-tinted */}
      <div
        className="absolute inset-0 rounded-full opacity-90"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(0,255,85,0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(167,139,250,0.18) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(0,40,80,0.5) 0%, #050806 70%)
          `,
        }}
      />

      {/* Concentric rings */}
      {rings.map((pct, i) => (
        <div
          key={pct}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${pct * 2}%`,
            height: `${pct * 2}%`,
            borderColor:
              i % 2 === 0 ? 'rgba(0,255,85,0.2)' : 'rgba(167,139,250,0.25)',
            boxShadow:
              i === rings.length - 1 ? '0 0 40px rgba(0,255,85,0.08)' : undefined,
          }}
        />
      ))}

      {/* Orbiting nodes */}
      {ORBIT_ITEMS.map((item, i) => {
        const radius = 28 + (i % 3) * 14
        const a = angle + (i / ORBIT_ITEMS.length) * Math.PI * 2
        const x = 50 + Math.cos(a) * radius
        const y = 50 + Math.sin(a) * radius
        return (
          <div
            key={i}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border shadow-[0_0_16px_rgba(0,0,0,0.4)] backdrop-blur-md sm:h-12 sm:w-12"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              borderColor: `${item.color}55`,
              background: 'rgba(7,20,12,0.9)',
              boxShadow: `0 0 14px ${item.color}33`,
            }}
          >
            {item.type === 'avatar' ? (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#050806] sm:h-8 sm:w-8 sm:text-sm"
                style={{ background: item.color }}
              >
                {item.label}
              </span>
            ) : (
              <span className="text-base sm:text-lg" style={{ color: item.color }}>
                {item.label}
              </span>
            )}
          </div>
        )
      })}

      {/* Center counter */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,255,85,0.4)] sm:text-4xl">
          {centerValue === '16k+' ? display : centerValue}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] tracking-[0.2em] text-white/70 uppercase">
          {centerLabel}
        </p>
      </div>
    </div>
  )
}
