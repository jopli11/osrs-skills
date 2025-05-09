'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  useToast,
} from '@chakra-ui/react';
import MaxHitCalculatorCommon, { MaxHitCalculatorCommonProps } from '@/components/MaxHitCalculatorCommon/MaxHitCalculatorCommon';
import {
  EQUIPMENT_DATA,
  EquipmentItem,
} from '@/data/equipmentData';
import {
  calculateRangedMaxHit, // Ranged specific
  PRAYER_BONUSES,      // Contains ranged prayers
  POTION_RANGED_BONUS, // Ranged specific
} from '@/lib/formulas';
import { useCalculatorStore } from '@/lib/store';
import { track } from '@vercel/analytics';
import { StylesConfig, GroupBase } from 'react-select';
import { SkillName } from '@/lib/types';

// --- Type definitions (Shared with Melee, consider moving to a common types file if not already) ---
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

// --- customReactSelectStyles (Copied from melee, consider sharing) ---
const customReactSelectStyles: StylesConfig<EquipmentOptionType, false, GroupBase<EquipmentOptionType>> = {
  control: (base, state) => ({ ...base, backgroundColor: '#1a140a', borderColor: state.isFocused ? '#ffcb2f' : '#3b2914', boxShadow: state.isFocused ? '0 0 0 1px #ffcb2f' : base.boxShadow, minHeight: '40px', color: '#e0d0b0', '&:hover': { borderColor: '#ffcb2f' } }),
  menu: (base) => ({ ...base, backgroundColor: '#1a140a', border: '1px solid #3b2914', zIndex: 20 }),
  option: (base, state) => ({ ...base, backgroundColor: state.isSelected ? '#ffcb2f' : state.isFocused ? '#2c1f0e' : '#1a140a', color: state.isSelected ? '#211305' : '#e0d0b0', '&:hover': { backgroundColor: state.isSelected ? '#e0a922' : '#2c1f0e', color: state.isSelected ? '#211305' : '#ffcb2f' } }),
  singleValue: (base) => ({ ...base, color: '#e0d0b0' }),
  placeholder: (base) => ({ ...base, color: '#7a7060' }),
  input: (base) => ({ ...base, color: '#e0d0b0' }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: '#3b2914' }),
  dropdownIndicator: (base, state) => ({ ...base, color: state.isFocused ? '#ffcb2f' : '#7a7060', '&:hover': { color: '#ffcb2f' } }),
};

// --- Data for dropdowns - specific to Ranged ---
const availableRangedPrayers = [
  { value: "sharp_eye", label: "Sharp Eye (5%)", type: 'ranged' as const },
  { value: "hawk_eye", label: "Hawk Eye (10%)", type: 'ranged' as const },
  { value: "eagle_eye", label: "Eagle Eye (15%)", type: 'ranged' as const },
  { value: "rigour", label: "Rigour (23% Ranged Str, 20% Ranged Atk, 25% Def)", type: 'ranged' as const },
];

const availableRangedPotions = [
  { value: "none", label: "None" },
  { value: "ranging_potion", label: "Ranging Potion" },
  { value: "super_ranging", label: "Super Ranging Potion" },
  { value: "bastion_potion", label: "Bastion Potion" }, // Also boosts defence
  { value: "overload_plus", label: "Overload (+)" }, // Boosts all combat stats
];

const availableRangedCombatStyles = [
  { value: "ranged_accurate", label: "Accurate (Ranged - +3 Ranged Atk)" },
  { value: "ranged_rapid", label: "Rapid (Ranged - Faster Attacks)" }, // No direct max hit bonus, but common
  { value: "ranged_longrange", label: "Longrange (Ranged - +1 Ranged Atk, +3 Def Lvl)" },
];

