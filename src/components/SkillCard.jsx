import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/** Animated skill / OS card with logo pulse + orbit ring */
export default function SkillCard({ item, variant = 'default' }) {
  const cardRef = useRef(null)
  const logoRef = useRef(null)
  const ringRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const { name, logo, desc, exp } = item
  const isOS = variant === 'os'

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card) return
      gsap.set(card, { opacity: 1, visibility: 'visible', clearProps: 'opacity' })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Idle logo float / OS ring spin
      gsap.to(logoRef.current, {
        y: isOS ? 0 : -4,
        duration: 1.6 + Math.random() * 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      if (isOS && ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 8,
          repeat: -1,
          ease: 'none',
        })
      }

      const onEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          borderColor: 'rgba(0,255,85,0.8)',
          boxShadow: '0 0 32px rgba(0,255,85,0.28), 0 12px 28px rgba(0,0,0,0.4)',
          duration: 0.28,
          overwrite: 'auto',
        })
        gsap.to(logoRef.current, {
          scale: 1.15,
          rotate: isOS ? 0 : 6,
          duration: 0.35,
          ease: 'back.out(1.6)',
          overwrite: 'auto',
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          borderColor: 'rgba(10,107,50,0.95)',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.32,
          overwrite: 'auto',
        })
        gsap.to(logoRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          overwrite: 'auto',
        })
      }
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: cardRef, dependencies: [name, isOS] }
  )

  const initial = (name || '?').charAt(0).toUpperCase()

  return (
    <div
      ref={cardRef}
      data-skill-card
      className={`skill-card group relative flex h-full flex-col items-center gap-3 rounded-xl border-2 border-[#0a6b32] bg-[#0a1410] p-4 sm:p-5 ${
        isOS ? 'min-h-[10rem] sm:min-h-[11rem]' : 'min-h-[8.25rem] sm:min-h-[9rem]'
      }`}
      style={{ opacity: 1, visibility: 'visible' }}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#00FF55]" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#00FF55]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#00D9FF]/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#00D9FF]/70" />

      <div className="relative flex items-center justify-center">
        {isOS && (
          <div
            ref={ringRef}
            className="pointer-events-none absolute h-[5.75rem] w-[5.75rem] rounded-full border border-dashed border-[#00D9FF]/40 sm:h-[6.5rem] sm:w-[6.5rem]"
            aria-hidden
          />
        )}
        <div
          ref={logoRef}
          className={`relative flex shrink-0 items-center justify-center rounded-xl border-2 border-[#00FF55]/4 bg-white p-2 shadow-[0_0_22px_rgba(0,255,85,0.2)] ${
            isOS
              ? 'h-[4.75rem] w-[4.75rem] sm:h-[5.5rem] sm:w-[5.5rem]'
              : 'h-[4.5rem] w-[4.5rem] sm:h-[5.25rem] sm:w-[5.25rem]'
          }`}
        >
          {!imgError && logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              width={80}
              height={80}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              loading="eager"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-display text-3xl font-bold text-[#00FF55]">{initial}</span>
          )}
        </div>
      </div>

      <div className="w-full text-center">
        <p className="font-display text-sm font-bold leading-tight tracking-wide text-white sm:text-base">
          {name}
        </p>
        {desc && (
          <p className="mt-1.5 text-xs leading-snug text-[#a8c4b0] sm:text-[0.8rem]">{desc}</p>
        )}
        {exp && (
          <span className="mt-2 inline-block rounded-md border border-[#00FF55]/50 bg-[#00FF55]/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-[#00FF55]">
            {exp}
          </span>
        )}
      </div>
    </div>
  )
}
