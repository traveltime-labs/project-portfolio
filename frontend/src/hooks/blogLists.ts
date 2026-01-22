import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

// 撈取列表
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    console.log(fileName)
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    console.log(data)

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      excerpt: data.excerpt || "這是一篇關於...", // 可以在 md 裡加個摘要
      cover: data.cover || "/images/default-cover.jpg"
    };
  });

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}



/*
分類: 前端, 後端, 資料庫
標籤: vue scss tailwind postsql react javascreipt typescript ...


側邊欄位:

關於我摘要
廣告
排行榜
標籤雲
廣告



*/