# VOIDINJECTOR — Nishen Madava portfolio

Personal portfolio of Nishen Madava, BSc (Hons) Cyber Security undergraduate at SLTC.
Static single-page site built with React 19, Vite and Tailwind CSS v4, deployed to Netlify from `main`.

## Develop

```bash
npm ci
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve dist/ with production-like security headers
npm run lint      # oxlint
```

## Content

All copy lives in `src/data/siteData.js`. Edit that file to update the hero, experience, projects,
CTF results, certifications, skills, education, leadership and contact links. No phone number or
home address is published.

Assets:

- `public/profile/nishen.webp` — headshot used on the page (`nishen.png` is the original)
- `public/projects/socwatch-agents.webp` — SOCWatch screenshot
- `public/certificates/*.webp`, `public/ctf/*.webp` — certificate images
- `public/resume/Nishen_Madava_CV.pdf` — CV served at `/resume/Nishen_Madava_CV.pdf`
- `public/og.jpg` — Open Graph preview image

## Security headers

Production headers (CSP, HSTS, frame-ancestors, etc.) are in `public/_headers` (Netlify).
`vite.config.js` applies equivalent headers to the dev and preview servers. See `SECURITY.md`.
