"use client";

import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SkillName } from "@/lib/types";
import { SkillIcon } from "./SkillIcon";
import { SKILL_NAMES } from "@/lib/constants";

interface SkillCardProps {
  skill: SkillName;
  name?: string;
  priorityLoad?: boolean;
  index?: number;
}

export default function SkillCard({ skill, name, priorityLoad = false, index = 0 }: SkillCardProps) {
  // Use provided name or get from constants
  const displayName = name || SKILL_NAMES[skill];
  
  // Automatically prioritize the first 6 skills (visible above the fold on most screens)
  const shouldPrioritize = priorityLoad || index < 6;

  return (
    <Link href={`/skills/${skill}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="rgba(53, 40, 30, 0.9)"
        border="2px solid"
        borderColor="black"
        borderRadius="md"
        p={4}
        transition="all 0.2s"
        _hover={{ 
          borderColor: "#ffcb2f", 
          transform: "translateY(-2px)",
          boxShadow: "5px 5px 0 rgba(0,0,0,0.4)",
          background: "rgba(63, 46, 33, 0.9)"
        }}
        height="100%"
        boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
        backdropFilter="blur(2px)"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          top: '1px',
          left: '1px',
          right: '1px',
          height: '1px',
          backgroundColor: 'rgba(255, 203, 47, 0.2)'
        }}
      >
        <Flex direction="column" align="center">
          <Box 
            mb={3}
            p={2}
            borderRadius="full"
            bg="rgba(0,0,0,0.5)"
            border="1px solid rgba(0,0,0,0.8)"
            boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)"
          >
            <SkillIcon skill={skill} size={48} priority={shouldPrioritize} />
          </Box>
          <Text
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="sm"
          >
            {displayName}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
} 