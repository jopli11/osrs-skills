'use client';

import React, { useState } from 'react';
import {
  Box,
  Badge,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Image,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Input,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useDPSStore } from '@/stores/dpsStore';
import { Monster } from '@/types/dps/Monster';
import { MONSTER_CATEGORIES, searchMonsters, MONSTERS_DATABASE } from '@/data/dps/monsters';

// Monster Card Component
interface MonsterCardProps {
  monster: Monster;
  isSelected: boolean;
  onSelect: (monster: Monster) => void;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster, isSelected, onSelect }) => (
  <Box
    p={3}
    bg={isSelected ? 'rgba(255, 203, 47, 0.2)' : '#1a140a'}
    border={isSelected ? '2px solid #ffcb2f' : '1px solid #3b2914'}
    borderRadius="md"
    cursor="pointer"
    _hover={{ borderColor: '#ffcb2f', bg: 'rgba(255, 203, 47, 0.1)' }}
    onClick={() => onSelect(monster)}
  >
    <HStack spacing={3}>
                <Image
            src={monster.image}
            alt={monster.name}
            boxSize="40px"
            objectFit="contain"
            fallback={
              <Box
                boxSize="40px"
                bg="#3b2914"
                borderRadius="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid #5a4120"
              >
                <Text fontSize="lg" color="#7a7060">👹</Text>
              </Box>
            }
            onError={(e) => {
              // Try alternative image sources if main one fails
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('oldschool.runescape.wiki')) {
                target.src = `https://oldschool.runescape.wiki/images/${monster.name.replace(/ /g, '_')}.png`;
              }
            }}
          />
      <VStack align="start" spacing={1} flex={1}>
        <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">
          {monster.name}
        </Text>
        <HStack spacing={2}>
          <Text fontSize="xs" color="#7a7060">
            HP: {monster.skills.hp}
          </Text>
          <Text fontSize="xs" color="#7a7060">
            Def: {monster.skills.def}
          </Text>
          <Text fontSize="xs" color="#7a7060">
            Max Hit: {monster.maxHit || '?'}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  </Box>
);

// Monster Stats Display
interface MonsterStatsProps {
  monster: Monster;
}

const MonsterStats: React.FC<MonsterStatsProps> = ({ monster }) => (
  <VStack spacing={4} align="stretch">
    <HStack justify="center" spacing={4}>
              <Image
          src={monster.image}
          alt={monster.name}
          boxSize="80px"
          objectFit="contain"
          fallback={
            <Box
              boxSize="80px"
              bg="#3b2914"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid #5a4120"
            >
              <Text fontSize="3xl" color="#7a7060">👹</Text>
            </Box>
          }
          onError={(e) => {
            // Try alternative image sources if main one fails
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('oldschool.runescape.wiki')) {
              target.src = `https://oldschool.runescape.wiki/images/${monster.name.replace(/ /g, '_')}.png`;
            }
          }}
        />
      <VStack align="start" spacing={1}>
        <Text fontSize="lg" fontWeight="bold" color="#ffcb2f">
          {monster.name}
        </Text>
        {monster.version && (
          <Text fontSize="sm" color="#7a7060">
            {monster.version}
          </Text>
        )}
        <HStack spacing={2}>
          <Badge size="sm" bg="#361f0e" color="#ffcb2f">
            Size: {monster.size}
          </Badge>
          <Badge size="sm" bg="#361f0e" color="#ffcb2f">
            Speed: {monster.speed}
          </Badge>
        </HStack>
      </VStack>
    </HStack>

    <SimpleGrid columns={3} spacing={3}>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Attack</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.atk}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Defence</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.def}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Hitpoints</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.hp}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Strength</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.str}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Ranged</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.ranged}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontSize="xs" color="#7a7060">Magic</StatLabel>
        <StatNumber fontSize="sm" color="#e0d0b0">{monster.skills.magic}</StatNumber>
      </Stat>
    </SimpleGrid>

    {monster.attributes.length > 0 && (
      <>
        <Divider borderColor="#3b2914" />
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">Attributes</Text>
          <Flex wrap="wrap" gap={2}>
            {monster.attributes.map((attr, index) => (
              <Badge key={index} size="sm" bg="#361f0e" color="#ffcb2f">
                {attr}
              </Badge>
            ))}
          </Flex>
        </VStack>
      </>
    )}
  </VStack>
);

// Main Monster Section Component
const MonsterSection: React.FC = () => {
  const { monster, setMonster } = useDPSStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter monsters based on search and category
  const filteredMonsters = React.useMemo(() => {
    let monsters = MONSTERS_DATABASE;

    // Apply search filter
    if (searchQuery.trim()) {
      monsters = searchMonsters(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'ALL') {
      const category = MONSTER_CATEGORIES[selectedCategory as keyof typeof MONSTER_CATEGORIES];
      if (category) {
        monsters = category.monsters;
      }
    }

    return monsters;
  }, [searchQuery, selectedCategory]);

  const handleMonsterSelect = (selectedMonster: Monster) => {
    setMonster(selectedMonster);
  };

  return (
    <Box 
      bg="rgba(42, 30, 15, 0.85)" 
      borderRadius="md" 
      p={6}
      border="2px solid black"
      boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
      backdropFilter="blur(4px)"
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
      <Badge 
        bg="#361f0e" 
        color="#ffcb2f" 
        px={3} 
        py={1.5} 
        borderRadius="sm" 
        mb={4}
        fontWeight="medium"
        border="1px solid black"
        boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
      >
        Monster
      </Badge>

      <VStack spacing={4} align="stretch">
        {/* Search and Category Filter */}
        <VStack spacing={3}>
          <FormControl>
            <FormLabel fontSize="sm" color="#e0d0b0">Search Monsters</FormLabel>
            <Input
              placeholder="Type monster name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="#1a140a"
              border="1px solid #3b2914"
              color="#e0d0b0"
              _placeholder={{ color: '#7a7060' }}
              _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" color="#e0d0b0">Category</FormLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              bg="#1a140a"
              border="1px solid #3b2914"
              color="#e0d0b0"
              _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
              size="sm"
            >
              <option value="ALL">All Monsters</option>
              {Object.entries(MONSTER_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.name} ({category.monsters.length})
                </option>
              ))}
            </Select>
          </FormControl>
        </VStack>

        {/* Selected Monster Display */}
        {monster && (
          <Box>
            <Text fontSize="sm" fontWeight="bold" color="#e0d0b0" mb={3}>
              Selected Monster
            </Text>
            <MonsterStats monster={monster} />
          </Box>
        )}

        {/* Monster List */}
        <VStack spacing={2} align="stretch" maxH="300px" overflowY="auto">
          <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">
            Available Monsters ({filteredMonsters.length})
          </Text>
          {filteredMonsters.length > 0 ? (
            filteredMonsters.map((monsterOption, index) => (
              <MonsterCard
                key={`${monsterOption.id}-${index}`}
                monster={monsterOption}
                isSelected={monster?.id === monsterOption.id}
                onSelect={handleMonsterSelect}
              />
            ))
          ) : (
            <Text fontSize="sm" color="#7a7060" textAlign="center" py={4}>
              No monsters found matching your criteria
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default MonsterSection; 