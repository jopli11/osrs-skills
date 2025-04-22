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
  HStack,
  VStack,
  SimpleGrid,
  ButtonGroup,
  Badge
} from "@chakra-ui/react";
import { SkillIcon } from "@/components/SkillIcon";
import { SkillName } from "@/lib/types";
import { ALL_SKILLS, SKILL_NAMES } from "@/lib/constants";
import { trainingMethods, TrainingMethod } from "@/data/trainingMethods";

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
  
  // State for calculator
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(99);
  const [currentXp, setCurrentXp] = useState(0);
  const [targetXp, setTargetXp] = useState(13034431);
  const [neededXp, setNeededXp] = useState(13034431);
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
    }
  };
  
  const handleTargetLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setTargetLevel(value);
      const xp = getXpForLevel(value);
      setTargetXp(xp);
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
      <Box borderBottom="1px solid" borderColor="brand.border" bg="brand.card">
        <Container maxW="7xl" py={4}>
          <Flex justify="center" align="center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Heading as="h1" size="lg" fontWeight="bold">
                <Text as="span" color="brand.primary">Pro</Text>
                <Text as="span" color="white">bemas</Text>
                <Text as="span" color="gray.400" ml={2} fontSize="sm">| {skillName}</Text>
              </Heading>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" py={8}>
        {/* Hero Banner */}
        <Box bg="brand.card" borderRadius="lg" p={6} mb={8} border="1px solid" borderColor="brand.border">
          <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
            <Flex align="center">
              <Box mr={4}>
                <SkillIcon skill={skillKey} size={56} />
              </Box>
              <Box>
                <Heading size="lg" color="white" mb={1}>{skillName} Calculator</Heading>
                <Text color="gray.400">
                  Plan your {skillName} training efficiently with live Grand Exchange prices.
                </Text>
              </Box>
            </Flex>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button
                colorScheme="yellow"
                variant="outline"
                color="brand.primary" 
                borderColor="brand.primary"
                _hover={{ bg: "rgba(234, 181, 22, 0.1)" }}
              >
                ← Back to Skills
              </Button>
            </Link>
          </Flex>
        </Box>

        {/* Calculator Inputs */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
            <Heading size="md" color="brand.primary" mb={4}>Input</Heading>
            
            <VStack gap={4} align="stretch">
              <Box>
                <Text mb={2} fontWeight="medium" color="white">
                  Current Level
                </Text>
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={currentLevel}
                  onChange={handleCurrentLevelChange}
                  bg="#1a243b"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="md"
                  color="white"
                  _focus={{ borderColor: "brand.primary", outline: "none" }}
                />
              </Box>
              
              <Box>
                <Text mb={2} fontWeight="medium" color="white">
                  Target Level
                </Text>
                <Input
                  type="number"
                  min={2}
                  max={99}
                  value={targetLevel}
                  onChange={handleTargetLevelChange}
                  bg="#1a243b"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="md"
                  color="white"
                  _focus={{ borderColor: "brand.primary", outline: "none" }}
                />
              </Box>
            </VStack>
          </Box>
          
          {/* Results Panel */}
          <Box bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
            <Heading size="md" color="brand.primary" mb={4}>Summary</Heading>
            
            <VStack gap={5} align="stretch">
              <SimpleGrid columns={2} gap={4}>
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={1}>Current XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white">{formatNumber(currentXp)}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={1}>Needed XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white">{formatNumber(neededXp)}</Text>
                </Box>
              </SimpleGrid>
              
              <Box>
                <Box 
                  h="8px" 
                  bg="#1a243b" 
                  borderRadius="full" 
                  overflow="hidden"
                >
                  <Box 
                    h="100%" 
                    w={`${progress}%`} 
                    bg="#eab516" 
                    borderRadius="full"
                  ></Box>
                </Box>
                <Text fontSize="xs" color="gray.400" mt={1}>{progress.toFixed(1)}% Complete</Text>
              </Box>
            </VStack>
          </Box>
        </Grid>
        
        {/* Methods Table */}
        <Box mt={8} bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md" color="brand.primary">Training Methods</Heading>
            <ButtonGroup size="sm" attached variant="outline">
              <Button 
                bg={sortOption === "xphr" ? "brand.primary" : "#1a243b"}
                color={sortOption === "xphr" ? "brand.background" : "white"}
                borderColor="brand.border" 
                borderLeftRadius="md" 
                _hover={{ bg: "#222b43" }}
                onClick={() => setSortOption("xphr")}
              >
                XP/hr
              </Button>
              <Button 
                bg={sortOption === "gphr" ? "brand.primary" : "#1a243b"}
                color={sortOption === "gphr" ? "brand.background" : "white"}
                borderColor="brand.border" 
                borderRadius="0" 
                _hover={{ bg: "#222b43" }}
                onClick={() => setSortOption("gphr")}
              >
                GP/hr
              </Button>
              <Button 
                bg={sortOption === "level" ? "brand.primary" : "#1a243b"}
                color={sortOption === "level" ? "brand.background" : "white"}
                borderColor="brand.border" 
                borderRightRadius="md" 
                _hover={{ bg: "#222b43" }}
                onClick={() => setSortOption("level")}
              >
                Level
              </Button>
            </ButtonGroup>
          </Flex>
          
          {methods.length === 0 ? (
            <Flex justify="center" align="center" py={8}>
              <Text color="gray.400">
                Training methods for {skillName} are coming soon. Check back later!
              </Text>
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Box as="table" width="100%">
                <Box as="thead" bg="#1a243b" borderBottom="1px solid" borderColor="brand.border">
                  <Box as="tr">
                    <Box as="th" px={4} py={3} textAlign="left" color="gray.400" fontWeight="medium" fontSize="sm">Method</Box>
                    <Box as="th" px={4} py={3} textAlign="left" color="gray.400" fontWeight="medium" fontSize="sm">Level</Box>
                    <Box as="th" px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">XP/ea</Box>
                    <Box as="th" px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">Actions</Box>
                    <Box as="th" px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">Hours</Box>
                    <Box as="th" px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">GP/ea</Box>
                    <Box as="th" px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">Profit/Loss</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {calculatedMethods.map((method) => (
                    <Box 
                      key={method.id}
                      as="tr" 
                      _hover={{ bg: "#1a243b" }} 
                      cursor="pointer" 
                      borderBottom="1px solid" 
                      borderColor="brand.border"
                      title={method.notes}
                    >
                      <Box as="td" px={4} py={3} color="white">
                        <Flex align="center" gap={2}>
                          {method.name}
                          {method.isMembers && (
                            <Badge bg="rgba(234, 181, 22, 0.1)" color="brand.primary" fontSize="xs">
                              P2P
                            </Badge>
                          )}
                        </Flex>
                      </Box>
                      <Box as="td" px={4} py={3} color="white">{method.level}</Box>
                      <Box as="td" px={4} py={3} textAlign="right" color="white">{method.xpEach}</Box>
                      <Box as="td" px={4} py={3} textAlign="right" color="white">{formatNumber(method.actionsNeeded)}</Box>
                      <Box as="td" px={4} py={3} textAlign="right" color="white">{method.hoursNeeded}</Box>
                      <Box as="td" px={4} py={3} textAlign="right" color={method.gpEach >= 0 ? "green.500" : "red.500"}>
                        {method.gpEach >= 0 ? `+${method.gpEach}` : method.gpEach}
                      </Box>
                      <Box as="td" px={4} py={3} textAlign="right" color={method.totalProfit >= 0 ? "green.500" : "red.500"}>
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
      <Box as="footer" bg="brand.card" mt={16} py={8} borderTop="1px solid" borderColor="brand.border">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="sm" color="gray.400">© {new Date().getFullYear()} Probemas | All game content is copyright Jagex Ltd.</Text>
          <Text fontSize="sm" color="gray.400" mt={1}>Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.</Text>
        </Container>
      </Box>
    </Box>
  );
} 