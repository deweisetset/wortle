import { NextRequest, NextResponse } from 'next/server';

// In-memory cache (will be reset on redeploy, but good enough for Vercel)
const aiCache = new Map<string, { result: any; created_at: number }>();
const rateLimits = new Map<string, number[]>();

const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 60 seconds in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimits.get(ip) || [];
  
  // Filter out old timestamps
  const validTimestamps = timestamps.filter((ts) => now - ts <= RATE_WINDOW);
  
  if (validTimestamps.length >= RATE_LIMIT) {
    return false;
  }
  
  validTimestamps.push(now);
  rateLimits.set(ip, validTimestamps);
  return true;
}

async function generateExampleWithOpenAI(word: string, apiKey: string) {
  const prompt = `Buat satu contoh kalimat singkat dalam bahasa Jerman yang menggunakan kata "${word}".
Berikan juga terjemahan dalam bahasa Indonesia.
Output hanya berupa JSON dengan dua properti: "german" dan "translation".
Gunakan Zeitform: Präsens atau Perfekt.
Gunakan 1 subject: ich, du, er/sie/es, wir, ihr, atau sie.
Pastikan konjugasi kata kerja sesuai dengan subjek.
Jika menggunakan Perfekt, pilih auxiliary verb (haben/sein) yang tepat.

Contoh:
{
  "german": "Das ist ein Beispiel.",
  "translation": "Ini adalah contoh."
}

Jangan tambahkan penjelasan lain.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Kamu asisten yang menulis satu kalimat Jerman singkat dan terjemahannya dalam Bahasa Indonesia.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;

  // Try to parse JSON
  let parsed = JSON.parse(text);
  if (!parsed.german && !parsed.translation) {
    // Fallback: split by lines
    const lines = text.split('\n').filter((l: string) => l.trim());
    parsed = {
      german: lines[0] || text,
      translation: lines[1] || '',
    };
  }

  return {
    german: parsed.german || '',
    translation: parsed.translation || '',
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'rate_limited' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { word } = body;

    if (!word || word.trim() === '') {
      return NextResponse.json(
        { error: 'missing_word' },
        { status: 400 }
      );
    }

    const wordKey = word.toLowerCase().trim();

    // Check cache
    const cached = aiCache.get(wordKey);
    if (cached) {
      return NextResponse.json({
        from_cache: true,
        result: cached.result,
      });
    }

    // Get API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'missing_api_key' },
        { status: 500 }
      );
    }

    // Generate with OpenAI
    const result = await generateExampleWithOpenAI(word, apiKey);

    // Cache it
    aiCache.set(wordKey, {
      result,
      created_at: Date.now(),
    });

    return NextResponse.json({
      from_cache: false,
      result,
    });
  } catch (error) {
    console.error('AI endpoint error:', error);
    return NextResponse.json(
      {
        error: 'ai_error',
        detail: String(error),
      },
      { status: 500 }
    );
  }
}
