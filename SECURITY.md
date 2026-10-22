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
| **XSS** | React JSX escaping; all content is static from `src/data/siteData.js`; no `dangerouslySetInnerHTML` |
| **External links** | `rel="noopener noreferrer"` on every external link |
| **Contact** | No form or backend; contact is a `mailto:` link, so nothing is collected or stored |
| **Third parties** | Google Fonts only; no analytics, tracking or embedded scripts |
| **Source maps** | Disabled in production build |

## Deploy notes

- Prefer HTTPS only; keep `upgrade-insecure-requests` in CSP.
- `public/_headers` is applied by Netlify; map equivalent headers if the host changes.
- There is no runtime data fetching, no contact backend and no secrets in the client bundle.
