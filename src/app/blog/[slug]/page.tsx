'use client';

import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import Navigation from '@/components/Navigation';
import { track } from '@vercel/analytics';
import { type BlogPostEntry } from '@/lib/contentful';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

interface AssetFields {
  file?: {
    url?: string;
    contentType?: string;
  };
  description?: string;
  title?: string;
}

interface Asset {
  fields: AssetFields;
}

// Rich text rendering options with OSRS theming
const richTextRenderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <Box as="strong" fontWeight="bold" color="#ffcb2f">
        {text}
      </Box>
    ),
    [MARKS.ITALIC]: (text) => (
      <Box as="em" fontStyle="italic" color="#e0d0b0">
        {text}
      </Box>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Text mb={4} color="#e0d0b0" lineHeight="1.7" fontSize="md">
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading 
        as="h1" 
        size="xl" 
        mb={6} 
        mt={8}
        color="#ffcb2f" 
        fontFamily="var(--font-roboto-slab), serif"
        textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      >
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading 
        as="h2" 
        size="lg" 
        mb={4} 
        mt={6}
        color="#ffcb2f" 
        fontFamily="var(--font-roboto-slab), serif"
        textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      >
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading 
        as="h3" 
        size="md" 
        mb={3} 
        mt={5}
        color="#ffcb2f" 
        fontFamily="var(--font-roboto-slab), serif"
        textShadow="2px 2px 3px rgba(0,0,0,0.8)"
      >
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <Box as="ul" pl={6} mb={4} color="#e0d0b0">
        {children}
      </Box>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <Box as="ol" pl={6} mb={4} color="#e0d0b0">
        {children}
      </Box>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <Text as="li" mb={2} color="#e0d0b0">
        {children}
      </Text>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <Box
        borderLeft="4px solid #ffcb2f"
        pl={4}
        py={2}
        my={4}
        bg="rgba(255, 203, 47, 0.1)"
        borderRadius="md"
        fontStyle="italic"
      >
        {children}
      </Box>
    ),
    // Table rendering with OSRS theming
    [BLOCKS.TABLE]: (node, children) => (
      <Box overflowX="auto" my={6}>
        <Box 
          as="table" 
          width="100%" 
          bg="rgba(42, 30, 15, 0.9)"
          border="2px solid black"
          borderRadius="md"
          boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
          backdropFilter="blur(4px)"
        >
          {children}
        </Box>
      </Box>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => {
      // Check if this row contains header cells
      const hasHeaderCells = node.content?.some(cell => cell.nodeType === 'table-header-cell');
      
      if (hasHeaderCells) {
        return (
          <Box as="thead">
            <Box as="tr" bg="rgba(0,0,0,0.4)" borderBottom="2px solid black">
              {children}
            </Box>
          </Box>
        );
      } else {
        return (
          <Box as="tr" borderBottom="1px solid rgba(255, 203, 47, 0.2)" _hover={{ bg: "rgba(255, 203, 47, 0.05)" }}>
            {children}
          </Box>
        );
      }
    },
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
      <Box 
        as="th" 
        px={4} 
        py={3} 
        textAlign="left" 
        color="#ffcb2f" 
        fontWeight="bold" 
        fontSize="sm"
        fontFamily="var(--font-roboto-slab), serif"
        textShadow="1px 1px 2px rgba(0,0,0,0.8)"
        borderRight="1px solid rgba(255, 203, 47, 0.3)"
        _last={{ borderRight: "none" }}
      >
        {children}
      </Box>
    ),
    [BLOCKS.TABLE_CELL]: (node, children) => (
      <Box 
        as="td" 
        px={4} 
        py={3} 
        color="#e0d0b0" 
        fontSize="sm"
        borderRight="1px solid rgba(255, 203, 47, 0.2)"
        _last={{ borderRight: "none" }}
        lineHeight="1.5"
      >
        {children}
      </Box>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target;
      if (!asset || !asset.fields || !asset.fields.file) {
        return null;
      }
      
      const assetFields = asset.fields as AssetFields;
      const fileDetails = assetFields.file;
      
      if (fileDetails?.contentType?.includes('image')) {
        return (
          <Box my={6} textAlign="center">
            <Image
              src={`https:${fileDetails.url}`}
              alt={assetFields.description || assetFields.title || ''}
              maxW="100%"
              height="auto"
              borderRadius="md"
              border="2px solid black"
              boxShadow="3px 3px 0 rgba(0,0,0,0.4)"
              mx="auto"
            />
            {assetFields.description && (
              <Text fontSize="sm" color="#999" mt={2} fontStyle="italic">
                {assetFields.description}
              </Text>
            )}
          </Box>
        );
      }
      return null;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;
      return (
        <Box
          as="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          color="#ffcb2f"
          textDecoration="underline"
          _hover={{ color: '#e0a922' }}
        >
          {children}
        </Box>
      );
    },
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<BlogPostEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found');
          } else {
            throw new Error('Failed to fetch blog post');
          }
          return;
        }
        const data = await response.json();
        setPost(data.post);
        if (data.post) {
          track('Blog_Post_View', { 
            slug: data.post.fields.slug,
            title: data.post.fields.title 
          });
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navigation currentPage="Blog" />
        <Box flex="1">
          <Container maxW="4xl" py={8}>
            <Box 
              bg="rgba(42, 30, 15, 0.85)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0">Loading blog post...</Text>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navigation currentPage="Blog" />
        <Box flex="1">
          <Container maxW="4xl" py={8}>
            <Box 
              bg="rgba(42, 30, 15, 0.85)" 
              borderRadius="md" 
              p={8} 
              textAlign="center"
              border="2px solid black"
              boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            >
              <Text color="#e0d0b0" fontSize="lg" mb={4}>
                {error || 'Blog post not found'}
              </Text>
              <NextLink href="/blog" passHref>
                <Button 
                  bg="#ffcb2f" 
                  color="#211305" 
                  _hover={{ bg: '#e0a922' }}
                  border="2px solid black" 
                  boxShadow="3px 3px 0 rgba(0,0,0,0.5)" 
                  fontWeight="bold"
                >
                  ← Back to Blog
                </Button>
              </NextLink>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  const { title, publicationDate, body, author, featuredImage } = post.fields;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFeaturedImageUrl = (): string | undefined => {
    if (featuredImage && typeof featuredImage === 'object' && 'fields' in featuredImage) {
      const imageFields = (featuredImage as Asset).fields;
      return imageFields?.file?.url ? `https:${imageFields.file.url}` : undefined;
    }
    return undefined;
  };

  const getFeaturedImageAlt = () => {
    if (featuredImage && typeof featuredImage === 'object' && 'fields' in featuredImage) {
      const imageFields = (featuredImage as Asset).fields;
      return imageFields?.description || title;
    }
    return title;
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navigation currentPage="Blog" />
      
      {/* Main content that grows to fill space */}
      <Box flex="1">
        {/* Breadcrumb Navigation */}
        <Container maxW="4xl" pt={6}>
          <Breadcrumb 
            spacing="8px" 
            color="#e0d0b0"
            fontSize="sm"
            fontWeight="medium"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/" color="#e0d0b0" _hover={{ color: '#ffcb2f' }}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/blog" color="#e0d0b0" _hover={{ color: '#ffcb2f' }}>
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text color="#ffcb2f" noOfLines={1}>
                {title}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>

        {/* Article Header */}
        <Container maxW="4xl" py={8}>
          <Box 
            bg="rgba(42, 30, 15, 0.85)" 
            borderRadius="md" 
            overflow="hidden"
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
          >
            {/* Featured Image */}
            {getFeaturedImageUrl() && (
              <Box position="relative" height={{ base: "250px", md: "350px" }} overflow="hidden">
                <Image
                  src={getFeaturedImageUrl()}
                  alt={getFeaturedImageAlt()}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="linear-gradient(180deg, transparent 0%, rgba(42, 30, 15, 0.8) 100%)"
                />
              </Box>
            )}
            
            {/* Article Meta */}
            <VStack align="stretch" p={8} spacing={4}>
              <Heading 
                as="h1" 
                size="xl" 
                color="white" 
                fontFamily="'Roboto Slab', serif"
                textShadow="2px 2px 3px rgba(0,0,0,0.8)"
                lineHeight="1.2"
              >
                {title}
              </Heading>
              
              <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }}>
                <VStack align="start" spacing={2}>
                  {author && (
                    <Text color="#ffcb2f" fontSize="sm" fontWeight="medium">
                      By {author}
                    </Text>
                  )}
                  <Text color="#e0d0b0" fontSize="sm">
                    Published on {formatDate(publicationDate)}
                  </Text>
                </VStack>
                
                <Stack direction="row" spacing={3}>
                  <NextLink href="/blog" passHref>
                    <Button 
                      size="sm"
                      bg="rgba(255, 203, 47, 0.1)" 
                      color="#ffcb2f" 
                      border="1px solid #ffcb2f"
                      _hover={{ bg: 'rgba(255, 203, 47, 0.2)' }}
                      fontWeight="medium"
                    >
                      ← All Posts
                    </Button>
                  </NextLink>
                  <NextLink href="/" passHref>
                    <Button 
                      size="sm"
                      bg="#ffcb2f" 
                      color="#211305" 
                      _hover={{ bg: '#e0a922' }}
                      border="2px solid black" 
                      boxShadow="2px 2px 0 rgba(0,0,0,0.5)" 
                      fontWeight="bold"
                    >
                      Calculators
                    </Button>
                  </NextLink>
                </Stack>
              </Stack>
            </VStack>
          </Box>
        </Container>

        {/* Article Content */}
        <Container maxW="4xl" pb={8}>
          <Box 
            bg="rgba(42, 30, 15, 0.75)" 
            borderRadius="md" 
            p={8}
            border="2px solid black"
            boxShadow="5px 5px 0 rgba(0,0,0,0.4)"
            backdropFilter="blur(4px)"
          >
            <Box className="blog-content">
              {documentToReactComponents(body, richTextRenderOptions)}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
} 