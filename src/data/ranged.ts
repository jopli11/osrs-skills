import { MethodRow } from "@/lib/types";

/**
 * Ranged skill training methods
 */
export const rangedMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "ranged_quests",
    name: "Questing (1-20)",
    skill: "ranged",
    levelReq: 1,
    xpEach: 2500,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "ranged_chickens",
    name: "Chickens",
    skill: "ranged",
    levelReq: 1,
    xpEach: 24,
    gpEach: -20,
    isMembers: false,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_cows",
    name: "Cows",
    skill: "ranged",
    levelReq: 10,
    xpEach: 32,
    gpEach: -18,
    isMembers: false,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: [
      { id: 1739, name: "Cowhide", quantity: 1 }
    ]
  },
  {
    id: "ranged_hill_giants",
    name: "Hill Giants",
    skill: "ranged",
    levelReq: 25,
    xpEach: 52,
    gpEach: -20,
    isMembers: false,
    inputItems: [
      { id: 884, name: "Iron arrows", quantity: 1 }
    ],
    outputItems: [
      { id: 532, name: "Big bones", quantity: 1 }
    ]
  },
  {
    id: "ranged_ogress_warriors",
    name: "Ogress Warriors",
    skill: "ranged",
    levelReq: 40,
    xpEach: 82,
    gpEach: 350,
    isMembers: false,
    inputItems: [
      { id: 886, name: "Steel arrows", quantity: 1 }
    ],
    outputItems: []
  },
  
  // P2P Methods
  {
    id: "ranged_sand_crabs",
    name: "Sand Crabs",
    skill: "ranged",
    levelReq: 20,
    xpEach: 60,
    gpEach: -35,
    isMembers: true,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_ammonite_crabs",
    name: "Ammonite Crabs",
    skill: "ranged",
    levelReq: 30,
    xpEach: 85,
    gpEach: -40,
    isMembers: true,
    inputItems: [
      { id: 886, name: "Steel arrows", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_mm2_chinning",
    name: "MM2 Chinning",
    skill: "ranged",
    levelReq: 65,
    xpEach: 350,
    gpEach: -450,
    isMembers: true,
    inputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_black_chinning",
    name: "MM2 Black Chinning",
    skill: "ranged",
    levelReq: 80,
    xpEach: 525,
    gpEach: -750,
    isMembers: true,
    inputItems: [
      { id: 11959, name: "Black chinchompa", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_nmz",
    name: "Nightmare Zone (MSB)",
    skill: "ranged",
    levelReq: 70,
    xpEach: 92,
    gpEach: -42,
    isMembers: true,
    inputItems: [
      { id: 892, name: "Rune arrow", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_blowpipe_nmz",
    name: "Nightmare Zone (Blowpipe)",
    skill: "ranged",
    levelReq: 75,
    xpEach: 120,
    gpEach: -225,
    isMembers: true,
    inputItems: [
      { id: 12926, name: "Toxic blowpipe", quantity: 0.002 },
      { id: 11875, name: "Adamant dart", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_slayer",
    name: "Slayer Tasks",
    skill: "ranged",
    levelReq: 50,
    xpEach: 100,
    gpEach: 150,
    isMembers: true,
    inputItems: [
      { id: 9185, name: "Rune crossbow", quantity: 0.001 },
      { id: 9144, name: "Runite bolts", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "ranged_red_chins",
    name: "Hunting Red Chinchompas",
    skill: "ranged",
    levelReq: 63,
    xpEach: 265,
    gpEach: 1750,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ]
  }
]; 