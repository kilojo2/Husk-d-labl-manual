# Deployment Guide: Railway (Next.js)

## Prerequisites
- Git installed on your PC
- GitHub account
- Railway account (sign up at https://railway.app)

---

## Step 1: Push project to GitHub

### 1.1 Initialize Git (if not already done)
```bash
cd "e:\Anon Chat"
git init
git add .
git commit -m "Initial commit — Husk'd Labl Manuals"
```

### 1.2 Create a GitHub repository
1. Go to https://github.com/new
2. Repository name: `huskdlabl-manuals` (or any name you prefer)
3. Keep it **Public** or **Private** — doesn't matter
4. **Do NOT** initialize with README, .gitignore, or license (we already have them)
5. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/huskdlabl-manuals.git
git branch -M main
git push -u origin main
```
Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy on Railway

### 2.1 Connect Railway to GitHub
1. Go to https://railway.app
2. Log in (use GitHub account for easiest setup)
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. If prompted, install Railway GitHub App and grant access to your `huskdlabl-manuals` repo
5. Select the repository

### 2.2 Configure the project
Railway will auto-detect Next.js. Verify these settings:

- **Root Directory**: (leave empty — project is at root)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Watch Patterns**: (leave default)

### 2.3 Set environment variables (if needed)
No environment variables are required for the current static site. If you add Sanity CMS or Algolia later, you'll add them here.

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for the build
3. Once done, Railway provides a URL like `https://huskdlabl-manuals.up.railway.app`

### 2.5 (Optional) Custom domain
1. In your Railway project dashboard, go to **"Settings"** → **"Domains"**
2. Click **"Generate Domain"** for a free `*.up.railway.app` URL
3. Or add a custom domain if you own one

---

## Step 3: Automatic redeployment

Every time you push to `main` branch, Railway automatically rebuilds and redeploys:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## Troubleshooting

### Build fails with "Command not found"
Make sure `node_modules` is NOT committed to Git. Check `.gitignore` contains `node_modules/`.

### Build fails with "Next.js requires Node.js"
Railway auto-detects Node.js. If issues occur, in Railway dashboard go to **"Settings"** → **"Runtime"** and set Node version to `20` or `22`.

### App shows blank page
Check Railway logs: **"Deployments"** → click latest deployment → **"View Logs"**.

### Port binding issues
Railway sets `PORT` environment variable automatically. Next.js `npm start` reads it by default. No changes needed.

---

## Useful Railway Commands (Railway CLI)

Install CLI:
```bash
npm install -g @railway/cli
```

Link project:
```bash
railway login
railway link
```

View logs:
```bash
railway logs
```

Redeploy:
```bash
railway up
```
