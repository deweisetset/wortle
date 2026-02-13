# 🚀 DEPLOYMENT GUIDE - WORTLE to VERCEL

Panduan lengkap untuk mengonline-kan project Wortle ke Vercel dengan database Supabase gratis!

## 📋 Checklist Pre-Deployment

- [ ] Google Cloud Console project (untuk OAuth credentials)
- [ ] OpenAI account dengan API key (untuk AI sentences)
- [ ] GitHub account (untuk push code)
- [ ] Supabase account (untuk database gratis)
- [ ] Vercel account (untuk hosting)

---

## STEP 1: Setup Google OAuth Credentials

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a Project" → "New Project"
3. Name: `Wortle` atau nama lain
4. Click "Create"
5. Wait untuk project creation selesai (~1-2 menit)

### 1.2 Enable Google+ API

1. Di sidebar, go to "APIs & Services" → "Library"
2. Search: `Google+ API`
3. Click result
4. Click "ENABLE"

### 1.3 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Jika diminta, click "Configure Consent Screen" dulu:
   - Select "External"
   - Fill basic info (nama app, email support)
   - Save & Continue
   - Skip optional scopes
   - Skip test users
   - Back to credentials
4. Click "Create Credentials" → "OAuth client ID" again
5. Select Application Type: `Web application`
6. Add Authorized JavaScript origins:
   - `http://localhost:3000` (untuk local development)
   - `https://your-vercel-app.vercel.app` (akan update nanti setelah deploy)
7. Add Authorized redirect URIs:
   - `http://localhost:3000/` (untuk local development)
   - `https://your-vercel-app.vercel.app/` (akan update nanti)
8. Click "Create"
9. Copy `Client ID` (jangan share dengan siapa pun!)
10. Close dialog

**Save Client ID untuk nanti!**

---

## STEP 2: Setup OpenAI API Key

### 2.1 Create OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Login
3. Navigate ke "API keys" di sidebar
4. Click "Create new secret key"
5. Copy key (format: `sk-...`)

**Save API key untuk nanti!**

⚠️ **PENTING**: Jangan share API key! Ini seperti password.

---

## STEP 3: Setup GitHub Repository

### 3.1 Initialize Git Repository

```bash
cd c:\xampp\htdocs\wortle

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Wortle project setup for Vercel deployment"
```

### 3.2 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `wortle` (bisa nama lain)
3. Description: "German Word Game dengan AI dan Leaderboard"
4. Make it **Public** (agar Vercel bisa akses)
5. **Jangan** initialize dengan README/gitignore (sudah ada)
6. Click "Create repository"

### 3.3 Push Code to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/wortle.git

# Rename branch ke main (jika perlu)
git branch -M main

# Push code
git push -u origin main
```

---

## STEP 4: Setup Supabase Database (FREE!)

### 4.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up dengan GitHub account (mudah!)
3. Click "New project"
4. Fill form:
   - Database name: `wortle`
   - Password: Generate strong password, **COPY & SAVE**
   - Region: choose closest to your users
5. Click "Create new project"
6. Wait ~2 menit...

### 4.2 Get Database Connection String

1. Di project dashboard, click "Settings" → "Database"
2. Look for "Connection string" section
3. Select "URI" tab
4. Copy string yang dimulai dengan `postgresql://`
5. **Replace `[YOUR-PASSWORD]` dengan password yang kamu generate tadi!**

**Contoh hasil:**
```
postgresql://postgres.xxxxxx:your-password-here@db.xxxxxx.supabase.co:5432/postgres
```

**Save connection string untuk nanti!**

### 4.3 Create Database Tables

1. Di Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Paste ini:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255),
  picture VARCHAR(512),
  display_name VARCHAR(50),
  total_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  word VARCHAR(16),
  attempts SMALLINT,
  result VARCHAR(10),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_google_id ON users(google_id);
CREATE INDEX idx_user_id ON scores(user_id);
```

4. Click "Run"
5. Check status - harus successful!

---

## STEP 5: Deploy to Vercel

### 5.1 Connect Vercel to GitHub

1. Go to [vercel.com/new](https://vercel.com/new)
2. Login dengan GitHub
3. Search untuk repository `wortle`
4. Click "Import"

### 5.2 Configure Project

1. Di "Configure Project" screen:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `.` (default)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

2. Click "Environment Variables" section
3. Add 3 variables:

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: `postgresql://postgres.xxxxxx:your-password@db.xxxxxx.supabase.co:5432/postgres`
   - Click "Add"

   **Variable 2:**
   - Key: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - Value: `[Client ID dari Step 1.3]`
   - Click "Add"

   **Variable 3:**
   - Key: `OPENAI_API_KEY`
   - Value: `[API key dari Step 2.1]`
   - Click "Add"

