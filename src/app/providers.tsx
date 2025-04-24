"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Notification from '@/components/Notification';

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
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Notification />
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
} 