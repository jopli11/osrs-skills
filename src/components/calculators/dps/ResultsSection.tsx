'use client';

import React from 'react';
import {
  Box,
  Badge,
  Text,
  VStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from '@chakra-ui/react';
import { useDPSStore } from '@/stores/dpsStore';
import { getCombatLevel, getMonsterCombatLevel } from '@/lib/dps/calculations';

// DPS Stat Component
interface DPSStatProps {
  label: string;
  value: string | number;
  helpText?: string;
  color?: string;
}

const DPSStat: React.FC<DPSStatProps> = ({ label, value, helpText, color = "#e0d0b0" }) => (
  <Stat textAlign="center">
    <StatLabel fontSize="xs" color="#7a7060">{label}</StatLabel>
    <StatNumber fontSize="lg" color={color}>{value}</StatNumber>
    {helpText && (
      <StatHelpText fontSize="xs" color="#7a7060">{helpText}</StatHelpText>
    )}
  </Stat>
);

// Main Results Section Component
const ResultsSection: React.FC = () => {
  const { results, player, monster } = useDPSStore();

  // Check if we have all required data for calculations
  const hasValidSetup = player && monster;

  const formatNumber = (num: number, decimals: number = 2): string => {
    return Number(num).toFixed(decimals);
  };

  const formatPercentage = (num: number): string => {
    return `${formatNumber(num, 1)}%`;
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
        Results
      </Badge>

      <VStack spacing={4} align="stretch">
        {!hasValidSetup ? (
          <Alert status="info" bg="rgba(255, 203, 47, 0.1)" border="1px solid #ffcb2f">
            <AlertIcon color="#ffcb2f" />
            <Box>
              <AlertTitle color="#ffcb2f">Setup Required</AlertTitle>
              <AlertDescription color="#e0d0b0">
                Configure your player stats and select a monster to see DPS calculations.
              </AlertDescription>
            </Box>
          </Alert>
        ) : results.isCalculating ? (
          <VStack spacing={4}>
            <Spinner size="lg" color="#ffcb2f" />
            <Text color="#e0d0b0" textAlign="center">
              Calculating DPS...
            </Text>
          </VStack>
        ) : (
          <>
            {/* Main DPS Stats */}
            <VStack spacing={4}>
              <Text fontSize="md" fontWeight="bold" color="#ffcb2f" textAlign="center">
                Combat Analysis vs {monster?.name}
              </Text>
              
              <SimpleGrid columns={3} spacing={4} width="100%">
                <DPSStat
                  label="DPS"
                  value={formatNumber(results.dps)}
                  helpText="Damage per second"
                  color="#ffcb2f"
                />
                <DPSStat
                  label="Max Hit"
                  value={results.maxHit}
                  helpText="Maximum damage"
                  color="#e0d0b0"
                />
                <DPSStat
                  label="Accuracy"
                  value={formatPercentage(results.accuracy)}
                  helpText="Hit chance"
                  color="#e0d0b0"
                />
              </SimpleGrid>

              {results.ttk && (
                <DPSStat
                  label="Time to Kill"
                  value={`${formatNumber(results.ttk)}s`}
                  helpText="Average kill time"
                  color="#e0d0b0"
                />
              )}
            </VStack>

            <Divider borderColor="#3b2914" />

            {/* Combat Summary */}
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">
                Combat Summary
              </Text>
              
              <SimpleGrid columns={2} spacing={3}>
                <Box>
                  <Text fontSize="xs" color="#7a7060" mb={1}>Player Combat Level</Text>
                  <Text fontSize="sm" color="#e0d0b0">
                    {getCombatLevel(player.skills)}
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="xs" color="#7a7060" mb={1}>Monster Combat Level</Text>
                  <Text fontSize="sm" color="#e0d0b0">
                    {getMonsterCombatLevel(monster)}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="#7a7060" mb={1}>Combat Style</Text>
                  <Text fontSize="sm" color="#e0d0b0">
                    {player.style.name} ({player.style.stance})
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="xs" color="#7a7060" mb={1}>Attack Speed</Text>
                  <Text fontSize="sm" color="#e0d0b0">
                    {player.attackSpeed} ticks
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>

            <Divider borderColor="#3b2914" />

            {/* Active Bonuses */}
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">
                Active Bonuses
              </Text>
              
              <VStack align="stretch" spacing={2}>
                {player.prayers.length > 0 ? (
                  <Box>
                    <Text fontSize="xs" color="#7a7060" mb={1}>Active Prayers</Text>
                    <Text fontSize="sm" color="#e0d0b0">
                      {player.prayers.length} prayer(s) active
                    </Text>
                  </Box>
                ) : (
                  <Text fontSize="xs" color="#7a7060">No prayers active</Text>
                )}

                {player.buffs.potions.length > 0 ? (
                  <Box>
                    <Text fontSize="xs" color="#7a7060" mb={1}>Active Potions</Text>
                    <Text fontSize="sm" color="#e0d0b0">
                      {player.buffs.potions.length} potion(s) active
                    </Text>
                  </Box>
                ) : (
                  <Text fontSize="xs" color="#7a7060">No potions active</Text>
                )}

                {(player.buffs.onSlayerTask || player.buffs.inWilderness) && (
                  <VStack align="stretch" spacing={1}>
                    {player.buffs.onSlayerTask && (
                      <Flex justify="space-between">
                        <Text fontSize="xs" color="#7a7060">Slayer Task</Text>
                        <Text fontSize="xs" color="#ffcb2f">Active</Text>
                      </Flex>
                    )}
                    {player.buffs.inWilderness && (
                      <Flex justify="space-between">
                        <Text fontSize="xs" color="#7a7060">Wilderness</Text>
                        <Text fontSize="xs" color="#ffcb2f">Active</Text>
                      </Flex>
                    )}
                  </VStack>
                )}
              </VStack>
            </VStack>

            {/* Efficiency Bar */}
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="bold" color="#e0d0b0">
                Combat Efficiency
              </Text>
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="xs" color="#7a7060">Overall Rating</Text>
                  <Text fontSize="xs" color="#e0d0b0">
                    {results.accuracy > 90 ? 'Excellent' : 
                     results.accuracy > 70 ? 'Good' : 
                     results.accuracy > 50 ? 'Fair' : 'Poor'}
                  </Text>
                </Flex>
                <Progress 
                  value={results.accuracy} 
                  colorScheme="yellow" 
                  bg="#3b2914"
                  size="sm"
                />
              </Box>
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ResultsSection; 