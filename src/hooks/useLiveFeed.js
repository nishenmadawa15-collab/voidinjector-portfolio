import { useEffect, useState } from 'react'
import {
  ctfEvents as staticEvents,
  linkedinCtfPosts as staticPosts,
  linkedinProfile as staticProfile,
} from '../data/siteData'
import { sanitizeLiveFeed } from '../utils/security'

const FEED_URL = '/data/live-feed.json'
const POLL_MS = 5 * 60 * 1000 // re-fetch every 5 minutes

/**
 * Live site data: fetches public/data/live-feed.json (LinkedIn posts, CTF, profile).
 * Falls back to static siteData if fetch fails.
 * Update live-feed.json anytime — no rebuild required for content changes.
 */
export function useLiveFeed() {
  const [state, setState] = useState({
    ready: false,
    live: false,
    lastUpdated: null,
    source: 'static',
    linkedinProfile: staticProfile,
    ctfEvents: staticEvents,
    linkedinCtfPosts: staticPosts,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    let timer = 0

    const load = async () => {
      try {
        // Cache-bust so hosts/CDNs pick up new posts
        const url = `${FEED_URL}?t=${Date.now()}`
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`feed ${res.status}`)
        const raw = await res.json()
        const clean = sanitizeLiveFeed(raw)
        if (!clean || cancelled) return

        setState({
          ready: true,
          live: true,
          lastUpdated: clean.lastUpdated || new Date().toISOString(),
          source: clean.source || 'live-feed',
          linkedinProfile: clean.linkedinProfile || staticProfile,
          ctfEvents: clean.ctfEvents?.length ? clean.ctfEvents : staticEvents,
          linkedinCtfPosts: clean.linkedinCtfPosts?.length ? clean.linkedinCtfPosts : staticPosts,
          error: null,
        })
      } catch (err) {
        if (cancelled) return
        setState((prev) => ({
          ...prev,
          ready: true,
          live: false,
          source: 'static',
          error: err?.message || 'feed offline',
          // keep static data
          linkedinProfile: staticProfile,
          ctfEvents: staticEvents,
          linkedinCtfPosts: staticPosts,
        }))
      }
    }

    load()
    timer = window.setInterval(load, POLL_MS)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  return state
}
