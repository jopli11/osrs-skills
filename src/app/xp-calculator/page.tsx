'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Select,
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
import { ALL_SKILLS, SKILL_NAMES } from '@/lib/constants';
import { SkillName } from '@/lib/types';
import { getXpToLevel, getXpForLevel, formatXp, getActionsForXp } from '@/lib/utils/xp-utils';

export default function XpCalculatorPage() {
  const toast = useToast();
  const { playerStats } = useCalculatorStore();
  const [isMounted, setIsMounted] = useState(false);
  
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('attack');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(99);
  const [xpPerAction, setXpPerAction] = useState<number>(10);
  
  // Calculated values
  const [xpNeeded, setXpNeeded] = useState<number>(0);
  const [actionsNeeded, setActionsNeeded] = useState<number>(0);
  const [currentXp, setCurrentXp] = useState<number>(0);
  const [targetXp, setTargetXp] = useState<number>(0);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update levels from player stats when skill changes
  useEffect(() => {
    if (playerStats?.stats && isMounted) {
      const skillData = playerStats.stats[selectedSkill];
      if (skillData) {
        setCurrentLevel(skillData.level);
        toast({
          title: "Level Updated",
          description: `Current ${SKILL_NAMES[selectedSkill]} level set to ${skillData.level}`,
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [selectedSkill, playerStats, isMounted, toast]);

  // Calculate XP values whenever inputs change
  useEffect(() => {
    const current = getXpForLevel(currentLevel);
    const target = getXpForLevel(targetLevel);
    const needed = getXpToLevel(currentLevel, targetLevel);
    const actions = getActionsForXp(needed, xpPerAction);

    setCurrentXp(current);
    setTargetXp(target);
    setXpNeeded(needed);
    setActionsNeeded(actions);
  }, [currentLevel, targetLevel, xpPerAction]);

  const handleSkillChange = (skill: SkillName) => {
    setSelectedSkill(skill);
    track('XpCalc_SkillChanged', { skill });
  };

  const handleCurrentLevelChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(1, Math.min(99, valueAsNumber));
    setCurrentLevel(cleanValue);
    if (cleanValue >= targetLevel) {
      setTargetLevel(Math.min(99, cleanValue + 1));
    }
    track('XpCalc_CurrentLevelChanged', { skill: selectedSkill, level: cleanValue });
  };

  const handleTargetLevelChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 2 : Math.max(currentLevel + 1, Math.min(99, valueAsNumber));
    setTargetLevel(cleanValue);
    track('XpCalc_TargetLevelChanged', { skill: selectedSkill, level: cleanValue });
  };

  const handleXpPerActionChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(0.1, valueAsNumber);
    setXpPerAction(cleanValue);
    track('XpCalc_XpPerActionChanged', { xp: cleanValue });
  };

  const setCommonGoals = (goal: number) => {
    setTargetLevel(goal);
    track('XpCalc_CommonGoalSet', { goal });
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
                fontFamily="var(--font-roboto-slab), serif"
                textShadow="2px 2px 0px #000"
              >
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| XP Calculator</Text> 
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
              <Flex align="center" gap={4}>
                <Box position="relative" width="48px" height="48px">
                  <Image
                    src="/icons/calculators/xp icon.png"
                    alt="XP Calculator"
                    width={48}
                    height={48}
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                    }}
                  />
                </Box>
                <Heading 
                  size="xl" 
                  textAlign="center" 
                  color="white"
                  fontFamily="var(--font-roboto-slab), serif"
                  textShadow="2px 2px 0px #000"
                >
                  XP Calculator
                </Heading>
              </Flex>
              <Text 
                textAlign="center" 
                color="#e0d0b0" 
                fontSize="lg"
                maxW="2xl"
              >
                Calculate experience needed to reach your target level and how many actions it will take.
              </Text>
            </VStack>
            <Link href="/misc-calculators" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'xp-calculator' })}
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
            <Heading size="md" color="white" fontFamily="var(--font-roboto-slab), serif">
              Import Your Stats
            </Heading>
          </Flex>
          <PlayerLookup />
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Input Section */}
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
                Settings
              </Badge>
              <Heading size="md" color="white" fontFamily="var(--font-roboto-slab), serif">
                Calculator Settings
              </Heading>
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
              <VStack spacing={6}>
                {/* Skill Selection */}
                <FormControl>
                  <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                    Skill
                  </FormLabel>
                  <Select
                    value={selectedSkill}
                    onChange={(e) => handleSkillChange(e.target.value as SkillName)}
                    bg="#1a140a"
                    border="2px solid"
                    borderColor="#3b2914"
                    color="#e0d0b0"
                    _hover={{ borderColor: "#ffcb2f" }}
                    _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                  >
                    {ALL_SKILLS.map((skill) => (
                      <option key={skill} value={skill} style={{ backgroundColor: '#1a140a' }}>
                        {SKILL_NAMES[skill]}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* Level Inputs */}
                <SimpleGrid columns={2} gap={4} w="100%">
                  <FormControl>
                    <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                      Current Level
                    </FormLabel>
                    <NumberInput
                      value={currentLevel}
                      onChange={handleCurrentLevelChange}
                      min={selectedSkill === 'hitpoints' ? 10 : 1}
                      max={98}
                      size="sm"
                    >
                      <NumberInputField
                        bg="#1a140a"
                        border="2px solid"
                        borderColor="#3b2914"
                        color="#e0d0b0"
                        _hover={{ borderColor: "#ffcb2f" }}
                        _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                        <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                      Target Level
                    </FormLabel>
                    <NumberInput
                      value={targetLevel}
                      onChange={handleTargetLevelChange}
                      min={currentLevel + 1}
                      max={99}
                      size="sm"
                    >
                      <NumberInputField
                        bg="#1a140a"
                        border="2px solid"
                        borderColor="#3b2914"
                        color="#e0d0b0"
                        _hover={{ borderColor: "#ffcb2f" }}
                        _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                        <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>

                {/* Common Goals */}
                <Box w="100%">
                  <Text color="#e0d0b0" fontSize="sm" fontWeight="bold" mb={2}>
                    Common Goals
                  </Text>
                  <SimpleGrid columns={4} gap={2}>
                    {[50, 60, 70, 80, 90, 95, 98, 99].map((level) => (
                      <Button
                        key={level}
                        size="xs"
                        bg="#362010"
                        color="#e0d0b0"
                        border="1px solid black"
                        _hover={{ bg: "#4a2a15" }}
                        onClick={() => setCommonGoals(level)}
                        isDisabled={level <= currentLevel}
                      >
                        {level}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* XP per Action */}
                <FormControl>
                  <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                    XP per Action (optional)
                  </FormLabel>
                  <NumberInput
                    value={xpPerAction}
                    onChange={handleXpPerActionChange}
                    min={0.1}
                    step={0.1}
                    precision={1}
                    size="sm"
                  >
                    <NumberInputField
                      bg="#1a140a"
                      border="2px solid"
                      borderColor="#3b2914"
                      color="#e0d0b0"
                      _hover={{ borderColor: "#ffcb2f" }}
                      _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="#b0a080" mt={1}>
                    Enter XP gained per action to calculate actions needed
                  </Text>
                </FormControl>
              </VStack>
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
              <Heading size="md" color="white" fontFamily="var(--font-roboto-slab), serif">
                XP Calculation
              </Heading>
            </Flex>

            <VStack spacing={4}>
              {/* XP Needed */}
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
                  <StatLabel color="#e0d0b0" fontSize="lg">XP Needed</StatLabel>
                  <StatNumber 
                    color="#ffcb2f" 
                    fontSize="3xl" 
                    fontWeight="bold"
                    textShadow="2px 2px 0px #000"
                  >
                    {formatXp(xpNeeded)}
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    {SKILL_NAMES[selectedSkill]} {currentLevel} → {targetLevel}
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
                  <StatLabel color="#e0d0b0">Current XP</StatLabel>
                  <StatNumber color="white">{formatXp(currentXp)}</StatNumber>
                  <StatHelpText color="#b0a080">Level {currentLevel}</StatHelpText>
                </Stat>

                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">Target XP</StatLabel>
                  <StatNumber color="white">{formatXp(targetXp)}</StatNumber>
                  <StatHelpText color="#b0a080">Level {targetLevel}</StatHelpText>
                </Stat>

                {actionsNeeded !== Infinity && (
                  <Stat
                    bg="rgba(53, 40, 30, 0.9)"
                    border="2px solid black"
                    borderRadius="md"
                    p={4}
                    boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                  >
                    <StatLabel color="#e0d0b0">Actions Needed</StatLabel>
                    <StatNumber color="white">
                      {actionsNeeded.toLocaleString()}
                    </StatNumber>
                    <StatHelpText color="#b0a080">
                      @ {xpPerAction} XP each
                    </StatHelpText>
                  </Stat>
                )}
              </SimpleGrid>
            </VStack>
          </Box>
        </Flex>

        {/* Information Section */}
        <Box mt={12}>
          <Heading size="md" color="white" mb={4} fontFamily="var(--font-roboto-slab), serif">
            About XP Calculation
          </Heading>
          <Box
            bg="rgba(42, 30, 15, 0.85)"
            border="2px solid black"
            borderRadius="md"
            p={6}
            boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
          >
            <Text color="#e0d0b0" mb={3}>
              This calculator uses the official OSRS experience table to determine exact XP requirements:
            </Text>
            <VStack align="start" spacing={2} color="#b0a080">
              <Text>• <strong>Level 99:</strong> 13,034,431 total XP</Text>
              <Text>• <strong>Level 92:</strong> Halfway to 99 in XP</Text>
              <Text>• <strong>XP per Action:</strong> Enter the XP you gain per activity to calculate actions needed</Text>
              <Text>• <strong>Import Stats:</strong> Use the player lookup to automatically set your current levels</Text>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 