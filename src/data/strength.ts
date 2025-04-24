import { MethodRow } from "@/lib/types";

/**
 * Strength skill training methods
 */
export const strengthMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "strength_quests",
    name: "Questing (1-30)",
    skill: "strength",
    levelReq: 1,
    xpEach: 5000,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "strength_chickens",
    name: "Chickens",
    skill: "strength",
    levelReq: 1,
    xpEach: 12,
    gpEach: 15,
    isMembers: false,
    inputItems: [
      { id: 1321, name: "Iron scimitar", quantity: 0.0001 }
    ],
    outputItems: [
      { id: 526, name: "Bones", quantity: 1 },
      { id: 1944, name: "Feathers", quantity: 5 }
    ]
  },
  {
    id: "strength_hill_giants",
    name: "Hill Giants",
    skill: "strength",
    levelReq: 30,
    xpEach: 40,
    gpEach: 150,
    isMembers: false,
    inputItems: [
      { id: 1365, name: "Rune mace", quantity: 0.0001 }
    ],
    outputItems: [
      { id: 532, name: "Big bones", quantity: 1 }
    ]
  },
  {
    id: "strength_ogress_warriors",
    name: "Ogress Warriors",
    skill: "strength",
    levelReq: 40,
    xpEach: 82,
    gpEach: 450,
    isMembers: false,
    inputItems: [
      { id: 1333, name: "Rune scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_moss_giants",
    name: "Moss Giants",
    skill: "strength",
    levelReq: 40,
    xpEach: 65,
    gpEach: 200,
    isMembers: false,
    inputItems: [
      { id: 1333, name: "Rune scimitar", quantity: 0.0001 }
    ],
    outputItems: [
      { id: 532, name: "Big bones", quantity: 1 }
    ]
  },
  
  // P2P Methods
  {
    id: "strength_sand_crabs",
    name: "Sand Crabs",
    skill: "strength",
    levelReq: 20,
    xpEach: 60,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 1333, name: "Rune scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_ammonite_crabs",
    name: "Ammonite Crabs",
    skill: "strength",
    levelReq: 30,
    xpEach: 85,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 4587, name: "Dragon scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_nmz",
    name: "Nightmare Zone (Obsidian)",
    skill: "strength",
    levelReq: 60,
    xpEach: 93,
    gpEach: -50,
    isMembers: true,
    inputItems: [
      { id: 6528, name: "Obsidian armour", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_dharoks_nmz",
    name: "Nightmare Zone (Dharok's)",
    skill: "strength",
    levelReq: 70,
    xpEach: 120,
    gpEach: -75,
    isMembers: true,
    inputItems: [
      { id: 4716, name: "Dharok's set", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_slayer",
    name: "Slayer Tasks",
    skill: "strength",
    levelReq: 50,
    xpEach: 85,
    gpEach: 300,
    isMembers: true,
    inputItems: [
      { id: 4587, name: "Dragon scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_viggoras_chainmace",
    name: "Revenant Caves (Viggora's)",
    skill: "strength",
    levelReq: 75,
    xpEach: 105,
    gpEach: 700,
    isMembers: true,
    inputItems: [
      { id: 22545, name: "Viggora's chainmace", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "strength_sarachnis",
    name: "Sarachnis",
    skill: "strength",
    levelReq: 80,
    xpEach: 125,
    gpEach: 800,
    isMembers: true,
    inputItems: [
      { id: 4587, name: "Dragon scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  }
]; 