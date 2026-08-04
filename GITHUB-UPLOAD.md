# Upload this website to GitHub — step by step

Your project folder: `G:\Newweb02`

---

## Part A — One-time setup on your PC

### 1. Install Git (if not installed)

Download: https://git-scm.com/download/win  
Install with default options. Then **close and reopen** PowerShell / Terminal.

Check:

```powershell
git --version
```

### 2. Tell Git your name (once per PC)

```powershell
git config --global user.name "Nishen Madava"
git config --global user.email "Nishenmadawa15@gmail.com"
```

Use the **same email** as your GitHub account if possible.

---

## Part B — Create a repo on GitHub (website)

1. Open https://github.com and **sign in**
2. Click the green **New** button (or **+** → **New repository**)
3. Fill in:
   - **Repository name:** `voidinjector-portfolio` (or any name you like)
   - **Description:** Cyber security portfolio — VOIDINJECTOR
   - **Public** (so Netlify / others can deploy free)
   - **Do NOT** check “Add a README” (you already have files)
4. Click **Create repository**
5. Copy the repo URL. It looks like:

```text
https://github.com/YOUR_USERNAME/voidinjector-portfolio.git
```

Keep this URL for Part C.

---

## Part C — Upload your project (PowerShell)

Open PowerShell and run **one block at a time**:

### 1. Go to project folder

```powershell
cd G:\Newweb02
```

### 2. Start Git (if not already done)

```powershell
git init
git branch -M main
```

### 3. Add all project files

```powershell
git add .
git status
```

You should **see** `src`, `public`, `package.json`, `README.md`  
You should **NOT** see `node_modules` or `dist`.

### 4. Save first commit

```powershell
git commit -m "Initial commit: VOIDINJECTOR cyber portfolio"
```

### 5. Connect to your GitHub repo

Replace `YOUR_USERNAME` and repo name with yours:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/voidinjector-portfolio.git
```

### 6. Upload (push)

```powershell
git push -u origin main
```

- GitHub may ask you to **sign in** in the browser
- Or use a **Personal Access Token** as password  
  (GitHub → Settings → Developer settings → Personal access tokens)

When it finishes, refresh your GitHub repo page — all files should be there.

---

## Part D — Later updates (after you change the site)

```powershell
cd G:\Newweb02
git add .
git commit -m "Update portfolio content"
git push
```

---

## Part E — Free hosting from GitHub (optional)

### Netlify (easiest)

1. https://app.netlify.com → **Add new site** → **Import from Git**
2. Choose GitHub → select `voidinjector-portfolio`
3. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy → get live URL

### Cloudflare Pages / Vercel

Same idea: connect GitHub repo → build `npm run build` → publish `dist`.

---

## What gets uploaded

| Included | Not uploaded (ignored) |
|----------|-------------------------|
| `src/` code | `node_modules/` |
| `public/` images, resume, live-feed | `dist/` (built on host) |
| `package.json`, README, SECURITY | Big zip / extract folders |
| Vite config | Local editor junk |

---

## Common problems

| Problem | Fix |
|---------|-----|
| `git` not recognized | Install Git, restart terminal |
| `remote origin already exists` | `git remote remove origin` then add again |
| Push rejected / auth failed | Sign in GitHub, or create a Personal Access Token |
| Wrong files uploaded | Check `.gitignore` has `node_modules` and `dist` |

---

## Quick copy-paste (after you create the empty GitHub repo)

```powershell
cd G:\Newweb02
git init
git branch -M main
git add .
git commit -m "Initial commit: VOIDINJECTOR cyber portfolio"
git remote add origin https://github.com/YOUR_USERNAME/voidinjector-portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME/voidinjector-portfolio` with your real repo path.
