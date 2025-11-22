import { MethodRow } from "@/lib/types";

/**
 * Sailing skill training methods (initial release data)
 * XP rates are preliminary and subject to change as Jagex updates the skill.
 * Updated: Nov 22, 2025
 */
export const sailingMethods: MethodRow[] = [
  {
    id: "quest_pandemonium",
    name: "Pandemonium (Quest)",
    skill: "sailing",
    levelReq: 1,
    xpEach: 300,
    gpEach: 0,
    isMembers: true,
    notes: "Introductory quest that unlocks Sailing and boosts you from level 1 to 4 instantly."
  },
  {
    id: "quest_prying_times",
    name: "Prying Times (Quest)",
    skill: "sailing",
    levelReq: 12,
    xpEach: 800,
    gpEach: 0,
    isMembers: true,
    notes: "Follow-up quest that awards a one-time Sailing XP reward and unlocks additional charting tasks."
  },
  {
    id: "quest_current_affairs",
    name: "Current Affairs (Quest)",
    skill: "sailing",
    levelReq: 22,
    xpEach: 1400,
    gpEach: 0,
    isMembers: true,
    notes: "Mid-game quest that continues the Sailing storyline and provides a sizeable XP boost."
  },
  {
    id: "quest_troubled_tortugans",
    name: "Troubled Tortugans (Quest)",
    skill: "sailing",
    levelReq: 45,
    xpEach: 10000,
    gpEach: 0,
    isMembers: true,
    notes: "High-level quest with substantial Sailing XP reward; also requires high utility stats."
  },
  {
    id: "shipwreck_small_salvage_bronze",
    name: "Small Shipwreck (Bronze Hook)",
    skill: "sailing",
    levelReq: 15,
    xpEach: 2400, // Midpoint of 2000-2800
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK salvaging with Bronze Hook. Est. 2,000-2,800 XP/hr (salvaging only)."
  },
  {
    id: "shipwreck_small_salvage_iron",
    name: "Small Shipwreck (Iron Hook)",
    skill: "sailing",
    levelReq: 15,
    xpEach: 3100, // Midpoint of 3000-3200
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK salvaging with Iron Hook. Est. 3,000-3,200 XP/hr (salvaging only)."
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
    notes: "Sorting small salvage crates at port. Adds ~7,000 XP/hr on top of salvaging rates."
  },
  {
    id: "shipwreck_fisherman_salvage_steel",
    name: "Fisherman's Shipwreck (Steel Hook)",
    skill: "sailing",
    levelReq: 26,
    xpEach: 5250, // Midpoint of 4700-5800
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK salvaging with Steel Hook. Est. 4,700-5,800 XP/hr (salvaging only)."
  },
  {
    id: "shipwreck_fisherman_sorting",
    name: "Fisherman's Shipwreck (Sorting)",
    skill: "sailing",
    levelReq: 26,
    xpEach: 14000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Sorting fishy salvage crates at port. Adds ~14,000 XP/hr on top of salvaging rates."
  },
  {
    id: "shipwreck_barracuda_salvage_mithril",
    name: "Barracuda Shipwreck (2x Mithril Hooks)",
    skill: "sailing",
    levelReq: 35,
    xpEach: 15750, // Midpoint of 13500-18000
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Salvaging at NW Storm Tempor with crewmate on 2nd hook. Est. 13.5k-18k XP/hr."
  },
  {
    id: "shipwreck_pirate_salvage_adamant",
    name: "Pirate Shipwreck (2x Adamant Hooks)",
    skill: "sailing",
    levelReq: 64,
    xpEach: 37500, // Midpoint of 35000-40000
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "High-level salvaging with crewmate on 2nd hook. Est. 35k-40k XP/hr (includes sorting on boat)."
  },
  {
    id: "tempor_tantrum_swordfish",
    name: "Tempor Tantrum (Swordfish Rank)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 650,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 33.3,
    notes: "Barracuda Trial. ~650 XP/run + ~2k one-off. Target: 1:48. Est. 30k XP/hr with optimal play."
  },
  {
    id: "tempor_tantrum_shark",
    name: "Tempor Tantrum (Shark Rank)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 650,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 21.1,
    notes: "Barracuda Trial. ~650 XP/run + ~2k one-off. Target: 2:51. Est. 26.6k XP/hr with optimal play."
  },
  {
    id: "tempor_tantrum_marlin",
    name: "Tempor Tantrum (Marlin Rank)",
    skill: "sailing",
    levelReq: 30,
    xpEach: 1250,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 13.3,
    notes: "Barracuda Trial. ~1,250 XP/run + ~3k one-off. Target: 4:30. Est. 29.6k XP/hr with optimal play."
  },
  {
    id: "jubbly_jive_swordfish",
    name: "Jubbly Jive (Swordfish Rank)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 1700,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 29, // Based on ~2:03 target time
    notes: "Barracuda Trial in Backwater. ~1,700 XP/run + 5k one-off. Target: 2:03."
  },
  {
    id: "jubbly_jive_shark",
    name: "Jubbly Jive (Shark Rank)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 3000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 20, // Based on ~3:00 target time
    notes: "Barracuda Trial in Backwater. ~3,000 XP/run + 7.5k one-off. Target: 3:00."
  },
  {
    id: "jubbly_jive_marlin",
    name: "Jubbly Jive (Marlin Rank)",
    skill: "sailing",
    levelReq: 55,
    xpEach: 6200,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 11, // Based on ~5:21 target time
    notes: "Barracuda Trial in Backwater. ~6,200 XP/run + 10k one-off. Target: 5:21. Est. 85k-90k XP/hr depending on hull."
  },
  {
    id: "gwenith_glide_swordfish",
    name: "Gwenith Glide (Swordfish Rank)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 3050,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 30, // Based on ~2:00 target time
    notes: "Barracuda Trial in Porth Gwenith. ~3,050 XP/run + 25k one-off. Target: 2:00."
  },
  {
    id: "gwenith_glide_shark",
    name: "Gwenith Glide (Shark Rank)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 7250,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 16, // Based on ~3:42 target time
    notes: "Barracuda Trial in Porth Gwenith. ~7,250 XP/run + 35k one-off. Target: 3:42."
  },
  {
    id: "gwenith_glide_marlin",
    name: "Gwenith Glide (Marlin Rank)",
    skill: "sailing",
    levelReq: 72,
    xpEach: 14800,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 9.7, // Based on ~6:09 target time
    notes: "Barracuda Trial in Porth Gwenith. ~14,800 XP/run + 50k one-off. Target: 6:09."
  },
  {
    id: "ship_combat_iron_cannon",
    name: "Ship Combat (Iron Cannon)",
    skill: "sailing",
    levelReq: 1, // Basic combat accessible early, specific cannon needs reqs usually
    xpEach: 4500, // Midpoint 4000-5000
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Combat against sea monsters using Iron Cannon. Est. 4,000-5,000 Sailing XP/hr (plus Ranged XP)."
  }
];

