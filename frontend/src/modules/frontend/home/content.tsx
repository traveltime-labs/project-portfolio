import { getAllPosts } from '@/hooks/blogLists';
import { Link } from "@/i18n/routing";

const Content = () => {
  const posts = getAllPosts();

  const formatDate = (d?: string) => {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('zh-TW', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return d;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto py-8 lg:pr-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">最新文章</h2>
          <div className="text-sm text-slate-500">共 {posts.length} 篇</div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-slate-500">
            目前尚無文章，稍後再回來看看～
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <article className="h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transform transition duration-200 hover:-translate-y-1">
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                        {post.category}
                      </div>
                      <div className="text-xs text-slate-400">{formatDate(post.date)}</div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>

                    <div className="text-right">
                      <span className="text-xs text-blue-600 font-medium group-hover:underline">閱讀更多 →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;