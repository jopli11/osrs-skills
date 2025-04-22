import { SkillName } from "@/lib/types";
import { miningMethods } from "./mining";
import { herbloreMethods } from "./herblore";
import { hunterMethods } from "./hunter";
import { magicMethods } from "./magic";

/**
 * Training method interface
 */
export interface TrainingMethod {
  id: string;           // Unique identifier for the method
  name: string;         // Display name of the method
  level: number;        // Level required
  xpEach: number;       // XP gained per action
  gpEach: number;       // GP cost/profit per action (negative = cost, positive = profit)
  isMembers: boolean;   // Whether this method is members-only
  inputItems?: {        // Optional input items required
    name: string;
    quantity: number;
    price?: number;
  }[];
  outputItems?: {       // Optional output items produced
    name: string;
    quantity: number;
    price?: number;
  }[];
  notes: string;        // Optional notes about the method
  estimatedActionsPerHour?: number;  // Estimated actions per hour for XP/hr calculations
}

/**
 * Training methods by skill
 */
export const trainingMethods: Record<SkillName, TrainingMethod[]> = {
  // COMBAT SKILLS
  attack: [
    {
      id: "att_1",
      name: "Cows (1-20)",
      level: 1,
      xpEach: 16,
      gpEach: 20,
      isMembers: false,
      estimatedActionsPerHour: 200,
      notes: "Kill cows in Lumbridge or Burthorpe. Collect cowhides for profit."
    },
    {
      id: "att_2",
      name: "Rock Crabs (20-40)",
      level: 20,
      xpEach: 50,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 300,
      notes: "AFK training at Rock Crabs on Waterbirth Island. High HP, low damage."
    },
    {
      id: "att_3",
      name: "Sand Crabs (40-60)",
      level: 40,
      xpEach: 60,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 350,
      notes: "Slightly better than Rock Crabs, found on Zeah."
    },
    {
      id: "att_4",
      name: "Nightmare Zone (60-99)",
      level: 60,
      xpEach: 100,
      gpEach: -150,
      isMembers: true,
      estimatedActionsPerHour: 500,
      notes: "Using absorption potions and overloads for maximum efficiency."
    },
    {
      id: "atk_sand_crabs",
      name: "Sand Crabs",
      level: 1,
      xpEach: 60,
      gpEach: -2,
      isMembers: true,
      notes: "AFK training method at Sand Crabs. Cost includes food and equipment repairs.",
      estimatedActionsPerHour: 1200
    },
    {
      id: "atk_ammonite_crabs",
      name: "Ammonite Crabs",
      level: 15,
      xpEach: 85,
      gpEach: -2.5,
      isMembers: true,
      notes: "Higher XP than Sand Crabs but requires Bone Voyage quest. Cost includes food and equipment.",
      estimatedActionsPerHour: 1200
    },
    {
      id: "atk_nightmare_zone",
      name: "Nightmare Zone",
      level: 70,
      xpEach: 120,
      gpEach: -10,
      isMembers: true,
      notes: "Efficient XP with absorption potions and overloads. Cost includes potions and repairs.",
      estimatedActionsPerHour: 1500
    }
  ],
  
  // GATHERING SKILLS
  fishing: [
    {
      id: "fishing_shrimps",
      name: "Shrimps/Anchovies",
      level: 1,
      xpEach: 10,
      gpEach: 25,
      isMembers: false,
      outputItems: [
        { name: "Raw shrimps", quantity: 0.7, price: 30 },
        { name: "Raw anchovies", quantity: 0.3, price: 45 }
      ],
      notes: "Beginner fishing method at Lumbridge or Draynor Village.",
      estimatedActionsPerHour: 600
    },
    {
      id: "fishing_trout_salmon",
      name: "Trout/Salmon",
      level: 20,
      xpEach: 70,
      gpEach: 20,
      isMembers: false,
      inputItems: [
        { name: "Feather", quantity: 1, price: 2 }
      ],
      outputItems: [
        { name: "Raw trout", quantity: 0.7, price: 17 },
        { name: "Raw salmon", quantity: 0.3, price: 50 }
      ],
      notes: "Fly fishing at Barbarian Village or Shilo Village. Requires feathers.",
      estimatedActionsPerHour: 900
    },
    {
      id: "fishing_barbarian",
      name: "Barbarian Fishing",
      level: 48,
      xpEach: 100,
      gpEach: -2,
      isMembers: true,
      inputItems: [
        { name: "Feather", quantity: 1, price: 2 }
      ],
      notes: "High XP method that also trains Strength and Agility. No profit as fish can't be kept.",
      estimatedActionsPerHour: 1200
    },
    {
      id: "fishing_monkfish",
      name: "Monkfish",
      level: 62,
      xpEach: 120,
      gpEach: 300,
      isMembers: true,
      outputItems: [
        { name: "Raw monkfish", quantity: 1, price: 300 }
      ],
      notes: "Profitable fishing method. Requires completion of Swan Song quest.",
      estimatedActionsPerHour: 280
    },
    {
      id: "fishing_karambwan",
      name: "Karambwan",
      level: 65,
      xpEach: 105,
      gpEach: 800,
      isMembers: true,
      outputItems: [
        { name: "Raw karambwan", quantity: 1, price: 800 }
      ],
      notes: "Very profitable fishing method. Requires completion of Tai Bwo Wannai Trio quest.",
      estimatedActionsPerHour: 320
    },
    {
      id: "fishing_minnow",
      name: "Minnow",
      level: 82,
      xpEach: 26,
      gpEach: 110,
      isMembers: true,
      outputItems: [
        { name: "Raw shark (from minnows)", quantity: 0.0625, price: 1760 }
      ],
      notes: "Fishing minnows which can be traded for sharks. Requires Fishing Guild and Angler's outfit.",
      estimatedActionsPerHour: 5000
    },
    {
      id: "fishing_infernal_eel",
      name: "Infernal Eels",
      level: 80,
      xpEach: 95,
      gpEach: 230,
      isMembers: true,
      notes: "AFK method in TzHaar area. Eels can be broken for onyx bolt tips, tokkul and lava shards.",
      estimatedActionsPerHour: 250
    },
    {
      id: "fishing_sacred_eel",
      name: "Sacred Eels",
      level: 87,
      xpEach: 105,
      gpEach: 350,
      isMembers: true,
      notes: "AFK method in Zul-Andra. Eels can be cut for zulrah scales.",
      estimatedActionsPerHour: 220
    },
    {
      id: "fishing_anglerfish",
      name: "Anglerfish",
      level: 82,
      xpEach: 120,
      gpEach: 1200,
      isMembers: true,
      outputItems: [
        { name: "Raw anglerfish", quantity: 1, price: 1200 }
      ],
      notes: "Very profitable but slow fishing method in Piscarilius. Requires 100% Piscarilius favor.",
      estimatedActionsPerHour: 120
    }
  ],
  
  // PRODUCTION SKILLS
  cooking: [
    {
      id: "cooking_shrimps",
      name: "Shrimps",
      level: 1,
      xpEach: 30,
      gpEach: 10,
      isMembers: false,
      inputItems: [
        { name: "Raw shrimps", quantity: 1, price: 30 }
      ],
      outputItems: [
        { name: "Shrimps", quantity: 0.6, price: 50 }
      ],
      notes: "Beginner cooking method. High burn rate at low levels.",
      estimatedActionsPerHour: 1000
    },
    {
      id: "cooking_trout",
      name: "Trout",
      level: 15,
      xpEach: 70,
      gpEach: -5,
      isMembers: false,
      inputItems: [
        { name: "Raw trout", quantity: 1, price: 17 }
      ],
      outputItems: [
        { name: "Trout", quantity: 0.7, price: 15 }
      ],
      notes: "Fast cooking XP for low levels.",
      estimatedActionsPerHour: 1200
    },
    {
      id: "cooking_salmon",
      name: "Salmon",
      level: 25,
      xpEach: 90,
      gpEach: -10,
      isMembers: false,
      inputItems: [
        { name: "Raw salmon", quantity: 1, price: 50 }
      ],
      outputItems: [
        { name: "Salmon", quantity: 0.8, price: 45 }
      ],
      notes: "Good balance of XP and low cost.",
      estimatedActionsPerHour: 1100
    },
    {
      id: "cooking_karambwan",
      name: "Karambwan",
      level: 30,
      xpEach: 190,
      gpEach: -100,
      isMembers: true,
      inputItems: [
        { name: "Raw karambwan", quantity: 1, price: 800 }
      ],
      outputItems: [
        { name: "Cooked karambwan", quantity: 0.9, price: 700 }
      ],
      notes: "Fast cooking XP but at a loss. Requires Tai Bwo Wannai Trio quest.",
      estimatedActionsPerHour: 1450
    },
    {
      id: "cooking_monkfish",
      name: "Monkfish",
      level: 62,
      xpEach: 150,
      gpEach: 20,
      isMembers: true,
      inputItems: [
        { name: "Raw monkfish", quantity: 1, price: 300 }
      ],
      outputItems: [
        { name: "Monkfish", quantity: 0.9, price: 340 }
      ],
      notes: "Good XP and small profit.",
      estimatedActionsPerHour: 1100
    },
    {
      id: "cooking_shark",
      name: "Shark",
      level: 80,
      xpEach: 210,
      gpEach: -150,
      isMembers: true,
      inputItems: [
        { name: "Raw shark", quantity: 1, price: 1760 }
      ],
      outputItems: [
        { name: "Shark", quantity: 0.95, price: 1600 }
      ],
      notes: "Fast XP but at a loss. Lower burn rate at Hosidius kitchen with 100% favor.",
      estimatedActionsPerHour: 1400
    },
    {
      id: "cooking_anglerfish",
      name: "Anglerfish",
      level: 84,
      xpEach: 230,
      gpEach: -50,
      isMembers: true,
      inputItems: [
        { name: "Raw anglerfish", quantity: 1, price: 1200 }
      ],
      outputItems: [
        { name: "Anglerfish", quantity: 0.96, price: 1150 }
      ],
      notes: "Good XP with small loss. Requires Hosidius kitchen for best results.",
      estimatedActionsPerHour: 1200
    }
  ],
  
  // Only skeleton entries for other skills - will need to be filled out
  strength: [],
  defence: [],
  ranged: [],
  prayer: [],
  magic: [
    {
      id: "magic_early_quests",
      name: "Early Magic Quests",
      level: 1,
      xpEach: 1200,
      gpEach: 0,
      isMembers: false,
      estimatedActionsPerHour: 1,
      notes: "Complete Witch's Potion and Imp Catcher quests to quickly reach level 10."
    },
    {
      id: "magic_strike_spells",
      name: "Strike Spells",
      level: 1,
      xpEach: 5.5,
      gpEach: -15,
      isMembers: false,
      inputItems: [
        { name: "Mind rune", quantity: 1 },
        { name: "Air rune", quantity: 1 }
      ],
      estimatedActionsPerHour: 1200,
      notes: "Cast strike spells on monsters for early levels. Consider using staff of air to save on runes."
    },
    {
      id: "magic_enchant_bolts",
      name: "Enchant Crossbow Bolts",
      level: 4,
      xpEach: 9,
      gpEach: -490,
      isMembers: true,
      inputItems: [
        { name: "Cosmic rune", quantity: 1 },
        { name: "Opal bolts", quantity: 10 }
      ],
      outputItems: [
        { name: "Opal bolts (e)", quantity: 10 }
      ],
      estimatedActionsPerHour: 5500,
      notes: "Very fast XP method that can be done while running or training other skills. Expensive but efficient."
    },
    {
      id: "magic_lv1_enchant",
      name: "Lvl-1 Enchant",
      level: 7,
      xpEach: 17.5,
      gpEach: -80,
      isMembers: true,
      inputItems: [
        { name: "Cosmic rune", quantity: 1 },
        { name: "Sapphire jewelry", quantity: 1 }
      ],
      estimatedActionsPerHour: 1800,
      notes: "Enchant sapphire jewelry into jewelry of binding. Make your own jewelry with crafting for better cost efficiency."
    },
    {
      id: "magic_low_alch",
      name: "Low Level Alchemy",
      level: 21,
      xpEach: 31,
      gpEach: -140,
      isMembers: false,
      inputItems: [
        { name: "Nature rune", quantity: 1 },
        { name: "Fire rune", quantity: 3 },
        { name: "Item to alch", quantity: 1 }
      ],
      estimatedActionsPerHour: 1200,
      notes: "Alch items that minimize loss or potentially profit. Good for training while doing other activities."
    },
    {
      id: "magic_teleport_varrock",
      name: "Varrock Teleport",
      level: 25,
      xpEach: 35,
      gpEach: -95,
      isMembers: false,
      inputItems: [
        { name: "Law rune", quantity: 1 },
        { name: "Air rune", quantity: 3 },
        { name: "Fire rune", quantity: 1 }
      ],
      estimatedActionsPerHour: 1400,
      notes: "Cast Varrock teleport repeatedly. Efficient for training while doing activities that return you to Varrock."
    },
    {
      id: "magic_superheat",
      name: "Superheat Item",
      level: 43,
      xpEach: 53,
      gpEach: -200,
      isMembers: true,
      inputItems: [
        { name: "Nature rune", quantity: 1 },
        { name: "Fire rune", quantity: 4 },
        { name: "Ore", quantity: 1 }
      ],
      outputItems: [
        { name: "Bar", quantity: 1 }
      ],
      estimatedActionsPerHour: 1300,
      notes: "Trains Magic and Smithing simultaneously. Can break even or profit with the right ores."
    },
    {
      id: "magic_camelot_teleport",
      name: "Camelot Teleport",
      level: 45,
      xpEach: 55.5,
      gpEach: -95,
      isMembers: true,
      inputItems: [
        { name: "Law rune", quantity: 1 },
        { name: "Air rune", quantity: 5 }
      ],
      estimatedActionsPerHour: 1400,
      notes: "Cast Camelot teleport repeatedly. Higher XP than Varrock teleport for similar cost."
    },
    {
      id: "magic_high_alch",
      name: "High Level Alchemy",
      level: 55,
      xpEach: 65,
      gpEach: -180,
      isMembers: false,
      inputItems: [
        { name: "Nature rune", quantity: 1 },
        { name: "Fire rune", quantity: 5 },
        { name: "Item to alch", quantity: 1 }
      ],
      estimatedActionsPerHour: 1200,
      notes: "Standard magic training method. Research profitable items to alch to minimize losses or even profit."
    },
    {
      id: "magic_ice_burst",
      name: "Ice Burst on Slayer Tasks",
      level: 70,
      xpEach: 400,
      gpEach: -350,
      isMembers: true,
      inputItems: [
        { name: "Water rune", quantity: 4 },
        { name: "Chaos rune", quantity: 4 },
        { name: "Death rune", quantity: 2 }
      ],
      estimatedActionsPerHour: 600,
      notes: "Burst stacked monsters on Slayer tasks such as dust devils or nechryaels. High XP rates and chance to profit from drops."
    },
    {
      id: "magic_string_jewellery",
      name: "String Jewellery",
      level: 80,
      xpEach: 83,
      gpEach: -250,
      isMembers: true,
      inputItems: [
        { name: "Astral rune", quantity: 2 },
        { name: "Earth rune", quantity: 10 },
        { name: "Cosmic rune", quantity: 2 }
      ],
      estimatedActionsPerHour: 1800,
      notes: "Cast String Jewellery on lunar spellbook to string 27 amulets at once. AFK method that's more cost-effective than combat spells."
    },
    {
      id: "magic_ice_barrage",
      name: "Ice Barrage",
      level: 94,
      xpEach: 520,
      gpEach: -1200,
      isMembers: true,
      inputItems: [
        { name: "Water rune", quantity: 6 },
        { name: "Blood rune", quantity: 2 },
        { name: "Death rune", quantity: 4 }
      ],
      estimatedActionsPerHour: 500,
      notes: "Barrage monsters in the Maniacal Monkey Cave after Monkey Madness II or on Slayer tasks. Very fast XP but expensive."
    }
  ],
  runecraft: [],
  construction: [],
  hitpoints: [],
  agility: [
    {
      id: "agility_gnome_course",
      name: "Gnome Stronghold Course",
      level: 1,
      xpEach: 86.5,
      gpEach: 0,
      isMembers: false,
      estimatedActionsPerHour: 45,
      notes: "Beginner agility course located in the Tree Gnome Stronghold. Each lap takes around 80 seconds."
    },
    {
      id: "agility_tourist_trap",
      name: "The Tourist Trap Quest",
      level: 1,
      xpEach: 9250,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 0.2,
      notes: "Complete The Tourist Trap quest and use the XP reward on Agility twice for a total of 9,250 XP. Gets you from level 1 to 26 instantly."
    },
    {
      id: "agility_questing",
      name: "Early Questing",
      level: 1,
      xpEach: 19700,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 0.1,
      notes: "Complete The Tourist Trap, Recruitment Drive, The Depths of Despair and The Grand Tree for a total of 19,700 XP. Gets you from level 1 to 33."
    },
    {
      id: "agility_draynor_course",
      name: "Draynor Village Rooftop",
      level: 10,
      xpEach: 120,
      gpEach: 5,
      isMembers: false,
      estimatedActionsPerHour: 42,
      notes: "First rooftop course with chance of getting Marks of Grace. Each lap takes around 85 seconds."
    },
    {
      id: "agility_al_kharid_course",
      name: "Al Kharid Rooftop",
      level: 20,
      xpEach: 180,
      gpEach: 8,
      isMembers: false,
      estimatedActionsPerHour: 35,
      notes: "Second rooftop course. Each lap takes around 100 seconds and provides Marks of Grace."
    },
    {
      id: "agility_brimhaven_arena",
      name: "Brimhaven Agility Arena",
      level: 20,
      xpEach: 740,
      gpEach: -4,
      isMembers: true,
      estimatedActionsPerHour: 40,
      notes: "Fastest XP from levels 20-47. 200 coins entrance fee. Focus on Floor spikes trap. Up to 30-45k XP/hr with Summer pie boosts."
    },
    {
      id: "agility_varrock_course",
      name: "Varrock Rooftop",
      level: 30,
      xpEach: 238,
      gpEach: 12,
      isMembers: true,
      estimatedActionsPerHour: 34,
      notes: "Third rooftop course. Each lap takes around 105 seconds and provides Marks of Grace."
    },
    {
      id: "agility_canifis_course",
      name: "Canifis Rooftop",
      level: 40,
      xpEach: 240,
      gpEach: 16,
      isMembers: true,
      estimatedActionsPerHour: 36,
      notes: "Best course for collecting Marks of Grace. Each lap takes around 100 seconds."
    },
    {
      id: "agility_wilderness_course",
      name: "Wilderness Agility Course",
      level: 47,
      xpEach: 571,
      gpEach: 15,
      isMembers: true,
      estimatedActionsPerHour: 95,
      notes: "Fastest XP from levels 47-62. Risk of PKers but provides agility tickets that can be traded for XP. Level 52 required (can boost from 47)."
    },
    {
      id: "agility_falador_course",
      name: "Falador Rooftop",
      level: 50,
      xpEach: 440,
      gpEach: 14,
      isMembers: true,
      estimatedActionsPerHour: 30,
      notes: "Fifth rooftop course. Each lap takes around 120 seconds and provides Marks of Grace."
    },
    {
      id: "agility_seers_course",
      name: "Seers' Village Rooftop",
      level: 60,
      xpEach: 570,
      gpEach: 18,
      isMembers: true,
      estimatedActionsPerHour: 45,
      notes: "Efficient course with Kandarin hard diary teleport. Each lap provides Marks of Grace."
    },
    {
      id: "agility_hallowed_sepulchre",
      name: "Hallowed Sepulchre",
      level: 62,
      xpEach: 5700,
      gpEach: 4000,
      isMembers: true,
      estimatedActionsPerHour: 17,
      notes: "Fastest XP from levels 62-99. Highly profitable at 92+ Agility. Requires completion of Sins of the Father quest."
    },
    {
      id: "agility_pollnivneach_course",
      name: "Pollnivneach Rooftop",
      level: 70,
      xpEach: 890,
      gpEach: 22,
      isMembers: true,
      estimatedActionsPerHour: 25,
      notes: "Seventh rooftop course. Each lap takes around 144 seconds and provides Marks of Grace."
    },
    {
      id: "agility_rellekka_course",
      name: "Rellekka Rooftop",
      level: 80,
      xpEach: 780,
      gpEach: 24,
      isMembers: true,
      estimatedActionsPerHour: 28,
      notes: "Eighth rooftop course. Each lap takes around 129 seconds and provides Marks of Grace."
    },
    {
      id: "agility_ardougne_course",
      name: "Ardougne Rooftop",
      level: 90,
      xpEach: 1037,
      gpEach: 28,
      isMembers: true,
      estimatedActionsPerHour: 45,
      notes: "Final rooftop course. Most efficient for Marks of Grace after Canifis. Ardougne elite diary gives 25% more Marks."
    },
    {
      id: "agility_prif_course",
      name: "Prifddinas Agility Course",
      level: 75,
      xpEach: 1240,
      gpEach: 30,
      isMembers: true,
      estimatedActionsPerHour: 22,
      notes: "Alternative to Hallowed Sepulchre. Less XP but more AFK. Chance to obtain Crystal Shards. Requires Song of the Elves quest."
    }
  ],
  herblore: [
    {
      id: "herblore_quests",
      name: "Initial Quests (1-32)",
      level: 1,
      xpEach: 29000,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 1,
      notes: "Complete Druidic Ritual, Jungle Potion, Recruitment Drive, and The Dig Site quests to get from level 1 to 32 Herblore quickly."
    },
    {
      id: "herblore_attack_potions",
      name: "Attack Potions (3-15)",
      level: 3,
      xpEach: 25,
      gpEach: -150,
      isMembers: true,
      estimatedActionsPerHour: 2000,
      notes: "Make attack potions using guam leaf and eye of newt. Fast but costly method."
    },
    {
      id: "herblore_strength_potions",
      name: "Strength Potions (12-25)",
      level: 12,
      xpEach: 50,
      gpEach: -250,
      isMembers: true,
      estimatedActionsPerHour: 2000,
      notes: "Make strength potions using tarromin and limpwurt root. Faster XP than attack potions."
    },
    {
      id: "herblore_herb_cleaning",
      name: "Cleaning Herbs (Any Level)",
      level: 3,
      xpEach: 10,
      gpEach: 50,
      isMembers: true,
      estimatedActionsPerHour: 3000,
      notes: "Clean grimy herbs for small profit and XP. Good for bank building or players on a budget."
    },
    {
      id: "herblore_prayer_potions",
      name: "Prayer Potions (38-45)",
      level: 38,
      xpEach: 87.5,
      gpEach: -300,
      isMembers: true,
      estimatedActionsPerHour: 2200,
      notes: "Make prayer potions using ranarr weed and snape grass. Good XP but costly."
    },
    {
      id: "herblore_super_attack",
      name: "Super Attack (45-55)",
      level: 45,
      xpEach: 100,
      gpEach: -400,
      isMembers: true,
      estimatedActionsPerHour: 2200,
      notes: "Make super attack potions using irit leaf and eye of newt."
    },
    {
      id: "herblore_super_strength",
      name: "Super Strength (55-63)",
      level: 55,
      xpEach: 125,
      gpEach: -450,
      isMembers: true,
      estimatedActionsPerHour: 2200,
      notes: "Make super strength potions using kwuarm and limpwurt root."
    },
    {
      id: "herblore_super_restore",
      name: "Super Restore (63-72)",
      level: 63,
      xpEach: 142.5,
      gpEach: -500,
      isMembers: true,
      estimatedActionsPerHour: 2200,
      notes: "Make super restore potions using snapdragon and red spiders' eggs."
    },
    {
      id: "herblore_stamina",
      name: "Stamina Potions (77-90)",
      level: 77,
      xpEach: 25.5,
      gpEach: -700,
      isMembers: true,
      estimatedActionsPerHour: 2300,
      notes: "Make stamina potions using super energy potions and amylase crystals. Fast, commonly used method."
    },
    {
      id: "herblore_sara_brew",
      name: "Saradomin Brew (81-90)",
      level: 81,
      xpEach: 180,
      gpEach: -600,
      isMembers: true,
      estimatedActionsPerHour: 2200,
      notes: "Make Saradomin brews using toadflax and crushed bird's nests. High XP but expensive."
    },
    {
      id: "herblore_super_combat",
      name: "Super Combat Potion (90-99)",
      level: 90,
      xpEach: 150,
      gpEach: -800,
      isMembers: true,
      estimatedActionsPerHour: 2100,
      notes: "Make super combat potions using torstol and super attack/strength/defence potions. High level, high cost method."
    }
  ],
  thieving: [],
  crafting: [],
  fletching: [],
  slayer: [],
  hunter: [
    {
      id: "hunter_quiz",
      name: "Natural History Quiz (1-9)",
      level: 1,
      xpEach: 1000,
      gpEach: 0,
      isMembers: false,
      estimatedActionsPerHour: 1,
      notes: "Complete the Natural History Quiz in Varrock Museum basement for 1,000 Hunter XP, which will advance you from level 1 to 9."
    },
    {
      id: "hunter_birdhouses_low",
      name: "Bird House Runs (9-24)",
      level: 9,
      xpEach: 280,
      gpEach: 500,
      isMembers: true,
      estimatedActionsPerHour: 4,
      notes: "Set up regular bird houses on Fossil Island and collect them after ~50 minutes. Requires Bone Voyage quest. Very time-efficient training method."
    },
    {
      id: "hunter_birdhouses_mid",
      name: "Bird House Runs (24-59)",
      level: 24,
      xpEach: 560,
      gpEach: 700,
      isMembers: true,
      estimatedActionsPerHour: 4,
      notes: "Progress through willow, teak and maple bird houses as you level up. Profitable with bird nests giving seeds and chance of getting a bird's egg."
    },
    {
      id: "hunter_birdhouses_high",
      name: "Bird House Runs (59-99)",
      level: 59,
      xpEach: 1020,
      gpEach: 1100,
      isMembers: true,
      estimatedActionsPerHour: 4,
      notes: "Use the highest tier bird house available to you. At level 89, redwood bird houses give 1,200 XP each and are very profitable."
    },
    {
      id: "hunter_feldip_weasels",
      name: "Feldip Weasels (9-29)",
      level: 9,
      xpEach: 48,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 300,
      notes: "Use box traps to catch weasels in Feldip Hills. Fast experience, but no profit."
    },
    {
      id: "hunter_swamp_lizards",
      name: "Swamp Lizards (29-43)",
      level: 29,
      xpEach: 152,
      gpEach: 300,
      isMembers: true,
      estimatedActionsPerHour: 260,
      notes: "Catch swamp lizards in the swamp south of Castle Wars. Requires small fishing nets and ropes."
    },
    {
      id: "hunter_falconry",
      name: "Falconry (43-60)",
      level: 43,
      xpEach: 156,
      gpEach: 50,
      isMembers: true,
      estimatedActionsPerHour: 280,
      notes: "Rent a falcon at the Falconry area north of Eagles' Peak to catch kebbits. No equipment needed, just 500 coins for the falcon."
    },
    {
      id: "hunter_red_salamanders",
      name: "Red Salamanders (60-67)",
      level: 60,
      xpEach: 272,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 350,
      notes: "Catch red salamanders north of Castle Wars. Fast XP with multiple traps, but no profit."
    },
    {
      id: "hunter_black_salamanders",
      name: "Black Salamanders (67-73)",
      level: 67,
      xpEach: 319,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 330,
      notes: "Catch black salamanders in the Wilderness. Fastest XP at this level, but has PKing risk."
    },
    {
      id: "hunter_black_chinchompas",
      name: "Black Chinchompas (73-99)",
      level: 73,
      xpEach: 315,
      gpEach: 1500,
      isMembers: true,
      estimatedActionsPerHour: 300,
      notes: "Catch black chinchompas in the Wilderness. High XP rates and very profitable, but has PKing risk. Requires Eagles' Peak quest."
    },
    {
      id: "hunter_drift_net",
      name: "Drift Net Fishing (44-99)",
      level: 44,
      xpEach: 55,
      gpEach: 100,
      isMembers: true,
      estimatedActionsPerHour: 1500,
      notes: "Trains both Hunter and Fishing at the same time. Located underwater at Fossil Island. Efficient for overall account progression."
    },
    {
      id: "hunter_herbiboar",
      name: "Herbiboar (80-99)",
      level: 80,
      xpEach: 700,
      gpEach: 1200,
      isMembers: true,
      estimatedActionsPerHour: 120,
      notes: "Track and catch herbiboars on Fossil Island. Good XP, profitable, and gives Herblore supplies. Higher Herblore level increases profit."
    }
  ],
  mining: [
    {
      id: "mining_copper_tin",
      name: "Copper & Tin (1-15)",
      level: 1,
      xpEach: 17.5,
      gpEach: 15,
      isMembers: false,
      estimatedActionsPerHour: 420,
      notes: "Mine copper and tin ore at the South-East Lumbridge Swamp mine or Varrock East mine."
    },
    {
      id: "mining_iron",
      name: "Iron Ore (15-75)",
      level: 15,
      xpEach: 35,
      gpEach: 25,
      isMembers: false,
      estimatedActionsPerHour: 600,
      notes: "Mining iron at Al Kharid mine or Varrock East mine. Bank the ores for profit."
    },
    {
      id: "mining_power_iron",
      name: "Power Mining Iron (15-75)",
      level: 15,
      xpEach: 35,
      gpEach: 0,
      isMembers: false,
      estimatedActionsPerHour: 1200,
      notes: "Mine iron ore and drop immediately for faster XP. Best done at Mining Guild or Al Kharid."
    },
    {
      id: "mining_granite",
      name: "Power Mining Granite (45-99)",
      level: 45,
      xpEach: 65,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 900,
      notes: "Mine granite at the Quarry in the desert and drop immediately for fast XP."
    },
    {
      id: "mining_3tick_granite",
      name: "3-Tick Granite (45-99)",
      level: 45,
      xpEach: 65,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 1800,
      notes: "The fastest mining XP in the game. Very click intensive method using tick manipulation."
    },
    {
      id: "mining_mlm",
      name: "Motherlode Mine (30-99)",
      level: 30,
      xpEach: 60,
      gpEach: 100,
      isMembers: true,
      estimatedActionsPerHour: 180,
      notes: "AFK and profitable mining method. Obtain golden nuggets for Prospector outfit and coal bag."
    },
    {
      id: "mining_mlm_upper",
      name: "Motherlode Mine Upper Level (72-99)",
      level: 72,
      xpEach: 60,
      gpEach: 150,
      isMembers: true,
      estimatedActionsPerHour: 220,
      notes: "More AFK than lower level with higher profit. Requires 100 golden nuggets to unlock."
    },
    {
      id: "mining_volcanic",
      name: "Volcanic Mine (50-99)",
      level: 50,
      xpEach: 60,
      gpEach: 0,
      isMembers: true,
      estimatedActionsPerHour: 1200,
      notes: "Team-based mining method with high XP rates. Requires Fossil Island access."
    },
    {
      id: "mining_gem_rocks",
      name: "Gem Rocks (40-99)",
      level: 40,
      xpEach: 65,
      gpEach: 600,
      isMembers: true,
      estimatedActionsPerHour: 240,
      notes: "Profitable mining method. Best done with Karamja hard diary completed for underground access."
    },
    {
      id: "mining_amethyst",
      name: "Amethyst (92-99)",
      level: 92,
      xpEach: 240,
      gpEach: 1500,
      isMembers: true,
      estimatedActionsPerHour: 100,
      notes: "Very AFK mining method with decent profit. Located in the Mining Guild."
    },
    {
      id: "mining_blast_mine_75",
      name: "Blast Mine (75-99)",
      level: 75,
      xpEach: 250,
      gpEach: 800,
      isMembers: true,
      estimatedActionsPerHour: 250,
      notes: "Good balance of XP and profit. Requires 100% Lovakengj favor."
    }
  ],
  smithing: [],
  firemaking: [],
  woodcutting: [],
  farming: []
}; 