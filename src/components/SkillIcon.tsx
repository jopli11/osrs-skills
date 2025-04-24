"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { SkillName } from "@/lib/types";
import { SKILL_ICON_PATHS, OSRS_WIKI_ICON_PATHS } from "@/lib/constants";

interface SkillIconProps {
  skill: SkillName;
  size?: number;
  priority?: boolean;
}

export function SkillIcon({ skill, size = 32, priority = false }: SkillIconProps) {
  const [imgSrc, setImgSrc] = useState<string>(SKILL_ICON_PATHS[skill]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Reset states when skill prop changes
  useEffect(() => {
    setImgSrc(SKILL_ICON_PATHS[skill]);
    setIsLoaded(false);
    setHasError(false);
  }, [skill]);

  return (
    <Box position="relative" width={`${size}px`} height={`${size}px`}>
      <Image
        src={imgSrc}
        width={size}
        height={size}
        alt={`${skill} skill icon`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={75}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(OSRS_WIKI_ICON_PATHS[skill]);
          }
        }}
        onLoad={() => setIsLoaded(true)}
        style={{
          objectFit: 'contain',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
      {!isLoaded && (
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          width={`${size}px`} 
          height={`${size}px`} 
          bg="rgba(42, 30, 15, 0.3)"
          borderRadius="4px"
        />
      )}
    </Box>
  );
} 