import { createSystem, defaultConfig } from '@chakra-ui/react';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif' },
        heading: { value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif' },
      },
      colors: {
        brand: {
          primary: { value: '#eab516' },
          primaryHover: { value: '#d9a012' },
          background: { value: '#0f111a' },
          card: { value: '#141824' },
          cardHover: { value: '#1a1f2e' },
          border: { value: '#1e2131' },
          borderHover: { value: '#2d3748' },
        },
      },
    },
    recipes: {
      Button: {
        variants: {
          variant: {
            primary: {
              bg: "brand.primary",
              color: "brand.background",
              _hover: {
                bg: "brand.primaryHover",
              },
            },
            secondary: {
              bg: "transparent",
              color: "white",
              border: "1px solid",
              borderColor: "brand.border",
              _hover: {
                bg: "brand.cardHover",
              },
            },
          },
        },
      },
      Link: {
        base: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default system; 