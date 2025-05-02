/**
 * OSRS skill names
 */
export type SkillName = 
  | "attack" | "strength" | "defence" | "ranged" | "prayer" | "magic"
  | "runecraft" | "construction" | "hitpoints" | "agility" | "herblore"
  | "thieving" | "crafting" | "fletching" | "slayer" | "hunter"
  | "mining" | "smithing" | "fishing" | "cooking" | "firemaking"
  | "woodcutting" | "farming";

/**
 * Training method for a skill
 */
export interface MethodRow {
  id: string;           // Unique identifier
  name: string;         // Display name
  skill: SkillName;     // Which skill this method belongs to
  levelReq: number;     // Level required
  xpEach: number;       // XP gained per action
  gpEach: number;       // GP cost/profit per action (from API)
  itemId?: number | null;
  inputItems?: {        // Optional input items
    id: number;
    name: string;
    quantity: number;
  }[];
  outputItems?: {       // Optional output items
    id: number;
    name: string;
    quantity: number;
  }[];
  isMembers: boolean;   // P2P or F2P method
  notes?: string;       // Optional notes
  estimatedActionsPerHour?: number; // Optional actions/hr
}

/**
 * Calculator input state
 */
export interface CalculatorInput {
  currentLevel: number;
  targetLevel: number;
  currentXp?: number;   // Optional - can be calculated from level
  targetXp?: number;    // Optional - can be calculated from level
  boosts: {             // Skill-specific boosts
    outfitBonus?: number; // % bonus from skilling outfits
    additionalBoosts?: number; // % any other boosts
  };
}

/**
 * Calculation result for a specific method
 */
export interface MethodResult extends MethodRow {
  actionsNeeded: number;
  profitLoss: number;      // Total GP (positive for profit, negative for loss)
  isEfficient: boolean;    // Flagged if this is the best XP/hr or GP/hr method
}

/**
 * Live GE price data from API
 */
export interface PriceData {
  [itemId: string]: {
    id: number;
    name: string;
    price: number;
    lastUpdated: number; // timestamp
  };
} 