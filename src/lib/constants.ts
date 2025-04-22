import { SkillName } from "./types";

/**
 * Array of all OSRS skills in alphabetical order
 */
export const ALL_SKILLS: SkillName[] = [
  "agility",
  "attack",
  "construction",
  "cooking",
  "crafting",
  "defence",
  "farming",
  "firemaking",
  "fishing",
  "fletching",
  "herblore",
  "hitpoints",
  "hunter",
  "magic",
  "mining",
  "prayer",
  "ranged",
  "runecraft",
  "slayer",
  "smithing",
  "strength",
  "thieving",
  "woodcutting"
];

/**
 * Mapping of skill names to their display names
 */
export const SKILL_NAMES: Record<SkillName, string> = {
  agility: "Agility",
  attack: "Attack",
  construction: "Construction",
  cooking: "Cooking",
  crafting: "Crafting",
  defence: "Defence",
  farming: "Farming",
  firemaking: "Firemaking",
  fishing: "Fishing",
  fletching: "Fletching",
  herblore: "Herblore",
  hitpoints: "Hitpoints",
  hunter: "Hunter",
  magic: "Magic",
  mining: "Mining",
  prayer: "Prayer",
  ranged: "Ranged",
  runecraft: "Runecraft",
  slayer: "Slayer",
  smithing: "Smithing",
  strength: "Strength",
  thieving: "Thieving",
  woodcutting: "Woodcutting"
};

/**
 * Paths to skill icons in the public directory
 */
export const SKILL_ICON_PATHS: Record<SkillName, string> = {
  attack: "/icons/skills/attack.png",
  strength: "/icons/skills/strength.png",
  defence: "/icons/skills/defence.png",
  ranged: "/icons/skills/ranged.png",
  prayer: "/icons/skills/prayer.png",
  magic: "/icons/skills/magic.png",
  runecraft: "/icons/skills/runecraft.png",
  construction: "/icons/skills/construction.png",
  hitpoints: "/icons/skills/hitpoints.png",
  agility: "/icons/skills/agility.png",
  herblore: "/icons/skills/herblore.png",
  thieving: "/icons/skills/thieving.png",
  crafting: "/icons/skills/crafting.png",
  fletching: "/icons/skills/fletching.png",
  slayer: "/icons/skills/slayer.png",
  hunter: "/icons/skills/hunter.png",
  mining: "/icons/skills/mining.png",
  smithing: "/icons/skills/smithing.png",
  fishing: "/icons/skills/fishing.png",
  cooking: "/icons/skills/cooking.png",
  firemaking: "/icons/skills/firemaking.png",
  woodcutting: "/icons/skills/woodcutting.png",
  farming: "/icons/skills/farming.png",
};

// Original Wiki URLs for reference or fallback
export const OSRS_WIKI_ICON_PATHS: Record<SkillName, string> = {
  attack: "https://oldschool.runescape.wiki/images/f/f7/Attack_icon.png",
  strength: "https://oldschool.runescape.wiki/images/7/7d/Strength_icon.png",
  defence: "https://oldschool.runescape.wiki/images/b/b7/Defence_icon.png",
  ranged: "https://oldschool.runescape.wiki/images/e/e8/Ranged_icon.png",
  prayer: "https://oldschool.runescape.wiki/images/8/87/Prayer_icon.png",
  magic: "https://oldschool.runescape.wiki/images/5/5c/Magic_icon.png",
  runecraft: "https://oldschool.runescape.wiki/images/9/9d/Runecraft_icon.png",
  construction: "https://oldschool.runescape.wiki/images/c/ca/Construction_icon.png",
  hitpoints: "https://oldschool.runescape.wiki/images/9/96/Hitpoints_icon.png",
  agility: "https://oldschool.runescape.wiki/images/d/dc/Agility_icon.png",
  herblore: "https://oldschool.runescape.wiki/images/0/07/Herblore_icon.png",
  thieving: "https://oldschool.runescape.wiki/images/b/b0/Thieving_icon.png",
  crafting: "https://oldschool.runescape.wiki/images/3/3a/Crafting_icon.png",
  fletching: "https://oldschool.runescape.wiki/images/2/2e/Fletching_icon.png",
  slayer: "https://oldschool.runescape.wiki/images/2/28/Slayer_icon.png",
  hunter: "https://oldschool.runescape.wiki/images/d/dd/Hunter_icon.png",
  mining: "https://oldschool.runescape.wiki/images/4/4a/Mining_icon.png",
  smithing: "https://oldschool.runescape.wiki/images/3/39/Smithing_icon.png",
  fishing: "https://oldschool.runescape.wiki/images/f/f3/Fishing_icon.png",
  cooking: "https://oldschool.runescape.wiki/images/d/dc/Cooking_icon.png",
  firemaking: "https://oldschool.runescape.wiki/images/6/61/Firemaking_icon.png",
  woodcutting: "https://oldschool.runescape.wiki/images/1/1b/Woodcutting_icon.png",
  farming: "https://oldschool.runescape.wiki/images/f/fb/Farming_icon.png",
}; 