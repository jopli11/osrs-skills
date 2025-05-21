import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import { fetchAllBlogPostSlugs, fetchBlogPostBySlug, type BlogPostEntry } from '../../lib/contentful'; // Corrected path

// Define the props for this page
type BlogPostPageProps = {
  post: BlogPostEntry | null; // Post can be null if not found
};

// Define the params type for getStaticProps
interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugsData = await fetchAllBlogPostSlugs();
  const paths = slugsData.map((item: { slug: string }) => ({ // Added type for item
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // or true/false depending on your needs. 'blocking' will SSR on miss.
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, IParams> = async (context) => {
  const { slug } = context.params!; // slug will be defined because of getStaticPaths
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true, // Returns a 404 page if the post is not found
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Optional: Revalidate the page every 60 seconds
  };
};

// Optional: Configure how Rich Text elements are rendered
const richTextRenderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
    // Add more mark renderers if needed
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-bold mb-4">{children}</h3>,
    // Example for embedded assets (images) - you'll need to handle asset linking properly
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target;
      if (!asset || !asset.fields || !asset.fields.file) {
        return null;
      }
      // TODO: type 'asset.fields.file' properly, Contentful types can be complex here
      const fileDetails = asset.fields.file;
      if (fileDetails.contentType.includes('image')) {
        return (
          <img
            src={`https:${fileDetails.url}`}
            alt={asset.fields.description || asset.fields.title || ''}
            className="my-4 max-w-full h-auto rounded-md"
          />
        );
      }
      return null;
    },
     [INLINES.ASSET_HYPERLINK]: (node, children) => {
      const asset = node.data.target;
      if (!asset || !asset.fields || !asset.fields.file) {
        return null;
      }
      const fileUrl = asset.fields.file?.url;
      return <a href={fileUrl ? `https:${fileUrl}` : '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>;
    },
    // Add more node renderers for lists, blockquotes, etc. as needed
    // e.g., [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc ml-8 mb-4">{children}</ul>,
    // [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal ml-8 mb-4">{children}</ol>,
    // [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,

  },
};

const BlogPostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    // This case should ideally be handled by notFound: true in getStaticProps,
    // but as a fallback:
    return <p>Blog post not found.</p>;
  }

  const { title, publicationDate, body, seoTitle, seoDescription, author } = post.fields;

  return (
    <>
      <Head>
        <title>{seoTitle || title} | My Blog</title>
        {seoDescription && <meta name="description" content={seoDescription} />}
        {/* Add other SEO meta tags as needed, like keywords */}
      </Head>
      <article className="prose lg:prose-xl max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {author && <p className="text-gray-600 text-sm mb-1">By: {author}</p>}
        <p className="text-gray-500 text-sm mb-6">
          Published on: {new Date(publicationDate).toLocaleDateString()}
        </p>
        
        <div>
          {documentToReactComponents(body, richTextRenderOptions)}
        </div>
        
        {/* You might want to add author bio, related posts, social sharing buttons etc. here */}
      </article>
    </>
  );
};

export default BlogPostPage; 