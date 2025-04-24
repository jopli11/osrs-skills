import { MethodRow } from "@/lib/types";

/**
 * Defence skill training methods
 */
export const defenceMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "defence_quests",
    name: "Questing (1-25)",
    skill: "defence",
    levelReq: 1,
    xpEach: 3000,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "defence_chickens",
    name: "Chickens",
    skill: "defence",
    levelReq: 1,
    xpEach: 10,
    gpEach: 15,
    isMembers: false,
    inputItems: [
      { id: 1171, name: "Iron med helm", quantity: 0.0001 }
    ],
    outputItems: [
      { id: 526, name: "Bones", quantity: 1 },
      { id: 1944, name: "Feathers", quantity: 5 }
    ]
  },
  {
    id: "defence_hill_giants",
    name: "Hill Giants",
    skill: "defence",
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
    id: "defence_ogress_warriors",
    name: "Ogress Warriors",
    skill: "defence",
    levelReq: 50,
    xpEach: 82,
    gpEach: 450,
    isMembers: false,
    inputItems: [
      { id: 1333, name: "Rune scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "defence_moss_giants",
    name: "Moss Giants",
    skill: "defence",
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
    id: "defence_sand_crabs",
    name: "Sand Crabs",
    skill: "defence",
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
    id: "defence_ammonite_crabs",
    name: "Ammonite Crabs",
    skill: "defence",
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
    id: "defence_nmz",
    name: "Nightmare Zone (Obsidian)",
    skill: "defence",
    levelReq: 70,
    xpEach: 93,
    gpEach: -50,
    isMembers: true,
    inputItems: [
      { id: 6528, name: "Obsidian armour", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "defence_dharoks_nmz",
    name: "Nightmare Zone (Dharok's)",
    skill: "defence",
    levelReq: 70,
    xpEach: 110,
    gpEach: -75,
    isMembers: true,
    inputItems: [
      { id: 4716, name: "Dharok's set", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "defence_slayer",
    name: "Slayer Tasks",
    skill: "defence",
    levelReq: 50,
    xpEach: 75,
    gpEach: 300,
    isMembers: true,
    inputItems: [
      { id: 4587, name: "Dragon scimitar", quantity: 0.0001 }
    ],
    outputItems: []
  },
  {
    id: "defence_mm2_bursting",
    name: "MM2 Bursting (Defensive)",
    skill: "defence",
    levelReq: 70,
    xpEach: 200,
    gpEach: -350,
    isMembers: true,
    inputItems: [
      { id: 560, name: "Death rune", quantity: 4 },
      { id: 562, name: "Chaos rune", quantity: 2 }
    ],
    outputItems: []
  }
]; 