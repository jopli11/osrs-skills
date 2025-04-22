import { MethodRow } from "@/lib/types";

/**
 * Cooking skill training methods
 */
export const cookingMethods: MethodRow[] = [
  {
    id: "shrimp",
    name: "Shrimp",
    skill: "cooking",
    levelReq: 1,
    xpEach: 30,
    gpEach: -21,
    inputItems: [
      { id: 317, name: "Raw shrimp", quantity: 1 }
    ],
    outputItems: [
      { id: 315, name: "Shrimp", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "chicken",
    name: "Chicken",
    skill: "cooking",
    levelReq: 1,
    xpEach: 30,
    gpEach: -30,
    inputItems: [
      { id: 2138, name: "Raw chicken", quantity: 1 }
    ],
    outputItems: [
      { id: 2140, name: "Chicken", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "sardine",
    name: "Sardine",
    skill: "cooking",
    levelReq: 1,
    xpEach: 40,
    gpEach: -16,
    inputItems: [
      { id: 327, name: "Raw sardine", quantity: 1 }
    ],
    outputItems: [
      { id: 325, name: "Sardine", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "trout",
    name: "Trout",
    skill: "cooking",
    levelReq: 15,
    xpEach: 70,
    gpEach: 7,
    inputItems: [
      { id: 335, name: "Raw trout", quantity: 1 }
    ],
    outputItems: [
      { id: 333, name: "Trout", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "salmon",
    name: "Salmon",
    skill: "cooking",
    levelReq: 25,
    xpEach: 90,
    gpEach: 10,
    inputItems: [
      { id: 331, name: "Raw salmon", quantity: 1 }
    ],
    outputItems: [
      { id: 329, name: "Salmon", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "tuna",
    name: "Tuna",
    skill: "cooking",
    levelReq: 30,
    xpEach: 100,
    gpEach: -15,
    inputItems: [
      { id: 359, name: "Raw tuna", quantity: 1 }
    ],
    outputItems: [
      { id: 361, name: "Tuna", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "lobster",
    name: "Lobster",
    skill: "cooking",
    levelReq: 40,
    xpEach: 120,
    gpEach: -20,
    inputItems: [
      { id: 377, name: "Raw lobster", quantity: 1 }
    ],
    outputItems: [
      { id: 379, name: "Lobster", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "swordfish",
    name: "Swordfish",
    skill: "cooking",
    levelReq: 45,
    xpEach: 140,
    gpEach: -30,
    inputItems: [
      { id: 371, name: "Raw swordfish", quantity: 1 }
    ],
    outputItems: [
      { id: 373, name: "Swordfish", quantity: 1 }
    ],
    isMembers: false
  },
  {
    id: "monkfish",
    name: "Monkfish",
    skill: "cooking",
    levelReq: 62,
    xpEach: 150,
    gpEach: -25,
    inputItems: [
      { id: 7944, name: "Raw monkfish", quantity: 1 }
    ],
    outputItems: [
      { id: 7946, name: "Monkfish", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "shark",
    name: "Shark",
    skill: "cooking",
    levelReq: 80,
    xpEach: 210,
    gpEach: -100,
    inputItems: [
      { id: 383, name: "Raw shark", quantity: 1 }
    ],
    outputItems: [
      { id: 385, name: "Shark", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "anglerfish",
    name: "Anglerfish",
    skill: "cooking",
    levelReq: 84,
    xpEach: 230,
    gpEach: -150,
    inputItems: [
      { id: 13439, name: "Raw anglerfish", quantity: 1 }
    ],
    outputItems: [
      { id: 13441, name: "Anglerfish", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "dark_crab",
    name: "Dark crab",
    skill: "cooking",
    levelReq: 90,
    xpEach: 215,
    gpEach: -200,
    inputItems: [
      { id: 11934, name: "Raw dark crab", quantity: 1 }
    ],
    outputItems: [
      { id: 11936, name: "Dark crab", quantity: 1 }
    ],
    isMembers: true
  }
]; 