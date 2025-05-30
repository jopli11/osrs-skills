import {
  createClient,
  type EntryCollection,
  type Entry,
  type Asset,
  type EntrySkeletonType,
  type EntriesQueries
} from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Define an interface for the Blog Post content type fields
// This should match the fields you created in Contentful
export interface BlogPostFields {
  title: string;
  slug: string;
  author?: string;
  publicationDate: string; // This will be an ISO date string from Contentful
  featuredImage?: Asset; // Changed from any to Asset
  body: Document; // Changed from any to Document
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

// Define the Contentful Entry Skeleton.
// This tells the SDK what shape our 'blogPost' entries have.
export type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">;
//                                               ^ Your fields interface
//                                                        ^ The Content Type ID string

// Define the type for a full Blog Post entry from Contentful using the skeleton
export type BlogPostEntry = Entry<BlogPostSkeleton, undefined>;

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// Basic validation for environment variables
if (!space || !accessToken) {
  throw new Error(
    'Contentful Space ID and Access Token must be defined in .env.local. ' +
    'Please check your .env.local file and ensure Next.js can access these variables.'
  );
}

const client = createClient({
  space: space,
  accessToken: accessToken,
});

/**
 * Fetches all blog posts, ordered by publication date (newest first).
 */
export async function fetchAllBlogPosts(): Promise<BlogPostEntry[]> {
  const query: EntriesQueries<BlogPostSkeleton, undefined> = {
    content_type: 'blogPost',
    // @ts-expect-error - Contentful SDK types can be overly strict for specific order queries.
    order: ['-fields.publicationDate'],
  };
  const entries: EntryCollection<BlogPostSkeleton, undefined, string> = await client.getEntries<BlogPostSkeleton>(query);
  
  // Debug logging to help troubleshoot missing posts
  console.log(`Fetched ${entries.items.length} blog posts from Contentful`);
  entries.items.forEach((item, index) => {
    console.log(`Post ${index + 1}: "${item.fields.title}" (slug: ${item.fields.slug}, published: ${item.fields.publicationDate})`);
  });
  
  return entries.items as BlogPostEntry[];
}

/**
 * Fetches a single blog post by its slug.
 * @param slug The slug of the blog post to fetch.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostEntry | null> {
  const query: EntriesQueries<BlogPostSkeleton, undefined> = {
    content_type: 'blogPost',
    // @ts-expect-error - Contentful SDK types can be overly strict for specific field queries.
    'fields.slug': slug,
    limit: 1,
  };
  const entries: EntryCollection<BlogPostSkeleton, undefined, string> = await client.getEntries<BlogPostSkeleton>(query);

  if (entries.items.length > 0) {
    return entries.items[0] as BlogPostEntry;
  }
  return null;
}

/**
 * Fetches only the slugs for all blog posts.
 * Useful for Next.js getStaticPaths if you're pre-rendering blog pages.
 */
export async function fetchAllBlogPostSlugs(): Promise<{ slug: string }[]> {
  const query: EntriesQueries<BlogPostSkeleton, undefined> = {
    content_type: 'blogPost',
    select: ['fields.slug'],
  };
  const entries: EntryCollection<BlogPostSkeleton, undefined, string> = await client.getEntries<BlogPostSkeleton>(query);

  return entries.items
    .filter(item => item.fields && item.fields.slug) 
    .map(item => ({ slug: item.fields.slug as string })); 
} 