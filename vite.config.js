import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Security headers (VibeSec).
 * Dev CSP allows Vite HMR; preview uses stricter production-like CSP.
 */
function securityHeaders() {
  const base = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-DNS-Prefetch-Control': 'off',
  }

  // Production: no unsafe-eval; fonts + self only
  const cspProd = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')

  // Vite HMR needs unsafe-eval + ws connect in dev
  const cspDev = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "connect-src 'self' ws: wss:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ')

  return {
    name: 'security-headers',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        Object.entries({ ...base, 'Content-Security-Policy': cspDev }).forEach(([k, v]) =>
          res.setHeader(k, v)
        )
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((_req, res, next) => {
        Object.entries({
          ...base,
          'Content-Security-Policy': cspProd,
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        }).forEach(([k, v]) => res.setHeader(k, v))
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), securityHeaders()],
  build: {
    // Do not ship source maps to production clients (reduces reverse-engineering surface)
    sourcemap: false,
    // Drop console/debugger in production builds
    minify: true,
  },
})
