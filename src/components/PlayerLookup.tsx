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
  
  // Instead of destructuring functions that might cause issues, get state only
  const {
    playerStats,
    playerStatsLoading,
    playerStatsError
  } = useCalculatorStore();
  
  // Direct access to store methods
  const store = useCalculatorStore;
  
  // Simple notification function
  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    try {
      store.setState({
        notification: {
          message,
          type,
          timestamp: Date.now()
        }
      });
    } catch (err) {
      console.error('Failed to set notification:', err);
    }
  };
  
  // Clear player stats directly - wrapped in useCallback
  const clearStats = useCallback(() => {
    try {
      store.setState({
        playerStats: null,
        playerStatsLoading: false,
        playerStatsError: null,
        notification: null
      });
    } catch (err) {
      console.error('Failed to clear player stats:', err);
    }
  }, [store]); // Added store as dependency

  // Debounce the lookup to prevent excessive API calls
  const debouncedLookup = useCallback((username: string) => {
    setIsDebouncing(true);
    
    // Clear existing player data to prevent persistence issues
    clearStats();
    
    const timer = setTimeout(async () => {
      try {
        // Add a try-catch block around the API call
        await store.getState().lookupPlayerStats(username);
      } catch (error) {
        console.error('Error in debouncedLookup:', error);
        // Set a more user-friendly error message
        store.setState({
          playerStatsError: "The OSRS Hiscores server might be busy. Please try again in a few moments."
        });
      } finally {
        setIsDebouncing(false);
      }
    }, 500); // 500ms debounce
    
    return () => {
      clearTimeout(timer);
      setIsDebouncing(false);
    };
  }, [clearStats, store]);

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
          
          <Box mt={2} pt={2} borderTop="1px solid rgba(255,255,255,0.1)">
            <Text fontSize="xs" color="#e0d0b0">
              Note: The OSRS Hiscores API can be unreliable at times. If you&apos;re sure the username 
              is correct, please try again in a few minutes.
            </Text>
          </Box>
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
          
          <Flex justify="space-between" mt={3}>
            <Button
              size="xs"
              bg="#361f0e"
              color="#ffcb2f"
              borderWidth="1px"
              borderColor="black"
              _hover={{ bg: '#4a2a15' }}
              onClick={() => {
                clearStats();
                notify("Stats cleared. Default values restored.", "info");
              }}
            >
              Clear
            </Button>
            
            <Text fontSize="xs" color="#e0d0b0">
              Stats will be saved across all pages
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
} 