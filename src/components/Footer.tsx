'use client';

// Ensure React hooks are NOT imported unless needed elsewhere
import { Box, Container, Text, BoxProps, Link, Flex, Divider, Stack, Image } from '@chakra-ui/react';
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
        {/* Main Footer Layout with Logos */}
        <Flex 
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          position="relative"
        >
          {/* Left Logo */}
          <Box 
            display={{ base: 'none', lg: 'block' }}
            position="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
          >
            <Box
              width="120px"
              height="40px"
              overflow="hidden"
              position="relative"
            >
              <Image 
                src="/images/logov3.png"
                alt="OSRS Calculators Logo"
                width="auto"
                height="150%"
                objectFit="cover"
                objectPosition="center 50%"
                position="absolute"
                top="50%"
                left="50%"
                style={{ transform: "translate(-50%, -50%) scale(1.4)" }}
              />
            </Box>
          </Box>

          {/* Center Content */}
          <Box flex="1" maxW={{ base: "100%", lg: "600px" }} mx="auto">
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
                {' '}| Not affiliated with Jagex or RuneScape.
              </Text>
              <Text color={gold}>
                Contact: <Link href="mailto:joel@probemas.com" color="white" _hover={{ color: gold }}>joel@probemas.com</Link>
              </Text>
            </Stack>
          </Box>

          {/* Right Logo */}
          <Box 
            display={{ base: 'none', lg: 'block' }}
            position="absolute"
            right="0"
            top="50%"
            transform="translateY(-50%)"
          >
            <Box
              width="120px"
              height="40px"
              overflow="hidden"
              position="relative"
            >
              <Image 
                src="/images/logov3.png"
                alt="OSRS Calculators Logo"
                width="auto"
                height="150%"
                objectFit="cover"
                objectPosition="center 50%"
                position="absolute"
                top="50%"
                left="50%"
                style={{ transform: "translate(-50%, -50%) scale(1.4)" }}
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
} 