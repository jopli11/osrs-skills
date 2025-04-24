'use client';

import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

interface SectionHeadingProps extends HeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children, ...props }: SectionHeadingProps) {
  return (
    <Heading 
      color="#ffcb2f" 
      size="md"
      fontFamily="'Roboto Slab', serif"
      fontWeight="800"
      fontSize="16px"
      letterSpacing="0.5px"
      textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      {...props}
    >
      {children}
    </Heading>
  );
}

export function LargeSectionHeading({ children, ...props }: SectionHeadingProps) {
  return (
    <Heading 
      color="#ffcb2f" 
      size="lg"
      fontFamily="'Roboto Slab', serif"
      fontWeight="800"
      fontSize="18px"
      letterSpacing="0.5px"
      textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      {...props}
    >
      {children}
    </Heading>
  );
}

// Special RuneScape-style title component for main section titles
export function OsrsTitle({ children, ...props }: SectionHeadingProps) {
  return (
    <Heading 
      color="#ffcb2f"
      size="lg"
      fontSize="20px"
      fontFamily="'Roboto Slab', serif"
      fontWeight="800"
      textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      {...props}
    >
      {children}
    </Heading>
  );
} 