'use client';

import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import OsrsHeading from '@/components/OsrsHeading';
import ClientOnly from '@/components/ClientOnly';
import { track } from '@vercel/analytics';

interface CalculatorOption {
  name: string;
  description: string;
  href: string;
  icon: string;
  trackingEventName: string;
}

const calculatorOptions: CalculatorOption[] = [
  {
    name: 'Total Level Calculator',
    description: 'Calculate your total level across all skills.',
    href: '/total-level-calculator',
    icon: '📊',
    trackingEventName: 'Navigate_To_TotalLevelCalc_From_Selection',
  },
  {
    name: 'XP Calculator',
    description: 'Calculate XP needed to reach target levels.',
    href: '/xp-calculator',
    icon: '📈',
    trackingEventName: 'Navigate_To_XpCalc_From_Selection',
  },
  {
    name: 'High Alchemy Calculator',
    description: 'Calculate profit/loss from high alchemy.',
    href: '/high-alch-calculator',
    icon: '🔥',
    trackingEventName: 'Navigate_To_HighAlchCalc_From_Selection',
  },
];

export default function MiscCalculatorsSelectionPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header */}
      <Box 
        borderBottom="2px solid" 
        borderColor="black" 
        bg="#2a1e0f"
        boxShadow="0 4px 6px rgba(0,0,0,0.6)"
        position="relative"
        _after={{ 
          content: '""', 
          position: 'absolute', 
          bottom: '-2px', 
          left: 0, 
          right: 0, 
          height: '1px', 
          backgroundColor: 'rgba(255, 203, 47, 0.2)' 
        }}
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="center" align="center">
            <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
              <Heading 
                as="h1" 
                size="lg" 
                fontWeight="bold" 
                fontFamily="'Roboto Slab', serif" 
                textShadow="2px 2px 0px #000"
              >
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">
                  | Misc Calculators
                </Text> 
              </Heading>
            </ChakraLink>
          </Flex>
        </Container>
      </Box>

      {/* Main content wrapper */}
      <Box flexGrow={1}>
        {/* Hero Section */}
        <Container maxW="6xl" mt={8} mb={8}>
          <Box 
            bg="rgba(42, 30, 15, 0.85)" 
            borderRadius="md" 
            p={6} 
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: '1px',
              left: '1px',
              right: '1px',
              height: '1px',
              backgroundColor: 'rgba(255, 203, 47, 0.2)'
            }}
          >
            <Flex 
              align="center" 
              justify="space-between" 
              flexDir={{ base: "column", md: "row" }} 
              gap={4}
            >
              <Flex align="center">
                <Box 
                  mr={4} 
                  p={2} 
                  borderRadius="full" 
                  bg="rgba(0,0,0,0.5)" 
                  border="1px solid rgba(0,0,0,0.8)" 
                  boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)"
                  fontSize="3xl"
                  width="72px"
                  height="72px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  🧮
                </Box>
                <Box>
                  <Heading 
                    size="lg" 
                    color="white" 
                    mb={1} 
                    textShadow="2px 2px 0px #000" 
                    fontFamily="'Roboto Slab', serif"
                  >
                    Misc Calculators
                  </Heading>
                  <Text color="#e0d0b0">
                    Utility calculators for skill planning and game optimization.
                  </Text>
                </Box>
              </Flex>
              <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
                <Button 
                  bg="#ffcb2f" 
                  color="#211305" 
                  _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
                  border="2px solid black" 
                  boxShadow="3px 3px 0 rgba(0,0,0,0.5)" 
                  fontWeight="bold" 
                  fontSize="md" 
                  borderRadius="sm"
                >
                  ← Back to Home
                </Button>
              </ChakraLink>
            </Flex>
          </Box>
        </Container>

        {/* Calculator Selection Grid */}
        <Container maxW="6xl" py={8}>
          <OsrsHeading mb={6} textAlign="center" fontSize="2xl">
            Select Calculator
          </OsrsHeading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {calculatorOptions.map((option) => (
              <NextLink key={option.name} href={option.href} passHref>
                <ClientOnly>
                  <ChakraLink 
                    display="flex"
                    height="100%"
                    _hover={{ 
                      textDecoration: 'none',
                      transform: 'translateY(-4px) scale(1.02)',
                      borderColor: '#ffcb2f',
                      boxShadow: '8px 8px 0 rgba(255, 203, 47, 0.2)', 
                    }}
                    onClick={() => track(option.trackingEventName, { from: '/misc-calculators'})}
                  >
                    <Box
                      p={8}
                      bg="rgba(30, 20, 10, 0.85)"
                      border="2px solid black"
                      borderRadius="md" 
                      boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
                      transition="all 0.2s ease-in-out"
                      width="100%"
                      height="100%"
                      textAlign="center"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box fontSize="4xl" mb={4}>
                        {option.icon}
                      </Box>
                      <Heading 
                        size="md" 
                        mb={2} 
                        color="white" 
                        textShadow="1px 1px 1px #000"
                      >
                        {option.name}
                      </Heading>
                      <Text fontSize="sm" color="#c5c5c5">
                        {option.description}
                      </Text>
                    </Box>
                  </ChakraLink>
                </ClientOnly>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>

        {/* Information Section */}
        <Container maxW="6xl" pb={8} display={{ base: 'none', md: 'block' }}>
          <Box 
            bg="rgba(42, 30, 15, 0.75)" 
            borderRadius="md" 
            p={6} 
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              top: '1px',
              left: '1px',
              right: '1px',
              height: '1px',
              backgroundColor: 'rgba(255, 203, 47, 0.2)'
            }}
          >
            <OsrsHeading fontSize="xl" mb={4} textAlign="center">
              Essential OSRS Tools
            </OsrsHeading>
            <Text color="#e0d0b0" fontSize="sm" textAlign="center" mb={4}>
              These miscellaneous calculators provide essential utility for planning your Old School RuneScape journey. 
              From tracking your total level progress to optimizing XP gains and calculating profitable activities.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box textAlign="center">
                <Text color="#ffcb2f" fontWeight="bold" mb={2}>📊 Progress Tracking</Text>
                <Text color="#b0a080" fontSize="xs">
                  Monitor your account progression with total level calculations and skill planning tools.
                </Text>
              </Box>
              <Box textAlign="center">
                <Text color="#ffcb2f" fontWeight="bold" mb={2}>📈 XP Planning</Text>
                <Text color="#b0a080" fontSize="xs">
                  Calculate exact XP requirements and plan your training methods efficiently.
                </Text>
              </Box>
              <Box textAlign="center">
                <Text color="#ffcb2f" fontWeight="bold" mb={2}>💰 Profit Analysis</Text>
                <Text color="#b0a080" fontSize="xs">
                  Analyze profitability of various activities like high alchemy for optimal GP/XP ratios.
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 