import { Hexagon } from 'lucide-react'
import { personalInfo, socialLinks, navLinks } from '../data/siteData'
import { IconGithub, IconLinkedin, IconFlag, IconCube } from './SocialIcons'
import Reveal from './Reveal'

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-8 border-t border-[#00FF55]/15 px-5 pt-16 pb-10 sm:px-8 md:px-12">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#00FF55]/10 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal delay={80}>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group flex items-center gap-2"
          >
            <Hexagon
              size={26}
              strokeWidth={1.5}
              className="text-[#00FF55] drop-shadow-[0_0_12px_rgba(0,255,85,0.5)] transition-transform group-hover:rotate-12"
            />
            <span className="font-display text-base font-semibold tracking-[0.2em] text-[#00FF55]">
              voidinjector
            </span>
          </a>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-3 max-w-md text-sm text-[#71917B]">
            Cyber Security Undergraduate · Ethical Hacker · CTF Competitor
          </p>
        </Reveal>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-1" aria-label="Footer">
          {navLinks.map((link, i) => (
            <Reveal key={link.id} delay={180 + i * 50}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                className="nav-link-cyber px-3 py-1.5 text-sm text-[#E8FFF0]/70"
              >
                {link.label}
              </button>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={360}>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: socialLinks.linkedin, icon: IconLinkedin, label: 'LinkedIn' },
              { href: socialLinks.github, icon: IconGithub, label: 'GitHub' },
              { href: socialLinks.tryhackme, icon: IconFlag, label: 'TryHackMe' },
              { href: socialLinks.hackthebox, icon: IconCube, label: 'HackTheBox' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0a6b32] bg-[#07140c]/80 text-[#00FF55] transition-all duration-300 hover:border-[#00FF55] hover:shadow-[0_0_14px_rgba(0,255,85,0.35)]"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </Reveal>

        <p className="mt-10 font-mono text-[10px] tracking-wide text-[#71917B]/80 uppercase">
          Copyright © 2024–2026 {personalInfo.displayName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