export default function RangedMaxHitCalculatorPage() {
  const toast = useToast();
  const [hasMounted, setHasMounted] = useState(false);
  const [showPlayerLookup, setShowPlayerLookup] = useState(false);

  const [localPlayerStats, setLocalPlayerStats] = useState<NumericPlayerStats>({
    attack: 1, strength: 1, ranged: 1, magic: 1, prayer: 1,
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
          toast({ title: "Stats Synced", description: `${storePlayerStats.username}'s stats applied.`, status: "info", duration: 3000, isClosable: true });
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
  const [combatStyle, setCombatStyle] = useState<string | null>("ranged_accurate"); // Default to accurate
  const [isOnSlayerTask, setIsOnSlayerTask] = useState(false);
  const [rangedMaxHit, setRangedMaxHit] = useState(0);

  const equipmentOptions = useMemo((): EquipmentOptionType[] =>
    Object.keys(EQUIPMENT_DATA).map(key => ({ value: key, label: key, slot: EQUIPMENT_DATA[key].slot })),
  []);

  const calculateActualRangedMaxHit = () => {
    const selectedPrayerBonus = prayers.reduce((acc, prayerName) => {
        const prayerDetails = PRAYER_BONUSES.ranged_strength[prayerName as keyof typeof PRAYER_BONUSES.ranged_strength];
        return prayerDetails ? Math.max(acc, prayerDetails) : acc;
    }, 1);

    let potionRangedBonus = 0;
    const potionFunc = POTION_RANGED_BONUS[potion as keyof typeof POTION_RANGED_BONUS];
    if (potionFunc) {
      potionRangedBonus = potionFunc(localPlayerStats.ranged);
    }

    let styleBonus = 0;
    // Ranged formula typically uses ranged attack style bonus directly if it affects strength (e.g. +3 from accurate)
    // Assuming the `calculateRangedMaxHit` formula handles style bonus based on equipment and the passed `combatStyle` string.
    // For Ranged, style bonus is +3 for Accurate, +0 for Rapid, +1 for Longrange (Defence XP)
    // The current formula `calculateRangedMaxHit` in `formulas.ts` expects `styleBonus` for levels, not a multiplier.
    if (combatStyle === 'ranged_accurate') styleBonus = 3;
    // Rapid gives no direct strength bonus to max hit calculation, it affects speed.
    // Longrange gives +1 level bonus for defence xp, also no direct max hit strength bonus.
    
    const rangedParams = {
      rangedLevel: localPlayerStats.ranged,
      potionBonus: potionRangedBonus,
      prayerBonus: selectedPrayerBonus,
      styleBonus: styleBonus, // This is effective ranged level bonus from style
      equipment: equipment,
      isOnSlayerTask: isOnSlayerTask,
      // combatStyle: combatStyle, // Pass if formula needs it for specific weapon interactions
    };

    const newRangedMax = calculateRangedMaxHit(rangedParams);
    setRangedMaxHit(newRangedMax);

    track('RangedMaxHitCalc_Calculated', {
      stat_ranged: localPlayerStats.ranged,
      stat_prayer: localPlayerStats.prayer,
      eq_weapon: equipment.weapon || 'none',
      eq_ammo: equipment.ammo || 'none',
      prayersUsedCount: prayers.length,
      potion: potion || 'none',
      combatStyle: combatStyle || 'none',
      isOnSlayerTask,
      result: newRangedMax,
    });
    setStoreNotification({ message: `Ranged Max Hit: ${newRangedMax}`, type: 'success', timestamp: Date.now() });
  };

  const commonProps: MaxHitCalculatorCommonProps = {
    pageTitle: "Ranged Max Hit Calculator",
    heroIconSkill: "ranged" as SkillName,
    calculatorType: "Ranged",
    localPlayerStats,
    setLocalPlayerStats,
    equipment,
    setEquipment,
    equipmentOptions,
    customReactSelectStyles,
    prayers,
    setPrayers,
    availablePrayers: availableRangedPrayers,
    potion,
    setPotion,
    availablePotions: availableRangedPotions,
    combatStyle,
    setCombatStyle,
    availableCombatStyles: availableRangedCombatStyles,
    isOnSlayerTask,
    setIsOnSlayerTask,
    calculateSpecificMaxHit: calculateActualRangedMaxHit,
    maxHitResult: rangedMaxHit,
    showPlayerLookup,
    hasMounted,
  };

  return (
    <Box>
      <MaxHitCalculatorCommon {...commonProps} />
    </Box>
  );
} 