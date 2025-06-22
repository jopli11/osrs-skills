'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { SkillIcon } from '@/components/SkillIcon';
import { useQuery } from '@tanstack/react-query';
import { track } from '@vercel/analytics';

// Interface for the API price data structure
interface PriceData {
  [itemId: string]: {
    id: number;
    name: string;
    icon: string;
    high: number | null;
    highTime: number | null;
    low: number | null;
    lowTime: number | null;
    limit?: number;
    members?: boolean;
    lowalch?: number;
    highalch?: number;
    value?: number;
  };
}

// Function to fetch price data from the API
const fetchPrices = async (): Promise<PriceData> => {
  const response = await fetch('/api/prices');
  if (!response.ok) {
    throw new Error('Network response was not ok while fetching prices.');
  }
  return response.json();
};

export default function CannonballCalculatorPage() {
  const [steelBars, setSteelBars] = useState<number>(1000);
  
  const { data: prices, isLoading } = useQuery<PriceData, Error>({
    queryKey: ['itemPrices'],
    queryFn: fetchPrices,
    staleTime: 10 * 60 * 1000, // 10 minutes stale time
    refetchOnWindowFocus: false,
    retry: 1
  });

  const calculations = useMemo(() => {
    if (!prices || isLoading) return null;
    
    // Use high price for steel bars (buying cost) and low price for cannonballs (selling price)
    const steelBarPrice = prices['2353']?.high || 0; // Steel bar
    const cannonballPrice = prices['2']?.low || 0; // Cannonball
    
    // Cannonball production rates
    const cannonballsPerBar = 4; // Each steel bar makes 4 cannonballs
    const barsPerHour = 2400; // Approximate rate at furnace
    const cannonballsPerHour = barsPerHour * cannonballsPerBar;
    
    // Calculations based on input
    const cannonballsProduced = steelBars * cannonballsPerBar;
    const timeRequired = steelBars / barsPerHour; // Hours needed
    
    // Costs and profits
    const totalCost = steelBars * steelBarPrice;
    const totalRevenue = cannonballsProduced * cannonballPrice;
    const profit = totalRevenue - totalCost;
    const profitPerHour = profit / timeRequired;
    
    // XP calculations
    const xpPerBar = 25.6; // XP from making 4 cannonballs
    const totalXp = steelBars * xpPerBar;
    const xpPerHour = totalXp / timeRequired;
    
    // Efficiency metrics
    const profitPerCannonball = profit / cannonballsProduced;
    const costPerCannonball = totalCost / cannonballsProduced;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    
    return {
      steelBarPrice,
      cannonballPrice,
      cannonballsProduced,
      timeRequired,
      totalCost,
      totalRevenue,
      profit,
      profitPerHour,
      totalXp,
      xpPerHour,
      profitPerCannonball,
      costPerCannonball,
      profitMargin,
      cannonballsPerHour,
    };
  }, [steelBars, prices, isLoading]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const formatGp = (num: number) => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${formatNumber(num)} gp`;
  };

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours.toFixed(1)} hr`;
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header */}
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
            <ChakraLink as={NextLink} href="/" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
              <Heading as="h1" size="lg" fontWeight="bold" fontFamily="'Roboto Slab', serif" textShadow="2px 2px 0px #000">
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Cannonball Calculator</Text>
              </Heading>
            </ChakraLink>
          </Flex>
        </Container>
      </Box>

      {/* Main content wrapper */}
      <Box flex="1">
        {/* Hero Banner */}
        <Container maxW="6xl" mt={8}>
          <Box
            bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)" backdropFilter="blur(4px)" position="relative"
            _after={{ content: '""', position: 'absolute', top: '1px', left: '1px', right: '1px', height: '1px', backgroundColor: 'rgba(255, 203, 47, 0.2)' }}
          >
            <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
              <Flex align="center">
                <Box mr={4} p={2} borderRadius="full" bg="rgba(0,0,0,0.5)" border="1px solid rgba(0,0,0,0.8)" boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)" position="relative" width="64px" height="64px" display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src="/icons/calculators/cannonball icon.png"
                    alt="Cannonball Calculator"
                    width={48}
                    height={48}
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                    }}
                  />
                </Box>
                <Box>
                  <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">Cannonball Calculator</Heading>
                  <Text color="#e0d0b0">Calculate profit from making cannonballs from steel bars with live Grand Exchange prices.</Text>
                </Box>
              </Flex>
              <ChakraLink as={NextLink} href="/misc-calculators" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'cannonball-calculator' })}
                  bg="#ffcb2f"
                  color="#211305"
                  _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
                  border="2px solid black"
                  boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
                  fontWeight="bold"
                  fontSize="md"
                  borderRadius="sm"
                >
                  ← Back to Misc Calcs
                </Button>
              </ChakraLink>
            </Flex>
          </Box>
        </Container>

        {/* Calculator Content */}
        <Container maxW="6xl" py={8}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Settings Panel */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Flex align="center" mb={4}>
                <Box bg="#3c2b14" px={3} py={1} borderRadius="sm" border="1px solid black" mr={3}>
                  <Text fontSize="sm" fontWeight="bold" color="#ffcb2f">SETTINGS</Text>
                </Box>
                <Heading size="md" color="white" fontWeight="bold">🛠️ Calculator Settings</Heading>
              </Flex>
              
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <FormLabel color="#c5c5c5" fontWeight="medium" mb={2}>Steel Bars</FormLabel>
                  <NumberInput
                    value={steelBars}
                    onChange={(_valueAsString, valueAsNumber) => {
                      const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(1, valueAsNumber);
                      setSteelBars(cleanValue);
                      track('Cannonball_SteelBarsChanged', { steelBars: cleanValue });
                    }}
                    min={1}
                    bg="#1a140a"
                    borderColor="#3b2914"
                    focusBorderColor="#ffcb2f"
                  >
                    <NumberInputField 
                      color="#e0d0b0" 
                      _hover={{ borderColor: "#4a3822" }}
                      borderRadius="sm"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#ffcb2f" />
                      <NumberDecrementStepper color="#ffcb2f" />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="#a0a0a0" mt={1}>Number of steel bars to convert</Text>
                </FormControl>
              </VStack>
            </Box>

            {/* Results Panel */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Flex align="center" mb={4}>
                <Box bg="#3c2b14" px={3} py={1} borderRadius="sm" border="1px solid black" mr={3}>
                  <Text fontSize="sm" fontWeight="bold" color="#ffcb2f">RESULTS</Text>
                </Box>
                <Heading size="md" color="white" fontWeight="bold">
                  <SkillIcon skill="smithing" size={24} /> Production Summary
                </Heading>
              </Flex>

              {calculations && (
                <VStack spacing={6} align="stretch">
                  {/* Production Stats */}
                  <SimpleGrid columns={2} spacing={4}>
                    <Box bg="rgba(0,0,0,0.3)" borderRadius="md" p={4} border="1px solid rgba(0,0,0,0.8)">
                      <Stat>
                        <StatLabel color="#c5c5c5" fontSize="sm">Cannonballs Produced</StatLabel>
                        <StatNumber color="#ffcb2f" fontSize="2xl">{formatNumber(calculations.cannonballsProduced)}</StatNumber>
                        <StatHelpText color="#a0a0a0" fontSize="xs">4 per steel bar</StatHelpText>
                      </Stat>
                    </Box>
                    
                    <Box bg="rgba(0,0,0,0.3)" borderRadius="md" p={4} border="1px solid rgba(0,0,0,0.8)">
                      <Stat>
                        <StatLabel color="#c5c5c5" fontSize="sm">Time Required</StatLabel>
                        <StatNumber color="#ffcb2f" fontSize="2xl">{formatTime(calculations.timeRequired)}</StatNumber>
                        <StatHelpText color="#a0a0a0" fontSize="xs">At 2,400 bars/hr</StatHelpText>
                      </Stat>
                    </Box>
                    
                    <Box bg="rgba(0,0,0,0.3)" borderRadius="md" p={4} border="1px solid rgba(0,0,0,0.8)">
                      <Stat>
                        <StatLabel color="#c5c5c5" fontSize="sm">Total XP</StatLabel>
                        <StatNumber color="#ffcb2f" fontSize="2xl">{formatNumber(calculations.totalXp)}</StatNumber>
                        <StatHelpText color="#a0a0a0" fontSize="xs">{formatNumber(calculations.xpPerHour)} XP/hr</StatHelpText>
                      </Stat>
                    </Box>
                    
                    <Box bg="rgba(0,0,0,0.3)" borderRadius="md" p={4} border="1px solid rgba(0,0,0,0.8)">
                      <Stat>
                        <StatLabel color="#c5c5c5" fontSize="sm">Cannonballs/Hour</StatLabel>
                        <StatNumber color="#ffcb2f" fontSize="2xl">{formatNumber(calculations.cannonballsPerHour)}</StatNumber>
                        <StatHelpText color="#a0a0a0" fontSize="xs">At max efficiency</StatHelpText>
                      </Stat>
                    </Box>
                  </SimpleGrid>

                  {/* Profit Analysis */}
                  <Box bg="rgba(0,0,0,0.3)" borderRadius="md" p={6} border="1px solid rgba(0,0,0,0.8)">
                    <Heading size="md" color="#ffcb2f" mb={4} textAlign="center">Profit Analysis</Heading>
                    
                    <SimpleGrid columns={3} spacing={6}>
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Total Cost</StatLabel>
                          <StatNumber color="#ef4444" fontSize="2xl">
                            {formatNumber(calculations.totalCost)} gp
                          </StatNumber>
                          <StatHelpText color="#a0a0a0" fontSize="xs">
                            {formatNumber(calculations.costPerCannonball)} gp per steel bar
                          </StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Total Revenue</StatLabel>
                          <StatNumber color="#4ade80" fontSize="2xl">
                            {formatNumber(calculations.totalRevenue)} gp
                          </StatNumber>
                          <StatHelpText color="#a0a0a0" fontSize="xs">
                            {formatNumber(calculations.cannonballPrice)} gp per cannonball
                          </StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Net Profit</StatLabel>
                          <StatNumber 
                            color={calculations.profit >= 0 ? '#4ade80' : '#ef4444'}
                            fontSize="2xl"
                          >
                            {formatGp(calculations.profit)}
                          </StatNumber>
                          <StatHelpText color={calculations.profit >= 0 ? '#4ade80' : '#ef4444'}>
                            <StatArrow type={calculations.profit >= 0 ? 'increase' : 'decrease'} />
                            {formatGp(calculations.profitPerHour)}/hr
                          </StatHelpText>
                        </Stat>
                      </Box>
                    </SimpleGrid>
                    
                    <SimpleGrid columns={3} spacing={6} mt={6}>
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Cost per Cannonball</StatLabel>
                          <StatNumber fontSize="lg">
                            {calculations.costPerCannonball.toFixed(1)} gp
                          </StatNumber>
                          <StatHelpText color="#a0a0a0" fontSize="xs">Production cost only</StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Profit per Cannonball</StatLabel>
                          <StatNumber color={calculations.profitPerCannonball >= 0 ? '#4ade80' : '#ef4444'} fontSize="lg">
                            {formatGp(calculations.profitPerCannonball)}
                          </StatNumber>
                          <StatHelpText color="#a0a0a0" fontSize="xs">Revenue - cost</StatHelpText>
                        </Stat>
                      </Box>
                      
                      <Box textAlign="center">
                        <Stat>
                          <StatLabel color="#c5c5c5" fontSize="sm">Profit Margin</StatLabel>
                          <StatNumber color={calculations.profit >= 0 ? '#4ade80' : '#ef4444'} fontSize="lg">
                            {isFinite(calculations.profitMargin) ? `${calculations.profitMargin.toFixed(1)}%` : 'NaN%'}
                          </StatNumber>
                          <StatHelpText color="#a0a0a0" fontSize="xs">Profit / revenue</StatHelpText>
                        </Stat>
                      </Box>
                    </SimpleGrid>
                    
                    {/* Profitability Bar */}
                    <Box mt={6}>
                      <Text color="#c5c5c5" fontSize="sm" mb={2}>Profitability</Text>
                      <Progress 
                        value={Math.min(100, Math.max(0, calculations.profitMargin + 50))} 
                        colorScheme={calculations.profit >= 0 ? 'green' : 'red'}
                        bg="rgba(0,0,0,0.5)"
                        borderRadius="sm"
                      />
                      <Text color="#a0a0a0" fontSize="xs" mt={1}>
                        {calculations.profit >= 0 ? `Profitable - ${calculations.profitMargin.toFixed(1)}% ROI` : `Loss - ${Math.abs(calculations.profitMargin).toFixed(1)}% loss`}
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              )}
            </Box>
          </SimpleGrid>
        </Container>

        {/* Cannonball Guide */}
        <Container maxW="6xl" py={8} mb={20}>
          <Heading size="lg" color="white" mb={6} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">
            Cannonball Making Guide
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Getting Started */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Getting Started</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Requirements:</Text> 35 Smithing, Dwarf Cannon quest
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Location:</Text> Edgeville furnace for convenience
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Materials:</Text> Steel bars + ammo mould
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Output:</Text> 4 cannonballs per steel bar
                  </Text>
                </Flex>
              </VStack>
            </Box>

            {/* Strategy Tips */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Strategy & Tips</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">AFK friendly - each inventory takes ~2.5 minutes</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Often profitable due to high cannonball demand</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Check GE prices - steel bar costs vs cannonball value</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Consider using Blast Furnace for cheaper steel bars</Text>
                </Flex>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
} 