import { EQUIPMENT_DATA, EquipmentItem } from '@/data/equipmentData';

// Type definition for the equipment state passed from the component
type EquipmentLoadout = Record<EquipmentItem['slot'], string | null>;

// OSRS Max Hit Calculation Formulas

// --- MELEE MAX HIT ---

interface MeleeMaxHitParams {
  strengthLevel: number;
  potionBonus: number; 
  prayerBonus: number; 
  styleBonus: number; 
// voidBonus: number; // Void bonus will be calculated internally based on gear
// equipmentStrengthBonus: number; // This will be calculated internally
  equipment: EquipmentLoadout;
  combatStyle: string | null; // Need combat style to check for Crush (Inquisitor)
  isOnSlayerTask: boolean; // Explicit flag, easier than inferring from helm
  // specialAttackBonus?: number; // Keep for future special attack implementation
  // dharokBonus?: number; // Keep for future Dharok's implementation
  salveBonus?: number; // Salve bonus will be calculated internally based on gear
}

export function calculateMeleeMaxHit(params: MeleeMaxHitParams): number {
  const { 
    strengthLevel, 
    potionBonus, 
    prayerBonus, 
    styleBonus, 
    equipment,
    combatStyle,
    isOnSlayerTask,
    // specialAttackBonus = 1, 
    // salveBonus = 1 // Calculated below
  } = params;

  // --- Calculate Equipment Bonuses & Set Effects ---
  let equipmentStrengthBonus = 0;
  let voidBonus = 1;
  let slayerBonusMultiplier = 1; 
  let salveMultiplier = 1; 
  let obsidianSetBonus = 1;
  let inquisitorMultiplier = 1;

  // 1. Sum base equipment strength
  Object.values(equipment).forEach(itemName => {
    if (itemName && EQUIPMENT_DATA[itemName]) {
      equipmentStrengthBonus += EQUIPMENT_DATA[itemName].str || 0;
    }
  });
  
  // 2. Check for Salve amulet (ei)
  if (equipment.neck === 'Salve amulet (ei)') {
    salveMultiplier = 1.2;
  }

  // 3. Check for Slayer helm (i) bonus (overrides Salve)
  // Assuming isOnSlayerTask prop correctly reflects helm usage
  if (isOnSlayerTask && equipment.head === 'Slayer helmet (i)') {
     slayerBonusMultiplier = 1.166666; // ~7/6
     salveMultiplier = 1; // Slayer helm bonus overrides Salve
  }

  // 4. Check for Void Knight Melee set
  const hasVoidMeleeHelm = equipment.head === 'Void melee helm';
  const hasVoidTop = equipment.body === 'Elite void top' || equipment.body === 'Void knight top'; // Allow regular top too? Wiki implies set bonus is same?
  const hasVoidRobe = equipment.legs === 'Elite void robe' || equipment.legs === 'Void knight robe';
  const hasVoidGloves = equipment.hands === 'Void knight gloves';
  if (hasVoidMeleeHelm && hasVoidTop && hasVoidRobe && hasVoidGloves) {
    voidBonus = 1.1;
  }

  // 5. Check for Obsidian set effect (requires full armour + obsidian weapon)
  const hasObsidianHelm = equipment.head === 'Obsidian helmet';
  const hasObsidianBody = equipment.body === 'Obsidian platebody';
  const hasObsidianLegs = equipment.legs === 'Obsidian platelegs';
  const obsidianWeaponName = equipment.weapon;
  const hasObsidianWeapon = obsidianWeaponName ? (EQUIPMENT_DATA[obsidianWeaponName]?.isObsidianWeapon || false) : false;
  if (hasObsidianHelm && hasObsidianBody && hasObsidianLegs && hasObsidianWeapon) {
    obsidianSetBonus = 1.1; // Applies to Attack and Strength
  }

  // 6. Check for Inquisitor's set bonus (only applies to Crush style)
  let inquisitorPieces = 0;
  if (equipment.head === 'Inquisitor\'s great helm') inquisitorPieces++;
  if (equipment.body === 'Inquisitor\'s hauberk') inquisitorPieces++;
  if (equipment.legs === 'Inquisitor\'s plateskirt') inquisitorPieces++;
  if (inquisitorPieces > 0 && combatStyle?.startsWith('crush')) { // Check if style is Crush
     // Wiki: Each piece grants 0.5% damage and 1% accuracy. Total 2.5% dmg for full set.
     // Assuming the bonus applies multiplicatively at the end?
     // OSRS Wiki str calc: Effective Strength = floor(floor(floor(Strength Level + Potion Bonus) * Prayer Bonus) * Other Bonus + Style Bonus)
     // Max Hit = floor(floor(Base Damage * Special Bonus) * Other Multipliers)
     // Let's apply it to the final multiplier for simplicity, though accuracy needs separate handling.
     inquisitorMultiplier = 1 + (inquisitorPieces * 0.005);
  }
  // --- Calculations ---

  // Step 1: Calculate Effective Strength 
  // Using formula structure similar to wiki strength calc page
  // Apply Obsidian set bonus here as it boosts Strength
  let effectiveStrength = Math.floor(strengthLevel + potionBonus);
  effectiveStrength = Math.floor(effectiveStrength * prayerBonus);
  // Apply other percentage strength bonuses like Obsidian here? Wiki order varies.
  // Let's apply Obsidian *after* prayer, before style/void for now based on formula structure.
  effectiveStrength = Math.floor(effectiveStrength * obsidianSetBonus);
  effectiveStrength = effectiveStrength + styleBonus + 8;
  effectiveStrength = Math.floor(effectiveStrength * voidBonus);

  // Step 2: Calculate Base Damage
  const baseDamage = 0.5 + (effectiveStrength * (equipmentStrengthBonus + 64)) / 640;
  
  // Step 3: Apply multipliers (Slayer, Salve, Inquisitor) & Floor
  // Using wiki formula: Max Hit = floor(floor(Base Damage * Special Bonus) * Other Multipliers)
  // Slayer/Salve are typically applied before special, others after? It's complex.
  // Let's group multipliers: Apply Slayer/Salve first, then Inquisitor at the end.
  
  let maxHit = baseDamage * slayerBonusMultiplier * salveMultiplier;
  maxHit = Math.floor(maxHit);
  // Apply Special Attack bonus here if implemented later
  // maxHit = Math.floor(maxHit * specialAttackBonus);
  maxHit = Math.floor(maxHit * inquisitorMultiplier);
  

  return maxHit > 0 ? maxHit : 0; // Ensure max hit isn't negative
}

