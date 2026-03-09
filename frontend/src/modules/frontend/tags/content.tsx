/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

'use server';

// 標籤分類：從 src/content/posts 撈文章、依 tags 分組並顯示
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
      tags: data.tags || []
    };
  });
  return posts;
}

// 字體大小
const fontClasses = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];

const Content = () => {
  const posts = getAllPosts();

  const tagGroups = posts.reduce((acc, post) => {
    // 1. 確保 tags 永遠是陣列 (預防部署後因為某篇 md 沒寫 tags 而當機)
    const tags = Array.isArray(post.tags) ? post.tags : ["uncategorized"];

    tags.forEach((tag) => {
      // 2. 統一套用小寫，避免 React vs react 的重複問題
      const normalizedTag = tag.toLowerCase().trim();

      // 3. 累加計數
      acc[normalizedTag] = (acc[normalizedTag] || 0) + 1;
    });

    return acc;
  }, {} as Record<string, number>);

  console.log(tagGroups)

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">標籤列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(tagGroups).length === 0 ? (
          <div className="text-sm text-gray-500">No posts found.</div>
        ) : (
          Object.entries(tagGroups).map(([tag, count]) => (
            <div key={tag} className="text-sm">

              <Link href={`/tags/${tag}`}>
                {tag} ({count})
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
