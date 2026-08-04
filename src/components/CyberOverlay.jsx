import MatrixBackground from './MatrixBackground'

/**
 * Static cyber background — replaces scroll video.
 * Subtle matrix + green grade (readable, no heavy scrub motion).
 */
export default function CyberOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050806]" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 20%, rgba(0,255,85,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,217,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 15% 70%, rgba(0,255,85,0.05) 0%, transparent 45%),
            linear-gradient(180deg, #050806 0%, #07140c 50%, #050806 100%)
          `,
        }}
      />

      {/* Soft matrix rain — low opacity */}
      <div className="absolute inset-0 opacity-30">
        <MatrixBackground opacity={0.28} density={0.55} speed={0.45} />
      </div>

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,85,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,85,0.45) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
    </div>
  )
}
