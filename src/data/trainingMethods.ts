import { SkillName, MethodRow } from "@/lib/types";
import { miningMethods } from "./mining";
import { herbloreMethods } from "./herblore";
import { hunterMethods } from "./hunter";
import { magicMethods } from "./magic";
import { cookingMethods } from "./cooking";
import { attackMethods } from "./attack";
import { fishingMethods } from "./fishing";
import { farmingMethods } from "./farming";
import { woodcuttingMethods } from "./woodcutting";
import { firemakingMethods } from "./firemaking";
import { smithingMethods } from "./smithing";
import { slayerMethods } from "./slayer";
import { fletchingMethods } from "./fletching";
import { craftingMethods } from "./crafting";
import { agilityMethods } from "./agility";
import { hitpointsMethods } from "./hitpoints";
import { thievingMethods } from "./thieving";
import { runecraftingMethods } from "./runecrafting";
import { constructionMethods } from "./construction";
import { prayerMethods } from "./prayer";
import { rangedMethods } from "./ranged";
import { defenceMethods } from "./defence";
import { strengthMethods } from "./strength";

/**
 * Training method interface
 */
export interface TrainingMethod {
  id: string;           // Unique identifier for the method
  name: string;         // Display name of the method
  level: number;        // Level required
  xpEach: number;       // XP gained per action
  gpEach: number;       // GP cost/profit per action (negative = cost, positive = profit)
  itemId?: number;      // OSRS Item ID (Optional)
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

// Helper function to convert MethodRow to TrainingMethod
function convertMethodRowsToTrainingMethods(methods: MethodRow[]): TrainingMethod[] {
  return methods.map(method => {
    // TypeScript doesn't know about notes or estimatedActionsPerHour in MethodRow, 
    // but some implementations might have them
    const extendedMethod = method as (MethodRow & { 
      notes?: string;
      estimatedActionsPerHour?: number;
    });
    
    // Set default estimatedActionsPerHour based on skill and method type if not provided
    let defaultActions = 1200; // Default value
    
    // Adjust default actions per hour based on skill type
    if (method.skill === "mining") {
      defaultActions = method.id.includes("mlm") ? 200 : // Motherlode mine is slow
        method.id.includes("3tick") ? 1800 : // 3-tick methods are fast
        method.id.includes("amethyst") ? 140 : // Amethyst is very slow
        800; // Default mining rate
    } else if (method.skill === "fishing") {
      defaultActions = method.levelReq > 80 ? 150 : // High level fish are slow
        method.levelReq > 60 ? 250 : 
        method.levelReq > 40 ? 400 :
        600; // Low level fish are fast
    } else if (method.skill === "woodcutting") {
      defaultActions = method.levelReq > 80 ? 180 : 
        method.levelReq > 60 ? 300 : 
        500;
    } else if (method.skill === "hunter") {
      defaultActions = method.id.includes("birdhouse") ? 4 : // Bird houses are per run
        method.id.includes("drift_net") ? 1500 : 
        300; // Default hunting actions
    } else if (method.skill === "farming") {
      defaultActions = method.id.includes("tree") ? 1 : // Trees are once per day
        method.id.includes("herb") ? 8 : // Herb runs are ~8 per day
        method.id.includes("tithe") ? 100 : // Tithe farm more active
        5; // Default farming actions per day
    } else if (method.skill === "firemaking") {
      defaultActions = method.id.includes("wintertodt") ? 6 : // Wintertodt rounds per hour
        method.id.includes("pyre") ? 500 : // Pyre logs are slower
        method.id.includes("campfire") ? 1400 : // Campfire is more AFK but slower
        1485; // Standard logs burning rate
    } else if (method.skill === "smithing") {
      defaultActions = method.id.includes("platebody") ? method.levelReq > 85 ? 850 : 
                                                      method.levelReq > 65 ? 950 : 
                                                      method.levelReq > 45 ? 1000 : 1100 :
        method.id.includes("blast_furnace") ? method.id.includes("gold") ? 3700 : 
                                          method.id.includes("steel") ? 4800 : 
                                          method.id.includes("mithril") ? 4000 : 
                                          method.id.includes("adamant") ? 3600 : 
                                          method.id.includes("rune") ? 3200 : 3000 :
        method.id.includes("dart") ? 1750 :
        2600; // Default smithing rate for bars
    } else if (method.skill === "slayer") {
      defaultActions = 1; // Slayer uses a different XP model; each "action" represents a task
    } else if (method.skill === "fletching") {
      defaultActions = method.id.includes("darts") ? 2500 : // Darts are very fast
        method.id.includes("string") ? 1800 : // Stringing bows
        method.id.includes("arrows") || method.id.includes("bolts") ? 2000 : // Making arrows/bolts
        1500; // Cutting logs into bows
    } else if (method.skill === "crafting") {
      defaultActions = method.id.includes("battlestaves") ? 1100 : 
        method.id.includes("bodies") ? 900 : // Dragonhide bodies
        method.id.includes("glass") ? 1800 : // Glassblowing
        method.id.includes("rings") || method.id.includes("necklaces") || method.id.includes("bracelet") ? 1400 : // Jewelry
        1200; // Default crafting rate
    } else if (method.skill === "construction") {
      defaultActions = method.id.includes("mahogany_homes") ? 3.5 : // Mahogany Homes are per contract
        method.id.includes("mythical_cape") ? 550 :
        method.id.includes("oak_larder") ? 380 :
        method.id.includes("oak_dungeon") ? 330 :
        method.id.includes("mahogany_table") ? 450 :
        method.id.includes("teak") ? 420 :
        500; // Default construction rate
    } else if (method.skill === "strength" || method.skill === "attack" || method.skill === "defence") {
      defaultActions = method.id.includes("slayer") ? 1 : // Slayer tasks are per task
        method.id.includes("dharok") ? 1200 :
        method.id.includes("nmz") ? 1500 :
        method.id.includes("crab") ? 1400 :
        1000; // Default melee actions per hour
    } else if (method.skill === "prayer") {
      defaultActions = method.id.includes("quest") ? 1 : // Quests are one-time
        method.id.includes("camdozaal") ? 240 : // Camdozaal fish offering
        method.id.includes("altar") || method.id.includes("ectofuntus") ? 800 : // Altar offering
        2900; // Default prayer bones burying
    } else if (method.skill === "ranged") {
      defaultActions = method.id.includes("chinning") ? 2000 : // Chinchompa throwing
        method.id.includes("slayer") ? 1 : // Slayer tasks are per task
        method.id.includes("nmz") ? 1500 : // Nightmare Zone
        method.id.includes("blowpipe") ? 2000 : // Blowpipe is fast
        1200; // Default ranged actions per hour
    }
    
    return {
      id: method.id,
      name: method.name,
      level: method.levelReq,
      xpEach: method.xpEach,
      gpEach: method.gpEach,
      itemId: method.itemId,
      isMembers: method.isMembers,
      inputItems: method.inputItems?.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
      outputItems: method.outputItems?.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
      notes: extendedMethod.notes || `${method.name} training method.`, // Use notes if available or create a default
      estimatedActionsPerHour: extendedMethod.estimatedActionsPerHour || defaultActions,
    };
  });
}

/**
 * Training methods by skill
 */
export const trainingMethods: Record<SkillName, TrainingMethod[]> = {
  // Use imported method files for skills that have their own files
  attack: convertMethodRowsToTrainingMethods(attackMethods),
  fishing: convertMethodRowsToTrainingMethods(fishingMethods),
  cooking: convertMethodRowsToTrainingMethods(cookingMethods),
  mining: convertMethodRowsToTrainingMethods(miningMethods),
  herblore: convertMethodRowsToTrainingMethods(herbloreMethods),
  hunter: convertMethodRowsToTrainingMethods(hunterMethods),
  magic: convertMethodRowsToTrainingMethods(magicMethods),
  farming: convertMethodRowsToTrainingMethods(farmingMethods),
  woodcutting: convertMethodRowsToTrainingMethods(woodcuttingMethods),
  smithing: convertMethodRowsToTrainingMethods(smithingMethods),
  firemaking: convertMethodRowsToTrainingMethods(firemakingMethods),
  slayer: convertMethodRowsToTrainingMethods(slayerMethods),
  fletching: convertMethodRowsToTrainingMethods(fletchingMethods),
  crafting: convertMethodRowsToTrainingMethods(craftingMethods),
  agility: convertMethodRowsToTrainingMethods(agilityMethods),
  hitpoints: convertMethodRowsToTrainingMethods(hitpointsMethods),
  thieving: convertMethodRowsToTrainingMethods(thievingMethods),
  runecraft: convertMethodRowsToTrainingMethods(runecraftingMethods),
  construction: convertMethodRowsToTrainingMethods(constructionMethods),
  strength: convertMethodRowsToTrainingMethods(strengthMethods),
  defence: convertMethodRowsToTrainingMethods(defenceMethods),
  ranged: convertMethodRowsToTrainingMethods(rangedMethods),
  prayer: convertMethodRowsToTrainingMethods(prayerMethods),
}; 