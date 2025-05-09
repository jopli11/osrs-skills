# Next.js + Chakra UI Hydration Error Troubleshooting

This document outlines common causes and solutions for React hydration errors when using Next.js (App Router) with Chakra UI.

## Common Symptoms

- Error messages in the browser console like:
  - "Hydration failed because the initial UI does not match what was rendered on the server."
  - "Text content does not match server-rendered HTML."
  - "Warning: Prop `className` did not match..."
  - "Warning: Prop `style` did not match..."
- Flickering UI on page load or navigation.
- Styles appearing incorrectly at first and then correcting themselves.

## Key Solutions & Best Practices

1.  **`ColorModeScript` and `ChakraProvider` Theme Consistency:**
    *   **Problem:** Chakra UI needs to know the initial color mode (light/dark) during server rendering and have the client initialize with the same mode to prevent style mismatches.
    *   **Solution:**
        *   Ensure you have a `theme.ts` (or similar) file defining your Chakra UI theme, including `initialColorMode` and `useSystemColorMode` in the `config` object.
            ```typescript
            // src/theme.ts
            import { extendTheme, ThemeConfig } from '@chakra-ui/react';
            import type { StyleFunctionProps } from '@chakra-ui/styled-system';

            const config: ThemeConfig = {
              initialColorMode: 'dark', // Or 'light', or based on system preference
              useSystemColorMode: false,
            };

            const theme = extendTheme({
              config,
              // Other customizations...
            });

            export default theme;
            ```
        *   Add `ColorModeScript` from `@chakra-ui/react` to your `src/app/layout.tsx`. Place it inside the `<body>` tag, before your main `<Providers>` component, and pass it the `initialColorMode` from your theme config.
            ```tsx
            // src/app/layout.tsx
            import { ColorModeScript } from '@chakra-ui/react';
            import theme from '@/theme'; // Your theme file

            export default function RootLayout({ children }) {
              return (
                <html lang="en">
                  <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Providers>{children}</Providers>
                  </body>
                </html>
              );
            }
            ```
        *   Pass your theme object to the `ChakraProvider` in your `src/app/providers.tsx` file.
            ```tsx
            // src/app/providers.tsx
            import { ChakraProvider } from '@chakra-ui/react';
            import theme from '@/theme'; // Your theme file

            export function Providers({ children }) {
              return (
                <ChakraProvider theme={theme}>
                  {/* Other providers */}
                  {children}
                </ChakraProvider>
              );
            }
            ```

2.  **`next/link` and Chakra UI `Link` Integration:**
    *   **Problem:** Mismatches in how link styles (e.g., `text-decoration`) are applied by `next/link` and Chakra UI link components.
    *   **Solution (for App Router):**
        *   Avoid using the `legacyBehavior` prop on `next/link`.
        *   When using `next/link` with Chakra UI's `Link` (or a `Box as="a"`), ensure `passHref` is on `next/link`. The Chakra `Link` component usually doesn't need an explicit `as="a"` if it's the direct child of `next/link` (without `legacyBehavior`).
            ```tsx
            import NextLink from 'next/link';
            import { Link as ChakraLink } from '@chakra-ui/react';

            // ...
            <NextLink href="/some-page" passHref>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                Go to page
              </ChakraLink>
            </NextLink>
            ```

3.  **Client-Only Components for Browser-Specific APIs:**
    *   **Problem:** Using `window`, `document`, `localStorage`, `Math.random()`, `new Date()` directly in the rendering logic of components that are server-rendered can cause mismatches because these are not available or behave differently on the server.
    *   **Solution:**
        *   Use `useEffect` to set state based on browser APIs only after the component has mounted.
            ```tsx
            const [isClient, setIsClient] = useState(false);
            useEffect(() => {
              setIsClient(true);
            }, []);

            if (!isClient) return null; // Or a loading spinner
            // Now you can safely use window object or render dynamic content
            ```
        *   Consider Next.js dynamic imports with `ssr: false` for components that are entirely client-side.
            ```tsx
            import dynamic from 'next/dynamic';

            const MyClientOnlyComponent = dynamic(
              () => import('@/components/MyClientOnlyComponent'),
              { ssr: false }
            );
            ```

4.  **`suppressHydrationWarning`:**
    *   **Use with caution.** For content that is intentionally different between server and client and cannot be easily resolved (e.g., timestamps updated live on the client), you can use the `suppressHydrationWarning` prop on the HTML element where the mismatch occurs.
    *   This doesn't *fix* the underlying mismatch but tells React to ignore it for that specific element and its children. It should be a last resort.
    *   Your `RootLayout` already uses this on `<html>` and `<body>`, which can be helpful for attributes managed by third-party scripts or browser extensions, but try to avoid it for your own component content.

5.  **Unique Keys for Lists:**
    *   **Problem:** Missing or non-unique `key` props when rendering lists of components.
    *   **Solution:** Always provide a stable, unique `key` to each item rendered in a loop.

6.  **Third-Party Libraries:**
    *   **Problem:** Some third-party React libraries might not be fully SSR-compatible or might have their own SSR considerations.
    *   **Solution:** Check the library's documentation for Next.js or SSR usage guides. You might need to wrap them in a client-only component (see point 3).

## General Debugging Steps

1.  **Check the Console:** The browser console is your best friend. Look at the full error messages and stack traces.
2.  **Simplify:** If you're unsure where the error originates, try removing components one by one from the problematic page until the error disappears. This helps isolate the faulty component.
3.  **Compare Server/Client Output:** Use browser developer tools to inspect the HTML structure sent from the server (View Page Source) and compare it to the HTML structure after client-side hydration (Elements tab) around the area where the warning occurs.
4.  **Update Dependencies:** Ensure Next.js, React, Chakra UI, and other relevant libraries are up to date, as bug fixes are often released.

Remember to restart your Next.js development server after making changes, especially to configuration or layout files. 