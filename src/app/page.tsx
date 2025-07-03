'use client';

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
  Image,
} from '@chakra-ui/react';
import React from 'react';
import SkillCard from '@/components/SkillCard';
import { SkillName } from '@/lib/types';
import { ALL_SKILLS } from '@/lib/constants';
import OsrsHeading from '@/components/OsrsHeading';
import Navigation from '@/components/Navigation';
import AdvertCarousel from '@/components/AdvertCarousel';
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
  return (
    <Box>
      <Navigation />

      {/* Main content wrapper */}
      <Box flex="1">
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

        {/* Advertisement Carousel */}
        <AdvertCarousel />

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
        
        {/* Blog Section */}
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
            <Flex align="center" justify="space-between" mb={6}>
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
                  Latest
                </Badge>
                <OsrsHeading>OSRS Blog</OsrsHeading>
              </Flex>
              <Button 
                as="a"
                href="/blog"
                bg="rgba(255, 203, 47, 0.1)" 
                color="#ffcb2f" 
                border="1px solid #ffcb2f"
                _hover={{ bg: 'rgba(255, 203, 47, 0.2)' }}
                fontWeight="medium"
                size="sm"
                onClick={() => track('Navigate_To_Blog', { from: 'homepage_blog_section' })}
              >
                View All Posts →
              </Button>
            </Flex>
            <Text color="#e0d0b0" mb={4}>
              Stay updated with the latest OSRS strategies, guides, and calculator updates.
            </Text>
            <Button 
              as="a"
              href="/blog"
              bg="#ffcb2f" 
              color="#211305" 
              _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
              border="2px solid black" 
              boxShadow="3px 3px 0 rgba(0,0,0,0.5)" 
              fontWeight="bold" 
              fontSize="md" 
              borderRadius="sm"
              onClick={() => track('Navigate_To_Blog', { from: 'homepage' })}
              leftIcon={
                <Image 
                  src="/icons/Blog Icon.png" 
                  alt="Blog Icon" 
                  boxSize="20px" 
                />
              }
            >
              Read Our Blog
            </Button>
          </Box>
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
