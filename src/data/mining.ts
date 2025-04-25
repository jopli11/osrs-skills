import { MethodRow } from "@/lib/types";

/**
 * Mining skill training methods
 */
export const miningMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "copper_tin",
    name: "Copper & Tin",
    skill: "mining",
    levelReq: 1,
    xpEach: 17.5,
    gpEach: 15,
    itemId: 436,
    outputItems: [
      { id: 436, name: "Copper ore", quantity: 0.5 },
      { id: 438, name: "Tin ore", quantity: 0.5 }
    ],
    isMembers: false
  },
  {
    id: "iron_ore",
    name: "Iron Ore",
    skill: "mining",
    levelReq: 15,
    xpEach: 35,
    gpEach: 25,
    itemId: 440,
    outputItems: [
      { id: 440, name: "Iron ore", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "power_iron",
    name: "Power Mining Iron",
    skill: "mining",
    levelReq: 15,
    xpEach: 35,
    gpEach: 0, // No profit as ores are dropped
    outputItems: [], // No outputs as ores are dropped
    isMembers: false
  },
  {
    id: "coal",
    name: "Coal",
    skill: "mining",
    levelReq: 30,
    xpEach: 50,
    gpEach: 85,
    itemId: 453,
    outputItems: [
      { id: 453, name: "Coal", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "rune_f2p",
    name: "Runite Ore (F2P)",
    skill: "mining",
    levelReq: 85,
    xpEach: 125,
    gpEach: 10000,
    itemId: 451,
    outputItems: [
      { id: 451, name: "Runite ore", quantity: 1 }
    ],
    isMembers: false
  },
  
  // P2P Methods - Fastest methods
  {
    id: "questing",
    name: "Questing (Fast 1-37)",
    skill: "mining",
    levelReq: 1,
    xpEach: 27525, // Total XP from all quests
    gpEach: 0,
    outputItems: [],
    isMembers: true
  },
  {
    id: "3tick_iron",
    name: "3-Tick Iron",
    skill: "mining",
    levelReq: 15,
    xpEach: 35,
    gpEach: 0, // No profit as ores are dropped
    outputItems: [],
    isMembers: true
  },
  {
    id: "granite",
    name: "Granite",
    skill: "mining",
    levelReq: 45,
    xpEach: 65,
    gpEach: 0, // No profit as granite is dropped
    outputItems: [],
    isMembers: true
  },
  {
    id: "3tick_granite",
    name: "3-Tick Granite",
    skill: "mining",
    levelReq: 45,
    xpEach: 65,
    gpEach: 0, // No profit as granite is dropped
    outputItems: [],
    isMembers: true
  },
  
  // P2P Methods - Other
  {
    id: "motherlode_mine",
    name: "Motherlode Mine",
    skill: "mining",
    levelReq: 30,
    xpEach: 60, // Average XP per paydirt
    gpEach: 100, // Approximate profit per paydirt
    outputItems: [
      { id: 453, name: "Coal", quantity: 0.4 },
      { id: 449, name: "Mithril ore", quantity: 0.2 },
      { id: 447, name: "Adamantite ore", quantity: 0.05 },
      { id: 451, name: "Runite ore", quantity: 0.01 },
      { id: 12012, name: "Golden nugget", quantity: 0.027 }
    ],
    isMembers: true
  },
  {
    id: "motherlode_upper",
    name: "Motherlode Mine (Upper Level)",
    skill: "mining",
    levelReq: 72,
    xpEach: 60, // Average XP per paydirt
    gpEach: 150, // Approximate profit per paydirt
    outputItems: [
      { id: 453, name: "Coal", quantity: 0.4 },
      { id: 449, name: "Mithril ore", quantity: 0.2 },
      { id: 447, name: "Adamantite ore", quantity: 0.1 },
      { id: 451, name: "Runite ore", quantity: 0.02 },
      { id: 12012, name: "Golden nugget", quantity: 0.027 }
    ],
    isMembers: true
  },
  {
    id: "gem_rocks",
    name: "Gem Rocks",
    skill: "mining",
    levelReq: 40,
    xpEach: 65,
    gpEach: 600, // Average profit per gem
    itemId: 1625,
    outputItems: [
      { id: 1625, name: "Uncut sapphire", quantity: 0.2 },
      { id: 1627, name: "Uncut emerald", quantity: 0.1 },
      { id: 1629, name: "Uncut ruby", quantity: 0.05 },
      { id: 1623, name: "Uncut diamond", quantity: 0.025 }
    ],
    isMembers: true
  },
  {
    id: "gem_rocks_3tick",
    name: "Gem Rocks (3-tick)",
    skill: "mining",
    levelReq: 40,
    xpEach: 65,
    gpEach: 600, // Average profit per gem
    itemId: 1625,
    outputItems: [
      { id: 1625, name: "Uncut sapphire", quantity: 0.2 },
      { id: 1627, name: "Uncut emerald", quantity: 0.1 },
      { id: 1629, name: "Uncut ruby", quantity: 0.05 },
      { id: 1623, name: "Uncut diamond", quantity: 0.025 }
    ],
    isMembers: true
  },
  {
    id: "volcanic_mine",
    name: "Volcanic Mine",
    skill: "mining",
    levelReq: 50,
    xpEach: 60, // XP is calculated differently, this is approximate
    gpEach: 0, // No direct profit
    outputItems: [],
    isMembers: true
  },
  {
    id: "calcified_rocks",
    name: "Calcified Rocks",
    skill: "mining",
    levelReq: 41,
    xpEach: 45,
    gpEach: 0, // Not primarily for profit
    outputItems: [
      { id: 30349, name: "Blessed bone shards", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "crashed_stars",
    name: "Crashed Stars",
    skill: "mining",
    levelReq: 10,
    xpEach: 50, // Varies by tier, this is approximate
    gpEach: 0, // Not primarily for profit
    outputItems: [
      { id: 27451, name: "Stardust", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "zalcano",
    name: "Zalcano",
    skill: "mining",
    levelReq: 70,
    xpEach: 100, // XP is calculated differently, this is approximate
    gpEach: 2000, // Average profit per kill
    outputItems: [
      { id: 23866, name: "Crystal shard", quantity: 3 },
      { id: 23877, name: "Zalcano shard", quantity: 0.005 }
    ],
    isMembers: true
  },
  {
    id: "blast_mine",
    name: "Blast Mine",
    skill: "mining",
    levelReq: 43,
    xpEach: 200, // XP is calculated differently, this is approximate
    gpEach: 400, // Average profit per blast
    outputItems: [
      { id: 453, name: "Coal", quantity: 0.5 },
      { id: 449, name: "Mithril ore", quantity: 0.3 },
      { id: 447, name: "Adamantite ore", quantity: 0.1 }
    ],
    isMembers: true
  },
  {
    id: "blast_mine_rune",
    name: "Blast Mine (75+)",
    skill: "mining",
    levelReq: 75,
    xpEach: 250, // XP is calculated differently, this is approximate
    gpEach: 800, // Average profit per blast
    outputItems: [
      { id: 453, name: "Coal", quantity: 0.4 },
      { id: 449, name: "Mithril ore", quantity: 0.3 },
      { id: 447, name: "Adamantite ore", quantity: 0.2 },
      { id: 451, name: "Runite ore", quantity: 0.1 }
    ],
    isMembers: true
  },
  {
    id: "rune_p2p",
    name: "Runite Ore",
    skill: "mining",
    levelReq: 85,
    xpEach: 125,
    gpEach: 10000,
    itemId: 451,
    outputItems: [
      { id: 451, name: "Runite ore", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "amethyst",
    name: "Amethyst",
    skill: "mining",
    levelReq: 92,
    xpEach: 240,
    gpEach: 1500,
    itemId: 21347,
    outputItems: [
      { id: 21347, name: "Amethyst", quantity: 1 }
    ],
    isMembers: true
  }
]; 