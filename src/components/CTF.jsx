import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Flag,
  ExternalLink,
  Terminal,
  Bot,
  Send,
  Radio,
  ShieldCheck,
  MapPin,
  GraduationCap,
} from 'lucide-react'
import {
  ctfPlatforms,
  leadership,
  ctfBotCommands,
  socialLinks,
} from '../data/siteData'
import { useReveal } from '../hooks/useReveal'
import { useLiveFeed } from '../hooks/useLiveFeed'
import { safeHref } from '../utils/security'
import { IconFlag, IconCube, IconLinkedin } from './SocialIcons'

function TerminalMatrixBg() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let drops = []
    let raf = 0
    const chars = '01アイウエオCTFFLAG#$%<>voidinjectorN4X'

    const resize = () => {
      const parent = canvas.parentElement
      w = parent?.clientWidth || 400
      h = parent?.clientHeight || 400
      canvas.width = w
      canvas.height = h
      drops = Array.from({ length: Math.floor(w / 12) }, () => Math.random() * h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (document.hidden) return
      ctx.fillStyle = 'rgba(3, 8, 5, 0.14)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = '11px monospace'
      for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = i % 7 === 0 ? 'rgba(0,217,255,0.3)' : 'rgba(0,255,85,0.25)'
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 12, drops[i])
        drops[i] += 4 + Math.random() * 5
        if (drops[i] > h && Math.random() > 0.97) drops[i] = 0
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 opacity-35" aria-hidden />
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Build full archive as log lines (code + flag cards + links) */
function buildFullArchiveLines(ctfEvents, linkedinCtfPosts) {
  const lines = []
  const add = (type, text, extra = {}) => lines.push({ id: makeId(), type, text, ...extra })

  add('code', '# ═══════════════════════════════════════════')
  add('code', '#  CTF EVENTS ARCHIVE  — flags.db (live feed)')
  add('code', '# ═══════════════════════════════════════════')
  add('code', '')

  ctfEvents.forEach((ev, i) => {
    const id = `FLAG_${String(i + 1).padStart(2, '0')}`
    add('code', `// ── ${id} ──────────────────────────────`)
    add('code', `flag[${i}] = {`)
    add('code', `  id:          "${id}",`)
    add('code', `  title:       "${ev.title}",`)
    if (ev.place) add('code', `  place:       "${ev.place}",`)
    if (ev.team) add('code', `  team:        "${ev.team}",`)
    if (ev.date) add('code', `  date:        "${ev.date}",`)
    add('code', `  tags:        [${(ev.tags || []).map((t) => `"${t}"`).join(', ')}],`)
    if (ev.linkedinUrl) add('code', `  linkedin:    "${ev.linkedinUrl}",`)
    add('code', `  description: "${(ev.description || '').replace(/"/g, '\\"')}",`)
    add('code', `}`)
    add('flagcard', '', { event: ev, flagId: id })
    if (ev.linkedinUrl) {
      add('link', ev.linkedinUrl, { href: safeHref(ev.linkedinUrl) })
    }
    add('code', '')
  })

  add('code', '# ═══════════════════════════════════════════')
  add('code', '#  LINKEDIN CTF POSTS  — live-feed.json')
  add('code', '# ═══════════════════════════════════════════')
  add('code', '')

  linkedinCtfPosts.forEach((p, i) => {
    add('code', `// ── POST_${String(i + 1).padStart(2, '0')} ──────────────────────────`)
    add('code', `post[${i}] = {`)
    add('code', `  title:     "${p.title}",`)
    add('code', `  date:      "${p.date || ''}",`)
    if (p.reactions) add('code', `  reactions: "${p.reactions}",`)
    add('code', `  tags:      [${(p.tags || []).map((t) => `"${t}"`).join(', ')}],`)
    add('code', `  url:       "${p.url}",`)
    add('code', `}`)
    add('link', p.url, { href: safeHref(p.url) })
    add('code', '')
  })

  add('ok', `[dump complete] ${ctfEvents.length} flags · ${linkedinCtfPosts.length} LinkedIn posts · live`)
  return lines
}

export default function CTF() {
  const term = useReveal({ rootMargin: '0px 0px 20% 0px', threshold: 0.05 })
  const lead = useReveal()
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const started = useRef(false)
  const feed = useLiveFeed()
  const ctfEvents = feed.ctfEvents
  const linkedinCtfPosts = feed.linkedinCtfPosts
  const linkedinProfile = feed.linkedinProfile
  const feedRef = useRef(feed)
  feedRef.current = feed

  const [log, setLog] = useState([])
  const [typed, setTyped] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [accessAnim, setAccessAnim] = useState(false)
  const [authPct, setAuthPct] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 480)
    return () => clearInterval(id)
  }, [])

  // Auto-scroll terminal to bottom as lines appear
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [log, typed, accessAnim])

  const push = useCallback((line) => {
    setLog((prev) => [...prev, { id: makeId(), ...line }])
  }, [])

  const pushMany = useCallback((lines) => {
    setLog((prev) => [...prev, ...lines.map((l) => ({ id: l.id || makeId(), ...l }))])
  }, [])

  const typeLine = useCallback(
    (text) =>
      new Promise((resolve) => {
        setTyped('')
        let i = 0
        const tick = () => {
          i++
          setTyped(text.slice(0, i))
          if (i < text.length) setTimeout(tick, 14 + Math.random() * 16)
          else {
            push({ type: 'cmd', text })
            setTyped('')
            resolve()
          }
        }
        tick()
      }),
    [push]
  )

  const dumpAllAsCode = useCallback(() => {
    const f = feedRef.current
    pushMany(buildFullArchiveLines(f.ctfEvents, f.linkedinCtfPosts))
  }, [pushMany])

  const runAccessSequence = useCallback(async () => {
    setAccessAnim(true)
    setAuthPct(0)
    for (let p = 0; p <= 100; p += 5) {
      setAuthPct(p)
      await wait(22)
    }
    push({ type: 'sys', text: '[auth] handshake · RSA-4096 · voidinjector' })
    await wait(80)
    push({ type: 'sys', text: '[auth] Nishen Madava · verified' })
    await wait(70)
    push({ type: 'sys', text: '[auth] linkedin.com/in/nishen-madava · OK' })
    await wait(80)
    push({ type: 'sys', text: '[sync] ANIMUS · IIT · CyberQuest posts…' })
    await wait(100)
    pushMany([
      { type: 'ok', text: '╔════════════════════════════════════════════╗' },
      { type: 'ok', text: '║          ★  ACCESS GRANTED  ★              ║' },
      { type: 'ok', text: '║  USER      : Nishen Madava / voidinjector  ║' },
      { type: 'ok', text: '║  TEAM      : N4X · ANIMUS 1.0 · 5th Place  ║' },
      { type: 'ok', text: '║  LINKEDIN  : /in/nishen-madava             ║' },
      { type: 'ok', text: '║  CLEARANCE : CTF_OPS // GREEN              ║' },
      { type: 'ok', text: '╚════════════════════════════════════════════╝' },
      { type: 'link', text: socialLinks.linkedin, href: socialLinks.linkedin },
    ])
    setAccessGranted(true)
    setAccessAnim(false)
    setAuthPct(100)
  }, [push, pushMany])

  // Boot: access → linkedin curl → full code dump of every section
  useEffect(() => {
    if (!term.visible || started.current) return
    started.current = true
    let cancelled = false

    const boot = async () => {
      setBusy(true)
      await wait(120)
      if (cancelled) return
      push({ type: 'sys', text: '[boot] VOIDINJECTOR CTF ACCESS v4.2' })
      await wait(140)
      push({ type: 'bot', text: 'ctf-bot online · matrix channel open' })
      await wait(120)
      await typeLine('whoami')
      if (cancelled) return
      push({ type: 'out', text: ctfBotCommands.whoami })
      await wait(100)
      await typeLine('access --module ctf --full')
      if (cancelled) return
      await runAccessSequence()
      if (cancelled) return
      await wait(120)
      await typeLine('curl -s linkedin.com/in/nishen-madava')
      if (cancelled) return
      const lp = feedRef.current.linkedinProfile
      pushMany([
        { type: 'out', text: `NAME     : ${lp.name}` },
        { type: 'out', text: `HEADLINE : ${lp.headline}` },
        { type: 'out', text: `EDU      : ${lp.education}` },
        { type: 'out', text: `ORG      : ${lp.org}` },
        {
          type: 'link',
          text: lp.profileUrl,
          href: safeHref(lp.profileUrl, socialLinks.linkedin),
        },
      ])
      await wait(120)
      await typeLine('cat flags.db && cat /data/live-feed.json')
      if (cancelled) return
      dumpAllAsCode()
      const liveTag = feedRef.current.live ? 'LIVE' : 'STATIC'
      push({
        type: 'bot',
        text: `archive ${liveTag} · scroll terminal · type help | full | linkedin`,
      })
      setBusy(false)
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [term.visible, push, pushMany, typeLine, runAccessSequence, dumpAllAsCode])

  const runCommand = async (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd || busy) return
    setBusy(true)
    setInput('')
    push({ type: 'cmd', text: cmd })
    await wait(50)

    if (cmd === 'clear') {
      setLog([])
      push({ type: 'sys', text: '[bot] buffer cleared — type full to reload archive' })
    } else if (cmd === 'help' || cmd === '?') {
      push({ type: 'bot', text: ctfBotCommands.help })
      push({ type: 'bot', text: 'Also: full | dump | posts | access' })
    } else if (cmd === 'whoami') {
      push({ type: 'out', text: ctfBotCommands.whoami })
    } else if (cmd === 'profile') {
      push({ type: 'out', text: ctfBotCommands.profile })
      push({
        type: 'link',
        text: linkedinProfile.profileUrl,
        href: safeHref(linkedinProfile.profileUrl, socialLinks.linkedin),
      })
    } else if (cmd === 'flags' || cmd === 'list flags' || cmd === 'full' || cmd === 'dump') {
      dumpAllAsCode()
    } else if (cmd === 'linkedin' || cmd === 'li' || cmd === 'posts') {
      push({ type: 'out', text: ctfBotCommands.linkedin || 'LinkedIn CTF posts:' })
      push({
        type: 'sys',
        text: `[feed] ${feed.live ? 'LIVE' : 'STATIC'} · updated ${feed.lastUpdated || 'n/a'}`,
      })
      linkedinCtfPosts.forEach((p, i) => {
        push({ type: 'code', text: `// POST_${String(i + 1).padStart(2, '0')}: ${p.title}` })
        push({ type: 'link', text: p.url, href: safeHref(p.url) })
      })
    } else if (cmd === 'thm' || cmd === 'tryhackme') {
      push({ type: 'out', text: ctfBotCommands.thm })
      push({ type: 'link', text: 'https://tryhackme.com/p/VoidInjector', href: 'https://tryhackme.com/p/VoidInjector' })
    } else if (cmd === 'htb' || cmd === 'hackthebox') {
      push({ type: 'out', text: ctfBotCommands.htb })
      push({
        type: 'link',
        text: 'https://app.hackthebox.com/public/users/3219196',
        href: 'https://app.hackthebox.com/public/users/3219196',
      })
    } else if (cmd === 'access' || cmd.startsWith('access ')) {
      await runAccessSequence()
      dumpAllAsCode()
    } else if (cmd === 'scan') {
      push({ type: 'sys', text: ctfBotCommands.scan })
      ctfPlatforms.forEach((p) => push({ type: 'out', text: `  → ${p.name.padEnd(12)} ${p.handle}  ONLINE` }))
    } else {
      push({ type: 'err', text: `ctf-bot: unknown "${cmd}" — try help | full | linkedin` })
    }
    setBusy(false)
    inputRef.current?.focus()
  }

  return (
    <section id="ctf" className="relative py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00FF55]/30 bg-[#00FF55]/10 px-3 py-1">
            <Radio size={12} className="text-[#00FF55]" />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00D9FF]">
              TERMINAL_ACCESS // CTF
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-wide text-[#E8FFF0] sm:text-3xl md:text-4xl">
            CTF Competitions
          </h2>
          <p className="mt-3 font-body text-sm text-[#71917B] sm:text-base">
            Full terminal dump · all flags as code · LinkedIn CTF posts · live feed
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 px-3 py-1 font-mono text-[0.6rem] text-[#00D9FF]">
            <span
              className={`h-1.5 w-1.5 rounded-full ${feed.live ? 'animate-pulse bg-[#00FF55]' : 'bg-[#71917B]'}`}
            />
            {feed.live ? 'LIVE FEED' : feed.ready ? 'STATIC FALLBACK' : 'LOADING FEED…'}
            {feed.lastUpdated && (
              <span className="text-[#71917B]">· {new Date(feed.lastUpdated).toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* FULL-WIDTH TERMINAL */}
        <div
          ref={term.ref}
          className={`${term.className} relative mb-12 flex flex-col overflow-hidden rounded-xl border-2 border-[#0a6b32] bg-[#030805] shadow-[0_0_32px_rgba(0,255,85,0.14)]`}
        >
          <div className="relative z-10 flex flex-wrap items-center gap-2 border-b border-[#0a6b32]/70 bg-[#07140c]/95 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#28c840]" />
            <span className="ml-1 flex items-center gap-1.5 font-mono text-[0.65rem] text-[#71917B]">
              <Terminal size={12} className="text-[#00FF55]" />
              root@voidinjector:~/ctf#
            </span>
            {accessGranted && (
              <span className="ml-auto flex items-center gap-1.5 rounded border border-[#00FF55]/50 bg-[#00FF55]/15 px-2.5 py-1 font-mono text-[0.6rem] font-bold tracking-wide text-[#00FF55] shadow-[0_0_16px_rgba(0,255,85,0.35)]">
                <ShieldCheck size={12} />
                ACCESS GRANTED
              </span>
            )}
          </div>

          {(accessAnim || (authPct > 0 && authPct < 100)) && (
            <div className="relative z-10 h-1.5 w-full bg-[#0a6b32]/30">
              <div
                className="h-full bg-gradient-to-r from-[#00FF55] via-[#00D9FF] to-[#00FF55] transition-all duration-75"
                style={{ width: `${authPct}%` }}
              />
            </div>
          )}

          {/* Tall scrollable body — all code dump visible by scrolling inside */}
          <div className="relative flex-1">
            <TerminalMatrixBg />
            <div
              ref={bodyRef}
              className="relative z-[1] max-h-[min(85vh,900px)] min-h-[520px] space-y-1.5 overflow-y-auto overflow-x-hidden p-4 font-mono text-[0.78rem] sm:min-h-[620px] sm:p-5 sm:text-[0.85rem]"
              style={{ scrollbarColor: '#00FF55 #07140c' }}
            >
              <p className="text-[#00D9FF]/80">┌──(voidinjector㉿kali)-[~/ctf]</p>
              {log.map((line) => (
                <TermLine key={line.id} line={line} />
              ))}
              {typed && (
                <p>
                  <span className="text-[#00D9FF]">└─$</span>{' '}
                  <span className="text-[#00FF55]">{typed}</span>
                  {cursorOn && <span className="text-[#00FF55]">█</span>}
                </p>
              )}
              {!busy && log.length > 0 && (
                <p className="pt-1 text-[0.65rem] text-[#71917B]/80">
                  ↕ scroll for full dump · {ctfEvents.length} flags · {linkedinCtfPosts.length} posts
                </p>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              runCommand(input)
            }}
            className="relative z-10 flex items-center gap-2 border-t border-[#0a6b32]/60 bg-[#050806]/95 px-3 py-2.5"
          >
            <Bot size={14} className="shrink-0 text-[#00D9FF]" />
            <span className="shrink-0 font-mono text-xs text-[#00D9FF]">└─$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 80))}
              disabled={busy}
              placeholder={busy ? 'bot working…' : 'help | full | linkedin | flags | access'}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#00FF55] outline-none placeholder:text-[#71917B]/55"
              autoComplete="off"
              spellCheck={false}
              aria-label="CTF terminal"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#00FF55]/40 text-[#00FF55] hover:bg-[#00FF55]/15 disabled:opacity-40"
              aria-label="Run"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* ═══ ALWAYS-VISIBLE full page sections (scroll page to see all) ═══ */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-[#0a6b32]" />
          <span className="font-mono text-[0.65rem] tracking-widest text-[#00D9FF]">
            FULL ARCHIVE // PAGE VIEW
          </span>
          <span className="h-px flex-1 bg-[#0a6b32]" />
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* All CTF Flags */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-[#E8FFF0]">
              <Flag size={18} className="text-[#00FF55]" />
              All CTF Flags
              <span className="ml-1 font-mono text-[0.65rem] text-[#00D9FF]">
                ({ctfEvents.length})
              </span>
            </h3>
            <ul className="space-y-3">
              {ctfEvents.map((ev, idx) => (
                <li
                  key={ev.title}
                  className="rounded-xl border border-[#0a6b32] bg-[#07140c] p-4 transition-colors hover:border-[#00FF55]/45"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.6rem] text-[#00D9FF]">
                      FLAG_{String(idx + 1).padStart(2, '0')}
                    </span>
                    {ev.place && (
                      <span className="rounded border border-[#00FF55]/40 bg-[#00FF55]/10 px-2 py-0.5 font-mono text-[0.6rem] text-[#00FF55]">
                        {ev.place}
                      </span>
                    )}
                    {ev.team && (
                      <span className="font-mono text-[0.6rem] text-[#a78bfa]">{ev.team}</span>
                    )}
                    {ev.date && (
                      <span className="font-mono text-[0.55rem] text-[#71917B]">{ev.date}</span>
                    )}
                  </div>
                  <h4 className="mt-1 font-display text-sm font-semibold text-[#E8FFF0]">{ev.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#71917B] sm:text-sm">{ev.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {ev.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#0a6b32] px-2 py-0.5 font-mono text-[0.6rem] text-[#00D9FF]"
                      >
                        #{t}
                      </span>
                    ))}
                    {ev.linkedinUrl && (
                      <a
                        href={safeHref(ev.linkedinUrl)}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="ml-auto inline-flex items-center gap-1 font-mono text-[0.65rem] text-[#00FF55] hover:underline"
                      >
                        View post <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* LinkedIn profile + all posts */}
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-[#00D9FF]/35 bg-[#07140c] p-4 sm:p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <IconLinkedin size={18} className="text-[#00D9FF]" />
                  <div>
                    <h3 className="font-display text-sm font-semibold text-[#E8FFF0]">
                      {linkedinProfile.name}
                    </h3>
                    <p className="font-mono text-[0.6rem] text-[#00D9FF]">LinkedIn · Verified</p>
                  </div>
                </div>
                <a
                  href={safeHref(linkedinProfile.profileUrl, socialLinks.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-neon !min-h-[2.25rem] !px-3 !text-[0.65rem]"
                >
                  Open
                  <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-xs leading-relaxed text-[#a8c4b0] sm:text-sm">
                {linkedinProfile.headline}
              </p>
              <div className="mt-3 space-y-1.5 font-mono text-[0.65rem] text-[#71917B]">
                <p className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#00D9FF]" /> {linkedinProfile.location}
                </p>
                <p className="flex items-start gap-1.5">
                  <GraduationCap size={11} className="mt-0.5 shrink-0 text-[#00D9FF]" />
                  <span>{linkedinProfile.education}</span>
                </p>
                <p className="text-[#00FF55]/90">{linkedinProfile.org}</p>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold text-[#E8FFF0]">
              CTF updates on LinkedIn
              <span className="ml-2 font-mono text-[0.65rem] text-[#00D9FF]">
                ({linkedinCtfPosts.length})
              </span>
            </h3>
            <ul className="space-y-3">
              {linkedinCtfPosts.map((post) => (
                <li key={post.id}>
                  <a
                    href={safeHref(post.url)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group block rounded-xl border border-[#0a6b32] bg-[#07140c] p-4 transition-all hover:border-[#00FF55]/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-semibold leading-snug text-[#E8FFF0] group-hover:text-[#00FF55]">
                        {post.title}
                      </h4>
                      <ExternalLink size={14} className="mt-0.5 shrink-0 text-[#00FF55]/70" />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#71917B] sm:text-sm">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[0.55rem] text-[#00D9FF]">{post.date}</span>
                      {post.reactions && (
                        <span className="font-mono text-[0.55rem] text-[#00FF55]">♥ {post.reactions}</span>
                      )}
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[#0a6b32] px-1.5 py-0.5 font-mono text-[0.55rem] text-[#71917B]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {ctfPlatforms.map((p) => (
            <a
              key={p.name}
              href={safeHref(p.url)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-center gap-4 rounded-xl border border-[#0a6b32] bg-[#07140c] p-5 transition-all hover:border-[#00FF55]/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#0a6b32] text-[#00FF55]">
                {p.kind === 'linkedin' ? (
                  <IconLinkedin size={22} />
                ) : p.kind === 'thm' ? (
                  <IconFlag size={22} />
                ) : (
                  <IconCube size={22} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm font-semibold text-[#E8FFF0]">{p.name}</h3>
                <p className="truncate font-mono text-xs text-[#71917B]">{p.handle}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#00FF55]/70" />
            </a>
          ))}
        </div>

        <div
          ref={lead.ref}
          className={`${lead.className} rounded-xl border border-[#0a6b32] bg-[#07140c] p-5 sm:p-6`}
        >
          <p className="font-mono text-[0.65rem] tracking-widest text-[#00D9FF]">
            LEADERSHIP // ISACA
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold text-[#E8FFF0]">
            {leadership.role}
          </h3>
          <p className="mt-1 font-body text-sm text-[#00FF55]">
            {leadership.org} · {leadership.period}
          </p>
          <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-[#71917B]">
            {leadership.description}
          </p>
        </div>
      </div>
    </section>
  )
}

function TermLine({ line }) {
  if (line.type === 'sys') return <p className="text-xs text-[#71917B]">{line.text}</p>
  if (line.type === 'cmd')
    return (
      <p>
        <span className="text-[#00D9FF]">└─$</span> <span className="text-[#00FF55]">{line.text}</span>
      </p>
    )
  if (line.type === 'out') return <p className="pl-3 text-[#E8FFF0]/90">{line.text}</p>
  if (line.type === 'ok')
    return (
      <p className="pl-1 font-mono text-[0.72rem] font-semibold leading-snug text-[#00FF55] sm:text-[0.8rem]">
        {line.text}
      </p>
    )
  if (line.type === 'err') return <p className="pl-3 text-[#ff6b6b]">{line.text}</p>
  if (line.type === 'bot')
    return (
      <p className="flex gap-2 pl-1 text-[#00D9FF]">
        <Bot size={12} className="mt-0.5 shrink-0" />
        <span>{line.text}</span>
      </p>
    )
  if (line.type === 'flag')
    return <p className="pl-3 font-mono text-[0.7rem] text-[#a8c4b0]">{line.text}</p>
  if (line.type === 'code')
    return (
      <p className="whitespace-pre-wrap break-all pl-2 font-mono text-[0.7rem] leading-relaxed text-[#7dba8f] sm:text-[0.75rem]">
        {line.text || '\u00a0'}
      </p>
    )
  if (line.type === 'link')
    return (
      <p className="pl-3">
        <a
          href={safeHref(line.href || line.text)}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="break-all text-[#00D9FF] underline decoration-[#00D9FF]/40 underline-offset-2 hover:text-[#00FF55]"
        >
          {line.text}
        </a>
      </p>
    )
  // Flag card inside terminal (screenshot style)
  if (line.type === 'flagcard' && line.event) {
    const ev = line.event
    return (
      <div className="my-2 ml-1 rounded-lg border border-[#0a6b32] bg-[#07140c]/90 p-3 shadow-[0_0_12px_rgba(0,255,85,0.08)]">
        <div className="flex flex-wrap items-center gap-2">
          <Flag size={14} className="text-[#00FF55]" />
          <span className="font-display text-sm font-semibold text-[#E8FFF0]">{ev.title}</span>
          <span className="rounded border border-[#00D9FF]/40 px-1.5 py-0.5 font-mono text-[0.55rem] text-[#00D9FF]">
            {line.flagId}
          </span>
          {ev.place && (
            <span className="rounded border border-[#00FF55]/40 bg-[#00FF55]/10 px-1.5 py-0.5 font-mono text-[0.55rem] text-[#00FF55]">
              {ev.place}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[0.7rem] leading-relaxed text-[#71917B]">{ev.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ev.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-[#0a6b32] px-2 py-0.5 font-mono text-[0.55rem] text-[#00D9FF]"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    )
  }
  return null
}
