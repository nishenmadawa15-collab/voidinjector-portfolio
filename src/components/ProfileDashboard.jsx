import { useEffect, useState } from 'react'
import {
  Lock,
  ShieldCheck,
  Terminal,
  Download,
  MapPin,
  Mail,
  Phone,
  Activity,
  Target,
  Cpu,
} from 'lucide-react'
import {
  personalInfo,
  profileFields,
  certificationBadges,
  programmingLanguages,
  developerTools,
  profileTabs,
  profileTabContent,
  whoAmIExtras,
  socialLinks,
  cyberExpertise,
} from '../data/siteData'
import { useReveal } from '../hooks/useReveal'
import { IconGithub, IconLinkedin, IconFlag, IconCube } from './SocialIcons'

function TechBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded border border-[#0a6b32] bg-[#050806]/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-[#00FF55] shadow-[0_0_8px_rgba(0,255,85,0.08)] transition-all hover:border-[#00FF55]/60 hover:shadow-[0_0_12px_rgba(0,255,85,0.2)]">
      {children}
    </span>
  )
}

function CornerAccents() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#00FF55]/70" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#00FF55]/70" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#00FF55]/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#00FF55]/70" />
    </>
  )
}

function ThreatMeter({ level }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(level), 200)
    return () => clearTimeout(t)
  }, [level])

  return (
    <div className="rounded-lg border border-[#0a6b32] bg-[#050806]/60 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wide text-[#00D9FF]">
          <Activity size={12} className="text-[#00FF55]" />
          THREAT_READINESS
        </span>
        <span className="font-mono text-xs font-bold text-[#00FF55]">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#0a6b32]/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00FF55] via-[#00D9FF] to-[#00FF55] shadow-[0_0_12px_rgba(0,255,85,0.5)] transition-all duration-1000 ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
      <p className="mt-1.5 font-mono text-[0.6rem] text-[#71917B]">{whoAmIExtras.clearance}</p>
    </div>
  )
}

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const heading = useReveal()
  const dash = useReveal()
  const tabKey = profileTabs[activeTab]
  const tabItems = profileTabContent[tabKey] || []

  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(0,255,85,0.06) 0%, transparent 40%),
              radial-gradient(circle at 90% 60%, rgba(0,217,255,0.04) 0%, transparent 35%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={heading.ref} className={`${heading.className} mb-10 text-center sm:mb-14`}>
          <h2 className="font-display text-2xl font-bold tracking-wide text-[#E8FFF0] sm:text-3xl md:text-4xl">
            {personalInfo.displayName}
          </h2>
          <p className="mt-3 font-display text-sm font-semibold tracking-wide sm:text-base md:text-lg">
            <span className="text-[#00FF55]">CYBERSECURITY</span>{' '}
            <span className="text-[#E8FFF0]/90">Undergraduate</span>
            <span className="text-[#71917B]"> | </span>
            <span className="text-[#00FF55]">Ethical Hacker &amp; Pentester</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-[#71917B]">
            {personalInfo.briefIntro}
          </p>
        </div>

        <div
          ref={dash.ref}
          className={`${dash.className} relative rounded-2xl border-2 border-[#0a6b32] bg-[#07140c]/95 p-3 shadow-[0_0_28px_rgba(0,255,85,0.08)] sm:p-5 md:p-6`}
          style={{ opacity: 1 }}
        >
          <CornerAccents />

          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            {/* LEFT — WHO AM I expanded */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="relative rounded-lg border border-[#0a6b32] bg-[#050806]/70 p-3 sm:p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#0a6b32]/50 pb-3">
                  <span className="hud-label flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#00FF55]" />
                    STATUS: USER_ONLINE
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-wide text-[#00D9FF]/90">
                    WHO AM I ??
                  </span>
                </div>

                <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded border border-[#0a6b32] bg-[#07140c] sm:h-36 sm:w-36">
                    <img
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.displayName} profile`}
                      className="h-full w-full object-cover object-top"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,85,0.08) 2px, rgba(0,255,85,0.08) 3px)',
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00FF55]/15 via-transparent to-transparent" />
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p className="font-mono text-[0.6rem] tracking-[0.18em] text-[#00D9FF]">
                      IDENTITY_FILE
                    </p>
                    <h3 className="mt-1 break-words font-display text-base font-bold leading-snug text-[#00FF55] sm:text-lg">
                      {personalInfo.displayName}
                    </h3>
                    <p className="mt-1 break-words font-body text-sm text-[#E8FFF0]/85">
                      {personalInfo.role}
                    </p>
                    <p className="mt-0.5 break-words font-mono text-xs text-[#71917B]">
                      {personalInfo.job}
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-1 sm:justify-start">
                      {whoAmIExtras.aliases.map((a) => (
                        <span
                          key={a}
                          className="rounded border border-[#00D9FF]/30 px-1.5 py-0.5 font-mono text-[0.55rem] text-[#00D9FF]"
                        >
                          @{a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats grid — NEW */}
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {whoAmIExtras.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded border border-[#0a6b32]/50 bg-[#07140c]/70 px-1 py-2 text-center"
                    >
                      <p className="font-display text-sm font-bold text-[#00FF55] sm:text-base">
                        {s.value}
                      </p>
                      <p className="font-mono text-[0.5rem] tracking-wide text-[#71917B] sm:text-[0.55rem]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Threat meter — NEW */}
                <div className="mb-3">
                  <ThreatMeter level={whoAmIExtras.threatLevel} />
                </div>

                {/* Profile fields */}
                <div className="space-y-2.5 rounded-md border border-[#0a6b32]/40 bg-[#07140c]/50 p-3 font-mono text-[0.75rem] sm:text-xs">
                  {profileFields.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col gap-0.5 border-b border-[#0a6b32]/25 pb-2 last:border-b-0 last:pb-0 sm:flex-row sm:gap-3"
                    >
                      <span className="shrink-0 font-semibold tracking-wide text-[#00D9FF] sm:w-[7.25rem]">
                        {f.label}
                      </span>
                      <span className="min-w-0 break-words text-[#E8FFF0]">
                        <span className="mr-1.5 hidden text-[#71917B] sm:inline">:</span>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Focus / languages / interests — NEW */}
                <div className="mt-3 space-y-2 rounded-md border border-[#0a6b32]/40 bg-[#07140c]/40 p-3">
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 font-mono text-[0.6rem] tracking-wide text-[#00D9FF]">
                      <Target size={10} /> CAREER_FOCUS
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {whoAmIExtras.focus.map((f) => (
                        <TechBadge key={f}>{f}</TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 font-mono text-[0.6rem] tracking-wide text-[#00D9FF]">
                      LANGUAGES
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {whoAmIExtras.languages.map((l) => (
                        <TechBadge key={l}>{l}</TechBadge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 font-mono text-[0.6rem] tracking-wide text-[#00D9FF]">
                      INTERESTS
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {whoAmIExtras.interests.map((i) => (
                        <TechBadge key={i}>{i}</TechBadge>
                      ))}
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 border-t border-[#0a6b32]/40 pt-2 font-mono text-[0.65rem] text-[#00FF55]">
                    <Cpu size={11} />
                    {whoAmIExtras.availability}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-1.5 border-t border-[#0a6b32]/50 pt-3 font-mono text-[0.7rem] text-[#71917B] sm:grid-cols-3 sm:gap-2 sm:text-[0.65rem]">
                  <div className="break-words">
                    <span className="text-[#00D9FF]">Kernel</span>
                    <span className="mx-1">:</span>
                    {personalInfo.kernel}
                  </div>
                  <div className="break-words">
                    <span className="text-[#00D9FF]">Host</span>
                    <span className="mx-1">:</span>
                    {personalInfo.hostname}
                  </div>
                  <div className="break-words">
                    <span className="text-[#00D9FF]">Arch</span>
                    <span className="mx-1">:</span>
                    {personalInfo.architecture}
                  </div>
                </div>
              </div>

              {/* Bio card */}
              <div className="relative rounded-lg border border-[#0a6b32] bg-[#050806]/70 p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-display text-sm font-semibold text-[#E8FFF0] sm:text-base">
                    Hello I am {personalInfo.displayName}
                  </h3>
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#00FF55]/70" aria-hidden />
                </div>
                <p className="whitespace-pre-line font-body text-sm leading-relaxed text-[#71917B]">
                  {personalInfo.bio}
                </p>

                <div className="mt-3 space-y-1.5 font-mono text-[0.7rem] text-[#71917B]">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-[#00D9FF]" /> {personalInfo.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-[#00D9FF]" />
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-[#E8FFF0]/85 hover:text-[#00FF55]"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-[#00D9FF]" />
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                      className="text-[#E8FFF0]/85 hover:text-[#00FF55]"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded border border-[#0a6b32] text-[#00FF55] transition-all hover:border-[#00FF55] hover:shadow-[0_0_10px_rgba(0,255,85,0.3)]"
                      aria-label="LinkedIn"
                    >
                      <IconLinkedin size={14} />
                    </a>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded border border-[#0a6b32] text-[#00FF55] transition-all hover:border-[#00FF55] hover:shadow-[0_0_10px_rgba(0,255,85,0.3)]"
                      aria-label="GitHub"
                    >
                      <IconGithub size={14} />
                    </a>
                    <a
                      href={socialLinks.tryhackme}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded border border-[#0a6b32] text-[#00FF55] transition-all hover:border-[#00FF55] hover:shadow-[0_0_10px_rgba(0,255,85,0.3)]"
                      aria-label="TryHackMe"
                    >
                      <IconFlag size={14} />
                    </a>
                    <a
                      href={socialLinks.hackthebox}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded border border-[#0a6b32] text-[#00FF55] transition-all hover:border-[#00FF55] hover:shadow-[0_0_10px_rgba(0,255,85,0.3)]"
                      aria-label="HackTheBox"
                    >
                      <IconCube size={14} />
                    </a>
                  </div>
                  <a
                    href={personalInfo.resumeUrl}
                    download="Nishen_Madava_CV.pdf"
                    className="btn-neon inline-flex items-center gap-2 !min-h-[2.5rem] !px-4 !text-[0.7rem]"
                  >
                    <Download size={14} aria-hidden />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {profileTabs.map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`rounded border px-3 py-1.5 font-mono text-[0.65rem] tracking-wide transition-all sm:text-xs ${
                      activeTab === i
                        ? 'border-[#00FF55] bg-[#00FF55]/15 text-[#00FF55] shadow-[0_0_12px_rgba(0,255,85,0.2)]'
                        : 'border-[#0a6b32] text-[#71917B] hover:border-[#00FF55]/50 hover:text-[#E8FFF0]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 border-b border-[#0a6b32]/60 pb-2">
                <ShieldCheck className="h-4 w-4 text-[#00D9FF]" />
                <span className="font-mono text-xs tracking-widest text-[#00D9FF]">
                  WHO AM I / ??
                </span>
                <span className="ml-auto font-mono text-[0.6rem] text-[#71917B]">
                  {tabKey} // MODULE
                </span>
              </div>

              {/* Dynamic tab module — NEW */}
              <div className="rounded-lg border border-[#00FF55]/25 bg-[#050806]/60 p-3 sm:p-4">
                <h4 className="mb-3 font-display text-sm font-semibold text-[#00FF55]">
                  {tabKey} module
                </h4>
                <ul className="space-y-2">
                  {tabItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded border border-[#0a6b32]/40 bg-[#07140c]/50 px-3 py-2 font-mono text-[0.7rem] text-[#E8FFF0]/90 sm:text-xs"
                    >
                      <span className="mt-0.5 text-[#00FF55]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#0a6b32] bg-[#050806]/50 p-3 sm:p-4">
                <h4 className="mb-3 font-display text-sm font-semibold text-[#00FF55]">
                  Certification Achieved
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificationBadges.map((c) => (
                    <TechBadge key={c}>{c}</TechBadge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#0a6b32] bg-[#050806]/50 p-3 sm:p-4">
                <h4 className="mb-3 font-display text-sm font-semibold text-[#00FF55]">
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {programmingLanguages.map((lang) => (
                    <TechBadge key={lang}>{lang}</TechBadge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#0a6b32] bg-[#050806]/50 p-3 sm:p-4">
                <h4 className="mb-3 font-display text-sm font-semibold text-[#00FF55]">
                  Developer Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {developerTools.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#0a6b32] bg-[#050806]/50 p-3 sm:p-4">
                <h4 className="mb-3 font-display text-sm font-semibold text-[#00FF55]">
                  Cybersecurity Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cyberExpertise.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-[#71917B]">
                  <Terminal size={12} className="text-[#00D9FF]" />
                  {personalInfo.kernel}
                </span>
                <a
                  href="#certifications"
                  className="btn-neon-outline inline-flex items-center gap-2 !min-h-[2.5rem] !px-4 !text-[0.7rem]"
                >
                  <span>Explore Certifications</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
