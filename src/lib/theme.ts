import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define the theme configuration
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

// Extend the default Chakra UI theme
const theme = extendTheme({
  config, // Apply the config here
  // Add your custom colors, fonts, component styles, etc. directly
  colors: {
    brand: {
      50: '#e6f2ff', // Example brand color palette
      100: '#cce4ff',
      // ... add other shades 50-900
      500: '#007bff',
      900: '#00264d',
    },
    // Add other custom color palettes if needed
    // Example:
    // osrsYellow: '#ffcb2f',
  },
  fonts: {
    // heading: "'Your Heading Font', sans-serif",
    // body: "'Your Body Font', sans-serif",
  },
  // Add other theme extensions like component styles, breakpoints, etc.
  // Example:
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontWeight: 'bold',
  //     },
  //   },
  // },
});

export default theme; 