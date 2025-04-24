"use client";

import { useState, useEffect, ChangeEvent } from "react";
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
  Badge
} from "@chakra-ui/react";
import { SkillIcon } from "@/components/SkillIcon";
import { SkillName } from "@/lib/types";
import { ALL_SKILLS, SKILL_NAMES } from "@/lib/constants";
import { trainingMethods } from "@/data/trainingMethods";
import { useCalculatorStore } from "@/lib/store";
import SectionHeading from '@/components/SectionHeading';

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
  const { calculatorInputs, updateCalculatorInput } = useCalculatorStore();
  const storedInput = calculatorInputs[skillKey];
  
  // State for calculator
  const [currentLevel, setCurrentLevel] = useState(storedInput.currentLevel);
  const [targetLevel, setTargetLevel] = useState(storedInput.targetLevel);
  const [currentXp, setCurrentXp] = useState(getXpForLevel(storedInput.currentLevel));
  const [targetXp, setTargetXp] = useState(getXpForLevel(storedInput.targetLevel));
  const [neededXp, setNeededXp] = useState(getXpForLevel(storedInput.targetLevel) - getXpForLevel(storedInput.currentLevel));
  const [progress, setProgress] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>("level");
  
  // Training methods for this skill
  const methods = trainingMethods[skillKey] || [];
  
  // Sort and filter methods based on current level
  const filteredMethods = [...methods]
    .filter(method => method.level <= targetLevel)
    .sort((a, b) => {
      switch (sortOption) {
        case "level":
          return a.level - b.level;
        case "xphr":
          return (b.xpEach * (b.estimatedActionsPerHour || 0)) - (a.xpEach * (a.estimatedActionsPerHour || 0));
        case "gphr":
          return (b.gpEach * (b.estimatedActionsPerHour || 0)) - (a.gpEach * (a.estimatedActionsPerHour || 0));
        default:
          return a.level - b.level;
      }
    });
  
  // Calculated results for each method
  const calculatedMethods = filteredMethods.map(method => {
    const actionsNeeded = Math.ceil(neededXp / method.xpEach);
    const hoursNeeded = method.estimatedActionsPerHour 
      ? (actionsNeeded / method.estimatedActionsPerHour).toFixed(1) 
      : "?";
    const totalProfit = method.gpEach * actionsNeeded;
    
    return {
      ...method,
      actionsNeeded,
      hoursNeeded,
      totalProfit
    };
  });
  
  // Handle level input changes
  const handleCurrentLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setCurrentLevel(value);
      const xp = getXpForLevel(value);
      setCurrentXp(xp);
      
      // Update store
      updateCalculatorInput(skillKey, { currentLevel: value });
    }
  };
  
  const handleTargetLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setTargetLevel(value);
      const xp = getXpForLevel(value);
      setTargetXp(xp);
      
      // Update store
      updateCalculatorInput(skillKey, { targetLevel: value });
    }
  };
  
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
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
          <Flex justify="center" align="center">
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
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" py={8}>
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
                leftIcon={<Text>←</Text>}
              >
                Back to Skills
              </Button>
            </Link>
          </Flex>
        </Box>

        {/* Calculator Inputs */}
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
        
        {/* Methods Table */}
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
            <ButtonGroup size="sm" isAttached>
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
                      <Box as="td" px={4} py={3} textAlign="right" color={method.gpEach >= 0 ? "#00ff00" : "#ff6b6b"}>
                        {method.gpEach >= 0 ? `+${method.gpEach}` : method.gpEach}
                      </Box>
                      <Box as="td" px={4} py={3} textAlign="right" color={method.totalProfit >= 0 ? "#00ff00" : "#ff6b6b"}>
                        {method.totalProfit >= 0 ? `+${formatNumber(method.totalProfit)}` : formatNumber(method.totalProfit)}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
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