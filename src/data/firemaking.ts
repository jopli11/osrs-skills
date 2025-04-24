import { MethodRow } from "@/lib/types";

/**
 * Firemaking skill training methods
 */
export const firemakingMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "firemaking_logs",
    name: "Regular Logs",
    skill: "firemaking",
    levelReq: 1,
    xpEach: 40,
    gpEach: -159,
    isMembers: false,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 },
      { id: 590, name: "Tinderbox", quantity: 0 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_oak_logs",
    name: "Oak Logs",
    skill: "firemaking",
    levelReq: 15,
    xpEach: 60,
    gpEach: -52,
    isMembers: false,
    inputItems: [
      { id: 1521, name: "Oak logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_willow_logs",
    name: "Willow Logs",
    skill: "firemaking",
    levelReq: 30,
    xpEach: 90,
    gpEach: -72,
    isMembers: false,
    inputItems: [
      { id: 1519, name: "Willow logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_maple_logs",
    name: "Maple Logs",
    skill: "firemaking",
    levelReq: 45,
    xpEach: 135,
    gpEach: -23,
    isMembers: false,
    inputItems: [
      { id: 1517, name: "Maple logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_yew_logs",
    name: "Yew Logs",
    skill: "firemaking",
    levelReq: 60,
    xpEach: 202.5,
    gpEach: -258,
    isMembers: false,
    inputItems: [
      { id: 1515, name: "Yew logs", quantity: 1 }
    ],
    outputItems: []
  },
  
  // P2P Methods
  {
    id: "firemaking_white_logs",
    name: "White Logs",
    skill: "firemaking",
    levelReq: 1,
    xpEach: 50,
    gpEach: -198,
    isMembers: true,
    inputItems: [
      { id: 6332, name: "White logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_teak_logs",
    name: "Teak Logs",
    skill: "firemaking",
    levelReq: 35,
    xpEach: 105,
    gpEach: -299,
    isMembers: true,
    inputItems: [
      { id: 6333, name: "Teak logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_arctic_pine_logs",
    name: "Arctic Pine Logs",
    skill: "firemaking",
    levelReq: 42,
    xpEach: 125,
    gpEach: -442,
    isMembers: true,
    inputItems: [
      { id: 10810, name: "Arctic pine logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_mahogany_logs",
    name: "Mahogany Logs",
    skill: "firemaking",
    levelReq: 50,
    xpEach: 157.5,
    gpEach: -443,
    isMembers: true,
    inputItems: [
      { id: 6332, name: "Mahogany logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_magic_logs",
    name: "Magic Logs",
    skill: "firemaking",
    levelReq: 75,
    xpEach: 303.8,
    gpEach: -1000,
    isMembers: true,
    inputItems: [
      { id: 1513, name: "Magic logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_redwood_logs",
    name: "Redwood Logs",
    skill: "firemaking",
    levelReq: 90,
    xpEach: 350,
    gpEach: -674,
    isMembers: true,
    inputItems: [
      { id: 19669, name: "Redwood logs", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "firemaking_wintertodt",
    name: "Wintertodt",
    skill: "firemaking",
    levelReq: 50,
    xpEach: 9000,
    gpEach: 300,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 20708, name: "Supply crate", quantity: 0.25 }
    ]
  },
  {
    id: "firemaking_pyre_logs",
    name: "Creating Pyre Logs",
    skill: "firemaking",
    levelReq: 5,
    xpEach: 80,
    gpEach: -200,
    isMembers: true,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 },
      { id: 4255, name: "Sacred oil", quantity: 0.1 }
    ],
    outputItems: [
      { id: 3438, name: "Pyre logs", quantity: 1 }
    ]
  },
  {
    id: "firemaking_campfire",
    name: "Burning Logs on Campfire",
    skill: "firemaking",
    levelReq: 1,
    xpEach: 13.3,
    gpEach: -159,
    isMembers: true,
    inputItems: [
      { id: 1511, name: "Logs", quantity: 1 }
    ],
    outputItems: []
  }
]; 