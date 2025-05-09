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
import { SkillIcon } from '@/components/SkillIcon'; // For icons on cards
import OsrsHeading from '@/components/OsrsHeading';
import Footer from '@/components/Footer';
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
        <Container maxW="4xl" py={8}>
          <OsrsHeading mb={6} textAlign="center" fontSize="2xl">
            Select Combat Style
          </OsrsHeading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {calculatorOptions.map((option) => (
              <NextLink key={option.name} href={option.href} passHref legacyBehavior>
                <ChakraLink 
                  as="a" 
                  _hover={{ textDecoration: 'none' }}
                  onClick={() => track(option.trackingEventName, { from: '/max-hit-calculator'})}
                >
                  <Box
                    p={6}
                    bg="rgba(42, 30, 15, 0.75)"
                    border="2px solid black"
                    borderRadius="md"
                    boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
                    transition="all 0.2s ease-in-out"
                    _hover={{
                      transform: 'translateY(-4px) scale(1.02)',
                      borderColor: '#ffcb2f',
                      boxShadow: '8px 8px 0 rgba(255, 203, 47, 0.2)',
                      cursor: 'pointer'
                    }}
                    textAlign="center"
                    height="100%" // Ensure cards in a row are same height
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <SkillIcon skill={option.iconSkill} size={48} />
                    <Heading size="md" mt={4} mb={2} color="white" textShadow="1px 1px 1px #000">{option.name}</Heading>
                    <Text fontSize="sm" color="#c5c5c5">{option.description}</Text>
                  </Box>
                </ChakraLink>
              </NextLink>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
} 