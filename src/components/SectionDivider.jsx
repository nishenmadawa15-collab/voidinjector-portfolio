/** Premium cyber section separator */
export default function SectionDivider({ label = 'MODULE' }) {
  return (
    <div className="relative flex items-center gap-4 px-5 py-2 sm:px-8 md:px-12" aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00FF55]/40 to-transparent" />
      <span className="font-mono text-[0.6rem] tracking-[0.35em] text-[#00D9FF]/70">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00D9FF]/30 to-transparent" />
    </div>
  )
}
