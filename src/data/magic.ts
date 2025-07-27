import { MethodRow } from "@/lib/types";

/**
 * Magic skill training methods
 */
export const magicMethods: MethodRow[] = [
  // Questing methods
  {
    id: "early_quests",
    name: "Early Magic Quests",
    skill: "magic",
    levelReq: 1,
    xpEach: 1200, // Combined XP from Witch's Potion and Imp Catcher
    gpEach: 0,
    estimatedActionsPerHour: 1,
    inputItems: [],
    outputItems: [],
    isMembers: false,
    notes: "Complete Witch's Potion and Imp Catcher for 1,200 XP, enough to reach level 10."
  },
  {
    id: "mid_quests",
    name: "Mid-level Magic Quests",
    skill: "magic",
    levelReq: 10,
    xpEach: 20900, // Combined XP from several quests
    gpEach: 0,
    estimatedActionsPerHour: 1,
    inputItems: [],
    outputItems: [],
    isMembers: true,
    notes: "Complete Fairytale I, The Grand Tree, Watchtower, and RFD Lumbridge Guide for 20,900 XP."
  },
  
  // F2P methods - Low levels
  {
    id: "strike_spells",
    name: "Strike Spells",
    skill: "magic",
    levelReq: 1,
    xpEach: 5.5, // Wind Strike XP
    gpEach: -15, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 1 },
      { id: 558, name: "Mind rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Cast strike spells on monsters. Use Fire Strike at level 13 for better XP."
  },
  {
    id: "confuse",
    name: "Confuse",
    skill: "magic",
    levelReq: 3,
    xpEach: 13,
    gpEach: -45, // Approximate cost per cast
    estimatedActionsPerHour: 1000,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 3 },
      { id: 557, name: "Earth rune", quantity: 2 },
      { id: 559, name: "Body rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Cast on low-level monsters repeatedly. Spell can be cast regardless of success."
  },
  {
    id: "bolt_spells",
    name: "Bolt Spells",
    skill: "magic",
    levelReq: 17,
    xpEach: 16.5, // Wind Bolt XP
    gpEach: -35, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 2 },
      { id: 562, name: "Chaos rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Better XP than strike spells but more expensive. Fire Bolt at level 35 is most effective."
  },
  {
    id: "curse",
    name: "Curse",
    skill: "magic",
    levelReq: 19,
    xpEach: 29,
    gpEach: -85, // Approximate cost per cast
    estimatedActionsPerHour: 1000,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 2 },
      { id: 557, name: "Earth rune", quantity: 3 },
      { id: 559, name: "Body rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Better XP than Confuse but more expensive. Can be cast repeatedly on the same target."
  },
  {
    id: "blast_spells",
    name: "Blast Spells",
    skill: "magic",
    levelReq: 41,
    xpEach: 28.5, // Wind Blast XP
    gpEach: -65, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 3 },
      { id: 560, name: "Death rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Higher cost but better XP than bolt spells. Fire Blast at level 59 is most effective."
  },
  {
    id: "low_alch",
    name: "Low Level Alchemy",
    skill: "magic",
    levelReq: 21,
    xpEach: 31,
    gpEach: -140, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 554, name: "Fire rune", quantity: 3 },
      { id: 561, name: "Nature rune", quantity: 1 },
      { id: 0, name: "Item to alch", quantity: 1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 0 } // Variable based on item
    ],
    isMembers: false,
    notes: "Alch items that minimize loss. Can cast every 3 ticks (1.8 seconds)."
  },
  {
    id: "high_alch",
    name: "High Level Alchemy",
    skill: "magic",
    levelReq: 55,
    xpEach: 65,
    gpEach: -180, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 554, name: "Fire rune", quantity: 5 },
      { id: 561, name: "Nature rune", quantity: 1 },
      { id: 0, name: "Item to alch", quantity: 1 }
    ],
    outputItems: [
      { id: 995, name: "Coins", quantity: 0 } // Variable based on item
    ],
    isMembers: false,
    notes: "Best passive training method. Cast every 3 ticks for 78k XP/hr and minimal loss."
  },
  
  // F2P methods - Teleports
  {
    id: "teleport_varrock",
    name: "Varrock Teleport",
    skill: "magic",
    levelReq: 25,
    xpEach: 35,
    gpEach: -95, // Approximate cost per cast
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 3 },
      { id: 554, name: "Fire rune", quantity: 1 },
      { id: 563, name: "Law rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Good XP and slightly cheaper than alchemy spells. 45.5k XP/hr."
  },
  {
    id: "teleport_lumbridge",
    name: "Lumbridge Teleport",
    skill: "magic",
    levelReq: 31,
    xpEach: 41,
    gpEach: -105, // Approximate cost per cast
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 3 },
      { id: 557, name: "Earth rune", quantity: 1 },
      { id: 563, name: "Law rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Better XP than Varrock teleport. 53.3k XP/hr."
  },
  {
    id: "teleport_falador",
    name: "Falador Teleport",
    skill: "magic",
    levelReq: 37,
    xpEach: 48,
    gpEach: -115, // Approximate cost per cast
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 3 },
      { id: 555, name: "Water rune", quantity: 1 },
      { id: 563, name: "Law rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: false,
    notes: "Better XP than Lumbridge teleport. 62.4k XP/hr."
  },
  
  // P2P methods - Enchanting
  {
    id: "enchant_lv1",
    name: "Lvl-1 Enchant",
    skill: "magic",
    levelReq: 7,
    xpEach: 17.5,
    gpEach: -80, // Approximate cost per cast
    estimatedActionsPerHour: 1700,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 1 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 0, name: "Jewelry", quantity: 1 }
    ],
    outputItems: [
      { id: 0, name: "Enchanted jewelry", quantity: 1 }
    ],
    isMembers: true,
    notes: "Enchant sapphire jewelry. Can cast up to 1,700 spells per hour. 29.8k XP/hr."
  },
  {
    id: "enchant_lv2",
    name: "Lvl-2 Enchant",
    skill: "magic",
    levelReq: 27,
    xpEach: 37,
    gpEach: -125, // Approximate cost per cast
    estimatedActionsPerHour: 1700,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 3 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 0, name: "Jewelry", quantity: 1 }
    ],
    outputItems: [
      { id: 0, name: "Enchanted jewelry", quantity: 1 }
    ],
    isMembers: true,
    notes: "Enchant emerald jewelry. 62.9k XP/hr."
  },
  {
    id: "enchant_lv3",
    name: "Lvl-3 Enchant",
    skill: "magic",
    levelReq: 49,
    xpEach: 59,
    gpEach: -145, // Approximate cost per cast
    estimatedActionsPerHour: 1700,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 5 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 0, name: "Jewelry", quantity: 1 }
    ],
    outputItems: [
      { id: 0, name: "Enchanted jewelry", quantity: 1 }
    ],
    isMembers: true,
    notes: "Enchant ruby jewelry. 100.3k XP/hr."
  },
  
  // P2P methods - Enchanting bolts
  {
    id: "enchant_opal_bolts",
    name: "Enchant Opal Bolts",
    skill: "magic",
    levelReq: 4,
    xpEach: 9,
    gpEach: -491, // Approximate cost per cast
    estimatedActionsPerHour: 5500,
    itemId: 877, // Opal bolts ID
    inputItems: [
      { id: 556, name: "Air rune", quantity: 2 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 877, name: "Opal bolts", quantity: 10 }
    ],
    outputItems: [
      { id: 4540, name: "Opal bolts (e)", quantity: 10 }
    ],
    isMembers: true,
    notes: "Extremely fast but expensive. Each cast enchants 10 bolts. Up to 49.5k XP/hr."
  },
  {
    id: "enchant_sapphire_bolts",
    name: "Enchant Sapphire Bolts",
    skill: "magic",
    levelReq: 7,
    xpEach: 17,
    gpEach: -914, // Approximate cost per cast
    estimatedActionsPerHour: 5500,
    itemId: 9337, // Sapphire bolts ID
    inputItems: [
      { id: 555, name: "Water rune", quantity: 1 },
      { id: 558, name: "Mind rune", quantity: 1 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 9337, name: "Sapphire bolts", quantity: 10 }
    ],
    outputItems: [
      { id: 9240, name: "Sapphire bolts (e)", quantity: 10 }
    ],
    isMembers: true,
    notes: "Very expensive but extremely fast XP. Each cast enchants 10 bolts. Up to 93.5k XP/hr."
  },
  {
    id: "enchant_ruby_bolts",
    name: "Enchant Ruby Bolts",
    skill: "magic",
    levelReq: 49,
    xpEach: 59,
    gpEach: -1768, // Approximate cost per cast
    estimatedActionsPerHour: 5500,
    itemId: 9339, // Ruby bolts ID
    inputItems: [
      { id: 554, name: "Fire rune", quantity: 5 },
      { id: 565, name: "Blood rune", quantity: 1 },
      { id: 564, name: "Cosmic rune", quantity: 1 },
      { id: 9339, name: "Ruby bolts", quantity: 10 }
    ],
    outputItems: [
      { id: 9242, name: "Ruby bolts (e)", quantity: 10 }
    ],
    isMembers: true,
    notes: "Very expensive but the fastest XP method. Each cast enchants 10 bolts. Up to 324.5k XP/hr."
  },
  
  // P2P methods - Teleports
  {
    id: "teleport_camelot",
    name: "Camelot Teleport",
    skill: "magic",
    levelReq: 45,
    xpEach: 55.5,
    gpEach: -95, // Approximate cost per cast
    estimatedActionsPerHour: 1500,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 5 },
      { id: 563, name: "Law rune", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Good XP rate and relatively cheap. 83.3k XP/hr."
  },
  {
    id: "teleport_ardougne",
    name: "Ardougne Teleport",
    skill: "magic",
    levelReq: 51,
    xpEach: 61,
    gpEach: -125, // Approximate cost per cast
    estimatedActionsPerHour: 1300,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 2 },
      { id: 563, name: "Law rune", quantity: 2 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Requires Plague City quest. Better XP than Camelot teleport but more expensive."
  },
  
  // P2P methods - Other early
  {
    id: "superheat_item",
    name: "Superheat Item",
    skill: "magic",
    levelReq: 43,
    xpEach: 53,
    gpEach: -200, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 554, name: "Fire rune", quantity: 4 },
      { id: 561, name: "Nature rune", quantity: 1 },
      { id: 0, name: "Ore", quantity: 1 }
    ],
    outputItems: [
      { id: 0, name: "Bar", quantity: 1 }
    ],
    isMembers: true,
    notes: "Trains Smithing alongside Magic. Use iron ore for minimal loss or gold ore for fast Smithing XP."
  },
  
  // P2P methods - Ancient Magicks
  {
    id: "smoke_burst",
    name: "Smoke Burst",
    skill: "magic",
    levelReq: 62,
    xpEach: 36,
    gpEach: -300, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 556, name: "Air rune", quantity: 2 },
      { id: 554, name: "Fire rune", quantity: 2 },
      { id: 562, name: "Chaos rune", quantity: 4 },
      { id: 560, name: "Death rune", quantity: 2 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Cast on stacks of monsters. Each target hit grants full XP, making this very efficient."
  },
  {
    id: "ice_burst",
    name: "Ice Burst",
    skill: "magic",
    levelReq: 70,
    xpEach: 40,
    gpEach: -350, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 4 },
      { id: 562, name: "Chaos rune", quantity: 4 },
      { id: 560, name: "Death rune", quantity: 2 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Freezes targets for 16.8 seconds and deals more damage than Smoke Burst."
  },
  {
    id: "ice_barrage",
    name: "Ice Barrage",
    skill: "magic",
    levelReq: 94,
    xpEach: 52,
    gpEach: -1200, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 6 },
      { id: 565, name: "Blood rune", quantity: 2 },
      { id: 560, name: "Death rune", quantity: 4 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Most powerful AoE freeze spell. Very expensive but excellent XP when hitting multiple targets."
  },
  
  // P2P methods - Lunar Spellbook
  {
    id: "string_jewellery",
    name: "String Jewellery",
    skill: "magic",
    levelReq: 80,
    xpEach: 83,
    gpEach: -250, // Approximate cost per cast
    estimatedActionsPerHour: 1800,
    inputItems: [
      { id: 557, name: "Earth rune", quantity: 10 },
      { id: 564, name: "Cosmic rune", quantity: 2 },
      { id: 9438, name: "Astral rune", quantity: 2 },
      { id: 0, name: "Unstrung jewelry", quantity: 27 }
    ],
    outputItems: [
      { id: 0, name: "Strung jewelry", quantity: 27 }
    ],
    isMembers: true,
    notes: "Strings 27 pieces of jewelry per cast. Up to 150k XP/hr and also trains Crafting."
  },
  {
    id: "plank_make",
    name: "Plank Make",
    skill: "magic",
    levelReq: 86,
    xpEach: 90,
    gpEach: -300, // Approximate cost per cast
    estimatedActionsPerHour: 1800,
    inputItems: [
      { id: 557, name: "Earth rune", quantity: 15 },
      { id: 561, name: "Nature rune", quantity: 1 },
      { id: 9438, name: "Astral rune", quantity: 2 },
      { id: 0, name: "Log", quantity: 1 }
    ],
    outputItems: [
      { id: 0, name: "Plank", quantity: 1 }
    ],
    isMembers: true,
    notes: "Converts logs to planks. Around 165k XP/hr and can be profitable with mahogany logs."
  },
  
  // Combat training methods
  {
    id: "crabs_magic",
    name: "Killing Crabs",
    skill: "magic",
    levelReq: 13,
    xpEach: 30, // Average XP per cast and monster
    gpEach: -80, // Approximate cost per cast
    estimatedActionsPerHour: 1000,
    inputItems: [
      { id: 0, name: "Combat runes", quantity: 1 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "AFK training method. Cast Fire Strike on Sand Crabs or Ammonite Crabs."
  },
  {
    id: "slayer_bursting",
    name: "Bursting Slayer Tasks",
    skill: "magic",
    levelReq: 70,
    xpEach: 400, // Average XP per cast on multiple targets
    gpEach: -350, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 4 },
      { id: 562, name: "Chaos rune", quantity: 4 },
      { id: 560, name: "Death rune", quantity: 2 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Cast Ice Burst on tasks like dust devils, nechryaels, and smoke devils. 250-400k XP/hr."
  },
  {
    id: "maniacal_monkeys_magic",
    name: "Bursting Maniacal Monkeys",
    skill: "magic",
    levelReq: 70,
    xpEach: 480, // Average XP per cast on multiple targets
    gpEach: -350, // Approximate cost per cast
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 4 },
      { id: 562, name: "Chaos rune", quantity: 4 },
      { id: 560, name: "Death rune", quantity: 2 }
    ],
    outputItems: [],
    isMembers: true,
    notes: "Requires MM2. Stack maniacal monkeys for up to 400-500k XP/hr."
  },
  {
    id: "magic_afk_crab_community_boss",
    name: "AFK Crab Community Boss",
    skill: "magic",
    levelReq: 40,
    xpEach: 95,
    gpEach: 50,
    isMembers: true,
    estimatedActionsPerHour: 1200,
    inputItems: [
      { id: 555, name: "Water rune", quantity: 3 },
      { id: 562, name: "Chaos rune", quantity: 2 }
    ],
    outputItems: [
      { id: 526, name: "Bones", quantity: 1 },
      { id: 0, name: "Various drops", quantity: 1 }
    ],
    notes: "New Final Dawn community boss that provides AFK magic training with decent XP rates and some profit from drops."
  }
]; 