/**
 * Client-side security helpers (VibeSec patterns).
 * React already escapes JSX text — this adds input validation, URL allowlists,
 * rate limiting, and safe external-link checks.
 */

/** Domains allowed for external navigation / live-feed URLs */
const ALLOWED_URL_HOSTS = new Set([
  'www.linkedin.com',
  'linkedin.com',
  'lnkd.in',
  'github.com',
  'www.github.com',
  'tryhackme.com',
  'www.tryhackme.com',
  'app.hackthebox.com',
  'hackthebox.com',
  'www.hackthebox.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
])

/** Strip control chars / HTML-ish content from plain text fields */
export function sanitizePlainText(input, maxLen = 500) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>`]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .trim()
    .slice(0, maxLen)
}

export function isValidEmail(email) {
  if (typeof email !== 'string') return false
  if (email.length > 120) return false
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email.trim()
  )
}

/** Safe URL for mailto / http(s) only — blocks javascript:, data:, etc. */
export function isSafeHttpUrl(url) {
  if (typeof url !== 'string' || !url) return false
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://localhost')
    if (u.protocol === 'mailto:') return isValidEmail(u.pathname || u.href.replace(/^mailto:/i, ''))
    if (u.protocol === 'tel:') return /^\+?[\d\s()-]{7,20}$/.test(decodeURIComponent(u.pathname || ''))
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

/**
 * Strict external URL: https only + allowlisted host (or same-origin).
 * Use for LinkedIn posts, project links, live-feed data.
 */
export function isSafeExternalUrl(url) {
  if (typeof url !== 'string' || !url) return false
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://localhost'
    const u = new URL(url, base)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false
    // Same origin always OK
    if (typeof window !== 'undefined' && u.origin === window.location.origin) return true
    // Block credentials in URL
    if (u.username || u.password) return false
    // Block open-redirect-ish paths
    if (u.hostname === '' || u.hostname.includes('..')) return false
    return ALLOWED_URL_HOSTS.has(u.hostname.toLowerCase())
  } catch {
    return false
  }
}

/** Return URL only if safe, else '#' */
export function safeHref(url, fallback = '#') {
  if (isSafeExternalUrl(url) || isSafeHttpUrl(url)) return url
  return fallback
}

/** Validate contact form payload */
export function validateContactForm(values) {
  const errors = {}
  const name = sanitizePlainText(values.name, 80)
  const email = sanitizePlainText(values.email, 120)
  const message = sanitizePlainText(values.message, 2000)

  // Honeypot — bots fill hidden field
  if (values.website && String(values.website).trim()) {
    return {
      errors: { form: 'Submission rejected.' },
      clean: null,
      ok: false,
      honeypot: true,
    }
  }

  if (!name || name.length < 2) errors.name = 'Name is required (min 2 characters).'
  if (!email) errors.email = 'Email is required.'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
  if (!message || message.length < 10) errors.message = 'Message must be at least 10 characters.'
  if (!values.consent) errors.consent = 'You must consent to continue.'

  return {
    errors,
    clean: { name, email, message, consent: !!values.consent },
    ok: Object.keys(errors).length === 0,
    honeypot: false,
  }
}

/**
 * Simple client-side rate limit (anti-spam).
 * Returns { allowed, waitMs }.
 */
export function checkRateLimit(key = 'contact', maxPerWindow = 3, windowMs = 10 * 60 * 1000) {
  try {
    const storageKey = `vi_rl_${key}`
    const now = Date.now()
    const raw = sessionStorage.getItem(storageKey)
    let stamps = raw ? JSON.parse(raw) : []
    if (!Array.isArray(stamps)) stamps = []
    stamps = stamps.filter((t) => typeof t === 'number' && now - t < windowMs)
    if (stamps.length >= maxPerWindow) {
      const waitMs = windowMs - (now - stamps[0])
      return { allowed: false, waitMs: Math.max(1000, waitMs) }
    }
    stamps.push(now)
    sessionStorage.setItem(storageKey, JSON.stringify(stamps))
    return { allowed: true, waitMs: 0 }
  } catch {
    // sessionStorage blocked — allow but no memory
    return { allowed: true, waitMs: 0 }
  }
}

/** Sanitize array of string tags from live feed */
export function sanitizeTags(tags, max = 12) {
  if (!Array.isArray(tags)) return []
  return tags
    .filter((t) => typeof t === 'string')
    .map((t) => sanitizePlainText(t, 40))
    .filter(Boolean)
    .slice(0, max)
}

/**
 * Validate & sanitize live-feed JSON from /data/live-feed.json
 * Rejects unexpected shapes / unsafe URLs (XSS / open redirect defense).
 */
export function sanitizeLiveFeed(data) {
  if (!data || typeof data !== 'object') return null

  const profile = data.linkedinProfile && typeof data.linkedinProfile === 'object' ? data.linkedinProfile : null
  const linkedinProfile = profile
    ? {
        name: sanitizePlainText(profile.name, 80) || 'Nishen Madava',
        headline: sanitizePlainText(profile.headline, 200) || '',
        location: sanitizePlainText(profile.location, 120) || '',
        education: sanitizePlainText(profile.education, 200) || '',
        org: sanitizePlainText(profile.org, 200) || '',
        profileUrl: isSafeExternalUrl(profile.profileUrl)
          ? profile.profileUrl
          : 'https://www.linkedin.com/in/nishen-madava/',
        followers: sanitizePlainText(profile.followers, 20) || '',
      }
    : null

  const ctfEvents = Array.isArray(data.ctfEvents)
    ? data.ctfEvents
        .slice(0, 20)
        .map((ev) => {
          if (!ev || typeof ev !== 'object') return null
          const linkedinUrl =
            ev.linkedinUrl && isSafeExternalUrl(ev.linkedinUrl) ? ev.linkedinUrl : undefined
          return {
            title: sanitizePlainText(ev.title, 120),
            description: sanitizePlainText(ev.description, 600),
            tags: sanitizeTags(ev.tags),
            date: sanitizePlainText(ev.date, 20),
            place: ev.place ? sanitizePlainText(ev.place, 40) : undefined,
            team: ev.team ? sanitizePlainText(ev.team, 40) : undefined,
            linkedinUrl,
          }
        })
        .filter((ev) => ev && ev.title)
    : null

  const linkedinCtfPosts = Array.isArray(data.linkedinCtfPosts)
    ? data.linkedinCtfPosts
        .slice(0, 20)
        .map((p, i) => {
          if (!p || typeof p !== 'object') return null
          if (!p.url || !isSafeExternalUrl(p.url)) return null
          return {
            id: typeof p.id === 'number' ? p.id : i + 1,
            title: sanitizePlainText(p.title, 160),
            excerpt: sanitizePlainText(p.excerpt, 800),
            date: sanitizePlainText(p.date, 30),
            tags: sanitizeTags(p.tags),
            url: p.url,
            reactions: p.reactions ? sanitizePlainText(String(p.reactions), 12) : undefined,
          }
        })
        .filter((p) => p && p.title)
    : null

  return {
    version: typeof data.version === 'number' ? data.version : 1,
    lastUpdated: sanitizePlainText(String(data.lastUpdated || ''), 40),
    source: sanitizePlainText(String(data.source || 'live'), 40),
    linkedinProfile,
    ctfEvents,
    linkedinCtfPosts,
  }
}
