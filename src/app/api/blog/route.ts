import { NextResponse } from 'next/server';
import { fetchBlogPosts } from '@/lib/contentful';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build query parameters
    const queryParams = {
      limit,
      skip,
      ...(search && { search }),
      ...(dateFrom && { dateFrom }),
      ...(dateTo && { dateTo }),
    };
    
    // Fetch posts with pagination and filtering
    const blogResponse = await fetchBlogPosts(queryParams);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(blogResponse.total / limit);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    
    return NextResponse.json({
      posts: blogResponse.posts,
      pagination: {
        currentPage,
        totalPages,
        totalPosts: blogResponse.total,
        hasNextPage,
        hasPrevPage,
        limit
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' }, 
      { status: 500 }
    );
  }
} 