4. Click "Deploy"
5. Wait untuk build selesai (~2-3 menit)

### 5.3 Update Google OAuth Redirect URI

Setelah deploy berhasil:

1. Vercel akan show domain (contoh: `wortle-12345.vercel.app`)
2. Copy domain ini
3. Go to [Google Cloud Console](https://console.cloud.google.com) → Credentials
4. Click OAuth client ID yang sudah kamu buat
5. Add authorized URI baru:
   - `https://[your-vercel-domain]/` (replace dengan domain kamu)
6. Save

---

## STEP 6: Testing Production

### 6.1 Test Game

1. Open `https://your-vercel-domain.vercel.app`
2. Should see WORTLE game
3. Try klik "Info" button - harus bisa
4. Try klik "Login" button:
   - Should popup Google login
   - Verify dengan email
   - Should show username di header (format: `animal#1234`)

### 6.2 Test Game Play

1. Type kata Jerman 5 huruf
2. Press "Enter"
3. Should see validasi dari Wiktionary
4. If correct, should see points + AI example

### 6.3 Test Leaderboard

1. After win, click "Leaderboard"
2. Should show top 10 players
3. Your score should ada di list

### 6.4 Test Multiple Users

1. Open di browser lain / incognito
2. Login dengan email lain
3. Play dan cek leaderboard update

---

## STEP 7: Custom Domain (Optional)

Jika kamu punya domain sendiri:

1. Di Vercel project settings → "Domains"
2. Add custom domain
3. Vercel akan show DNS records to add
4. Add di domain provider (GoDaddy, Namecheap, etc)
5. Wait ~30 menit untuk propagate
6. Update Google OAuth redirect URI dengan domain baru

---

## Environment Variables Summary

| Variable | Value | Where to get |
|----------|-------|--------------|
| `DATABASE_URL` | Supabase connection string | [supabase.com](https://supabase.com) → Settings → Database → Connection string |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | [console.cloud.google.com](https://console.cloud.google.com) → Credentials |
| `OPENAI_API_KEY` | OpenAI API key | [platform.openai.com](https://platform.openai.com) → API keys |

---

## Troubleshooting

### Database Connection Error
**Error**: `Error: connect ECONNREFUSED`
- Check `DATABASE_URL` di Vercel settings
- Verify password di Supabase
- Pastikan database sudah initialized (run SQL dari Step 4.3)

### Google Login Blank / Tidak Muncul
**Error**: Google login popup gak muncul
1. Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` di Vercel
2. Verify authorized redirect URIs di Google Cloud Console
3. Must include `https://your-domain/` dengan trailing slash

### OpenAI Rate Limit
**Error**: "rate_limited" response
- Sistem cache otomatis membatasi 10 requests per 60 seconds
- Ini normal behavior
- Tunggu 1 menit, coba lagi

### Gambar icon tidak muncul
- Pastikan folder `public/icon/` ada
- Check console di DevTools untuk error message

---

## Cost Summary (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | **FREE** 🎉 | 100 GB bandwidth included |
| Supabase | **FREE** 🎉 | 500 MB database, 1GB bandwidth |
| Google Cloud | **FREE** | 1M OAuth requests free |
| OpenAI API | ~$1-5 | Bayar per API call (~$0.001 per request) |
| **TOTAL** | ~$1-5/month | Sangat terjangkau! |

---

## Next Steps

1. Monitor Vercel analytics di [vercel.com/dashboard](https://vercel.com/dashboard)
2. Check OpenAI usage di [platform.openai.com/account/usage](https://platform.openai.com/account/usage)
3. Setup email notifications untuk error alerts
4. Consider enable "Automatic deployments" di Vercel (auto-deploy setiap push ke main)

---

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

**Sukses! 🎉 Web game kamu sekarang online!**

Jika ada pertanyaan, buka issue di GitHub repo atau chat dengan AI assistant.
