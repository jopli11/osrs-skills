import { Player, PlayerSkills, Prayer, Potion, EquipmentStats } from '@/types/dps/Player';
import { Monster, MonsterAttribute } from '@/types/dps/Monster';
import { calculateMeleeMaxHit, calculateRangedMaxHit, calculateMagicMaxHit } from '@/lib/formulas';

// Calculate total equipment stats from player's equipped items
function calculateEquipmentStats(player: Player): EquipmentStats {
  const equipment = player.equipment;
  const stats: EquipmentStats = {
    bonuses: { str: 0, ranged_str: 0, magic_str: 0, prayer: 0 },
    offensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
    defensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
  };

  // Sum up stats from all equipped items
  Object.values(equipment).forEach(item => {
    if (item) {
      // Add offensive bonuses
      if (item.offensive) {
        stats.offensive.stab += item.offensive.stab || 0;
        stats.offensive.slash += item.offensive.slash || 0;
        stats.offensive.crush += item.offensive.crush || 0;
        stats.offensive.magic += item.offensive.magic || 0;
        stats.offensive.ranged += item.offensive.ranged || 0;
      }
      
      // Add defensive bonuses
      if (item.defensive) {
        stats.defensive.stab += item.defensive.stab || 0;
        stats.defensive.slash += item.defensive.slash || 0;
        stats.defensive.crush += item.defensive.crush || 0;
        stats.defensive.magic += item.defensive.magic || 0;
        stats.defensive.ranged += item.defensive.ranged || 0;
      }
      
      // Add special bonuses
      if (item.bonuses) {
        stats.bonuses.str += item.bonuses.str || 0;
        stats.bonuses.ranged_str += item.bonuses.ranged_str || 0;
        stats.bonuses.magic_str += item.bonuses.magic_str || 0;
        stats.bonuses.prayer += item.bonuses.prayer || 0;
      }
    }
  });

  return stats;
}

// Equipment checking functions
function isWearing(player: Player, itemNames: string | string[]): boolean {
  const items = Array.isArray(itemNames) ? itemNames : [itemNames];
  const equippedItems = Object.values(player.equipment).map(item => item?.name).filter(Boolean);
  return items.some(itemName => equippedItems.includes(itemName));
}

function isWearingMeleeVoid(player: Player): boolean {
  const hasVoidHelm = isWearing(player, ['Void melee helm', 'Elite void melee helm']);
  const hasVoidTop = isWearing(player, ['Void knight top', 'Elite void top']);
  const hasVoidBottom = isWearing(player, ['Void knight robe', 'Elite void robe']);
  const hasVoidGloves = isWearing(player, ['Void knight gloves']);
  
  return hasVoidHelm && hasVoidTop && hasVoidBottom && hasVoidGloves;
}

function isWearingRangedVoid(player: Player): boolean {
  const hasVoidHelm = isWearing(player, ['Void ranger helm', 'Elite void ranger helm']);
  const hasVoidTop = isWearing(player, ['Void knight top', 'Elite void top']);
  const hasVoidBottom = isWearing(player, ['Void knight robe', 'Elite void robe']);
  const hasVoidGloves = isWearing(player, ['Void knight gloves']);
  
  return hasVoidHelm && hasVoidTop && hasVoidBottom && hasVoidGloves;
}

function isWearingMagicVoid(player: Player): boolean {
  const hasVoidHelm = isWearing(player, ['Void mage helm', 'Elite void mage helm']);
  const hasVoidTop = isWearing(player, ['Void knight top', 'Elite void top']);
  const hasVoidBottom = isWearing(player, ['Void knight robe', 'Elite void robe']);
  const hasVoidGloves = isWearing(player, ['Void knight gloves']);
  
  return hasVoidHelm && hasVoidTop && hasVoidBottom && hasVoidGloves;
}

function hasMonsterAttribute(monster: Monster, attribute: string): boolean {
  return monster.attributes && monster.attributes.includes(attribute as MonsterAttribute);
}

