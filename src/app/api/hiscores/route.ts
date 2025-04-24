// This API route fetches player stats from the OSRS highscores
import { NextResponse } from 'next/server';

const HISCORES_API = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws';
const MAX_RETRIES = 3;
const TIMEOUT_MS = 15000; // Increase timeout to 15 seconds

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
  let lastResponse;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`OSRS Hiscores fetch attempt ${attempt}/${retries} for ${url}`);
      // Create an AbortController to handle the timeout
      const controller = new AbortController();
      const signal = controller.signal;
      
      // Set up a timeout that will abort the fetch
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      
      // Try to fetch the data with a timeout
      const response = await fetch(url, { 
        signal,
        headers: {
          'User-Agent': 'OSRS Calculators Tool/1.0'
        },
        cache: 'no-store' // Don't cache responses as hiscores data changes
      });
      
      // Store the response even if it's an error, so we can analyze it later
      lastResponse = response;
      
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
      console.error(`OSRS Hiscores API error (attempt ${attempt}/${retries}):`, lastError);
    } catch (error) {
      // Store the error to throw if all retries fail
      lastError = error instanceof Error ? error : new Error('Unknown error during fetch');
      
      // If it's not our timeout abort, log the error
      if (!(error instanceof Error && error.name === 'AbortError')) {
        console.error(`Fetch attempt ${attempt}/${retries} failed:`, error);
      } else {
        console.warn(`Fetch attempt ${attempt}/${retries} timed out after ${TIMEOUT_MS}ms`);
        lastError = new Error(`The OSRS Hiscores server took too long to respond (timeout after ${TIMEOUT_MS}ms)`);
      }
      
      // If it's the last retry, don't delay
      if (attempt === retries) break;
      
      // Exponential backoff: wait 2^attempt * 200ms
      const delayMs = Math.min(2 ** attempt * 200, 3000);
      console.log(`Waiting ${delayMs}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  // If we got here, all retries failed
  const errorMessage = lastError?.message || 'Failed to fetch from OSRS Hiscores after multiple retries';
  console.error('All OSRS Hiscores fetch attempts failed:', errorMessage);
  
  // If we have a response, we can provide more detailed error info
  if (lastResponse) {
    console.error('Last response status:', lastResponse.status);
    try {
      // Try to get response text for more debug info
      const text = await lastResponse.text();
      console.error('Last response text:', text.substring(0, 200)); // Log first 200 chars
    } catch (e) {
      console.error('Could not read response text:', e);
    }
  }
  
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

  console.log(`Looking up OSRS player: ${username}`);

  try {
    // Fetch player stats from OSRS hiscores with retry and timeout
    const response = await fetchWithRetry(`${HISCORES_API}?player=${encodeURIComponent(username)}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Player not found: ${username}`);
        return NextResponse.json(
          { error: 'Player not found in the OSRS Hiscores' },
          { status: 404 }
        );
      }
      
      const errorMessage = `OSRS Hiscores API responded with status ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Parse the CSV response from OSRS
    const data = await response.text();
    if (!data || data.trim() === '') {
      console.error('Empty response from OSRS Hiscores API');
      throw new Error('Received empty response from OSRS Hiscores');
    }
    
    const lines = data.split('\n');
    console.log(`Received ${lines.length} lines of data for player ${username}`);

    // Extract skill levels and create a stats object
    const stats: Record<string, { rank: number; level: number; xp: number }> = {};

    Object.entries(SKILL_INDICES).forEach(([skill, index]) => {
      if (lines[index]) {
        const parts = lines[index].split(',');
        if (parts.length >= 3) {
          const [rank, level, xp] = parts.map(Number);
          stats[skill] = { rank, level, xp };
        } else {
          console.warn(`Invalid data format for skill ${skill}: ${lines[index]}`);
        }
      }
    });

    // Make sure we got some stats
    if (Object.keys(stats).length === 0) {
      console.error('No stats parsed from response');
      throw new Error('Could not parse player stats from OSRS Hiscores response');
    }

    console.log(`Successfully retrieved stats for player ${username}`);
    return NextResponse.json({ username, stats });
  } catch (error) {
    console.error('Error fetching OSRS hiscores:', error);
    
    let errorMessage = 'Failed to fetch player stats';
    const statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Provide more user-friendly error messages
      if (errorMessage.includes('timeout')) {
        errorMessage = 'The OSRS Hiscores server took too long to respond. Please try again later.';
      } else if (errorMessage.includes('network')) {
        errorMessage = 'There was a network issue while connecting to the OSRS Hiscores. Please check your internet connection.';
      } else if (errorMessage.includes('fetch')) {
        errorMessage = 'There was an issue retrieving data from the OSRS Hiscores. Please try again later.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 