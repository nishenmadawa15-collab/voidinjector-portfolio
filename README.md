# Nishen Madava — Cyber Security Portfolio

Futuristic cybersecurity / HUD portfolio for **Nishen Madava**, built with **React**, **Vite**, and **Tailwind CSS**.

Content and assets adapted from `Nishen_Madava_Portfolio_v2.0`.

---

## Quick start

```bash
cd G:\Newweb02
npm install
npm run dev
```

Open the URL shown (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

---

## What's included

- **Hero** — glitch headline, Matrix rain, CTAs  
- **About / Profile** — photo, bio, education, contact, resume download  
- **Skills** — Security Tools (8), Programming (Python/C/C++), Operating Systems (Kali/Ubuntu/Windows)  
- **Projects** — 4 cybersecurity projects  
- **Certifications** — filterable gallery + lightbox  
- **CTF** — terminal log, TryHackMe / HackTheBox, ISACA leadership  
- **Contact** — validated form + direct email/phone  
- **Footer** — social links, Matrix effect  

---

## Personal data (edit here)

All content lives in **`src/data/siteData.js`**:

| Export | Purpose |
|--------|---------|
| `personalInfo` | Name, brand, bio, email, phone, location, resume path |
| `socialLinks` | LinkedIn, GitHub, TryHackMe, HackTheBox |
| `securityTools` | Wireshark, Burp, Metasploit, Nmap, Nessus, OWASP ZAP, Linux CLI, Nikto |
| `projects` | Titles, tech, images, GitHub/demo URLs |
| `certifications` | Cert names, issuers, images, categories |
| `ctfEvents` / `ctfPlatforms` | CTF achievements & platforms |
| `leadership` | ISACA role |

### Replace assets

| Asset | Path |
|-------|------|
| Profile photo | `public/profile/nishen.png` |
| Resume PDF | `public/resume/Nishen_Madava_CV.pdf` |
| Project images | `public/projects/project-1.jfif` … `project-4.jfif` |
| Certificates | `public/certificates/*.jpg` / `*.png` |

---

## Contact (from portfolio v2)

- **Email:** Nishenmadawa15@gmail.com  
- **Phone:** +94 78 594 7479  
- **Location:** Matara, Sri Lanka  
- **LinkedIn:** [nishen-madava](https://linkedin.com/in/nishen-madava)  
- **GitHub:** [nishenmadawa15-collab](https://github.com/nishenmadawa15-collab)  
- **TryHackMe:** [@VoidInjector](https://tryhackme.com/p/VoidInjector)  

---

## Tech

React 19 · Vite 8 · Tailwind CSS 4 · Lucide React · Three.js · GSAP · Canvas Matrix background

---

## Host this website (go live)

This is a **static site**. You build once, then upload the `dist` folder (or connect Git for auto-deploy).

### 1. Build for production

```bash
cd G:\Newweb02
npm install
npm run build
```

This creates **`dist/`** with HTML, CSS, JS, images, resume PDF, and `data/live-feed.json`.

Test locally:

```bash
npm run preview
```

---

### 2. Easiest free hosts (pick one)

#### Option A — Netlify (recommended)

1. Create account at [netlify.com](https://www.netlify.com)
2. Drag & drop the **`dist`** folder onto Netlify Drop  
   **or** connect GitHub and set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Site is live (e.g. `https://your-name.netlify.app`)
4. Security headers in `public/_headers` apply automatically

#### Option B — Cloudflare Pages

1. [pages.cloudflare.com](https://pages.cloudflare.com) → Create project
2. Connect Git **or** upload `dist`
3. If Git:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Free HTTPS + global CDN

#### Option C — Vercel

1. [vercel.com](https://vercel.com) → New Project → import repo
2. Framework: Vite
3. Output: `dist` (auto-detected)
4. Deploy

#### Option D — GitHub Pages

```bash
# after build
# push repo to GitHub, enable Pages from /docs or use gh-pages branch
```

In `vite.config.js` set `base: '/REPO_NAME/'` if the site is not at the domain root.

---

### 3. What must be online with the site

| Path | Purpose |
|------|---------|
| `dist/index.html` | Main app |
| `dist/assets/*` | JS / CSS / 3D |
| `dist/profile/*` | Photo |
| `dist/resume/Nishen_Madava_CV.pdf` | Download Resume |
| `dist/certificates/*` | Cert images |
| `dist/projects/*` | Project images |
| `dist/skills/*` | Tool logos |
| `dist/data/live-feed.json` | Live CTF + LinkedIn posts |
| `dist/_headers` | Security headers (Netlify) |

**Do not** upload only `src/` — always host the built **`dist/`** folder (or use a host that runs `npm run build` for you).

---

### 4. Update content after go-live

| Change | How |
|--------|-----|
| Name, bio, skills, projects | Edit `src/data/siteData.js` → `npm run build` → redeploy |
| LinkedIn / CTF posts only | Edit `public/data/live-feed.json` → rebuild **or** replace `dist/data/live-feed.json` on host |
| Resume PDF | Replace `public/resume/Nishen_Madava_CV.pdf` → rebuild |
| Profile photo | Replace `public/profile/nishen.png` → rebuild |

---

### 5. Custom domain (optional)

On Netlify / Cloudflare / Vercel: **Domain settings** → add your domain → set DNS as shown. HTTPS is free.

---

### 6. Checklist before sharing the link

- [ ] `npm run build` succeeds with no errors  
- [ ] Resume downloads from the live site  
- [ ] Profile photo and certificates load  
- [ ] CTF section shows **LIVE FEED** (or static fallback)  
- [ ] LinkedIn / GitHub / THM / HTB links open  
- [ ] Site uses **https://**  
- [ ] Test on phone (responsive)  

---

## Security notes

See **`SECURITY.md`**. Production uses CSP, frame deny, and sanitized contact input. Contact form is frontend-only until you connect a backend (Formspree, etc.).
