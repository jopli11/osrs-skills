import { MethodRow } from "@/lib/types";

/**
 * Farming skill training methods
 */
export const farmingMethods: MethodRow[] = [
  {
    id: "farming_quests",
    name: "Questing (1-38)",
    skill: "farming",
    levelReq: 1,
    xpEach: 32500,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Quest requirements", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_bagged_plants",
    name: "Bagged Plants (1-15)",
    skill: "farming",
    levelReq: 1,
    xpEach: 31,
    gpEach: -1712,
    itemId: 8458,
    isMembers: true,
    inputItems: [
      { id: 8458, name: "Bagged plant 1", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_allotments_low",
    name: "Allotments (1-15)",
    skill: "farming",
    levelReq: 1,
    xpEach: 40,
    gpEach: -50,
    itemId: 5318,
    isMembers: true,
    inputItems: [
      { id: 5318, name: "Potato seed", quantity: 3 }
    ],
    outputItems: [
      { id: 1942, name: "Potato", quantity: 6 }
    ]
  },
  {
    id: "farming_oak_trees",
    name: "Oak Trees",
    skill: "farming",
    levelReq: 15,
    xpEach: 481,
    gpEach: -1900,
    itemId: 5370,
    isMembers: true,
    inputItems: [
      { id: 5370, name: "Oak sapling", quantity: 1 },
      { id: 6055, name: "Basket of apples", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_willow_trees",
    name: "Willow Trees",
    skill: "farming",
    levelReq: 30,
    xpEach: 1481,
    gpEach: -2840,
    itemId: 5371,
    isMembers: true,
    inputItems: [
      { id: 5371, name: "Willow sapling", quantity: 1 },
      { id: 5343, name: "Basket of apples", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_maple_trees",
    name: "Maple Trees",
    skill: "farming",
    levelReq: 45,
    xpEach: 3448,
    gpEach: -6980,
    itemId: 5372,
    isMembers: true,
    inputItems: [
      { id: 5372, name: "Maple sapling", quantity: 1 },
      { id: 6798, name: "Basket of oranges", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_fruit_trees",
    name: "Fruit Trees",
    skill: "farming",
    levelReq: 27,
    xpEach: 1200,
    gpEach: -4000,
    itemId: 5478,
    isMembers: true,
    inputItems: [
      { id: 5478, name: "Fruit tree sapling", quantity: 1 },
      { id: 5352, name: "Protection payment", quantity: 1 }
    ],
    outputItems: [
      { id: 1955, name: "Fruit", quantity: 6 }
    ]
  },
  {
    id: "farming_yew_trees",
    name: "Yew Trees",
    skill: "farming",
    levelReq: 60,
    xpEach: 7150,
    gpEach: -12400,
    itemId: 5373,
    isMembers: true,
    inputItems: [
      { id: 5373, name: "Yew sapling", quantity: 1 },
      { id: 6121, name: "Basket of strawberries", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_palm_trees",
    name: "Palm Trees",
    skill: "farming",
    levelReq: 68,
    xpEach: 10500,
    gpEach: -34200,
    itemId: 5502,
    isMembers: true,
    inputItems: [
      { id: 5502, name: "Palm tree sapling", quantity: 1 },
      { id: 5974, name: "Papaya fruit", quantity: 15 }
    ],
    outputItems: []
  },
  {
    id: "farming_magic_trees",
    name: "Magic Trees",
    skill: "farming",
    levelReq: 75,
    xpEach: 13768,
    gpEach: -102400,
    itemId: 5374,
    isMembers: true,
    inputItems: [
      { id: 5374, name: "Magic sapling", quantity: 1 },
      { id: 5980, name: "Coconut", quantity: 25 }
    ],
    outputItems: []
  },
  {
    id: "farming_herb_runs",
    name: "Herb Runs",
    skill: "farming",
    levelReq: 9,
    xpEach: 120,
    gpEach: 1500,
    itemId: 5291,
    isMembers: true,
    inputItems: [
      { id: 5291, name: "Herb seed", quantity: 1 }
    ],
    outputItems: [
      { id: 199, name: "Grimy herb", quantity: 7 }
    ]
  },
  {
    id: "farming_tithe_farm",
    name: "Tithe Farm",
    skill: "farming",
    levelReq: 34,
    xpEach: 60,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 5321, name: "Tithe seeds", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_hespori",
    name: "Hespori",
    skill: "farming",
    levelReq: 65,
    xpEach: 12600,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 22879, name: "Hespori seed", quantity: 1 }
    ],
    outputItems: [
      { id: 22871, name: "White lily seed", quantity: 2 }
    ]
  },
  {
    id: "farming_hardwood_trees",
    name: "Hardwood Trees",
    skill: "farming",
    levelReq: 35,
    xpEach: 3450,
    gpEach: -4650,
    itemId: 22866,
    isMembers: true,
    inputItems: [
      { id: 22866, name: "Teak sapling", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_mahogany_trees",
    name: "Mahogany Trees",
    skill: "farming",
    levelReq: 55,
    xpEach: 7150,
    gpEach: -10800,
    itemId: 21488,
    isMembers: true,
    inputItems: [
      { id: 21488, name: "Mahogany sapling", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "farming_calquat_tree",
    name: "Calquat Tree",
    skill: "farming",
    levelReq: 72,
    xpEach: 12516,
    gpEach: -2100,
    itemId: 5503,
    isMembers: true,
    inputItems: [
      { id: 5503, name: "Calquat sapling", quantity: 1 },
      { id: 5980, name: "Poison ivy berries", quantity: 8 }
    ],
    outputItems: []
  }
]; 