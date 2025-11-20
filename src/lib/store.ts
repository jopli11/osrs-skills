"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalculatorInput, SkillName } from "./types";
import { track } from '@vercel/analytics';

// Type for player stats from OSRS highscores
export interface PlayerStats {
  username: string;
  stats: Record<string, { rank: number; level: number; xp: number }>;
}

// Interface for notification
export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
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

  // Sort option for training methods
  sortOption: "level" | "xphr" | "gphr";
  setSortOption: (option: "level" | "xphr" | "gphr") => void;

  // Filter to show only methods available at current level
  showOnlyAvailable: boolean;
  setShowOnlyAvailable: (value: boolean) => void;

  // Player OSRS stats
  playerStats: PlayerStats | null;
  playerStatsLoading: boolean;
  playerStatsError: string | null;
  setPlayerStats: (stats: PlayerStats | null) => void;
  setPlayerStatsLoading: (loading: boolean) => void;
  setPlayerStatsError: (error: string | null) => void;
  
  // Notification for cross-page communication
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  clearNotification: () => void;
  
  // Load player stats from hiscores and update calculator inputs
  lookupPlayerStats: (username: string) => Promise<void>;
  
  // Apply player's levels to calculator inputs
  applyPlayerLevelsToCalculator: () => void;

  // Clear all player stats and reset calculator to default state
  clearPlayerStats: () => void;
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
          "runecraft", "sailing", "construction", "hitpoints", "agility", "herblore",
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
        
      // Sort option for training methods
      sortOption: "level",
      setSortOption: (option) => set({ sortOption: option }),
        
      // Filter to show only methods available at current level
      showOnlyAvailable: false,
      setShowOnlyAvailable: (value) => set({ showOnlyAvailable: value }),
        
      // Player stats state
      playerStats: null,
      playerStatsLoading: false,
      playerStatsError: null,
      
      // Notification state
      notification: null,
      setNotification: (notification) => set({ notification }),
      clearNotification: () => set({ notification: null }),
      
      setPlayerStats: (stats) => set({ playerStats: stats }),
      setPlayerStatsLoading: (loading) => set({ playerStatsLoading: loading }),
      setPlayerStatsError: (error) => set({ playerStatsError: error }),
      
      // Clear all player stats and reset calculator to default state
      clearPlayerStats: () => {
        set({
          playerStats: null,
          playerStatsLoading: false,
          playerStatsError: null
        });
        
        // Also clear any notifications
        set({ notification: null });
      },
      
      // Lookup player stats from the API
      lookupPlayerStats: async (username) => {
        // Reset any previous error and clear old data
        set({ 
          playerStatsLoading: true, 
          playerStatsError: null,
          // Clear previous player stats to prevent persistence of old data
          playerStats: null
        });
        
        try {
          // First attempt
          let response = await fetch(`/api/hiscores?username=${encodeURIComponent(username)}`);
          
          // If the first attempt fails with a 500 error (like a timeout), try once more
          if (response.status === 500) {
            set({ playerStatsError: "First attempt failed, trying again..." });
            // Short delay before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await fetch(`/api/hiscores?username=${encodeURIComponent(username)}`);
          }
          
          if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = errorData.error || 'Failed to fetch player stats';
            
            // Provide more user-friendly error messages
            if (errorMessage.includes('504') || errorMessage.includes('timeout')) {
              errorMessage = "The OSRS Hiscores server is taking too long to respond. This usually happens when their servers are busy. Please try again in a few moments.";
            } else if (response.status === 404) {
              errorMessage = `Player "${username}" not found in the OSRS Hiscores. Check the spelling or try another username.`;
            }
            
            throw new Error(errorMessage);
          }
          
          const stats = await response.json();
          track('PlayerLookup_Success', { username });
          set({ 
            playerStats: stats, 
            playerStatsLoading: false,
            notification: {
              message: `${username}'s stats have been imported and will apply to all skill pages`,
              type: 'success',
              timestamp: Date.now()
            }
          });
          
          // Automatically apply the player's levels to the calculator
          const state = get();
          if (stats && stats.stats) {
            // For each skill in the calculator, apply the player's level if available
            const updates: Record<SkillName, CalculatorInput> = { ...state.calculatorInputs };
            
            Object.keys(state.calculatorInputs).forEach((skillKey) => {
              const skill = skillKey as SkillName;
              
              // Map any alternate skill names
              const lookupSkill = skill === 'runecraft' ? 'runecrafting' : skill;
              
              if (stats.stats[lookupSkill]) {
                updates[skill] = {
                  ...updates[skill],
                  currentLevel: stats.stats[lookupSkill].level,
                };
              }
            });
            
            set({ calculatorInputs: updates });
          }
        } catch (error) {
          console.error('Error looking up player stats:', error);
          
          // Set a user-friendly error message
          let errorMessage = error instanceof Error 
            ? error.message 
            : 'Unknown error occurred while fetching player stats';
            
          // Track different errors
          if (errorMessage.includes('404') || errorMessage.toLowerCase().includes('not found')) {
            track('PlayerLookup_NotFound', { username });
          } else {
            track('PlayerLookup_Error', { username, error: errorMessage });
          }

          // If there are connection issues, provide a more helpful message
          if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
            errorMessage = 'Connection issue when fetching player stats. Please check your internet connection and try again.';
          }
          
          set({ 
            playerStatsError: errorMessage, 
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
          
          // Map any alternate skill names - same as in lookupPlayerStats
          const lookupSkill = skill === 'runecraft' ? 'runecrafting' : skill;
          
          if (playerStats.stats[lookupSkill]) {
            updates[skill] = {
              ...updates[skill],
              currentLevel: playerStats.stats[lookupSkill].level,
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