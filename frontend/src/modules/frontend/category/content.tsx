// 標籤分類：從 src/content/posts 撈文章、依 category 分組並顯示
import { Link } from "@/i18n/routing"; // 注意要用我們自定義的 Link

type CategoryPost = {
  slug: string;
  category?: string;
};

// 組合內容
const Content = ({ posts }: { posts: CategoryPost[] }) => {

  const groups = posts.reduce((acc, post) => {
    const cat = post.category || "uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto py-8" data-testid="category-page">
      <h2 className="text-2xl font-bold mb-6" data-testid="category-title">分類列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="category-list">
        {Object.keys(groups).length === 0 ? (
          <div className="text-sm text-gray-500" data-testid="category-empty-state">No posts found.</div>
        ) : (
          Object.entries(groups).map(([cat, count]) => (
            <section key={cat} className="rounded-lg" data-testid={`category-item-${encodeURIComponent(cat)}`}>
              <ul className="space-y-3">
                <li>
                  {/* <Link href={`/blog/${p.slug}`} className={`${cls} text-blue-600 hover:underline`} aria-label={`Open ${p.title}`}>
                        {p.category ? `[${p.category}] ` : ''}
                      </Link> */}
                  <Link href={`/category/${encodeURIComponent(cat)}`} data-testid={`category-link-${encodeURIComponent(cat)}`}>
                    {cat} ({count})
                  </Link>

                </li>
                {/* {cat.map((p) => {
                  const cls = fontClasses[Math.floor(Math.random() * fontClasses.length)];
                  return (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className={`${cls} text-blue-600 hover:underline`} aria-label={`Open ${p.title}`}>
                        {p.category ? `[${p.category}] ` : ''}
                      </Link>
                    </li>
                  );
                })} */}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
