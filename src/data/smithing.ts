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
    gpEach: -68,
    isMembers: false,
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
    gpEach: -98,
    isMembers: false,
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
    gpEach: -250,
    isMembers: false,
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
    gpEach: -390,
    isMembers: false,
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
    gpEach: -490,
    isMembers: false,
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
    gpEach: -690,
    isMembers: false,
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
    gpEach: -250,
    isMembers: true,
    inputItems: [
      { id: 444, name: "Gold ore", quantity: 1 }
    ],
    outputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_mithril_platebodies",
    name: "Mithril Platebodies",
    skill: "smithing",
    levelReq: 68,
    xpEach: 250,
    gpEach: -995,
    isMembers: true,
    inputItems: [
      { id: 2359, name: "Mithril bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1121, name: "Mithril platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_adamant_platebodies",
    name: "Adamant Platebodies",
    skill: "smithing",
    levelReq: 88,
    xpEach: 312.5,
    gpEach: -1450,
    isMembers: true,
    inputItems: [
      { id: 2361, name: "Adamantite bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1123, name: "Adamant platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_rune_platebodies",
    name: "Rune Platebodies",
    skill: "smithing",
    levelReq: 99,
    xpEach: 375,
    gpEach: -3900,
    isMembers: true,
    inputItems: [
      { id: 2363, name: "Runite bar", quantity: 5 }
    ],
    outputItems: [
      { id: 1127, name: "Rune platebody", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_gold",
    name: "Blast Furnace Gold",
    skill: "smithing",
    levelReq: 40,
    xpEach: 56.2,
    gpEach: -200,
    isMembers: true,
    inputItems: [
      { id: 444, name: "Gold ore", quantity: 1 },
      { id: 0, name: "Coal bag (recommended)", quantity: 0 }
    ],
    outputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_steel",
    name: "Blast Furnace Steel",
    skill: "smithing",
    levelReq: 30,
    xpEach: 17.5,
    gpEach: -95,
    isMembers: true,
    inputItems: [
      { id: 440, name: "Iron ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 1 }
    ],
    outputItems: [
      { id: 2353, name: "Steel bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_mithril",
    name: "Blast Furnace Mithril",
    skill: "smithing",
    levelReq: 50,
    xpEach: 30,
    gpEach: -170,
    isMembers: true,
    inputItems: [
      { id: 447, name: "Mithril ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 2 }
    ],
    outputItems: [
      { id: 2359, name: "Mithril bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_adamant",
    name: "Blast Furnace Adamant",
    skill: "smithing",
    levelReq: 70,
    xpEach: 37.5,
    gpEach: -340,
    isMembers: true,
    inputItems: [
      { id: 449, name: "Adamantite ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 3 }
    ],
    outputItems: [
      { id: 2361, name: "Adamantite bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_blast_furnace_rune",
    name: "Blast Furnace Rune",
    skill: "smithing",
    levelReq: 85,
    xpEach: 50,
    gpEach: -720,
    isMembers: true,
    inputItems: [
      { id: 451, name: "Runite ore", quantity: 1 },
      { id: 453, name: "Coal", quantity: 4 }
    ],
    outputItems: [
      { id: 2363, name: "Runite bar", quantity: 1 }
    ]
  },
  {
    id: "smithing_dart_tips",
    name: "Making Dart Tips",
    skill: "smithing",
    levelReq: 33,
    xpEach: 25,
    gpEach: -150,
    isMembers: true,
    inputItems: [
      { id: 2353, name: "Steel bar", quantity: 1 }
    ],
    outputItems: [
      { id: 821, name: "Steel dart tip", quantity: 10 }
    ]
  }
]; 