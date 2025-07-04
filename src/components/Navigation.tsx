'use client';

import NextLink from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { track } from '@vercel/analytics';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const navigationItems = [
    { href: "/#skills", label: "Skills", trackEvent: "Navigate_To_Skills" },
    { href: "/combat-calculator", label: "Combat Calc", trackEvent: "Navigate_To_CombatCalc" },
    { href: "/max-hit-calculator", label: "Max Hit Calc", trackEvent: "Navigate_To_MaxHitCalc" },
    { href: "/misc-calculators", label: "Misc Calcs", trackEvent: "Navigate_To_MiscCalcs" },
    { href: "/blog", label: "Blog", trackEvent: "Navigate_To_Blog" }
  ];

  const getPageTitle = () => {
    if (currentPage) {
      return ` | ${currentPage}`;
    }
    return '';
  };

  return (
    <>
      {/* Header/Navigation Bar */}
      <Box 
        borderBottom="2px solid" 
        borderColor="black" 
        bg="#2a1e0f"
        boxShadow="0 4px 6px rgba(0,0,0,0.6)"
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255, 203, 47, 0.2)'
        }}
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <NextLink href="/" passHref legacyBehavior>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                <Heading 
                  as="h1" 
                  size="lg" 
                  fontWeight="bold" 
                  fontFamily="var(--font-roboto-slab), serif"
                  textShadow="2px 2px 3px rgba(0,0,0,0.8)"
                >
                  <Box as="span" color="#ffcb2f">OSRS</Box>
                  <Box as="span" color="white">Calculators</Box>
                  {currentPage && (
                    <Box as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">
                      {getPageTitle()}
                    </Box>
                  )}
                </Heading>
              </ChakraLink>
            </NextLink>
            
            {hasMounted && (
              <>
                {/* Desktop Navigation */}
                <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                  {navigationItems.map((item) => (
                    <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                      <ChakraLink
                        color="#e0d0b0"
                        fontSize="md"
                        fontWeight="medium"
                        _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                        onClick={() => track(item.trackEvent, { from: currentPage || '/' })}
                      >
                        {item.label}
                      </ChakraLink>
                    </NextLink>
                  ))}
                </HStack>

                {/* Mobile Navigation - Burger Icon */}
                <IconButton
                  aria-label="Open menu"
                  icon={<HamburgerIcon />}
                  display={{ base: 'flex', md: 'none' }}
                  onClick={onOpen}
                  bg="#ffcb2f"
                  color="#211305"
                  _hover={{ bg: '#e0a922' }}
                  size="md"
                />
              </>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer Menu */}
      {hasMounted && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="#2a1e0f" color="#e0d0b0">
            <DrawerCloseButton />
            <DrawerHeader 
              borderBottomWidth="1px" 
              borderColor="rgba(255, 203, 47, 0.2)"
              fontFamily="var(--font-roboto-slab), serif"
              color="#ffcb2f"
            >
              Navigation
            </DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" mt={4}>
                {navigationItems.map((item) => (
                  <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                    <ChakraLink 
                      fontSize="lg" 
                      fontWeight="medium" 
                      _hover={{ color: '#ffcb2f', textDecoration: 'none' }}
                      py={2} 
                      display="block"
                      onClick={() => { 
                        onClose(); 
                        track(item.trackEvent, { from: 'mobile_menu' }); 
                      }}
                    >
                      {item.label}
                    </ChakraLink>
                  </NextLink>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
} 