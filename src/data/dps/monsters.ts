import { Monster, MonsterAttribute } from '@/types/dps/Monster';
// Import raw monster data directly from the CDN
import rawMonsters from '../../../cdn/json/monsters.json';

// Default monster inputs based on osrs-dps-calc
const DEFAULT_MONSTER_INPUTS = {
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

// Runtime conversion function based on osrs-dps-calc approach
export function getMonsters(): Monster[] {
  // Convert raw JSON to Monster interface
  const processedMonsters = rawMonsters.map((m: any): Monster => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const maxHit = parseInt(m.max_hit?.toString() || '0');
    const styleStr = Array.isArray(m.style) ? m.style.join(',').toLowerCase() : (m.style || '').toLowerCase();
    
    return {
      id: m.id,
      name: m.name,
      version: m.version,
      image: m.image ? `https://tools.runescape.wiki/osrs-dps/cdn/monsters/${m.image}` : undefined,
      size: m.size || 1,
      speed: m.speed || 4,
      style: styleStr || 'crush',
      maxHit: Number.isNaN(maxHit) ? 0 : maxHit,
      skills: m.skills || { atk: 1, def: 1, hp: 10, magic: 1, ranged: 1, str: 1 },
      offensive: m.offensive || { atk: 0, magic: 0, magic_str: 0, ranged: 0, ranged_str: 0, str: 0 },
      defensive: {
        flat_armour: m.defensive?.flat_armour || 0,
        stab: m.defensive?.stab || 0,
        slash: m.defensive?.slash || 0,
        crush: m.defensive?.crush || 0,
        magic: m.defensive?.magic || 0,
        light: m.defensive?.light || 0,
        standard: m.defensive?.standard || 0,
        heavy: m.defensive?.heavy || 0,
      },
      attributes: (m.attributes || []) as MonsterAttribute[],
      weakness: m.weakness || null,
      immunities: {
        burn: m.immunities?.burn || null,
      },
      inputs: {
        ...DEFAULT_MONSTER_INPUTS,
        monsterCurrentHp: m.skills?.hp || 100,
      },
    };
  });

  // Remove duplicate monsters by ID, keeping the first occurrence
  const seenIds = new Set<number>();
  return processedMonsters.filter(monster => {
    if (seenIds.has(monster.id)) {
      console.warn(`Duplicate monster ID found: ${monster.id} (${monster.name}) - removing duplicate`);
      return false;
    }
    seenIds.add(monster.id);
    return true;
  });
}

// Create the database using the conversion function
export const MONSTERS_DATABASE: Monster[] = getMonsters();

// Helper functions
export const getMonsterById = (id: number): Monster | undefined => {
  return MONSTERS_DATABASE.find(monster => monster.id === id);
};

export const getMonstersByAttribute = (attribute: MonsterAttribute): Monster[] => {
  return MONSTERS_DATABASE.filter(monster => monster.attributes.includes(attribute));
};

export const searchMonsters = (query: string): Monster[] => {
  const lowercaseQuery = query.toLowerCase();
  return MONSTERS_DATABASE.filter(monster =>
    monster.name.toLowerCase().includes(lowercaseQuery)
  );
};

// Monster categories for UI organization
export const MONSTER_CATEGORIES = {
  LOW_LEVEL: {
    name: 'Low Level',
    monsters: MONSTERS_DATABASE.filter(m => m.skills.hp <= 50),
  },
  MID_LEVEL: {
    name: 'Mid Level',
    monsters: MONSTERS_DATABASE.filter(m => m.skills.hp > 50 && m.skills.hp <= 150),
  },
  HIGH_LEVEL: {
    name: 'High Level',
    monsters: MONSTERS_DATABASE.filter(m => m.skills.hp > 150),
  },
  BOSSES: {
    name: 'Bosses',
    monsters: MONSTERS_DATABASE.filter(m => m.skills.hp > 200),
  },
  DRAGONS: {
    name: 'Dragons',
    monsters: getMonstersByAttribute('dragon' as MonsterAttribute),
  },
  DEMONS: {
    name: 'Demons',
    monsters: getMonstersByAttribute('demon' as MonsterAttribute),
  },
  UNDEAD: {
    name: 'Undead',
    monsters: getMonstersByAttribute('undead' as MonsterAttribute),
  },
};

// Legacy export for backward compatibility
export const BASIC_MONSTERS = MONSTERS_DATABASE; 