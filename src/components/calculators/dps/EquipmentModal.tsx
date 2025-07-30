'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  SimpleGrid,
  Box,
  Image,
  Badge,
  Flex,
  Select,
} from '@chakra-ui/react';
import { useDPSStore } from '@/stores/dpsStore';
import { EquipmentPiece } from '@/types/dps/Player';
import { getEquipmentBySlot } from '@/data/dps/equipment';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot: string | null;
}

// Equipment item card
interface EquipmentItemCardProps {
  item: EquipmentPiece;
  isEquipped: boolean;
  onSelect: (item: EquipmentPiece) => void;
  onUnequip?: () => void;
}

const EquipmentItemCard: React.FC<EquipmentItemCardProps> = ({ 
  item, 
  isEquipped, 
  onSelect, 
  onUnequip 
}) => (
  <Box
    p={3}
    bg={isEquipped ? 'rgba(255, 203, 47, 0.2)' : '#1a140a'}
    border={isEquipped ? '2px solid #ffcb2f' : '1px solid #3b2914'}
    borderRadius="md"
    cursor="pointer"
    _hover={{ borderColor: '#ffcb2f', bg: 'rgba(255, 203, 47, 0.1)' }}
    onClick={() => isEquipped && onUnequip ? onUnequip() : onSelect(item)}
  >
    <VStack spacing={2}>
      <Box position="relative">
        <Image
          src={item.image}
          alt={item.name}
          boxSize="48px"
          objectFit="contain"
          fallback={
            <Box 
              boxSize="48px" 
              bg="#3b2914" 
              borderRadius="sm"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid #5a4120"
            >
              <Text fontSize="lg" color="#7a7060">⚔️</Text>
            </Box>
          }
          onError={(e) => {
            // Try alternative image sources if main one fails
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('oldschool.runescape.wiki')) {
              target.src = `https://oldschool.runescape.wiki/images/${item.name.replace(/ /g, '_')}.png`;
            }
          }}
        />
      </Box>
      
      <VStack spacing={1} align="center">
        <Text fontSize="xs" fontWeight="bold" color="#e0d0b0" textAlign="center" noOfLines={2}>
          {item.name}
        </Text>
        
        {item.version && (
          <Text fontSize="xs" color="#7a7060" textAlign="center" noOfLines={1}>
            {item.version}
          </Text>
        )}
        
        <HStack spacing={1} wrap="wrap" justify="center">
          {item.bonuses.str > 0 && (
            <Badge size="xs" bg="#361f0e" color="#ffcb2f">
              Str +{item.bonuses.str}
            </Badge>
          )}
          {item.offensive.stab > 0 && (
            <Badge size="xs" bg="#361f0e" color="#ffcb2f">
              Stab +{item.offensive.stab}
            </Badge>
          )}
          {item.offensive.slash > 0 && (
            <Badge size="xs" bg="#361f0e" color="#ffcb2f">
              Slash +{item.offensive.slash}
            </Badge>
          )}
          {item.offensive.crush > 0 && (
            <Badge size="xs" bg="#361f0e" color="#ffcb2f">
              Crush +{item.offensive.crush}
            </Badge>
          )}
        </HStack>
        
        {isEquipped && (
          <Badge bg="#ffcb2f" color="#211305" size="sm">
            Equipped
          </Badge>
        )}
      </VStack>
    </VStack>
  </Box>
);

