// Equipment Category enum - simplified from osrs-dps-calc
export enum EquipmentCategory {
  NONE = '',
  TWO_HANDED_SWORD = '2h Sword',
  AXE = 'Axe',
  BLADED_STAFF = 'Bladed Staff',
  BLUDGEON = 'Bludgeon',
  BLUNT = 'Blunt',
  BOW = 'Bow',
  BULWARK = 'Bulwark',
  CHINCHOMPA = 'Chinchompas',
  CLAW = 'Claw',
  CROSSBOW = 'Crossbow',
  DAGGER = 'Dagger',
  PARTISAN = 'Partisan',
  PICKAXE = 'Pickaxe',
  POLEARM = 'Polearm',
  POLESTAFF = 'Polestaff',
  POWERED_STAFF = 'Powered Staff',
  POWERED_WAND = 'Powered Wand',
  SALAMANDER = 'Salamander',
  SCYTHE = 'Scythe',
  SLASH_SWORD = 'Slash Sword',
  SPEAR = 'Spear',
  STAB_SWORD = 'Stab Sword',
  STAFF = 'Staff',
  THROWN = 'Thrown',
  UNARMED = 'Unarmed',
  WHIP = 'Whip',
}

// Combat Style Types
export const CombatStyleTypes = [
  'stab',
  'slash',
  'crush',
  'magic',
  'ranged',
] as const;

export type CombatStyleType = typeof CombatStyleTypes[number] | null;

export const RangedDamageTypes = [
  'light',
  'standard',
  'heavy',
  'mixed',
] as const;

export type RangedDamageType = typeof RangedDamageTypes[number];

export type CombatStyleStance =
  null |
  'Accurate' |
  'Aggressive' |
  'Autocast' |
  'Controlled' |
  'Defensive' |
  'Defensive Autocast' |
  'Longrange' |
  'Rapid' |
  'Manual Cast';

export interface PlayerCombatStyle {
  name: string;
  type: CombatStyleType;
  stance: CombatStyleStance;
}

// Player Skills
export interface PlayerSkills {
  atk: number;
  def: number;
  hp: number;
  magic: number;
  prayer: number;
  ranged: number;
  str: number;
  mining: number;
  herblore: number;
}

// Equipment Stats
export interface PlayerBonuses {
  str: number;
  ranged_str: number;
  magic_str: number;
  prayer: number;
}

export interface PlayerDefensive {
  stab: number;
  slash: number;
  crush: number;
  magic: number;
  ranged: number;
}

export interface PlayerOffensive {
  stab: number;
  slash: number;
  crush: number;
  magic: number;
  ranged: number;
}

export interface EquipmentStats {
  bonuses: PlayerBonuses;
  offensive: PlayerOffensive;
  defensive: PlayerDefensive;
}

// Equipment Piece
export interface EquipmentPiece extends EquipmentStats {
  name: string;
  id: number;
  version: string;
  slot: keyof PlayerEquipment;
  image: string;
  speed: number;
  category: EquipmentCategory;
  isTwoHanded: boolean;
  itemVars?: {
    blowpipeDartName?: string;
    blowpipeDartId?: number;
  };
}

// Player Equipment
export interface PlayerEquipment {
  head: EquipmentPiece | null;
  cape: EquipmentPiece | null;
  neck: EquipmentPiece | null;
  ammo: EquipmentPiece | null;
  weapon: EquipmentPiece | null;
  body: EquipmentPiece | null;
  shield: EquipmentPiece | null;
  legs: EquipmentPiece | null;
  hands: EquipmentPiece | null;
  feet: EquipmentPiece | null;
  ring: EquipmentPiece | null;
}

// Prayer System - simplified
export enum Prayer {
  BURST_OF_STRENGTH = 0,
  CLARITY_OF_THOUGHT = 1,
  SHARP_EYE = 2,
  MYSTIC_WILL = 3,
  SUPERHUMAN_STRENGTH = 4,
  IMPROVED_REFLEXES = 5,
  HAWK_EYE = 6,
  MYSTIC_LORE = 7,
  ULTIMATE_STRENGTH = 8,
  INCREDIBLE_REFLEXES = 9,
  EAGLE_EYE = 10,
  MYSTIC_MIGHT = 11,
  CHIVALRY = 12,
  PIETY = 13,
  RIGOUR = 14,
  AUGURY = 15,
  THICK_SKIN = 16,
  ROCK_SKIN = 17,
  STEEL_SKIN = 18,
  DEADEYE = 19,
  MYSTIC_VIGOUR = 20,
}

