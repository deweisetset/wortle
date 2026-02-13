import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const animals = ['kucing', 'panda', 'ular', 'elang', 'harimau'];

function generateDisplayName(): string {
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${animal}#${num}`;
}

async function verifyGoogleToken(accessToken: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${encodeURIComponent(accessToken)}`
    );
    
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
    
    const data = await response.json();
    
    if (!data.sub) {
      throw new Error('Invalid token');
    }
    
    return data;
  } catch (error) {
    console.error('Google verification error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { access_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: 'Missing access_token' },
        { status: 400 }
      );
    }

    // Verify token with Google
    const tokenInfo = await verifyGoogleToken(access_token);
    
    const googleId = tokenInfo.sub;
    const email = tokenInfo.email || null;
    const name = tokenInfo.name || null;
    const picture = tokenInfo.picture || null;

    // Check if user exists
    const existing = await query(
      'SELECT id, display_name, total_score FROM users WHERE google_id = $1',
      [googleId]
    );

    let userId, displayName, totalScore;

    if (existing.rows.length > 0) {
      // User exists, update
      const user = existing.rows[0];
      userId = user.id;
      displayName = user.display_name;
      totalScore = user.total_score;

      await query(
        'UPDATE users SET email = $1, name = $2, picture = $3 WHERE id = $4',
        [email, name, picture, userId]
      );
    } else {
      // Create new user
      displayName = generateDisplayName();
      totalScore = 0;

      const result = await query(
        'INSERT INTO users (google_id, email, name, picture, display_name, total_score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [googleId, email, name, picture, displayName, totalScore]
      );

      userId = result.rows[0].id;
    }

    return NextResponse.json({
      user: {
        id: userId,
        google_id: googleId,
        email,
        name,
        picture,
        display_name: displayName,
        total_score: totalScore,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', detail: String(error) },
      { status: 500 }
    );
  }
}
