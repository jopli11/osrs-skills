'use client';

import {
  Box,
  Container,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select as ChakraSelect,
  Checkbox,
  CheckboxGroup,
  Button,
  Text,
  SimpleGrid,
  useToast,
  Flex,
  Heading,
  Link as ChakraLink
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import ReactSelect, { StylesConfig, GroupBase } from 'react-select';
import OsrsHeading from '@/components/OsrsHeading';
import PlayerLookup from '@/components/PlayerLookup';
import { SkillIcon } from '@/components/SkillIcon';
import { track } from '@vercel/analytics';
import { useCalculatorStore } from '@/lib/store';
import { 
  calculateMeleeMaxHit, 
  calculateRangedMaxHit, 
  calculateMagicMaxHit,
  PRAYER_BONUSES,
  POTION_STRENGTH_BONUS,
  POTION_RANGED_BONUS,
} from '@/lib/formulas';
import Footer from '@/components/Footer';
import { EQUIPMENT_DATA, EquipmentItem } from '@/data/equipmentData';

const MOCK_SPELL_MAX_HITS: Record<string, number> = {
  fire_strike: 8,
  fire_bolt: 12,
  fire_blast: 16,
  fire_wave: 20,
  fire_surge: 24,
  ice_barrage: 30,
};

interface NumericPlayerStats {
  attack: number;
  strength: number;
  ranged: number;
  magic: number;
  prayer: number;
}

interface EquipmentOptionType {
  value: string;
  label: string;
  slot: EquipmentItem['slot'];
}

const customReactSelectStyles: StylesConfig<EquipmentOptionType, false, GroupBase<EquipmentOptionType>> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#1a140a',
    borderColor: state.isFocused ? '#ffcb2f' : '#3b2914',
    boxShadow: state.isFocused ? '0 0 0 1px #ffcb2f' : base.boxShadow,
    minHeight: '40px',
    color: '#e0d0b0',
    '&:hover': {
      borderColor: '#ffcb2f',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1a140a',
    border: '1px solid #3b2914',
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#ffcb2f' : state.isFocused ? '#2c1f0e' : '#1a140a',
    color: state.isSelected ? '#211305' : '#e0d0b0',
    '&:hover': {
      backgroundColor: state.isSelected ? '#e0a922' : '#2c1f0e',
      color: state.isSelected ? '#211305' : '#ffcb2f',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#e0d0b0',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#7a7060',
  }),
  input: (base) => ({
    ...base,
    color: '#e0d0b0',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: '#3b2914',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#ffcb2f' : '#7a7060',
    '&:hover': {
      color: '#ffcb2f',
    },
  }),
};

