/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

// 標籤分類：從 src/content/posts 撈文章、依 category 分組並顯示
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Link, usePathname } from "@/i18n/routing"; // 注意要用我們自定義的 Link

// 取得文件路徑
function findPostsDir() {
  const tryPaths = [
    path.join(process.cwd(), "src", "content", "posts"),
    path.join(process.cwd(), "frontend", "src", "content", "posts"),
  ];
  for (const p of tryPaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// 讀取 meta 取得資料
function getAllPosts(): PostMeta[] {
  const postsDir = findPostsDir();
  if (!postsDir) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts: PostMeta[] = files.map((file) => {
    const full = path.join(postsDir, file);
    const raw = fs.readFileSync(full, "utf8");
    const parsed = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    const data: any = parsed.data || {};
    return {
      slug,
      title: data.title || slug,
      date: data.date,
      category: data.category || "uncategorized",
      excerpt: data.excerpt,
    };
  });
  return posts;
}

// 組合內容
const Content = () => {
  const posts = getAllPosts();

  const groups = posts.reduce((acc, post) => {
    const cat = post.category || "uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(groups).length === 0 ? (
          <div className="text-sm text-gray-500">No posts found.</div>
        ) : (
          Object.entries(groups).map(([cat, count]) => (
            <section key={cat} className="p-4 border rounded-lg">
              <ul className="space-y-3">
                <li>
                  {/* <Link href={`/blog/${p.slug}`} className={`${cls} text-blue-600 hover:underline`} aria-label={`Open ${p.title}`}>
                        {p.category ? `[${p.category}] ` : ''}
                      </Link> */}
                  <Link href={`/category/${cat}`}>
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
