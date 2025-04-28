import { NextResponse } from 'next/server';

// Define interfaces for the data structures
interface PriceData {
  high: number | null;
  highTime: number | null;
  low: number | null;
  lowTime: number | null;
}

interface MappingItem {
  id: number;
  name: string;
  members: boolean;
  lowalch: number | null;
  highalch: number | null;
  limit: number | null;
  value: number;
  icon: string;
  examine: string;
  // Add other potential properties from mapping if known
}

interface CombinedItemData extends MappingItem, PriceData {}

// Define a descriptive User-Agent as required by the OSRS Wiki API
const USER_AGENT = 'OSRSCalculators.com Project - Fetching latest prices (contact: joel@runeraffle.com)'; 
// TODO: Replace placeholder contact info in USER_AGENT

const OSRS_API_BASE = 'https://prices.runescape.wiki/api/v1/osrs';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache duration

// Simple in-memory cache - Use const as the object reference itself doesn't change
const cache = {
  data: null as Record<string, CombinedItemData> | null, // Use specific type
  timestamp: 0,
};

async function fetchAndCombineData(): Promise<Record<string, CombinedItemData> | null> {
  console.log('API Route: Fetching fresh data from OSRS Wiki API');
  try {
    const [latestPriceResponse, mappingResponse] = await Promise.all([
      fetch(`${OSRS_API_BASE}/latest`, {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 0 } // Ensure fresh data is fetched, don't rely on Next.js default fetch cache here
      }),
      fetch(`${OSRS_API_BASE}/mapping`, {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 0 } // Ensure fresh data is fetched
      })
    ]);

    if (!latestPriceResponse.ok || !mappingResponse.ok) {
      // Log specific errors for easier debugging
      if (!latestPriceResponse.ok) console.error(`Failed to fetch latest prices: ${latestPriceResponse.status} ${latestPriceResponse.statusText}`);
      if (!mappingResponse.ok) console.error(`Failed to fetch mapping data: ${mappingResponse.status} ${mappingResponse.statusText}`);
      throw new Error('Failed to fetch required data from OSRS Wiki API');
    }

    // Type the expected API responses
    const latestPriceResult: { data: Record<string, PriceData> } = await latestPriceResponse.json();
    const mappingResult: MappingItem[] = await mappingResponse.json();
    
    const prices = latestPriceResult.data || {}; // Prices are nested under 'data'
    const mapping = Array.isArray(mappingResult) ? mappingResult : []; // Mapping is an array

    // Combine mapping and price data into a single object keyed by item ID
    const combinedData: Record<string, CombinedItemData> = {};
    mapping.forEach((item: MappingItem) => { // Use specific type
      if (item && item.id) {
        const itemId = String(item.id); // Use string ID as key
        // Provide default structure matching PriceData
        const priceInfo: PriceData = prices[itemId] || { high: null, low: null, highTime: null, lowTime: null };
        combinedData[itemId] = {
          ...item, // Spread mapping properties
          // Explicitly add price properties
          high: priceInfo.high,
          highTime: priceInfo.highTime,
          low: priceInfo.low,
          lowTime: priceInfo.lowTime,
        };
      }
    });

    // Update cache
    cache.data = combinedData;
    cache.timestamp = Date.now();
    console.log(`API Route: Successfully fetched and cached data for ${Object.keys(combinedData).length} items.`);

    return cache.data;

  } catch (error) {
    console.error('API Route: Error during fetchAndCombineData:', error);
    // Don't update cache on error, return null or re-throw
    return null; 
  }
}

export async function GET() {
  console.log('API Route: /api/prices called');

  // Check cache validity
  if (cache.data && (Date.now() - cache.timestamp < CACHE_DURATION_MS)) {
    console.log('API Route: Returning cached data.');
    // Return a *copy* to prevent accidental mutation if needed, though NextResponse.json likely handles this
    return NextResponse.json(cache.data); 
  }

  console.log('API Route: Cache stale or empty, fetching new data...');
  const freshData = await fetchAndCombineData();

  if (freshData) {
    return NextResponse.json(freshData);
  } else {
    // If fetching failed, return an error response
    return NextResponse.json(
      { error: 'Failed to fetch or process external price data.' },
      { status: 502 } // 502 Bad Gateway might be appropriate here
    );
  }
}

// Ensure the route is treated dynamically to respect our custom caching
export const dynamic = 'force-dynamic'; 