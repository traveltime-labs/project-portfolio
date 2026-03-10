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
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">#{slug} 標籤列表</h2>

      {posts.length === 0 ? (
        <div className="text-sm text-gray-500">No posts found for this tag.</div>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
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
