'use client';

import React from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

interface BlogFiltersProps {
  search: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function BlogFilters({
  search,
  dateFrom,
  dateTo,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters
}: BlogFiltersProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const hasActiveFilters = search || dateFrom || dateTo;

  return (
    <Box 
      bg="rgba(42, 30, 15, 0.85)" 
      borderRadius="md" 
      p={4} 
      mb={6}
      border="2px solid black"
      boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
      backdropFilter="blur(4px)"
    >
      <VStack spacing={3} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Text color="#ffcb2f" fontSize="md" fontWeight="bold">
            🔍 Search & Filter
          </Text>
          {hasActiveFilters && (
            <Button
              size="xs"
              variant="ghost"
              color="#e0d0b0"
              leftIcon={<CloseIcon boxSize={2} />}
              onClick={onClearFilters}
              _hover={{ bg: 'rgba(255, 203, 47, 0.1)' }}
              fontSize="xs"
            >
              Clear
            </Button>
          )}
        </Flex>

        {/* Search and Date Filters in one row */}
        <Flex direction={isMobile ? 'column' : 'row'} gap={3} align="end">
          {/* Search Input */}
          <FormControl flex="2">
            <FormLabel color="#e0d0b0" fontSize="xs" mb={1}>Search Posts</FormLabel>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="#e0d0b0" boxSize={3} />
              </InputLeftElement>
              <Input
                placeholder="Search titles and descriptions..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                bg="rgba(0,0,0,0.3)"
                border="1px solid rgba(255, 203, 47, 0.3)"
                color="white"
                _placeholder={{ color: '#e0d0b0', opacity: 0.7 }}
                _focus={{
                  borderColor: '#ffcb2f',
                  boxShadow: '0 0 0 1px #ffcb2f'
                }}
              />
            </InputGroup>
          </FormControl>

          {/* Date Range */}
          <FormControl flex="1">
            <FormLabel color="#e0d0b0" fontSize="xs" mb={1}>From Date</FormLabel>
            <Input
              type="date"
              size="sm"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              bg="rgba(0,0,0,0.3)"
              border="1px solid rgba(255, 203, 47, 0.3)"
              color="white"
              _focus={{
                borderColor: '#ffcb2f',
                boxShadow: '0 0 0 1px #ffcb2f'
              }}
            />
          </FormControl>

          <FormControl flex="1">
            <FormLabel color="#e0d0b0" fontSize="xs" mb={1}>To Date</FormLabel>
            <Input
              type="date"
              size="sm"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              bg="rgba(0,0,0,0.3)"
              border="1px solid rgba(255, 203, 47, 0.3)"
              color="white"
              _focus={{
                borderColor: '#ffcb2f',
                boxShadow: '0 0 0 1px #ffcb2f'
              }}
            />
          </FormControl>
        </Flex>
      </VStack>
    </Box>
  );
} 