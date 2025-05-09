'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  useToast,
  // Necessary Chakra UI components for this page if any, else managed by Common
} from '@chakra-ui/react';
import MaxHitCalculatorCommon, { MaxHitCalculatorCommonProps } from '@/components/MaxHitCalculatorCommon/MaxHitCalculatorCommon';
import {
  EQUIPMENT_DATA,
  EquipmentItem,
} from '@/data/equipmentData';
import {
  calculateMeleeMaxHit,
  PRAYER_BONUSES,
  POTION_STRENGTH_BONUS,
} from '@/lib/formulas';
import { useCalculatorStore } from '@/lib/store';
import { track } from '@vercel/analytics';
import { StylesConfig, GroupBase } from 'react-select';
import { SkillName } from '@/lib/types'; // For heroIconSkill prop

// Type definitions (can be co-located or imported if used across multiple new pages)
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

// Copied from original max-hit-calculator/page.tsx - consider moving to a shared constants file
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

// Data for dropdowns - specific to Melee
const availableMeleePrayers = [
  { value: "burst_of_strength", label: "Burst of Strength (5%)", type: 'melee' as const },
  { value: "superior_strength", label: "Superior Strength (10%)", type: 'melee' as const },
  { value: "ultimate_strength", label: "Ultimate Strength (15%)", type: 'melee' as const },
  { value: "chivalry", label: "Chivalry (18% Str, 15% Atk)", type: 'melee' as const }, // Note: Chivalry also boosts attack
  { value: "piety", label: "Piety (23% Str, 20% Atk, 25% Def)", type: 'melee' as const }, // Note: Piety also boosts attack & defence
];

const availableMeleePotions = [
  { value: "none", label: "None" },
  { value: "strength_potion", label: "Strength Potion" },
  { value: "super_strength", label: "Super Strength Potion" },
  { value: "combat_potion", label: "Combat Potion" }, // Also boosts attack
  { value: "super_combat", label: "Super Combat Potion" }, // Also boosts attack & defence
  { value: "zamorak_brew", label: "Zamorak Brew" }, // Complex effects, including strength
  { value: "overload_plus", label: "Overload (+)" },
];

const availableMeleeCombatStyles = [
  { value: "accurate_melee", label: "Accurate (Melee - +3 Atk)" },
  { value: "aggressive_melee", label: "Aggressive (Melee - +3 Str)" },
  { value: "controlled_melee", label: "Controlled (Melee - +1 Atk/Str/Def)" },
  { value: "defensive_melee", label: "Defensive (Melee - +3 Def)" },
];

export default function MeleeMaxHitCalculatorPage() {
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
        attack: storePlayerStats.stats.attack?.level || localPlayerStats.attack,
        strength: storePlayerStats.stats.strength?.level || localPlayerStats.strength,
        ranged: storePlayerStats.stats.ranged?.level || localPlayerStats.ranged,
        magic: storePlayerStats.stats.magic?.level || localPlayerStats.magic,
        prayer: storePlayerStats.stats.prayer?.level || localPlayerStats.prayer,
      };
      if (JSON.stringify(newStats) !== JSON.stringify(localPlayerStats)) {
        setLocalPlayerStats(newStats);
        if (storePlayerStats.username) {
          toast({
            title: "Stats Synced",
            description: `${storePlayerStats.username}'s stats have been applied.`,
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePlayerStats, toast]); 

  const [equipment, setEquipment] = useState<EquipmentState>({
    head: null, cape: null, neck: null, ammo: null, weapon: null, 
    body: null, shield: null, legs: null, hands: null, feet: null, ring: null,
  });

  const [prayers, setPrayers] = useState<string[]>([]);
  const [potion, setPotion] = useState<string | null>(null);
  const [combatStyle, setCombatStyle] = useState<string | null>("aggressive_melee"); // Default to aggressive
  const [isOnSlayerTask, setIsOnSlayerTask] = useState(false);
  const [meleeMaxHit, setMeleeMaxHit] = useState(0);

  const equipmentOptions = useMemo((): EquipmentOptionType[] =>
    Object.keys(EQUIPMENT_DATA).map(key => ({
      value: key,
      label: key,
      slot: EQUIPMENT_DATA[key].slot,
    })),
  []);

  const calculateActualMeleeMaxHit = () => {
    const selectedPrayerBonus = prayers.reduce((acc, prayerName) => {
        const prayerDetails = PRAYER_BONUSES.melee_strength[prayerName as keyof typeof PRAYER_BONUSES.melee_strength];
        return prayerDetails ? Math.max(acc, prayerDetails) : acc;
    }, 1); // Start with 1 (no bonus)

    let potionStrengthBonus = 0;
    const potionFunc = POTION_STRENGTH_BONUS[potion as keyof typeof POTION_STRENGTH_BONUS];
    if (potionFunc) {
      potionStrengthBonus = potionFunc(localPlayerStats.strength);
    }
    
    let styleBonus = 0;
    if (combatStyle === 'aggressive_melee') styleBonus = 3;
    else if (combatStyle === 'controlled_melee') styleBonus = 1;

    const meleeParams = {
      strengthLevel: localPlayerStats.strength,
      potionBonus: potionStrengthBonus,
      prayerBonus: selectedPrayerBonus, 
      styleBonus: styleBonus, 
      equipment: equipment, 
      combatStyle: combatStyle, 
      isOnSlayerTask: isOnSlayerTask,
    };

    const newMeleeMax = calculateMeleeMaxHit(meleeParams);
    setMeleeMaxHit(newMeleeMax);

    track('MeleeMaxHitCalc_Calculated', {
      // Flatten stats for analytics
      stat_attack: localPlayerStats.attack,
      stat_strength: localPlayerStats.strength,
      stat_prayer: localPlayerStats.prayer,
      // equipmentSlotsUsed: Object.values(equipment).filter(Boolean).length, // Example of another way to send complex data
      // For simplicity, sending a few key equipment pieces if they exist
      eq_weapon: equipment.weapon || 'none',
      eq_shield: equipment.shield || 'none',
      eq_ammo: equipment.ammo || 'none',
      prayersUsedCount: prayers.length,
      potion: potion || 'none',
      combatStyle: combatStyle || 'none',
      isOnSlayerTask,
      result: newMeleeMax,
    });
    setStoreNotification({
      message: `Melee Max Hit: ${newMeleeMax}`,
      type: 'success',
      timestamp: Date.now(),
    });
  };

  const commonProps: MaxHitCalculatorCommonProps = {
    pageTitle: "Melee Max Hit Calculator",
    heroIconSkill: "attack" as SkillName, 
    calculatorType: "Melee",
    localPlayerStats,
    setLocalPlayerStats,
    equipment,
    setEquipment,
    equipmentOptions,
    customReactSelectStyles,
    prayers,
    setPrayers,
    availablePrayers: availableMeleePrayers,
    potion,
    setPotion,
    availablePotions: availableMeleePotions,
    combatStyle,
    setCombatStyle,
    availableCombatStyles: availableMeleeCombatStyles,
    isOnSlayerTask,
    setIsOnSlayerTask,
    calculateSpecificMaxHit: calculateActualMeleeMaxHit,
    maxHitResult: meleeMaxHit,
    showPlayerLookup,
    hasMounted,
  };

  return (
    <Box>
      <MaxHitCalculatorCommon {...commonProps} />
    </Box>
  );
} 