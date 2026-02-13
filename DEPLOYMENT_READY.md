# 📋 DEPLOYMENT CHECKLIST - WORTLE TO VERCEL

Complete checklist untuk deploy Wortle ke Vercel dengan sukses.

## ✅ PRE-DEPLOYMENT

### Code & Git
- [ ] Semua file sudah committed ke git
- [ ] `.env.local` TIDAK ada di git (sudah di .gitignore)
- [ ] Tidak ada console.error atau warning di build
- [ ] 0 security vulnerabilities (`npm audit`)
- [ ] Main branch clean dan siap untuk production

```bash
# Check security
npm audit
npm audit fix  # if needed

# Check TypeScript
npm run type-check

# Check linting
npm run lint
```

### Local Build Test
- [ ] Runlocal build tanpa error
- [ ] Local testing selesai (play game, login, leaderboard)

```bash
npm run build
npm start
# Test di http://localhost:3000
```

## ⚙️ INFRASTRUCTURE SETUP

### Database (Supabase)
- [ ] Supabase account dibuat di https://supabase.com
- [ ] Baru project dibuat
- [ ] Tables dibuat (users, scores)
- [ ] PostgreSQL connection string dicopy
- [ ] Email verification disabled (optional - untuk testing)
- [ ] Password reset policy configured

**Format CONNECTION STRING:**
```
postgresql://postgres.XXXXX:PASSWORD@db.XXXXX.supabase.co:5432/postgres
```

### Google OAuth 2.0
- [ ] Google Cloud Console project dibuat
- [ ] Google+ API enabled
- [ ] OAuth 2.0 Client ID created (Web Application)
- [ ] Client ID dan Secret dicopy
- [ ] Authorized JavaScript origins ditambah:
  - [ ] `http://localhost:3000`
  - [ ] `https://your-project.vercel.app`
- [ ] Authorized redirect URIs ditambah:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `https://your-project.vercel.app/auth/callback`

### OpenAI API (Optional)
- [ ] OpenAI account dibuat di https://platform.openai.com
- [ ] API key generated
- [ ] Billing setup completed ($5+ recommended)

## 🔐 ENVIRONMENT VARIABLES

### Local Development (.env.local)
Set di file lokal:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...apps.googleusercontent.com
OPENAI_API_KEY=sk-... (optional)
NODE_ENV=development
```

### Production (Vercel Dashboard)

**Settings → Environment Variables**

Tambah untuk semua environments:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Supabase connection string | Required |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Required |
| `OPENAI_API_KEY` | Your API key | Optional |
| `NODE_ENV` | `production` | Set ini, jangan development |

- [ ] DATABASE_URL ditambah di semua env
- [ ] NEXT_PUBLIC_GOOGLE_CLIENT_ID ditambah di semua env
- [ ] Variable visible di Overview
- [ ] Tidak ada typo di variable names

## 📤 DEPLOYMENT STEPS

### 1. Push ke GitHub
```bash
# Ensure everything is clean
git status

# Add & commit
git add .
git commit -m "Production ready - deploy to Vercel"

# Push ke main branch
git push origin main
```
- [ ] Semua changes sudah di GitHub
- [ ] Main branch sudah updated

### 2. Connect ke Vercel
- [ ] Vercel account dibuat di https://vercel.com
- [ ] GitHub account connected ke Vercel
- [ ] Repository authorized ke Vercel

### 3. Create Vercel Project
1. [ ] Buka https://vercel.com/new
2. [ ] Click "Import Git Repository"
3. [ ] Pilih repo `wortle`
4. [ ] Framework bernilai Next.js (auto-detected)
5. [ ] Build command: `next build` (default)
6. [ ] Output directory: `.next` (default)

### 4. Set Environment Variables di Vercel
1. [ ] Go ke project → Settings → Environment Variables
2. [ ] Tambah semua 3 variables (atau minimal 2 required)
3. [ ] Pilih "All Environments"
4. [ ] Save setiap variable

### 5. Deploy!
- [ ] Click "Deploy" button
- [ ] Tunggu build selesai (~3-5 minutes)
- [ ] Check build logs untuk errors
- [ ] Visit `https://your-project.vercel.app`

## ✨ POST-DEPLOYMENT

### Verification
- [ ] Site loading tanpa 404 errors
- [ ] Google OAuth login works
- [ ] Dapat login dengan Google
- [ ] Game dimainkan dengan sempurna
- [ ] Leaderboard muncul dan update
- [ ] Score disimpan ke database

### Testing
```
1. Click Login → Google OAuth popup
2. Login dengan testing Google account
3. Play game → submit word
4. Check leaderboard updated
5. Refresh page → data persisted
6. Try different words → UI correct
```

### Monitoring
- [ ] Check Vercel Analytics untuk traffic
- [ ] Check Supabase dashboard untuk database usage
- [ ] Monitor error logs di Vercel
- [ ] Set up email alerts di Vercel

## 🐛 TROUBLESHOOTING

### Build Fails on Vercel?
```
Lihat build logs:
- Check error message di "Build Output"
- Common: Missing env variable
```

### Database Connection Error?
```
1. Check DATABASE_URL format exact
2. Verify di Supabase authentication works
3. Check firewall settings
4. Try di SQL Editor tab di Supabase
```

### Google Login Not Working?
```
1. Check CLIENT_ID match di Supabase
2. Verify authorized origins include domain
3. Check cookies/3rd party settings browser
4. Try di incognito mode
```

### Next.js Compile Error?
```
npm run type-check  # di local
Perbaiki TypeScript errors
npm run build
Push ke GitHub → Vercel redeploy
```

## 🎯 OPTIMIZATION

### Performance
- [ ] Check Vercel Analytics score
- [ ] Enable Image Optimization (if using images)
- [ ] Set cache headers optimal

### Security
- [ ] Enable HTTPS (default di Vercel)
- [ ] Set security headers
- [ ] Disable unnecessary API endpoints
- [ ] Hide sensitive errors dari client

### Monitoring & Alerts
- [ ] Setup email alert untuk deployment fails
- [ ] Setup log alerting untuk database errors
- [ ] Monitor slow queries
- [ ] Setup uptime monitoring (uptime.com)

## 📚 IMPORTANT Links

- Vercel: https://vercel.com/dashboard
- Supabase: https://app.supabase.com
- Google Cloud: https://console.cloud.google.com
- GitHub: https://github.com/yourusername/wortle

## 🆘 SUPPORT RESOURCES

| Issue | Resource |
|-------|----------|
| Next.js Docs | https://nextjs.org/docs |
| Vercel Docs | https://vercel.com/docs |
| Supabase Docs | https://supabase.com/docs |
| PostgreSQL | https://www.postgresql.org/docs |
| TypeScript | https://www.typescriptlang.org/docs |

## ✅ FINAL CHECKLIST

- [ ] All checks above completed
- [ ] Site live at https://your-project.vercel.app
- [ ] Google login working
- [ ] Database connected & storing data
- [ ] Leaderboard updating
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Team members can verify deployment

---

## 🎉 DEPLOYMENT COMPLETE!

Selamat! Wortle sudah live! 🚀

**Next steps:**
1. Share URL dengan teman
2. Monitor performance
3. Gather user feedback
4. Plan features untuk version 2.0
