'use client';

// Ensure React hooks are NOT imported unless needed elsewhere
import { Box, Container, Text, BoxProps, Link, Flex, Divider, Stack } from '@chakra-ui/react';
import { useState, useEffect, Fragment } from 'react';

// No need for a separate interface if it just extends BoxProps
// interface FooterProps extends BoxProps {}

// Use BoxProps directly
export default function Footer({ ...props }: BoxProps) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const gold = '#eab516';

  // Link definitions for cleaner mapping/rendering
  const usefulLinks = [
    { label: 'OSRS Wiki', href: 'https://oldschool.runescape.wiki' },
    { label: 'Old School RuneScape', href: 'https://oldschool.runescape.com' },
    { label: 'GE Tracker', href: 'https://www.ge-tracker.com' },
    { label: 'RuneLite', href: 'https://runelite.net' },
  ];

  const partnerLinks = [
    { label: 'Probemas Raffles', href: 'https://probemas.com/raffles' },
    { label: 'FreeToKeep.gg', href: 'https://freetokeep.gg/' },
  ];

  return (
    <Box
      as="footer"
      borderTop="2px solid black"
      bg="#2a1e0f"
      color="#a0a0a0"
      py={4}
      mt={16}
      fontSize="sm"
      {...props}
    >
      <Container maxW="6xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 2, md: 6 }}
          justify="center"
          align="center"
          flexWrap="wrap"
          textAlign="center"
        >
          {/* Useful Links */}
          <Flex align="center" flexWrap="wrap">
            <Text color={gold} fontWeight="bold" mr={2}>
              Useful Links:
            </Text>
            {usefulLinks.map((l, idx) => (
              <Fragment key={l.href}>
                <Link
                  href={l.href}
                  isExternal
                  color="white"
                  _hover={{ color: gold }}
                  whiteSpace="nowrap"
                >
                  {l.label}
                </Link>
                {idx !== usefulLinks.length - 1 && (
                  <Text as="span" color={gold} mx={2} fontWeight="bold">
                    /
                  </Text>
                )}
              </Fragment>
            ))}
          </Flex>

          {/* Divider between sections for mobile */}
          <Divider display={{ base: 'block', md: 'none' }} borderColor={gold} opacity={0.4} />

          {/* Partners */}
          <Flex align="center" flexWrap="wrap">
            <Text color={gold} fontWeight="bold" mr={2}>
              Partners:
            </Text>
            {partnerLinks.map((l, idx) => (
              <Fragment key={l.href}>
                <Link
                  href={l.href}
                  isExternal
                  color="white"
                  _hover={{ color: gold }}
                  whiteSpace="nowrap"
                >
                  {l.label}
                </Link>
                {idx !== partnerLinks.length - 1 && (
                  <Text as="span" color={gold} mx={2} fontWeight="bold">
                    /
                  </Text>
                )}
              </Fragment>
            ))}
          </Flex>
        </Stack>

        {/* Legal & Contact */}
        <Stack mt={4} spacing={1} fontSize="xs" textAlign="center">
          <Text suppressHydrationWarning={true}>
            © {year} OSRSCalculators | All game content is copyright Jagex Ltd.
            {' '}| Not affiliated with Jagex or RuneScape. | Icons from the OSRS Wiki.
          </Text>
          <Text color={gold}>
            Contact: <Link href="mailto:joel@probemas.com" color="white" _hover={{ color: gold }}>joel@probemas.com</Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
} 