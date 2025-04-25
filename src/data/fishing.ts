import { MethodRow } from "@/lib/types";

/**
 * Fishing skill training methods
 */
export const fishingMethods: MethodRow[] = [
  {
    id: "fishing_shrimps",
    name: "Shrimps/Anchovies",
    skill: "fishing",
    levelReq: 1,
    xpEach: 10,
    gpEach: 25,
    itemId: 317,
    isMembers: false,
    outputItems: [
      { id: 317, name: "Raw shrimps", quantity: 0.7 },
      { id: 321, name: "Raw anchovies", quantity: 0.3 }
    ]
  },
  {
    id: "fishing_trout_salmon",
    name: "Trout/Salmon",
    skill: "fishing",
    levelReq: 20,
    xpEach: 70,
    gpEach: 20,
    itemId: 335,
    isMembers: false,
    inputItems: [
      { id: 314, name: "Feather", quantity: 1 }
    ],
    outputItems: [
      { id: 335, name: "Raw trout", quantity: 0.7 },
      { id: 331, name: "Raw salmon", quantity: 0.3 }
    ]
  },
  {
    id: "fishing_barbarian",
    name: "Barbarian Fishing",
    skill: "fishing",
    levelReq: 48,
    xpEach: 100,
    gpEach: -2,
    isMembers: true,
    inputItems: [
      { id: 314, name: "Feather", quantity: 1 }
    ]
  },
  {
    id: "fishing_monkfish",
    name: "Monkfish",
    skill: "fishing",
    levelReq: 62,
    xpEach: 120,
    gpEach: 300,
    itemId: 7944,
    isMembers: true,
    outputItems: [
      { id: 7944, name: "Raw monkfish", quantity: 1 }
    ]
  },
  {
    id: "fishing_karambwan",
    name: "Karambwan",
    skill: "fishing",
    levelReq: 65,
    xpEach: 105,
    gpEach: 800,
    itemId: 3142,
    isMembers: true,
    outputItems: [
      { id: 3142, name: "Raw karambwan", quantity: 1 }
    ]
  },
  {
    id: "fishing_minnow",
    name: "Minnow",
    skill: "fishing",
    levelReq: 82,
    xpEach: 26,
    gpEach: 110,
    itemId: 383,
    isMembers: true,
    outputItems: [
      { id: 383, name: "Raw shark (from minnows)", quantity: 0.0625 }
    ]
  },
  {
    id: "fishing_infernal_eel",
    name: "Infernal Eels",
    skill: "fishing",
    levelReq: 80,
    xpEach: 95,
    gpEach: 230,
    isMembers: true
  },
  {
    id: "fishing_sacred_eel",
    name: "Sacred Eels",
    skill: "fishing",
    levelReq: 87,
    xpEach: 105,
    gpEach: 350,
    itemId: 11942,
    isMembers: true
  },
  {
    id: "fishing_anglerfish",
    name: "Anglerfish",
    skill: "fishing",
    levelReq: 82,
    xpEach: 120,
    gpEach: 1200,
    itemId: 13439,
    isMembers: true,
    outputItems: [
      { id: 13439, name: "Raw anglerfish", quantity: 1 }
    ]
  }
]; 