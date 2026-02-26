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


const Content = () => {


  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Tags</h2>
      <ul className="list-disc list-inside">
        <li><Link href="/post/slug1" className="text-blue-500 hover:underline">文章標題 1</Link></li>
        <li><Link href="/post/slug2" className="text-blue-500 hover:underline">文章標題 2</Link></li>
        <li><Link href="/post/slug3" className="text-blue-500 hover:underline">文章標題 3</Link></li>
      </ul>
    </div>
  );
};

export default Content;
