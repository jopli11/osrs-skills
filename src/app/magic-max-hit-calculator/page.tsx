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
  calculateMagicMaxHit, // Magic specific
  // PRAYER_BONUSES, // Not directly used for magic max hit damage calculation in the same way
  // POTION_MAGIC_BONUS, 
} from '@/lib/formulas';
import { useCalculatorStore } from '@/lib/store';
import { track } from '@vercel/analytics';
import { StylesConfig, GroupBase } from 'react-select';
import { SkillName } from '@/lib/types';

// Define MOCK_SPELL_MAX_HITS locally as it's not exported from formulas.ts
const MOCK_SPELL_MAX_HITS: Record<string, number> = {
  fire_strike: 8,
  fire_bolt: 12,
  fire_blast: 16,
  fire_wave: 20,
  fire_surge: 24,
  ice_barrage: 30, // Example popular spell
  // Add other spells as needed
};

// --- Type definitions (Shared, consider moving) ---
interface NumericPlayerStats {
  attack: number; strength: number; ranged: number; magic: number; prayer: number;
}
interface EquipmentState {
  head: string | null; cape: string | null; neck: string | null; ammo: string | null; weapon: string | null;
  body: string | null; shield: string | null; legs: string | null; hands: string | null; feet: string | null; ring: string | null;
}
interface EquipmentOptionType {
  value: string; label: string; slot: EquipmentItem['slot'];
}

// --- customReactSelectStyles (Shared, consider moving) ---
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

// --- Data for dropdowns - specific to Magic ---
const availableMagicPrayers = [
  { value: "mystic_will", label: "Mystic Will (5% Magic Atk)", type: 'magic' as const }, // Accuracy, not direct damage
  { value: "mystic_lore", label: "Mystic Lore (10% Magic Atk)", type: 'magic' as const }, // Accuracy
  { value: "mystic_might", label: "Mystic Might (15% Magic Atk)", type: 'magic' as const }, // Accuracy
  { value: "augury", label: "Augury (25% Magic Atk & Def)", type: 'magic' as const }, // Accuracy & Defence. For max hit, it indirectly helps by allowing better gear.
  // Note: Magic max hit is often more about gear % damage and spell base than prayer % like melee/range.
];

const availableMagicPotions = [
  { value: "none", label: "None" },
  { value: "magic_potion", label: "Magic Potion (+4 Magic Lvl)" },
  { value: "super_magic_potion", label: "Super Magic Potion (+X Magic Lvl, varies)" }, // Placeholder, actual boost depends
  { value: "battlemage_potion", label: "Battlemage Potion" },
  { value: "overload_plus", label: "Overload (+)" }, // Boosts all combat stats
  // { value: "imbued_heart", label: "Imbued Heart (Magic Lvl Boost)" }, // Could be modeled as a potion effect
];

// Combat styles for magic are less about stances and more about spell choice/weapon effects.
// The common component's "Combat Style" might be repurposed or hidden for magic.
// For now, providing a generic option.
const availableMagicCombatStyles = [
  { value: "standard_spellbook", label: "Standard Spellbook" },
  { value: "ancient_magicks", label: "Ancient Magicks" },
  // Add other spellbooks if relevant for different spell sets
];

const availableSpells = Object.keys(MOCK_SPELL_MAX_HITS).map(spellKey => ({
  value: spellKey,
  label: `${spellKey.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} (Base: ${MOCK_SPELL_MAX_HITS[spellKey]})`,
}));

