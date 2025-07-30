import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { 
  Player, 
  DEFAULT_PLAYER_SKILLS, 
  DEFAULT_EQUIPMENT, 
  DEFAULT_EQUIPMENT_STATS, 
  DEFAULT_COMBAT_STYLE,
  PlayerSkills,
  Prayer,
  Potion,
} from '@/types/dps/Player';
import { Monster, createDefaultMonster } from '@/types/dps/Monster';
import { MONSTERS_DATABASE } from '@/data/dps/monsters';

interface DPSResults {
  dps: number;
  maxHit: number;
  accuracy: number;
  ttk?: number;
  isCalculating: boolean;
}

interface DPSStore {
  // Player state
  player: Player;
  
  // Monster state  
  monster: Monster | null;
  
  // Results state
  results: DPSResults;
  
  // UI state
  selectedLoadout: number;
  loadouts: Player[];
  
  // Actions
  setPlayer: (player: Partial<Player>) => void;
  setMonster: (monster: Monster | null) => void;
  setResults: (results: Partial<DPSResults>) => void;
  setSelectedLoadout: (index: number) => void;
  updateLoadout: (index: number, loadout: Partial<Player>) => void;
  addLoadout: () => void;
  removeLoadout: (index: number) => void;
  
  // Skill and equipment helpers
  updatePlayerSkills: (skills: Partial<PlayerSkills>) => void;
  updatePlayerBoosts: (boosts: Partial<PlayerSkills>) => void;
  togglePrayer: (prayer: Prayer) => void;
  addPotion: (potion: Potion) => void;
  removePotion: (potion: Potion) => void;
  
  // Calculation triggers
  calculateDPS: () => Promise<void>;
}

// Default player state
const defaultPlayer: Player = {
  name: 'Player',
  style: DEFAULT_COMBAT_STYLE,
  skills: DEFAULT_PLAYER_SKILLS,
  boosts: { ...DEFAULT_PLAYER_SKILLS, atk: 0, def: 0, hp: 0, magic: 0, prayer: 0, ranged: 0, str: 0, mining: 0, herblore: 0 },
  equipment: DEFAULT_EQUIPMENT,
  attackSpeed: 4,
  prayers: [],
  buffs: {
    potions: [],
    onSlayerTask: false,
    inWilderness: false,
    forinthrySurge: false,
    soulreaperStacks: 0,
    baAttackerLevel: 0,
    chinchompaDistance: 1,
    kandarinDiary: false,
    chargeSpell: false,
    markOfDarknessSpell: false,
    usingSunfireRunes: false,
  },
  spell: null,
  ...DEFAULT_EQUIPMENT_STATS,
};

// Default results state
const defaultResults: DPSResults = {
  dps: 0,
  maxHit: 0,
  accuracy: 0,
  ttk: undefined,
  isCalculating: false,
};

export const useDPSStore = create<DPSStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    player: defaultPlayer,
    monster: MONSTERS_DATABASE[0] || createDefaultMonster(),
    results: defaultResults,
    selectedLoadout: 0,
    loadouts: [defaultPlayer],

    // Actions
    setPlayer: (playerUpdate) =>
      set((state) => ({
        player: { ...state.player, ...playerUpdate },
        loadouts: state.loadouts.map((loadout, index) =>
          index === state.selectedLoadout
            ? { ...loadout, ...playerUpdate }
            : loadout
        ),
      })),

    setMonster: (monster) =>
      set(() => ({ monster })),

    setResults: (resultsUpdate) =>
      set((state) => ({
        results: { ...state.results, ...resultsUpdate },
      })),

    setSelectedLoadout: (index) =>
      set((state) => ({
        selectedLoadout: index,
        player: state.loadouts[index] || defaultPlayer,
      })),

    updateLoadout: (index, loadoutUpdate) =>
      set((state) => ({
        loadouts: state.loadouts.map((loadout, i) =>
          i === index ? { ...loadout, ...loadoutUpdate } : loadout
        ),
        player: index === state.selectedLoadout 
          ? { ...state.player, ...loadoutUpdate }
          : state.player,
      })),

    addLoadout: () =>
      set((state) => ({
        loadouts: [...state.loadouts, { ...defaultPlayer }],
      })),

    removeLoadout: (index) =>
      set((state) => {
        if (state.loadouts.length <= 1) return state;
        
        const newLoadouts = state.loadouts.filter((_, i) => i !== index);
        const newSelectedLoadout = index === state.selectedLoadout 
          ? Math.max(0, index - 1)
          : state.selectedLoadout > index 
            ? state.selectedLoadout - 1 
            : state.selectedLoadout;
            
        return {
          loadouts: newLoadouts,
          selectedLoadout: newSelectedLoadout,
          player: newLoadouts[newSelectedLoadout] || defaultPlayer,
        };
      }),

    // Skill and equipment helpers
    updatePlayerSkills: (skillsUpdate) =>
      set((state) => ({
        player: { ...state.player, skills: { ...state.player.skills, ...skillsUpdate } },
      })),

    updatePlayerBoosts: (boostsUpdate) =>
      set((state) => ({
        player: { ...state.player, boosts: { ...state.player.boosts, ...boostsUpdate } },
      })),

    togglePrayer: (prayer) =>
      set((state) => {
        const currentPrayers = state.player.prayers;
        const isPrayerActive = currentPrayers.includes(prayer);
        
        return {
          player: {
            ...state.player,
            prayers: isPrayerActive
              ? currentPrayers.filter(p => p !== prayer)
              : [...currentPrayers, prayer],
          },
        };
      }),

    addPotion: (potion) =>
      set((state) => {
        const currentPotions = state.player.buffs.potions;
        if (currentPotions.includes(potion)) return state;
        
        return {
          player: {
            ...state.player,
            buffs: {
              ...state.player.buffs,
              potions: [...currentPotions, potion],
            },
          },
        };
      }),

    removePotion: (potion) =>
      set((state) => ({
        player: {
          ...state.player,
          buffs: {
            ...state.player.buffs,
            potions: state.player.buffs.potions.filter(p => p !== potion),
          },
        },
      })),

    calculateDPS: async () => {
      const { player, monster, setResults } = get();
      
      if (!monster) {
        setResults({ dps: 0, maxHit: 0, accuracy: 0, ttk: undefined });
        return;
      }

      setResults({ isCalculating: true });

      try {
        // Use web worker for calculation to avoid blocking UI
        const { dpsWorkerClient } = await import('@/lib/dps/workerClient');
        
        const result = await dpsWorkerClient.calculateDPS(player, monster);

        setResults({
          dps: result.dps,
          maxHit: result.maxHit,
          accuracy: result.accuracy,
          ttk: result.ttk,
          isCalculating: false,
        });
      } catch (error) {
        console.error('DPS calculation error:', error);
        setResults({
          dps: 0,
          maxHit: 0,
          accuracy: 0,
          ttk: undefined,
          isCalculating: false,
        });
      }
    },
  }))
);

// Subscribe to changes for automatic recalculation
useDPSStore.subscribe(
  (state) => ({ player: state.player, monster: state.monster }),
  (current, previous) => {
    if (current.player !== previous.player || current.monster !== previous.monster) {
      // Debounce calculations to avoid excessive computation
      setTimeout(() => {
        useDPSStore.getState().calculateDPS();
      }, 100);
    }
  },
  { equalityFn: (a, b) => a.player === b.player && a.monster === b.monster }
); 