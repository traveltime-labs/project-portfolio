import { Link } from "@/i18n/routing";

type ArticlePost = {
  slug: string;
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
};

const Content: React.FC<{ posts: ArticlePost[] }> = ({ posts }) => {
  const formatDate = (date?: string) => {
    if (!date) return "未提供日期";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-extrabold mb-6">文章列表</h2>

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs text-slate-500 mb-2">{formatDate(post.date)}</div>
              <Link href={`/blog/${post.slug}`} className="text-lg font-bold hover:text-blue-600">
                {post.title || post.slug}
              </Link>
              <div className="text-xs text-blue-600 mt-2">{post.category || "未分類"}</div>
              {post.excerpt ? <p className="text-sm text-slate-600 mt-2 line-clamp-3">{post.excerpt}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">沒有資料</div>
      )}
    </div>
  );
};

export default Content;
