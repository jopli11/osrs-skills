import { MethodRow } from "@/lib/types";

/**
 * Ranged skill training methods
 */
export const rangedMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "ranged_quests",
    name: "Questing (1-32)",
    skill: "ranged",
    levelReq: 1,
    xpEach: 16662,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: [],
    notes: "Complete Shadow of the Storm, Death to the Dorgeshuun, and Horror from the Deep for a total of 16,662.5 XP."
  },
  {
    id: "ranged_chickens",
    name: "Chickens",
    skill: "ranged",
    levelReq: 1,
    xpEach: 24,
    gpEach: -20,
    isMembers: false,
    estimatedActionsPerHour: 350,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: [],
    notes: "Low-level training method. Use shortbow on rapid with bronze arrows."
  },
  {
    id: "ranged_cows",
    name: "Cows",
    skill: "ranged",
    levelReq: 10,
    xpEach: 32,
    gpEach: -18,
    isMembers: false,
    estimatedActionsPerHour: 400,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: [
      { id: 1739, name: "Cowhide", quantity: 0.8 }
    ],
    notes: "Decent early F2P option. Can collect cowhides to offset arrow costs."
  },
  {
    id: "ranged_hill_giants",
    name: "Hill Giants",
    skill: "ranged",
    levelReq: 25,
    xpEach: 52,
    gpEach: -20,
    isMembers: false,
    estimatedActionsPerHour: 450,
    inputItems: [
      { id: 884, name: "Iron arrows", quantity: 1 }
    ],
    outputItems: [
      { id: 532, name: "Big bones", quantity: 0.8 }
    ],
    notes: "F2P option with better XP than cows. Drops big bones which can be sold."
  },
  {
    id: "ranged_ogress_warriors",
    name: "Ogress Warriors",
    skill: "ranged",
    levelReq: 40,
    xpEach: 82,
    gpEach: 350,
    isMembers: false,
    estimatedActionsPerHour: 400,
    inputItems: [
      { id: 886, name: "Steel arrows", quantity: 1 }
    ],
    outputItems: [],
    notes: "Best F2P training method that also makes profit. Use Maple shortbow."
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
    estimatedActionsPerHour: 1100,
    inputItems: [
      { id: 882, name: "Bronze arrows", quantity: 1 }
    ],
    outputItems: [],
    notes: "AFK training method with high XP rates. Crabs have high HP but 1 defense."
  },
  {
    id: "ranged_ammonite_crabs",
    name: "Ammonite Crabs",
    skill: "ranged",
    levelReq: 30,
    xpEach: 85,
    gpEach: -40,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 886, name: "Steel arrows", quantity: 1 }
    ],
    outputItems: [],
    notes: "Similar to Sand Crabs but with higher HP. Requires bone voyage quest."
  },
  {
    id: "ranged_cannon_ice_trolls",
    name: "Cannon Ice Trolls",
    skill: "ranged",
    levelReq: 40,
    xpEach: 70,
    gpEach: 50,
    isMembers: true,
    estimatedActionsPerHour: 1100,
    inputItems: [
      { id: 2, name: "Cannonball", quantity: 0.8 }
    ],
    outputItems: [],
    notes: "Makes profit while ranging. Set up cannon west of coal rocks on Fremennik Isles."
  },
  {
    id: "ranged_slayer",
    name: "Slayer Tasks",
    skill: "ranged",
    levelReq: 50,
    xpEach: 30000,
    gpEach: 40000,
    isMembers: true,
    estimatedActionsPerHour: 1,
    inputItems: [
      { id: 9185, name: "Rune crossbow", quantity: 0.001 },
      { id: 9144, name: "Runite bolts", quantity: 100 }
    ],
    outputItems: [],
    notes: "Train Ranged through Slayer for passive XP and profit. Rates vary by tasks."
  },
  {
    id: "ranged_red_chins",
    name: "Hunting Red Chinchompas",
    skill: "ranged",
    levelReq: 63,
    xpEach: 265,
    gpEach: 1750,
    isMembers: true,
    estimatedActionsPerHour: 300,
    inputItems: [],
    outputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ],
    notes: "Trains Hunter and makes chinchompas for later Ranged training."
  },
  {
    id: "ranged_mm1_chinning",
    name: "MM1 Red Chinning",
    skill: "ranged",
    levelReq: 60,
    xpEach: 300,
    gpEach: -400,
    isMembers: true,
    estimatedActionsPerHour: 1800,
    inputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ],
    outputItems: [],
    notes: "Throw chinchompas at skeletons in Monkey Madness 1 tunnels. ~300-350k XP/hr."
  },
  {
    id: "ranged_mm2_chinning",
    name: "MM2 Grey Chinning",
    skill: "ranged",
    levelReq: 65,
    xpEach: 350,
    gpEach: -300,
    isMembers: true,
    estimatedActionsPerHour: 2000,
    inputItems: [
      { id: 10033, name: "Chinchompa", quantity: 1 }
    ],
    outputItems: [],
    notes: "Throw grey chinchompas at maniacal monkeys. ~400-450k XP/hr with void."
  },
  {
    id: "ranged_mm2_red_chinning",
    name: "MM2 Red Chinning",
    skill: "ranged",
    levelReq: 70,
    xpEach: 420,
    gpEach: -450,
    isMembers: true,
    estimatedActionsPerHour: 2000,
    inputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ],
    outputItems: [],
    notes: "Throw red chinchompas at maniacal monkeys. ~500-550k XP/hr with void."
  },
  {
    id: "ranged_mm2_black_chinning",
    name: "MM2 Black Chinning",
    skill: "ranged",
    levelReq: 80,
    xpEach: 525,
    gpEach: -750,
    isMembers: true,
    estimatedActionsPerHour: 2000,
    inputItems: [
      { id: 11959, name: "Black chinchompa", quantity: 1 }
    ],
    outputItems: [],
    notes: "Fastest XP method. ~650-750k XP/hr with rigour and void."
  },
  {
    id: "ranged_nmz_msb",
    name: "Nightmare Zone (MSB)",
    skill: "ranged",
    levelReq: 70,
    xpEach: 92,
    gpEach: -42,
    isMembers: true,
    estimatedActionsPerHour: 1500,
    inputItems: [
      { id: 892, name: "Rune arrow", quantity: 1 }
    ],
    outputItems: [],
    notes: "Semi-AFK training with Magic Shortbow. ~80-100k XP/hr."
  },
  {
    id: "ranged_blowpipe_nmz",
    name: "Nightmare Zone (Blowpipe)",
    skill: "ranged",
    levelReq: 75,
    xpEach: 120,
    gpEach: -225,
    isMembers: true,
    estimatedActionsPerHour: 2000,
    inputItems: [
      { id: 12926, name: "Toxic blowpipe", quantity: 0.002 },
      { id: 11875, name: "Adamant dart", quantity: 1 }
    ],
    outputItems: [],
    notes: "Fast and semi-AFK training. ~120-130k XP/hr with absorption potions."
  },
  {
    id: "ranged_pest_control",
    name: "Pest Control",
    skill: "ranged",
    levelReq: 70,
    xpEach: 18000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 4,
    inputItems: [],
    outputItems: [],
    notes: "Around 70-80k XP/hr. Also gets void equipment which is great for ranging."
  }
]; 