import { Metadata } from 'next';
import { SKILL_NAMES } from '@/lib/constants';
import { SkillName } from '@/lib/types';

// Generate metadata dynamically based on the skill
export async function generateMetadata({
  params,
}: {
  params: { skill: string };
}): Promise<Metadata> {
  const skill = params.skill as SkillName;
  const skillDisplayName = SKILL_NAMES[skill] || skill;
  
  // Skill-specific descriptions and keywords
  const skillMeta = {
    attack: {
      description: 'OSRS Attack training calculator with the best methods, XP rates, and costs. Plan your Attack training efficiently with our comprehensive calculator.',
      keywords: ['OSRS attack training', 'attack calculator OSRS', 'RuneScape attack guide', 'attack XP rates']
    },
    strength: {
      description: 'OSRS Strength training calculator with optimal methods, XP rates, and costs. Calculate the best strength training path for your account.',
      keywords: ['OSRS strength training', 'strength calculator OSRS', 'RuneScape strength guide', 'strength XP rates']
    },
    defence: {
      description: 'OSRS Defence training calculator with efficient methods, XP rates, and costs. Plan your defence training strategy.',
      keywords: ['OSRS defence training', 'defence calculator OSRS', 'RuneScape defence guide', 'defence XP rates']
    },
    hitpoints: {
      description: 'OSRS Hitpoints training calculator with passive and active methods, XP rates, and efficient training paths.',
      keywords: ['OSRS hitpoints training', 'HP calculator OSRS', 'RuneScape hitpoints guide', 'HP XP rates']
    },
    ranged: {
      description: 'OSRS Ranged training calculator with best methods, XP rates, ammo costs, and profit analysis. Optimize your ranged training.',
      keywords: ['OSRS ranged training', 'ranged calculator OSRS', 'RuneScape ranged guide', 'ranged XP rates', 'bow training OSRS']
    },
    prayer: {
      description: 'OSRS Prayer training calculator with bone costs, XP rates, and efficient altar methods. Calculate prayer training costs.',
      keywords: ['OSRS prayer training', 'prayer calculator OSRS', 'RuneScape prayer guide', 'bone costs OSRS', 'prayer XP rates']
    },
    magic: {
      description: 'OSRS Magic training calculator with spell costs, XP rates, and profitable training methods. Plan your magic training efficiently.',
      keywords: ['OSRS magic training', 'magic calculator OSRS', 'RuneScape magic guide', 'spell costs OSRS', 'magic XP rates']
    },
    cooking: {
      description: 'OSRS Cooking training calculator with food costs, XP rates, and profit analysis. Find the best cooking methods for your level.',
      keywords: ['OSRS cooking training', 'cooking calculator OSRS', 'RuneScape cooking guide', 'cooking XP rates', 'food costs OSRS']
    },
    woodcutting: {
      description: 'OSRS Woodcutting training calculator with tree locations, XP rates, and profit analysis. Optimize your woodcutting training.',
      keywords: ['OSRS woodcutting training', 'woodcutting calculator OSRS', 'RuneScape woodcutting guide', 'tree XP rates', 'logs profit OSRS']
    },
    fletching: {
      description: 'OSRS Fletching training calculator with bow costs, XP rates, and profit analysis. Calculate efficient fletching training methods.',
      keywords: ['OSRS fletching training', 'fletching calculator OSRS', 'RuneScape fletching guide', 'bow making OSRS', 'fletching XP rates']
    },
    fishing: {
      description: 'OSRS Fishing training calculator with fish locations, XP rates, and profit analysis. Find the best fishing spots for your level.',
      keywords: ['OSRS fishing training', 'fishing calculator OSRS', 'RuneScape fishing guide', 'fish XP rates', 'fishing spots OSRS']
    },
    firemaking: {
      description: 'OSRS Firemaking training calculator with log costs, XP rates, and efficient training methods. Plan your firemaking training.',
      keywords: ['OSRS firemaking training', 'firemaking calculator OSRS', 'RuneScape firemaking guide', 'log burning XP rates']
    },
    crafting: {
      description: 'OSRS Crafting training calculator with material costs, XP rates, and profit analysis. Optimize your crafting training methods.',
      keywords: ['OSRS crafting training', 'crafting calculator OSRS', 'RuneScape crafting guide', 'crafting XP rates', 'jewelry making OSRS']
    },
    smithing: {
      description: 'OSRS Smithing training calculator with bar costs, XP rates, and profit analysis. Calculate efficient smithing training methods.',
      keywords: ['OSRS smithing training', 'smithing calculator OSRS', 'RuneScape smithing guide', 'smithing XP rates', 'bar costs OSRS']
    },
    mining: {
      description: 'OSRS Mining training calculator with ore locations, XP rates, and profit analysis. Find the best mining spots for your level.',
      keywords: ['OSRS mining training', 'mining calculator OSRS', 'RuneScape mining guide', 'ore XP rates', 'mining spots OSRS']
    },
    herblore: {
      description: 'OSRS Herblore training calculator with potion costs, XP rates, and profit analysis. Calculate efficient herblore training methods.',
      keywords: ['OSRS herblore training', 'herblore calculator OSRS', 'RuneScape herblore guide', 'potion costs OSRS', 'herblore XP rates']
    },
    agility: {
      description: 'OSRS Agility training calculator with course locations, XP rates, and efficiency analysis. Optimize your agility training path.',
      keywords: ['OSRS agility training', 'agility calculator OSRS', 'RuneScape agility guide', 'agility courses OSRS', 'agility XP rates']
    },
    thieving: {
      description: 'OSRS Thieving training calculator with NPC locations, XP rates, and profit analysis. Find the best thieving methods for your level.',
      keywords: ['OSRS thieving training', 'thieving calculator OSRS', 'RuneScape thieving guide', 'pickpocketing XP rates', 'thieving profit OSRS']
    },
    slayer: {
      description: 'OSRS Slayer training calculator with task analysis, XP rates, and profit calculations. Optimize your slayer training efficiency.',
      keywords: ['OSRS slayer training', 'slayer calculator OSRS', 'RuneScape slayer guide', 'slayer XP rates', 'slayer profit OSRS']
    },
    farming: {
      description: 'OSRS Farming training calculator with crop costs, XP rates, and profit analysis. Calculate efficient farming training methods.',
      keywords: ['OSRS farming training', 'farming calculator OSRS', 'RuneScape farming guide', 'crop XP rates', 'farming profit OSRS']
    },
    runecraft: {
      description: 'OSRS Runecrafting training calculator with rune profits, XP rates, and altar locations. Optimize your runecrafting training.',
      keywords: ['OSRS runecrafting training', 'runecrafting calculator OSRS', 'RuneScape runecrafting guide', 'rune XP rates', 'runecrafting profit']
    },
    hunter: {
      description: 'OSRS Hunter training calculator with trap locations, XP rates, and profit analysis. Find the best hunter training methods.',
      keywords: ['OSRS hunter training', 'hunter calculator OSRS', 'RuneScape hunter guide', 'hunter XP rates', 'hunting profit OSRS']
    },
    construction: {
      description: 'OSRS Construction training calculator with material costs, XP rates, and efficient building methods. Calculate construction training costs.',
      keywords: ['OSRS construction training', 'construction calculator OSRS', 'RuneScape construction guide', 'construction XP rates', 'building costs OSRS']
    }
  };

  const meta = skillMeta[skill as keyof typeof skillMeta] || {
    description: `OSRS ${skillDisplayName} training calculator with XP rates, costs, and efficient training methods.`,
    keywords: [`OSRS ${skill} training`, `${skill} calculator OSRS`, `RuneScape ${skill} guide`]
  };

  const title = `OSRS ${skillDisplayName} Calculator | Training Guide & XP Rates`;
  const description = meta.description;

  return {
    title,
    description,
    keywords: [
      ...meta.keywords,
      'Old School RuneScape calculator',
      'OSRS training calculator',
      'RuneScape skill calculator',
      'OSRS XP calculator',
      'skill training guide'
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/skills/${skill}`,
      images: [
        {
          url: `/images/skills/${skill}-calculator-og.png`,
          width: 1200,
          height: 630,
          alt: `OSRS ${skillDisplayName} Calculator Screenshot`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Calculate optimal ${skillDisplayName} training methods in OSRS with XP rates and costs.`,
      images: [`/images/skills/${skill}-calculator-og.png`],
    },
    alternates: {
      canonical: `/skills/${skill}`,
    },
  };
}

export default function SkillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 