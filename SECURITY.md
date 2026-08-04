# Security (VibeSec)

Portfolio site hardening checklist for **VOIDINJECTOR** (static React + Vite).

## Controls in place

| Control | Implementation |
|--------|----------------|
| **CSP** | Strict production CSP via Vite preview + `public/_headers` (Netlify/Cloudflare) |
| **Clickjacking** | `X-Frame-Options: DENY` + `frame-ancestors 'none'` |
| **MIME sniffing** | `X-Content-Type-Options: nosniff` |
| **Referrer** | `strict-origin-when-cross-origin` |
| **Permissions** | Camera/mic/geo/payment/usb disabled |
| **COOP / CORP** | `same-origin` |
| **HSTS** | Enabled on preview + static `_headers` (HTTPS hosts) |
| **XSS** | React JSX escaping; contact inputs sanitized; no `dangerouslySetInnerHTML` |
| **Open redirects** | External URLs allowlisted (`isSafeExternalUrl`) |
| **Contact spam** | Honeypot field + session rate limit (3 / 10 min) |
| **Live feed** | `/data/live-feed.json` validated/sanitized before render |
| **Source maps** | Disabled in production build |
| **External links** | `rel="noopener noreferrer nofollow"` |

## Live LinkedIn updates (no secrets)

LinkedIn does **not** allow browser apps to pull posts without OAuth / paid APIs.
This site uses a **same-origin** JSON feed:

1. Edit `public/data/live-feed.json` (posts, CTF events, profile).
2. Deploy / host that file — **no rebuild required** for content-only changes on most static hosts.
3. The app re-fetches every **5 minutes** (`useLiveFeed`) with cache-busting.
4. All URLs and text are sanitized client-side before display.

## Deploy notes

- Prefer HTTPS only; keep `upgrade-insecure-requests` in CSP.
- Copy `public/_headers` when using Netlify; map equivalent headers on Cloudflare/Vercel/nginx.
- Never put API keys or tokens in client code or `live-feed.json`.

## Contact form

Frontend-only demo: submissions are validated/sanitized and rate-limited.
Wire to a backend (Formspree, serverless, email API) **server-side** for production mail delivery — do not put mail API secrets in the browser.
