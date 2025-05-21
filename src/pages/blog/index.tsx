import Link from 'next/link';
import { fetchAllBlogPosts, type BlogPostEntry } from '../../lib/contentful'; // Adjust path if needed
import { GetStaticProps, InferGetStaticPropsType } from 'next';

// Props type for the page component
type BlogIndexPageProps = {
  posts: BlogPostEntry[];
};

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async () => {
  const posts = await fetchAllBlogPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60, // Optional: Revalidate the page every 60 seconds (ISR)
  };
};

const BlogIndexPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!posts || posts.length === 0) {
    return <p>No blog posts found.</p>;
  }

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <Link href={`/blog/${post.fields.slug}`}>
              {post.fields.title}
            </Link>
            {/* You can add more details here, like publication date or a snippet */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndexPage; 