// --- RANGED MAX HIT ---
interface RangedMaxHitParams {
  rangedLevel: number;
  potionBonus: number; 
  prayerBonus: number; // Ranged Strength part of prayer (e.g., Rigour 1.23)
  styleBonus: number; // Accurate: 3, Rapid: 0, Longrange: 1 
  equipment: EquipmentLoadout;
  isOnSlayerTask: boolean;
  // specialAttackMultiplier?: number;
  // salveBonus?: number; 
}

export function calculateRangedMaxHit(params: RangedMaxHitParams): number {
  const {
    rangedLevel,
    potionBonus,
    prayerBonus,
    styleBonus,
    equipment,
    isOnSlayerTask,
    // specialAttackMultiplier = 1,
  } = params;

  // --- Calculate Equipment Bonuses & Set Effects ---
  let equipmentRangedStrength = 0;
  let voidBonus = 1; 
  let slayerBonusMultiplier = 1;
  let salveMultiplier = 1;

  // 1. Sum base equipment ranged strength
  Object.values(equipment).forEach(itemName => {
    if (itemName && EQUIPMENT_DATA[itemName]) {
      equipmentRangedStrength += EQUIPMENT_DATA[itemName].ranged_str || 0;
    }
  });

  // 2. Check for Salve amulet (ei)
  if (equipment.neck === 'Salve amulet (ei)') {
    salveMultiplier = 1.2;
  }

  // 3. Check for Slayer helm (i) bonus (overrides Salve)
  if (isOnSlayerTask && equipment.head === 'Slayer helmet (i)') {
     slayerBonusMultiplier = 1.15;
     salveMultiplier = 1; // Slayer helm bonus overrides Salve
  }

  // 4. Check for Elite Void Knight Ranged set
  const hasVoidRangedHelm = equipment.head === 'Void ranger helm';
  const hasEliteVoidTop = equipment.body === 'Elite void top'; 
  const hasEliteVoidRobe = equipment.legs === 'Elite void robe';
  const hasVoidGloves = equipment.hands === 'Void knight gloves';
  if (hasVoidRangedHelm && hasEliteVoidTop && hasEliteVoidRobe && hasVoidGloves) {
    voidBonus = 1.125; // Elite void ranged bonus
  }

  // --- Calculations ---

  // Step 1: Calculate Effective Ranged Strength
  // Formula: floor((floor(Ranged Level + Potion Bonus) * Prayer Bonus) + Style Bonus + 8)
  // Void is applied later in the damage formula according to wiki pages
  let effectiveRangedStrength = Math.floor(rangedLevel + potionBonus);
  effectiveRangedStrength = Math.floor(effectiveRangedStrength * prayerBonus);
  effectiveRangedStrength = effectiveRangedStrength + styleBonus + 8;
  
  // Step 2: Calculate Base Damage
  let baseDamageCalc = 0.5 + (effectiveRangedStrength * (equipmentRangedStrength + 64)) / 640;
  baseDamageCalc = Math.floor(baseDamageCalc * voidBonus); // Apply void bonus here

  // Step 3: Apply final multipliers & Floor
  const maxHitCalc = baseDamageCalc * slayerBonusMultiplier * salveMultiplier;
  // Apply Special Attack bonus here if implemented later
  // maxHit = maxHit * specialAttackMultiplier;

  return Math.floor(maxHitCalc) > 0 ? Math.floor(maxHitCalc) : 0;
}


