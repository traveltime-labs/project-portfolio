/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

// 標籤分類：從 src/content/posts 撈文章、依 tags 分組並顯示
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface PostMeta {
  slug: string;
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  tags? : string[] | string;
}

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
      tags: data.tags || []
    };
  });
  return posts;
}

const fontClasses = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];

const Content = () => {
  const posts = getAllPosts();

  // group by category
  const groups: Record<string, PostMeta[]> = {};
  posts.forEach((p) => {
    const tags = (p.tags || "uncategorized").toString();
    if (!groups[tags]) groups[tags] = [];
    groups[tags].push(p);
  });

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Tags</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(groups).length === 0 ? (
          <div className="text-sm text-gray-500">No posts found.</div>
        ) : (
          Object.entries(groups).map(([cat, list]) => (
            <section key={cat} className="p-4 border rounded-lg">
              {/* <h3 className="text-lg font-semibold mb-3">{cat} <span className="text-sm text-gray-400">({list.length})</span></h3> */}
              <ul className="space-y-3">
                {list.map((p) => {
                  const cls = fontClasses[Math.floor(Math.random() * fontClasses.length)];
                  return (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className={`${cls} text-blue-600 hover:underline`} aria-label={`Open ${p.title}`}>
                        {p.tags ? `[${p.tags}] ` : ''}
                      </Link>
                      {/* {p.excerpt ? <p className="text-sm text-gray-500">{p.excerpt}</p> : null} */}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
