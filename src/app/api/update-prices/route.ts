import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// --- Replicate necessary interfaces and constants ---
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
}

interface CombinedItemData extends MappingItem, PriceData {}

const USER_AGENT = 'OSRSCalculators.com Project - Daily Price Update Cron (contact: joel@runeraffle.com)'; 
// TODO: Replace placeholder contact info in USER_AGENT

const OSRS_API_BASE = 'https://prices.runescape.wiki/api/v1/osrs';
const PRICES_KV_KEY = 'osrs_prices_v1'; // Key for storing prices in KV

// --- Replicate fetching logic (or import if refactored) ---
async function fetchAndCombineData(): Promise<Record<string, CombinedItemData> | null> {
  console.log('Update Prices Cron: Fetching fresh data from OSRS Wiki API');
  try {
    const [latestPriceResponse, mappingResponse] = await Promise.all([
      fetch(`${OSRS_API_BASE}/latest`, {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 0 } 
      }),
      fetch(`${OSRS_API_BASE}/mapping`, {
        headers: { 'User-Agent': USER_AGENT },
        next: { revalidate: 0 } 
      })
    ]);

    if (!latestPriceResponse.ok || !mappingResponse.ok) {
      if (!latestPriceResponse.ok) console.error(`Update Prices Cron: Failed to fetch latest prices: ${latestPriceResponse.status} ${latestPriceResponse.statusText}`);
      if (!mappingResponse.ok) console.error(`Update Prices Cron: Failed to fetch mapping data: ${mappingResponse.status} ${mappingResponse.statusText}`);
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
    console.log(`Update Prices Cron: Successfully fetched data for ${Object.keys(combinedData).length} items.`);
    return combinedData;

  } catch (error) {
    console.error('Update Prices Cron: Error during fetchAndCombineData:', error);
    return null; 
  }
}

export async function GET(request: Request) {
  // 1. Authorization Check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('Update Prices Cron: Unauthorized access attempt.');
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('Update Prices Cron: Authorized request received.');

  // 2. Fetch Fresh Data
  const freshData = await fetchAndCombineData();

  if (!freshData) {
    console.error('Update Prices Cron: Failed to fetch fresh data. Aborting KV update.');
    return NextResponse.json(
      { error: 'Failed to fetch external price data.' },
      { status: 502 }
    );
  }

  // 3. Store in Vercel KV
  try {
    await kv.set(PRICES_KV_KEY, freshData);
    console.log(`Update Prices Cron: Successfully stored fetched data in KV under key: ${PRICES_KV_KEY}`);
    return NextResponse.json({ success: true, message: `Updated prices for ${Object.keys(freshData).length} items.` });
  } catch (error) {
    console.error('Update Prices Cron: Error storing data in Vercel KV:', error);
    return NextResponse.json(
      { error: 'Failed to store fetched data in cache.' },
      { status: 500 }
    );
  }
}

// Ensure the route is treated dynamically
export const dynamic = 'force-dynamic'; 