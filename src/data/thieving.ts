import { MethodRow } from "@/lib/types";

/**
 * Thieving skill training methods
 */
export const thievingMethods: MethodRow[] = [
  // Early levels and F2P Methods
  {
    id: "thieving_men_women",
    name: "Men/Women",
    skill: "thieving",
    levelReq: 1,
    xpEach: 8,
    gpEach: 3,
    isMembers: false,
    inputItems: [],
    outputItems: [
      { id: 995, name: "Coins", quantity: 3 }
    ]
  },
  {
    id: "thieving_bakery_stalls",
    name: "Bakery Stalls",
    skill: "thieving",
    levelReq: 5,
    xpEach: 16,
    gpEach: 5,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 1891, name: "Cake", quantity: 1 }
    ]
  },
  {
    id: "thieving_fruit_stalls",
    name: "Fruit Stalls",
    skill: "thieving",
    levelReq: 25,
    xpEach: 28.5,
    gpEach: 20,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 1963, name: "Strange fruit", quantity: 1 }
    ]
  },
  
  // Blackjacking
  {
    id: "thieving_blackjack_bearded_bandits",
    name: "Blackjacking Bearded Bandits",
    skill: "thieving",
    levelReq: 45,
    xpEach: 65,
    gpEach: 50,
    isMembers: true,
    inputItems: [
      { id: 1523, name: "Blackjack", quantity: 0 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 50 }
    ]
  },
  {
    id: "thieving_blackjack_menaphite_thugs",
    name: "Blackjacking Menaphite Thugs",
    skill: "thieving",
    levelReq: 65,
    xpEach: 137.5,
    gpEach: 100,
    isMembers: true,
    inputItems: [
      { id: 1523, name: "Blackjack", quantity: 0 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 100 }
    ]
  },
  
  // Stealing artifacts
  {
    id: "thieving_stealing_artefacts",
    name: "Stealing Artefacts",
    skill: "thieving",
    levelReq: 49,
    xpEach: 150,
    gpEach: 1000,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 11346, name: "Artefact", quantity: 1 }
    ]
  },
  
  // Knights and other pickpocketing
  {
    id: "thieving_ardougne_knights",
    name: "Knights of Ardougne",
    skill: "thieving",
    levelReq: 55,
    xpEach: 84.3,
    gpEach: 50,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 995, name: "Coin pouch", quantity: 50 }
    ]
  },
  {
    id: "thieving_master_farmers",
    name: "Master Farmers",
    skill: "thieving",
    levelReq: 38,
    xpEach: 43,
    gpEach: 150,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 5291, name: "Various seeds", quantity: 1 }
    ]
  },
  {
    id: "thieving_high_master_farmers",
    name: "Master Farmers (High Level)",
    skill: "thieving",
    levelReq: 94,
    xpEach: 43,
    gpEach: 300,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 },
      { id: 13121, name: "Rogue outfit", quantity: 0 }
    ],
    outputItems: [
      { id: 5295, name: "Ranarr seed", quantity: 0.1 },
      { id: 5300, name: "Snapdragon seed", quantity: 0.05 }
    ]
  },
  
  // Chests and other methods
  {
    id: "thieving_rogues_castle",
    name: "Stealing from Rogues' Castle chests",
    skill: "thieving",
    levelReq: 84,
    xpEach: 100,
    gpEach: 200,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 995, name: "Coins", quantity: 200 }
    ]
  },
  {
    id: "thieving_pyramid_plunder",
    name: "Pyramid Plunder",
    skill: "thieving",
    levelReq: 91,
    xpEach: 650,
    gpEach: 20000,
    isMembers: true,
    inputItems: [
      { id: 0, name: "Antipoison", quantity: 0.5 }
    ],
    outputItems: [
      { id: 9050, name: "Pharaoh's sceptre", quantity: 0.001 }
    ]
  },
  {
    id: "thieving_dorgesh_kaan_chests",
    name: "Dorgesh-Kaan Rich Chests",
    skill: "thieving",
    levelReq: 78,
    xpEach: 650,
    gpEach: 400,
    isMembers: true,
    inputItems: [
      { id: 5560, name: "Lockpick", quantity: 0.01 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 400 }
    ]
  },
  {
    id: "thieving_elves",
    name: "Pickpocketing Elves",
    skill: "thieving",
    levelReq: 85,
    xpEach: 353,
    gpEach: 500,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 },
      { id: 13121, name: "Rogue outfit", quantity: 0 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 300 },
      { id: 23778, name: "Enhanced crystal teleport seed", quantity: 0.0005 }
    ]
  },
  {
    id: "thieving_vyres",
    name: "Pickpocketing Vyres",
    skill: "thieving",
    levelReq: 82,
    xpEach: 306.9,
    gpEach: 400,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 400 }
    ]
  },
  {
    id: "thieving_tzhaar_hur",
    name: "TzHaar-Hur",
    skill: "thieving",
    levelReq: 90,
    xpEach: 103.4,
    gpEach: 15000,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 6529, name: "Tokkul", quantity: 100 },
      { id: 21322, name: "Fire cape", quantity: 0.00001 }
    ]
  }
]; 