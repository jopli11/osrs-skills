import { MethodRow } from "@/lib/types";

/**
 * Woodcutting skill training methods
 */
export const woodcuttingMethods: MethodRow[] = [
  // Questing
  {
    id: "woodcutting_quests",
    name: "Questing (1-26)",
    skill: "woodcutting",
    levelReq: 1,
    xpEach: 9000,
    gpEach: 0,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Quest requirements", quantity: 1 }
    ],
    outputItems: []
  },
  
  // F2P Methods
  {
    id: "woodcutting_regular_trees",
    name: "Regular Trees",
    skill: "woodcutting",
    levelReq: 1,
    xpEach: 25,
    gpEach: 25,
    itemId: 1511,
    isMembers: false,
    outputItems: [
      { id: 1511, name: "Logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_oak_trees",
    name: "Oak Trees",
    skill: "woodcutting",
    levelReq: 15,
    xpEach: 37.5,
    gpEach: 37,
    itemId: 1521,
    isMembers: false,
    outputItems: [
      { id: 1521, name: "Oak logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_willow_trees",
    name: "Willow Trees",
    skill: "woodcutting",
    levelReq: 30,
    xpEach: 67.5,
    gpEach: 22,
    itemId: 1519,
    isMembers: false,
    outputItems: [
      { id: 1519, name: "Willow logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_maple_trees",
    name: "Maple Trees",
    skill: "woodcutting",
    levelReq: 45,
    xpEach: 100,
    gpEach: 32,
    itemId: 1517,
    isMembers: false,
    outputItems: [
      { id: 1517, name: "Maple logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_yew_trees",
    name: "Yew Trees",
    skill: "woodcutting",
    levelReq: 60,
    xpEach: 175,
    gpEach: 272,
    itemId: 1515,
    isMembers: false,
    outputItems: [
      { id: 1515, name: "Yew logs", quantity: 1 }
    ]
  },
  
  // P2P Methods
  {
    id: "woodcutting_teak_trees",
    name: "Teak Trees",
    skill: "woodcutting",
    levelReq: 35,
    xpEach: 85,
    gpEach: 55,
    itemId: 6333,
    isMembers: true,
    outputItems: [
      { id: 6333, name: "Teak logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_teak_15tick",
    name: "Teak Trees (1.5-tick)",
    skill: "woodcutting",
    levelReq: 35,
    xpEach: 85,
    gpEach: -10,
    isMembers: true,
    outputItems: []
  },
  {
    id: "woodcutting_teak_2tick",
    name: "Teak Trees (2-tick)",
    skill: "woodcutting",
    levelReq: 35,
    xpEach: 85,
    gpEach: -10,
    isMembers: true,
    outputItems: []
  },
  {
    id: "woodcutting_mahogany",
    name: "Mahogany Trees",
    skill: "woodcutting",
    levelReq: 50,
    xpEach: 125,
    gpEach: 282,
    itemId: 6332,
    isMembers: true,
    outputItems: [
      { id: 6332, name: "Mahogany logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_magic_trees",
    name: "Magic Trees",
    skill: "woodcutting",
    levelReq: 75,
    xpEach: 250,
    gpEach: 1008,
    itemId: 1513,
    isMembers: true,
    outputItems: [
      { id: 1513, name: "Magic logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_blisterwood",
    name: "Blisterwood Tree",
    skill: "woodcutting",
    levelReq: 62,
    xpEach: 76,
    gpEach: 0,
    isMembers: true,
    outputItems: []
  },
  {
    id: "woodcutting_sulliuscep",
    name: "Sulliuscep",
    skill: "woodcutting",
    levelReq: 65,
    xpEach: 127,
    gpEach: 150,
    itemId: 21350,
    isMembers: true,
    outputItems: [
      { id: 21350, name: "Sulliuscep cap", quantity: 0.3 },
      { id: 21622, name: "Numulite", quantity: 3 }
    ]
  },
  {
    id: "woodcutting_redwood_trees",
    name: "Redwood Trees",
    skill: "woodcutting",
    levelReq: 90,
    xpEach: 380,
    gpEach: 212,
    itemId: 19669,
    isMembers: true,
    outputItems: [
      { id: 19669, name: "Redwood logs", quantity: 1 }
    ]
  },
  {
    id: "woodcutting_forestry",
    name: "Forestry Event",
    skill: "woodcutting",
    levelReq: 60,
    xpEach: 200,
    gpEach: 0,
    isMembers: true,
    outputItems: [
      { id: 28534, name: "Anima-infused bark", quantity: 12 }
    ]
  }
]; 