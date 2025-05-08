'use client';

// Ensure React hooks are NOT imported unless needed elsewhere
import { Box, Container, Text, BoxProps } from '@chakra-ui/react';

// No need for a separate interface if it just extends BoxProps
// interface FooterProps extends BoxProps {}

// Use BoxProps directly
export default function Footer({ ...props }: BoxProps) {
  // Footer is now simple, no hasMounted needed here

  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <Box 
      as="footer" 
      borderTop="2px solid black" 
      bg="#2a1e0f" 
      color="#a0a0a0" 
      py={6} 
      mt={16}
      {...props}
    >
      <Container maxW="6xl" textAlign="center">
        <Text fontSize="sm">
          {/* Use dynamic year */}
          © {currentYear} OSRSCalculators | All game content is copyright Jagex Ltd.
        </Text>
        <Text fontSize="xs" mt={1}>
          Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.
        </Text>
      </Container>
    </Box>
  );
} 