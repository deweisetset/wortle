# WORTLE 🎮 - German Word Game

Tebak kata bahasa Jerman dalam 6 percobaan dengan fitur AI, leaderboard, dan login Google!

## Stack Teknologi

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (recommended for Vercel)
- **APIs**: 
  - Google OAuth 2.0
  - OpenAI GPT-3.5 Turbo (untuk example sentences)
  - Wiktionary API (validasi kata)
  - MyMemory Translator (translate DE→ID)

## Fitur

✅ Game Wordle berbahasa Jerman  
✅ Login dengan Google  
✅ Leaderboard top 10 pemain  
✅ AI-powered example sentences  
✅ Caching & rate limiting  
✅ Responsive design  
✅ Local word list fallback  

## Setup Development Lokal

### Prerequisites
- Node.js 18+ & npm
- PostgreSQL database (atau bisa pakai Supabase)
- Google OAuth credentials
- OpenAI API key

### Installation

1. Clone repository atau buka folder project:
```bash
cd c:\xampp\htdocs\wortle
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
# Copy from example
cp .env.example .env.local

# Edit .env.local dengan credentials kamu:
# DATABASE_URL=postgresql://...
# NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
# OPENAI_API_KEY=...
```

4. Setup database:
```bash
# Jalankan migrations (jika ada) atau SQL script secara manual:
psql -U postgres -d wortle -f api/create_db.sql
```

5. Start development server:
```bash
npm run dev
```

6. Buka browser ke `http://localhost:3000`

## Deploy ke Vercel

### Step 1: Prepare repository

```bash
# Initialize git (jika belum ada)
git init
git add .
git commit -m "Initial commit"

# Push ke GitHub, GitLab, atau Bitbucket
git push ...
```

### Step 2: Setup Database (Supabase recommended)

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Copy `DATABASE_URL` dari project settings
4. Run setup SQL:
   ```sql
   -- Paste isi dari api/create_db.sql
   ```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) dan login
2. Click "New Project"
3. Import repository dari GitHub/GitLab/Bitbucket
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
5. Add Environment Variables:
   - `DATABASE_URL`: dari Supabase
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google credentials
   - `OPENAI_API_KEY`: OpenAI API key
6. Click "Deploy"

### Step 4: Update Google OAuth Redirect URI

1. Go ke [Google Cloud Console](https://console.cloud.google.com)
2. Edit OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `https://your-vercel-app.vercel.app`
   - `https://your-domain.com` (jika ada custom domain)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Yes | Google OAuth Client ID |
| `OPENAI_API_KEY` | Yes | OpenAI API key for AI features |
| `NODE_ENV` | No | Development atau production |

## API Routes

- `POST /api/auth/google` - Google OAuth verification
- `POST /api/scores` - Save game score
- `GET /api/leaderboard` - Get top 10 players
- `POST /api/ai/example` - Generate AI example sentence

## File Structure

```
wortle/
├── app/
│   ├── api/
│   │   ├── auth/google/route.ts
│   │   ├── scores/route.ts
│   │   ├── leaderboard/route.ts
│   │   └── ai/example/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── db.ts
├── public/
│   ├── icon/
│   └── ...
├── scripts/
│   ├── wortle-game.js
│   ├── login.ts
│   ├── dictionary-api.js
│   └── game-constants.js
├── styles/
│   └── wortle.css
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── vercel.json
```

## Troubleshooting

### Database Connection Error
- Pastikan `DATABASE_URL` format benar
- Check IP whitelist di database provider

### Google Login tidak bekerja
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` di browser DevTools
- Check authorized redirect URIs di Google Cloud Console

### OpenAI API Error
- Verify API key di environment variables
- Check rate limit (10 req/60s per IP)
- Cache system otomatis mencegah duplicate requests

## Performance Tips

- AI examples di-cache untuk mengurangi OpenAI API calls
- Rate limiting diterapkan untuk mencegah abuse
- PostgreSQL connection pooling via Vercel
- Static assets di-serve dari Vercel CDN

## License

MIT

## Support

Ada pertanyaan? Buka issue di repository atau hubungi team!
