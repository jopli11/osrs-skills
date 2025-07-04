'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import { track } from '@vercel/analytics';

export default function HighAlchCalculatorPage() {
  const [itemCost, setItemCost] = useState<number>(1000);
  const [alchValue, setAlchValue] = useState<number>(1200);
  const [natureRuneCost, setNatureRuneCost] = useState<number>(180);
  
  // Calculated values
  const [profitPerAlch, setProfitPerAlch] = useState<number>(0);
  const [profitPerHour, setProfitPerHour] = useState<number>(0);
  const [isProfit, setIsProfit] = useState<boolean>(true);

  // High alch is roughly 1200 casts per hour at max efficiency
  const ALCHS_PER_HOUR = 1200;

  // Calculate profit whenever inputs change
  useEffect(() => {
    // Profit = Alch Value - (Item Cost + Nature Rune Cost)
    const totalCost = itemCost + natureRuneCost;
    const profit = alchValue - totalCost;
    const hourlyProfit = profit * ALCHS_PER_HOUR;

    setProfitPerAlch(profit);
    setProfitPerHour(hourlyProfit);
    setIsProfit(profit >= 0);
  }, [itemCost, alchValue, natureRuneCost]);

  const handleItemCostChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 0 : Math.max(0, valueAsNumber);
    setItemCost(cleanValue);
    track('HighAlchCalc_ItemCostChanged', { cost: cleanValue });
  };

  const handleAlchValueChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 0 : Math.max(0, valueAsNumber);
    setAlchValue(cleanValue);
    track('HighAlchCalc_AlchValueChanged', { value: cleanValue });
  };

  const handleNatureRuneCostChange = (valueAsString: string, valueAsNumber: number) => {
    const cleanValue = isNaN(valueAsNumber) ? 0 : Math.max(0, valueAsNumber);
    setNatureRuneCost(cleanValue);
    track('HighAlchCalc_NatureRuneCostChanged', { cost: cleanValue });
  };

  return (
    <Box>
      {/* Header */}
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
          <Flex justify="center" align="center">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Heading 
                as="h1" 
                size="lg" 
                fontWeight="bold" 
                fontFamily="var(--font-roboto-slab), serif"
                textShadow="2px 2px 0px #000"
              >
                <Text as="span" color="#ffcb2f">OSRS</Text>
                <Text as="span" color="white">Calculators</Text>
                <Text as="span" color="#e0d0b0" ml={2} fontSize="sm" fontWeight="normal">| High Alchemy Calculator</Text> 
              </Heading>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxW="6xl" mt={8} mb={20}>
        {/* Hero Banner */}
        <Box 
          bg="rgba(42, 30, 15, 0.85)" 
          borderRadius="md" 
          p={6} 
          mb={8} 
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
          <Flex align="center" justify="space-between" flexDir={{ base: "column", md: "row" }} gap={4}>
            <VStack spacing={4} flex="1">
              <Flex align="center" gap={4}>
                <Box position="relative" width="48px" height="48px">
                  <Image
                    src="/icons/calculators/highalch icon.png"
                    alt="High Alchemy Calculator"
                    width={48}
                    height={48}
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))'
                    }}
                  />
                </Box>
                <Heading 
                  size="xl" 
                  textAlign="center" 
                  color="white"
                  fontFamily="var(--font-roboto-slab), serif"
                  textShadow="2px 2px 0px #000"
                >
                  High Alchemy Calculator
                </Heading>
              </Flex>
              <Text 
                textAlign="center" 
                color="#e0d0b0" 
                fontSize="lg"
                maxW="2xl"
              >
                Calculate profit/loss from high alchemy spells. Find the best items to alch for Magic XP and GP.
              </Text>
            </VStack>
            <Link href="/misc-calculators" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => track('Navigate_Back_To_MiscCalcs', { from: 'high-alch-calculator' })}
                bg="#ffcb2f"
                color="#211305"
                _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
                border="2px solid black"
                boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
                fontWeight="bold"
                fontSize="md"
                borderRadius="sm"
              >
                ← Back to Misc Calcs
              </Button>
            </Link>
          </Flex>
        </Box>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Input Section */}
          <Box flex="1">
            <Flex align="center" mb={6}>
              <Badge 
                bg="#361f0e" 
                color="#ffcb2f" 
                px={3} 
                py={1.5} 
                borderRadius="sm" 
                mr={3}
                fontWeight="medium"
                border="1px solid black"
                boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
              >
                Settings
              </Badge>
              <Heading size="md" color="white" fontFamily="var(--font-roboto-slab), serif">
                Alchemy Settings
              </Heading>
            </Flex>

            <Box
              bg="rgba(42, 30, 15, 0.85)"
              border="2px solid black"
              borderRadius="md"
              p={6}
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
              <VStack spacing={6}>
                {/* Item Cost */}
                <FormControl>
                  <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                    Item Cost (GP)
                  </FormLabel>
                  <NumberInput
                    value={itemCost}
                    onChange={handleItemCostChange}
                    min={0}
                    size="sm"
                  >
                    <NumberInputField
                      bg="#1a140a"
                      border="2px solid"
                      borderColor="#3b2914"
                      color="#e0d0b0"
                      _hover={{ borderColor: "#ffcb2f" }}
                      _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="#b0a080" mt={1}>
                    GE buy price of the item
                  </Text>
                </FormControl>

                {/* High Alch Value */}
                <FormControl>
                  <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                    High Alch Value (GP)
                  </FormLabel>
                  <NumberInput
                    value={alchValue}
                    onChange={handleAlchValueChange}
                    min={0}
                    size="sm"
                  >
                    <NumberInputField
                      bg="#1a140a"
                      border="2px solid"
                      borderColor="#3b2914"
                      color="#e0d0b0"
                      _hover={{ borderColor: "#ffcb2f" }}
                      _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="#b0a080" mt={1}>
                    GP received from high alching the item
                  </Text>
                </FormControl>

                {/* Nature Rune Cost */}
                <FormControl>
                  <FormLabel color="#e0d0b0" fontSize="sm" fontWeight="bold">
                    Nature Rune Cost (GP)
                  </FormLabel>
                  <NumberInput
                    value={natureRuneCost}
                    onChange={handleNatureRuneCostChange}
                    min={0}
                    size="sm"
                  >
                    <NumberInputField
                      bg="#1a140a"
                      border="2px solid"
                      borderColor="#3b2914"
                      color="#e0d0b0"
                      _hover={{ borderColor: "#ffcb2f" }}
                      _focus={{ borderColor: "#ffcb2f", boxShadow: "0 0 0 1px #ffcb2f" }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                      <NumberDecrementStepper color="#e0d0b0" _hover={{ color: "#ffcb2f" }} />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="#b0a080" mt={1}>
                    Current GE price of nature runes
                  </Text>
                </FormControl>

                {/* Info Alert */}
                <Alert status="info" bg="rgba(54, 32, 16, 0.9)" border="1px solid" borderColor="#3b2914">
                  <AlertIcon color="#ffcb2f" />
                  <Text color="#e0d0b0" fontSize="sm">
                    High Alchemy requires level 55 Magic, 1 Nature rune, and 5 Fire runes per cast.
                    Fire runes are usually free with a fire staff.
                  </Text>
                </Alert>
              </VStack>
            </Box>
          </Box>

          {/* Results Section */}
          <Box flex="1">
            <Flex align="center" mb={6}>
              <Badge 
                bg="#361f0e" 
                color="#ffcb2f" 
                px={3} 
                py={1.5} 
                borderRadius="sm" 
                mr={3}
                fontWeight="medium"
                border="1px solid black"
                boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
              >
                Results
              </Badge>
              <Heading size="md" color="white" fontFamily="var(--font-roboto-slab), serif">
                Profit Calculation
              </Heading>
            </Flex>

            <VStack spacing={6}>
              {/* Profit per Alch */}
              <Box
                bg="rgba(42, 30, 15, 0.85)"
                border="2px solid black"
                borderRadius="md"
                p={6}
                w="100%"
                textAlign="center"
                boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
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
                <Stat>
                  <StatLabel color="#e0d0b0" fontSize="lg">Profit per Alch</StatLabel>
                  <StatNumber 
                    color={isProfit ? "#4ade80" : "#ef4444"} 
                    fontSize="4xl" 
                    fontWeight="bold"
                    textShadow="2px 2px 0px #000"
                  >
                    {profitPerAlch >= 0 ? '+' : ''}{profitPerAlch.toLocaleString()} GP
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    {isProfit ? '✅ Profitable!' : '❌ Loss per cast'}
                  </StatHelpText>
                </Stat>
              </Box>

              {/* Additional Stats */}
              <SimpleGrid columns={1} gap={4} w="100%">
                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">Profit per Hour</StatLabel>
                  <StatNumber color={isProfit ? "#4ade80" : "#ef4444"}>
                    {profitPerHour >= 0 ? '+' : ''}{profitPerHour.toLocaleString()} GP
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    @ {ALCHS_PER_HOUR} alchs/hour
                  </StatHelpText>
                </Stat>

                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">XP per Hour</StatLabel>
                  <StatNumber color="white">78,000 XP</StatNumber>
                  <StatHelpText color="#b0a080">
                    65 XP per cast × 1,200 casts
                  </StatHelpText>
                </Stat>

                <Stat
                  bg="rgba(53, 40, 30, 0.9)"
                  border="2px solid black"
                  borderRadius="md"
                  p={4}
                  boxShadow="2px 2px 0 rgba(0,0,0,0.3)"
                >
                  <StatLabel color="#e0d0b0">Break Even Price</StatLabel>
                  <StatNumber color="white">
                    {(alchValue - natureRuneCost).toLocaleString()} GP
                  </StatNumber>
                  <StatHelpText color="#b0a080">
                    Max item cost for profit
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
            </VStack>
          </Box>
        </Flex>

        {/* Information Section */}
        <Box mt={12}>
          <Heading size="md" color="white" mb={4} fontFamily="var(--font-roboto-slab), serif">
            High Alchemy Guide
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Box
              bg="rgba(42, 30, 15, 0.85)"
              border="2px solid black"
              borderRadius="md"
              p={6}
              boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
            >
              <Heading size="sm" color="#ffcb2f" mb={3}>Best Alching Items</Heading>
              <VStack align="start" spacing={2} color="#b0a080">
                <Text>• <strong>Yew Longbows:</strong> Usually profitable, good for AFK</Text>
                <Text>• <strong>Magic Longbows:</strong> Higher volume, check margins</Text>
                <Text>• <strong>Green d&apos;hide Bodies:</strong> Popular choice</Text>
                <Text>• <strong>Rune Items:</strong> Stable profits but slower</Text>
              </VStack>
            </Box>

            <Box
              bg="rgba(42, 30, 15, 0.85)"
              border="2px solid black"
              borderRadius="md"
              p={6}
              boxShadow="3px 3px 0 rgba(0,0,0,0.5)"
            >
              <Heading size="sm" color="#ffcb2f" mb={3}>Tips & Strategies</Heading>
              <VStack align="start" spacing={2} color="#b0a080">
                <Text>• Always check current GE prices before buying</Text>
                <Text>• Use a fire staff to save on fire runes</Text>
                <Text>• Consider buying limits when planning large volumes</Text>
                <Text>• Nature rune prices fluctuate - track them closely</Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
} 