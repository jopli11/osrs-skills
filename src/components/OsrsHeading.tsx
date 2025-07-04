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
      fontFamily="var(--font-roboto-slab), serif"
      fontWeight="900"
      fontSize={{ base: typeof fontSize === 'number' ? fontSize * 0.8 : fontSize, md: fontSize }}
      lineHeight="1.2"
      color="#ffcb2f"
      textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      {...props}
    >
      {children}
    </Box>
  );
} 