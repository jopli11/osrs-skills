'use client';

import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface OsrsHeadingProps extends BoxProps {
  children: string;
  fontSize?: string | number;
}

export default function OsrsHeading({ children, fontSize = "20px", ...props }: OsrsHeadingProps) {
  return (
    <Box 
      as="h2" 
      fontFamily="'Roboto Slab', serif"
      fontWeight="900"
      fontSize={{ base: typeof fontSize === 'number' ? fontSize * 0.8 : fontSize, md: fontSize }}
      lineHeight="1.2"
      color="#ffcb2f"
      textShadow="1px 1px 2px rgba(0,0,0,0.5)"
      {...props}
    >
      {children}
    </Box>
  );
} 