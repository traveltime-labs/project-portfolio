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

const parseDateValue = (value?: string) => {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const normalizeText = (value: string) => value.toLowerCase().trim();

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

    const safeCategory = typeof data.category === 'string' ? data.category : '未分類';
    const safeExcerpt = typeof data.excerpt === 'string' ? data.excerpt : '這是一篇關於...';
    const safeTitle = typeof data.title === 'string' ? data.title : slug;
    const safeDate = typeof data.date === 'string' ? data.date : '';
    const safeTags = Array.isArray(data.tags)
      ? data.tags.map((tag) => String(tag))
      : typeof data.tags === 'string'
        ? [data.tags]
        : [];

    return {
      slug,
      title: safeTitle,
      date: safeDate,
      category: safeCategory,
      excerpt: safeExcerpt,
      tags: safeTags,
      cover: data.cover || "/images/default-cover.jpg"
    };
  });

  // 按日期排序
  return allPostsData.sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date));
}

// 撈取分類
export function getPostsByCategory(category: string) {
  const target = normalizeText(category);
  if (!target) return getAllPosts();

  return getAllPosts().filter((post) => normalizeText(post.category || '未分類') === target);
}

// 撈取近期文章
export function getRecentPosts(limit = 5) {
  return getAllPosts().slice(0, Math.max(0, limit));
}

// 搜尋
export function searchPosts(keyword: string, limit = 6) {
  const target = normalizeText(keyword);
  if (!target) return [];

  const matched = getAllPosts().filter((post) => {
    const fields = [
      post.title || '',
      post.excerpt || '',
      post.category || '',
      post.slug || '',
      ...(post.tags || []),
    ];

    return fields.some((field) => normalizeText(String(field)).includes(target));
  });

  return matched.slice(0, Math.max(0, limit));
}

// 依標籤篩選
export function getPostsByTag(tag: string) {
  const target = normalizeText(tag);
  if (!target) return [];

  return getAllPosts().filter((post) => {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    return tags.some((item) => normalizeText(item) === target);
  });
}

// 取得標籤列表與計數
export function getTagCounts() {
  return getAllPosts().reduce((acc, post) => {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    tags.forEach((tag) => {
      const normalizedTag = normalizeText(tag);
      if (!normalizedTag) return;
      acc[normalizedTag] = (acc[normalizedTag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
}
