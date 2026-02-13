import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, score, word, attempts } = body;

    if (!user_id || score === undefined) {
      return NextResponse.json(
        { error: 'Missing user_id or score' },
        { status: 400 }
      );
    }

    const userId = parseInt(user_id);
    const points = parseInt(score);

    // Insert score record
    await query(
      'INSERT INTO scores (user_id, word, attempts, result, points) VALUES ($1, $2, $3, $4, $5)',
      [userId, word || null, attempts || null, 'win', points]
    );

    // Update total_score in users table
    await query(
      'UPDATE users SET total_score = total_score + $1 WHERE id = $2',
      [points, userId]
    );

    // Get updated user data
    const result = await query(
      'SELECT id, google_id, email, name, picture, display_name, total_score FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Save score error:', error);
    return NextResponse.json(
      { error: 'Database error', detail: String(error) },
      { status: 500 }
    );
  }
}
