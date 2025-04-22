"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SkillName } from "@/lib/types";
import { SKILL_ICON_PATHS, OSRS_WIKI_ICON_PATHS } from "@/lib/constants";

interface SkillIconProps {
  skill: SkillName;
  size?: number;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({
  skill,
  size = 32,
  className = "",
}) => {
  const [fallbackToWiki, setFallbackToWiki] = useState(false);
  
  // Use local icon first, fallback to wiki if there's an error
  const iconPath = fallbackToWiki ? OSRS_WIKI_ICON_PATHS[skill] : SKILL_ICON_PATHS[skill];
  
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconPath}
        alt={`${skill} icon`}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setFallbackToWiki(true)}
      />
    </div>
  );
}; 