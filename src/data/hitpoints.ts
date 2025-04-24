import { MethodRow } from "@/lib/types";

/**
 * Hitpoints skill training methods
 */
export const hitpointsMethods: MethodRow[] = [
  // Combat methods - these gain HP XP passively while training other combat skills
  {
    id: "hitpoints_passive_melee_training",
    name: "Passive Melee Training",
    skill: "hitpoints",
    levelReq: 1,
    xpEach: 1.33, // This represents HP XP per combat XP (roughly)
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "hitpoints_passive_ranged_training",
    name: "Passive Ranged Training",
    skill: "hitpoints",
    levelReq: 1,
    xpEach: 1.33,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "hitpoints_passive_magic_training",
    name: "Passive Magic Training (Combat Spells)",
    skill: "hitpoints",
    levelReq: 1,
    xpEach: 1.33,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  
  // Intentional HP training (for those who want to specifically train HP)
  {
    id: "hitpoints_pest_control",
    name: "Pest Control",
    skill: "hitpoints",
    levelReq: 40,
    xpEach: 35000, // XP per hour at approximate mid-levels
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  },

  // P2P Methods
  {
    id: "hitpoints_pyramid_plunder",
    name: "Pyramid Plunder",
    skill: "hitpoints",
    levelReq: 21,
    xpEach: 15000, // XP per hour from taking damage while thieving
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 3730, name: "Food", quantity: 5 }
    ],
    outputItems: []
  },
  {
    id: "hitpoints_organized_crime",
    name: "Organized Crime",
    skill: "hitpoints",
    levelReq: 40, 
    xpEach: 22000, // XP per hour estimate
    gpEach: 20000,
    isMembers: true,
    inputItems: [
      { id: 3730, name: "Food", quantity: 6 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 20000 }
    ]
  },
  
  // Nightmare Zone
  {
    id: "hitpoints_nightmare_zone",
    name: "Nightmare Zone (Normal)",
    skill: "hitpoints",
    levelReq: 60,
    xpEach: 60000, // XP per hour estimate
    gpEach: -28000, // Cost per hour for potions/supplies
    isMembers: true,
    inputItems: [
      { id: 3730, name: "Absorptions & Overloads", quantity: 28000 }
    ],
    outputItems: [
      { id: 11849, name: "NMZ points", quantity: 300000 }
    ]
  },
  {
    id: "hitpoints_nightmare_zone_dharok",
    name: "Nightmare Zone (Dharok's)",
    skill: "hitpoints",
    levelReq: 70,
    xpEach: 80000, // XP per hour estimate
    gpEach: -35000, // Cost per hour for potions/supplies
    isMembers: true,
    inputItems: [
      { id: 3730, name: "Absorptions & Overloads", quantity: 35000 }
    ],
    outputItems: [
      { id: 11849, name: "NMZ points", quantity: 400000 }
    ]
  },

  // Expensive but fast methods
  {
    id: "hitpoints_dagannoth_with_chins",
    name: "Dagannoth with Red Chinchompas",
    skill: "hitpoints",
    levelReq: 65,
    xpEach: 120000, // XP per hour estimate
    gpEach: -200000, // Cost per hour for chins and supplies
    isMembers: true,
    inputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1000 },
      { id: 3730, name: "Supplies", quantity: 50000 }
    ],
    outputItems: []
  },
  {
    id: "hitpoints_mm2_monkeys_with_chins",
    name: "MM2 Monkeys with Black Chinchompas",
    skill: "hitpoints",
    levelReq: 80,
    xpEach: 180000, // XP per hour estimate
    gpEach: -350000, // Cost per hour for chins and supplies
    isMembers: true,
    inputItems: [
      { id: 10034, name: "Black chinchompa", quantity: 1200 },
      { id: 3730, name: "Supplies", quantity: 50000 }
    ],
    outputItems: []
  },
  
  // Lamp methods
  {
    id: "hitpoints_xp_lamps",
    name: "XP Lamps (Quests & Diaries)",
    skill: "hitpoints",
    levelReq: 1,
    xpEach: 2500, // Average XP per lamp
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  },
  
  // Healing methods - very inefficient but possible
  {
    id: "hitpoints_rock_cake_guzzling",
    name: "Guzzling Rock Cake + Healing",
    skill: "hitpoints",
    levelReq: 1,
    xpEach: 4000, // XP per hour estimate (very slow)
    gpEach: -15000, // Cost of food per hour
    isMembers: true,
    inputItems: [
      { id: 7510, name: "Dwarven rock cake", quantity: 1 },
      { id: 385, name: "Shark", quantity: 30 }
    ],
    outputItems: []
  }
]; 