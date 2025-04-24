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
    gpEach: 50,
    isMembers: false,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Air rune", quantity: 1 }
    ]
  },
  {
    id: "runecrafting_earth_runes",
    name: "Earth Runes",
    skill: "runecraft",
    levelReq: 9,
    xpEach: 6.5,
    gpEach: 51,
    isMembers: false,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 557, name: "Earth rune", quantity: 1 }
    ]
  },
  {
    id: "runecrafting_fire_runes",
    name: "Fire Runes",
    skill: "runecraft",
    levelReq: 14,
    xpEach: 7,
    gpEach: 53,
    isMembers: false,
    inputItems: [
      { id: 1436, name: "Rune essence", quantity: 1 }
    ],
    outputItems: [
      { id: 554, name: "Fire rune", quantity: 1 }
    ]
  },
  
  // Members methods
  {
    id: "runecrafting_zmi_altar",
    name: "ZMI Altar",
    skill: "runecraft",
    levelReq: 50,
    xpEach: 38,
    gpEach: 200,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Random runes", quantity: 2 }
    ]
  },
  {
    id: "runecrafting_blood_runes",
    name: "Blood Runes",
    skill: "runecraft",
    levelReq: 77,
    xpEach: 10.5,
    gpEach: 391,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 565, name: "Blood rune", quantity: 1 }
    ]
  },
  {
    id: "runecrafting_soul_runes",
    name: "Soul Runes",
    skill: "runecraft",
    levelReq: 90,
    xpEach: 10.9,
    gpEach: 220,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 }
    ],
    outputItems: [
      { id: 566, name: "Soul rune", quantity: 1 }
    ]
  },
  
  // Minigames and special methods
  {
    id: "runecrafting_guardians_of_the_rift",
    name: "Guardians of the Rift",
    skill: "runecraft",
    levelReq: 27,
    xpEach: 20000,
    gpEach: 120000,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 26383, name: "Abyssal pearls", quantity: 50 },
      { id: 556, name: "Assorted runes", quantity: 1000 }
    ]
  },
  {
    id: "runecrafting_daeyalt_essence_mining",
    name: "Daeyalt Essence Mining + ZMI",
    skill: "runecraft",
    levelReq: 50,
    xpEach: 52,
    gpEach: 200,
    isMembers: true,
    inputItems: [
      { id: 24704, name: "Daeyalt essence", quantity: 1 }
    ],
    outputItems: [
      { id: 556, name: "Random runes", quantity: 2 }
    ]
  },
  {
    id: "runecrafting_lava_runes",
    name: "Lava Runes",
    skill: "runecraft",
    levelReq: 23,
    xpEach: 10.5,
    gpEach: -150,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 554, name: "Fire rune", quantity: 1 }
    ],
    outputItems: [
      { id: 4699, name: "Lava rune", quantity: 1 }
    ]
  },
  
  // Combination runes
  {
    id: "runecrafting_steam_runes",
    name: "Steam Runes",
    skill: "runecraft",
    levelReq: 19,
    xpEach: 9.5,
    gpEach: 100,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 555, name: "Water rune", quantity: 1 }
    ],
    outputItems: [
      { id: 4694, name: "Steam rune", quantity: 1 }
    ]
  },
  {
    id: "runecrafting_mud_runes",
    name: "Mud Runes",
    skill: "runecraft",
    levelReq: 13,
    xpEach: 9.5,
    gpEach: 326,
    isMembers: true,
    inputItems: [
      { id: 7936, name: "Pure essence", quantity: 1 },
      { id: 557, name: "Earth rune", quantity: 1 }
    ],
    outputItems: [
      { id: 4698, name: "Mud rune", quantity: 1 }
    ]
  }
]; 