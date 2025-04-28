"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; // Added for Header/Footer links
import {
  Box,
  Container,
  Heading,
  Flex, // Added for Header/Footer/PlayerLookup
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
  Badge, // Added for Player Stats indicator
  Button, // Added for Back button
} from '@chakra-ui/react';
import SectionHeading from '@/components/SectionHeading';
import { SkillIcon } from '@/components/SkillIcon'; // Assuming SkillIcon can handle combat skills
import { SkillName } from '@/lib/types'; // May need adjustment if combat skills aren't in SkillName
import { useCalculatorStore } from '@/lib/store'; // Added for player stats
import PlayerLookup from '@/components/PlayerLookup'; // Added player lookup component

// Type for skill levels
type CombatLevels = {
  attack: number;
  strength: number;
  defence: number;
  hitpoints: number;
  ranged: number;
  magic: number;
  prayer: number;
};

// Map API skill names to our state names
const skillApiNameMap: { [key: string]: keyof CombatLevels } = {
    attack: 'attack',
    strength: 'strength',
    defence: 'defence',
    hitpoints: 'hitpoints',
    ranged: 'ranged',
    magic: 'magic',
    prayer: 'prayer',
    // Add other mappings if API names differ, e.g., runecrafting: 'runecraft'
};

export default function CombatCalculatorPage() {
  const { playerStats } = useCalculatorStore(); // Get player stats from store
  
  // Initialize levels based on playerStats if available, otherwise use defaults
  const initialLevels = useMemo(() => {
      const defaultLevels: CombatLevels = {
          attack: 1, strength: 1, defence: 1,
          hitpoints: 10, ranged: 1, magic: 1, prayer: 1,
      };
      if (playerStats?.stats) {
          const statsLevels = { ...defaultLevels };
          for (const apiSkillName in playerStats.stats) {
              const mappedSkillName = skillApiNameMap[apiSkillName];
              if (mappedSkillName) {
                  statsLevels[mappedSkillName] = playerStats.stats[apiSkillName].level;
              }
          }
          return statsLevels;
      }
      return defaultLevels;
  }, [playerStats]); // Dependency ensures this recalculates if stats load later

  const [levels, setLevels] = useState<CombatLevels>(initialLevels);
  const [combatLevel, setCombatLevel] = useState<number>(3); // Initial combat level calculation will be done in useEffect

  const handleLevelChange = (skill: keyof CombatLevels, valueAsString: string, valueAsNumber: number) => {
    setLevels(prevLevels => ({
      ...prevLevels,
      [skill]: isNaN(valueAsNumber) ? 1 : Math.max(1, Math.min(99, valueAsNumber)),
    }));
  };

  // Update levels state IF playerStats change AFTER initial load
  // This prevents unnecessary updates if initialLevels already has the stats
  useEffect(() => {
      if (playerStats?.stats) {
          const newLevels = { ...levels }; // Start with current levels
          let changed = false;
          for (const apiSkillName in playerStats.stats) {
              const mappedSkillName = skillApiNameMap[apiSkillName];
              if (mappedSkillName) {
                  const level = playerStats.stats[apiSkillName].level;
                  // Only update if the level differs from the current state
                  if (level !== newLevels[mappedSkillName]) {
                      newLevels[mappedSkillName] = level;
                      changed = true;
                  }
              }
          }
          // Only set state if levels actually changed compared to current state
          if (changed) {
              setLevels(newLevels);
          }
      }
  }, [playerStats]); // Rerun when playerStats change

  // Recalculate combat level whenever levels change (initial or subsequent)
  useEffect(() => {
    const { attack, strength, defence, hitpoints, ranged, magic, prayer } = levels;

    const base = 0.25 * (defence + hitpoints + Math.floor(prayer / 2));
    const melee = 0.325 * (attack + strength);
    const rangeCalc = 0.4875 * ranged;
    const mageCalc = 0.4875 * magic;

    const combat = base + Math.max(melee, rangeCalc, mageCalc);
    setCombatLevel(Math.floor(combat));

  }, [levels]); // Recalculate combat level when levels state changes

  const skillInputs: { name: keyof CombatLevels; label: string }[] = [
    { name: 'attack', label: 'Attack' },
    { name: 'strength', label: 'Strength' },
    { name: 'defence', label: 'Defence' },
    { name: 'hitpoints', label: 'Hitpoints' },
    { name: 'ranged', label: 'Ranged' },
    { name: 'magic', label: 'Magic' },
    { name: 'prayer', label: 'Prayer' },
  ];

  return (
    <Box> {/* Wrap everything in a Box */}
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
                {/* Changed title to reflect Combat Calc page */}
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Combat Calculator</Text> 
              </Heading>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" mt={8} mb={20}>
        {/* Hero Banner Equivalent */}
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
                 {/* Placeholder Icon - Maybe a combat bracelet or similar? */}
                 <SkillIcon skill={'attack'} size={56} /> 
              </Box>
              <Box>
                <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">Combat Calculator</Heading>
                <Text color="#e0d0b0">
                  Calculate your Old School RuneScape combat level.
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
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}> 
          {/* Input Panel (takes 2 columns on lg) */}
          <Box 
            gridColumn={{ base: 'span 1', lg: 'span 2' }} // Make input panel wider
            bg="rgba(42, 30, 15, 0.75)" 
            borderRadius="md" 
            p={6} 
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
          >
            <SectionHeading mb={4}>Enter Your Levels</SectionHeading>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4}> {/* Adjust columns */}
              {skillInputs.map(({ name, label }) => (
                <FormControl key={name}>
                  <FormLabel 
                    htmlFor={name} 
                    mb={1} 
                    fontSize="sm" 
                    color="#e0d0b0"
                    display="flex"
                    alignItems="center"
                  >
                    <SkillIcon skill={name as SkillName} size={16} />
                    <Text ml={1.5}>{label}</Text>
                    {/* Add Badge if level is from player stats */}
                    {playerStats && playerStats.stats[name] && playerStats.stats[name].level === levels[name] && (
                       <Badge 
                         ml={1.5} 
                         fontSize="xs"
                         bg="#361f0e"
                         color="#ffcb2f"
                         borderRadius="sm"
                         px={1}
                         border="1px solid rgba(0,0,0,0.3)"
                       >
                         {playerStats.username}
                       </Badge>
                    )}
                  </FormLabel>
                  <NumberInput
                    id={name}
                    min={name === 'hitpoints' ? 10 : 1} // HP min level is 10
                    max={99}
                    value={levels[name]}
                    onChange={(valueAsString, valueAsNumber) => handleLevelChange(name, valueAsString, valueAsNumber)}
                    allowMouseWheel
                    bg="rgba(0,0,0,0.3)"
                    borderColor={playerStats && playerStats.stats[name] && playerStats.stats[name].level === levels[name] ? "#ffcb2f" : "black"} // Highlight if from stats
                    borderRadius="md"
                    focusBorderColor="#ffcb2f"
                    variant="outline"
                    size="md"
                    sx={{
                      '.chakra-numberinput__field': { 
                        color: 'white', 
                        fontWeight: 'bold',
                        borderWidth: '2px',
                        borderColor: 'inherit', // Inherit border color from NumberInput
                        _focus: { borderColor: '#ffcb2f' },
                      },
                      '.chakra-numberinput__stepper-group': { borderLeft: '2px solid black', borderColor: 'black' },
                      '.chakra-numberinput__stepper': { 
                        color: '#e0d0b0', // Ensure arrows are visible
                        borderColor: 'black', 
                        bg: 'rgba(0,0,0,0.4)',
                        _hover: { bg: 'rgba(255, 203, 47, 0.1)', color: 'white' }, // Slightly lighten arrows on hover 
                        _active: { bg: 'rgba(255, 203, 47, 0.2)' },
                        _first: { borderTopRightRadius: 'md', borderBottom: '1px solid black' }, 
                        _last: { borderBottomRightRadius: 'md' }
                      }
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              ))}
            </SimpleGrid>
          </Box>

          {/* Result Panel (takes 1 column on lg) */}
          <Box 
            gridColumn={{ base: 'span 1', lg: 'span 1' }} // Takes 1 column
            bg="rgba(42, 30, 15, 0.75)" 
            borderRadius="md" 
            p={6} 
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
            display="flex"
            flexDirection="column"
            justifyContent="center" // Center vertically
            alignItems="center"     // Center horizontally
            minHeight="250px" // Ensure it has some height
          >
            <SectionHeading mb={4}>Your Combat Level</SectionHeading>
            <Stat textAlign="center">
              <StatLabel fontSize="xl" color="#e0d0b0">Level</StatLabel>
              <StatNumber 
                fontSize={{ base: '4xl', md: '6xl' }} // Responsive font size
                fontWeight="extrabold" 
                color="#ffcb2f"
                textShadow="3px 3px 0px rgba(0,0,0,0.6)"
              >
                {combatLevel}
              </StatNumber>
              <StatHelpText color="gray.400">
                Based on the levels provided.
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
        
        {/* Player Lookup Section - Moved here */}
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
            <SectionHeading mb={0}>Import Your Stats</SectionHeading> {/* Removed bottom margin */}
          </Flex>
          
          <PlayerLookup />
          {/* Maybe add a button here later to manually apply stats if needed */}
        </Box>

        {/* Information Box */}
        <Box 
          mt={10} 
          p={6} 
          bg="rgba(42, 30, 15, 0.75)" 
          borderRadius="md" 
          border="2px solid black"
          boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
          backdropFilter="blur(4px)"
        >
          <SectionHeading mb={4}>How Combat Level is Calculated</SectionHeading>
          <Text color="#e0d0b0" mb={3}>
            The Old School RuneScape combat level is calculated from these skills:
          </Text>
          <VStack align="start" spacing={1} color="white">
            <Text><strong>Base level:</strong> (Defence + Hitpoints + Prayer ÷ 2) × 0.25</Text>
            <Text><strong>Melee level:</strong> (Attack + Strength) × 0.325</Text>
            <Text><strong>Range level:</strong> Ranged × 0.4875</Text>
            <Text><strong>Mage level:</strong> Magic × 0.4875</Text>
          </VStack>
          <Text color="#e0d0b0" mt={3}>
            Your combat level is determined by the Base level plus the highest of Melee, Range, or Mage levels.
          </Text>
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