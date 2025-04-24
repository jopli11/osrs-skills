import { MethodRow } from "@/lib/types";

/**
 * Slayer skill training methods
 */
export const slayerMethods: MethodRow[] = [
  // General Slayer Training
  {
    id: "slayer_turael",
    name: "Turael Skipping",
    skill: "slayer",
    levelReq: 1,
    xpEach: 5000,
    gpEach: -5000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Combat supplies", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "slayer_konar",
    name: "Konar Tasks",
    skill: "slayer",
    levelReq: 75,
    xpEach: 15000,
    gpEach: 100000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Combat supplies", quantity: 1 }
    ],
    outputItems: [
      { id: 23083, name: "Brimstone key", quantity: 0.5 }
    ]
  },
  {
    id: "slayer_nieve",
    name: "Nieve/Steve Tasks",
    skill: "slayer",
    levelReq: 85,
    xpEach: 20000,
    gpEach: 40000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Combat supplies", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "slayer_duradel",
    name: "Duradel Tasks",
    skill: "slayer",
    levelReq: 100,
    xpEach: 25000,
    gpEach: 60000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Combat supplies", quantity: 1 }
    ],
    outputItems: []
  },
  
  // Specific Methods
  {
    id: "slayer_burst_dust_devils",
    name: "Bursting Dust Devils",
    skill: "slayer",
    levelReq: 65,
    xpEach: 40000,
    gpEach: -50000,
    isMembers: true,
    inputItems: [
      { id: 555, name: "Water runes", quantity: 3000 },
      { id: 560, name: "Death runes", quantity: 1200 },
      { id: 565, name: "Blood runes", quantity: 600 }
    ],
    outputItems: [
      { id: 592, name: "Ashes", quantity: 200 },
      { id: 0, name: "Various drops", quantity: 1 }
    ]
  },
  {
    id: "slayer_burst_nechryael",
    name: "Bursting Nechryael",
    skill: "slayer",
    levelReq: 80,
    xpEach: 45000,
    gpEach: -40000,
    isMembers: true,
    inputItems: [
      { id: 555, name: "Water runes", quantity: 3000 },
      { id: 560, name: "Death runes", quantity: 1200 },
      { id: 565, name: "Blood runes", quantity: 600 }
    ],
    outputItems: [
      { id: 592, name: "Ashes", quantity: 200 },
      { id: 0, name: "Various drops", quantity: 1 }
    ]
  },
  {
    id: "slayer_cannon_kalphites",
    name: "Cannoning Kalphites",
    skill: "slayer",
    levelReq: 1,
    xpEach: 25000,
    gpEach: -80000,
    isMembers: true,
    inputItems: [
      { id: 2, name: "Cannonballs", quantity: 1000 },
      { id: 0, name: "Combat gear", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "slayer_cannon_suqahs",
    name: "Cannoning Suqahs",
    skill: "slayer",
    levelReq: 85,
    xpEach: 30000,
    gpEach: -90000,
    isMembers: true,
    inputItems: [
      { id: 2, name: "Cannonballs", quantity: 1000 },
      { id: 0, name: "Combat gear", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "slayer_boss_hydra",
    name: "Alchemical Hydra",
    skill: "slayer",
    levelReq: 95,
    xpEach: 60000,
    gpEach: 300000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "High level gear", quantity: 1 }
    ],
    outputItems: [
      { id: 22124, name: "Hydra's claw", quantity: 0.005 },
      { id: 22103, name: "Hydra leather", quantity: 0.01 }
    ]
  },
  {
    id: "slayer_boss_kraken",
    name: "Kraken Boss",
    skill: "slayer",
    levelReq: 87,
    xpEach: 25000,
    gpEach: 200000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Trident charges", quantity: 500 }
    ],
    outputItems: [
      { id: 12655, name: "Kraken tentacle", quantity: 0.0125 }
    ]
  },
  {
    id: "slayer_boss_cerberus",
    name: "Cerberus",
    skill: "slayer",
    levelReq: 91,
    xpEach: 35000,
    gpEach: 180000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "High level gear", quantity: 1 }
    ],
    outputItems: [
      { id: 13231, name: "Primordial crystal", quantity: 0.008 }
    ]
  },
  {
    id: "slayer_kurasks",
    name: "Kurasks",
    skill: "slayer",
    levelReq: 70,
    xpEach: 15000,
    gpEach: 120000,
    isMembers: true,
    inputItems: [
      { id: 4158, name: "Leaf-bladed spear", quantity: 0 }
    ],
    outputItems: [
      { id: 1753, name: "Magic logs", quantity: 10 },
      { id: 1618, name: "Uncut diamond", quantity: 4 }
    ]
  },
  {
    id: "slayer_gargoyles",
    name: "Gargoyles",
    skill: "slayer",
    levelReq: 75,
    xpEach: 18000,
    gpEach: 150000,
    isMembers: true,
    inputItems: [
      { id: 4153, name: "Granite hammer", quantity: 0 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 5000 }
    ]
  }
]; 