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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { SkillIcon } from '@/components/SkillIcon';
import { useQuery } from '@tanstack/react-query';
import { track } from '@vercel/analytics';

interface BlastFurnaceMethod {
  name: string;
  oreId: number;
  barId: number;
  coalNeeded: number;
  xpPerBar: number;
  levelReq: number;
  barsPerHour: number;
}

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

const blastFurnaceMethods: BlastFurnaceMethod[] = [
  {
    name: 'Bronze Bars',
    oreId: 438, // Tin ore
    barId: 2349, // Bronze bar
    coalNeeded: 0,
    xpPerBar: 6.2,
    levelReq: 1,
    barsPerHour: 5400,
  },
  {
    name: 'Iron Bars',
    oreId: 440, // Iron ore
    barId: 2351, // Iron bar
    coalNeeded: 0,
    xpPerBar: 12.5,
    levelReq: 15,
    barsPerHour: 5400,
  },
  {
    name: 'Steel Bars',
    oreId: 440, // Iron ore
    barId: 2353,
    coalNeeded: 1,
    xpPerBar: 17.5,
    levelReq: 30,
    barsPerHour: 4500,
  },
  {
    name: 'Mithril Bars',
    oreId: 447, // Mithril ore
    barId: 2359,
    coalNeeded: 2,
    xpPerBar: 30,
    levelReq: 50,
    barsPerHour: 3600,
  },
  {
    name: 'Adamantite Bars',
    oreId: 449, // Adamantite ore
    barId: 2361,
    coalNeeded: 3,
    xpPerBar: 37.5,
    levelReq: 70,
    barsPerHour: 2700,
  },
  {
    name: 'Runite Bars',
    oreId: 451, // Runite ore
    barId: 2363,
    coalNeeded: 4,
    xpPerBar: 50,
    levelReq: 85,
    barsPerHour: 1800,
  },
];

