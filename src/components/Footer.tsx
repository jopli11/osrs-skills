'use client';

// Ensure React hooks are NOT imported unless needed elsewhere
import { Box, Container, Text, BoxProps, Link, Flex, Divider } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// No need for a separate interface if it just extends BoxProps
// interface FooterProps extends BoxProps {}

// Use BoxProps directly
export default function Footer({ ...props }: BoxProps) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          Useful Links:
        </Text>
        <Flex justifyContent="center" alignItems="center" gap={4} mb={4}>
          <Link href="https://oldschool.runescape.wiki" isExternal _hover={{ color: "white" }}>
            OSRS Wiki
          </Link>
          <Link href="https://oldschool.runescape.com" isExternal _hover={{ color: "white" }}>
            Old School RuneScape
          </Link>
          <Link href="https://www.ge-tracker.com" isExternal _hover={{ color: "white" }}>
            GE Tracker
          </Link>
          <Link href="https://runelite.net" isExternal _hover={{ color: "white" }}>
            RuneLite
          </Link>
        </Flex>

        <Divider borderColor="rgba(255,255,255,0.1)" my={4} />

        <Text fontSize="sm" suppressHydrationWarning={true}>
          © {year} OSRSCalculators | All game content is copyright Jagex Ltd.
        </Text>
        <Text fontSize="xs" mt={1}>
          Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.
        </Text>
      </Container>
    </Box>
  );
} 