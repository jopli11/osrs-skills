'use client';

import React from 'react';
import {
  Box,
  Container,
  Flex,
  Text,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import OsrsHeading from '@/components/OsrsHeading';
import Navigation from '@/components/Navigation';
import { track } from '@vercel/analytics';
import PlayerSection from '@/components/calculators/dps/PlayerSection';
import MonsterSection from '@/components/calculators/dps/MonsterSection';
import ResultsSection from '@/components/calculators/dps/ResultsSection';
import DPSChart from '@/components/calculators/dps/DPSChart';

// Placeholder components - will be implemented in later phases





export default function DPSCalculatorPage() {
  React.useEffect(() => {
    track('Page_View', { page: 'dps_calculator' });
  }, []);

  return (
    <Box>
      <Navigation />
      
      {/* Header Section */}
      <Container maxW="7xl" mt={8} p={{ base: 4, md: 8 }}>
        <Box 
          bg="rgba(42, 30, 15, 0.85)" 
          borderRadius="md" 
          p={{ base: 6, md: 8 }} 
          textAlign="center"
          border="2px solid black"
          boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
          backdropFilter="blur(4px)"
          position="relative"
          mb={8}
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
          <Flex direction="column" gap={4} align="center">
            <Badge 
              bg="#361f0e" 
              color="#ffcb2f" 
              px={3} 
              py={1.5} 
              borderRadius="sm"
              fontWeight="medium"
              border="1px solid black"
              boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
            >
              Advanced Calculator
            </Badge>
            <OsrsHeading fontSize="32px">DPS Calculator</OsrsHeading>
            <Text 
              fontSize="lg" 
              color="#e0d0b0" 
              maxW="3xl" 
              mx="auto"
              textShadow="2px 2px 3px rgba(0,0,0,0.8)"
            >
              Calculate your damage per second, analyze combat effectiveness, and optimize your gear setups for any monster in Old School RuneScape.
            </Text>
          </Flex>
        </Box>

        {/* Main Calculator Grid */}
        <SimpleGrid 
          columns={{ base: 1, lg: 3 }} 
          gap={6}
          mb={8}
        >
          <PlayerSection />
          <MonsterSection />
          <ResultsSection />
        </SimpleGrid>

                {/* Advanced Analysis Section */}
        <DPSChart />
      </Container>
    </Box>
  );
} 