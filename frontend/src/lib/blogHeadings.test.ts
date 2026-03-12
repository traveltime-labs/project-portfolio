import { describe, expect, it } from 'vitest';

import { createHeadingId, extractMarkdownHeadings } from '@/lib/blogHeadings';

describe('blogHeadings', () => {
  it('extracts nested markdown headings and skips code blocks', () => {
    const headings = extractMarkdownHeadings(`# Title

## Introduction
### Setup Guide

\`\`\`
## Not a heading
\`\`\`

## Introduction
#### Deep Dive
    `);

    expect(headings).toEqual([
      { id: 'introduction', text: 'Introduction', level: 2 },
      { id: 'setup-guide', text: 'Setup Guide', level: 3 },
      { id: 'introduction-2', text: 'Introduction', level: 2 },
      { id: 'deep-dive', text: 'Deep Dive', level: 4 },
    ]);
  });

  it('creates stable ids for duplicate headings', () => {
    const counts = new Map<string, number>();

    expect(createHeadingId('React 入門', counts)).toBe('react-入門');
    expect(createHeadingId('React 入門', counts)).toBe('react-入門-2');
  });
});