export default function BlastFurnaceCalculatorPage() {
  const [hours, setHours] = useState<number>(1);
  const [includeCoffer, setIncludeCoffer] = useState<boolean>(true);
  
  const { data: prices, isLoading } = useQuery<PriceData, Error>({
    queryKey: ['itemPrices'],
    queryFn: fetchPrices,
    staleTime: 10 * 60 * 1000, // 10 minutes stale time
    refetchOnWindowFocus: false,
    retry: 1
  });

  const calculations = useMemo(() => {
    if (!prices || isLoading) return [];
    
    // Use high price for coal (buying cost)
    const coalPrice = prices['453']?.high || 0; // Coal price
    const cofferCost = 72000; // GP per hour for coffer
    
    return blastFurnaceMethods.map(method => {
      // Use high prices for buying ores (cost to you)
      const orePrice = prices[method.oreId.toString()]?.high || 0;
      // Use low prices for selling bars (what you get)
      const barPrice = prices[method.barId.toString()]?.low || 0;
      
      const barsProduced = method.barsPerHour * hours;
      const oreNeeded = barsProduced;
      const coalNeeded = barsProduced * method.coalNeeded;
      
      const oreCost = oreNeeded * orePrice;
      const coalCost = coalNeeded * coalPrice;
      const cofferCostTotal = includeCoffer ? cofferCost * hours : 0;
      const totalCost = oreCost + coalCost + cofferCostTotal;
      
      const barsSoldValue = barsProduced * barPrice;
      const profit = barsSoldValue - totalCost;
      const profitPerHour = profit / hours;
      
      const xpGained = barsProduced * method.xpPerBar;
      const xpPerHour = xpGained / hours;
      
      return {
        ...method,
        orePrice,
        barPrice,
        coalPrice,
        barsProduced,
        oreNeeded,
        coalNeeded,
        totalCost,
        barsSoldValue,
        profit,
        profitPerHour,
        xpGained,
        xpPerHour,
      };
    }).sort((a, b) => b.profitPerHour - a.profitPerHour);
  }, [hours, includeCoffer, prices, isLoading]);

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
    const sign = num >= 0 ? '' : '-';
    const absNum = Math.abs(num);
    return `${sign}${formatNumber(absNum)} gp`;
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
              <Heading as="h1" size="lg" fontWeight="bold" fontFamily="var(--font-roboto-slab), serif" textShadow="2px 2px 0px #000">
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Blast Furnace Calculator</Text>
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
                    src="/icons/calculators/blastfurnace icon.png"
                    alt="Blast Furnace Calculator"
                    width={48}
                    height={48}
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                    }}
                  />
                </Box>
                <Box>
                  <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="var(--font-roboto-slab), serif">Blast Furnace Calculator</Heading>
                  <Text color="#e0d0b0">Calculate profit and XP rates for blast furnace smithing with live Grand Exchange prices.</Text>
                </Box>
              </Flex>
              <ChakraLink as={NextLink} href="/misc-calculators" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'blast-furnace-calculator' })}
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
                  <FormLabel color="#c5c5c5" fontWeight="medium" mb={2}>Hours</FormLabel>
                  <NumberInput
                    value={hours}
                    onChange={(_valueAsString, valueAsNumber) => {
                      const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(0.1, valueAsNumber);
                      setHours(cleanValue);
                      track('BlastFurnace_HoursChanged', { hours: cleanValue });
                    }}
                    min={0.1}
                    step={0.5}
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
                  <Text fontSize="xs" color="#a0a0a0" mt={1}>Time to calculate for</Text>
                </FormControl>

                <FormControl>
                  <FormLabel color="#c5c5c5" fontWeight="medium" mb={2}>Include Coffer Cost</FormLabel>
                  <Select
                    value={includeCoffer ? 'yes' : 'no'}
                    onChange={(e) => {
                      const newValue = e.target.value === 'yes';
                      setIncludeCoffer(newValue);
                      track('BlastFurnace_CofferChanged', { includeCoffer: newValue });
                    }}
                    bg="#1a140a"
                    color="#e0d0b0"
                    borderColor="#3b2914"
                    _hover={{ borderColor: '#ffcb2f' }}
                    _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                  >
                    <option value="yes">Yes (72k gp/hr)</option>
                    <option value="no">No</option>
                  </Select>
                  <Text fontSize="xs" color="#a0a0a0" mt={1}>Coffer cost for conveyor belt usage</Text>
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
                  <SkillIcon skill="smithing" size={24} /> Blast Furnace Results
                </Heading>
              </Flex>

              <Box bg="rgba(0,0,0,0.3)" borderRadius="md" border="1px solid rgba(0,0,0,0.8)" overflow="hidden">
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead bg="rgba(0,0,0,0.5)">
                      <Tr>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider">Method</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Level Req</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Bars Made</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Total Cost</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Revenue</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Profit</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Profit/HR</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">XP</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {calculations.map((calc) => (
                        <Tr key={calc.name} _hover={{ bg: "rgba(255, 203, 47, 0.1)" }}>
                          <Td color="#e0d0b0" fontWeight="medium">{calc.name}</Td>
                          <Td textAlign="center">
                            <Badge colorScheme="blue" fontSize="xs" px={2} py={1}>{calc.levelReq}</Badge>
                          </Td>
                          <Td color="#e0d0b0" textAlign="center">{formatNumber(calc.barsProduced)}</Td>
                          <Td color="#e0d0b0" textAlign="center">{formatGp(calc.totalCost)}</Td>
                          <Td color="#e0d0b0" textAlign="center">{formatGp(calc.barsSoldValue)}</Td>
                          <Td color={calc.profit >= 0 ? '#4ade80' : '#ef4444'} textAlign="center" fontWeight="bold">
                            {formatGp(calc.profit)}
                          </Td>
                          <Td color={calc.profitPerHour >= 0 ? '#4ade80' : '#ef4444'} textAlign="center" fontWeight="bold">
                            {formatGp(calc.profitPerHour)}/hr
                          </Td>
                          <Td color="#e0d0b0" textAlign="center">{formatNumber(calc.xpGained)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>

        {/* Blast Furnace Guide */}
        <Container maxW="6xl" py={8} mb={20}>
          <Heading size="lg" color="white" mb={6} textShadow="2px 2px 0px #000" fontFamily="var(--font-roboto-slab), serif">
            Blast Furnace Guide
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Getting Started */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Getting Started</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Location:</Text> Keldagrim (Giant Dwarf quest required)
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Requirements:</Text> 60 Smithing, Ice gloves recommended
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Coffer:</Text> Pay 72k gp/hr for conveyor belt operation
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Coal bag:</Text> Highly recommended for efficiency
                  </Text>
                </Flex>
              </VStack>
            </Box>

            {/* Strategy Tips */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Strategy Tips</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Gold bars with Goldsmith gauntlets are often best XP</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Mithril+ bars may be profitable depending on prices</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Consider coal prices when choosing bar types</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Higher level bars = better XP rates but higher requirements</Text>
                </Flex>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
} 