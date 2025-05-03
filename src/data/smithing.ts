import { MethodRow } from "@/lib/types";

/**
 * Smithing skill training methods
 */
export const smithingMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "smithing_bronze_bars",
    name: "Bronze Bars",
    skill: "smithing",
    levelReq: 1,
    xpEach: 6.25,
    gpEach: 0,
    itemId: 2349,
    isMembers: false,
    estimatedActionsPerHour: 2600,
    inputItems: [
      { id: 436, name: "Copper ore", quantity: 1 },
      { id: 438, name: "Tin ore", quantity: 1 }
    ],
    outputItems: [
      { id: 2349, name: "Bronze bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_iron_bars",
    name: "Iron Bars",
    skill: "smithing",
    levelReq: 15,
    xpEach: 12.5,
    gpEach: 0,
    itemId: 2351,
    isMembers: false,
    estimatedActionsPerHour: 2600,
    inputItems: [
      { id: 440, name: "Iron ore", quantity: 1 }
    ],
    outputItems: [
      { id: 2351, name: "Iron bar", quantity: 0.5 }
    ]
  },
  {
    id: "smithing_steel_bars",
    name: "Steel Bars",
    skill: "smithing",
    levelReq: 30,
    xpEach: 17.5,
    gpEach: 0,
    itemId: 2353,
    isMembers: false,
    estimatedActionsPerHour: 2600,
    inputItems: [
      { id: 440, name: "Iron ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 2 }
    ],
    outputItems: [
      { id: 2353, name: "Steel bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_bronze_platebodies",
    name: "Bronze Platebodies",
    skill: "smithing",
    levelReq: 18,
    xpEach: 62.5,
    gpEach: 0,
    itemId: 1117,
    isMembers: false,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2349, name: "Bronze bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1117, name: "Bronze platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_iron_platebodies",
    name: "Iron Platebodies",
    skill: "smithing",
    levelReq: 33,
    xpEach: 125,
    gpEach: 0,
    itemId: 1115,
    isMembers: false,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2351, name: "Iron bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1115, name: "Iron platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_steel_platebodies",
    name: "Steel Platebodies",
    skill: "smithing",
    levelReq: 48,
    xpEach: 187.5,
    gpEach: 0,
    itemId: 1119,
    isMembers: false,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2353, name: "Steel bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1119, name: "Steel platebody", quantity: 1 }
    ]
  },
  
  // P2P Methods
  {
    id: "smithing_gold_bars_gauntlets",
    name: "Gold Bars (with Gauntlets)",
    skill: "smithing",
    levelReq: 40,
    xpEach: 56.2,
    gpEach: 0,
    itemId: 2357,
    isMembers: true,
    estimatedActionsPerHour: 2600,
    inputItems: [
      { id: 444, name: "Gold ore", quantity: 1 }
    ],
    outputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ],
    notes: "Requires Goldsmith gauntlets from Family Crest quest for bonus XP."
  },
  {
    id: "smithing_blast_furnace_steel",
    name: "Blast Furnace Steel",
    skill: "smithing",
    levelReq: 30,
    xpEach: 17.5,
    gpEach: 0,
    itemId: 2353,
    isMembers: true,
    estimatedActionsPerHour: 4800,
    inputItems: [
      { id: 440, name: "Iron ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 1 }
    ],
    outputItems: [
      { id: 2353, name: "Steel bar", quantity: 1 }
    ],
    notes: "Requires coal bag and ice gloves for maximum efficiency. 60+ Smithing recommended to avoid extra fees."
  },
  {
    id: "smithing_blast_furnace_gold",
    name: "Blast Furnace Gold",
    skill: "smithing",
    levelReq: 40,
    xpEach: 56.2,
    gpEach: 0,
    itemId: 2357,
    isMembers: true,
    estimatedActionsPerHour: 3700,
    inputItems: [
      { id: 444, name: "Gold ore", quantity: 1 }
    ],
    outputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ],
    notes: "Requires Goldsmith gauntlets. 60+ Smithing recommended to avoid extra fees."
  },
  {
    id: "smithing_blast_furnace_mithril",
    name: "Blast Furnace Mithril",
    skill: "smithing",
    levelReq: 50,
    xpEach: 30,
    gpEach: 0,
    itemId: 2359,
    isMembers: true,
    estimatedActionsPerHour: 4000,
    inputItems: [
      { id: 447, name: "Mithril ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 2 }
    ],
    outputItems: [
      { id: 2359, name: "Mithril bar", quantity: 1 }
    ],
    notes: "Requires coal bag and ice gloves for maximum efficiency."
  },
  {
    id: "smithing_mithril_platebodies",
    name: "Mithril Platebodies",
    skill: "smithing",
    levelReq: 68,
    xpEach: 250,
    gpEach: 0,
    itemId: 1121,
    isMembers: true,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2359, name: "Mithril bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1121, name: "Mithril platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_adamant",
    name: "Blast Furnace Adamant",
    skill: "smithing",
    levelReq: 70,
    xpEach: 37.5,
    gpEach: 0,
    itemId: 2361,
    isMembers: true,
    estimatedActionsPerHour: 3800,
    inputItems: [
      { id: 449, name: "Adamantite ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 3 }
    ],
    outputItems: [
      { id: 2361, name: "Adamantite bar", quantity: 1 }
    ],
    notes: "Requires coal bag and ice gloves for maximum efficiency."
  },
  {
    id: "smithing_adamant_platebodies",
    name: "Adamant Platebodies",
    skill: "smithing",
    levelReq: 88,
    xpEach: 312.5,
    gpEach: 0,
    itemId: 1123,
    isMembers: true,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2361, name: "Adamantite bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1123, name: "Adamant platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_rune",
    name: "Blast Furnace Rune",
    skill: "smithing",
    levelReq: 85,
    xpEach: 50,
    gpEach: 0,
    itemId: 2363,
    isMembers: true,
    estimatedActionsPerHour: 3200,
    inputItems: [
      { id: 451, name: "Runite ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 4 }
    ],
    outputItems: [
      { id: 2363, name: "Runite bar", quantity: 1 }
    ],
    notes: "Requires coal bag and ice gloves for maximum efficiency."
  },
  {
    id: "smithing_rune_platebodies",
    name: "Rune Platebodies",
    skill: "smithing",
    levelReq: 99,
    xpEach: 375,
    gpEach: 0,
    itemId: 1127,
    isMembers: true,
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 2363, name: "Runite bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1127, name: "Rune platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_steel_dart_tips",
    name: "Steel Dart Tips",
    skill: "smithing",
    levelReq: 33,
    xpEach: 25,
    gpEach: 0,
    itemId: 821,
    isMembers: true,
    estimatedActionsPerHour: 1750,
    inputItems: [
      { id: 2353, name: "Steel bar", quantity: 1 }
    ],
    outputItems: [
      { id: 821, name: "Steel dart tip", quantity: 10 }
    ]
  },
  {
    id: "smithing_mithril_dart_tips",
    name: "Mithril Dart Tips",
    skill: "smithing",
    levelReq: 54,
    xpEach: 50,
    gpEach: 0,
    itemId: 822,
    isMembers: true,
    estimatedActionsPerHour: 1750,
    inputItems: [
      { id: 2359, name: "Mithril bar", quantity: 1 }
    ],
    outputItems: [
      { id: 822, name: "Mithril dart tip", quantity: 10 }
    ]
  },
  {
    id: "smithing_adamant_dart_tips",
    name: "Adamant Dart Tips",
    skill: "smithing",
    levelReq: 74,
    xpEach: 62.5,
    gpEach: 0,
    itemId: 823,
    isMembers: true,
    estimatedActionsPerHour: 1750,
    inputItems: [
      { id: 2361, name: "Adamantite bar", quantity: 1 }
    ],
    outputItems: [
      { id: 823, name: "Adamant dart tip", quantity: 10 }
    ]
  },
  {
    id: "smithing_rune_dart_tips",
    name: "Rune Dart Tips",
    skill: "smithing",
    levelReq: 89,
    xpEach: 75,
    gpEach: 0,
    itemId: 824,
    isMembers: true,
    estimatedActionsPerHour: 1750,
    inputItems: [
      { id: 2363, name: "Runite bar", quantity: 1 }
    ],
    outputItems: [
      { id: 824, name: "Rune dart tip", quantity: 10 }
    ]
  }
]; 