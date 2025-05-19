'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  Checkbox,
  CheckboxGroup,
  Button,
  Text,
  SimpleGrid,
  Flex,
  Heading,
  Link as ChakraLink,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ReactSelect, { StylesConfig, GroupBase } from 'react-select';
import OsrsHeading from '@/components/OsrsHeading';
import PlayerLookup from '@/components/PlayerLookup';
import { SkillIcon } from '@/components/SkillIcon';
import { SkillName } from '@/lib/types';
import { track } from '@vercel/analytics';
import { EquipmentItem } from '@/data/equipmentData';

interface NumericPlayerStats {
  attack: number;
  strength: number;
  ranged: number;
  magic: number;
  prayer: number;
}

interface EquipmentState {
  head: string | null;
  cape: string | null;
  neck: string | null;
  ammo: string | null;
  weapon: string | null;
  body: string | null;
  shield: string | null;
  legs: string | null;
  hands: string | null;
  feet: string | null;
  ring: string | null;
}

interface EquipmentOptionType {
  value: string;
  label: string;
  slot: EquipmentItem['slot'];
}

export interface MaxHitCalculatorCommonProps {
  pageTitle: string;
  heroIconSkill: SkillName;
  calculatorType: 'Melee' | 'Ranged' | 'Magic';

  localPlayerStats: NumericPlayerStats;
  setLocalPlayerStats: React.Dispatch<React.SetStateAction<NumericPlayerStats>>;
  
  equipment: EquipmentState;
  setEquipment: React.Dispatch<React.SetStateAction<EquipmentState>>;
  equipmentOptions: EquipmentOptionType[];
  customReactSelectStyles: StylesConfig<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>;

  prayers: string[];
  setPrayers: React.Dispatch<React.SetStateAction<string[]>>;
  availablePrayers: { value: string; label: string; type: 'melee' | 'ranged' | 'magic' | 'any' }[];

  potion: string | null;
  setPotion: React.Dispatch<React.SetStateAction<string | null>>;
  availablePotions: { value: string; label: string }[];

  combatStyle: string | null;
  setCombatStyle: React.Dispatch<React.SetStateAction<string | null>>;
  availableCombatStyles: { value: string; label: string }[];
  
  spell?: string | null;
  setSpell?: React.Dispatch<React.SetStateAction<string | null>>;
  availableSpells?: { value: string; label: string }[];

  isOnSlayerTask: boolean;
  setIsOnSlayerTask: React.Dispatch<React.SetStateAction<boolean>>;

  isAttackingDemon: boolean;
  setIsAttackingDemon: React.Dispatch<React.SetStateAction<boolean>>;

  calculateSpecificMaxHit: () => void;
  maxHitResult: number;

  showPlayerLookup: boolean;
  hasMounted: boolean;
}

