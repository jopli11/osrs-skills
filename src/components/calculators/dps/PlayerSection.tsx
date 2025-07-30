'use client';

import React, { useState } from 'react';
import {
  Box,
  Badge,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  FormLabel,
  FormControl,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Select,
} from '@chakra-ui/react';
import { useDPSStore } from '@/stores/dpsStore';
import { PlayerSkills, Prayer, OFFENSIVE_PRAYERS } from '@/types/dps/Player';
import EquipmentModal from './EquipmentModal';
import { getCombatStylesForCategory, getWeaponCategory } from '@/data/dps/combat-styles';


// Skill Input Component
interface SkillInputProps {
  label: string;
  skill: keyof PlayerSkills;
  value: number;
  boost: number;
  onSkillChange: (skill: keyof PlayerSkills, value: number) => void;
  onBoostChange: (skill: keyof PlayerSkills, value: number) => void;
}

const SkillInput: React.FC<SkillInputProps> = ({ 
  label, 
  skill, 
  value, 
  boost,
  onSkillChange, 
  onBoostChange 
}) => (
  <FormControl>
    <FormLabel fontSize="sm" color="#e0d0b0" mb={1}>{label}</FormLabel>
    <HStack spacing={2}>
      <NumberInput 
        size="sm" 
        min={1} 
        max={99} 
        value={value}
        onChange={(_, num) => onSkillChange(skill, num || 1)}
      >
        <NumberInputField 
          bg="#1a140a"
          border="1px solid #3b2914"
          color="#e0d0b0"
          _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper border="none" color="#e0d0b0" />
          <NumberDecrementStepper border="none" color="#e0d0b0" />
        </NumberInputStepper>
      </NumberInput>
      <Text color="#7a7060" fontSize="xs">+</Text>
      <NumberInput 
        size="sm" 
        min={0} 
        max={20} 
        value={boost}
        onChange={(_, num) => onBoostChange(skill, num || 0)}
      >
        <NumberInputField 
          bg="#1a140a"
          border="1px solid #3b2914"
          color="#e0d0b0"
          _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
          width="60px"
        />
      </NumberInput>
    </HStack>
  </FormControl>
);

// Equipment Slot Component

interface EquipmentSlotProps {
  slotKey: string;
  slotName: string;
  onClick: (slotKey: string) => void;
}

const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ slotKey, slotName, onClick }) => {
  const { player } = useDPSStore();
  const equipment = player.equipment[slotKey as keyof typeof player.equipment];

  return (
    <Tooltip label={`Click to change ${slotName}`} placement="top">
      <Box
        width="60px"
        height="60px"
        bg="#1a140a"
        border="2px solid #3b2914"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        _hover={{ borderColor: '#ffcb2f' }}
        position="relative"
        onClick={() => onClick(slotKey)}
      >
        {equipment ? (
          <>
            <Box
              as="img"
              src={equipment.image}
              alt={equipment.name}
              width="40px"
              height="40px"
              objectFit="contain"
            />
            <Text
              position="absolute"
              bottom="-20px"
              fontSize="xs"
              color="#e0d0b0"
              textAlign="center"
              width="100%"
              noOfLines={1}
            >
              {equipment.name}
            </Text>
          </>
        ) : (
          <Text fontSize="xs" color="#7a7060" textAlign="center">
            {slotName}
          </Text>
        )}
      </Box>
    </Tooltip>
  );
};

// Prayer Component
interface PrayerToggleProps {
  prayer: Prayer;
  isActive: boolean;
  onToggle: (prayer: Prayer) => void;
}

const PrayerToggle: React.FC<PrayerToggleProps> = ({ prayer, isActive, onToggle }) => {
  const prayerNames: Record<Prayer, string> = {
    [Prayer.BURST_OF_STRENGTH]: 'Burst of Strength',
    [Prayer.CLARITY_OF_THOUGHT]: 'Clarity of Thought',
    [Prayer.SHARP_EYE]: 'Sharp Eye',
    [Prayer.MYSTIC_WILL]: 'Mystic Will',
    [Prayer.SUPERHUMAN_STRENGTH]: 'Superhuman Strength',
    [Prayer.IMPROVED_REFLEXES]: 'Improved Reflexes',
    [Prayer.HAWK_EYE]: 'Hawk Eye',
    [Prayer.MYSTIC_LORE]: 'Mystic Lore',
    [Prayer.ULTIMATE_STRENGTH]: 'Ultimate Strength',
    [Prayer.INCREDIBLE_REFLEXES]: 'Incredible Reflexes',
    [Prayer.EAGLE_EYE]: 'Eagle Eye',
    [Prayer.MYSTIC_MIGHT]: 'Mystic Might',
    [Prayer.CHIVALRY]: 'Chivalry',
    [Prayer.PIETY]: 'Piety',
    [Prayer.RIGOUR]: 'Rigour',
    [Prayer.AUGURY]: 'Augury',
    [Prayer.THICK_SKIN]: 'Thick Skin',
    [Prayer.ROCK_SKIN]: 'Rock Skin',
    [Prayer.STEEL_SKIN]: 'Steel Skin',
    [Prayer.DEADEYE]: 'Deadeye',
    [Prayer.MYSTIC_VIGOUR]: 'Mystic Vigour',
  };

  return (
    <Checkbox
      isChecked={isActive}
      onChange={() => onToggle(prayer)}
      colorScheme="yellow"
      size="sm"
    >
      <Text fontSize="sm" color="#e0d0b0">
        {prayerNames[prayer]}
      </Text>
    </Checkbox>
  );
};

