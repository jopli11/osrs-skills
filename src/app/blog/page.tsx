'use client';

import NextLink from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Image,
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';
import Navigation from '@/components/Navigation';
import OsrsHeading from '@/components/OsrsHeading';
import BlogFilters from '@/components/BlogFilters';
import BlogPagination from '@/components/BlogPagination';
import { track } from '@vercel/analytics';
import { type BlogPostEntry } from '@/lib/contentful';

interface AssetFields {
  file?: {
    url?: string;
  };
  description?: string;
}

interface Asset {
  fields: AssetFields;
}

interface BlogResponse {
  posts: BlogPostEntry[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export default function BlogIndexPage() {
  const [blogData, setBlogData] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      });

      const response = await fetch(`/api/blog?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogData(data);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, dateFrom, dateTo]);

  // Load posts when filters change
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearch, dateFrom, dateTo]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearch('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  if (loading && !blogData) {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navigation currentPage="Blog" />
        <Box flex="1">
          <Container maxW="6xl" py={8}>
            <Box 
              bg="rgba(42, 30, 15, 0.85)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0">Loading OSRS blog posts...</Text>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navigation currentPage="Blog" />
        <Box flex="1">
          <Container maxW="6xl" py={8}>
            <Box 
              bg="rgba(42, 30, 15, 0.85)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0">{error}</Text>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (post: BlogPostEntry) => {
    // Use SEO description if available, otherwise provide a default
    return post.fields.seoDescription || 'Read the full article to learn more about OSRS strategies and tips.';
  };

  const getFeaturedImageUrl = (post: BlogPostEntry): string | undefined => {
    const featuredImage = post.fields.featuredImage;
    if (featuredImage && typeof featuredImage === 'object' && 'fields' in featuredImage) {
      const imageFields = (featuredImage as Asset).fields;
      return imageFields?.file?.url ? `https:${imageFields.file.url}` : undefined;
    }
    return undefined;
  };

  const getFeaturedImageAlt = (post: BlogPostEntry) => {
    const featuredImage = post.fields.featuredImage;
    if (featuredImage && typeof featuredImage === 'object' && 'fields' in featuredImage) {
      const imageFields = (featuredImage as Asset).fields;
      return imageFields?.description || post.fields.title;
    }
    return post.fields.title;
  };

  const posts = blogData?.posts || [];
  const pagination = blogData?.pagination;

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navigation currentPage="Blog" />
      
      {/* Main content that grows to fill space */}
      <Box flex="1">
        {/* Hero Section */}
        <Container maxW="6xl" mt={8} mb={8}>
          <Box 
            bg="rgba(42, 30, 15, 0.85)" 
            borderRadius="md" 
            p={8} 
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
              <Flex align="center" gap={4}>
                <Box 
                  p={3} 
                  borderRadius="md" 
                  bg="rgba(0,0,0,0.5)" 
                  border="2px solid rgba(0,0,0,0.8)" 
                  boxShadow="inset 0 0 5px rgba(0,0,0,0.5), 0 1px 2px rgba(255, 203, 47, 0.2)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image 
                    src="/icons/Blog Icon.png" 
                    alt="Blog Icon" 
                    boxSize="48px"
                  />
                </Box>
                <Box>
                  <OsrsHeading fontSize="2xl" mb={2}>OSRS Blog</OsrsHeading>
                  <Text color="#e0d0b0" fontSize="lg">
                    Latest strategies, guides, and updates for Old School RuneScape
                  </Text>
                </Box>
              </Flex>
              
              <NextLink href="/" passHref>
                <Button 
                  bg="#ffcb2f" 
                  color="#211305" 
                  _hover={{ bg: '#e0a922', transform: 'translateY(1px)' }}
                  border="2px solid black" 
                  boxShadow="3px 3px 0 rgba(0,0,0,0.5)" 
                  fontWeight="bold" 
                  fontSize="md" 
                  borderRadius="sm"
                  onClick={() => track('Navigate_To_Home', { from: 'blog' })}
                >
                  ← Back to Calculators
                </Button>
              </NextLink>
            </Flex>
          </Box>
        </Container>

        {/* Filters Section */}
        <Container maxW="6xl">
          <BlogFilters
            search={search}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onSearchChange={setSearch}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onClearFilters={handleClearFilters}
          />
        </Container>

        {/* Blog Posts Grid */}
        <Container maxW="6xl" pb={8}>
          {loading ? (
            <Box 
              bg="rgba(42, 30, 15, 0.75)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0" fontSize="lg">
                Loading posts...
              </Text>
            </Box>
          ) : posts.length === 0 ? (
            <Box 
              bg="rgba(42, 30, 15, 0.75)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0" fontSize="lg">
                No blog posts found matching your criteria. Try adjusting your filters!
              </Text>
            </Box>
          ) : (
            <>
              <Box mb={6}>
                <Badge 
                  bg="#361f0e" 
                  color="#ffcb2f" 
                  px={3} 
                  py={1.5} 
                  borderRadius="sm" 
                  fontWeight="medium"
                  border="1px solid black"
                  boxShadow="1px 1px 0 rgba(0,0,0,0.2)"
                >
                  {pagination?.totalPosts || 0} Articles Found
                </Badge>
              </Box>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {posts.map((post) => (
                  <NextLink 
                    key={post.sys.id} 
                    href={`/blog/${post.fields.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      bg="rgba(42, 30, 15, 0.85)"
                      borderRadius="md"
                      overflow="hidden"
                      border="2px solid black"
                      boxShadow="3px 3px 0 rgba(0,0,0,0.4)"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '5px 5px 0 rgba(0,0,0,0.4)',
                        bg: 'rgba(42, 30, 15, 0.95)'
                      }}
                      onClick={() => track('Blog_Post_Click', { 
                        slug: post.fields.slug,
                        title: post.fields.title 
                      })}
                    >
                      {/* Featured Image */}
                      {getFeaturedImageUrl(post) && (
                        <Box position="relative" height="200px" overflow="hidden">
                          <Image
                            src={getFeaturedImageUrl(post)}
                            alt={getFeaturedImageAlt(post)}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            loading="lazy"
                          />
                          {/* Overlay to ensure readability */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)"
                          />
                        </Box>
                      )}
                      
                      <VStack align="stretch" p={6} spacing={3}>
                        <Heading 
                          size="md" 
                          color="white" 
                          fontFamily="var(--font-roboto-slab), serif"
                          textShadow="2px 2px 3px rgba(0,0,0,0.8)"
                          noOfLines={2}
                        >
                          {post.fields.title}
                        </Heading>
                        
                        <Text 
                          color="#e0d0b0" 
                          fontSize="sm" 
                          noOfLines={3}
                          lineHeight="1.5"
                        >
                          {getExcerpt(post)}
                        </Text>
                        
                        <Stack direction="row" justify="space-between" align="center" pt={2}>
                          <Text color="#ffcb2f" fontSize="xs" fontWeight="medium">
                            {formatDate(post.fields.publicationDate)}
                          </Text>
                          
                          {post.fields.author && (
                            <Text color="#e0d0b0" fontSize="xs">
                              By {post.fields.author}
                            </Text>
                          )}
                        </Stack>
                      </VStack>
                    </Box>
                  </NextLink>
                ))}
              </SimpleGrid>

              {/* Pagination */}
              {pagination && (
                <BlogPagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalPosts={pagination.totalPosts}
                  limit={pagination.limit}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
} 