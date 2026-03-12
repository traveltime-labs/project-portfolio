import fs from 'fs';
import path from 'path';

const POST_FILE_EXTENSIONS = ['.md', '.mdx'];

function normalizePostSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function findPostsDir() {
  const tryPaths = [
    path.join(process.cwd(), 'src', 'content', 'posts'),
    path.join(process.cwd(), 'frontend', 'src', 'content', 'posts'),
  ];

  for (const candidate of tryPaths) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function resolvePostFilePath(slug: string) {
  const postsDir = findPostsDir();
  if (!postsDir) {
    return null;
  }

  const normalizedSlug = normalizePostSlug(slug);

  for (const extension of POST_FILE_EXTENSIONS) {
    const candidate = path.join(postsDir, `${normalizedSlug}${extension}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function readPostFile(slug: string) {
  const filePath = resolvePostFilePath(slug);
  if (!filePath) {
    return null;
  }

  return {
    filePath,
    fileContent: fs.readFileSync(filePath, 'utf8'),
  };
}