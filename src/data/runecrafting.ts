import { MethodRow } from "@/lib/types";

/**
 * Runecraft skill training methods
 */
export const runecraftingMethods: MethodRow[] = [
  // Basic runes
  {
    id: "runecrafting_air_runes",
    name: "Air Runes",
    skill: "runecraft",
    levelReq: 1,
    xpEach: 5,
    gpEach: 0,
    itemId: 556,
    isMembers: false,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Air rune", quantity: 1 }
    ],
    notes: "Fast F2P method with limited profit."
  },
  {
    id: "runecrafting_earth_runes",
    name: "Earth Runes",
    skill: "runecraft",
    levelReq: 9,
    xpEach: 6.5,
    gpEach: 0,
    itemId: 557,
    isMembers: false,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 557, name: "Earth rune", quantity: 1 }
    ],
    notes: "Decent F2P experience with some profit."
  },
  {
    id: "runecrafting_fire_runes",
    name: "Fire Runes",
    skill: "runecraft",
    levelReq: 14,
    xpEach: 7,
    gpEach: 0,
    itemId: 554,
    isMembers: false,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 554, name: "Fire rune", quantity: 1 }
    ],
    notes: "Decent F2P experience with some profit."
  },
  
  // Members methods
  {
    id: "runecrafting_zmi_altar",
    name: "ZMI Altar",
    skill: "runecraft",
    levelReq: 50,
    xpEach: 38,
    gpEach: 0,
    itemId: 7936,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Air rune", quantity: 0.3 },
      { id: 555, name: "Water rune", quantity: 0.2 },
      { id: 557, name: "Earth rune", quantity: 0.2 },
      { id: 554, name: "Fire rune", quantity: 0.2 },
      { id: 559, name: "Body rune", quantity: 0.15 },
      { id: 558, name: "Mind rune", quantity: 0.15 },
      { id: 562, name: "Chaos rune", quantity: 0.1 },
      { id: 561, name: "Nature rune", quantity: 0.05 },
      { id: 560, name: "Death rune", quantity: 0.03 },
      { id: 565, name: "Blood rune", quantity: 0.01 }
    ],
    notes: "Good mix of experience and profit. XP scales with level."
  },
  {
    id: "runecrafting_blood_runes",
    name: "Blood Runes",
    skill: "runecraft",
    levelReq: 77,
    xpEach: 10.5,
    gpEach: 0,
    itemId: 565,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 565, name: "Blood rune", quantity: 1 }
    ],
    notes: "Good profit and afkable at the Arceuus library method."
  },
  {
    id: "runecrafting_soul_runes",
    name: "Soul Runes",
    skill: "runecraft",
    levelReq: 90,
    xpEach: 10.9,
    gpEach: 0,
    itemId: 566,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 566, name: "Soul rune", quantity: 1 }
    ],
    notes: "High level method with decent profit and experience."
  },
  
  // Minigames and special methods
  {
    id: "runecrafting_guardians_of_the_rift",
    name: "Guardians of the Rift",
    skill: "runecraft",
    levelReq: 27,
    xpEach: 1,
    gpEach: 0,
    itemId: 26383,
    isMembers: true,
    estimatedActionsPerHour: 7500,
    inputItems: [],
    outputItems: [
      { id: 26383, name: "Abyssal pearls", quantity: 2.14 },
      { id: 556, name: "Air rune", quantity: 18 },
      { id: 555, name: "Water rune", quantity: 18 },
      { id: 557, name: "Earth rune", quantity: 18 },
      { id: 554, name: "Fire rune", quantity: 18 },
      { id: 559, name: "Body rune", quantity: 9 },
      { id: 558, name: "Mind rune", quantity: 9 },
      { id: 562, name: "Chaos rune", quantity: 4.5 },
      { id: 561, name: "Nature rune", quantity: 4.5 },
      { id: 560, name: "Death rune", quantity: 2.5 },
      { id: 565, name: "Blood rune", quantity: 1.8 },
      { id: 566, name: "Soul rune", quantity: 0.9 }
    ],
    notes: "XP rates scale with Runecrafting level: ~20k XP/hr at level 27, ~35k XP/hr at level 60, ~50k XP/hr at level 90. A game takes about 10 minutes and includes mining guardian fragments, crafting guardian essence, and powering the Great Guardian. Also provides decent profit through rewards."
  },
  {
    id: "runecrafting_daeyalt_essence_mining",
    name: "Daeyalt Essence Mining + ZMI",
    skill: "runecraft",
    levelReq: 50,
    xpEach: 52,
    gpEach: 0,
    itemId: 24704,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 24704, name: "Daeyalt essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Air rune", quantity: 0.4 },
      { id: 555, name: "Water rune", quantity: 0.3 },
      { id: 557, name: "Earth rune", quantity: 0.3 },
      { id: 554, name: "Fire rune", quantity: 0.3 },
      { id: 559, name: "Body rune", quantity: 0.2 },
      { id: 558, name: "Mind rune", quantity: 0.2 },
      { id: 562, name: "Chaos rune", quantity: 0.15 },
      { id: 561, name: "Nature rune", quantity: 0.07 },
      { id: 560, name: "Death rune", quantity: 0.05 },
      { id: 565, name: "Blood rune", quantity: 0.02 }
    ],
    notes: "Mine Daeyalt essence then use at ZMI for 50% more XP."
  },
  {
    id: "runecrafting_lava_runes",
    name: "Lava Runes",
    skill: "runecraft",
    levelReq: 23,
    xpEach: 10.5,
    gpEach: 0,
    itemId: 4699,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 554, name: "Fire rune", quantity: 1 },
      { id: 5515, name: "Earth talisman", quantity: 0.02 },
      { id: 12630, name: "Magic imbue cast", quantity: 0.1 }
    ],
    outputItems: [
      { id: 4699, name: "Lava rune", quantity: 1 }
    ],
    notes: "Fastest XP method but costly. Requires Magic Imbue spell or Earth talismans."
  },
  
  // Combination runes
  {
    id: "runecrafting_steam_runes",
    name: "Steam Runes",
    skill: "runecraft",
    levelReq: 19,
    xpEach: 9.5,
    gpEach: 0,
    itemId: 4694,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 555, name: "Water rune", quantity: 1 },
      { id: 5514, name: "Fire talisman", quantity: 0.02 }
    ],
    outputItems: [
      { id: 4694, name: "Steam rune", quantity: 1 }
    ],
    notes: "Decent XP and usually profitable with binding necklace."
  },
  {
    id: "runecrafting_mud_runes",
    name: "Mud Runes",
    skill: "runecraft",
    levelReq: 13,
    xpEach: 9.5,
    gpEach: 0,
    itemId: 4698,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 555, name: "Water rune", quantity: 1 },
      { id: 5535, name: "Earth talisman", quantity: 0.02 }
    ],
    outputItems: [
      { id: 4698, name: "Mud rune", quantity: 1 }
    ],
    notes: "Very profitable but slower XP. Used for Humidify spell."
  }
]; 