import { MethodRow } from "@/lib/types";

/**
 * Herblore skill training methods
 */
export const herbloreMethods: MethodRow[] = [
  // Questing
  {
    id: "herblore_questing",
    name: "Questing (1-32)",
    skill: "herblore",
    levelReq: 1,
    xpEach: 29000, // Total XP from early quests
    gpEach: 0,
    outputItems: [],
    isMembers: true
  },
  
  // Cleaning herbs
  {
    id: "clean_guam",
    name: "Clean Guam",
    skill: "herblore",
    levelReq: 3,
    xpEach: 2.5,
    gpEach: 15, // Approximate profit
    inputItems: [
      { id: 199, name: "Grimy guam leaf", quantity: 1 }
    ],
    outputItems: [
      { id: 249, name: "Clean guam leaf", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "clean_marrentill",
    name: "Clean Marrentill",
    skill: "herblore",
    levelReq: 5,
    xpEach: 3.8,
    gpEach: 20, // Approximate profit
    inputItems: [
      { id: 201, name: "Grimy marrentill", quantity: 1 }
    ],
    outputItems: [
      { id: 251, name: "Clean marrentill", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "clean_ranarr",
    name: "Clean Ranarr",
    skill: "herblore",
    levelReq: 25,
    xpEach: 7.5,
    gpEach: 50, // Approximate profit
    inputItems: [
      { id: 207, name: "Grimy ranarr weed", quantity: 1 }
    ],
    outputItems: [
      { id: 257, name: "Clean ranarr weed", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "clean_torstol",
    name: "Clean Torstol",
    skill: "herblore",
    levelReq: 75,
    xpEach: 15,
    gpEach: 80, // Approximate profit
    inputItems: [
      { id: 219, name: "Grimy torstol", quantity: 1 }
    ],
    outputItems: [
      { id: 269, name: "Clean torstol", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Potions - Initial levels
  {
    id: "attack_potion",
    name: "Attack Potion",
    skill: "herblore",
    levelReq: 3,
    xpEach: 25,
    gpEach: -150, // Approximate loss
    inputItems: [
      { id: 249, name: "Clean guam leaf", quantity: 1 },
      { id: 221, name: "Eye of newt", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 121, name: "Attack potion(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "antipoison",
    name: "Antipoison",
    skill: "herblore",
    levelReq: 5,
    xpEach: 37.5,
    gpEach: -200, // Approximate loss
    inputItems: [
      { id: 251, name: "Clean marrentill", quantity: 1 },
      { id: 235, name: "Unicorn horn dust", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 175, name: "Antipoison(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "strength_potion",
    name: "Strength Potion",
    skill: "herblore",
    levelReq: 12,
    xpEach: 50,
    gpEach: -250, // Approximate loss
    inputItems: [
      { id: 253, name: "Clean tarromin", quantity: 1 },
      { id: 225, name: "Limpwurt root", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 115, name: "Strength potion(3)", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Mid-level potions
  {
    id: "prayer_potion",
    name: "Prayer Potion",
    skill: "herblore",
    levelReq: 38,
    xpEach: 87.5,
    gpEach: -300, // Approximate loss
    inputItems: [
      { id: 257, name: "Clean ranarr weed", quantity: 1 },
      { id: 231, name: "Snape grass", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 139, name: "Prayer potion(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "super_attack",
    name: "Super Attack",
    skill: "herblore",
    levelReq: 45,
    xpEach: 100,
    gpEach: -400, // Approximate loss
    inputItems: [
      { id: 259, name: "Clean irit leaf", quantity: 1 },
      { id: 221, name: "Eye of newt", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 145, name: "Super attack(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "super_strength",
    name: "Super Strength",
    skill: "herblore",
    levelReq: 55,
    xpEach: 125,
    gpEach: -450, // Approximate loss
    inputItems: [
      { id: 263, name: "Clean kwuarm", quantity: 1 },
      { id: 225, name: "Limpwurt root", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 157, name: "Super strength(3)", quantity: 1 }
    ],
    isMembers: true
  },
  
  // High-level potions
  {
    id: "super_restore",
    name: "Super Restore",
    skill: "herblore",
    levelReq: 63,
    xpEach: 142.5,
    gpEach: -500, // Approximate loss
    inputItems: [
      { id: 3000, name: "Clean snapdragon", quantity: 1 },
      { id: 223, name: "Red spiders' eggs", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 3024, name: "Super restore(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "saradomin_brew",
    name: "Saradomin Brew",
    skill: "herblore",
    levelReq: 81,
    xpEach: 180,
    gpEach: -600, // Approximate loss
    inputItems: [
      { id: 267, name: "Clean toadflax", quantity: 1 },
      { id: 6693, name: "Crushed nest", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 6685, name: "Saradomin brew(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "super_combat",
    name: "Super Combat Potion",
    skill: "herblore",
    levelReq: 90,
    xpEach: 150,
    gpEach: -800, // Approximate loss
    inputItems: [
      { id: 269, name: "Clean torstol", quantity: 1 },
      { id: 145, name: "Super attack(3)", quantity: 1 },
      { id: 157, name: "Super strength(3)", quantity: 1 },
      { id: 163, name: "Super defence(3)", quantity: 1 }
    ],
    outputItems: [
      { id: 12695, name: "Super combat potion(4)", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Additional methods
  {
    id: "weapon_poison",
    name: "Weapon Poison",
    skill: "herblore",
    levelReq: 60,
    xpEach: 137.5,
    gpEach: -350, // Approximate loss
    inputItems: [
      { id: 263, name: "Clean kwuarm", quantity: 1 },
      { id: 241, name: "Dragon scale dust", quantity: 1 },
      { id: 227, name: "Vial of water", quantity: 1 }
    ],
    outputItems: [
      { id: 187, name: "Weapon poison(3)", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "stamina_potion",
    name: "Stamina Potion",
    skill: "herblore",
    levelReq: 77,
    xpEach: 25.5,
    gpEach: -700, // Approximate loss
    inputItems: [
      { id: 3016, name: "Super energy(4)", quantity: 1 },
      { id: 12640, name: "Amylase crystal", quantity: 4 }
    ],
    outputItems: [
      { id: 12625, name: "Stamina potion(4)", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Special method
  {
    id: "guthix_rest",
    name: "Guthix Rest",
    skill: "herblore",
    levelReq: 18,
    xpEach: 59.5,
    gpEach: -150, // Approximate loss
    inputItems: [
      { id: 1980, name: "Cup of hot water", quantity: 1 },
      { id: 249, name: "Clean guam leaf", quantity: 1 },
      { id: 251, name: "Clean marrentill", quantity: 1 },
      { id: 253, name: "Clean harralander", quantity: 1 }
    ],
    outputItems: [
      { id: 4419, name: "Guthix rest(4)", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Making tar
  {
    id: "guam_tar",
    name: "Guam Tar",
    skill: "herblore",
    levelReq: 19,
    xpEach: 30,
    gpEach: -100, // Approximate loss
    inputItems: [
      { id: 249, name: "Clean guam leaf", quantity: 1 },
      { id: 1939, name: "Swamp tar", quantity: 15 }
    ],
    outputItems: [
      { id: 10142, name: "Guam tar", quantity: 15 }
    ],
    isMembers: true
  },
  {
    id: "marrentill_tar",
    name: "Marrentill Tar",
    skill: "herblore",
    levelReq: 31,
    xpEach: 42.5,
    gpEach: -120, // Approximate loss
    inputItems: [
      { id: 251, name: "Clean marrentill", quantity: 1 },
      { id: 1939, name: "Swamp tar", quantity: 15 }
    ],
    outputItems: [
      { id: 10143, name: "Marrentill tar", quantity: 15 }
    ],
    isMembers: true
  },
  
  // Mastering Mixology (High level training)
  {
    id: "mixology",
    name: "Mastering Mixology",
    skill: "herblore",
    levelReq: 81,
    xpEach: 1000, // Approximate combined XP
    gpEach: -5000, // High cost
    inputItems: [
      { id: 267, name: "Various high level herbs", quantity: 1 },
      { id: 227, name: "Secondary ingredients", quantity: 1 }
    ],
    outputItems: [
      { id: 6685, name: "High level potions", quantity: 1 }
    ],
    isMembers: true
  }
]; 