// Main Player Section Component
const PlayerSection: React.FC = () => {
  const { 
    player, 
    updatePlayerSkills, 
    updatePlayerBoosts, 
    togglePrayer 
  } = useDPSStore();
  
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  
  const handleEquipmentSlotClick = (slotKey: string) => {
    setSelectedSlot(slotKey);
    setIsEquipmentModalOpen(true);
  };
  
  const closeEquipmentModal = () => {
    setIsEquipmentModalOpen(false);
    setSelectedSlot(null);
  };

  const handleSkillChange = (skill: keyof PlayerSkills, value: number) => {
    updatePlayerSkills({ [skill]: value });
  };

  const handleBoostChange = (skill: keyof PlayerSkills, value: number) => {
    updatePlayerBoosts({ [skill]: value });
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
      maxWidth="100%"
      overflow="hidden"
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
        Player
      </Badge>

      <Tabs variant="enclosed" colorScheme="yellow" size="sm">
        <TabList mb={4} bg="rgba(0,0,0,0.3)" borderRadius="md" p={1} overflow="visible" display="flex" flexWrap="nowrap">
          <Tab 
            color="#e0d0b0" 
            _selected={{ 
              bg: '#ffcb2f', 
              color: '#211305', 
              borderColor: '#ffcb2f',
              fontWeight: 'bold',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            _hover={{
              bg: 'rgba(255, 203, 47, 0.2)',
              transform: 'translateY(-0.5px)'
            }}
            border="1px solid transparent"
            borderRadius="md"
            mx={0.25}
            flex="1"
            minW="0"
            transition="all 0.2s"
          >
            Skills
          </Tab>
          <Tab 
            color="#e0d0b0" 
            _selected={{ 
              bg: '#ffcb2f', 
              color: '#211305', 
              borderColor: '#ffcb2f',
              fontWeight: 'bold',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            _hover={{
              bg: 'rgba(255, 203, 47, 0.2)',
              transform: 'translateY(-0.5px)'
            }}
            border="1px solid transparent"
            borderRadius="md"
            mx={0.25}
            flex="1"
            minW="0"
            transition="all 0.2s"
          >
            Equipment
          </Tab>
          <Tab 
            color="#e0d0b0" 
            _selected={{ 
              bg: '#ffcb2f', 
              color: '#211305', 
              borderColor: '#ffcb2f',
              fontWeight: 'bold',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            _hover={{
              bg: 'rgba(255, 203, 47, 0.2)',
              transform: 'translateY(-0.5px)'
            }}
            border="1px solid transparent"
            borderRadius="md"
            mx={0.25}
            flex="1"
            minW="0"
            transition="all 0.2s"
          >
            Combat
          </Tab>
          <Tab 
            color="#e0d0b0" 
            _selected={{ 
              bg: '#ffcb2f', 
              color: '#211305', 
              borderColor: '#ffcb2f',
              fontWeight: 'bold',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            _hover={{
              bg: 'rgba(255, 203, 47, 0.2)',
              transform: 'translateY(-0.5px)'
            }}
            border="1px solid transparent"
            borderRadius="md"
            mx={0.25}
            flex="1"
            minW="0"
            transition="all 0.2s"
          >
            Prayers
          </Tab>
        </TabList>

        <TabPanels>
          {/* Skills Tab */}
          <TabPanel p={0}>
            <VStack spacing={3}>
              <SimpleGrid columns={2} spacing={3} width="100%">
                <SkillInput
                  label="Attack"
                  skill="atk"
                  value={player.skills.atk}
                  boost={player.boosts.atk}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
                <SkillInput
                  label="Strength"
                  skill="str"
                  value={player.skills.str}
                  boost={player.boosts.str}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
                <SkillInput
                  label="Defence"
                  skill="def"
                  value={player.skills.def}
                  boost={player.boosts.def}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
                <SkillInput
                  label="Ranged"
                  skill="ranged"
                  value={player.skills.ranged}
                  boost={player.boosts.ranged}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
                <SkillInput
                  label="Magic"
                  skill="magic"
                  value={player.skills.magic}
                  boost={player.boosts.magic}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
                <SkillInput
                  label="Prayer"
                  skill="prayer"
                  value={player.skills.prayer}
                  boost={player.boosts.prayer}
                  onSkillChange={handleSkillChange}
                  onBoostChange={handleBoostChange}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>

          {/* Equipment Tab */}
          <TabPanel p={0}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="#e0d0b0" textAlign="center">
                Equipment Grid (Click to equip/unequip items)
              </Text>
              <SimpleGrid columns={3} spacing={2} justifyItems="center">
                <Box />
                <EquipmentSlot slotKey="head" slotName="Head" onClick={handleEquipmentSlotClick} />
                <Box />
                
                <EquipmentSlot slotKey="cape" slotName="Cape" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="neck" slotName="Neck" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="ammo" slotName="Ammo" onClick={handleEquipmentSlotClick} />
                
                <EquipmentSlot slotKey="weapon" slotName="Weapon" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="body" slotName="Body" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="shield" slotName="Shield" onClick={handleEquipmentSlotClick} />
                
                <Box />
                <EquipmentSlot slotKey="legs" slotName="Legs" onClick={handleEquipmentSlotClick} />
                <Box />
                
                <EquipmentSlot slotKey="hands" slotName="Hands" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="feet" slotName="Feet" onClick={handleEquipmentSlotClick} />
                <EquipmentSlot slotKey="ring" slotName="Ring" onClick={handleEquipmentSlotClick} />
              </SimpleGrid>
              
              {/* Equipment Bonuses Display */}
              <Box 
                bg="rgba(0,0,0,0.3)" 
                p={3} 
                borderRadius="md" 
                border="1px solid #3b2914"
                width="100%"
              >
                <Text fontSize="sm" color="#ffcb2f" fontWeight="bold" mb={2}>
                  Equipment Bonuses
                </Text>
                <SimpleGrid columns={3} spacing={3}>
                  <VStack spacing={1} align="start">
                    <Text fontSize="xs" color="#7a7060" fontWeight="bold">Offensive</Text>
                    <Text fontSize="xs" color="#e0d0b0">Stab: {player.offensive.stab}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Slash: {player.offensive.slash}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Crush: {player.offensive.crush}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Magic: {player.offensive.magic}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Ranged: {player.offensive.ranged}</Text>
                  </VStack>
                  <VStack spacing={1} align="start">
                    <Text fontSize="xs" color="#7a7060" fontWeight="bold">Defensive</Text>
                    <Text fontSize="xs" color="#e0d0b0">Stab: {player.defensive.stab}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Slash: {player.defensive.slash}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Crush: {player.defensive.crush}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Magic: {player.defensive.magic}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Ranged: {player.defensive.ranged}</Text>
                  </VStack>
                  <VStack spacing={1} align="start">
                    <Text fontSize="xs" color="#7a7060" fontWeight="bold">Other</Text>
                    <Text fontSize="xs" color="#e0d0b0">Strength: {player.bonuses.str}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Ranged Str: {player.bonuses.ranged_str}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Magic Str: {player.bonuses.magic_str}</Text>
                    <Text fontSize="xs" color="#e0d0b0">Prayer: {player.bonuses.prayer}</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
            </VStack>
          </TabPanel>

          {/* Combat Tab */}
          <TabPanel p={0}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" color="#e0d0b0">Combat Style</FormLabel>
                <Select
                  bg="#1a140a"
                  border="1px solid #3b2914"
                  color="#e0d0b0"
                  _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                  value={`${player.style.name} (${player.style.stance})`}
                  onChange={(e) => {
                    // TODO: Implement combat style change
                    console.log('Combat style changed to:', e.target.value);
                  }}
                >
                  {(() => {
                    const weaponName = player.equipment.weapon?.name || '';
                    const combatStyles = getCombatStylesForCategory(getWeaponCategory(weaponName));
                    return combatStyles.map((style) => (
                      <option key={style.name} value={`${style.name} (${style.stance})`}>
                        {style.name} ({style.stance})
                      </option>
                    ));
                  })()}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" color="#e0d0b0">Attack Speed</FormLabel>
                <NumberInput 
                  value={player.attackSpeed}
                  min={1}
                  max={8}
                >
                  <NumberInputField 
                    bg="#1a140a"
                    border="1px solid #3b2914"
                    color="#e0d0b0"
                    _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper border="none" color="#e0d0b0" />
                    <NumberDecrementStepper border="none" color="#e0d0b0" />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </VStack>
          </TabPanel>

          {/* Prayers Tab */}
          <TabPanel p={0}>
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color="#e0d0b0" fontWeight="bold">Offensive Prayers</Text>
              <SimpleGrid columns={1} spacing={2}>
                {OFFENSIVE_PRAYERS.map((prayer) => (
                  <PrayerToggle
                    key={prayer}
                    prayer={prayer}
                    isActive={player.prayers.includes(prayer)}
                    onToggle={togglePrayer}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* Equipment Selection Modal */}
      <EquipmentModal
        isOpen={isEquipmentModalOpen}
        onClose={closeEquipmentModal}
        selectedSlot={selectedSlot}
      />
    </Box>
  );
};

export default PlayerSection; 