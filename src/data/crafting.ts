import { MethodRow } from "@/lib/types";

/**
 * Crafting skill training methods
 */
export const craftingMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "crafting_leather_gloves",
    name: "Leather Gloves",
    skill: "crafting",
    levelReq: 1,
    xpEach: 13.8,
    gpEach: -35,
    itemId: 1741,
    isMembers: false,
    inputItems: [
      { id: 1741, name: "Leather", quantity: 1 },
      { id: 1734, name: "Thread", quantity: 0.25 }
    ],
    outputItems: [
      { id: 1059, name: "Leather gloves", quantity: 1 }
    ]
  },
  {
    id: "crafting_gold_rings",
    name: "Gold Rings",
    skill: "crafting",
    levelReq: 5,
    xpEach: 15,
    gpEach: -45,
    itemId: 2357,
    isMembers: false,
    inputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ],
    outputItems: [
      { id: 1635, name: "Gold ring", quantity: 1 }
    ]
  },
  {
    id: "crafting_gold_necklaces",
    name: "Gold Necklaces",
    skill: "crafting",
    levelReq: 6,
    xpEach: 20,
    gpEach: -60,
    itemId: 2357,
    isMembers: false,
    inputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ],
    outputItems: [
      { id: 1654, name: "Gold necklace", quantity: 1 }
    ]
  },
  {
    id: "crafting_sapphire_rings",
    name: "Sapphire Rings",
    skill: "crafting",
    levelReq: 20,
    xpEach: 40,
    gpEach: -175,
    itemId: 1607,
    isMembers: false,
    inputItems: [
      { id: 1635, name: "Gold ring", quantity: 1 },
      { id: 1607, name: "Sapphire", quantity: 1 }
    ],
    outputItems: [
      { id: 1637, name: "Sapphire ring", quantity: 1 }
    ]
  },
  {
    id: "crafting_sapphire_necklaces",
    name: "Sapphire Necklaces",
    skill: "crafting",
    levelReq: 22,
    xpEach: 55,
    gpEach: -200,
    itemId: 1607,
    isMembers: false,
    inputItems: [
      { id: 1654, name: "Gold necklace", quantity: 1 },
      { id: 1607, name: "Sapphire", quantity: 1 }
    ],
    outputItems: [
      { id: 1656, name: "Sapphire necklace", quantity: 1 }
    ]
  },
  {
    id: "crafting_emerald_rings",
    name: "Emerald Rings",
    skill: "crafting",
    levelReq: 27,
    xpEach: 55,
    gpEach: -225,
    itemId: 1605,
    isMembers: false,
    inputItems: [
      { id: 1635, name: "Gold ring", quantity: 1 },
      { id: 1605, name: "Emerald", quantity: 1 }
    ],
    outputItems: [
      { id: 1639, name: "Emerald ring", quantity: 1 }
    ]
  },
  {
    id: "crafting_ruby_rings",
    name: "Ruby Rings",
    skill: "crafting",
    levelReq: 40,
    xpEach: 70,
    gpEach: -250,
    itemId: 1603,
    isMembers: false,
    inputItems: [
      { id: 1635, name: "Gold ring", quantity: 1 },
      { id: 1603, name: "Ruby", quantity: 1 }
    ],
    outputItems: [
      { id: 1641, name: "Ruby ring", quantity: 1 }
    ]
  },
  {
    id: "crafting_diamond_rings",
    name: "Diamond Rings",
    skill: "crafting",
    levelReq: 43,
    xpEach: 85,
    gpEach: -300,
    itemId: 1601,
    isMembers: false,
    inputItems: [
      { id: 1635, name: "Gold ring", quantity: 1 },
      { id: 1601, name: "Diamond", quantity: 1 }
    ],
    outputItems: [
      { id: 1643, name: "Diamond ring", quantity: 1 }
    ]
  },
  {
    id: "crafting_holy_symbols",
    name: "Holy Symbols",
    skill: "crafting",
    levelReq: 16,
    xpEach: 50,
    gpEach: -80,
    itemId: 2355,
    isMembers: false,
    inputItems: [
      { id: 2357, name: "Silver bar", quantity: 1 }
    ],
    outputItems: [
      { id: 1714, name: "Unstrung symbol", quantity: 1 }
    ]
  },
  {
    id: "crafting_tiaras",
    name: "Tiaras",
    skill: "crafting",
    levelReq: 23,
    xpEach: 52.5,
    gpEach: -75,
    itemId: 2355,
    isMembers: false,
    inputItems: [
      { id: 2357, name: "Silver bar", quantity: 1 }
    ],
    outputItems: [
      { id: 5525, name: "Tiara", quantity: 1 }
    ]
  },
  
  // P2P Methods
  {
    id: "crafting_unpowered_orbs",
    name: "Unpowered Orbs",
    skill: "crafting",
    levelReq: 46,
    xpEach: 52.5,
    gpEach: -90,
    itemId: 1775,
    isMembers: true,
    inputItems: [
      { id: 1775, name: "Molten glass", quantity: 1 }
    ],
    outputItems: [
      { id: 567, name: "Unpowered orb", quantity: 1 }
    ]
  },
  {
    id: "crafting_lantern_lens",
    name: "Lantern Lens",
    skill: "crafting",
    levelReq: 49,
    xpEach: 55,
    gpEach: -100,
    itemId: 1775,
    isMembers: true,
    inputItems: [
      { id: 1775, name: "Molten glass", quantity: 1 }
    ],
    outputItems: [
      { id: 4542, name: "Lantern lens", quantity: 1 }
    ]
  },
  {
    id: "crafting_molten_glass",
    name: "Molten Glass",
    skill: "crafting",
    levelReq: 1,
    xpEach: 20,
    gpEach: -35,
    itemId: 1781,
    isMembers: true,
    inputItems: [
      { id: 1783, name: "Soda ash", quantity: 1 },
      { id: 1781, name: "Bucket of sand", quantity: 1 }
    ],
    outputItems: [
      { id: 1775, name: "Molten glass", quantity: 1 }
    ]
  },
  {
    id: "crafting_dragonhide_bodies",
    name: "Green Dragonhide Bodies",
    skill: "crafting",
    levelReq: 63,
    xpEach: 186,
    gpEach: -450,
    itemId: 1745,
    isMembers: true,
    inputItems: [
      { id: 1745, name: "Green dragon leather", quantity: 3 },
      { id: 1734, name: "Thread", quantity: 1 }
    ],
    outputItems: [
      { id: 1135, name: "Green d'hide body", quantity: 1 }
    ]
  },
  {
    id: "crafting_blue_bodies",
    name: "Blue Dragonhide Bodies",
    skill: "crafting",
    levelReq: 71,
    xpEach: 210,
    gpEach: -650,
    itemId: 2505,
    isMembers: true,
    inputItems: [
      { id: 2505, name: "Blue dragon leather", quantity: 3 },
      { id: 1734, name: "Thread", quantity: 1 }
    ],
    outputItems: [
      { id: 2499, name: "Blue d'hide body", quantity: 1 }
    ]
  },
  {
    id: "crafting_red_bodies",
    name: "Red Dragonhide Bodies",
    skill: "crafting",
    levelReq: 77,
    xpEach: 234,
    gpEach: -900,
    itemId: 2507,
    isMembers: true,
    inputItems: [
      { id: 2507, name: "Red dragon leather", quantity: 3 },
      { id: 1734, name: "Thread", quantity: 1 }
    ],
    outputItems: [
      { id: 2501, name: "Red d'hide body", quantity: 1 }
    ]
  },
  {
    id: "crafting_black_bodies",
    name: "Black Dragonhide Bodies",
    skill: "crafting",
    levelReq: 84,
    xpEach: 258,
    gpEach: -1200,
    itemId: 2509,
    isMembers: true,
    inputItems: [
      { id: 2509, name: "Black dragon leather", quantity: 3 },
      { id: 1734, name: "Thread", quantity: 1 }
    ],
    outputItems: [
      { id: 2503, name: "Black d'hide body", quantity: 1 }
    ]
  },
  {
    id: "crafting_light_orbs",
    name: "Light Orbs",
    skill: "crafting",
    levelReq: 87,
    xpEach: 70,
    gpEach: -140,
    isMembers: true,
    inputItems: [
      { id: 1775, name: "Molten glass", quantity: 1 }
    ],
    outputItems: [
      { id: 10973, name: "Light orb", quantity: 1 }
    ]
  },
  {
    id: "crafting_battlestaves",
    name: "Water Battlestaves",
    skill: "crafting",
    levelReq: 54,
    xpEach: 100,
    gpEach: -500,
    isMembers: true,
    inputItems: [
      { id: 1391, name: "Battlestaff", quantity: 1 },
      { id: 571, name: "Water orb", quantity: 1 }
    ],
    outputItems: [
      { id: 1395, name: "Water battlestaff", quantity: 1 }
    ]
  },
  {
    id: "crafting_air_bstaves",
    name: "Air Battlestaves",
    skill: "crafting",
    levelReq: 66,
    xpEach: 137.5,
    gpEach: -600,
    isMembers: true,
    inputItems: [
      { id: 1391, name: "Battlestaff", quantity: 1 },
      { id: 573, name: "Air orb", quantity: 1 }
    ],
    outputItems: [
      { id: 1397, name: "Air battlestaff", quantity: 1 }
    ]
  },
  {
    id: "crafting_glassblowing",
    name: "Glass Blowing - Lantern Lens",
    skill: "crafting",
    levelReq: 49,
    xpEach: 55,
    gpEach: -100,
    isMembers: true,
    inputItems: [
      { id: 1775, name: "Molten glass", quantity: 1 }
    ],
    outputItems: [
      { id: 4542, name: "Lantern lens", quantity: 1 }
    ]
  },
  {
    id: "crafting_gold_bracelets",
    name: "Gold Bracelets",
    skill: "crafting",
    levelReq: 7,
    xpEach: 25,
    gpEach: -75,
    isMembers: true,
    inputItems: [
      { id: 2357, name: "Gold bar", quantity: 1 }
    ],
    outputItems: [
      { id: 11069, name: "Gold bracelet", quantity: 1 }
    ]
  }
]; 