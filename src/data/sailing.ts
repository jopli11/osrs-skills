import { MethodRow } from "@/lib/types";

/**
 * Sailing skill training methods (initial release data)
 * XP rates are preliminary and subject to change as Jagex updates the skill.
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
    id: "shipwreck_small_salvage",
    name: "Small Shipwreck Salvaging",
    skill: "sailing",
    levelReq: 15,
    xpEach: 1500,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "AFK method using a bronze salvaging hook. Provides ~1500 XP/hr while actively salvaging (excludes sorting)."
  },
  {
    id: "shipwreck_small_sorting",
    name: "Small Shipwreck Sorting",
    skill: "sailing",
    levelReq: 15,
    xpEach: 7000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Sorting crates from small shipwreck runs yields ~7,000 XP/hr once materials are brought back to port."
  },
  {
    id: "shipwreck_fisherman_salvage",
    name: "Fisherman's Shipwreck Salvaging",
    skill: "sailing",
    levelReq: 26,
    xpEach: 4700,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Requires a steel salvaging hook. Salvaging XP reaches roughly 4,700 XP/hr at this tier."
  },
  {
    id: "shipwreck_fisherman_sorting",
    name: "Fisherman's Shipwreck Sorting",
    skill: "sailing",
    levelReq: 26,
    xpEach: 14000,
    gpEach: 0,
    isMembers: true,
    estimatedActionsPerHour: 1,
    notes: "Sorting materials from Fisherman's shipwrecks can yield ~14,000 XP/hr with efficient runs."
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
    notes: "Barracuda Trial repeatable run. ~650 XP per completion, ~33 runs/hr (≈21.6k XP/hr)."
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
    notes: "Harder Barracuda Trial rank. ~650 XP per completion, ~21 runs/hr (≈13.7k XP/hr)."
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
    notes: "Highest Tempor Tantrum rank. ~1,250 XP per completion, ~13 runs/hr (≈16.6k XP/hr). Includes one-off first-clear bonuses."
  }
];

