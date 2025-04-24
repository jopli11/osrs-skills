"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Input,
  SimpleGrid,
  Button,
  HStack,
} from "@chakra-ui/react";
import SkillCard from "@/components/SkillCard";
import { SkillName } from "@/lib/types";
import { ALL_SKILLS, SKILL_NAMES } from "@/lib/constants";
import PlayerLookup from "@/components/PlayerLookup";

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = searchTerm
    ? ALL_SKILLS.filter((skill: SkillName) => 
        skill.toLowerCase().includes(searchTerm.toLowerCase()) || 
        SKILL_NAMES[skill]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ALL_SKILLS;

  return (
    <Box>
      {/* Header */}
      <Box borderBottom="1px solid" borderColor="brand.border" bg="brand.card">
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Heading as="h1" size="lg" fontWeight="bold">
                  <Text as="span" color="brand.primary">Pro</Text>
                  <Text as="span" color="white">bemas</Text>
                </Heading>
              </Link>
            </Flex>
            
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Text fontWeight="medium" color="white" _hover={{ color: 'brand.primary' }}>Home</Text>
              </Link>
              <Link href="/skills" style={{ textDecoration: 'none' }}>
                <Text fontWeight="medium" color="brand.primary">Skills</Text>
              </Link>
              <Link href="/how-it-works" style={{ textDecoration: 'none' }}>
                <Text fontWeight="medium" color="white" _hover={{ color: 'brand.primary' }}>How It Works</Text>
              </Link>
              <Link href="/support" style={{ textDecoration: 'none' }}>
                <Text fontWeight="medium" color="white" _hover={{ color: 'brand.primary' }}>Support</Text>
              </Link>
            </HStack>
            
            <HStack gap={3}>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Text px={4} py={2} fontWeight="medium" color="white" _hover={{ color: 'brand.primary' }}>
                  Login
                </Text>
              </Link>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button 
                  bg="brand.primary" 
                  color="brand.background" 
                  px={4} 
                  py={2} 
                  borderRadius="md" 
                  fontWeight="medium"
                  _hover={{ bg: 'brand.primaryHover' }}
                >
                  Sign Up
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="6xl" py={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="white">OSRS Skills</Heading>
          
          <Box width="64">
            <Input
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="brand.card"
              color="white"
              border="1px solid"
              borderColor="brand.border"
              borderRadius="md"
              _focus={{ borderColor: "brand.primary", outline: "none" }}
            />
          </Box>
        </Flex>
        
        <Box bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
          {/* Player Lookup component */}
          <Box mb={5}>
            <Heading size="md" color="brand.primary" mb={3}>Import Your Stats</Heading>
            <PlayerLookup />
          </Box>
          
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} gap={4}>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill: SkillName) => (
                <SkillCard key={skill} skill={skill} />
              ))
            ) : (
              <Text color="gray.400" gridColumn="1 / -1" textAlign="center" py={8}>
                No skills found matching your search.
              </Text>
            )}
          </SimpleGrid>
        </Box>
      </Container>

      <Box as="footer" bg="brand.card" mt={16} py={8} borderTop="1px solid" borderColor="brand.border">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="sm" color="gray.400">© {new Date().getFullYear()} Probemas | All game content is copyright Jagex Ltd.</Text>
          <Text fontSize="sm" color="gray.400" mt={1}>Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.</Text>
        </Container>
      </Box>
    </Box>
  );
} 