// Apply special equipment bonuses based on equipment and monster
function applySpecialEquipmentBonuses(player: Player, baseValue: number, bonusType: 'accuracy' | 'maxHit', monster?: Monster): number {
  let result = baseValue;
  const style = player.style;
  
  // Void armor bonuses
  if (style.type === 'stab' || style.type === 'slash' || style.type === 'crush') {
    if (isWearingMeleeVoid(player)) {
      result = Math.floor(result * 1.1); // 10% melee void bonus
    }
  } else if (style.type === 'ranged') {
    if (isWearingRangedVoid(player)) {
      if (bonusType === 'accuracy') {
        result = Math.floor(result * 1.1); // 10% ranged void accuracy bonus
      } else {
        result = Math.floor(result * 1.125); // 12.5% ranged void damage bonus
      }
    }
  } else if (style.type === 'magic') {
    if (isWearingMagicVoid(player)) {
      if (bonusType === 'accuracy') {
        result = Math.floor(result * 1.25); // 25% magic void accuracy bonus
      } else {
        result = Math.floor(result * 1.025); // 2.5% magic void damage bonus
      }
    }
  }
  
  // Monster-specific bonuses (only if monster is provided)
  if (monster) {
    // Salve amulet bonuses (don't stack with void or slayer bonuses)
    if (hasMonsterAttribute(monster, 'undead')) {
      if (isWearing(player, ['Salve amulet (e)', 'Salve amulet(ei)'])) {
        result = Math.floor(result * 1.2); // 20% bonus vs undead
      } else if (isWearing(player, ['Salve amulet', 'Salve amulet(i)'])) {
        result = Math.floor(result * 1.167); // 16.67% bonus vs undead (7/6)
      }
    }
    
    // Dragon hunter weapon bonuses
    if (hasMonsterAttribute(monster, 'dragon')) {
      if (isWearing(player, 'Dragon hunter lance')) {
        result = Math.floor(result * 1.2); // 20% bonus vs dragons (6/5)
      } else if (isWearing(player, 'Dragon hunter crossbow')) {
        if (bonusType === 'accuracy') {
          result = Math.floor(result * 1.3); // 30% accuracy bonus vs dragons (13/10)
        } else {
          result = Math.floor(result * 1.25); // 25% damage bonus vs dragons (5/4)
        }
      } else if (isWearing(player, 'Dragon hunter wand')) {
        if (bonusType === 'accuracy') {
          result = Math.floor(result * 1.75); // 75% accuracy bonus vs dragons (7/4)
        } else {
          result = Math.floor(result * 1.4); // 40% damage bonus vs dragons (7/5)
        }
      }
    }
    
    // Demonbane bonuses
    if (hasMonsterAttribute(monster, 'demon')) {
      if (isWearing(player, ['Arclight', 'Emberlight'])) {
        result = Math.floor(result * 1.7); // 70% bonus vs demons
      }
    }
    
    // Vampyre bonuses
    if (hasMonsterAttribute(monster, 'vampyre')) {
      if (isWearing(player, ['Blisterwood flail', 'Blisterwood sickle'])) {
        result = Math.floor(result * 1.05); // 5% bonus vs vampyres (21/20)
      }
    }
    
    // Kalphite bonuses
    if (hasMonsterAttribute(monster, 'kalphite')) {
      if (isWearing(player, 'Keris partisan of breaching')) {
        result = Math.floor(result * 1.33); // 33% bonus vs kalphites (133/100)
      }
    }
  }
  
  // Inquisitor's armor bonus (crush style only)
  if (style.type === 'crush') {
    const inqPieces = [
      "Inquisitor's great helm",
      "Inquisitor's hauberk", 
      "Inquisitor's plateskirt"
    ].filter(piece => isWearing(player, piece)).length;
    
    if (inqPieces > 0) {
      if (isWearing(player, "Inquisitor's mace")) {
        // 2.5% per piece when using inq mace
        result = Math.floor(result * (1 + (inqPieces * 0.025)));
      } else if (inqPieces === 3) {
        // 1% extra for full set when not using inq mace
        result = Math.floor(result * 1.05);
      }
    }
  }
  
  // Scythe of Vitur multi-hit bonus for large monsters
  if (monster && isWearing(player, 'Scythe of vitur')) {
    const monsterSize = monster.size || 1;
    if (monsterSize >= 3) {
      // Scythe hits up to 3 times on 3x3 or larger monsters
      if (bonusType === 'maxHit') {
        // Each additional hit does 50% and 25% of the first hit
        const firstHit = result;
        const secondHit = Math.floor(firstHit * 0.5);
        const thirdHit = Math.floor(firstHit * 0.25);
        result = firstHit + secondHit + thirdHit;
      }
    } else if (monsterSize === 2) {
      // 2x2 monsters get hit twice
      if (bonusType === 'maxHit') {
        const firstHit = result;
        const secondHit = Math.floor(firstHit * 0.5);
        result = firstHit + secondHit;
      }
    }
  }
  
  return result;
}

