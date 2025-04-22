'use client';

import Link from 'next/link';
import { 
  Box, 
  Container, 
  Flex, 
  Text, 
  Heading, 
  Button, 
  SimpleGrid,
  VStack,
  HStack,
  Badge
} from '@chakra-ui/react';
import SkillCard from '@/components/SkillCard';
import { SkillName } from '@/lib/types';
import { ALL_SKILLS } from '@/lib/constants';

export default function Home() {
  return (
    <Box>
      {/* Header/Navigation Bar */}
      <Box borderBottom="1px solid" borderColor="brand.border" bg="brand.card">
        <Container maxW="7xl" py={4}>
          <Flex justify="center" align="center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Heading as="h1" size="lg" fontWeight="bold">
                <Text as="span" color="brand.primary">Pro</Text>
                <Text as="span" color="white">bemas</Text>
              </Heading>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        {/* Hero Section */}
        <Container maxW="6xl" mt={8} p={{ base: 4, md: 8 }}>
          <Box bg="brand.card" borderRadius="lg" p={{ base: 6, md: 12 }} textAlign="center">
            <VStack gap={5} mb={8}>
              <Heading size="2xl" mb={2}>
                <Text as="span" color="brand.primary">Pro</Text>
                <Text as="span" color="white">bemas</Text>
                <Text as="span" color="white" mx={4}>|</Text>
                <Text as="span" color="brand.primary">Skills</Text>
              </Heading>
              <Text fontSize="lg" color="gray.300" maxW="3xl" mx="auto">
                Skip the Grind. Gear Up. Enjoy the Game. Mobile-first calculators with 100% mathematical parity with OldSchool.tools.
              </Text>
            </VStack>
            
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              justify="center" 
              gap={4} 
              mb={4}
            >
              <Button 
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                bg="brand.primary"
                color="brand.background"
                _hover={{ bg: 'brand.primaryHover' }}
              >
                Browse Skills →
              </Button>
            </Flex>
          </Box>
        </Container>

        {/* Skills Section */}
        <Container maxW="6xl" py={16} id="skills">
          <Flex align="center" mb={6}>
            <Badge 
              bg="rgba(234, 181, 22, 0.1)" 
              color="brand.primary" 
              px={3} 
              py={1} 
              borderRadius="md" 
              mr={3}
              fontWeight="medium"
            >
              Featured
            </Badge>
          </Flex>
          
          <Heading color="white" size="lg" mb={8}>Choose a Skill</Heading>
          
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} gap={4}>
            {ALL_SKILLS.map((skill) => (
              <SkillCard 
                key={skill} 
                skill={skill as SkillName}
              />
            ))}
          </SimpleGrid>
        </Container>
        
        {/* Why Use Our Calculators Section */}
        <Container maxW="6xl" py={8}>
          <Box bg="brand.card" borderRadius="lg" p={8} border="1px solid" borderColor="brand.border">
            <Heading size="lg" color="brand.primary" mb={4}>Why Use Our Calculators?</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <HStack align="start" gap={3}>
                <Text color="brand.primary">✓</Text>
                <Box>
                  <Text fontWeight="medium" color="white">Live Prices</Text>
                  <Text fontSize="sm" color="gray.400">Grand Exchange prices updated daily</Text>
                </Box>
              </HStack>
              <HStack align="start" gap={3}>
                <Text color="brand.primary">✓</Text>
                <Box>
                  <Text fontWeight="medium" color="white">Mobile-First</Text>
                  <Text fontSize="sm" color="gray.400">Responsive design works on all devices</Text>
                </Box>
              </HStack>
              <HStack align="start" gap={3}>
                <Text color="brand.primary">✓</Text>
                <Box>
                  <Text fontWeight="medium" color="white">100% Accurate</Text>
                  <Text fontSize="sm" color="gray.400">Mathematically accurate XP calculations</Text>
                </Box>
              </HStack>
              <HStack align="start" gap={3}>
                <Text color="brand.primary">✓</Text>
                <Box>
                  <Text fontWeight="medium" color="white">Advanced Filtering</Text>
                  <Text fontSize="sm" color="gray.400">Sort by XP efficiency, GP profit, or level</Text>
                </Box>
              </HStack>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>

      <Box as="footer" bg="brand.card" mt={16} py={8} borderTop="1px solid" borderColor="brand.border">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="sm" color="gray.400">© {new Date().getFullYear()} Probemas | All game content is copyright Jagex Ltd.</Text>
          <Text fontSize="sm" color="gray.400" mt={1}>Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.</Text>
        </Container>
      </Box>
    </Box>
  );
}
