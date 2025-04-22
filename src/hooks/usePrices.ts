"use client";

import { useQuery } from "@tanstack/react-query";
import { PriceData } from "@/lib/types";

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetch OSRS item prices from the Wiki API
 */
async function fetchPrices(): Promise<PriceData> {
  try {
    // Use the OSRS Wiki Prices API (with CORS proxy in production)
    const response = await fetch(
      "https://prices.runescape.wiki/api/v1/osrs/latest"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();
    return data.data as PriceData;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return {};
  }
}

/**
 * Hook to get live Grand Exchange prices
 */
export function usePrices() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    staleTime: CACHE_TIME,
    refetchInterval: CACHE_TIME,
    retry: 3,
  });

  return {
    prices: data || {},
    isLoading,
    isError,
    error,
  };
}

/**
 * Get price for a specific item
 * @param itemId The item ID to fetch
 */
export function useItemPrice(itemId: number) {
  const { prices, isLoading, isError } = usePrices();
  
  return {
    price: prices[itemId]?.price || 0,
    isLoading,
    isError,
  };
} 