"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalculatorInput, SkillName } from "./types";

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
    (set) => ({
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
    }),
    {
      name: "osrs-calculator-storage",
    }
  )
); 