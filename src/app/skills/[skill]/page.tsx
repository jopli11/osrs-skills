import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Input,
  HStack,
  VStack,
  SimpleGrid,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup
} from "@chakra-ui/react";
import { SkillIcon } from "@/components/SkillIcon";
import { SkillName } from "@/lib/types";
import { ALL_SKILLS, SKILL_NAMES } from "@/lib/constants";

// Example XP table (simplified)
const xpTable = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 
  1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 
  4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 
  12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 
  27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 
  61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 
  136594, 150872, 166636, 184040, 203254, 224466, 247886, 
  273742, 302288, 333804, 368599, 407015, 449428, 496254, 
  547953, 605032, 668051, 737627, 814445, 899257, 992895, 
  1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 
  1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 
  3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 
  6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 
  11805606, 13034431, 14391160, 15889109, 17542976, 19368992, 
  21385073, 23611006, 26068632, 28782069, 31777943, 35085654, 
  38737661, 42769801, 47221641, 52136869, 57563718, 63555443, 
  70170840, 77474828, 85539082, 94442737, 104273167
];

type Props = {
  params: {
    skill: string;
  };
};

export default function SkillPage({ params }: Props) {
  const { skill } = params;
  
  // Validate skill name
  if (!ALL_SKILLS.includes(skill.toLowerCase() as SkillName)) {
    notFound();
  }
  
  const skillKey = skill.toLowerCase() as SkillName;
  // Get skill name from constants
  const skillName = SKILL_NAMES[skillKey];

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
              <Text ml={2} fontSize="sm" color="gray.400">| {skillName}</Text>
            </Flex>
            
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
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
            
            <HStack spacing={3}>
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

      {/* Main content */}
      <Container maxW="6xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center">
            <Box mr={4}>
              <SkillIcon skill={skillKey} size={56} />
            </Box>
            <Box>
              <Heading size="lg" color="white" mb={1}>{skillName} Calculator</Heading>
              <Text color="gray.400">
                Plan your {skillName} training efficiently with live Grand Exchange prices.
              </Text>
            </Box>
          </Flex>
          <Link href="/skills" style={{ textDecoration: 'none' }}>
            <Text color="brand.primary" _hover={{ textDecoration: 'underline' }} fontWeight="medium">
              ← Back to Skills
            </Text>
          </Link>
        </Flex>

        {/* Calculator Inputs */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
            <Heading size="md" color="brand.primary" mb={4}>Input</Heading>
            
            <VStack spacing={4} align="stretch">
              <Box>
                <Text mb={2} fontWeight="medium" color="white">
                  Current Level
                </Text>
                <Input
                  id="current-level"
                  type="number"
                  min={1}
                  max={99}
                  defaultValue={1}
                  bg="#1a243b"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="md"
                  color="white"
                  _focus={{ borderColor: "brand.primary", outline: "none" }}
                />
              </Box>
              
              <Box>
                <Text mb={2} fontWeight="medium" color="white">
                  Target Level
                </Text>
                <Input
                  id="target-level"
                  type="number"
                  min={2}
                  max={99}
                  defaultValue={99}
                  bg="#1a243b"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="md"
                  color="white"
                  _focus={{ borderColor: "brand.primary", outline: "none" }}
                />
              </Box>
              
              <Box pt={2}>
                <Button
                  width="100%"
                  bg="brand.primary"
                  color="brand.background"
                  fontWeight="medium"
                  py={2}
                  px={6}
                  borderRadius="md"
                  _hover={{ bg: "brand.primaryHover" }}
                >
                  Calculate
                </Button>
              </Box>
            </VStack>
          </Box>
          
          {/* Results Panel */}
          <Box bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
            <Heading size="md" color="brand.primary" mb={4}>Summary</Heading>
            
            <VStack spacing={5} align="stretch">
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={1}>Current XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white">0</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={1}>Needed XP</Text>
                  <Text fontSize="lg" fontWeight="bold" color="white">13,034,431</Text>
                </Box>
              </SimpleGrid>
              
              <Box>
                <Progress value={0} size="sm" colorScheme="yellow" bg="#1a243b" borderRadius="full" />
                <Text fontSize="xs" color="gray.400" mt={1}>0% Complete</Text>
              </Box>
            </VStack>
          </Box>
        </Grid>
        
        {/* Methods Table (placeholder) */}
        <Box mt={8} bg="brand.card" borderRadius="lg" p={6} border="1px solid" borderColor="brand.border">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md" color="brand.primary">Training Methods</Heading>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button 
                bg="#1a243b" 
                color="white" 
                borderColor="brand.border" 
                borderLeftRadius="md" 
                _hover={{ bg: "#222b43" }}
              >
                XP/hr
              </Button>
              <Button 
                bg="#1a243b" 
                color="white" 
                borderColor="brand.border" 
                borderRadius="0" 
                _hover={{ bg: "#222b43" }}
              >
                GP/hr
              </Button>
              <Button 
                bg="#1a243b" 
                color="white" 
                borderColor="brand.border" 
                borderRightRadius="md" 
                _hover={{ bg: "#222b43" }}
              >
                Level
              </Button>
            </ButtonGroup>
          </Flex>
          
          <Box overflowX="auto">
            <Table variant="unstyled" width="full">
              <Thead bg="#1a243b" borderBottom="1px solid" borderColor="brand.border">
                <Tr>
                  <Th px={4} py={3} textAlign="left" color="gray.400" fontWeight="medium" fontSize="sm">Method</Th>
                  <Th px={4} py={3} textAlign="left" color="gray.400" fontWeight="medium" fontSize="sm">Level</Th>
                  <Th px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">XP/ea</Th>
                  <Th px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">Actions</Th>
                  <Th px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">GP/ea</Th>
                  <Th px={4} py={3} textAlign="right" color="gray.400" fontWeight="medium" fontSize="sm">Profit/Loss</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr _hover={{ bg: "#1a243b" }} cursor="pointer" borderBottom="1px solid" borderColor="brand.border">
                  <Td px={4} py={3} color="white">Placeholder Item</Td>
                  <Td px={4} py={3} color="white">1</Td>
                  <Td px={4} py={3} textAlign="right" color="white">50</Td>
                  <Td px={4} py={3} textAlign="right" color="white">260,689</Td>
                  <Td px={4} py={3} textAlign="right" color="red.500">-100</Td>
                  <Td px={4} py={3} textAlign="right" color="red.500">-26,068,900</Td>
                </Tr>
                <Tr _hover={{ bg: "#1a243b" }} cursor="pointer">
                  <Td px={4} py={3} color="white">Placeholder Item 2</Td>
                  <Td px={4} py={3} color="white">10</Td>
                  <Td px={4} py={3} textAlign="right" color="white">100</Td>
                  <Td px={4} py={3} textAlign="right" color="white">130,344</Td>
                  <Td px={4} py={3} textAlign="right" color="green.500">+50</Td>
                  <Td px={4} py={3} textAlign="right" color="green.500">+6,517,200</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="brand.card" mt={16} py={8} borderTop="1px solid" borderColor="brand.border">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="sm" color="gray.400">© {new Date().getFullYear()} Probemas | All game content is copyright Jagex Ltd.</Text>
          <Text fontSize="sm" color="gray.400" mt={1}>Not affiliated with Jagex or RuneScape. Icons from the OSRS Wiki.</Text>
        </Container>
      </Box>
    </Box>
  );
} 