import { MethodRow } from "@/lib/types";

/**
 * Attack skill training methods
 */
export const attackMethods: MethodRow[] = [
  {
    id: "att_1",
    name: "Cows (1-20)",
    skill: "attack",
    levelReq: 1,
    xpEach: 16,
    gpEach: 20,
    isMembers: false
  },
  {
    id: "att_2",
    name: "Rock Crabs (20-40)",
    skill: "attack",
    levelReq: 20,
    xpEach: 50,
    gpEach: 0,
    isMembers: true
  },
  {
    id: "att_3",
    name: "Sand Crabs (40-60)",
    skill: "attack",
    levelReq: 40,
    xpEach: 60,
    gpEach: 0,
    isMembers: true
  },
  {
    id: "att_4",
    name: "Nightmare Zone (60-99)",
    skill: "attack",
    levelReq: 60,
    xpEach: 100,
    gpEach: -150,
    isMembers: true
  },
  {
    id: "atk_sand_crabs",
    name: "Sand Crabs",
    skill: "attack",
    levelReq: 1,
    xpEach: 60,
    gpEach: -2,
    isMembers: true
  },
  {
    id: "atk_ammonite_crabs",
    name: "Ammonite Crabs",
    skill: "attack",
    levelReq: 15,
    xpEach: 85,
    gpEach: -2.5,
    isMembers: true
  },
  {
    id: "atk_nightmare_zone",
    name: "Nightmare Zone",
    skill: "attack",
    levelReq: 70,
    xpEach: 120,
    gpEach: -10,
    isMembers: true
  },
  {
    id: "atk_afk_crab_community_boss",
    name: "AFK Crab Community Boss",
    skill: "attack",
    levelReq: 40,
    xpEach: 95,
    gpEach: 50,
    isMembers: true,
    inputItems: [
      { id: 4587, name: "Dragon scimitar", quantity: 0.0001 }
    ],
    outputItems: [
      { id: 526, name: "Bones", quantity: 1 },
      { id: 0, name: "Various drops", quantity: 1 }
    ],
    notes: "New Final Dawn community boss that provides AFK combat training with decent XP rates and some profit from drops."
  }
]; 