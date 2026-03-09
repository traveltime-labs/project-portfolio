import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextRequest } from 'next/server';

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

export const GET = async (request: NextRequest) => {
  try {
    const postsDir = findPostsDir();
    if (!postsDir) {
      return Response.json({ data: [] }, { status: 200 });
    }

    const fileNames = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date,
        category: data.category || 'uncategorized',
        excerpt: data.excerpt || '這是一篇關於...',
        cover: data.cover || '/images/default-cover.jpg',
      };
    });

    // 按日期排序
    const sorted = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

    return Response.json({ data: sorted }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
