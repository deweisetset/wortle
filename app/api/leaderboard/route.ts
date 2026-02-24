import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      `SELECT id, display_name, total_score, email
       FROM users 
       ORDER BY total_score DESC 
       LIMIT 10`
    );

    const leaderboard = result.rows.map((player, index) => ({
      id: player.id,
      display_name: player.display_name,
      total_score: player.total_score,
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
