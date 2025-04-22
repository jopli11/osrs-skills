"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ChakraProvider } from '@chakra-ui/react';
import chakraSystem from '@/lib/theme';

// Client-side cache, shared for the whole session of the user
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  const emotionCache = createEmotionCache();

  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider value={chakraSystem}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
} 