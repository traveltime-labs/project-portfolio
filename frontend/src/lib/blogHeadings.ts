import type { ReactNode } from 'react';

export type ArticleHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

const HEADING_LEVELS = new Set([2, 3, 4]);

function normalizeHeadingText(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[>*_~]/g, '')
    .trim();
}

function slugifyHeading(text: string) {
  const normalized = normalizeHeadingText(text)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return normalized || 'section';
}

export function createHeadingId(text: string, counts = new Map<string, number>()) {
  const base = slugifyHeading(text);
  const current = counts.get(base) ?? 0;
  const next = current + 1;
  counts.set(base, next);

  return next === 1 ? base : `${base}-${next}`;
}

export function extractMarkdownHeadings(source: string): ArticleHeading[] {
  const lines = source.split('\n');
  const counts = new Map<string, number>();
  const headings: ArticleHeading[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const match = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3 | 4;
    if (!HEADING_LEVELS.has(level)) {
      continue;
    }

    const text = normalizeHeadingText(match[2]);
    if (!text) {
      continue;
    }

    headings.push({
      id: createHeadingId(text, counts),
      text,
      level,
    });
  }

  return headings;
}

export function extractTextFromReactNode(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('');
  }

  if (typeof node === 'object' && 'props' in node) {
    return extractTextFromReactNode(node.props.children as ReactNode);
  }

  return '';
}