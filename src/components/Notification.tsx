'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  CloseButton,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useCalculatorStore } from '@/lib/store';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

export default function Notification() {
  const { notification, clearNotification } = useCalculatorStore();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => clearNotification(), 300); // Wait for animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);
  
  if (!notification) return null;
  
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'rgba(21, 87, 36, 0.9)';
      case 'error':
        return 'rgba(87, 21, 21, 0.9)';
      default:
        return 'rgba(42, 54, 75, 0.9)';
    }
  };
  
  return (
    <Box
      position="fixed"
      top="20px"
      right="20px"
      zIndex="toast"
      animation={isVisible ? `${fadeIn} 0.3s ease-out` : `${fadeOut} 0.3s ease-out`}
    >
      <Box
        bg={getBackgroundColor()}
        color="white"
        px={4}
        py={3}
        borderRadius="md"
        boxShadow="lg"
        maxW="400px"
        border="1px solid rgba(255,255,255,0.1)"
      >
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">{notification.message}</Text>
          <CloseButton 
            size="sm" 
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => clearNotification(), 300);
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
} 