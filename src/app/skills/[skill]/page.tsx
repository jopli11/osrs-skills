"use client";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Input,
  VStack,
  SimpleGrid,
  ButtonGroup,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  HStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { SkillIcon } from "@/components/SkillIcon";
import { SkillName } from "@/lib/types";
import { ALL_SKILLS, SKILL_NAMES } from "@/lib/constants";
import { trainingMethods } from "@/data/trainingMethods";
import { useCalculatorStore } from "@/lib/store";
import SectionHeading from '@/components/SectionHeading';
import PlayerLookup from '@/components/PlayerLookup';

// Experience table for levels 1-99
const xpTable = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 
  1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 
  4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 
  12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 
  27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 
  61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 
  136594, 150872, 166636, 184040, 203254, 224466, 247886, 
  273742, 302288, 333804, 368599, 407015, 449428, 496254, 
  547953, 605032, 668051, 737627, 814445, 899257, 992895, 
  1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 
  1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 
  3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 
  6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 
  11805606, 13034431, 14391160, 15889109, 17542976, 19368992, 
  21385073, 23611006, 26068632, 28782069, 31777943, 35085654, 
  38737661, 42769801, 47221641, 52136869, 57563718, 63555443, 
  70170840, 77474828, 85539082, 94442737, 104273167
];

// Get experience for a given level
const getXpForLevel = (level: number): number => {
  if (level < 1 || level > 99) return 0;
  return level === 1 ? 0 : xpTable[level - 2];
};

// Sort options for training methods
type SortOption = "level" | "xphr" | "gphr";

type Props = {
  params: {
    skill: string;
  };
};

// Type definition for the expected structure of the combined price/mapping data
interface PriceData { 
  [itemId: string]: {
    id: number;
    name: string;
    icon: string;
    high: number | null;
    highTime: number | null;
    low: number | null;
    lowTime: number | null;
    // Include other mapping properties if needed
    limit?: number;
    members?: boolean;
    lowalch?: number;
    highalch?: number;
    value?: number;
  }
}

// Function to fetch price data from our backend API route
const fetchPrices = async (): Promise<PriceData> => {
  const response = await fetch('/api/prices');
  if (!response.ok) {
    throw new Error('Network response was not ok while fetching prices.');
  }
  return response.json();
};

// TrainingMethod type is imported for type checking the methods array from trainingMethods

