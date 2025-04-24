"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalculatorInput, SkillName } from "./types";

// Type for player stats from OSRS highscores
export interface PlayerStats {
  username: string;
  stats: Record<string, { rank: number; level: number; xp: number }>;
}

interface CalculatorState {
  // Active skill
  activeSkill: SkillName;
  setActiveSkill: (skill: SkillName) => void;
  
  // Calculator inputs by skill
  calculatorInputs: Record<SkillName, CalculatorInput>;
  updateCalculatorInput: (skill: SkillName, input: Partial<CalculatorInput>) => void;
  
  // Display preferences
  preferences: {
    showMembersOnly: boolean;
    sortBy: "level" | "xp" | "profit";
    sortDirection: "asc" | "desc";
  };
  updatePreferences: (prefs: Partial<CalculatorState["preferences"]>) => void;

  // Player OSRS stats
  playerStats: PlayerStats | null;
  playerStatsLoading: boolean;
  playerStatsError: string | null;
  setPlayerStats: (stats: PlayerStats | null) => void;
  setPlayerStatsLoading: (loading: boolean) => void;
  setPlayerStatsError: (error: string | null) => void;
  
  // Load player stats from hiscores and update calculator inputs
  lookupPlayerStats: (username: string) => Promise<void>;
  
  // Apply player's levels to calculator inputs
  applyPlayerLevelsToCalculator: () => void;
}

// Default calculator input
const defaultCalculatorInput: CalculatorInput = {
  currentLevel: 1,
  targetLevel: 99,
  boosts: {
    outfitBonus: 0,
    additionalBoosts: 0,
  },
};

// Create the store with persistence
export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      // Default to Cooking skill
      activeSkill: "cooking",
      setActiveSkill: (skill) => set({ activeSkill: skill }),
      
      // Initialize with default values for all skills
      calculatorInputs: Object.fromEntries(
        [
          "attack", "strength", "defence", "ranged", "prayer", "magic",
          "runecraft", "construction", "hitpoints", "agility", "herblore",
          "thieving", "crafting", "fletching", "slayer", "hunter",
          "mining", "smithing", "fishing", "cooking", "firemaking",
          "woodcutting", "farming"
        ].map((skill) => [skill, { ...defaultCalculatorInput }])
      ) as Record<SkillName, CalculatorInput>,
      
      // Update calculator input for a specific skill
      updateCalculatorInput: (skill, input) =>
        set((state) => ({
          calculatorInputs: {
            ...state.calculatorInputs,
            [skill]: {
              ...state.calculatorInputs[skill],
              ...input,
            },
          },
        })),
      
      // Default preferences
      preferences: {
        showMembersOnly: true,
        sortBy: "level",
        sortDirection: "asc",
      },
      
      // Update preferences
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...prefs,
          },
        })),
        
      // Player stats state
      playerStats: null,
      playerStatsLoading: false,
      playerStatsError: null,
      setPlayerStats: (stats) => set({ playerStats: stats }),
      setPlayerStatsLoading: (loading) => set({ playerStatsLoading: loading }),
      setPlayerStatsError: (error) => set({ playerStatsError: error }),
      
      // Lookup player stats from the API
      lookupPlayerStats: async (username) => {
        // Reset any previous error
        set({ playerStatsLoading: true, playerStatsError: null });
        
        try {
          const response = await fetch(`/api/hiscores?username=${encodeURIComponent(username)}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch player stats');
          }
          
          const stats = await response.json();
          set({ playerStats: stats, playerStatsLoading: false });
          
          // Automatically apply the player's levels to the calculator
          const state = get();
          if (stats && stats.stats) {
            // For each skill in the calculator, apply the player's level if available
            const updates: Record<SkillName, CalculatorInput> = { ...state.calculatorInputs };
            
            Object.keys(state.calculatorInputs).forEach((skillKey) => {
              const skill = skillKey as SkillName;
              
              if (stats.stats[skill]) {
                updates[skill] = {
                  ...updates[skill],
                  currentLevel: stats.stats[skill].level,
                };
              }
            });
            
            set({ calculatorInputs: updates });
          }
        } catch (error) {
          console.error('Error looking up player stats:', error);
          set({ 
            playerStatsError: error instanceof Error ? error.message : 'Unknown error', 
            playerStatsLoading: false 
          });
        }
      },
      
      // Apply player's current levels to all calculator inputs
      applyPlayerLevelsToCalculator: () => {
        const state = get();
        const { playerStats } = state;
        
        if (!playerStats) return;
        
        // For each skill in the calculator, apply the player's level if available
        const updates: Record<SkillName, CalculatorInput> = { ...state.calculatorInputs };
        
        Object.keys(state.calculatorInputs).forEach((skillKey) => {
          const skill = skillKey as SkillName;
          
          if (playerStats.stats[skill]) {
            updates[skill] = {
              ...updates[skill],
              currentLevel: playerStats.stats[skill].level,
            };
          }
        });
        
        set({ calculatorInputs: updates });
      }
    }),
    {
      name: "osrs-calculator-storage",
    }
  )
); 