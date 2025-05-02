import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv'; // Import KV

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
const PRICES_KV_KEY = 'osrs_prices_v1'; // Use the same key as the update route

// Remove the old in-memory cache
// const cache = { ... }; 
// const CACHE_DURATION_MS = ...;

async function fetchAndCombineData(): Promise<Record<string, CombinedItemData> | null> {
  console.log('API Route: Fetching fresh data from OSRS Wiki API (KV Cache Miss/Error)');
  try {
    const [latestPriceResponse, mappingResponse] = await Promise.all([
      fetch(`${OSRS_API_BASE}/latest`, { headers: { 'User-Agent': USER_AGENT }, next: { revalidate: 0 } }),
      fetch(`${OSRS_API_BASE}/mapping`, { headers: { 'User-Agent': USER_AGENT }, next: { revalidate: 0 } })
    ]);

    if (!latestPriceResponse.ok || !mappingResponse.ok) {
      if (!latestPriceResponse.ok) console.error(`Prices API: Failed to fetch latest prices: ${latestPriceResponse.status} ${latestPriceResponse.statusText}`);
      if (!mappingResponse.ok) console.error(`Prices API: Failed to fetch mapping data: ${mappingResponse.status} ${mappingResponse.statusText}`);
      throw new Error('Failed to fetch required data from OSRS Wiki API');
    }

    const latestPriceResult: { data: Record<string, PriceData> } = await latestPriceResponse.json();
    const mappingResult: MappingItem[] = await mappingResponse.json();
    
    const prices = latestPriceResult.data || {};
    const mapping = Array.isArray(mappingResult) ? mappingResult : [];

    const combinedData: Record<string, CombinedItemData> = {};
    mapping.forEach((item: MappingItem) => {
      if (item && item.id) {
        const itemId = String(item.id);
        const priceInfo: PriceData = prices[itemId] || { high: null, low: null, highTime: null, lowTime: null };
        combinedData[itemId] = {
          ...item,
          high: priceInfo.high,
          highTime: priceInfo.highTime,
          low: priceInfo.low,
          lowTime: priceInfo.lowTime,
        };
      }
    });
    console.log(`Prices API: Successfully fetched fresh data for ${Object.keys(combinedData).length} items.`);
    // Optionally, update KV cache here as a fallback if needed?
    // await kv.set(PRICES_KV_KEY, combinedData); 
    return combinedData;

  } catch (error) {
    console.error('Prices API: Error during fetchAndCombineData:', error);
    return null; 
  }
}

export async function GET() {
  console.log('API Route: /api/prices called');

  // 1. Try fetching from Vercel KV first
  let cachedData: Record<string, CombinedItemData> | null = null;
  try {
    cachedData = await kv.get(PRICES_KV_KEY);
    if (cachedData) {
      console.log(`API Route: Returning cached data from KV (${Object.keys(cachedData).length} items).`);
      return NextResponse.json(cachedData);
    }
    console.log('API Route: KV cache miss.');
  } catch (error) {
    console.error('API Route: Error fetching data from Vercel KV:', error);
    // Don't necessarily fail the request, just proceed to live fetch
  }

  // 2. If KV fails or cache miss, fetch live data
  console.log('API Route: Fetching live data as fallback...');
  const freshData = await fetchAndCombineData();

  if (freshData) {
    // Optionally update cache even on fallback?
    try {
      await kv.set(PRICES_KV_KEY, freshData);
      console.log('API Route: Updated KV cache after live fetch fallback.');
    } catch (kvError) {
       console.error('API Route: Failed to update KV cache after live fetch:', kvError);
    }
    return NextResponse.json(freshData);
  } else {
    // If fetching live also failed, return an error response
    console.error('API Route: Failed to fetch live data after cache miss/error.');
    return NextResponse.json(
      { error: 'Failed to fetch price data from cache and live source.' },
      { status: 502 }
    );
  }
}

// Ensure the route is treated dynamically
export const dynamic = 'force-dynamic'; 