export type PrayerCombatStyle = 'magic' | 'ranged' | 'melee';

export interface PrayerData {
  renderOrder: number;
  name: string;
  image: string; // Will use string paths instead of StaticImageData for simplicity
  drainRate: number;
  combatStyle?: PrayerCombatStyle;
  magicDamageBonus?: number;
  factorAccuracy?: [number, number]; // [numerator, denominator]
  factorStrength?: [number, number];
  factorDefence?: [number, number];
  factorDefenceMagic?: [number, number];
}

// Potion System - simplified
export enum Potion {
  NONE = '',
  ATTACK = 'Attack Potion',
  STRENGTH = 'Strength Potion',
  DEFENCE = 'Defence Potion',
  COMBAT = 'Combat Potion',
  SUPER_ATTACK = 'Super Attack',
  SUPER_STRENGTH = 'Super Strength',
  SUPER_DEFENCE = 'Super Defence',
  SUPER_COMBAT = 'Super Combat Potion',
  RANGING = 'Ranging Potion',
  SUPER_RANGING = 'Super Ranging',
  MAGIC = 'Magic Potion',
  SUPER_MAGIC = 'Super Magic Potion',
  ANCIENT_BREW = 'Ancient Brew',
}

// Basic Spell interface
export interface Spell {
  name: string;
  image: string;
  combatStyle: CombatStyleType;
  spellbook: 'standard' | 'ancient' | 'lunar' | 'arceuus';
  maxHit: number;
  canAutocast: boolean;
}

// Main Player interface
export interface Player extends EquipmentStats {
  name: string;
  style: PlayerCombatStyle;
  skills: PlayerSkills;
  boosts: PlayerSkills; // Skill boosts from potions, etc.
  equipment: PlayerEquipment;
  attackSpeed: number;
  prayers: Prayer[];
  buffs: {
    potions: Potion[];
    onSlayerTask: boolean;
    inWilderness: boolean;
    forinthrySurge: boolean;
    soulreaperStacks: number;
    baAttackerLevel: number;
    chinchompaDistance: number;
    kandarinDiary: boolean;
    chargeSpell: boolean;
    markOfDarknessSpell: boolean;
    usingSunfireRunes: boolean;
  };
  spell: Spell | null;
}

// Helper constants
export const DEFENSIVE_PRAYERS: Prayer[] = [
  Prayer.THICK_SKIN, Prayer.ROCK_SKIN, Prayer.STEEL_SKIN,
  Prayer.CHIVALRY, Prayer.PIETY, Prayer.RIGOUR, Prayer.AUGURY,
];

export const OFFENSIVE_PRAYERS: Prayer[] = [
  Prayer.BURST_OF_STRENGTH, Prayer.CLARITY_OF_THOUGHT, Prayer.SHARP_EYE, Prayer.MYSTIC_WILL, 
  Prayer.SUPERHUMAN_STRENGTH, Prayer.IMPROVED_REFLEXES, Prayer.HAWK_EYE, Prayer.MYSTIC_LORE, 
  Prayer.ULTIMATE_STRENGTH, Prayer.INCREDIBLE_REFLEXES, Prayer.EAGLE_EYE, Prayer.MYSTIC_MIGHT, 
  Prayer.DEADEYE, Prayer.MYSTIC_VIGOUR, Prayer.CHIVALRY, Prayer.PIETY, Prayer.RIGOUR, Prayer.AUGURY,
];

export const MAGIC_WEAPONS = [
  EquipmentCategory.STAFF,
  EquipmentCategory.POWERED_WAND,
  EquipmentCategory.POWERED_STAFF,
  EquipmentCategory.BLADED_STAFF,
  EquipmentCategory.POLESTAFF,
];

// Default values
export const DEFAULT_PLAYER_SKILLS: PlayerSkills = {
  atk: 99,
  def: 99,
  hp: 99,
  magic: 99,
  prayer: 99,
  ranged: 99,
  str: 99,
  mining: 99,
  herblore: 99,
};

export const DEFAULT_EQUIPMENT_STATS: EquipmentStats = {
  bonuses: { str: 0, ranged_str: 0, magic_str: 0, prayer: 0 },
  offensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
  defensive: { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 },
};

export const DEFAULT_EQUIPMENT: PlayerEquipment = {
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
};

export const DEFAULT_COMBAT_STYLE: PlayerCombatStyle = {
  name: 'Punch',
  type: 'crush',
  stance: 'Accurate',
}; 