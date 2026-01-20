
// import PostList from "../post-list";

import { getAllPosts } from '@/hooks/blogLists';
import Link from 'next/link';


/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

const Content = () => {
  const posts = getAllPosts();
  return (
    <div className="container mx-auto">
      <div> banner? </div>
      <div> new Article </div>
      <div className="max-w-5xl mx-auto py-12 px-4">
      
      {/* 網格佈局 */}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <article className="h-full border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-lg hover:border-blue-500 bg-white">
              <div className="text-sm text-blue-600 font-medium mb-2">
                {post.category}
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="text-slate-400 text-xs">
                {post.date}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>

    </div>
  );
};

export default Content;