// Core OSRS accuracy calculation - ported from osrs-dps-calc
export function getNormalAccuracyRoll(attackRoll: number, defenceRoll: number): number {
  const stdRoll = (attack: number, defence: number) => ((attack > defence)
    ? 1 - ((defence + 2) / (2 * (attack + 1)))
    : attack / (2 * (defence + 1)));

  let atk = attackRoll;
  let def = defenceRoll;

  if (atk < 0) atk = Math.min(0, atk + 2);
  if (def < 0) def = Math.min(0, def + 2);

  if (atk >= 0 && def >= 0) return stdRoll(atk, def);
  if (atk >= 0 && def < 0) return 1 - 1 / (-def + 1) / (atk + 1);
  if (atk < 0 && def >= 0) return 0;
  if (atk < 0 && def < 0) return stdRoll(-def, -atk);
  return 0;
}

// Calculate effective combat level for attack roll calculations
function getEffectiveLevel(baseLevel: number, boost: number, prayerMultiplier: number, styleBonus: number): number {
  return Math.floor((baseLevel + boost) * prayerMultiplier) + styleBonus + 8;
}

// Calculate attack roll for player
function getPlayerAttackRoll(player: Player): number {
  const { skills, boosts, style, prayers } = player;
  
  // Calculate equipment stats
  const equipmentStats = calculateEquipmentStats(player);
  
  // Determine combat style and get relevant stats
  let baseLevel: number;
  let gearBonus: number;
  let prayerMultiplier = 1;
  let styleBonus = 0;

  // Get style bonus based on combat stance
  switch (style.stance) {
    case 'Accurate':
      styleBonus = 3;
      break;
    case 'Controlled':
      styleBonus = 1;
      break;
    default:
      styleBonus = 0;
  }

  if (style.type === 'stab' || style.type === 'slash' || style.type === 'crush') {
    // Melee attack roll
    baseLevel = skills.atk;
    gearBonus = equipmentStats.offensive[style.type] || 0;
    
    // Prayer bonuses for melee accuracy
    if (prayers.includes(Prayer.CLARITY_OF_THOUGHT)) prayerMultiplier = 1.05;
    if (prayers.includes(Prayer.IMPROVED_REFLEXES)) prayerMultiplier = 1.10;
    if (prayers.includes(Prayer.INCREDIBLE_REFLEXES)) prayerMultiplier = 1.15;
    if (prayers.includes(Prayer.CHIVALRY)) prayerMultiplier = 1.15;
    if (prayers.includes(Prayer.PIETY)) prayerMultiplier = 1.20;
    
  } else if (style.type === 'ranged') {
    // Ranged attack roll
    baseLevel = skills.ranged;
    gearBonus = equipmentStats.offensive.ranged;
    
    // Prayer bonuses for ranged accuracy
    if (prayers.includes(Prayer.SHARP_EYE)) prayerMultiplier = 1.05;
    if (prayers.includes(Prayer.HAWK_EYE)) prayerMultiplier = 1.10;
    if (prayers.includes(Prayer.EAGLE_EYE)) prayerMultiplier = 1.15;
    if (prayers.includes(Prayer.RIGOUR)) prayerMultiplier = 1.20;
    
  } else if (style.type === 'magic') {
    // Magic attack roll
    baseLevel = skills.magic;
    gearBonus = equipmentStats.offensive.magic;
    
    // Prayer bonuses for magic accuracy
    if (prayers.includes(Prayer.MYSTIC_WILL)) prayerMultiplier = 1.05;
    if (prayers.includes(Prayer.MYSTIC_LORE)) prayerMultiplier = 1.10;
    if (prayers.includes(Prayer.MYSTIC_MIGHT)) prayerMultiplier = 1.15;
    if (prayers.includes(Prayer.AUGURY)) prayerMultiplier = 1.25;
  } else {
    return 0; // Invalid combat style
  }

  const effectiveLevel = getEffectiveLevel(baseLevel, boosts[baseLevel === skills.atk ? 'atk' : baseLevel === skills.ranged ? 'ranged' : 'magic'], prayerMultiplier, styleBonus);
  const attackRoll = effectiveLevel * (gearBonus + 64);
  
  // Apply special equipment bonuses - monster context needed for some bonuses
  // Will be applied properly in the main calculateDPS function
  
  return attackRoll;
}

