import { Link } from "@/i18n/routing";

type TagPost = {
  slug: string;
  title?: string;
  date?: string;
};

interface DetailContentProps {
  slug: string;
  posts: TagPost[];
}

const Content = ({ slug, posts }: DetailContentProps) => {
  return (
    <div className="container mx-auto py-8" data-testid="tag-detail-page">
      <h2 className="text-2xl font-bold mb-6" data-testid="tag-detail-title">#{slug} 標籤列表</h2>

      {posts.length === 0 ? (
        <div className="text-sm text-gray-500" data-testid="tag-detail-empty-state">No posts found for this tag.</div>
      ) : (
        <ul className="list-disc list-inside space-y-2" data-testid="tag-detail-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${encodeURIComponent(post.slug)}`}
                className="text-blue-500 hover:underline"
                data-testid={`tag-detail-post-link-${encodeURIComponent(post.slug)}`}
              >
                {post.title || post.slug}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Content;
