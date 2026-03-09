'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function findPostsDir() {
  const tryPaths = [
    path.join(process.cwd(), 'src', 'content', 'posts'),
    path.join(process.cwd(), 'frontend', 'src', 'content', 'posts'),
  ];
  for (const p of tryPaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// 撈取列表
export function getAllPosts() {
  const postsDirectory = findPostsDir();
  if (!postsDirectory) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date,
      category: data.category || 'uncategorized',
      excerpt: data.excerpt || "這是一篇關於...", // 可以在 md 裡加個摘要
      cover: data.cover || "/images/default-cover.jpg"
    };
  });

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
