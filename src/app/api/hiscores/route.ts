// This API route fetches player stats from the OSRS highscores
import { NextResponse } from 'next/server';

const HISCORES_API = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws';
const MAX_RETRIES = 3;
const TIMEOUT_MS = 10000; // 10 seconds

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

// Helper function to fetch with timeout and retry
async function fetchWithRetry(url: string, retries = MAX_RETRIES) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Create an AbortController to handle the timeout
      const controller = new AbortController();
      const signal = controller.signal;
      
      // Set up a timeout that will abort the fetch
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      // Try to fetch the data with a timeout
      const response = await fetch(url, { signal });
      
      // Clear the timeout since the request completed
      clearTimeout(timeoutId);
      
      // If we get a 404, we can stop retrying - the user doesn't exist
      if (response.status === 404) {
        return response;
      }
      
      // If we got a successful response, return it
      if (response.ok) {
        return response;
      }
      
      // Otherwise, store the error to throw if all retries fail
      lastError = new Error(`OSRS Hiscores API responded with status ${response.status}`);
    } catch (error) {
      // Store the error to throw if all retries fail
      lastError = error instanceof Error ? error : new Error('Unknown error during fetch');
      
      // If it's not our timeout abort, log the error
      if (!(error instanceof Error && error.name === 'AbortError')) {
        console.error(`Fetch attempt ${attempt} failed:`, error);
      } else {
        console.warn(`Fetch attempt ${attempt} timed out after ${TIMEOUT_MS}ms`);
      }
      
      // If it's the last retry, don't delay
      if (attempt === retries) break;
      
      // Exponential backoff: wait 2^attempt * 100ms
      const delayMs = Math.min(2 ** attempt * 100, 2000);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  // If we got here, all retries failed
  throw lastError || new Error('Failed to fetch from OSRS Hiscores after multiple retries');
}

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
    // Fetch player stats from OSRS hiscores with retry and timeout
    const response = await fetchWithRetry(`${HISCORES_API}?player=${encodeURIComponent(username)}`);

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
      { error: error instanceof Error ? error.message : 'Failed to fetch player stats' },
      { status: 500 }
    );
  }
} 