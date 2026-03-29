'use client';

import { track } from '@vercel/analytics';
import { trackEvent } from '@/lib/analytics';
import { useState, useCallback, useEffect } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  
  // Get state and methods from store
  const {
    playerStats,
    playerStatsLoading,
    playerStatsError,
    lookupPlayerStats, // Get lookup function directly
    clearPlayerStats, // Get clear function directly
    setNotification // Get notification function directly
  } = useCalculatorStore();
  
  // Direct access to store methods - Not needed if we destructure them above
  // const store = useCalculatorStore;
  
  // Simple notification function - Use setNotification from store directly
  const notify = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({
      message,
      type,
      timestamp: Date.now()
    });
  }, [setNotification]); // Depend on setNotification
  
  // Clear player stats directly - Use clearPlayerStats from store directly
  const clearStats = useCallback(() => {
      clearPlayerStats(); // Call the function from the store
  }, [clearPlayerStats]); // Depend on clearPlayerStats

  // Debounce the lookup to prevent excessive API calls
  const debouncedLookup = useCallback((username: string) => {
    setIsDebouncing(true);
    
    // Clear existing player data
    clearStats();
    
    const timer = setTimeout(async () => {
      try {
        // Call lookupPlayerStats directly from the destructured store methods
        await lookupPlayerStats(username);
      } catch (error) {
        console.error('Error in debouncedLookup:', error);
        // Set error state using the store's setter (if available or set directly)
        useCalculatorStore.setState({
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
  }, [clearStats, lookupPlayerStats]); // Update dependencies

  // Set mounted state after initial render on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setIsUsernameInvalid(true);
      return;
    }
    
    setIsUsernameInvalid(false);
    track('PlayerLookup_Initiated', { username });
    trackEvent('player_lookup', { username });
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

      {/* Conditionally render dynamic content only when mounted */}
      {!isMounted ? (
        <Flex justify="center" my={4}>
          <Spinner color="#ffcb2f" size="sm" />
        </Flex>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
} 