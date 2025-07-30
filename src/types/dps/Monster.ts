import { CombatStyleType, RangedDamageType } from './Player';

// Monster Attributes
export enum MonsterAttribute {
  DEMON = 'demon',
  DRAGON = 'dragon',
  FIERY = 'fiery',
  FLYING = 'flying',
  GOLEM = 'golem',
  KALPHITE = 'kalphite',
  LEAFY = 'leafy',
  PENANCE = 'penance',
  RAT = 'rat',
  SHADE = 'shade',
  SPECTRAL = 'spectral',
  UNDEAD = 'undead',
  VAMPYRE_1 = 'vampyre1',
  VAMPYRE_2 = 'vampyre2',
  VAMPYRE_3 = 'vampyre3',
  XERICIAN = 'xerician',
}

export const isVampyre = (attr: string | string[]): boolean => {
  if (Array.isArray(attr)) {
    return attr.some((a) => isVampyre(a));
  }
  return ([MonsterAttribute.VAMPYRE_1, MonsterAttribute.VAMPYRE_2, MonsterAttribute.VAMPYRE_3] as string[]).includes(attr);
};

// Monster Combat Style
export type MonsterCombatStyle = CombatStyleType;

// Burn Immunity
export enum BurnImmunity {
  WEAK = 'Weak',
  NORMAL = 'Normal',
  STRONG = 'Strong',
}

// Spell Elements
export type Spellement = 'fire' | 'water' | 'earth' | 'air';

// Monster interface
export interface Monster {
  id: number;
  name: string;
  image?: string;
  version?: string;
  size: number;
  speed: number;
  style: MonsterCombatStyle;
  maxHit?: number; // Only used for UI display
  
  skills: {
    atk: number;
    def: number;
    hp: number;
    magic: number;
    ranged: number;
    str: number;
  };
  
  offensive: {
    atk: number;
    magic: number;
    magic_str: number;
    ranged: number;
    ranged_str: number;
    str: number;
  };
  
  defensive: {
    flat_armour: number;
  } & {
    [k in Exclude<CombatStyleType, null | 'ranged'> | Exclude<RangedDamageType, 'mixed'>]: number;
  };
  
  /**
   * The attributes the monster has
   * @see https://oldschool.runescape.wiki/w/Monster_attribute
   */
  attributes: MonsterAttribute[];

  weakness: {
    element: Spellement;
    severity: number;
  } | null;
  
  immunities: {
    burn: BurnImmunity | null;
  };

  /**
   * Fields that users have control over in the UI
   */
  inputs: {
    // Raid scaling
    isFromCoxCm: boolean;
    toaInvocationLevel: number;
    toaPathLevel: number;
    partyMaxCombatLevel: number;
    partySumMiningLevel: number;
    partyMaxHpLevel: number;
    partySize: number;
    
    // Monster state
    monsterCurrentHp: number;
    
    // Defence reductions
    defenceReductions: {
      vulnerability: boolean;
      accursed: boolean;
      elderMaul: number;
      dwh: number;
      arclight: number;
      emberlight: number;
      bgs: number;
      tonalztic: number;
      seercull: number;
      ayak: number;
    };

    demonbaneVulnerability?: number;
    phase?: string;
  };
}

// Default monster inputs
export const DEFAULT_MONSTER_INPUTS = {
  isFromCoxCm: false,
  toaInvocationLevel: 0,
  toaPathLevel: 0,
  partyMaxCombatLevel: 126,
  partySumMiningLevel: 0,
  partyMaxHpLevel: 99,
  partySize: 1,
  monsterCurrentHp: 100,
  defenceReductions: {
    vulnerability: false,
    accursed: false,
    elderMaul: 0,
    dwh: 0,
    arclight: 0,
    emberlight: 0,
    bgs: 0,
    tonalztic: 0,
    seercull: 0,
    ayak: 0,
  },
  demonbaneVulnerability: 0,
  phase: undefined,
};

// Helper function to create default monster
export const createDefaultMonster = (overrides: Partial<Monster> = {}): Monster => ({
  id: 0,
  name: 'Giant rat',
  version: undefined,
  size: 1,
  speed: 4,
  style: 'crush',
  maxHit: 1,
  skills: {
    atk: 1,
    def: 1,
    hp: 7,
    magic: 1,
    ranged: 1,
    str: 1,
  },
  offensive: {
    atk: 0,
    magic: 0,
    magic_str: 0,
    ranged: 0,
    ranged_str: 0,
    str: 0,
  },
  defensive: {
    flat_armour: 0,
    stab: 0,
    slash: 0,
    crush: 0,
    magic: 0,
    light: 0,
    standard: 0,
    heavy: 0,
  },
  attributes: [],
  weakness: null,
  immunities: {
    burn: null,
  },
  inputs: DEFAULT_MONSTER_INPUTS,
  ...overrides,
}); 