export default function MaxHitCalculatorPage() {
  const toast = useToast();
  const [hasMounted, setHasMounted] = useState(false);
  const [showPlayerLookup, setShowPlayerLookup] = useState(false);
  
  const [localPlayerStats, setLocalPlayerStats] = useState<NumericPlayerStats>({
    attack: 1,
    strength: 1,
    ranged: 1,
    magic: 1,
    prayer: 1,
  });

  const storePlayerStats = useCalculatorStore((state) => state.playerStats);
  const setStoreNotification = useCalculatorStore((state) => state.setNotification);

  useEffect(() => {
    setHasMounted(true);
    setShowPlayerLookup(true);
  }, []);

  useEffect(() => {
    if (storePlayerStats && storePlayerStats.stats) {
      const newStats: NumericPlayerStats = {
        attack: storePlayerStats.stats.attack?.level || 1,
        strength: storePlayerStats.stats.strength?.level || 1,
        ranged: storePlayerStats.stats.ranged?.level || 1,
        magic: storePlayerStats.stats.magic?.level || 1,
        prayer: storePlayerStats.stats.prayer?.level || 1,
      };
      if (JSON.stringify(newStats) !== JSON.stringify(localPlayerStats)) {
        setLocalPlayerStats(newStats);
        if (storePlayerStats.username) {
          toast({
            title: "Stats Synced",
            description: `${storePlayerStats.username}'s stats from store applied.`,
            status: "info",
            duration: 2500,
            isClosable: true,
          });
        }
      }
    }
  }, [storePlayerStats, toast, localPlayerStats]);

  const [equipment, setEquipment] = useState<{ 
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
  }> ({
    head: null,
    cape: null,
    neck: null,
    ammo: null,
    weapon: null,
    body: null,
    shield: null,
    legs: null,
    hands: null,
    feet: null,
    ring: null,
  });

  const [prayers, setPrayers] = useState<string[]>([]);
  const [potion, setPotion] = useState<string | null>(null);
  const [combatStyle, setCombatStyle] = useState<string | null>(null);
  const [spell, setSpell] = useState<string | null>(null);
  const [isOnSlayerTask, setIsOnSlayerTask] = useState(false);

  const [meleeMaxHit, setMeleeMaxHit] = useState(0);
  const [rangedMaxHit, setRangedMaxHit] = useState(0);
  const [magicMaxHit, setMagicMaxHit] = useState(0);

  const equipmentOptions = useMemo((): EquipmentOptionType[] => 
    Object.keys(EQUIPMENT_DATA).map(key => ({
      value: key,
      label: key, 
      slot: EQUIPMENT_DATA[key].slot,
    })),
  []);

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

  const calculateMaxHits = () => {
    // --- Melee Calculation ---
    const selectedMeleePrayer = prayers.find(p => PRAYER_BONUSES.melee_strength[p as keyof typeof PRAYER_BONUSES.melee_strength]);
    const meleePrayerMultiplier = selectedMeleePrayer ? PRAYER_BONUSES.melee_strength[selectedMeleePrayer as keyof typeof PRAYER_BONUSES.melee_strength] : 1;

    let meleePotionStrengthBonus = 0;
    const meleePotionFunc = POTION_STRENGTH_BONUS[potion as keyof typeof POTION_STRENGTH_BONUS];
    if (meleePotionFunc) {
      meleePotionStrengthBonus = meleePotionFunc(localPlayerStats.strength);
    }

    const meleeParams = {
      strengthLevel: localPlayerStats.strength,
      potionBonus: meleePotionStrengthBonus,
      prayerBonus: meleePrayerMultiplier,
      styleBonus: combatStyle === 'aggressive_melee' ? 3 : combatStyle === 'controlled_melee' ? 1 : 0,
      equipment: equipment,
      combatStyle: combatStyle,
      isOnSlayerTask: isOnSlayerTask,
    };
    const newMeleeMax = calculateMeleeMaxHit(meleeParams);
    setMeleeMaxHit(newMeleeMax);

    // --- Ranged Calculation ---
    const selectedRangedPrayer = prayers.find(p => PRAYER_BONUSES.ranged_strength[p as keyof typeof PRAYER_BONUSES.ranged_strength]);
    const rangedPrayerMultiplier = selectedRangedPrayer ? PRAYER_BONUSES.ranged_strength[selectedRangedPrayer as keyof typeof PRAYER_BONUSES.ranged_strength] : 1;

    let rangedPotionBonus = 0;
    const rangedPotionFunc = POTION_RANGED_BONUS[potion as keyof typeof POTION_RANGED_BONUS];
    if (rangedPotionFunc) {
      rangedPotionBonus = rangedPotionFunc(localPlayerStats.ranged);
    }

    const rangedParams = {
      rangedLevel: localPlayerStats.ranged,
      potionBonus: rangedPotionBonus,
      prayerBonus: rangedPrayerMultiplier,
      styleBonus: combatStyle === 'ranged_accurate' ? 3 : (combatStyle === 'ranged_longrange' ? 1 : 0),
      equipment: equipment,
      isOnSlayerTask: isOnSlayerTask,
    };
    const newRangedMax = calculateRangedMaxHit(rangedParams);
    setRangedMaxHit(newRangedMax);

    // --- Magic Calculation ---
    const baseSpellDamage = spell ? MOCK_SPELL_MAX_HITS[spell] || 0 : 0;
    const magicParams = {
      spellBaseMaxHit: baseSpellDamage,
      equipment: equipment,
      isOnSlayerTask: isOnSlayerTask,
    };
    const newMagicMax = calculateMagicMaxHit(magicParams);
    setMagicMaxHit(newMagicMax);

    track('Calculate_MaxHit', {
        atk: localPlayerStats.attack,
        str: localPlayerStats.strength,
        rng: localPlayerStats.ranged,
        mag: localPlayerStats.magic,
        pry: localPlayerStats.prayer,
        potion,
        combatStyle,
        spell,
        prayersCount: prayers.length,
        meleeResult: newMeleeMax,
        rangedResult: newRangedMax,
        magicResult: newMagicMax
    });
    setStoreNotification({
        message: `Max Hits: Melee-${newMeleeMax}, Range-${newRangedMax}, Magic-${newMagicMax}`,
        type: 'success',
        timestamp: Date.now(),
    });
  };

  return (
    <Box> 
      {/* Header and Hero sections - Rendered on server */}
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
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| Max Hit Calculator</Text> 
              </Heading>
            </ChakraLink>
          </Flex>
        </Container>
      </Box>

       {/* Hero Banner Equivalent - Also keeping on server render */}
       <Container maxW="6xl" mt={8} mb={8}> {/* Reduced bottom margin */} 
        <Box 
          bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} /* Removed mb={8} */ border="2px solid black" 
          boxShadow="5px 5px 0 rgba(0,0,0,0.4)" backdropFilter="blur(4px)" position="relative"
          _after={{ content: '""', position: 'absolute', top: '1px', left: '1px', right: '1px', height: '1px', backgroundColor: 'rgba(255, 203, 47, 0.2)' }}
        >
          <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
            <Flex align="center">
              <Box mr={4} p={2} borderRadius="full" bg="rgba(0,0,0,0.5)" border="1px solid rgba(0,0,0,0.8)" boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)">
                 <SkillIcon skill={'strength'} size={56} />
              </Box>
              <Box>
                <Heading size="lg" color="white" mb={1} textShadow="2px 2px 0px #000" fontFamily="'Roboto Slab', serif">Max Hit Calculator</Heading>
                <Text color="#e0d0b0">Determine your potential max damage in Old School RuneScape.</Text>
              </Box>
            </Flex>
            <ChakraLink as={NextLink} href="/" style={{ textDecoration: 'none' }} _hover={{ textDecoration: 'none' }}>
              <Button 
                onClick={() => track('Navigate_To_Skills', { from: '/max-hit-calculator' })}
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

      {/* Main Calculator Content Area - Conditionally rendered ONLY after mount */}
      <Container maxW="6xl" mt={0} mb={20}> {/* Removed top margin */}
        {hasMounted ? (
          <>
            <VStack spacing={8} align="stretch">
              {/* Import Stats Section */}
              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={{ base: 4, md: 6 }} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                <OsrsHeading fontSize="2xl" mb={4}>Import Your Stats</OsrsHeading>
                {/* PlayerLookup is now safe to render directly */}
                {showPlayerLookup ? <PlayerLookup /> : null}
              </Box>

              {/* Player Stats Section */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                  <OsrsHeading fontSize="xl" mb={4}>Player Stats</OsrsHeading>
                  <VStack spacing={3}>
                     {/* Stats Inputs - Using Input temporarily for simplicity during debug */}
                     <FormControl>
                      <FormLabel htmlFor="attackLvl">Attack Level</FormLabel>
                      <Input id="attackLvl" type="number" value={localPlayerStats.attack} onChange={(e) => setLocalPlayerStats({...localPlayerStats, attack: parseInt(e.target.value) || 1})} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="strengthLvl">Strength Level</FormLabel>
                      <Input id="strengthLvl" type="number" value={localPlayerStats.strength} onChange={(e) => setLocalPlayerStats({...localPlayerStats, strength: parseInt(e.target.value) || 1})} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="rangedLvl">Ranged Level</FormLabel>
                      <Input id="rangedLvl" type="number" value={localPlayerStats.ranged} onChange={(e) => setLocalPlayerStats({...localPlayerStats, ranged: parseInt(e.target.value) || 1})} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="magicLvl">Magic Level</FormLabel>
                      <Input id="magicLvl" type="number" value={localPlayerStats.magic} onChange={(e) => setLocalPlayerStats({...localPlayerStats, magic: parseInt(e.target.value) || 1})} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="prayerLvl">Prayer Level</FormLabel>
                      <Input id="prayerLvl" type="number" value={localPlayerStats.prayer} onChange={(e) => setLocalPlayerStats({...localPlayerStats, prayer: parseInt(e.target.value) || 1})} />
                    </FormControl>
                  </VStack>
                </Box>

                {/* Equipment Section */}
                <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                  <OsrsHeading fontSize="xl" mb={4}>Equipment</OsrsHeading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {/* Equipment Selectors */}
                    <FormControl>
                      <FormLabel htmlFor="head-select">Head</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="head-select" instanceId="head-select-instance"
                        placeholder="Select headgear..." options={headOptions}
                        value={headOptions.find(opt => opt.value === equipment.head)}
                        onChange={(selectedOption) => setEquipment({...equipment, head: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                    {/* ... other equipment slots ... */} 
                     <FormControl>
                      <FormLabel htmlFor="cape-select">Cape</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="cape-select" instanceId="cape-select-instance"
                        placeholder="Select cape..." options={capeOptions}
                        value={capeOptions.find(opt => opt.value === equipment.cape)}
                        onChange={(selectedOption) => setEquipment({...equipment, cape: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                     <FormControl>
                      <FormLabel htmlFor="neck-select">Neck</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="neck-select" instanceId="neck-select-instance"
                        placeholder="Select amulet..." options={neckOptions}
                        value={neckOptions.find(opt => opt.value === equipment.neck)}
                        onChange={(selectedOption) => setEquipment({...equipment, neck: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                     <FormControl>
                      <FormLabel htmlFor="ammo-select">Ammo</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="ammo-select" instanceId="ammo-select-instance"
                        placeholder="Select ammo..." options={ammoOptions}
                        value={ammoOptions.find(opt => opt.value === equipment.ammo)}
                        onChange={(selectedOption) => setEquipment({...equipment, ammo: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="weapon-select">Weapon</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="weapon-select" instanceId="weapon-select-instance"
                        placeholder="Select weapon..." options={weaponOptions}
                        value={weaponOptions.find(opt => opt.value === equipment.weapon)}
                        onChange={(selectedOption) => setEquipment({...equipment, weapon: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="body-select">Body</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="body-select" instanceId="body-select-instance"
                        placeholder="Select body armour..." options={bodyOptions}
                        value={bodyOptions.find(opt => opt.value === equipment.body)}
                        onChange={(selectedOption) => setEquipment({...equipment, body: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                     <FormControl>
                      <FormLabel htmlFor="shield-select">Shield</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="shield-select" instanceId="shield-select-instance"
                        placeholder="Select shield..." options={shieldOptions}
                        value={shieldOptions.find(opt => opt.value === equipment.shield)}
                        onChange={(selectedOption) => setEquipment({...equipment, shield: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                     <FormControl>
                      <FormLabel htmlFor="legs-select">Legs</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="legs-select" instanceId="legs-select-instance"
                        placeholder="Select leg armour..." options={legsOptions}
                        value={legsOptions.find(opt => opt.value === equipment.legs)}
                        onChange={(selectedOption) => setEquipment({...equipment, legs: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="hands-select">Hands</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="hands-select" instanceId="hands-select-instance"
                        placeholder="Select gloves/bracelet..." options={handOptions}
                        value={handOptions.find(opt => opt.value === equipment.hands)}
                        onChange={(selectedOption) => setEquipment({...equipment, hands: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                     <FormControl>
                      <FormLabel htmlFor="feet-select">Feet</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="feet-select" instanceId="feet-select-instance"
                        placeholder="Select boots..." options={feetOptions}
                        value={feetOptions.find(opt => opt.value === equipment.feet)}
                        onChange={(selectedOption) => setEquipment({...equipment, feet: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="ring-select">Ring</FormLabel>
                      <ReactSelect<EquipmentOptionType, false, GroupBase<EquipmentOptionType>>
                        inputId="ring-select" instanceId="ring-select-instance"
                        placeholder="Select ring..." options={ringOptions}
                        value={ringOptions.find(opt => opt.value === equipment.ring)}
                        onChange={(selectedOption) => setEquipment({...equipment, ring: selectedOption ? selectedOption.value : null })}
                        styles={customReactSelectStyles} isClearable isSearchable
                      />
                    </FormControl>
                  </SimpleGrid>
                  <Text fontSize="sm" color="gray.400" mt={4}>Equipment list is limited for now.</Text>
                </Box>
              </SimpleGrid>

              {/* Boosts and Prayers Section */}
              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                <OsrsHeading fontSize="xl" mb={4}>Boosts & Prayers</OsrsHeading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                   {/* Potion Select */}
                   <FormControl>
                    <FormLabel>Potion</FormLabel>
                    <ChakraSelect 
                      placeholder="Select potion" 
                      value={potion || ''}
                      onChange={(e) => setPotion(e.target.value || null)} 
                      bg="#1a140a" 
                      color="#e0d0b0" 
                      borderColor="#3b2914" 
                      _hover={{ borderColor: '#ffcb2f' }} 
                      _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }} 
                      css={{ 
                        option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, 
                        "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } 
                      }}
                    >
                      <option value="none">None</option>
                      <option value="strength_potion">Strength Potion</option>
                      <option value="super_strength">Super Strength</option>
                      <option value="combat_potion">Combat Potion</option>
                      <option value="super_combat">Super Combat</option>
                      <option value="zamorak_brew">Zamorak Brew</option>
                      <option value="ranging_potion">Ranging Potion</option>
                      <option value="super_ranging">Super Ranging Potion</option>
                      <option value="bastion_potion">Bastion Potion</option>
                      <option value="magic_potion">Magic Potion</option>
                      <option value="super_magic_potion">Super Magic Potion</option>
                      <option value="battlemage_potion">Battlemage Potion</option>
                      <option value="overload_plus">Overload (+)</option>
                    </ChakraSelect>
                  </FormControl>

                  {/* Slayer Task Checkbox */}
                   <FormControl display="flex" alignItems="center" pt={{ md: 8 }}>
                    <Checkbox 
                      id="slayer-task-checkbox"
                      isChecked={isOnSlayerTask} 
                      onChange={(e) => setIsOnSlayerTask(e.target.checked)} 
                      colorScheme="orange"
                      borderColor="gray.600"
                      size="lg"
                      mr={2}
                    />
                    <FormLabel htmlFor="slayer-task-checkbox" mb="0">
                      On Slayer Task? (for Slayer Helm bonus)
                    </FormLabel>
                  </FormControl>

                  {/* Prayer Checkboxes */} 
                  <FormControl gridColumn={{ md: "1 / -1" }}>
                    <FormLabel>Prayers</FormLabel>
                    <CheckboxGroup value={prayers} onChange={(values: string[]) => setPrayers(values)}>
                      <HStack spacing={4} wrap="wrap">
                         {/* Prayer Checkboxes */}
                         <Checkbox value="burst_of_strength">Burst of Strength (5%)</Checkbox>
                        <Checkbox value="superior_strength">Superior Strength (10%)</Checkbox>
                        <Checkbox value="ultimate_strength">Ultimate Strength (15%)</Checkbox>
                        <Checkbox value="chivalry">Chivalry (18%)</Checkbox>
                        <Checkbox value="piety">Piety (23%)</Checkbox>
                        <Checkbox value="sharp_eye">Sharp Eye (5%)</Checkbox>
                        <Checkbox value="hawk_eye">Hawk Eye (10%)</Checkbox>
                        <Checkbox value="eagle_eye">Eagle Eye (15%)</Checkbox>
                        <Checkbox value="rigour">Rigour (23% Ranged Str)</Checkbox>
                        <Checkbox value="mystic_will">Mystic Will (5%)</Checkbox>
                        <Checkbox value="mystic_lore">Mystic Lore (10%)</Checkbox>
                        <Checkbox value="mystic_might">Mystic Might (15%)</Checkbox>
                        <Checkbox value="augury">Augury (25% Magic Dmg)</Checkbox>
                      </HStack>
                    </CheckboxGroup>
                  </FormControl>
                </SimpleGrid>
              </Box> 

              {/* Combat Style & Spell Selection */}
              <Box bg="rgba(42, 30, 15, 0.85)" borderRadius="md" p={6} border="2px solid black" boxShadow="5px 5px 0 rgba(0,0,0,0.4)">
                 <OsrsHeading fontSize="xl" mb={4}>Combat Style & Spell</OsrsHeading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl>
                      <FormLabel>Combat Style (Melee/Ranged)</FormLabel>
                      <ChakraSelect 
                        placeholder="Select style" 
                        onChange={(e) => setCombatStyle(e.target.value)} 
                        bg="#1a140a" 
                        color="#e0d0b0" 
                        borderColor="#3b2914" 
                        _hover={{ borderColor: '#ffcb2f' }} 
                        _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }} 
                        css={{ 
                          option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, 
                          "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } 
                        }}
                      >
                        <option value="aggressive_melee">Aggressive (Melee)</option>
                        <option value="controlled_melee">Controlled (Melee)</option>
                        <option value="accurate_melee">Accurate (Melee)</option>
                        <option value="defensive_melee">Defensive (Melee)</option>
                        <option value="crush_melee">Crush (Melee - Placeholder)</option>
                        <option value="ranged_accurate">Accurate (Ranged)</option>
                        <option value="ranged_rapid">Rapid (Ranged)</option>
                        <option value="ranged_longrange">Longrange (Ranged)</option>
                      </ChakraSelect>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Magic Spell (if applicable)</FormLabel>
                      <ChakraSelect 
                        placeholder="Select spell" 
                        onChange={(e) => setSpell(e.target.value)} 
                        bg="#1a140a" 
                        color="#e0d0b0" 
                        borderColor="#3b2914" 
                        _hover={{ borderColor: '#ffcb2f' }} 
                        _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }} 
                        css={{ 
                          option: { backgroundColor: '#1a140a', color: '#e0d0b0' }, 
                          "option:hover": { backgroundColor: '#2c1f0e', color: '#ffcb2f' } 
                        }}
                      >
                        <option value="fire_strike">Fire Strike (8 base)</option>
                        <option value="fire_bolt">Fire Bolt (12 base)</option>
                        <option value="fire_blast">Fire Blast (16 base)</option>
                        <option value="fire_wave">Fire Wave (20 base)</option>
                        <option value="fire_surge">Fire Surge (24 base)</option>
                        <option value="ice_barrage">Ice Barrage (30 base)</option>
                      </ChakraSelect>
                    </FormControl>
                  </SimpleGrid>
              </Box> 

              {/* Action Button & Results Section */}
              <Box 
                bg="rgba(42, 30, 15, 0.85)" 
                borderRadius="md" 
                p={{ base: 4, md: 6 }} 
                border="2px solid black" 
                boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
              >
                <VStack spacing={4}>
                  <Button onClick={calculateMaxHits} size="lg" bg="#ffcb2f" color="#211305" _hover={{ bg: '#e0a922' }} border="2px solid black" boxShadow="2px 2px 0 rgba(0,0,0,0.5)" fontWeight="bold">
                    Calculate Max Hits
                  </Button>
                  {/* Results render only when mounted */}
                  {hasMounted ? (
                    <Box textAlign="center" w="100%">
                      <OsrsHeading fontSize="lg" mb={2}>Results</OsrsHeading>
                      <HStack spacing={6} justify="center" wrap="wrap">
                        <Box bg="rgba(0,0,0,0.3)" p={4} borderRadius="md" minW="150px">
                          <Text fontWeight="bold" color="#ffcb2f">Melee Max Hit:</Text>
                          <Text fontSize="2xl" fontWeight="bold">{meleeMaxHit}</Text>
                        </Box>
                        <Box bg="rgba(0,0,0,0.3)" p={4} borderRadius="md" minW="150px">
                          <Text fontWeight="bold" color="#ffcb2f">Ranged Max Hit:</Text>
                          <Text fontSize="2xl" fontWeight="bold">{rangedMaxHit}</Text>
                        </Box>
                        <Box bg="rgba(0,0,0,0.3)" p={4} borderRadius="md" minW="150px">
                          <Text fontWeight="bold" color="#ffcb2f">Magic Max Hit:</Text>
                          <Text fontSize="2xl" fontWeight="bold">{magicMaxHit}</Text>
                        </Box>
                      </HStack>
                    </Box>
                  ) : null}
                </VStack> 
              </Box>
            </VStack>
          </>
        ) : (
          // Render null initially when not mounted
          null 
        )}
      </Container>

      {/* Footer placed here, outside the hasMounted block */}
      <Footer /> 

    </Box>
  );
} 