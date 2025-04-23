import { createSystem, defaultConfig } from '@chakra-ui/react';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif' },
        heading: { value: '"Roboto Slab", serif' },
      },
      colors: {
        brand: {
          primary: { value: '#ffcb2f' },
          primaryHover: { value: '#e0a922' },
          background: { value: '#0c0906' },
          card: { value: '#271c11' },
          cardHover: { value: '#211510' },
          border: { value: '#3a3529' },
          borderHover: { value: '#4d4637' },
          osrsYellow: { value: '#ffcb2f' },
          osrsGold: { value: '#ffcb2f' },
          osrsBrown: { value: '#271c11' },
          osrsDarkBrown: { value: '#211510' },
        },
      },
    },
    recipes: {
      Button: {
        variants: {
          variant: {
            primary: {
              bg: "#ffcb2f",
              color: "#211510",
              border: "2px solid black",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
              borderRadius: "sm",
              _hover: {
                bg: "#e0a922",
                transform: "translateY(1px)",
                boxShadow: "1px 1px 0 rgba(0,0,0,0.5)",
              },
            },
            secondary: {
              bg: "#271c11",
              color: "#ffcb2f",
              border: "2px solid black",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
              borderRadius: "sm",
              _hover: {
                bg: "#211510",
                transform: "translateY(1px)",
                boxShadow: "1px 1px 0 rgba(0,0,0,0.5)",
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
      Heading: {
        base: {
          color: "white",
          textShadow: "2px 2px 0 #000",
          fontFamily: '"Roboto Slab", serif',
        },
      },
    },
  },
});

export default system; 