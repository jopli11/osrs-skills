import { MethodRow } from "@/lib/types";

/**
 * Fletching skill training methods
 */
export const fletchingMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "fletching_arrow_shafts",
    name: "Arrow Shafts",
    skill: "fletching",
    levelReq: 1,
    xpEach: 5,
    gpEach: -10,
    itemId: 1511, // Logs ID
    isMembers: false,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 }
    ],
    outputItems: [
      { id: 52, name: "Arrow shaft", quantity: 15 }
    ]
  },
  {
    id: "fletching_headless_arrows",
    name: "Headless Arrows",
    skill: "fletching",
    levelReq: 1,
    xpEach: 1,
    gpEach: -2,
    itemId: 314, // Feather ID
    isMembers: false,
    inputItems: [
      { id: 52, name: "Arrow shaft", quantity: 1 },
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 53, name: "Headless arrow", quantity: 1 }
    ]
  },
  {
    id: "fletching_bronze_arrows",
    name: "Bronze Arrows",
    skill: "fletching",
    levelReq: 1,
    xpEach: 1.3,
    gpEach: -3,
    itemId: 39, // Bronze arrowtips ID
    isMembers: false,
    inputItems: [
      { id: 53, name: "Headless arrow", quantity: 1 },
      { id: 39, name: "Bronze arrowtips", quantity: 1 }
    ],
    outputItems: [
      { id: 882, name: "Bronze arrow", quantity: 1 }
    ]
  },
  {
    id: "fletching_iron_arrows",
    name: "Iron Arrows",
    skill: "fletching",
    levelReq: 15,
    xpEach: 2.5,
    gpEach: -5,
    itemId: 40, // Iron arrowtips ID
    isMembers: false,
    inputItems: [
      { id: 53, name: "Headless arrow", quantity: 1 },
      { id: 40, name: "Iron arrowtips", quantity: 1 }
    ],
    outputItems: [
      { id: 884, name: "Iron arrow", quantity: 1 }
    ]
  },
  {
    id: "fletching_steel_arrows",
    name: "Steel Arrows",
    skill: "fletching",
    levelReq: 30,
    xpEach: 5,
    gpEach: -8,
    itemId: 41, // Steel arrowtips ID
    isMembers: false,
    inputItems: [
      { id: 53, name: "Headless arrow", quantity: 1 },
      { id: 41, name: "Steel arrowtips", quantity: 1 }
    ],
    outputItems: [
      { id: 886, name: "Steel arrow", quantity: 1 }
    ]
  },
  
  // P2P Methods - Bows
  {
    id: "fletching_shortbows",
    name: "Shortbows (u)",
    skill: "fletching",
    levelReq: 5,
    xpEach: 5,
    gpEach: -15,
    itemId: 1511, // Logs ID
    isMembers: true,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 50, name: "Shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_longbows",
    name: "Longbows (u)",
    skill: "fletching",
    levelReq: 10,
    xpEach: 10,
    gpEach: -15,
    itemId: 1511, // Logs ID
    isMembers: true,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 48, name: "Longbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_oak_shortbows",
    name: "Oak Shortbows (u)",
    skill: "fletching",
    levelReq: 20,
    xpEach: 16.5,
    gpEach: -20,
    itemId: 1521, // Oak logs ID
    isMembers: true,
    inputItems: [
      { id: 1521, name: "Oak logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 54, name: "Oak shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_oak_longbows",
    name: "Oak Longbows (u)",
    skill: "fletching",
    levelReq: 25,
    xpEach: 25,
    gpEach: -20,
    itemId: 1521, // Oak logs ID
    isMembers: true,
    inputItems: [
      { id: 1521, name: "Oak logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 56, name: "Oak longbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_willow_shortbows",
    name: "Willow Shortbows (u)",
    skill: "fletching",
    levelReq: 35,
    xpEach: 33.3,
    gpEach: -25,
    itemId: 1519, // Willow logs ID
    isMembers: true,
    inputItems: [
      { id: 1519, name: "Willow logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 60, name: "Willow shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_willow_longbows",
    name: "Willow Longbows (u)",
    skill: "fletching",
    levelReq: 40,
    xpEach: 41.5,
    gpEach: -25,
    itemId: 1519, // Willow logs ID
    isMembers: true,
    inputItems: [
      { id: 1519, name: "Willow logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 58, name: "Willow longbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_maple_shortbows",
    name: "Maple Shortbows (u)",
    skill: "fletching",
    levelReq: 50,
    xpEach: 50,
    gpEach: -30,
    itemId: 1517, // Maple logs ID
    isMembers: true,
    inputItems: [
      { id: 1517, name: "Maple logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 64, name: "Maple shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_maple_longbows",
    name: "Maple Longbows (u)",
    skill: "fletching",
    levelReq: 55,
    xpEach: 58.3,
    gpEach: -30,
    itemId: 1517, // Maple logs ID
    isMembers: true,
    inputItems: [
      { id: 1517, name: "Maple logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 62, name: "Maple longbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_yew_shortbows",
    name: "Yew Shortbows (u)",
    skill: "fletching",
    levelReq: 65,
    xpEach: 67.5,
    gpEach: -50,
    itemId: 1515, // Yew logs ID
    isMembers: true,
    inputItems: [
      { id: 1515, name: "Yew logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 68, name: "Yew shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_yew_longbows",
    name: "Yew Longbows (u)",
    skill: "fletching",
    levelReq: 70,
    xpEach: 75,
    gpEach: -50,
    itemId: 1515, // Yew logs ID
    isMembers: true,
    inputItems: [
      { id: 1515, name: "Yew logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 66, name: "Yew longbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_magic_shortbows",
    name: "Magic Shortbows (u)",
    skill: "fletching",
    levelReq: 80,
    xpEach: 83.3,
    gpEach: -120,
    itemId: 1513, // Magic logs ID
    isMembers: true,
    inputItems: [
      { id: 1513, name: "Magic logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 72, name: "Magic shortbow (u)", quantity: 1 }
    ]
  },
  {
    id: "fletching_magic_longbows",
    name: "Magic Longbows (u)",
    skill: "fletching",
    levelReq: 85,
    xpEach: 91.5,
    gpEach: -120,
    itemId: 1513, // Magic logs ID
    isMembers: true,
    inputItems: [
      { id: 1513, name: "Magic logs", quantity: 1 },
      { id: 946, name: "Knife", quantity: 0 }
    ],
    outputItems: [
      { id: 70, name: "Magic longbow (u)", quantity: 1 }
    ]
  },
  
  // P2P Methods - Bolts & Darts
  {
    id: "fletching_bronze_bolts",
    name: "Bronze Bolts",
    skill: "fletching",
    levelReq: 9,
    xpEach: 0.5,
    gpEach: -2,
    itemId: 9375, // Bronze bolts (unf) ID
    isMembers: true,
    inputItems: [
      { id: 9375, name: "Bronze bolts (unf)", quantity: 1 },
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 877, name: "Bronze bolts", quantity: 1 }
    ]
  },
  {
    id: "fletching_adamant_darts",
    name: "Adamant Darts",
    skill: "fletching",
    levelReq: 67,
    xpEach: 7.5,
    gpEach: -30,
    itemId: 823, // Adamant dart tip ID
    isMembers: true,
    inputItems: [
      { id: 823, name: "Adamant dart tip", quantity: 1 },
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 810, name: "Adamant dart", quantity: 1 }
    ]
  },
  {
    id: "fletching_mithril_darts",
    name: "Mithril Darts",
    skill: "fletching",
    levelReq: 57,
    xpEach: 4,
    gpEach: -20,
    itemId: 822, // Mithril dart tip ID
    isMembers: true,
    inputItems: [
      { id: 822, name: "Mithril dart tip", quantity: 1 },
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 809, name: "Mithril dart", quantity: 1 }
    ]
  },
  {
    id: "fletching_dragon_darts",
    name: "Dragon Darts",
    skill: "fletching",
    levelReq: 95,
    xpEach: 25,
    gpEach: -300,
    itemId: 11232, // Dragon dart tip ID
    isMembers: true,
    inputItems: [
      { id: 11232, name: "Dragon dart tip", quantity: 1 },
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 11230, name: "Dragon dart", quantity: 1 }
    ]
  },
  
  // P2P - Stringing bows
  {
    id: "fletching_string_maple_longbow",
    name: "Stringing Maple Longbows",
    skill: "fletching",
    levelReq: 55,
    xpEach: 58.3,
    gpEach: -20,
    itemId: 62, // Maple longbow (u) ID
    isMembers: true,
    inputItems: [
      { id: 62, name: "Maple longbow (u)", quantity: 1 },
      { id: 1777, name: "Bow string", quantity: 1 }
    ],
    outputItems: [
      { id: 63, name: "Maple longbow", quantity: 1 }
    ]
  },
  {
    id: "fletching_string_yew_longbow",
    name: "Stringing Yew Longbows",
    skill: "fletching",
    levelReq: 70,
    xpEach: 75,
    gpEach: -25,
    itemId: 66, // Yew longbow (u) ID
    isMembers: true,
    inputItems: [
      { id: 66, name: "Yew longbow (u)", quantity: 1 },
      { id: 1777, name: "Bow string", quantity: 1 }
    ],
    outputItems: [
      { id: 855, name: "Yew longbow", quantity: 1 }
    ]
  },
  {
    id: "fletching_string_magic_longbow",
    name: "Stringing Magic Longbows",
    skill: "fletching",
    levelReq: 85,
    xpEach: 91.5,
    gpEach: -30,
    itemId: 70, // Magic longbow (u) ID
    isMembers: true,
    inputItems: [
      { id: 70, name: "Magic longbow (u)", quantity: 1 },
      { id: 1777, name: "Bow string", quantity: 1 }
    ],
    outputItems: [
      { id: 859, name: "Magic longbow", quantity: 1 }
    ]
  }
]; 