const MaxHitCalculatorCommon: React.FC<MaxHitCalculatorCommonProps> = (props) => {
  const {
    pageTitle,
    heroIconSkill,
    calculatorType,
    localPlayerStats,
    setLocalPlayerStats,
    equipment,
    setEquipment,
    equipmentOptions,
    customReactSelectStyles,
    prayers,
    setPrayers,
    availablePrayers,
    potion,
    setPotion,
    availablePotions,
    combatStyle,
    setCombatStyle,
    availableCombatStyles,
    spell,
    setSpell,
    availableSpells,
    isOnSlayerTask,
    setIsOnSlayerTask,
    isAttackingDemon,
    setIsAttackingDemon,
    calculateSpecificMaxHit,
    maxHitResult,
    showPlayerLookup,
    hasMounted
  } = props;

  const weaponOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'weapon'), [equipmentOptions]);
  const shieldOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'shield'), [equipmentOptions]);
  const neckOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'neck'), [equipmentOptions]);
  const handOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'hands'), [equipmentOptions]);
  const headOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'head'), [equipmentOptions]);
  const capeOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'cape'), [equipmentOptions]);
  const ammoOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'ammo'), [equipmentOptions]);
  const bodyOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'body'), [equipmentOptions]);
  const legsOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'legs'), [equipmentOptions]);
  const feetOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'feet'), [equipmentOptions]);
  const ringOptions = useMemo(() => equipmentOptions.filter(opt => opt.slot === 'ring'), [equipmentOptions]);

  return (
    <Box>
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
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| {pageTitle}</Text>
              </Heading>
            </ChakraLink>
          </Flex>
        </Container>
      </Box>

      <Box id="common-hero-placeholder" />

      <Container maxW="6xl" mt={8} mb={8}>
        <Box
          bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black"
          boxShadow="5px 5px 0 rgba(0,0,0,0.4)" backdropFilter="blur(4px)" position="relative"
          _after={{ content: '""', position: 'absolute', top: '1px', left: '1px', right: '1px', height: '1px', backgroundColor: 'rgba(255, 203, 47, 0.2)' }}
        >
          <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
            <Flex align="center">
              <Box mr={4} p={2} borderRadius="full" bg="rgba(0,0,0,0.5)" border="1px solid rgba(0,0,0,0.8)" boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)">
                 <SkillIcon skill={heroIconSkill} size={56} />
              </Box>
              <Box>
                <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">{pageTitle}</Heading>
                <Text color="#e0d0b0">Determine your potential {calculatorType.toLowerCase()} max damage.</Text>
              </Box>
            </Flex>
            <ChakraLink as={NextLink} href="/" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
              <Button
                onClick={() => track('Navigate_To_Skills', { from: pageTitle.replace(/ /g, '_') })}
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
            </ChakraLink>
          </Flex>
        </Box>
      </Container>

      <Container maxW="6xl" mt={0} mb={20}>
        {hasMounted ? (
          <>
            <VStack spacing={8} align="stretch">
              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={{ base: 4, md: 6 }} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                <OsrsHeading fontSize="xl" mb={4}>{"Import Your Stats"}</OsrsHeading>
                {showPlayerLookup ? <PlayerLookup /> : null}
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                  <OsrsHeading fontSize="xl" mb={4}>{"Player Stats"}</OsrsHeading>
                  <VStack spacing={4} align="stretch">
                    {(Object.keys(localPlayerStats) as Array<keyof NumericPlayerStats>).map((statName) => {
                      const statLabel = statName.charAt(0).toUpperCase() + statName.slice(1);
                      return (
                        <VStack key={statName} align="stretch" spacing={1}>
                          <FormLabel
                            htmlFor={`${statName}-level-${calculatorType.toLowerCase()}`}
                            mb="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            color="#c5c5c5"
                            fontWeight="medium"
                            fontSize="sm"
                          >
                            <SkillIcon skill={statName} size={20} />
                            <Text ml={2}>{statLabel}</Text>
                          </FormLabel>
                          <NumberInput
                            id={`${statName}-level-${calculatorType.toLowerCase()}`}
                            size="md"
                            min={1}
                            max={99}
                            value={localPlayerStats[statName]}
                            onChange={(_valueAsString, valueAsNumber) => {
                              const cleanValue = isNaN(valueAsNumber) ? 1 : Math.max(1, Math.min(99, valueAsNumber));
                              setLocalPlayerStats(prevStats => ({
                                ...prevStats,
                                [statName]: cleanValue,
                              }));
                              track(`${calculatorType}MaxHitCalc_StatChanged`, { stat: statName, level: cleanValue });
                            }}
                            bg="#1a140a"
                            borderColor="#3b2914"
                            focusBorderColor="#ffcb2f"
                            allowMouseWheel
                            onFocus={() => track(`${calculatorType}MaxHitCalc_StatFocused`, { stat: statName })}
                            borderRadius="sm"
                          >
                            <NumberInputField
                              color="#e0d0b0"
                              textAlign="center"
                              fontSize="lg"
                              fontWeight="bold"
                              _hover={{ borderColor: "#4a3822" }}
                              borderRadius="sm"
                            />
                            <NumberInputStepper borderColor="#3b2914" borderLeftWidth="1px">
                              <NumberIncrementStepper
                                color="#a09080"
                                _active={{ bg: '#ffcb2f', color: '#211305' }}
                                _hover={{ color: '#ffcb2f' }}
                                borderColor="transparent"
                                borderTopRightRadius="sm"
                              />
                              <NumberDecrementStepper
                                color="#a09080"
                                _active={{ bg: '#ffcb2f', color: '#211305' }}
                                _hover={{ color: '#ffcb2f' }}
                                borderColor="transparent"
                                borderBottomRightRadius="sm"
                              />
                            </NumberInputStepper>
                          </NumberInput>
                        </VStack>
                      );
                    })}
                  </VStack>
                </Box>

                <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                  <OsrsHeading fontSize="xl" mb={4}>{"Equipment"}</OsrsHeading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {(Object.keys(equipment) as Array<keyof EquipmentState>).map((slot) => {
                        let optionsForSlot: EquipmentOptionType[] = [];
                        switch (slot) {
                            case 'head': optionsForSlot = headOptions; break;
                            case 'cape': optionsForSlot = capeOptions; break;
                            case 'neck': optionsForSlot = neckOptions; break;
                            case 'ammo': optionsForSlot = ammoOptions; break;
                            case 'weapon': optionsForSlot = weaponOptions; break;
                            case 'body': optionsForSlot = bodyOptions; break;
                            case 'shield': optionsForSlot = shieldOptions; break;
                            case 'legs': optionsForSlot = legsOptions; break;
                            case 'hands': optionsForSlot = handOptions; break;
                            case 'feet': optionsForSlot = feetOptions; break;
                            case 'ring': optionsForSlot = ringOptions; break;
                        }
                        return (
                            <FormControl key={slot}>
                                <FormLabel htmlFor={`${slot}-select-${calculatorType.toLowerCase()}`}>{slot.charAt(0).toUpperCase() + slot.slice(1)}</FormLabel>
                                <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                                inputId={`${slot}-select-${calculatorType.toLowerCase()}`} 
                                instanceId={`${slot}-select-instance-${calculatorType.toLowerCase()}`}
                                placeholder={`Select ${slot}...`}
                                options={optionsForSlot}
                                value={optionsForSlot.find(opt => opt.value === equipment[slot])}
                                onChange={(selectedOption) => setEquipment(prevEq => ({...prevEq, [slot]: selectedOption ? selectedOption.value : null }))}
                                styles={customReactSelectStyles} isClearable isSearchable
                                />
                            </FormControl>
                        );
                    })}
                  </SimpleGrid>
                  <Text fontSize="sm" color="gray.400" mt={4}>Equipment list is limited for now.</Text>
                </Box>
              </SimpleGrid>

              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                <OsrsHeading fontSize="xl" mb={4}>{"Boosts & Prayers"}</OsrsHeading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl>
                    <FormLabel>Potion</FormLabel>
                    <ChakraSelect
                      id={`potion-select-${calculatorType.toLowerCase()}`}
                      placeholder="Select potion"
                      value={potion || ''}
                      onChange={(e) => setPotion(e.target.value || null)}
                      bg="#1a140a"
                      color="#e0d0b0"
                      borderColor="#3b2914"
                      _hover={{ borderColor: '#ffcb2f' }}
                      _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                      css={{ option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } }}
                    >
                      {availablePotions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </ChakraSelect>
                  </FormControl>
                  <FormControl display="flex" alignItems="center" pt={{ md: 8 }}>
                    <Checkbox
                      id={`slayer-task-checkbox-${calculatorType.toLowerCase()}`}
                      isChecked={isOnSlayerTask}
                      onChange={(e) => setIsOnSlayerTask(e.target.checked)}
                      colorScheme="yellow"
                      borderColor="gray.600"
                      size="lg"
                      mr={2}
                    />
                    <FormLabel htmlFor={`slayer-task-checkbox-${calculatorType.toLowerCase()}`} mb="0" color="#e0d0b0">
                      On Slayer Task? (for Slayer Helm bonus)
                    </FormLabel>
                  </FormControl>
                  <FormControl display="flex" alignItems="center" pt={{ base: 2, md: 8 }}>
                    <Checkbox
                      id={`attacking-demon-checkbox-${calculatorType.toLowerCase()}`}
                      isChecked={isAttackingDemon}
                      onChange={(e) => setIsAttackingDemon(e.target.checked)}
                      colorScheme="red"
                      borderColor="gray.600"
                      size="lg"
                      mr={2}
                    />
                    <FormLabel htmlFor={`attacking-demon-checkbox-${calculatorType.toLowerCase()}`} mb="0" color="#e0d0b0">
                      Attacking a Demon?
                    </FormLabel>
                  </FormControl>
                  <FormControl gridColumn={{ md: "1 / -1" }}>
                    <FormLabel>Prayers</FormLabel>
                    <CheckboxGroup value={prayers} onChange={(values: string[]) => setPrayers(values)}>
                      <HStack spacing={4} wrap="wrap">
                        {availablePrayers.filter(p => p.type === calculatorType.toLowerCase() || p.type === 'any').map(p => (
                            <Checkbox key={p.value} value={p.value}>{p.label}</Checkbox>
                        ))}
                      </HStack>
                    </CheckboxGroup>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                <OsrsHeading fontSize="xl" mb={4}>{`${calculatorType} Style Specifics`}</OsrsHeading>
                <SimpleGrid columns={{ base: 1, md: (calculatorType === 'Magic' && availableSpells ? 2 : 1) }} spacing={6}>
                  <FormControl>
                    <FormLabel>Combat Style</FormLabel>
                    <ChakraSelect
                      id={`combat-style-select-${calculatorType.toLowerCase()}`}
                      placeholder="Select style"
                      value={combatStyle || ''}
                      onChange={(e) => setCombatStyle(e.target.value || null)}
                      bg="#1a140a" color="#e0d0b0" borderColor="#3b2914"
                      _hover={{ borderColor: '#ffcb2f' }}
                      _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                      css={{ option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } }}
                    >
                      {availableCombatStyles.map(cs => <option key={cs.value} value={cs.value}>{cs.label}</option>)}
                    </ChakraSelect>
                  </FormControl>
                  {calculatorType === 'Magic' && setSpell && availableSpells && (
                    <FormControl>
                      <FormLabel>Magic Spell</FormLabel>
                      <ChakraSelect
                        id={`magic-spell-select-${calculatorType.toLowerCase()}`}
                        placeholder="Select spell"
                        value={spell || ''}
                        onChange={(e) => setSpell(e.target.value || null)}
                        bg="#1a140a" color="#e0d0b0" borderColor="#3b2914"
                        _hover={{ borderColor: '#ffcb2f' }}
                        _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                        css={{ option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } }}
                      >
                        {availableSpells.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </ChakraSelect>
                    </FormControl>
                  )}
                </SimpleGrid>
              </Box>

              <Box
                bg="rgba(42, 30, 15, 0.85)"
                borderRadius="md"
                p={{ base: 4, md: 6 }}
                border="2px solid black"
                boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
              >
                <VStack spacing={4}>
                  <Button 
                    onClick={() => {
                        calculateSpecificMaxHit();
                        track(`${calculatorType}MaxHitCalc_CalculateClicked`);
                    }}
                    size="lg" bg="#ffcb2f" color="#211305" _hover={{ bg: '#e0a922' }} 
                    border="2px solid black" boxShadow="2px 2px 0 rgba(0,0,0,0.5)" fontWeight="bold">
                    Calculate {calculatorType} Max Hit
                  </Button>
                  {hasMounted && (
                    <Box textAlign="center" w="100%">
                      <OsrsHeading fontSize="lg" mb={2}>{"Result"}</OsrsHeading>
                      <Box bg="rgba(0,0,0,0.3)" p={4} borderRadius="md" minW="150px" display="inline-block">
                        <Text fontWeight="bold" color="#ffcb2f">{calculatorType} Max Hit:</Text>
                        <Text fontSize="2xl" fontWeight="bold">{maxHitResult}</Text>
                      </Box>
                    </Box>
                  )}
                </VStack>
              </Box>
            </VStack>
          </>
        ) : null}
      </Container>
    </Box>
  );
};

export default MaxHitCalculatorCommon; 