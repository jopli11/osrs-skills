'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Badge,
  Button,
  useToast,
} from '@chakra-ui/react';
import { track } from '@vercel/analytics';
import { useCalculatorStore } from '@/lib/store';
import PlayerLookup from '@/components/PlayerLookup';
import { ALL_SKILLS } from '@/lib/constants';
import { SkillName } from '@/lib/types';

// Type for skill levels
type SkillLevels = Record<SkillName, number>;

// Map API skill names to our SkillName type
const skillApiNameMap: { [key: string]: SkillName } = {
  attack: 'attack',
  strength: 'strength',
  defence: 'defence',
  hitpoints: 'hitpoints',
  ranged: 'ranged',
  prayer: 'prayer',
  magic: 'magic',
  cooking: 'cooking',
  woodcutting: 'woodcutting',
  fletching: 'fletching',
  fishing: 'fishing',
  firemaking: 'firemaking',
  crafting: 'crafting',
  smithing: 'smithing',
  mining: 'mining',
  herblore: 'herblore',
  agility: 'agility',
  thieving: 'thieving',
  slayer: 'slayer',
  farming: 'farming',
  runecraft: 'runecraft',
  hunter: 'hunter',
  construction: 'construction',
};

export default function TotalLevelCalculatorPage() {
  const toast = useToast();
  const { playerStats } = useCalculatorStore();
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize levels with default values
  const initialLevels = (): SkillLevels => {
    const defaultLevels: SkillLevels = {} as SkillLevels;
    ALL_SKILLS.forEach(skill => {
      defaultLevels[skill] = skill === 'hitpoints' ? 10 : 1;
    });
    return defaultLevels;
  };

  const [levels, setLevels] = useState<SkillLevels>(initialLevels());
  const [totalLevel, setTotalLevel] = useState<number>(33); // 1 * 22 skills + 10 hitpoints

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update levels from player stats
  useEffect(() => {
    if (playerStats?.stats && isMounted) {
      const newLevels = { ...levels };
      let changed = false;
      
      for (const apiSkillName in playerStats.stats) {
        const mappedSkillName = skillApiNameMap[apiSkillName];
        if (mappedSkillName && mappedSkillName in newLevels) {
          const level = playerStats.stats[apiSkillName].level;
          if (level !== newLevels[mappedSkillName]) {
            newLevels[mappedSkillName] = level;
            changed = true;
          }
        }
      }
      
      if (changed) {
        setLevels(newLevels);
        toast({
          title: "Stats Imported",
          description: `${playerStats.username}&apos;s stats have been loaded.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [playerStats, isMounted, toast, levels]);

  // Calculate total level whenever levels change
  useEffect(() => {
    const total = Object.values(levels).reduce((sum, level) => sum + level, 0);
    setTotalLevel(total);
  }, [levels]);

  const handleLevelChange = (skill: SkillName, valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(1, Math.min(99, valueAsNumber));
    setLevels(prevLevels => ({
      ...prevLevels,
      [skill]: cleanValue,
    }));
    track('TotalLevelCalc_StatChanged', { skill, level: cleanValue });
  };

  const resetLevels = () => {
    setLevels(initialLevels());
    track('TotalLevelCalc_Reset');
  };

  const setMaxLevels = () => {
    const maxLevels: SkillLevels = {} as SkillLevels;
    ALL_SKILLS.forEach(skill => {
      maxLevels[skill] = 99;
    });
    setLevels(maxLevels);
    track('TotalLevelCalc_SetMax');
  };

  const getSkillDisplayName = (skill: SkillName): string => {
    return skill === 'runecraft' ? 'Runecrafting' : skill.charAt(0).toUpperCase() + skill.slice(1);
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
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Total Level Calculator</Text> 
              </Heading>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" mt={8} mb={20}>
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
            <VStack spacing={4} flex="1">
              <Heading 
                size="xl" 
                textAlign="center" 
                color="white"
                fontFamily="'Roboto Slab', serif"
                textShadow="2px 2px 0px #000"
              >
                📊 Total Level Calculator
              </Heading>
              <Text 
                textAlign="center" 
                color="#e0d0b0" 
                fontSize="lg"
                maxW="2xl"
              >
                Calculate your total level across all skills. Import your stats or enter levels manually.
              </Text>
            </VStack>
            <Link href="/misc-calculators" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'total-level-calculator' })}
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
            </Link>
          </Flex>
        </Box>

        {/* Player Lookup Section */}
        <Box mb={8}>
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
            <Heading size="md" color="white" fontFamily="'Roboto Slab', serif">
              Import Your Stats
            </Heading>
          </Flex>
          <PlayerLookup />
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Skills Input Section */}
          <Box flex="2">
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
                  Skills
                </Badge>
                <Heading size="md" color="white" fontFamily="'Roboto Slab', serif">
                  Skill Levels
                </Heading>
              </Flex>
              <Flex gap={2}>
                <Button
                  size="sm"
                  bg="#362010"
                  color="#e0d0b0"
                  border="1px solid black"
                  _hover={{ bg: "#4a2a15" }}
                  onClick={resetLevels}
                >
                  Reset to 1
                </Button>
                <Button
                  size="sm"
                  bg="#362010"
                  color="#e0d0b0"
                  border="1px solid black"
                  _hover={{ bg: "#4a2a15" }}
                  onClick={setMaxLevels}
                >
                  Set to 99
                </Button>
              </Flex>
            </Flex>

            <Box
              bg="rgba(42, 30, 15, 0.85)"
              border="2px solid black"
              borderRadius="md"
              p={6}
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
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4}>
                {ALL_SKILLS.map((skill) => (
                  <FormControl key={skill}>
                    <FormLabel 
                      color="#e0d0b0" 
                      fontSize="sm" 
                      fontWeight="bold"
                    >
                      {getSkillDisplayName(skill)}
                    </FormLabel>
                    <NumberInput
                      value={levels[skill]}
                      onChange={(valueAsString, valueAsNumber) => 
                        handleLevelChange(skill, valueAsString, valueAsNumber)
                      }
                      min={skill === 'hitpoints' ? 10 : 1}
                      max={99}
                      size="sm"
                    >
                      <NumberInputField
                        bg="#1a140a"
                        border="2px solid"
                        borderColor="#3b2914"
                        color="#e0d0b0"
                        _hover={{
                          borderColor: "#ffcb2f"
                        }}
                        _focus={{
                          borderColor: "#ffcb2f",
                          boxShadow: "0 0 0 1px #ffcb2f"
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          color="#e0d0b0"
                          _hover={{ color: "#ffcb2f" }}
                        />
                        <NumberDecrementStepper
                          color="#e0d0b0"
                          _hover={{ color: "#ffcb2f" }}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                ))}
              </SimpleGrid>
            </Box>
          </Box>

          {/* Results Section */}
          <Box flex="1">
            <Flex align="center" mb={6}>
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
                Results
              </Badge>
              <Heading size="md" color="white" fontFamily="'Roboto Slab', serif">
                Total Level
              </Heading>
            </Flex>

            <VStack spacing={6}>
              {/* Main Total Level Display */}
              <Box
                bg="rgba(42, 30, 15, 0.85)"
                border="2px solid black"
                borderRadius="md"
                p={6}
                w="100%"
                textAlign="center"
                boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
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
                <Stat>
                  <StatLabel color="#e0d0b0" fontSize="lg">Total Level</StatLabel>
                  <StatNumber 
                    color="#ffcb2f" 
                    fontSize="4xl" 
                    fontWeight="bold"
                    textShadow="2px 2px 0px #000"
                  >
                    {totalLevel.toLocaleString()}
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    {totalLevel < 1000 && "Beginner Account"}
                    {totalLevel >= 1000 && totalLevel < 1500 && "Intermediate Account"}
                    {totalLevel >= 1500 && totalLevel < 2000 && "Advanced Account"}
                    {totalLevel >= 2000 && totalLevel < 2200 && "High Level Account"}
                    {totalLevel >= 2200 && totalLevel < 2277 && "Elite Account"}
                    {totalLevel === 2277 && "Maximum Total Level!"}
                  </StatHelpText>
                </Stat>
              </Box>

              {/* Additional Stats */}
              <SimpleGrid columns={1} gap={4} w="100%">
                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">Skills at 99</StatLabel>
                  <StatNumber color="white">
                    {Object.values(levels).filter(level => level === 99).length}
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    {2277 - totalLevel} levels to max
                  </StatHelpText>
                </Stat>

                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">Average Level</StatLabel>
                  <StatNumber color="white">
                    {(totalLevel / 23).toFixed(1)}
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    Across all 23 skills
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
            </VStack>
          </Box>
        </Flex>

        {/* Information Section */}
        <Box mt={12}>
          <Heading size="md" color="white" mb={4} fontFamily="'Roboto Slab', serif">
            About Total Level
          </Heading>
          <Box
            bg="rgba(42, 30, 15, 0.85)"
            border="2px solid black"
            borderRadius="md"
            p={6}
            boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
          >
            <Text color="#e0d0b0" mb={3}>
              Your total level is the sum of all your skill levels. It&apos;s a quick way to measure overall account progress:
            </Text>
            <VStack align="start" spacing={2} color="#b0a080">
              <Text>• <strong>Fresh Account:</strong> 33 total level (all skills at 1, except 10 HP)</Text>
              <Text>• <strong>Mid-game:</strong> 1000-1500 total level</Text>
              <Text>• <strong>End-game:</strong> 2000+ total level</Text>
              <Text>• <strong>Maxed Account:</strong> 2277 total level (all 99s)</Text>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 