// --- MAGIC MAX HIT ---
interface MagicMaxHitParams {
  spellBaseMaxHit: number;
  equipment: EquipmentLoadout;
  isOnSlayerTask: boolean;
  // Add magic level if needed for staff calculations
}

export function calculateMagicMaxHit(params: MagicMaxHitParams): number {
  const { 
    spellBaseMaxHit, 
    equipment,
    isOnSlayerTask
  } = params;

  if (!spellBaseMaxHit) return 0; // Can't calculate without a base hit

  // --- Calculate Equipment Bonuses & Set Effects ---
  let magicDamageBonus = 0;
  let slayerBonusMultiplier = 1;
  let salveMultiplier = 1;
  let voidMagicMultiplier = 1;

  // 1. Sum base equipment magic damage %
  Object.values(equipment).forEach(itemName => {
    if (itemName && EQUIPMENT_DATA[itemName]) {
      magicDamageBonus += EQUIPMENT_DATA[itemName].magic_dmg || 0;
    }
  });

  // 2. Check for Salve amulet (ei)
  if (equipment.neck === 'Salve amulet (ei)') {
    salveMultiplier = 1.2;
  }

  // 3. Check for Slayer helm (i) bonus (overrides Salve)
  if (isOnSlayerTask && equipment.head === 'Slayer helmet (i)') {
     slayerBonusMultiplier = 1.15;
     salveMultiplier = 1; // Slayer helm bonus overrides Salve
  }

  // 4. Check for Elite Void Knight Magic set
  const hasVoidMageHelm = equipment.head === 'Void mage helm';
  const hasEliteVoidTop = equipment.body === 'Elite void top'; 
  const hasEliteVoidRobe = equipment.legs === 'Elite void robe';
  const hasVoidGloves = equipment.hands === 'Void knight gloves';
  if (hasVoidMageHelm && hasEliteVoidTop && hasEliteVoidRobe && hasVoidGloves) {
    voidMagicMultiplier = 1.025; // Elite void magic damage bonus (Accuracy is separate)
  }
  
  // --- Calculations ---
  
  // Magic Max Hit = floor( floor(Spell Base Hit * (1 + Gear % Bonus)) * Void Bonus * Slayer Bonus * Salve Bonus )
  // Order based on wiki examples (gear % first, then multipliers)
  let magicMaxHitCalc = Math.floor(spellBaseMaxHit * (1 + magicDamageBonus));
  magicMaxHitCalc = Math.floor(magicMaxHitCalc * voidMagicMultiplier * slayerBonusMultiplier * salveMultiplier);
  

  // TODO: Handle specific staves like Trident, Sang, Shadow, Tome of Fire/Water, Chaos Gauntlets etc.
  return magicMaxHitCalc > 0 ? magicMaxHitCalc : 0;
}