// Calculate defence roll for monster
function getMonsterDefenceRoll(monster: Monster, attackStyle: string | null): number {
  const { skills, defensive } = monster;
  
  // Get defence level (monsters don't have prayer/potion boosts typically)
  const effectiveLevel = skills.def + 8;
  
  // Get defensive bonus based on attack style
  let defenceBonus = 0;
  
  if (attackStyle === 'stab') {
    defenceBonus = defensive.stab;
  } else if (attackStyle === 'slash') {
    defenceBonus = defensive.slash;
  } else if (attackStyle === 'crush') {
    defenceBonus = defensive.crush;
  } else if (attackStyle === 'ranged') {
    defenceBonus = defensive.standard; // Use standard ranged defence for ranged attacks
  } else if (attackStyle === 'magic') {
    defenceBonus = defensive.magic;
  }
  
  return effectiveLevel * (defenceBonus + 64);
}

// Calculate max hit based on combat style
function getPlayerMaxHit(player: Player): number {
  const { style, skills, prayers, equipment, buffs } = player;
  
  // Convert equipment to the format expected by formulas
  const equipmentLoadout = {
    head: equipment.head?.name || null,
    cape: equipment.cape?.name || null,
    neck: equipment.neck?.name || null,
    ammo: equipment.ammo?.name || null,
    weapon: equipment.weapon?.name || null,
    body: equipment.body?.name || null,
    shield: equipment.shield?.name || null,
    legs: equipment.legs?.name || null,
    hands: equipment.hands?.name || null,
    feet: equipment.feet?.name || null,
    ring: equipment.ring?.name || null,
  };

  // Get prayer bonuses
  let prayerBonus = 1;
  if (style.type === 'stab' || style.type === 'slash' || style.type === 'crush') {
    // Melee strength prayers
    if (prayers.includes(Prayer.BURST_OF_STRENGTH)) prayerBonus = 1.05;
    if (prayers.includes(Prayer.SUPERHUMAN_STRENGTH)) prayerBonus = 1.10;
    if (prayers.includes(Prayer.ULTIMATE_STRENGTH)) prayerBonus = 1.15;
    if (prayers.includes(Prayer.CHIVALRY)) prayerBonus = 1.18;
    if (prayers.includes(Prayer.PIETY)) prayerBonus = 1.23;
  } else if (style.type === 'ranged') {
    // Ranged strength prayers
    if (prayers.includes(Prayer.SHARP_EYE)) prayerBonus = 1.05;
    if (prayers.includes(Prayer.HAWK_EYE)) prayerBonus = 1.10;
    if (prayers.includes(Prayer.EAGLE_EYE)) prayerBonus = 1.15;
    if (prayers.includes(Prayer.RIGOUR)) prayerBonus = 1.23;
  }

  // Get potion bonus
  let potionBonus = 0;
  if (buffs.potions.includes(Potion.SUPER_STRENGTH)) {
    potionBonus = 5 + Math.floor(0.15 * skills.str);
  } else if (buffs.potions.includes(Potion.STRENGTH)) {
    potionBonus = 3 + Math.floor(0.10 * skills.str);
  }

  // Get style bonus
  let styleBonus = 0;
  if (style.stance === 'Aggressive') {
    styleBonus = 3;
  } else if (style.stance === 'Controlled') {
    styleBonus = 1;
  }

  if (style.type === 'stab' || style.type === 'slash' || style.type === 'crush') {
    // Melee max hit
    return calculateMeleeMaxHit({
      strengthLevel: skills.str,
      potionBonus,
      prayerBonus,
      styleBonus,
      equipment: equipmentLoadout,
      combatStyle: style.type,
      isOnSlayerTask: buffs.onSlayerTask,
      isAttackingDemon: false, // TODO: Check monster attributes
    });
  } else if (style.type === 'ranged') {
    // Ranged max hit
    return calculateRangedMaxHit({
      rangedLevel: skills.ranged,
      potionBonus: buffs.potions.includes(Potion.SUPER_RANGING) ? 5 + Math.floor(0.15 * skills.ranged) : 0,
      prayerBonus,
      styleBonus,
      equipment: equipmentLoadout,
      isOnSlayerTask: buffs.onSlayerTask,
    });
  } else if (style.type === 'magic') {
    // Magic max hit (simplified - would need spell data)
    return calculateMagicMaxHit({
      spellBaseMaxHit: 20, // Placeholder - would get from spell
      equipment: equipmentLoadout,
      isOnSlayerTask: buffs.onSlayerTask,
    });
  }

  return 0;
}

