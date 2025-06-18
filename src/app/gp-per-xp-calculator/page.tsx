'use client';

import React, { useState, useMemo } from 'react';
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

interface TrainingMethod {
  name: string;
  itemId: number;
  xpPerItem: number;
  itemsPerHour?: number;
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

const skillMethods: Record<string, TrainingMethod[]> = {
  cooking: [
    { name: 'Raw Sharks', itemId: 383, xpPerItem: 210 },
    { name: 'Raw Monkfish', itemId: 7944, xpPerItem: 150 },
    { name: 'Raw Lobster', itemId: 377, xpPerItem: 120 },
    { name: 'Raw Swordfish', itemId: 371, xpPerItem: 140 },
    { name: 'Raw Tuna', itemId: 359, xpPerItem: 100 },
  ],
  crafting: [
    { name: 'Green Dragonhide', itemId: 1745, xpPerItem: 62 },
    { name: 'Blue Dragonhide', itemId: 2505, xpPerItem: 70 },
    { name: 'Red Dragonhide', itemId: 2507, xpPerItem: 78 },
    { name: 'Black Dragonhide', itemId: 2509, xpPerItem: 86 },
    { name: 'Uncut Diamond', itemId: 1617, xpPerItem: 107.5 },
  ],
  construction: [
    { name: 'Oak Plank', itemId: 8778, xpPerItem: 60 },
    { name: 'Teak Plank', itemId: 8780, xpPerItem: 90 },
    { name: 'Mahogany Plank', itemId: 8782, xpPerItem: 140 },
  ],
  prayer: [
    { name: 'Dragon Bones', itemId: 536, xpPerItem: 252 },
    { name: 'Big Bones', itemId: 532, xpPerItem: 52.5 },
    { name: 'Dagannoth Bones', itemId: 6729, xpPerItem: 125 },
    { name: 'Superior Dragon Bones', itemId: 22124, xpPerItem: 300 },
  ],
  herblore: [
    { name: 'Ranging Potion (3)', itemId: 2444, xpPerItem: 87.5 },
    { name: 'Super Strength (3)', itemId: 2440, xpPerItem: 125 },
    { name: 'Prayer Potion (3)', itemId: 2434, xpPerItem: 87.5 },
  ],
  smithing: [
    { name: 'Gold Ore (Goldsmith Gauntlets)', itemId: 444, xpPerItem: 56.2 },
    { name: 'Iron Ore (Blast Furnace)', itemId: 440, xpPerItem: 37.5 },
    { name: 'Mithril Ore', itemId: 447, xpPerItem: 50 },
    { name: 'Adamantite Ore', itemId: 449, xpPerItem: 62.5 },
    { name: 'Runite Ore', itemId: 451, xpPerItem: 75 },
  ],
};

const skillNames = {
  cooking: 'Cooking',
  crafting: 'Crafting', 
  construction: 'Construction',
  prayer: 'Prayer',
  herblore: 'Herblore',
  smithing: 'Smithing',
};

export default function GpPerXpCalculatorPage() {
  const [selectedSkill, setSelectedSkill] = useState<string>('cooking');
  const [targetXp, setTargetXp] = useState<number>(100000);
  
  const { data: prices, isLoading } = useQuery<PriceData, Error>({
    queryKey: ['itemPrices'],
    queryFn: fetchPrices,
    staleTime: 10 * 60 * 1000, // 10 minutes stale time
    refetchOnWindowFocus: false,
    retry: 1
  });

  const calculations = useMemo(() => {
    if (!prices || isLoading) return [];
    
    const methods = skillMethods[selectedSkill] || [];
    
    return methods.map(method => {
      const priceData = prices[method.itemId.toString()];
      // Use high price for buying items (what you pay)
      const price = priceData?.high || 0;
      const itemsNeeded = Math.ceil(targetXp / method.xpPerItem);
      const totalCost = itemsNeeded * price;
      const gpPerXp = totalCost / targetXp;
      
      return {
        ...method,
        price,
        itemsNeeded,
        totalCost,
        gpPerXp,
      };
    }).sort((a, b) => a.gpPerXp - b.gpPerXp);
  }, [selectedSkill, targetXp, prices, isLoading]);

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
    return `${formatNumber(num)} gp`;
  };

