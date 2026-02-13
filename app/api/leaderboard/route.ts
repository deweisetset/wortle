import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await query(
      `SELECT id, display_name, total_score 
       FROM users 
       WHERE total_score > 0
       ORDER BY total_score DESC 
       LIMIT 10`
    );

    const leaderboard = result.rows.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return NextResponse.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Database error', detail: String(error) },
      { status: 500 }
    );
  }
}