export default function MagicMaxHitCalculatorPage() {
  const toast = useToast();
  const [hasMounted, setHasMounted] = useState(false);
  const [showPlayerLookup, setShowPlayerLookup] = useState(false);

  const [localPlayerStats, setLocalPlayerStats] = useState<NumericPlayerStats>({
    attack: 1, strength: 1, ranged: 1, magic: 1, prayer: 1,
  });

  const storePlayerStats = useCalculatorStore((state) => state.playerStats);
  const setStoreNotification = useCalculatorStore((state) => state.setNotification);

  useEffect(() => { setHasMounted(true); setShowPlayerLookup(true); }, []);

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

  const [prayers, setPrayers] = useState<string[]>([]); // Magic prayers often boost accuracy, not direct max hit like melee/range
  const [potion, setPotion] = useState<string | null>(null); // Magic level boost from potion is handled by formula if it takes magicLevel
  const [combatStyle, setCombatStyle] = useState<string | null>("standard_spellbook"); // Or null if not directly used by formula
  const [spell, setSpell] = useState<string | null>(null);
  const [isOnSlayerTask, setIsOnSlayerTask] = useState(false);
  const [isAttackingDemon, setIsAttackingDemon] = useState(false);
  const [magicMaxHit, setMagicMaxHit] = useState(0);

  const equipmentOptions = useMemo((): EquipmentOptionType[] =>
    Object.keys(EQUIPMENT_DATA).map(key => ({ value: key, label: key, slot: EQUIPMENT_DATA[key].slot })),
  []);

  const calculateActualMagicMaxHit = () => {
    const baseSpellDamage = spell ? MOCK_SPELL_MAX_HITS[spell] || 0 : 0;
    
    // Magic prayer bonuses typically affect accuracy. Direct damage boost from prayers like Augury is complex or non-existent for *base* max hit.
    // The calculateMagicMaxHit formula primarily relies on equipment % damage and spell base.
    // Effective magic level (boosted by potion) would be handled inside calculateMagicMaxHit if it takes magicLevel and potion effects.

    const magicParams = {
      // magicLevel: localPlayerStats.magic, // Pass if formula needs it for potion boosts etc.
      spellBaseMaxHit: baseSpellDamage,
      equipment: equipment,
      isOnSlayerTask: isOnSlayerTask,
      isAttackingDemon,
      // prayers: prayers, // Pass if formula considers Augury etc. for specific gear interactions
      // potion: potion, // Pass if formula handles specific potion effects beyond level boost
    };

    const newMagicMax = calculateMagicMaxHit(magicParams);
    setMagicMaxHit(newMagicMax);

    track('MagicMaxHitCalc_Calculated', {
      stat_magic: localPlayerStats.magic,
      stat_prayer: localPlayerStats.prayer,
      eq_weapon: equipment.weapon || 'none',
      spell_selected: spell || 'none',
      prayersUsedCount: prayers.length, // Augury might be relevant for some setups
      potion: potion || 'none',
      isOnSlayerTask,
      isAttackingDemon,
      result: newMagicMax,
    });
    setStoreNotification({ message: `Magic Max Hit: ${newMagicMax}`, type: 'success', timestamp: Date.now() });
  };

  const commonProps: MaxHitCalculatorCommonProps = {
    pageTitle: "Magic Max Hit Calculator",
    heroIconSkill: "magic" as SkillName,
    calculatorType: "Magic",
    localPlayerStats,
    setLocalPlayerStats,
    equipment,
    setEquipment,
    equipmentOptions,
    customReactSelectStyles,
    prayers,
    setPrayers,
    availablePrayers: availableMagicPrayers, // Filtered or specific magic prayers
    potion,
    setPotion,
    availablePotions: availableMagicPotions,
    combatStyle, // May be less relevant or repurposed for magic
    setCombatStyle,
    availableCombatStyles: availableMagicCombatStyles,
    spell, // Magic specific
    setSpell, // Magic specific
    availableSpells, // Magic specific
    isOnSlayerTask,
    setIsOnSlayerTask,
    isAttackingDemon,
    setIsAttackingDemon,
    calculateSpecificMaxHit: calculateActualMagicMaxHit,
    maxHitResult: magicMaxHit,
    showPlayerLookup,
    hasMounted,
  };

  return (
    <Box>
      <MaxHitCalculatorCommon {...commonProps} />
    </Box>
  );
} 