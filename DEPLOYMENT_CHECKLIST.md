# 🚀 WORTLE DEPLOYMENT CHECKLIST

Copy-paste checklist ini dan check sesuai progress!

---

## ✅ PHASE 1: SETUP CREDENTIALS (30 mins)

### Google OAuth
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project named "Wortle"
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 Web Application credentials
- [ ] Add authorized origins & redirects (with localhost:3000)
- [ ] **SAVE: Client ID** → paste di sini: `________________`

### OpenAI API
- [ ] Go to https://platform.openai.com
- [ ] Create/Login account
- [ ] Go to API keys section
- [ ] Create new secret key
- [ ] **SAVE: API Key** → paste di sini: `________________`

---

## ✅ PHASE 2: GITHUB SETUP (15 mins)

### Initialize Repository
```bash
cd c:\xampp\htdocs\wortle
git init
git add .
git commit -m "Initial commit"
```

### Push to GitHub
- [ ] Go to https://github.com/new
- [ ] Create repository named "wortle"
- [ ] **Copy:** `git remote add origin https://github.com/YOUR_USERNAME/wortle.git`
  ```bash
  git remote add origin https://github.com/___/wortle.git
  git branch -M main
  git push -u origin main
  ```
- [ ] Verify code di GitHub

---

## ✅ PHASE 3: SUPABASE SETUP (20 mins)

### Create Project
- [ ] Go to https://supabase.com
- [ ] Create new project named "wortle"
- [ ] **COPY: Database Password** → paste di sini: `________________`
- [ ] Wait untuk project creation selesai

### Create Tables
- [ ] Go to SQL Editor
- [ ] Paste & run SQL dari `SETUP_GUIDE.md` (SQL queries)
- [ ] Verify tables created (users, scores)

### Get Connection String
- [ ] Go to Settings → Database
- [ ] Copy URI connection string
- [ ] Replace `[YOUR-PASSWORD]` dengan password dari step sebelumnya
- [ ] **SAVE: CONNECTION STRING** → paste di sini:
  ```
  postgresql://postgres.______:________________@db.______.supabase.co:5432/postgres
  ```

---

## ✅ PHASE 4: VERCEL DEPLOYMENT (15 mins)

### Deploy New Project
- [ ] Go to https://vercel.com/new
- [ ] Login with GitHub
- [ ] Import "wortle" repository
- [ ] Select Framework: **Next.js**
- [ ] Leave other settings as default

### Add Environment Variables
Before clicking "Deploy", add these 3 variables:

#### Variable 1: DATABASE_URL
- [ ] Key: `DATABASE_URL`
- [ ] Value: `[CONNECTION STRING dari Phase 3]`
- [ ] Click "Add"

#### Variable 2: Google Client ID
- [ ] Key: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] Value: `[Client ID dari Phase 1]`
- [ ] Click "Add"

#### Variable 3: OpenAI API Key
- [ ] Key: `OPENAI_API_KEY`
- [ ] Value: `[API Key dari Phase 1]`
- [ ] Click "Add"

### Deploy
- [ ] Click "Deploy" button
- [ ] Wait untuk build selesai (2-3 minutes)
- [ ] **SAVE: Vercel Domain** → `https://_____.vercel.app`

---

## ✅ PHASE 5: FINALIZE GOOGLE OAUTH (10 mins)

After Vercel deployment:

- [ ] Go back to Google Cloud Console
- [ ] Go to Credentials → OAuth Client ID settings
- [ ] Add authorized redirect URI (new):
  - [ ] `https://[your-vercel-domain]/` (with trailing slash)
- [ ] Save

---

## ✅ PHASE 6: TESTING

### Access Website
- [ ] Open https://_____.vercel.app
- [ ] See WORTLE game title ✓

### Test Login
- [ ] Click "Login" button
- [ ] Google popup appears ✓
- [ ] Login with email ✓
- [ ] Username shows di header (format: `animal#1234`) ✓

### Test Gameplay
- [ ] Type word (contoh: "katze")
- [ ] Press Enter ✓
- [ ] See color feedback (green/yellow/gray) ✓
- [ ] See AI example sentence ✓

### Test Leaderboard
- [ ] Win a game
- [ ] Click "Leaderboard" ✓
- [ ] See score di list ✓

### Test Database
- [ ] Play dengan 2 akun berbeda
- [ ] Check leaderboard updated ✓

---

## 🎉 ALL DONE!

Your Wortle game is now LIVE on Vercel! 🚀

**Sharing URL:**
```
https://[your-vercel-domain].vercel.app
```

**Credentials Saved:**
- [ ] Google Client ID: `________________`
- [ ] OpenAI API Key: `sk-________________`
- [ ] Database URL: `postgresql://________________`
- [ ] Vercel Domain: `https://________________.vercel.app`

---

## 📝 NOTES

- Keep credentials safe! Never commit sensitive keys to GitHub
- Monitor OpenAI usage (could incur costs)
- Vercel + Supabase free tier is sufficient for testing
- Setup email alerts di Vercel untuk downtime notifications

---

## 🆘 STUCK?

1. Check `SETUP_GUIDE.md` for detailed step-by-step
2. Check Vercel logs: https://vercel.com/dashboard → project → Deployments
3. Check Supabase logs di SQL Editor
4. Check browser DevTools console (F12) untuk errors

**Good luck! 🍀**
