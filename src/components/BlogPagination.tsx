'use client';

import React from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  IconButton,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  limit,
  onPageChange
}: BlogPaginationProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (totalPages <= 1) return null;

  const startPost = (currentPage - 1) * limit + 1;
  const endPost = Math.min(currentPage * limit, totalPosts);

  // Generate page numbers to show
  const getVisiblePages = () => {
    const maxVisible = isMobile ? 3 : 5;
    const pages: number[] = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Box 
      bg="rgba(42, 30, 15, 0.85)" 
      borderRadius="md" 
      p={6} 
      mt={6}
      border="2px solid black"
      boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
      backdropFilter="blur(4px)"
    >
      <Flex
        direction={isMobile ? 'column' : 'row'}
        justify="space-between"
        align="center"
        gap={4}
      >
        {/* Results info */}
        <Text color="#e0d0b0" fontSize="sm">
          Showing {startPost}-{endPost} of {totalPosts} posts
        </Text>

        {/* Pagination controls */}
        <HStack spacing={1}>
          {/* Previous button */}
          <IconButton
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            size="sm"
            bg={currentPage === 1 ? "rgba(0,0,0,0.3)" : "#ffcb2f"}
            color={currentPage === 1 ? "#666" : "#211305"}
            _hover={{
              bg: currentPage === 1 ? "rgba(0,0,0,0.3)" : "#e0a922",
              transform: currentPage === 1 ? "none" : "translateY(1px)"
            }}
            border="1px solid rgba(0,0,0,0.3)"
            borderRadius="sm"
            _disabled={{
              opacity: 0.5,
              cursor: "not-allowed"
            }}
          />

          {/* First page if not visible */}
          {visiblePages[0] > 1 && (
            <>
              <Button
                size="sm"
                onClick={() => onPageChange(1)}
                bg="rgba(0,0,0,0.3)"
                color="#e0d0b0"
                _hover={{ bg: "rgba(255, 203, 47, 0.2)" }}
                border="1px solid rgba(255, 203, 47, 0.3)"
                borderRadius="sm"
              >
                1
              </Button>
              {visiblePages[0] > 2 && (
                <Text color="#e0d0b0" px={2}>...</Text>
              )}
            </>
          )}

          {/* Page numbers */}
          {visiblePages.map((page) => (
            <Button
              key={page}
              size="sm"
              onClick={() => onPageChange(page)}
              bg={page === currentPage ? "#ffcb2f" : "rgba(0,0,0,0.3)"}
              color={page === currentPage ? "#211305" : "#e0d0b0"}
              _hover={{
                bg: page === currentPage ? "#e0a922" : "rgba(255, 203, 47, 0.2)",
                transform: "translateY(1px)"
              }}
              border="1px solid rgba(255, 203, 47, 0.3)"
              borderRadius="sm"
              fontWeight={page === currentPage ? "bold" : "normal"}
            >
              {page}
            </Button>
          ))}

          {/* Last page if not visible */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <Text color="#e0d0b0" px={2}>...</Text>
              )}
              <Button
                size="sm"
                onClick={() => onPageChange(totalPages)}
                bg="rgba(0,0,0,0.3)"
                color="#e0d0b0"
                _hover={{ bg: "rgba(255, 203, 47, 0.2)" }}
                border="1px solid rgba(255, 203, 47, 0.3)"
                borderRadius="sm"
              >
                {totalPages}
              </Button>
            </>
          )}

          {/* Next button */}
          <IconButton
            aria-label="Next page"
            icon={<ChevronRightIcon />}
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            size="sm"
            bg={currentPage === totalPages ? "rgba(0,0,0,0.3)" : "#ffcb2f"}
            color={currentPage === totalPages ? "#666" : "#211305"}
            _hover={{
              bg: currentPage === totalPages ? "rgba(0,0,0,0.3)" : "#e0a922",
              transform: currentPage === totalPages ? "none" : "translateY(1px)"
            }}
            border="1px solid rgba(0,0,0,0.3)"
            borderRadius="sm"
            _disabled={{
              opacity: 0.5,
              cursor: "not-allowed"
            }}
          />
        </HStack>
      </Flex>
    </Box>
  );
} 