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
    itemId: 995,
    isMembers: false,
    estimatedActionsPerHour: 1200,
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
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [],
    outputItems: [
      { id: 1891, name: "Cake", quantity: 0.95 },
      { id: 2309, name: "Bread", quantity: 0.95 }
    ],
    notes: "Success rate increases with level. XP rates assume continuous stealing without guards interrupting."
  },
  {
    id: "thieving_fruit_stalls",
    name: "Fruit Stalls",
    skill: "thieving",
    levelReq: 25,
    xpEach: 28.5,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1500,
    inputItems: [],
    outputItems: [
      { id: 1963, name: "Strange fruit", quantity: 0.9 },
      { id: 1955, name: "Cooking apple", quantity: 0.4 },
      { id: 1957, name: "Banana", quantity: 0.4 },
      { id: 1965, name: "Pineapple", quantity: 0.4 }
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
    itemId: 995,
    isMembers: true,
    inputItems: [
      { id: 1523, name: "Blackjack", quantity: 0.001 }
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
    itemId: 995,
    isMembers: true,
    inputItems: [
      { id: 1523, name: "Blackjack", quantity: 0.001 }
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
    gpEach: 750,
    itemId: 11346,
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
    itemId: 995,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 50 }
    ]
  },
  {
    id: "thieving_master_farmers",
    name: "Master Farmers",
    skill: "thieving",
    levelReq: 38,
    xpEach: 43,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 2000,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 5291, name: "Guam seed", quantity: 0.238 },
      { id: 5292, name: "Marrentill seed", quantity: 0.219 },
      { id: 5293, name: "Tarromin seed", quantity: 0.195 },
      { id: 5294, name: "Harralander seed", quantity: 0.146 },
      { id: 5295, name: "Ranarr seed", quantity: 0.0106 },
      { id: 5296, name: "Toadflax seed", quantity: 0.0098 },
      { id: 5297, name: "Irit seed", quantity: 0.0089 },
      { id: 5298, name: "Avantoe seed", quantity: 0.0073 },
      { id: 5299, name: "Kwuarm seed", quantity: 0.0065 },
      { id: 5300, name: "Snapdragon seed", quantity: 0.0033 },
      { id: 5301, name: "Cadantine seed", quantity: 0.0057 },
      { id: 5302, name: "Lantadyme seed", quantity: 0.0049 },
      { id: 5303, name: "Dwarf weed seed", quantity: 0.0041 },
      { id: 5304, name: "Torstol seed", quantity: 0.0024 }
    ],
    notes: "Rates assume Rogues outfit (doubles loot) and Ardougne hard diary. Success rate increases significantly with level."
  },
  {
    id: "thieving_high_master_farmers",
    name: "Master Farmers (High Level)",
    skill: "thieving",
    levelReq: 94,
    xpEach: 43,
    gpEach: 300,
    itemId: 5295,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 5295, name: "Ranarr seed", quantity: 0.1 },
      { id: 5300, name: "Snapdragon seed", quantity: 0.05 },
      { id: 5281, name: "Belladonna seed", quantity: 0.15 },
      { id: 5297, name: "Irit seed", quantity: 0.15 },
      { id: 5299, name: "Kwuarm seed", quantity: 0.12 },
      { id: 5302, name: "Lantadyme seed", quantity: 0.08 },
      { id: 5303, name: "Dwarf weed seed", quantity: 0.06 }
    ],
    notes: "Requires Hard Ardougne Diary for 100% success rate"
  },
  
  // Chests and other methods
  {
    id: "thieving_rogues_castle",
    name: "Stealing from Rogues' Castle chests",
    skill: "thieving",
    levelReq: 84,
    xpEach: 100,
    gpEach: 200,
    itemId: 995,
    isMembers: true,
    inputItems: [],
    outputItems: [
      { id: 995, name: "Coins", quantity: 200 }
    ],
    notes: "Located in deep Wilderness"
  },
  {
    id: "thieving_pyramid_plunder",
    name: "Pyramid Plunder",
    skill: "thieving",
    levelReq: 91,
    xpEach: 650,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 50,
    inputItems: [
      { id: 2446, name: "Antipoison(4)", quantity: 0.125 }
    ],
    outputItems: [
      { id: 9050, name: "Pharaoh's sceptre", quantity: 0.0002 },
      { id: 9032, name: "Golden scarab", quantity: 0.005 },
      { id: 9036, name: "Golden statuette", quantity: 0.005 },
      { id: 9026, name: "Ancient seal", quantity: 0.005 }
    ],
    notes: "XP rates vary based on room reached and efficiency. Profit heavily depends on sceptre drops."
  },
  {
    id: "thieving_dorgesh_kaan_chests",
    name: "Dorgesh-Kaan Rich Chests",
    skill: "thieving",
    levelReq: 78,
    xpEach: 650,
    gpEach: 400,
    itemId: 995,
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
    itemId: 23778,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 300 },
      { id: 23778, name: "Enhanced crystal teleport seed", quantity: 0.0005 },
      { id: 23866, name: "Crystal shard", quantity: 0.05 }
    ],
    notes: "Requires Song of the Elves quest"
  },
  {
    id: "thieving_vyres",
    name: "Pickpocketing Vyres",
    skill: "thieving",
    levelReq: 82,
    xpEach: 306.9,
    gpEach: 400,
    itemId: 995,
    isMembers: true,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 400 },
      { id: 1618, name: "Uncut diamond", quantity: 0.01 },
      { id: 1620, name: "Uncut ruby", quantity: 0.02 }
    ],
    notes: "Requires Sins of the Father quest"
  },
  {
    id: "thieving_tzhaar_hur",
    name: "TzHaar-Hur",
    skill: "thieving",
    levelReq: 90,
    xpEach: 103.4,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 11133, name: "Dodgy necklace", quantity: 0.1 }
    ],
    outputItems: [
      { id: 6529, name: "Tokkul", quantity: 5 },
      { id: 1623, name: "Uncut sapphire", quantity: 0.0256 },
      { id: 1621, name: "Uncut emerald", quantity: 0.0205 },
      { id: 1619, name: "Uncut ruby", quantity: 0.0154 },
      { id: 1617, name: "Uncut diamond", quantity: 0.0051 }
    ],
    notes: "Requires Thieving cape and Hard Ardougne Diary. Must wear ice gloves. Tokkul can be exchanged for onyx at TzHaar shops."
  }
]; 