// Main DPS calculation interface
export interface DPSCalculationResult {
  maxHit: number;
  accuracy: number; // As percentage (0-100)
  dps: number;
  ttk: number | undefined; // Time to kill in seconds
  attackRoll: number;
  defenceRoll: number;
}

// Calculate DPS for player vs monster
export function calculateDPS(player: Player, monster: Monster): DPSCalculationResult {
  // Calculate attack and defence rolls
  const baseAttackRoll = getPlayerAttackRoll(player);
  const defenceRoll = getMonsterDefenceRoll(monster, player.style.type);
  
  // Apply special equipment bonuses with monster context
  const attackRoll = applySpecialEquipmentBonuses(player, baseAttackRoll, 'accuracy', monster);
  
  // Calculate accuracy as percentage
  const accuracyDecimal = getNormalAccuracyRoll(attackRoll, defenceRoll);
  const accuracy = accuracyDecimal * 100;
  
  // Calculate max hit
  let maxHit = getPlayerMaxHit(player);
  
  // Apply special equipment bonuses to max hit
  maxHit = applySpecialEquipmentBonuses(player, maxHit, 'maxHit', monster);
  
  // Calculate average hit (assuming linear distribution from 0 to maxHit)
  const averageHit = accuracy > 0 ? (maxHit * accuracyDecimal) / 2 : 0;
  
  // Calculate DPS (damage per tick converted to damage per second)
  // OSRS runs at 0.6 seconds per tick
  const ticksPerSecond = 1 / 0.6;
  const dps = (averageHit * ticksPerSecond) / player.attackSpeed;
  
  // Calculate time to kill
  let ttk: number | undefined;
  if (dps > 0 && monster.skills.hp > 0) {
    ttk = monster.skills.hp / dps;
  }
  
  return {
    maxHit,
    accuracy,
    dps,
    ttk,
    attackRoll,
    defenceRoll,
  };
}

// Helper function to get combat level
export function getCombatLevel(skills: PlayerSkills): number {
  const defenceHpPrayer = (skills.def + skills.hp + Math.floor(skills.prayer / 2)) * 0.25;
  const attackStr = skills.atk + skills.str;
  const rangedLevel = Math.floor(skills.ranged * 1.5);
  const magicLevel = Math.floor(skills.magic * 1.5);
  
  const maxCombat = Math.max(attackStr, rangedLevel, magicLevel);
  return Math.floor(defenceHpPrayer + maxCombat * 0.325);
}

// Helper function to get monster combat level
export function getMonsterCombatLevel(monster: Monster): number {
  const skills = monster.skills;
  const defenceHp = (skills.def + skills.hp + 1) * 0.25; // Monsters have 1 prayer typically
  const attackStr = skills.atk + skills.str;
  const rangedLevel = Math.floor(skills.ranged * 1.5);
  const magicLevel = Math.floor(skills.magic * 1.5);
  
  const maxCombat = Math.max(attackStr, rangedLevel, magicLevel);
  return Math.floor(defenceHp + maxCombat * 0.325);
} 