import { MethodRow } from "@/lib/types";

/**
 * Sailing skill training methods
 * Updated based on latest release data (Nov 2025).
 */
export const sailingMethods: MethodRow[] = [
  // --- Quests ---
  {
    id: "quest_pandemonium",
    name: "Pandemonium (Quest)",
    skill: "sailing",
    levelReq: 1,
    xpEach: 300,
    gpEach: 0,
    isMembers: true,
    notes: "Introductory quest. Unlocks Sailing and boosts from level 1 to 4."
  },
  {
    id: "quest_prying_times",
    name: "Prying Times (Quest)",
    skill: "sailing",
    levelReq: 12,
    xpEach: 800,
    gpEach: 0,
    isMembers: true,
    notes: "Follow-up quest. Unlocks additional charting tasks."
  },
  {
    id: "quest_current_affairs",
    name: "Current Affairs (Quest)",
    skill: "sailing",
    levelReq: 22,
    xpEach: 1400,
    gpEach: 0,
    isMembers: true,
    notes: "Mid-game quest. Provides a sizeable XP boost."
  },
  {
    id: "quest_troubled_tortugans",
    name: "Troubled Tortugans (Quest)",
    skill: "sailing",
    levelReq: 45,
    xpEach: 10000,
    gpEach: 0,
    isMembers: true,
    notes: "High-level quest. Requires high utility stats."
  },

  // --- Sea Charting ---
  {
    id: "sea_charting_22",
    name: "Sea Charting (Spyglass & Duck)",
    skill: "sailing",
    levelReq: 22,
    xpEach: 10000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Charting tasks with spyglass and current duck. Est. 10,000 XP/hr."
  },

  // --- Courier Tasks ---
  {
    id: "courier_prifddinas",
    name: "Courier Tasks (Prifddinas)",
    skill: "sailing",
    levelReq: 70,
    xpEach: 67500, // Midpoint of 65k-70k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Optimized route focusing on Aldarin/Prifddinas. Est. 65k-70k XP/hr."
  },

  // --- Bounty Tasks ---
  {
    id: "bounty_tasks_iron_cannon",
    name: "Bounty Tasks (Iron Cannon)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 18000, // Midpoint of 16k-20k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Hunting seafaring monsters for bounties. Est. 16k-20k XP/hr."
  },

  // --- Shipwreck Salvaging ---
  {
    id: "shipwreck_small_bronze",
    name: "Small Shipwreck (Bronze Hook)",
    skill: "sailing",
    levelReq: 15,
    xpEach: 2400, // Midpoint of 2000-2800
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK salvaging only. Est. 2,000-2,800 XP/hr."
  },
  {
    id: "shipwreck_small_iron",
    name: "Small Shipwreck (Iron Hook)",
    skill: "sailing",
    levelReq: 15,
    xpEach: 3100, // Midpoint of 3000-3200
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK salvaging only. Est. 3,000-3,200 XP/hr."
  },
  {
    id: "shipwreck_small_sorting",
    name: "Small Shipwreck (Sorting)",
    skill: "sailing",
    levelReq: 15,
    xpEach: 7000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Sorting small salvage crates at port. Adds ~7,000 XP/hr."
  },
  {
    id: "shipwreck_fisherman_steel_combined",
    name: "Fisherman's Shipwreck (Salvage & Sort)",
    skill: "sailing",
    levelReq: 26,
    xpEach: 19250, // 5250 (avg salvage) + 14000 (sorting)
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging with Steel Hook + Sorting. Est. ~19,250 XP/hr total."
  },
  {
    id: "shipwreck_barracuda_mithril_2x",
    name: "Barracuda Shipwreck (2x Mithril)",
    skill: "sailing",
    levelReq: 35,
    xpEach: 15750, // Midpoint 13.5k-18k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging NW Storm Tempor w/ crewmate. Est. 13.5k-18k XP/hr."
  },
  {
    id: "shipwreck_large_mithril_2x",
    name: "Large Shipwreck (2x Mithril)",
    skill: "sailing",
    levelReq: 55, // Assumed based on crewmate unlock/large wreck usually higher
    xpEach: 28000, // Midpoint 27k-29k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Continuous salvaging S of Little Pearl. Est. 27k-29k XP/hr (inc. sorting)."
  },
  {
    id: "shipwreck_pirate_adamant_2x",
    name: "Pirate Shipwreck (2x Adamant)",
    skill: "sailing",
    levelReq: 64,
    xpEach: 37500, // Midpoint 35k-40k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging w/ crewmate. Est. 35k-40k XP/hr (inc. sorting)."
  },
  {
    id: "shipwreck_mercenary_adamant_2x",
    name: "Mercenary Shipwreck (2x Adamant)",
    skill: "sailing",
    levelReq: 70, // Approx req
    xpEach: 57500, // Midpoint 55k-60k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging w/ crewmate. Est. 55k-60k XP/hr (inc. sorting)."
  },
  {
    id: "shipwreck_mercenary_rune_2x",
    name: "Mercenary Shipwreck (2x Rune)",
    skill: "sailing",
    levelReq: 80, // Approx req for Rune
    xpEach: 67500, // Midpoint 65k-70k
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging w/ crewmate. Est. 65k-70k XP/hr (inc. sorting)."
  },
  {
    id: "shipwreck_fremennik_rune_extractor",
    name: "Fremennik Wreck (2x Rune + Extractor)",
    skill: "sailing",
    levelReq: 80,
    xpEach: 100000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "High-end salvaging with Crystal Extractor passive. ~100k XP/hr."
  },
  {
    id: "shipwreck_merchant_rune_extractor",
    name: "Merchant Wreck (2x Rune + Extractor)",
    skill: "sailing",
    levelReq: 85,
    xpEach: 105000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "High-end salvaging with Crystal Extractor passive. ~105k XP/hr."
  },

  // --- Barracuda Trials ---
  // Tempor Tantrum (Level 30)
  {
    id: "tempor_tantrum_swordfish",
    name: "Tempor Tantrum (Swordfish)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 30032, // Using exact hourly rate as per action since actions/hr is variable
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Theoretical rate at world-record speeds. Est. 30,032 XP/hr."
  },
  {
    id: "tempor_tantrum_shark",
    name: "Tempor Tantrum (Shark)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 26650,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Theoretical rate at world-record speeds. Est. 26,650 XP/hr."
  },
  {
    id: "tempor_tantrum_marlin",
    name: "Tempor Tantrum (Marlin)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 29591,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Theoretical rate at world-record speeds. Est. 29,591 XP/hr."
  },

  // Jubbly Jive (Level 55)
  {
    id: "jubbly_jive_swordfish",
    name: "Jubbly Jive (Swordfish)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 1700, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 29, // ~2:03 target
    notes: "Target: 2:03. Est. 40k-60k XP/hr."
  },
  {
    id: "jubbly_jive_shark",
    name: "Jubbly Jive (Shark)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 3000, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 20, // ~3:00 target
    notes: "Target: 3:00. Est. 50k-70k XP/hr."
  },
  {
    id: "jubbly_jive_marlin",
    name: "Jubbly Jive (Marlin)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 6200, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 11.2, // ~5:21 target
    notes: "Target: 5:21. Est. 60k-90k XP/hr depending on hull."
  },

  // Gwenith Glide (Level 72)
  {
    id: "gwenith_glide_swordfish",
    name: "Gwenith Glide (Swordfish)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 3050, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 30, // ~2:00 target
    notes: "Target: 2:00. Est. 75,000+ XP/hr."
  },
  {
    id: "gwenith_glide_shark",
    name: "Gwenith Glide (Shark)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 7250, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 16, // ~3:42 target
    notes: "Target: 3:42. Est. 104,000+ XP/hr."
  },
  {
    id: "gwenith_glide_marlin",
    name: "Gwenith Glide (Marlin)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 14800, // Per run
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 9.7, // ~6:09 target
    notes: "Target: 6:09. Est. 128,000+ XP/hr."
  },

  // --- Ship Combat ---
  {
    id: "ship_combat_iron",
    name: "Ship Combat (Iron Cannon)",
    skill: "sailing",
    levelReq: 1,
    xpEach: 4500, // Midpoint 4000-5000
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Combat with Iron Cannon. Est. 4k-5k Sailing XP/hr (plus Ranged XP)."
  },

  // --- Crystal Extractor ---
  {
    id: "crystal_extractor_passive",
    name: "Crystal Extractor (Passive)",
    skill: "sailing",
    levelReq: 73,
    xpEach: 24000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Harvesting every ~90s while doing other activities. Est. 24k XP/hr."
  },
  {
    id: "crystal_extractor_active",
    name: "Crystal Extractor (Active)",
    skill: "sailing",
    levelReq: 73,
    xpEach: 33000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Harvesting every ~63s as often as possible. Est. 33k XP/hr."
  }
];