export default function SkillPage({ params }: Props) {
  const { skill } = params;
  
  // Validate skill name
  if (!ALL_SKILLS.includes(skill.toLowerCase() as SkillName)) {
    notFound();
  }
  
  const skillKey = skill.toLowerCase() as SkillName;
  // Get skill name from constants
  const skillName = SKILL_NAMES[skillKey];
  
  // Get calculator inputs from store
  const { 
    calculatorInputs, 
    playerStats
  } = useCalculatorStore();
  
  // Direct access to store
  const store = useCalculatorStore;
  
  const storedInput = calculatorInputs[skillKey];
  
  // State for calculator
  const [currentLevel, setCurrentLevel] = useState(storedInput.currentLevel);
  const [targetLevel, setTargetLevel] = useState(storedInput.targetLevel);
  const [currentXp, setCurrentXp] = useState(getXpForLevel(storedInput.currentLevel));
  const [targetXp, setTargetXp] = useState(getXpForLevel(storedInput.targetLevel));
  const [neededXp, setNeededXp] = useState(getXpForLevel(storedInput.targetLevel) - getXpForLevel(storedInput.currentLevel));
  const [progress, setProgress] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>("level");
  
  // Training methods for this skill - Memoized based on skillKey
  const methods = useMemo(() => trainingMethods[skillKey] || [], [skillKey]);
  
  // --- START: Fetch prices using useQuery ---
  const {
    data: itemPriceData, 
    isLoading: pricesLoading, 
    isError: pricesError,
    error: priceFetchError // Capture error object
  } = useQuery<PriceData, Error>({
    queryKey: ['itemPrices'],
    queryFn: fetchPrices,
    staleTime: 10 * 60 * 1000, // 10 minutes stale time
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 1 // Retry once on error
  });
  // --- END: Fetch prices using useQuery ---
  
  // --- START: Update Method Calculation with Live Prices (using useMemo) ---
  // Memoize calculated methods to prevent recalculation on every render unless dependencies change
  const calculatedMethods = useMemo(() => {
    // If prices aren't loaded yet, return empty array
    if (pricesLoading || !itemPriceData) {
      return [];
    }

    try {
      // Process methods safely with proper error handling
      const safeMethodsWithPrices = methods.map(method => {
        // Pre-calculate profit safely
        let profitPerAction = 0;
        try {
          // Calculate input costs (using high prices since we're buying)
          let totalInputCost = 0;
          if (method.inputItems && method.inputItems.length > 0) {
            for (const item of method.inputItems) {
              // Safely access item data with fallbacks
              const itemId = String(item.id);
              const itemData = itemPriceData[itemId];
              const itemPrice = itemData && itemData.high !== null ? itemData.high : 0;
              totalInputCost += itemPrice * (item.quantity || 1);
            }
          }

          // Calculate output values (using low prices since we're selling)
          let totalOutputValue = 0;
          if (method.outputItems && method.outputItems.length > 0) {
            for (const item of method.outputItems) {
              // Safely access item data with fallbacks
              const itemId = String(item.id);
              const itemData = itemPriceData[itemId];
              const itemPrice = itemData && itemData.low !== null ? itemData.low : 0;
              totalOutputValue += itemPrice * (item.quantity || 1);
            }
          }

          // Get GP per action from method or calculate based on items
          if (method.gpEach !== undefined) {
            profitPerAction = method.gpEach;
          } else {
            // Net profit is output value minus input cost
            profitPerAction = totalOutputValue - totalInputCost;
          }
        } catch (err) {
          console.error('Error calculating profit for method:', method.name, err);
          // Use static GP estimate if provided, otherwise 0
          profitPerAction = method.gpEach !== undefined ? method.gpEach : 0;
        }

        return {
          ...method,
          profitPerAction
        };
      });

      // Filter methods based on level
      const filteredMethods = safeMethodsWithPrices.filter(method => 
        method.level <= targetLevel
      );

      // Sort methods based on selected option
      const sortedMethods = [...filteredMethods].sort((a, b) => {
        switch (sortOption) {
          case "level":
            return a.level - b.level;
          case "xphr": {
            // Handle missing estimatedActionsPerHour
            const aActions = a.estimatedActionsPerHour || 0;
            const bActions = b.estimatedActionsPerHour || 0;
            return (b.xpEach * bActions) - (a.xpEach * aActions);
          }
          case "gphr": {
            // Use pre-calculated profit
            const aActions = a.estimatedActionsPerHour || 0;
            const bActions = b.estimatedActionsPerHour || 0;
            return (b.profitPerAction * bActions) - (a.profitPerAction * aActions);
          }
          default:
            return a.level - b.level;
        }
      });

      // Final calculation for display
      return sortedMethods.map(method => {
        // Calculate actions needed
        const safeXpEach = method.xpEach > 0 ? method.xpEach : 1;
        const actionsNeeded = neededXp > 0 ? Math.ceil(neededXp / safeXpEach) : 0;
        
        // Calculate hours needed
        const hoursNeeded = method.estimatedActionsPerHour && actionsNeeded > 0
          ? (actionsNeeded / method.estimatedActionsPerHour).toFixed(1) 
          : "?";
        
        // Calculate total profit/loss
        const totalProfit = method.profitPerAction * actionsNeeded;
        
        return {
          ...method,
          livePricePerAction: method.profitPerAction,
          actionsNeeded,
          hoursNeeded,
          totalCost: totalProfit
        };
      });
    } catch (err) {
      console.error('Error in training methods calculation:', err);
      return [];
    }
  }, [methods, itemPriceData, neededXp, targetLevel, sortOption, pricesLoading]);
  // --- END: Update Method Calculation ---
  
  // Simpler notification function
  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    try {
      store.setState({
        notification: {
          message,
          type,
          timestamp: Date.now()
        }
      });
    } catch (err) {
      console.error('Failed to set notification:', err);
    }
  };
  
  // Update calculator input directly
  const updateInput = (skill: SkillName, input: Partial<typeof storedInput>) => {
    try {
      store.setState((state) => ({
        calculatorInputs: {
          ...state.calculatorInputs,
          [skill]: {
            ...state.calculatorInputs[skill],
            ...input,
          },
        },
      }));
    } catch (err) {
      console.error('Failed to update calculator input:', err);
    }
  };
  
  // Handle level input changes
  const handleCurrentLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setCurrentLevel(value);
      const xp = getXpForLevel(value);
      setCurrentXp(xp);
      
      // Update store
      updateInput(skillKey, { currentLevel: value });
    }
  };
  
  const handleTargetLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setTargetLevel(value);
      const xp = getXpForLevel(value);
      setTargetXp(xp);
      
      // Update store
      updateInput(skillKey, { targetLevel: value });
    }
  };
  
  // Update current level when player stats change
  useEffect(() => {
    if (playerStats && playerStats.stats) {
      // Map any alternate skill names
      const lookupSkill = skillKey === 'runecraft' ? 'runecrafting' : skillKey;
      
      if (playerStats.stats[lookupSkill]) {
        const level = playerStats.stats[lookupSkill].level;
        setCurrentLevel(level);
        setCurrentXp(getXpForLevel(level));
        
        // No need to call updateInput here as it's already done in the store
      }
    }
  }, [playerStats, skillKey]);
  
  // Calculate needed XP and progress whenever levels or XP changes
  useEffect(() => {
    const needed = Math.max(0, targetXp - currentXp);
    setNeededXp(needed);
    
    const progressPercent = targetXp === 0 
      ? 100 
      : Math.min(100, Math.max(0, (currentXp / targetXp) * 100));
    setProgress(progressPercent);
  }, [currentXp, targetXp, currentLevel, targetLevel]);
  
  // Format number with commas
  const formatNumber = (num: number): string => {
    // Handle potential NaN or Infinity
    if (!Number.isFinite(num)) return "?"; 
    return num.toLocaleString(); // Use localeString for better formatting
  };

  // --- START: Render Loading/Error States ---
  const renderContent = () => {
    if (pricesLoading) {
      return (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" color="#ffcb2f" />
          <Text ml={4} color="white">Loading live prices...</Text>
        </Flex>
      );
    }

    if (pricesError) {
      return (
        <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px" bg="rgba(255,0,0,0.1)" borderRadius="md">
          <AlertIcon boxSize="40px" mr={0} color="red.400" />
          <Text fontWeight="bold" mt={4} mb={1} color="white">Error Loading Prices</Text>
          <Text fontSize="sm" color="gray.300">Could not fetch live Grand Exchange prices. Calculations will use estimated static prices.</Text>
          <Text fontSize="xs" color="gray.500" mt={2}>({priceFetchError?.message})</Text>
        </Alert>
      );
      // Note: Even on error, calculatedMethods might fall back to static prices, so we might still want to render the table below.
      // The logic above in useMemo handles falling back to method.gpEach.
    }
    
    // If loaded successfully (or even with error, we show the table with fallback prices)
    return (
      <Box overflowX="auto">
        <Box as="table" width="100%">
          <Box as="thead" bg="rgba(0,0,0,0.4)" borderBottom="2px solid black">
            <Box as="tr">
              <Box as="th" px={4} py={3} textAlign="left" color="#e0d0b0" fontWeight="medium" fontSize="sm">Method</Box>
              <Box as="th" px={4} py={3} textAlign="left" color="#e0d0b0" fontWeight="medium" fontSize="sm">Level</Box>
              <Box as="th" px={4} py={3} textAlign="right" color="#e0d0b0" fontWeight="medium" fontSize="sm">XP/ea</Box>
              <Box as="th" px={4} py={3} textAlign="right" color="#e0d0b0" fontWeight="medium" fontSize="sm">Actions</Box>
              <Box as="th" px={4} py={3} textAlign="right" color="#e0d0b0" fontWeight="medium" fontSize="sm">Hours</Box>
              <Box as="th" px={4} py={3} textAlign="right" color="#e0d0b0" fontWeight="medium" fontSize="sm">GP/ea</Box>
              <Box as="th" px={4} py={3} textAlign="right" color="#e0d0b0" fontWeight="medium" fontSize="sm">Profit/Loss</Box>
            </Box>
          </Box>
          <Box as="tbody">
            {calculatedMethods.map((method) => (
              <Box 
                key={method.id}
                as="tr" 
                _hover={{ bg: "rgba(0,0,0,0.2)" }} 
                cursor="pointer" 
                borderBottom="1px solid rgba(0,0,0,0.4)"
                title={method.notes}
              >
                <Box as="td" px={4} py={3} color="white">
                  <Flex align="center" gap={2}>
                    {method.name}
                    {method.isMembers && (
                      <Badge bg="rgba(0,0,0,0.4)" color="#ffcb2f" fontSize="xs" borderRadius="sm" px={1}>
                        P2P
                      </Badge>
                    )}
                  </Flex>
                </Box>
                <Box as="td" px={4} py={3} color="white">{method.level}</Box>
                <Box as="td" px={4} py={3} textAlign="right" color="white">{method.xpEach}</Box>
                <Box as="td" px={4} py={3} textAlign="right" color="white">{formatNumber(method.actionsNeeded)}</Box>
                <Box as="td" px={4} py={3} textAlign="right" color="white">{method.hoursNeeded}</Box>
                <Box as="td" px={4} py={3} textAlign="right" color={method.livePricePerAction >= 0 ? "#00ff00" : "#ff6b6b"}>
                  {method.livePricePerAction >= 0 ? 
                    `+${formatNumber(method.livePricePerAction)}` : 
                    formatNumber(method.livePricePerAction)}
                </Box>
                <Box as="td" px={4} py={3} textAlign="right" color={method.livePricePerAction >= 0 ? "#00ff00" : "#ff6b6b"}>
                  {method.livePricePerAction >= 0 ? 
                    `+${formatNumber(method.totalCost)}` : 
                    formatNumber(method.totalCost)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Text color="gray.400" fontSize="xs" mt={4}>Prices fetched from OSRS Wiki API. GP/hr calculations are estimates.</Text>
      </Box>
    );
  };
  // --- END: Render Loading/Error States ---

  return (
    <Box>
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
          <Flex justify="space-between" align="center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Heading 
                as="h1" 
                size="lg" 
                fontWeight="bold" 
                fontFamily="'Roboto Slab', serif"
                textShadow="2px 2px 0px #000"
              >
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| {skillName}</Text>
              </Heading>
            </Link>

            <HStack spacing={6}>
              <Link href="/#skills" style={{ textDecoration: 'none' }}>
                <Text 
                  color="#e0d0b0"
                  fontSize="md"
                  fontWeight="medium"
                  _hover={{ color: '#ffcb2f' }}
                >
                  All Skills
                </Text>
              </Link>
              <Link href="/combat-calculator" style={{ textDecoration: 'none' }}>
                <Text 
                  color="#e0d0b0"
                  fontSize="md"
                  fontWeight="medium"
                  _hover={{ color: '#ffcb2f' }}
                >
                  Combat Calc
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" mt={8} mb={20} p={{ base: 4, md: 8 }}>
        {/* Hero Banner */}
        <Box 
          bg="rgba(42, 30, 15, 0.85)" 
          borderRadius="md" 
          p={6} 
          mb={8} 
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
              <Box 
                mr={4}
                p={2}
                borderRadius="full"
                bg="rgba(0,0,0,0.5)"
                border="1px solid rgba(0,0,0,0.8)"
                boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)"
              >
                <SkillIcon skill={skillKey} size={56} />
              </Box>
              <Box>
                <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">{skillName} Calculator</Heading>
                <Text color="#e0d0b0">
                  Plan your {skillName} training efficiently with live Grand Exchange prices.
                </Text>
              </Box>
            </Flex>
            <Link href="/" style={{ textDecoration: 'none' }}>
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
            </Link>
          </Flex>
        </Box>
        
        {/* Calculator Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
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
            <SectionHeading mb={4}>Input</SectionHeading>
            
            <VStack gap={4} align="stretch">
              <Box>
                <Text mb={2} fontWeight="medium" color="white" textShadow="1px 1px 0px rgba(0,0,0,0.8)">
                  Current Level
                  {playerStats && playerStats.stats && (
                    <Badge 
                      ml={2} 
                      fontSize="xs"
                      bg="#361f0e"
                      color="#ffcb2f"
                      borderRadius="sm"
                      px={1}
                      border="1px solid rgba(0,0,0,0.3)"
                    >
                      From {playerStats.username}
                    </Badge>
                  )}
                </Text>
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={currentLevel}
                  onChange={handleCurrentLevelChange}
                  bg="rgba(0,0,0,0.3)"
                  border="2px solid black"
                  borderRadius="md"
                  color="white"
                  fontWeight="bold"
                  height="12"
                  _focus={{ borderColor: "#ffcb2f", outline: "none" }}
                  borderColor={playerStats ? "#ffcb2f" : "black"}
                />
              </Box>
              
              <Box>
                <Text mb={2} fontWeight="medium" color="white" textShadow="1px 1px 0px rgba(0,0,0,0.8)">
                  Target Level
                </Text>
                <Input
                  type="number"
                  min={2}
                  max={99}
                  value={targetLevel}
                  onChange={handleTargetLevelChange}
                  bg="rgba(0,0,0,0.3)"
                  border="2px solid black"
                  borderRadius="md"
                  color="white"
                  fontWeight="bold"
                  height="12"
                  _focus={{ borderColor: "#ffcb2f", outline: "none" }}
                />
              </Box>
            </VStack>
          </Box>
          
          {/* Results Panel */}
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
            <SectionHeading mb={4}>Summary</SectionHeading>
            
            <VStack gap={5} align="stretch">
              <SimpleGrid columns={2} gap={4}>
                <Box>
                  <Text fontSize="sm" color="#e0d0b0" mb={1}>Current XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white" textShadow="1px 1px 0px rgba(0,0,0,0.8)">{formatNumber(currentXp)}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="#e0d0b0" mb={1}>Needed XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white" textShadow="1px 1px 0px rgba(0,0,0,0.8)">{formatNumber(neededXp)}</Text>
                </Box>
              </SimpleGrid>
              
              <Box>
                <Box 
                  h="8px" 
                  bg="rgba(0,0,0,0.5)" 
                  borderRadius="full" 
                  overflow="hidden"
                  border="1px solid rgba(0,0,0,0.8)"
                >
                  <Box 
                    h="100%" 
                    w={`${progress}%`} 
                    bg="#ffcb2f" 
                    borderRadius="full"
                  ></Box>
                </Box>
                <Text fontSize="xs" color="#e0d0b0" mt={1}>{progress.toFixed(1)}% Complete</Text>
              </Box>
            </VStack>
          </Box>
        </Grid>
        
        {/* Player Lookup Section - Moved here as requested */}
        <Box 
          mt={8}
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
              Import
            </Badge>
            <SectionHeading mb={0}>Import Your Stats</SectionHeading>
          </Flex>
          
          <PlayerLookup />
          
          {playerStats && (
            <Box mt={3}>
              <Flex justify="flex-end">
                <Button
                  size="sm"
                  bg="#361f0e"
                  color="#ffcb2f"
                  _hover={{ bg: '#4a2a15' }}
                  borderWidth="1px"
                  borderColor="black"
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                  onClick={() => {
                    // Map any alternate skill names
                    const lookupSkill = skillKey === 'runecraft' ? 'runecrafting' : skillKey;
                    
                    if (playerStats.stats[lookupSkill]) {
                      const level = playerStats.stats[lookupSkill].level;
                      setCurrentLevel(level);
                      setCurrentXp(getXpForLevel(level));
                      
                      // Update the store as well
                      updateInput(skillKey, { currentLevel: level });
                      
                      // Show notification using our workaround function
                      notify(`Level ${level} from ${playerStats.username} applied to ${skillName} calculator`);
                    }
                  }}
                >
                  Apply Level {playerStats.stats[skillKey === 'runecraft' ? 'runecrafting' : skillKey]?.level || '?'}
                </Button>
              </Flex>
            </Box>
          )}
        </Box>
        
        {/* Training Methods Table */}
        <Box 
          mt={8} 
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
          <Flex justify="space-between" align="center" mb={4}>
            <SectionHeading>Training Methods</SectionHeading>
            <ButtonGroup size="sm">
              <Button 
                bg={sortOption === "xphr" ? "#ffcb2f" : "rgba(0,0,0,0.3)"}
                color={sortOption === "xphr" ? "#211305" : "white"}
                border="2px solid black"
                borderLeftRadius="md" 
                borderRightRadius="0"
                _hover={{ bg: "#e0a922" }}
                onClick={() => setSortOption("xphr")}
                fontWeight="bold"
                height="10"
              >
                XP/hr
              </Button>
              <Button 
                bg={sortOption === "gphr" ? "#ffcb2f" : "rgba(0,0,0,0.3)"}
                color={sortOption === "gphr" ? "#211305" : "white"}
                border="2px solid black"
                borderRadius="0"
                borderLeft="none" 
                _hover={{ bg: "#e0a922" }}
                onClick={() => setSortOption("gphr")}
                fontWeight="bold"
                height="10"
              >
                GP/hr
              </Button>
              <Button 
                bg={sortOption === "level" ? "#ffcb2f" : "rgba(0,0,0,0.3)"}
                color={sortOption === "level" ? "#211305" : "white"}
                border="2px solid black"
                borderLeftRadius="0" 
                borderRightRadius="md"
                borderLeft="none"
                _hover={{ bg: "#e0a922" }}
                onClick={() => setSortOption("level")}
                fontWeight="bold"
                height="10"
              >
                Level
              </Button>
            </ButtonGroup>
          </Flex>
          
          {methods.length === 0 ? (
            <Flex justify="center" align="center" py={8}>
              <Text color="#e0d0b0">
                Training methods for {skillName} are coming soon. Check back later!
              </Text>
            </Flex>
          ) : (
            renderContent()
          )}
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        as="footer" 
        bg="rgba(42, 30, 15, 0.9)"
        mt={16} 
        py={8} 
        borderTop="2px solid black"
        backdropFilter="blur(2px)"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255, 203, 47, 0.15)'
        }}
      >
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="sm" color="#e0d0b0">© {new Date().getFullYear()} OSRSCalculators | All game content is copyright Jagex Ltd.</Text>
          <Text fontSize="sm" color="#e0d0b0" mt={1}>Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.</Text>
        </Container>
      </Box>
    </Box>
  );
} 