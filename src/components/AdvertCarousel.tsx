'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Flex,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  altText: string;
  title?: string;
}

interface AdvertCarouselProps {
  banners?: Banner[];
  autoScrollInterval?: number; // in milliseconds
  showControls?: boolean;
}

const DEFAULT_BANNERS: Banner[] = [
  {
    id: '1',
    imageUrl: 'https://streamable.com/e/eu28q3?',
    linkUrl: 'https://probemas.com/raffles?utm_source=osrs-calculators&utm_medium=banner&utm_campaign=homepage-carousel&utm_content=advert1',
    altText: 'Probemas Raffles - Win OSRS Items',
    title: 'Probemas Raffles Advertisement'
  },
  {
    id: '2',
    imageUrl: '/api/placeholder/728/90', // Placeholder for future ads
    linkUrl: '#',
    altText: 'Advertisement Space Available',
    title: 'Available Ad Space'
  },
  {
    id: '3',
    imageUrl: '/api/placeholder/728/90', // Placeholder for future ads
    linkUrl: '#',
    altText: 'Advertisement Space Available',
    title: 'Available Ad Space'
  }
];

export default function AdvertCarousel({ 
  banners = DEFAULT_BANNERS, 
  autoScrollInterval = 15000,
  showControls = true 
}: AdvertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused && banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, autoScrollInterval);

      return () => clearInterval(interval);
    }
  }, [isPaused, banners.length, autoScrollInterval]); // Remove currentIndex from dependencies

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (banners.length === 0) return null;

  return (
    <Container maxW="6xl" py={2}>
      <Box
        position="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Content */}
        <Flex justify="center" align="center" position="relative">
          {showControls && banners.length > 1 && (
            <IconButton
              aria-label="Previous banner"
              icon={<ChevronLeftIcon />}
              onClick={goToPrevious}
              position="absolute"
              left={-2}
              zIndex={2}
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              _hover={{ bg: "rgba(0, 0, 0, 0.8)", opacity: 1 }}
              border="none"
              borderRadius="full"
              size="sm"
              opacity={0.7}
            />
          )}

          {/* Banner Display */}
          <Box 
            width="100%" 
            maxW="728px" 
            height="90px" 
            overflow="hidden"
            borderRadius="md"
            border="1px solid rgba(255, 255, 255, 0.1)"
            bg="rgba(0, 0, 0, 0.2)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.3)"
          >
            {banners[currentIndex].imageUrl.includes('placeholder') ? (
              // Placeholder content when no real banner
              <Flex direction="column" align="center" justify="center" h="100%" color="#e0d0b0" px={4}>
                <Text fontSize="sm" fontWeight="bold" color="white" mb={1}>
                  Advertising Space Available
                </Text>
                <Text fontSize="xs" color="rgba(255, 255, 255, 0.7)" textAlign="center">
                  728 x 90 Banner • Contact: joel@probemas.com
                </Text>
              </Flex>
            ) : banners[currentIndex].imageUrl.includes('streamable.com') ? (
              <Box position="relative" width="100%" height={0} paddingBottom="12.363%">
                <iframe
                  allow="fullscreen;autoplay"
                  allowFullScreen
                  height="100%"
                  src="https://streamable.com/e/eu28q3?autoplay=1&muted=1&nocontrols=1"
                  width="100%"
                  style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    overflow: 'hidden',
                    zIndex: 1
                  }}
                  title="Probemas Raffle Banner"
                />
                <a
                  href="https://probemas.com/raffles?utm_source=osrs-calculators&utm_medium=banner&utm_campaign=homepage-carousel&utm_content=advert1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    cursor: 'pointer',
                    display: 'block'
                  }}
                  aria-label="Go to Probemas Raffles"
                />
              </Box>
            ) : banners[currentIndex].imageUrl.includes('.mp4') ? (
              <Box as="video"
                src={banners[currentIndex].imageUrl}
                width="100%"
                height="100%"
                objectFit="cover"
                autoPlay
                loop
                muted
                playsInline
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Image
                src={banners[currentIndex].imageUrl}
                alt={banners[currentIndex].altText}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="opacity 0.3s ease"
              />
            )}
          </Box>

          {showControls && banners.length > 1 && (
            <IconButton
              aria-label="Next banner"
              icon={<ChevronRightIcon />}
              onClick={goToNext}
              position="absolute"
              right={-2}
              zIndex={2}
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              _hover={{ bg: "rgba(0, 0, 0, 0.8)", opacity: 1 }}
              border="none"
              borderRadius="full"
              size="sm"
              opacity={0.7}
            />
          )}
        </Flex>

        {/* Dots indicator */}
        {banners.length > 1 && (
          <Flex justify="center" mt={2} gap={2}>
            {banners.map((_, index) => (
              <Box
                key={index}
                w={2}
                h={2}
                borderRadius="full"
                bg={index === currentIndex ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"}
                cursor="pointer"
                onClick={() => goToSlide(index)}
                transition="background-color 0.2s"
                _hover={{
                  bg: index === currentIndex ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"
                }}
              />
            ))}
          </Flex>
        )}
      </Box>
    </Container>
  );
} 