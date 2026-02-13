# WORTLE — German Word Game 🎮

Game Wordle berbahasa Jerman dengan AI, leaderboard, dan Google login!

## 🌟 Features

✅ **Tebak kata Jerman** dalam 6 percobaan  
✅ **Login Google** untuk track skor  
✅ **Leaderboard** top 10 pemain  
✅ **AI-powered examples** menggunakan GPT-3.5  
✅ **Dictionary validation** dari Wiktionary  
✅ **Multi-language support** (ID, EN, DE)  

## 🚀 Quick Start

### Development Lokal
```bash
# Install dependencies
npm install

# Setup .env.local dengan credentials kamu
cp .env.example .env.local
# Edit .env.local dengan Google Client ID & OpenAI API key

# Start dev server
npm run dev
```

Buka: http://localhost:3000

### Deployment ke Vercel
Ikuti panduan di `SETUP_GUIDE.md` atau `DEPLOYMENT_CHECKLIST.md`

TL;DR:
1. Push code ke GitHub
2. Setup Supabase database
3. Connect ke Vercel
4. Add environment variables
5. Deploy!

## 📁 Project Structure

```
wortle/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Utilities (database, helpers)
├── public/                # Static assets
├── scripts/               # Game & login logic
└── styles/                # CSS
```

## 🔧 Environment Variables

```
DATABASE_URL=postgresql://...          # Supabase
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...      # Google OAuth
OPENAI_API_KEY=sk-...                 # OpenAI
```

## 📚 Documentation

- **SETUP_GUIDE.md** — Detailed deployment guide (step-by-step)
- **DEPLOYMENT_CHECKLIST.md** — Quick checklist na dapat i-follow
- **README_VERCEL.md** — Technical docs para sa developers

## 💻 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **APIs**: Google OAuth, OpenAI GPT-3.5, Wiktionary

## 📊 Project Stats

- **Lines of Code**: ~2000+ (frontend + backend)
- **Database Tables**: 2 (users, scores)
- **API Endpoints**: 4 routes
- **External APIs**: 3 integrations

## 📝 License

MIT

---

**Created with ❤️ for German learners!**

Questions? Check the documentation files or open an issue!
