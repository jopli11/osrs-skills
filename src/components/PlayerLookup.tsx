'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useCalculatorStore } from '@/lib/store';

export default function PlayerLookup() {
  const [username, setUsername] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  
  const {
    playerStats,
    playerStatsLoading,
    playerStatsError,
    lookupPlayerStats,
    clearPlayerStats
  } = useCalculatorStore();

  // Debounce the lookup to prevent excessive API calls
  const debouncedLookup = useCallback((username: string) => {
    setIsDebouncing(true);
    
    // Clear existing player data to prevent persistence issues
    clearPlayerStats();
    
    const timer = setTimeout(() => {
      lookupPlayerStats(username);
      setIsDebouncing(false);
    }, 500); // 500ms debounce
    
    return () => {
      clearTimeout(timer);
      setIsDebouncing(false);
    };
  }, [lookupPlayerStats, clearPlayerStats]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setIsUsernameInvalid(true);
      return;
    }
    
    setIsUsernameInvalid(false);
    debouncedLookup(username);
  };

  return (
    <Box
      bg="rgba(42, 30, 15, 0.85)"
      borderRadius="md"
      p={4}
      border="2px solid black"
      boxShadow="3px 3px 0 rgba(0,0,0,0.4)"
      width="100%"
    >
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <Text color="#ffcb2f" fontWeight="bold" mb={2} textShadow="2px 2px 3px rgba(0,0,0,0.8)">
            Lookup your OSRS stats
          </Text>
          <Flex gap={3}>
            <Input
              placeholder="Enter OSRS username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="#1a140a"
              color="white"
              border="1px solid #3b2914"
              _hover={{ borderColor: '#ffcb2f' }}
              _focus={{ borderColor: '#ffcb2f', boxShadow: '0 0 0 1px #ffcb2f' }}
              borderColor={isUsernameInvalid ? "red.500" : "#3b2914"}
            />
            <Button
              type="submit"
              bg="#ffcb2f"
              color="#211305"
              _hover={{ bg: '#e0a922' }}
              disabled={playerStatsLoading || isDebouncing}
              borderWidth="1px"
              borderColor="black"
            >
              {playerStatsLoading || isDebouncing ? 'Searching...' : 'Lookup'}
            </Button>
          </Flex>
          {isUsernameInvalid && (
            <Text color="red.500" fontSize="sm" mt={1}>
              Username is required
            </Text>
          )}
        </Box>
      </form>

      {playerStatsLoading && (
        <Flex justify="center" my={4}>
          <Spinner color="#ffcb2f" />
        </Flex>
      )}

      {playerStatsError && (
        <Box 
          mt={4} 
          p={3} 
          bg="#3b2914"
          color="white" 
          borderRadius="md"
          borderWidth="1px"
          borderColor="#211305"
        >
          <Text fontWeight="bold">Error:</Text>
          <Text>{playerStatsError}</Text>
        </Box>
      )}

      {playerStats && !playerStatsLoading && !playerStatsError && (
        <Box mt={4}>
          <Flex justify="space-between" align="center">
            <Text color="#ffcb2f" fontWeight="bold">
              {playerStats.username}
            </Text>
            <Text color="#e0d0b0">
              Total Level: {playerStats.stats.overall?.level || 'N/A'}
            </Text>
          </Flex>
          
          <Text fontSize="xs" color="#e0d0b0" textAlign="center" mt={2}>
            Your current levels have been applied to all skill calculators
          </Text>
        </Box>
      )}
    </Box>
  );
} 