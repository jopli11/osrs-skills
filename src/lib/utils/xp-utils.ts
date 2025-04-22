// XP required for each level (0-99)
export const xpTable = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 
  1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 
  4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 
  12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 
  27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 
  61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 
  136594, 150872, 166636, 184040, 203254, 224466, 247886, 
  273742, 302288, 333804, 368599, 407015, 449428, 496254, 
  547953, 605032, 668051, 737627, 814445, 899257, 992895, 
  1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 
  1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 
  3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 
  6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 
  11805606, 13034431
];

// Total XP for a given level (cumulative)
export const cumulativeXpTable = xpTable.reduce((acc: number[], curr: number, i: number) => {
  acc[i] = (i > 0 ? acc[i - 1] : 0) + curr;
  return acc;
}, Array(xpTable.length).fill(0));

/**
 * Calculate the level from XP amount
 */
export function getLevelFromXP(xp: number): number {
  // Handle edge cases
  if (xp < 0) return 1;
  if (xp >= cumulativeXpTable[cumulativeXpTable.length - 1]) return 99;

  // Find the level using binary search for efficiency
  let low = 1;
  let high = cumulativeXpTable.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (cumulativeXpTable[mid - 1] <= xp && xp < cumulativeXpTable[mid]) {
      return mid;
    }
    
    if (xp < cumulativeXpTable[mid - 1]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return 1; // Default fallback
}

/**
 * Calculate the XP required to reach a target level from current level
 */
export function getXpToLevel(currentLevel: number, targetLevel: number): number {
  // Handle invalid inputs
  if (currentLevel < 1) currentLevel = 1;
  if (currentLevel > 99) currentLevel = 99;
  if (targetLevel < 1) targetLevel = 1;
  if (targetLevel > 99) targetLevel = 99;
  
  // No XP needed if target is equal to or less than current
  if (targetLevel <= currentLevel) return 0;
  
  return cumulativeXpTable[targetLevel - 1] - cumulativeXpTable[currentLevel - 1];
}

/**
 * Calculate the number of actions needed to reach a target XP
 */
export function getActionsForXp(xpNeeded: number, xpPerAction: number): number {
  if (xpPerAction <= 0) return Infinity;
  return Math.ceil(xpNeeded / xpPerAction);
}

/**
 * Get XP for a specific level
 */
export function getXpForLevel(level: number): number {
  if (level < 1) level = 1;
  if (level > 99) level = 99;
  
  return cumulativeXpTable[level - 1];
}

/**
 * Format XP numbers for display
 */
export function formatXp(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(2)}M`;
  } else if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}

/**
 * Calculate XP with boosts applied
 */
export function getXpWithBoosts(baseXp: number, outfitBonus: number = 0, additionalBoosts: number = 0): number {
  const totalBoost = 1 + (outfitBonus + additionalBoosts) / 100;
  return baseXp * totalBoost;
}

/**
 * Format GP amount with commas and sign
 */
export function formatGp(gp: number): string {
  const sign = gp < 0 ? '-' : '+';
  return `${gp < 0 ? sign : ''}${new Intl.NumberFormat().format(Math.abs(Math.floor(gp)))}`;
}

/**
 * Calculate profit or loss
 */
export function calculateProfitLoss(actionsNeeded: number, gpPerAction: number): number {
  return actionsNeeded * gpPerAction;
} 