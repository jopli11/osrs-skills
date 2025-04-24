// This API route fetches player stats from the OSRS highscores
import { NextResponse } from 'next/server';

const HISCORES_API = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws';

// Official skill indices from the OSRS API response
const SKILL_INDICES: Record<string, number> = {
  overall: 0,
  attack: 1,
  defence: 2,
  strength: 3,
  hitpoints: 4,
  ranged: 5,
  prayer: 6,
  magic: 7,
  cooking: 8,
  woodcutting: 9,
  fletching: 10,
  fishing: 11,
  firemaking: 12,
  crafting: 13,
  smithing: 14,
  mining: 15,
  herblore: 16,
  agility: 17,
  thieving: 18,
  slayer: 19,
  farming: 20,
  runecraft: 21,
  hunter: 22,
  construction: 23,
};

export async function GET(request: Request) {
  // Get the username from the query params
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch player stats from OSRS hiscores
    const response = await fetch(`${HISCORES_API}?player=${encodeURIComponent(username)}`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Player not found in the OSRS Hiscores' },
          { status: 404 }
        );
      }
      
      throw new Error(`OSRS Hiscores API responded with status ${response.status}`);
    }

    // Parse the CSV response from OSRS
    const data = await response.text();
    const lines = data.split('\n');

    // Extract skill levels and create a stats object
    const stats: Record<string, { rank: number; level: number; xp: number }> = {};

    Object.entries(SKILL_INDICES).forEach(([skill, index]) => {
      if (lines[index]) {
        const [rank, level, xp] = lines[index].split(',').map(Number);
        stats[skill] = { rank, level, xp };
      }
    });

    return NextResponse.json({ username, stats });
  } catch (error) {
    console.error('Error fetching OSRS hiscores:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player stats' },
      { status: 500 }
    );
  }
} 