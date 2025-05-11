'use client';

import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Container, 
  Flex, 
  Text, 
  Heading, 
  Button, 
  SimpleGrid,
  Badge,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import SkillCard from '@/components/SkillCard';
import { SkillName } from '@/lib/types';
import { ALL_SKILLS } from '@/lib/constants';
import OsrsHeading from '@/components/OsrsHeading';
import { track } from '@vercel/analytics';

// Dynamically import PlayerLookup with SSR disabled
const DynamicPlayerLookup = dynamic(
  () => import('@/components/PlayerLookup'),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <Box>
      {/* Header/Navigation Bar */}
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
          <Flex justify="space-between" align="center">
            <NextLink href="/" passHref legacyBehavior>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                <Heading 
                  as="h1" 
                  size="lg" 
                  fontWeight="bold" 
                  fontFamily="'Roboto Slab', serif"
                  textShadow="2px 2px 3px rgba(0,0,0,0.8)"
                >
                  <Box as="span" color="#ffcb2f">OSRS</Box>
                  <Box as="span" color="white">Calculators</Box>
                </Heading>
              </ChakraLink>
            </NextLink>
            
            {hasMounted && (
              <>
                {/* Desktop Navigation */}
                <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                  <NextLink href="/#skills" passHref legacyBehavior>
                    <ChakraLink
                      color="#e0d0b0"
                      fontSize="md"
                      fontWeight="medium"
                      _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                      onClick={() => track('Navigate_To_Skills', { from: '/' })}
                    >
                      Skills
                    </ChakraLink>
                  </NextLink>
                  <NextLink href="/combat-calculator" passHref legacyBehavior>
                    <ChakraLink 
                      color="#e0d0b0"
                      fontSize="md"
                      fontWeight="medium"
                      _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                      onClick={() => track('Navigate_To_CombatCalc', { from: '/' })}
                    >
                      Combat Calc
                    </ChakraLink>
                  </NextLink>
                  <NextLink href="/max-hit-calculator" passHref legacyBehavior>
                    <ChakraLink 
                      color="#e0d0b0"
                      fontSize="md"
                      fontWeight="medium"
                      _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                      onClick={() => track('Navigate_To_MaxHitCalc', { from: '/' })}
                    >
                      Max Hit Calc
                    </ChakraLink>
                  </NextLink>
                </HStack>

                {/* Mobile Navigation - Burger Icon */}
                <IconButton
                  aria-label="Open menu"
                  icon={<HamburgerIcon />}
                  display={{ base: 'flex', md: 'none' }}
                  onClick={onOpen}
                  bg="#ffcb2f"
                  color="#211305"
                  _hover={{ bg: '#e0a922' }}
                  size="md"
                />
              </>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer Menu - Conditionally render the ENTIRE Drawer based on mount */}
      {hasMounted && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="#2a1e0f" color="#e0d0b0">
            <DrawerCloseButton />
            <DrawerHeader 
              borderBottomWidth="1px" 
              borderColor="rgba(255, 203, 47, 0.2)"
              fontFamily="'Roboto Slab', serif"
              color="#ffcb2f"
            >
              Navigation
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" mt={4}>
                <NextLink href="/#skills" passHref legacyBehavior>
                  <ChakraLink 
                    fontSize="lg" 
                    fontWeight="medium" 
                    _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                    py={2} 
                    display="block"
                    onClick={() => { onClose(); track('Navigate_To_Skills', { from: 'mobile_menu' }); }}
                  >
                    Skills
                  </ChakraLink>
                </NextLink>
                <NextLink href="/combat-calculator" passHref legacyBehavior>
                  <ChakraLink 
                    fontSize="lg" 
                    fontWeight="medium" 
                    _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                    py={2} 
                    display="block"
                    onClick={() => { onClose(); track('Navigate_To_CombatCalc', { from: 'mobile_menu' }); }}
                  >
                    Combat Calc
                  </ChakraLink>
                </NextLink>
                <NextLink href="/max-hit-calculator" passHref legacyBehavior>
                  <ChakraLink 
                    fontSize="lg" 
                    fontWeight="medium" 
                    _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                    py={2} 
                    display="block"
                    onClick={() => { onClose(); track('Navigate_To_MaxHitCalc', { from: 'mobile_menu' }); }}
                  >
                    Max Hit Calc
                  </ChakraLink>
                </NextLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      <Box as="main">
        {/* Hero Section */}
        <Container maxW="6xl" mt={8} p={{ base: 4, md: 8 }}>
          <Box 
            bg="rgba(42, 30, 15, 0.85)" 
            borderRadius="md" 
            p={{ base: 6, md: 8 }} 
            textAlign="center"
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
            <Flex direction="column" gap={4} mb={6}>
              <Box mb={1}>
                {/* OSRS Style Logo */}
                <Heading 
                  size="2xl" 
                  fontFamily="'Roboto Slab', serif"
                  textShadow="2px 2px 3px rgba(0,0,0,0.8)"
                >
                  <Box as="span" color="#ffcb2f">OSRS</Box>
                  <Box as="span" color="white">Calculators</Box>
                </Heading>
              </Box>
              <Text 
                fontSize="lg" 
                color="#e0d0b0" 
                maxW="3xl" 
                mx="auto"
                textShadow="2px 2px 3px rgba(0,0,0,0.8)"
              >
                Plan your Old School RuneScape journey with precision.
              </Text>
            </Flex>
            
            <Button 
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              bg="#ffcb2f"
              color="#211305"
              _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
              border="2px solid black"
              boxShadow="2px 2px 0 rgba(0,0,0,0.5)"
              fontWeight="bold"
              fontSize="md"
              borderRadius="sm"
              py={5}
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                top: '1px',
                left: '1px',
                right: '1px',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              Browse Skills →
            </Button>
          </Box>
        </Container>

        {/* Skills Section */}
        <Container maxW="6xl" pt={12} pb={8} id="skills">
          <Flex direction="column" gap={6} align="flex-start">
            <Box width="100%" mb={6}>
              <Flex align="center" mb={3}>
                <Badge 
                  bg="#361f0e" 
                  color="#ffcb2f" 
                  px={3} 
                  py={1.5} 
                  borderRadius="sm" 
                  mr={3}
                  fontWeight="medium"
                  border="1px solid black"
                  boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
                >
                  New
                </Badge>
                <OsrsHeading>Import Your Stats</OsrsHeading>
              </Flex>
              
              <Box>
                <DynamicPlayerLookup />
              </Box>
            </Box>
            
            <Flex align="center">
              <Badge 
                bg="#361f0e" 
                color="#ffcb2f" 
                px={3} 
                py={1.5} 
                borderRadius="sm" 
                mr={3}
                fontWeight="medium"
                border="1px solid black"
                boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
              >
                Featured
              </Badge>
              <OsrsHeading>Choose a Skill</OsrsHeading>
            </Flex>
            
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} gap={4} width="100%">
              {ALL_SKILLS.map((skill: SkillName, index: number) => (
                <Box key={skill} onClick={() => track('Navigate_To_SkillPage', { skill: skill })} cursor="pointer">
                  <SkillCard 
                    skill={skill}
                    index={index}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Container>
        
        {/* Why Use Our Calculators Section */}
        <Container maxW="6xl" py={8}>
          <Box 
            bg="rgba(42, 30, 15, 0.75)" 
            borderRadius="md" 
            p={8} 
            border="2px solid" 
            borderColor="black"
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
            <OsrsHeading mb={6}>
              Why Use Our Calculators?
            </OsrsHeading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Flex align="start" gap={3}>
                <Text color="#ffcb2f" fontWeight="bold" fontSize="lg">✓</Text>
                <Box>
                  <Text fontWeight="bold" color="white" textShadow="2px 2px 3px rgba(0,0,0,0.8)">Live Prices</Text>
                  <Text fontSize="sm" color="#e0d0b0">Grand Exchange prices updated daily</Text>
                </Box>
              </Flex>
              <Flex align="start" gap={3}>
                <Text color="#ffcb2f" fontWeight="bold" fontSize="lg">✓</Text>
                <Box>
                  <Text fontWeight="bold" color="white" textShadow="2px 2px 3px rgba(0,0,0,0.8)">Mobile-First</Text>
                  <Text fontSize="sm" color="#e0d0b0">Responsive design works on all devices</Text>
                </Box>
              </Flex>
              <Flex align="start" gap={3}>
                <Text color="#ffcb2f" fontWeight="bold" fontSize="lg">✓</Text>
                <Box>
                  <Text fontWeight="bold" color="white" textShadow="2px 2px 3px rgba(0,0,0,0.8)">100% Accurate</Text>
                  <Text fontSize="sm" color="#e0d0b0">Mathematically accurate XP calculations</Text>
                </Box>
              </Flex>
              <Flex align="start" gap={3}>
                <Text color="#ffcb2f" fontWeight="bold" fontSize="lg">✓</Text>
                <Box>
                  <Text fontWeight="bold" color="white" textShadow="2px 2px 3px rgba(0,0,0,0.8)">Advanced Filtering</Text>
                  <Text fontSize="sm" color="#e0d0b0">Sort by XP efficiency, GP profit, or level</Text>
                </Box>
              </Flex>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
