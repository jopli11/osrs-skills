import { NextResponse } from 'next/server';
import { fetchAllBlogPosts } from '@/lib/contentful';

export async function GET() {
  try {
    const posts = await fetchAllBlogPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' }, 
      { status: 500 }
    );
  }
} 