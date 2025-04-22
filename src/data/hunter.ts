import { MethodRow } from "@/lib/types";

/**
 * Hunter skill training methods
 */
export const hunterMethods: MethodRow[] = [
  // Starting methods
  {
    id: "natural_history_quiz",
    name: "Natural History Quiz",
    skill: "hunter",
    levelReq: 1,
    xpEach: 1000, // Total XP from quiz
    gpEach: 0,
    outputItems: [],
    isMembers: false
  },
  
  // Bird house trapping
  {
    id: "regular_birdhouse",
    name: "Regular Bird Houses",
    skill: "hunter",
    levelReq: 5,
    xpEach: 280,
    gpEach: 500, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1511, name: "Logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "oak_birdhouse",
    name: "Oak Bird Houses",
    skill: "hunter",
    levelReq: 14,
    xpEach: 420,
    gpEach: 600, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1521, name: "Oak logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "willow_birdhouse",
    name: "Willow Bird Houses",
    skill: "hunter",
    levelReq: 24,
    xpEach: 560,
    gpEach: 700, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1519, name: "Willow logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "teak_birdhouse",
    name: "Teak Bird Houses",
    skill: "hunter",
    levelReq: 34,
    xpEach: 700,
    gpEach: 800, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 6333, name: "Teak logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "maple_birdhouse",
    name: "Maple Bird Houses",
    skill: "hunter",
    levelReq: 44,
    xpEach: 820,
    gpEach: 900, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1517, name: "Maple logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "mahogany_birdhouse",
    name: "Mahogany Bird Houses",
    skill: "hunter",
    levelReq: 49,
    xpEach: 960,
    gpEach: 1000, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 6332, name: "Mahogany logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "yew_birdhouse",
    name: "Yew Bird Houses",
    skill: "hunter",
    levelReq: 59,
    xpEach: 1020,
    gpEach: 1100, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1515, name: "Yew logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "magic_birdhouse",
    name: "Magic Bird Houses",
    skill: "hunter",
    levelReq: 74,
    xpEach: 1140,
    gpEach: 1200, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 1513, name: "Magic logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "redwood_birdhouse",
    name: "Redwood Bird Houses",
    skill: "hunter",
    levelReq: 89,
    xpEach: 1200,
    gpEach: 1300, // Approximate profit
    inputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 19669, name: "Redwood logs", quantity: 1 },
      { id: 5329, name: "Seeds", quantity: 10 }
    ],
    outputItems: [
      { id: 8792, name: "Clockwork", quantity: 1 },
      { id: 22604, name: "Bird nest", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Drift net fishing
  {
    id: "drift_net",
    name: "Drift Net Fishing",
    skill: "hunter",
    levelReq: 44,
    xpEach: 55, // XP per fish caught
    gpEach: 100, // Approximate profit
    inputItems: [
      { id: 22483, name: "Drift net", quantity: 0.02 } // Nets degrade
    ],
    outputItems: [
      { id: 3142, name: "Raw bass", quantity: 0.2 },
      { id: 371, name: "Raw swordfish", quantity: 0.3 },
      { id: 359, name: "Raw tuna", quantity: 0.5 }
    ],
    isMembers: true
  },
  
  // Active hunting methods
  {
    id: "feldip_weasels",
    name: "Feldip Weasels",
    skill: "hunter",
    levelReq: 9,
    xpEach: 48,
    gpEach: 0, // No profit
    inputItems: [
      { id: 10150, name: "Box trap", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true
  },
  {
    id: "swamp_lizards",
    name: "Swamp Lizards",
    skill: "hunter",
    levelReq: 29,
    xpEach: 152,
    gpEach: 300, // Approximate profit
    inputItems: [
      { id: 303, name: "Small fishing net", quantity: 1 },
      { id: 954, name: "Rope", quantity: 1 }
    ],
    outputItems: [
      { id: 10149, name: "Swamp lizard", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "falconry",
    name: "Falconry",
    skill: "hunter",
    levelReq: 43,
    xpEach: 156, // Average XP per catch
    gpEach: 50, // Approximate profit
    inputItems: [],
    outputItems: [
      { id: 526, name: "Bones", quantity: 1 },
      { id: 10088, name: "Spotted kebbit fur", quantity: 0.7 },
      { id: 10090, name: "Dark kebbit fur", quantity: 0.3 }
    ],
    isMembers: true
  },
  {
    id: "razor_kebbits",
    name: "Razor-backed Kebbits",
    skill: "hunter",
    levelReq: 49,
    xpEach: 348,
    gpEach: 100, // Approximate profit
    inputItems: [
      { id: 10150, name: "Box trap", quantity: 1 }
    ],
    outputItems: [
      { id: 10115, name: "Kebbit spike", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "red_salamanders",
    name: "Red Salamanders",
    skill: "hunter",
    levelReq: 60,
    xpEach: 272,
    gpEach: 0, // No profit
    inputItems: [
      { id: 303, name: "Small fishing net", quantity: 1 },
      { id: 954, name: "Rope", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true
  },
  {
    id: "black_salamanders",
    name: "Black Salamanders",
    skill: "hunter",
    levelReq: 67,
    xpEach: 319,
    gpEach: 0, // No profit
    inputItems: [
      { id: 303, name: "Small fishing net", quantity: 1 },
      { id: 954, name: "Rope", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true
  },
  {
    id: "black_chinchompas",
    name: "Black Chinchompas",
    skill: "hunter",
    levelReq: 73,
    xpEach: 315,
    gpEach: 1500, // Approximate profit
    inputItems: [
      { id: 10150, name: "Box trap", quantity: 1 }
    ],
    outputItems: [
      { id: 11959, name: "Black chinchompa", quantity: 1 }
    ],
    isMembers: true
  },
  
  // Other methods
  {
    id: "aerial_fishing",
    name: "Aerial Fishing",
    skill: "hunter",
    levelReq: 35,
    xpEach: 16.5, // Average XP per catch
    gpEach: 50, // Approximate profit
    inputItems: [
      { id: 22826, name: "Cormorant's glove", quantity: 0 } // Doesn't get used up
    ],
    outputItems: [
      { id: 22818, name: "Fish chunks", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "orange_salamanders",
    name: "Orange Salamanders",
    skill: "hunter",
    levelReq: 47,
    xpEach: 224,
    gpEach: 0, // No profit
    inputItems: [
      { id: 303, name: "Small fishing net", quantity: 1 },
      { id: 954, name: "Rope", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true
  },
  {
    id: "maniacal_monkeys",
    name: "Maniacal Monkeys",
    skill: "hunter",
    levelReq: 60,
    xpEach: 1000, // XP per monkey caught
    gpEach: 0, // No profit
    inputItems: [
      { id: 1963, name: "Banana", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true
  },
  {
    id: "red_chinchompas",
    name: "Red Chinchompas",
    skill: "hunter",
    levelReq: 63,
    xpEach: 265,
    gpEach: 800, // Approximate profit
    inputItems: [
      { id: 10150, name: "Box trap", quantity: 1 }
    ],
    outputItems: [
      { id: 10034, name: "Red chinchompa", quantity: 1 }
    ],
    isMembers: true
  },
  {
    id: "herbiboar",
    name: "Herbiboar",
    skill: "hunter",
    levelReq: 80,
    xpEach: 700, // Average XP per catch
    gpEach: 1200, // Approximate profit
    inputItems: [],
    outputItems: [
      { id: 21232, name: "Grimy herbs", quantity: 3 },
      { id: 21246, name: "Unidentified fossils", quantity: 0.05 }
    ],
    isMembers: true
  }
]; 