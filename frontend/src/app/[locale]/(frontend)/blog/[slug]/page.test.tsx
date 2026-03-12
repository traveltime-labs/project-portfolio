import { describe, expect, it, vi } from 'vitest';

import BlogPage, { generateMetadata } from './page';

const { mockReadPostFile } = vi.hoisted(() => ({
  mockReadPostFile: vi.fn(),
}));

vi.mock('@/lib/postContent', () => ({
  readPostFile: mockReadPostFile,
}));

vi.mock('gray-matter', () => ({
  default: vi.fn(),
}));

vi.mock('@/modules/frontend/blog/content', () => ({
  default: ({ params }: { params: Promise<{ slug: string }> }) => <div data-testid="blog-page-content" data-params={String(params)} />,
}));

describe('/blog/[slug] page', () => {
  it('returns metadata from markdown frontmatter', async () => {
    const matter = (await import('gray-matter')).default as unknown as ReturnType<typeof vi.fn>;
    mockReadPostFile.mockReturnValue({
      filePath: '/mock/posts/hello-vitest.md',
      fileContent: 'mock markdown file',
    });
    matter.mockReturnValue({
      data: {
        title: 'Hello Vitest',
        excerpt: 'Metadata excerpt',
        date: '2026-03-10',
      },
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'hello-vitest' }),
    });

    expect(mockReadPostFile).toHaveBeenCalledWith('hello-vitest');
    expect(metadata).toEqual({
      title: 'Hello Vitest',
      description: 'Metadata excerpt',
      openGraph: {
        title: 'Hello Vitest',
        description: 'Metadata excerpt',
        type: 'article',
        publishedTime: '2026-03-10',
        images: ['/blog/hello-vitest/cover.jpg'],
      },
    });
  });

  it('returns fallback metadata when the post file does not exist', async () => {
    mockReadPostFile.mockReturnValue(null);

    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'missing-post' }),
    });

    expect(metadata).toEqual({
      title: '找不到文章',
      description: '你要查看的文章不存在或已被移除。',
    });
  });

  it('passes params through to the blog content component', async () => {
    const params = Promise.resolve({ slug: 'hello-vitest' });

    const page = await BlogPage({ params });

    expect(page.props.params).toBe(params);
  });
});