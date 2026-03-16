import { Link } from "@/i18n/routing"; // 注意要用我們自定義的 Link

interface DetailContentProps {
  slug: string;
  posts: Array<{ slug: string; title?: string }>;
}

// 標籤分類點選後列表頁面
// 組合內容
const Content = ({ slug, posts }: DetailContentProps) => {
  return (
    <div className="container mx-auto py-8" data-testid="category-detail-page">
      <h2 className="text-2xl font-bold mb-6" data-testid="category-detail-title">{decodeURIComponent(slug)}分類列表</h2>
      {posts.length === 0 ? (
        <div className="text-sm text-gray-500" data-testid="category-detail-empty-state">
          No posts found in this category.
        </div>
      ) : (
        <ul className="list-disc list-inside" data-testid="category-detail-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${encodeURIComponent(p.slug)}`}
                className="text-blue-500 hover:underline"
                data-testid={`category-detail-post-link-${encodeURIComponent(p.slug)}`}
              >
                {p.title || p.slug}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Content;
