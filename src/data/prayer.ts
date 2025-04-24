import { MethodRow } from "@/lib/types";

/**
 * Prayer skill training methods
 */
export const prayerMethods: MethodRow[] = [
  // F2P Methods
  {
    id: "prayer_restless_ghost",
    name: "The Restless Ghost Quest",
    skill: "prayer",
    levelReq: 1,
    xpEach: 1125,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "prayer_camdozaal",
    name: "Camdozaal Altar (Tetra)",
    skill: "prayer",
    levelReq: 33,
    xpEach: 10,
    gpEach: 0,
    isMembers: false,
    inputItems: [],
    outputItems: []
  },
  {
    id: "prayer_bones",
    name: "Burying Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 4.5,
    gpEach: -68,
    isMembers: false,
    inputItems: [
      { id: 526, name: "Bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_big_bones",
    name: "Burying Big Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 15,
    gpEach: -486,
    isMembers: false,
    inputItems: [
      { id: 532, name: "Big bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_vile_ashes",
    name: "Scattering Vile Ashes",
    skill: "prayer",
    levelReq: 1,
    xpEach: 25,
    gpEach: -214,
    isMembers: false,
    inputItems: [
      { id: 21930, name: "Vile ashes", quantity: 1 }
    ],
    outputItems: []
  },
  
  // P2P Methods
  {
    id: "prayer_dragon_bones",
    name: "Burying Dragon Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 72,
    gpEach: -2200,
    isMembers: true,
    inputItems: [
      { id: 536, name: "Dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_gilded_altar_dragon",
    name: "Gilded Altar (Dragon Bones)",
    skill: "prayer",
    levelReq: 1,
    xpEach: 252,
    gpEach: -2200,
    isMembers: true,
    inputItems: [
      { id: 536, name: "Dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_chaos_altar_dragon",
    name: "Chaos Altar (Dragon Bones)",
    skill: "prayer",
    levelReq: 1,
    xpEach: 252,
    gpEach: -2200,
    isMembers: true,
    inputItems: [
      { id: 536, name: "Dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_ectofuntus_dragon",
    name: "Ectofuntus (Dragon Bones)",
    skill: "prayer",
    levelReq: 1,
    xpEach: 288,
    gpEach: -2350,
    isMembers: true,
    inputItems: [
      { id: 536, name: "Dragon bones", quantity: 1 },
      { id: 4286, name: "Bucket of slime", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_superior_dragon",
    name: "Superior Dragon Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 150,
    gpEach: -6900,
    isMembers: true,
    inputItems: [
      { id: 22124, name: "Superior dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_gilded_altar_superior",
    name: "Gilded Altar (Superior Dragon)",
    skill: "prayer",
    levelReq: 1,
    xpEach: 525,
    gpEach: -6900,
    isMembers: true,
    inputItems: [
      { id: 22124, name: "Superior dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_chaos_altar_superior",
    name: "Chaos Altar (Superior Dragon)",
    skill: "prayer",
    levelReq: 1,
    xpEach: 525,
    gpEach: -6900,
    isMembers: true,
    inputItems: [
      { id: 22124, name: "Superior dragon bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_dagannoth",
    name: "Dagannoth Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 125,
    gpEach: -5600,
    isMembers: true,
    inputItems: [
      { id: 6729, name: "Dagannoth bones", quantity: 1 }
    ],
    outputItems: []
  },
  {
    id: "prayer_frost_dragon",
    name: "Frost Dragon Bones",
    skill: "prayer",
    levelReq: 1,
    xpEach: 180,
    gpEach: -9200,
    isMembers: true,
    inputItems: [
      { id: 18830, name: "Frost dragon bones", quantity: 1 }
    ],
    outputItems: []
  }
]; 