# 🚀 VERCEL DEPLOYMENT GUIDE

## Prerequisites
✅ Git repository initialized  
✅ GitHub account  
✅ Vercel account (free at vercel.com)  
✅ PostgreSQL database (Supabase recommended)  
✅ Google OAuth credentials  

---

## STEP 1: Prepare Your Database (Supabase)

### Option A: Using Supabase (Recommended)
1. Go to https://supabase.com and sign up (free)
2. Create a new project:
   - Choose region closest to you
   - Set strong password
   - Wait for project to be ready (~2 min)
3. Get Connection String:
   - Go to **Settings** → **Database**
   - Copy **Connection String** (URI format)
   - Replace `[YOUR-PASSWORD]` with actual password
   - Choose `pooling` mode or `session` mode

**Example:**
```
postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres
```

4. Save this - you'll need it for Vercel environment variables

---

## STEP 2: Push Code to GitHub

```bash
# Initialize git if not done
git init
git add .
git commit -m "Ready for Vercel deployment"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/wortle.git
git branch -M main
git push -u origin main
```

---

## STEP 3: Deploy to Vercel

### Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Paste your GitHub repo URL
4. Click **Import**
5. Fill in **Environment Variables:**
   - `DATABASE_URL` = PostgreSQL connection string from Supabase
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` = Your Google OAuth Client ID
   - `OPENAI_API_KEY` = Your OpenAI API key (if using AI)
6. Click **Deploy**

### Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to set environment variables
```

---

## STEP 4: Get Google OAuth Client ID

1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable **Google+ API**:
   - Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: **Web application**
   - Authorized JavaScript origins:
     ```
     https://yourdomain.vercel.app
     https://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     https://yourdomain.vercel.app/api/auth/callback
     https://localhost:3000/api/auth/callback
     ```
4. Copy **Client ID** and add to Vercel

---

## STEP 5: Configure Vercel Environment Variables

In Vercel Dashboard:

**Project → Settings → Environment Variables**

Add these variables:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres...` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789.apps.googleusercontent.com` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `NODE_ENV` | production | `production` |

✅ **IMPORTANT**: Use **All Environments** (Development, Preview, Production)

---

## STEP 6: Verify Deployment

1. Vercel will automatically build from GitHub
2. Check build logs in Vercel Dashboard
3. Once deployed, visit your site: `https://your-project.vercel.app`

**Common Issues:**

| Error | Solution |
|-------|----------|
| `DATABASE_URL is not defined` | Add to Vercel Environment Variables |
| `Google Client ID mismatch` | Update authorized origins in Google Console |
| `Database connection timeout` | Check Supabase connection string format |
| `Build fails - pg module` | Already configured - should work |

---

## STEP 7: Test Features

After deployment:

1. **Login Test:**
   - Click "Login" button
   - Verify Google OAuth works
   - Check database for user creation

2. **Game Test:**
   - Play a word
   - Submit guess
   - Check leaderboard updates

3. **Database Test:**
   - Go to Supabase Dashboard
   - Check **users** and **scores** tables have data

---

## STEP 8: Custom Domain (Optional)

In Vercel Dashboard:
1. **Project → Settings → Domains**
2. Add custom domain
3. Update DNS records according to Vercel instructions
4. Update Google OAuth origins with new domain

---

## Environment Variables Checklist

- ✅ `DATABASE_URL`: Supabase PostgreSQL connection
- ✅ `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: From Google Console
- ✅ `OPENAI_API_KEY`: From OpenAI (optional)
- ✅ `NODE_ENV`: Set to "production"

---

## Troubleshooting Commands

```bash
# Test locally before pushing
npm run build
npm start

# Check environment variables are loaded
echo $DATABASE_URL
echo $NEXT_PUBLIC_GOOGLE_CLIENT_ID

# View Vercel deployment logs
vercel logs

# Redeploy if needed
vercel --prod --name=wortle
```

---

## After Deployment

### Monitor Your App
- Vercel Dashboard → **Analytics**
- Check function invocations and errors
- Monitor database usage in Supabase

### Database Backups
- Supabase automatically backs up daily
- Enable more frequent backups in Supabase settings

### Keep Updated
- Periodically update Next.js and dependencies
- Run `npm update` and test locally
- Commit and push changes

---

## 🎉 Selesai!

Your Wortle game should now be live at `https://your-project.vercel.app`!

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