  const formatGpPerXp = (num: number) => {
    return `${num.toFixed(2)} gp/xp`;
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
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| GP per XP Calculator</Text>
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
                <Box mr={4} p={2} borderRadius="full" bg="rgba(0,0,0,0.5)" border="1px solid rgba(0,0,0,0.8)" boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)">
                  💰
                </Box>
                <Box>
                  <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">GP per XP Calculator</Heading>
                  <Text color="#e0d0b0">Calculate the most cost-efficient training methods for buyable skills with live Grand Exchange prices.</Text>
                </Box>
              </Flex>
              <ChakraLink as={NextLink} href="/misc-calculators" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'gp-per-xp-calculator' })}
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
                  <FormLabel color="#c5c5c5" fontWeight="medium" mb={2}>Skill</FormLabel>
                  <Select
                    value={selectedSkill}
                    onChange={(e) => {
                      setSelectedSkill(e.target.value);
                      track('GPPerXP_SkillChanged', { skill: e.target.value });
                    }}
                    bg="#1a140a"
                    color="#e0d0b0"
                    borderColor="#3b2914"
                    _hover={{ borderColor: '#ffcb2f' }}
                    _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                  >
                    {Object.entries(skillNames).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color="#c5c5c5" fontWeight="medium" mb={2}>Target XP</FormLabel>
                  <NumberInput
                    value={targetXp}
                    onChange={(_valueAsString, valueAsNumber) => {
                      const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(1, valueAsNumber);
                      setTargetXp(cleanValue);
                      track('GPPerXP_TargetXPChanged', { targetXp: cleanValue });
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
                  <Text fontSize="xs" color="#a0a0a0" mt={1}>Experience points to calculate for</Text>
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
                   <SkillIcon skill={selectedSkill as keyof typeof skillNames} size={24} /> {skillNames[selectedSkill as keyof typeof skillNames]} Training Methods
                 </Heading>
              </Flex>

              <Box bg="rgba(0,0,0,0.3)" borderRadius="md" border="1px solid rgba(0,0,0,0.8)" overflow="hidden">
                <TableContainer>
                  <Table variant="simple" size="sm">
                    <Thead bg="rgba(0,0,0,0.5)">
                      <Tr>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider">Method</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Price</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Items Needed</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Total Cost</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">GP per XP</Th>
                        <Th color="#ffcb2f" fontSize="xs" textTransform="uppercase" letterSpacing="wider" textAlign="center">Rank</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {calculations.map((calc, index) => (
                        <Tr key={calc.name} _hover={{ bg: "rgba(255, 203, 47, 0.1)" }}>
                          <Td color="#e0d0b0" fontWeight="medium">{calc.name}</Td>
                          <Td color="#e0d0b0" textAlign="center">{formatGp(calc.price)}</Td>
                          <Td color="#e0d0b0" textAlign="center">{formatNumber(calc.itemsNeeded)}</Td>
                          <Td color="#e0d0b0" textAlign="center">{formatGp(calc.totalCost)}</Td>
                          <Td color={index === 0 ? "#4ade80" : "#e0d0b0"} textAlign="center" fontWeight={index === 0 ? "bold" : "normal"}>
                            {formatGpPerXp(calc.gpPerXp)}
                          </Td>
                          <Td textAlign="center">
                            {index === 0 ? (
                              <Badge colorScheme="green" fontSize="xs" px={2} py={1}>Most Efficient</Badge>
                            ) : (
                              <Text color="#a0a0a0" fontSize="sm">#{index + 1}</Text>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>

        {/* Cost Efficiency Guide */}
        <Container maxW="6xl" py={8} mb={20}>
          <Heading size="lg" color="white" mb={6} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">
            Cost Efficiency Guide
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Training Tips */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Training Tips</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Efficiency:</Text> Lower GP/XP = more cost-efficient
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Bulk buying:</Text> Check GE buy limits before large purchases
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Price tracking:</Text> Prices update every 5 minutes
                  </Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">
                    <Text as="span" fontWeight="bold">Alternative methods:</Text> Consider non-buyable training options
                  </Text>
                </Flex>
              </VStack>
            </Box>

            {/* Buyable Skills Strategy */}
            <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
              <Heading size="md" color="#ffcb2f" mb={4} fontWeight="bold">Buyable Skills Strategy</Heading>
              <VStack align="start" spacing={3}>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Always check current market prices before buying</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Consider XP rates vs GP cost for your goals</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Some methods may be profitable (negative GP/XP)</Text>
                </Flex>
                <Flex align="start">
                  <Text color="#ffcb2f" mr={2}>•</Text>
                  <Text color="#e0d0b0" fontSize="sm">Factor in time and convenience for your training</Text>
                </Flex>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
} 