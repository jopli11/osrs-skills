import { MethodRow } from "@/lib/types";

/**
 * Agility skill training methods
 */
export const agilityMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "agility_lumbridge_beginner_area",
    name: "Lumbridge Beginner Area",
    skill: "agility",
    levelReq: 1,
    xpEach: 20,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "agility_corsair_cove",
    name: "Corsair Cove Agility Course",
    skill: "agility",
    levelReq: 10,
    xpEach: 33,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "agility_land_of_the_goblins",
    name: "Temple of the Eye Course",
    skill: "agility",
    levelReq: 20,
    xpEach: 65,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  
  // P2P Courses - Low Level
  {
    id: "agility_gnome_stronghold",
    name: "Gnome Stronghold Agility Course",
    skill: "agility",
    levelReq: 1,
    xpEach: 86.5,
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  },
  {
    id: "agility_draynor_village",
    name: "Draynor Village Rooftop Course",
    skill: "agility",
    levelReq: 10,
    xpEach: 120,
    gpEach: 8,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.08 }
    ]
  },
  {
    id: "agility_al_kharid",
    name: "Al Kharid Rooftop Course",
    skill: "agility",
    levelReq: 20,
    xpEach: 180,
    gpEach: 12,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.12 }
    ]
  },
  {
    id: "agility_varrock",
    name: "Varrock Rooftop Course",
    skill: "agility",
    levelReq: 30,
    xpEach: 238,
    gpEach: 14,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.14 }
    ]
  },
  
  // P2P Courses - Mid Level
  {
    id: "agility_canifis",
    name: "Canifis Rooftop Course",
    skill: "agility",
    levelReq: 40,
    xpEach: 240,
    gpEach: 19,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.19 }
    ]
  },
  {
    id: "agility_falador",
    name: "Falador Rooftop Course",
    skill: "agility",
    levelReq: 50,
    xpEach: 440,
    gpEach: 16,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.16 }
    ]
  },
  {
    id: "agility_wilderness",
    name: "Wilderness Agility Course",
    skill: "agility",
    levelReq: 52,
    xpEach: 571.5,
    gpEach: 60,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Food", quantity: 0.5 }
    ],
    outputItems: [
      { id: 11849, name: "Wilderness bones", quantity: 0.2 }
    ]
  },
  {
    id: "agility_seers_village",
    name: "Seers' Village Rooftop Course",
    skill: "agility",
    levelReq: 60,
    xpEach: 570,
    gpEach: 17,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.17 }
    ]
  },
  {
    id: "agility_seers_village_teleport",
    name: "Seers' Village (With Teleport)",
    skill: "agility",
    levelReq: 60,
    xpEach: 570,
    gpEach: 5,
    isMembers: true,
    inputItems: [
      { id: 561, name: "Nature rune", quantity: 0.15 },
      { id: 563, name: "Law rune", quantity: 0.15 }
    ],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.22 }
    ]
  },
  
  // P2P Courses - High Level
  {
    id: "agility_pollnivneach",
    name: "Pollnivneach Rooftop Course",
    skill: "agility",
    levelReq: 70,
    xpEach: 890,
    gpEach: 20,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.2 }
    ]
  },
  {
    id: "agility_rellekka",
    name: "Rellekka Rooftop Course",
    skill: "agility",
    levelReq: 80,
    xpEach: 780,
    gpEach: 22,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.22 }
    ]
  },
  {
    id: "agility_ardougne",
    name: "Ardougne Rooftop Course",
    skill: "agility",
    levelReq: 90,
    xpEach: 793,
    gpEach: 25,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11849, name: "Mark of grace", quantity: 0.25 }
    ]
  },
  
  // P2P - Special Courses
  {
    id: "agility_hallowed_sepulchre",
    name: "Hallowed Sepulchre (Floor 5)",
    skill: "agility",
    levelReq: 92,
    xpEach: 4500,
    gpEach: 3000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Supplies", quantity: 0.25 }
    ],
    outputItems: [
      { id: 24731, name: "Strange old lockpick", quantity: 0.01 },
      { id: 54536, name: "Hallowed token", quantity: 10 }
    ]
  },
  {
    id: "agility_hallowed_sepulchre_4",
    name: "Hallowed Sepulchre (Floor 4)",
    skill: "agility",
    levelReq: 82,
    xpEach: 3000,
    gpEach: 1500,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Supplies", quantity: 0.2 }
    ],
    outputItems: [
      { id: 24731, name: "Strange old lockpick", quantity: 0.005 },
      { id: 54536, name: "Hallowed token", quantity: 7 }
    ]
  },
  {
    id: "agility_penguin_course",
    name: "Penguin Agility Course",
    skill: "agility",
    levelReq: 30,
    xpEach: 540,
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  },
  {
    id: "agility_ape_atoll",
    name: "Ape Atoll Agility Course",
    skill: "agility",
    levelReq: 48,
    xpEach: 580,
    gpEach: 0,
    isMembers: true,
    inputItems: [],
    outputItems: []
  }
]; 