const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, selectedSlot }) => {
  const { player, setPlayer } = useDPSStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Get available equipment for the selected slot
  const availableEquipment = React.useMemo(() => {
    if (!selectedSlot) return [];
    
    let equipment = getEquipmentBySlot(selectedSlot);
    
    // Apply search filter
    if (searchQuery.trim()) {
      equipment = equipment.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter (simplified)
    if (categoryFilter !== 'ALL') {
      equipment = equipment.filter(item => item.category.includes(categoryFilter));
    }
    
    return equipment;
  }, [selectedSlot, searchQuery, categoryFilter]);

  // Get currently equipped item for this slot
  const currentEquipment = selectedSlot ? player.equipment[selectedSlot as keyof typeof player.equipment] : null;

  const handleEquipItem = (item: EquipmentPiece) => {
    if (!selectedSlot) return;
    
    // Create new equipment object with the selected item
    const newEquipment = { ...player.equipment };
    newEquipment[selectedSlot as keyof typeof newEquipment] = item;
    
    // Calculate equipment stats
    const newBonuses = { str: 0, ranged_str: 0, magic_str: 0, prayer: 0 };
    const newOffensive = { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 };
    const newDefensive = { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 };
    
    Object.values(newEquipment).forEach(equippedItem => {
      if (equippedItem) {
        newBonuses.str += equippedItem.bonuses.str;
        newBonuses.ranged_str += equippedItem.bonuses.ranged_str;
        newBonuses.magic_str += equippedItem.bonuses.magic_str;
        newBonuses.prayer += equippedItem.bonuses.prayer;
        
        newOffensive.stab += equippedItem.offensive.stab;
        newOffensive.slash += equippedItem.offensive.slash;
        newOffensive.crush += equippedItem.offensive.crush;
        newOffensive.magic += equippedItem.offensive.magic;
        newOffensive.ranged += equippedItem.offensive.ranged;
        
        newDefensive.stab += equippedItem.defensive.stab;
        newDefensive.slash += equippedItem.defensive.slash;
        newDefensive.crush += equippedItem.defensive.crush;
        newDefensive.magic += equippedItem.defensive.magic;
        newDefensive.ranged += equippedItem.defensive.ranged;
      }
    });
    
    setPlayer({
      equipment: newEquipment,
      bonuses: newBonuses,
      offensive: newOffensive,
      defensive: newDefensive,
    });
    
    onClose();
  };

  const handleUnequipItem = () => {
    if (!selectedSlot) return;
    
    const newEquipment = { ...player.equipment };
    newEquipment[selectedSlot as keyof typeof newEquipment] = null;
    
    // Recalculate stats without this item
    const newBonuses = { str: 0, ranged_str: 0, magic_str: 0, prayer: 0 };
    const newOffensive = { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 };
    const newDefensive = { stab: 0, slash: 0, crush: 0, magic: 0, ranged: 0 };
    
    Object.values(newEquipment).forEach(equippedItem => {
      if (equippedItem) {
        newBonuses.str += equippedItem.bonuses.str;
        newBonuses.ranged_str += equippedItem.bonuses.ranged_str;
        newBonuses.magic_str += equippedItem.bonuses.magic_str;
        newBonuses.prayer += equippedItem.bonuses.prayer;
        
        newOffensive.stab += equippedItem.offensive.stab;
        newOffensive.slash += equippedItem.offensive.slash;
        newOffensive.crush += equippedItem.offensive.crush;
        newOffensive.magic += equippedItem.offensive.magic;
        newOffensive.ranged += equippedItem.offensive.ranged;
        
        newDefensive.stab += equippedItem.defensive.stab;
        newDefensive.slash += equippedItem.defensive.slash;
        newDefensive.crush += equippedItem.defensive.crush;
        newDefensive.magic += equippedItem.defensive.magic;
        newDefensive.ranged += equippedItem.defensive.ranged;
      }
    });
    
    setPlayer({
      equipment: newEquipment,
      bonuses: newBonuses,
      offensive: newOffensive,
      defensive: newDefensive,
    });
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(4px)" />
      <ModalContent 
        bg="rgba(42, 30, 15, 0.95)" 
        border="2px solid #ffcb2f"
        borderRadius="lg"
        color="#e0d0b0"
        maxH="85vh"
        mx={4}
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 203, 47, 0.1)"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          top: '1px',
          left: '1px',
          right: '1px',
          height: '1px',
          backgroundColor: 'rgba(255, 203, 47, 0.3)',
          borderRadius: 'lg'
        }}
      >
        <ModalHeader 
          color="#ffcb2f" 
          fontSize="xl" 
          fontWeight="bold"
          borderBottom="1px solid rgba(255, 203, 47, 0.2)"
          pb={4}
        >
          Select Equipment for {selectedSlot ? selectedSlot.charAt(0).toUpperCase() + selectedSlot.slice(1) : 'Slot'}
        </ModalHeader>
        <ModalCloseButton 
          color="#e0d0b0" 
          _hover={{ bg: 'rgba(255, 203, 47, 0.2)', color: '#ffcb2f' }}
          borderRadius="md"
        />
        
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {/* Search and filters */}
            <HStack spacing={4} mb={2}>
              <Box flex={1}>
                <Text fontSize="sm" color="#e0d0b0" mb={2} fontWeight="medium">Search Equipment</Text>
                <Input
                  placeholder="Type equipment name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="rgba(26, 20, 10, 0.8)"
                  border="1px solid #3b2914"
                  borderRadius="md"
                  color="#e0d0b0"
                  _placeholder={{ color: '#7a7060' }}
                  _focus={{ 
                    borderColor: '#ffcb2f', 
                    boxShadow: '0 0 0 1px #ffcb2f',
                    bg: "#1a140a"
                  }}
                  _hover={{ borderColor: 'rgba(255, 203, 47, 0.5)' }}
                />
              </Box>
              
              <Box minW="200px">
                <Text fontSize="sm" color="#e0d0b0" mb={2} fontWeight="medium">Category</Text>
                              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                bg="rgba(26, 20, 10, 0.8)"
                border="1px solid #3b2914"
                borderRadius="md"
                color="#e0d0b0"
                _focus={{ 
                  borderColor: '#ffcb2f', 
                  boxShadow: '0 0 0 1px #ffcb2f',
                  bg: "#1a140a"
                }}
                _hover={{ borderColor: 'rgba(255, 203, 47, 0.5)' }}
              >
                <option value="ALL" style={{ background: '#1a140a' }}>All Categories</option>
                <option value="DAGGER" style={{ background: '#1a140a' }}>Daggers</option>
                <option value="SLASH_SWORD" style={{ background: '#1a140a' }}>Slash Swords</option>
                <option value="STAB_SWORD" style={{ background: '#1a140a' }}>Stab Swords</option>
                <option value="WHIP" style={{ background: '#1a140a' }}>Whips</option>
                <option value="AXE" style={{ background: '#1a140a' }}>Axes</option>
                <option value="BOW" style={{ background: '#1a140a' }}>Bows</option>
                <option value="CROSSBOW" style={{ background: '#1a140a' }}>Crossbows</option>
                <option value="STAFF" style={{ background: '#1a140a' }}>Staves</option>
                <option value="SPEAR" style={{ background: '#1a140a' }}>Spears</option>
              </Select>
              </Box>
            </HStack>

            {/* Currently equipped item */}
            {currentEquipment && (
              <Box 
                bg="rgba(255, 203, 47, 0.1)" 
                border="1px solid rgba(255, 203, 47, 0.3)"
                borderRadius="md" 
                p={4}
              >
                <Text fontSize="sm" fontWeight="bold" color="#ffcb2f" mb={3}>
                  Currently Equipped
                </Text>
                <Box maxW="300px">
                  <EquipmentItemCard
                    item={currentEquipment}
                    isEquipped={true}
                    onSelect={() => {}}
                    onUnequip={handleUnequipItem}
                  />
                </Box>
              </Box>
            )}

            {/* Available equipment grid */}
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="#ffcb2f" mb={2}>
                Available Equipment ({availableEquipment.length} items)
              </Text>
              
              {availableEquipment.length > 0 ? (
                <Box 
                  maxH="450px" 
                  overflowY="auto" 
                  bg="rgba(0, 0, 0, 0.2)"
                  borderRadius="md"
                  p={3}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(59, 41, 20, 0.5)',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(255, 203, 47, 0.5)',
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'rgba(255, 203, 47, 0.7)',
                    },
                  }}
                >
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
                    {availableEquipment.map((item) => (
                      <EquipmentItemCard
                        key={item.id}
                        item={item}
                        isEquipped={currentEquipment?.id === item.id}
                        onSelect={handleEquipItem}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              ) : (
                <Flex justify="center" py={12} direction="column" align="center">
                  <Text color="#7a7060" fontSize="lg" mb={2}>No equipment found</Text>
                  <Text color="#7a7060" fontSize="sm">Try adjusting your search criteria</Text>
                </Flex>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid rgba(255, 203, 47, 0.2)" pt={4}>
          <Button
            bg="rgba(59, 41, 20, 0.8)"
            color="#e0d0b0"
            border="1px solid #ffcb2f"
            borderRadius="md"
            _hover={{ 
              bg: '#ffcb2f', 
              color: '#211305',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
            onClick={onClose}
            px={6}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EquipmentModal; 