// Example of how you might structure prayer bonuses
export const PRAYER_BONUSES = {
  melee_strength: {
    none: 1,
    burst_of_strength: 1.05,
    superhuman_strength: 1.10,
    ultimate_strength: 1.15,
    chivalry: 1.18, // Also affects attack
    piety: 1.23,    // Also affects attack & defence
  },
  ranged_strength: {
    none: 1,
    sharp_eye: 1.05, // Also affects ranged attack
    hawk_eye: 1.10,  // Also affects ranged attack
    eagle_eye: 1.15, // Also affects ranged attack
    rigour: 1.23,    // Also affects ranged attack & defence
  },
  magic_damage: {
    none: 1,
    mystic_will: 1.05, // Also affects magic attack
    mystic_lore: 1.10, // Also affects magic attack
    mystic_might: 1.15,// Also affects magic attack
    augury: 1.25,       // Also affects magic attack & defence
  }
};

// Example potion bonuses (simplified, actual can be more complex, e.g. % of level)
export const POTION_STRENGTH_BONUS = {
  none: () => 0, // Parameter removed as unused
  strength_potion: (lvl: number) => 3 + Math.floor(0.10 * lvl),
  super_strength: (lvl: number) => 5 + Math.floor(0.15 * lvl),
  combat_potion: (lvl: number) => 3 + Math.floor(0.10 * lvl),
  super_combat: (lvl: number) => 5 + Math.floor(0.15 * lvl),
  zamorak_brew: (lvl: number) => 2 + Math.floor(0.12 * lvl),
  overload_plus: (lvl: number) => 6 + Math.floor(0.16 * lvl),
  // TODO: Add more potions
};

export const POTION_RANGED_BONUS = {
  none: () => 0, // Parameter removed as unused
  ranging_potion: (lvl: number) => 4 + Math.floor(0.10 * lvl),
  super_ranging: (lvl: number) => 5 + Math.floor(0.15 * lvl), // Bastion & Super Ranging are same for level boost
  bastion_potion: (lvl: number) => 5 + Math.floor(0.15 * lvl),
  overload_plus: (lvl: number) => 6 + Math.floor(0.16 * lvl),
  // TODO: Add more potions
};

// Magic potions typically boost the Magic level, which affects accuracy and staff max hits (Trident etc.)
// They don't directly boost % damage for standard spells.
export const POTION_MAGIC_BONUS = {
  none: () => 0, // Parameter removed as unused
  magic_potion: () => 4, // Parameter removed as unused
  super_magic_potion: (lvl: number) => 5 + Math.floor(0.15 * lvl), // Battlemage & Super Magic are same for level boost
  battlemage_potion: (lvl: number) => 5 + Math.floor(0.15 * lvl),
  overload_plus: (lvl: number) => 6 + Math.floor(0.16 * lvl),
  imbued_heart: (lvl: number) => 1 + Math.floor(0.10 * lvl), // Temporary boost
  // TODO: Add more potions
};


// This is a more advanced step. A full implementation would require:
// - Handling accuracy calculations separately, especially for sets like Inquisitor/Void.
// - A comprehensive item database with all relevant bonuses.
// - Handling for many specific item effects (Dharok's, Barrows sets, Keris, special attack weapons, powered staves, bolt effects, Tbow, etc.)
// - More detailed potion effect calculations (and handling temporary boosts like Imbued Heart).
// - Accurate prayer selection and combination.
// - Combat style selection affecting stats and bonuses correctly. 
// - Target specific bonuses (Dragon hunter, Salve vs Undead, Arclight vs Demons, etc.) 