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
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { SkillIcon } from '@/components/SkillIcon'; // For icons on cards
import OsrsHeading from '@/components/OsrsHeading';
import ClientOnly from '@/components/ClientOnly'; // Import ClientOnly
import { track } from '@vercel/analytics';
import { SkillName } from '@/lib/types'; // For SkillIcon typing

interface CalculatorOption {
  name: string;
  description: string;
  href: string;
  iconSkill: SkillName;
  trackingEventName: string;
}

const calculatorOptions: CalculatorOption[] = [
  {
    name: 'Melee Max Hit',
    description: 'Calculate your maximum Melee damage.',
    href: '/melee-max-hit-calculator',
    iconSkill: 'attack',
    trackingEventName: 'Navigate_To_MeleeMaxHitCalc_From_Selection',
  },
  {
    name: 'Ranged Max Hit',
    description: 'Calculate your maximum Ranged damage.',
    href: '/ranged-max-hit-calculator',
    iconSkill: 'ranged',
    trackingEventName: 'Navigate_To_RangedMaxHitCalc_From_Selection',
  },
  {
    name: 'Magic Max Hit',
    description: 'Calculate your maximum Magic damage.',
    href: '/magic-max-hit-calculator',
    iconSkill: 'magic',
    trackingEventName: 'Navigate_To_MagicMaxHitCalc_From_Selection',
  },
];

export default function MaxHitCalculatorSelectionPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header (consistent with other pages) */}
      <Box 
        borderBottom="2px solid" 
        borderColor="black" 
        bg="#2a1e0f"
        boxShadow="0 4px 6px rgba(0,0,0,0.6)"
        position="relative"
        _after={{ content: '""', position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255, 203, 47, 0.2)' }}
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="center" align="center">
            <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
              <Heading as="h1" size="lg" fontWeight="bold" fontFamily="'Roboto Slab', serif" textShadow="2px 2px 0px #000">
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Max Hit Calculator</Text> 
              </Heading>
            </ChakraLink>
          </Flex>
        </Container>
      </Box>

      {/* Main content wrapper that will grow */}
      <Box flexGrow={1}>
        {/* Hero Section for Max Hit Selection */}
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
            <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
              <Flex align="center">
                <Box mr={4} p={2} borderRadius="full" bg="rgba(0,0,0,0.5)" border="1px solid rgba(0,0,0,0.8)" boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)">
                   <SkillIcon skill={'strength'} size={56} /> {/* Generic strength icon for main max hit page */}
                </Box>
                <Box>
                  <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">Max Hit Calculator</Heading>
                  <Text color="#e0d0b0">Choose a combat style to calculate your max hit.</Text>
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
                  ← Back to Skills
                </Button>
              </ChakraLink>
            </Flex>
          </Box>
        </Container>

        {/* Calculator Selection Grid */}
        <Container maxW="6xl" py={8}>
          <OsrsHeading mb={6} textAlign="center" fontSize="2xl">
            Select Combat Style
          </OsrsHeading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {calculatorOptions.map((option) => (
              <NextLink key={option.name} href={option.href} passHref>
                <ClientOnly> {/* Wrap the part causing hydration issues */}
                  <ChakraLink 
                    display="flex"
                    height="100%"
                    _hover={{ 
                      textDecoration: 'none',
                      transform: 'translateY(-4px) scale(1.02)',
                      borderColor: '#ffcb2f',
                      boxShadow: '8px 8px 0 rgba(255, 203, 47, 0.2)', 
                    }}
                    onClick={() => track(option.trackingEventName, { from: '/max-hit-calculator'})}
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
                      <SkillIcon skill={option.iconSkill} size={56} />
                      <Heading size="md" mt={4} mb={2} color="white" textShadow="1px 1px 1px #000">{option.name}</Heading>
                      <Text fontSize="sm" color="#c5c5c5">{option.description}</Text>
                    </Box>
                  </ChakraLink>
                </ClientOnly>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>

        {/* SEO Information Box - Desktop Only */}
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
            <OsrsHeading fontSize="xl" mb={4} textAlign="center">Understanding Max Hit Calculations</OsrsHeading>
            <Text color="#e0d0b0" fontSize="sm" textAlign="center">
              Max hit calculators are essential tools for Old School RuneScape players looking to optimize their combat performance. 
              By inputting your stats, gear, prayers, and potions, you can determine the highest possible damage you can deal with a single attack. 
              This is crucial for various activities, including Player vs. Monster (PvM) encounters, bossing, and Player vs. Player (PvP) combat. 
              Understanding your max hit helps in choosing the right gear setups, prayer activations, and consumable usage to improve your efficiency and effectiveness in OSRS. 
              Use our Melee, Ranged, and Magic max hit calculators to fine-tune your setup for any combat scenario!
            </Text>
          </Box>
        </Container>

        {/* Pro Tips Box - Desktop Only */}
        <Container maxW="6xl" pb={8} display={{ base: 'none', md: 'block' }}>
          <Box 
            bg="rgba(30, 20, 10, 0.85)"
            borderRadius="md" 
            p={6} 
            border="2px solid"
            borderColor="black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(2px)"
            position="relative"
            _after={{}}
          >
    
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="#ffcb2f" />
                Always use the highest-tier stat-boosting prayers and potions available to you for a significant damage increase.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#ffcb2f" />
                Don&apos;t forget weapon special attacks! Many can drastically increase your max hit or overall DPS.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#ffcb2f" />
                Consider your opponent&apos;s defensive stats. Higher accuracy can be just as important as a higher max hit in many situations.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="#ffcb2f" />
                Slayer tasks often provide damage and accuracy boosts against specific monsters when wearing a Slayer Helmet or Black Mask.
              </ListItem>
            </List>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 