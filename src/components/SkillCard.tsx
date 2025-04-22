"use client";

import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SkillName } from "@/lib/types";
import { SkillIcon } from "./SkillIcon";
import { SKILL_NAMES } from "@/lib/constants";

interface SkillCardProps {
  skill: SkillName;
  name?: string;
}

export default function SkillCard({ skill, name }: SkillCardProps) {
  // Use provided name or get from constants
  const displayName = name || SKILL_NAMES[skill];
  
  return (
    <Link href={`/skills/${skill}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="brand.card"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="lg"
        p={4}
        transition="all 0.2s"
        _hover={{ borderColor: "brand.primary" }}
        height="100%"
      >
        <Flex direction="column" align="center">
          <Box mb={3}>
            <SkillIcon skill={skill} size={45} />
          </Box>
          <Text
            textAlign="center"
            color="white"
            fontWeight="medium"
            fontSize="sm"
            _hover={{ color: "brand.primary" }}
          >
            {displayName}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
} 