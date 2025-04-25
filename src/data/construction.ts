import { MethodRow } from "@/lib/types";

/**
 * Construction skill training methods
 */
export const constructionMethods: MethodRow[] = [
  // Initial Methods
  {
    id: "construction_daddys_home",
    name: "Daddy's Home Miniquest",
    skill: "construction",
    levelReq: 1,
    xpEach: 944,
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  },
  
  // Oak furniture methods
  {
    id: "construction_oak_chairs",
    name: "Oak Chairs",
    skill: "construction",
    levelReq: 15,
    xpEach: 120,
    gpEach: -528,
    isMembers: true,
    itemId: 8778,
    inputItems: [
      { id: 8778, name: "Oak plank", quantity: 2 }
    ],
    outputItems: []
  },
  {
    id: "construction_oak_larders",
    name: "Oak Larders",
    skill: "construction",
    levelReq: 33,
    xpEach: 480,
    gpEach: -2112,
    isMembers: true,
    itemId: 8778,
    inputItems: [
      { id: 8778, name: "Oak plank", quantity: 8 }
    ],
    outputItems: []
  },
  {
    id: "construction_mounted_mythical_capes",
    name: "Mounted Mythical Capes",
    skill: "construction",
    levelReq: 50,
    xpEach: 370,
    gpEach: -1584,
    isMembers: true,
    itemId: 8778,
    inputItems: [
      { id: 8778, name: "Oak plank", quantity: 3 },
      { id: 22114, name: "Mythical cape", quantity: 1 }
    ],
    outputItems: []
  },
  
  // Teak furniture methods
  {
    id: "construction_teak_garden_benches",
    name: "Teak Garden Benches",
    skill: "construction",
    levelReq: 66,
    xpEach: 540,
    gpEach: -2304,
    isMembers: true,
    itemId: 8780,
    inputItems: [
      { id: 8780, name: "Teak plank", quantity: 6 }
    ],
    outputItems: []
  },
  
  // Oak dungeon doors
  {
    id: "construction_oak_dungeon_doors",
    name: "Oak Dungeon Doors",
    skill: "construction",
    levelReq: 74,
    xpEach: 600,
    gpEach: -2112,
    isMembers: true,
    itemId: 8778,
    inputItems: [
      { id: 8778, name: "Oak plank", quantity: 10 }
    ],
    outputItems: []
  },
  
  // Mahogany furniture
  {
    id: "construction_mahogany_tables",
    name: "Mahogany Tables",
    skill: "construction",
    levelReq: 52,
    xpEach: 840,
    gpEach: -12750,
    isMembers: true,
    itemId: 8782,
    inputItems: [
      { id: 8782, name: "Mahogany plank", quantity: 6 }
    ],
    outputItems: []
  },
  {
    id: "construction_mahogany_homes_beginner",
    name: "Mahogany Homes (Beginner)",
    skill: "construction",
    levelReq: 1,
    xpEach: 2800,
    gpEach: -5000,
    isMembers: true,
    itemId: 960,
    inputItems: [
      { id: 960, name: "Planks & supplies", quantity: 10 }
    ],
    outputItems: [
      { id: 24711, name: "Carpenter points", quantity: 2 }
    ]
  },
  {
    id: "construction_mahogany_homes_novice",
    name: "Mahogany Homes (Novice)",
    skill: "construction",
    levelReq: 20,
    xpEach: 7000,
    gpEach: -10000,
    isMembers: true,
    itemId: 8778,
    inputItems: [
      { id: 8778, name: "Oak planks & supplies", quantity: 20 }
    ],
    outputItems: [
      { id: 24711, name: "Carpenter points", quantity: 3 }
    ]
  },
  {
    id: "construction_mahogany_homes_adept",
    name: "Mahogany Homes (Adept)",
    skill: "construction",
    levelReq: 50,
    xpEach: 20000,
    gpEach: -20000,
    isMembers: true,
    itemId: 8780,
    inputItems: [
      { id: 8780, name: "Teak planks & supplies", quantity: 20 }
    ],
    outputItems: [
      { id: 24711, name: "Carpenter points", quantity: 4 }
    ]
  },
  {
    id: "construction_mahogany_homes_expert",
    name: "Mahogany Homes (Expert)",
    skill: "construction",
    levelReq: 70,
    xpEach: 40000,
    gpEach: -37500,
    isMembers: true,
    itemId: 8782,
    inputItems: [
      { id: 8782, name: "Mahogany planks & supplies", quantity: 20 }
    ],
    outputItems: [
      { id: 24711, name: "Carpenter points", quantity: 5 }
    ]
  }
]; 