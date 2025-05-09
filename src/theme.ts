import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Chakra UI theme configuration
const config: ThemeConfig = {
  initialColorMode: 'dark', // Or 'light' or based on system preference
  useSystemColorMode: false, // Set to true if you want to respect user's system settings
};

const theme = extendTheme({
  config,
  // You can add other theme customizations here later (colors, fonts, components, etc.)
  styles: {
    global: () => ({
      body: {
        // Add global body styles here if needed, e.g.:
        // bg: _props.colorMode === 'dark' ? 'gray.800' : 'white',
        // color: _props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
});

export default theme; 