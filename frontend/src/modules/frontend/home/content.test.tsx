import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Content from '@/modules/frontend/home/content';
import { getAllPosts } from '@/hooks/blogLists';

vi.mock('@/hooks/blogLists', () => ({
  getAllPosts: vi.fn(),
}));

// 模擬 Link 組件以避免測試中出現 Next.js 的 Link 相關錯誤
vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockedGetAllPosts = vi.mocked(getAllPosts);

describe('Home content', () => {
  beforeEach(() => {
    mockedGetAllPosts.mockReset();
  });

  it('測試首頁內容在有文章時是否正確渲染', () => {
    mockedGetAllPosts.mockReturnValue([
      {
        slug: 'hello-vitest',
        title: 'Hello Vitest',
        date: '2026-03-10',
        category: 'Testing',
        excerpt: 'First homepage post excerpt.',
        tags: ['vitest'],
        cover: '/images/default-cover.jpg',
      },
      {
        slug: 'second-post',
        title: 'Second Post',
        date: '2026-03-09',
        category: 'Frontend',
        excerpt: 'Second homepage post excerpt.',
        tags: ['react'],
        cover: '/images/default-cover.jpg',
      },
    ]);

    render(<Content />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('home-list-title')).toHaveTextContent('最新文章');
    expect(screen.getByTestId('home-list-count')).toHaveTextContent('共 2 篇');

    const postList = screen.getByTestId('home-post-list');
    const firstCard = screen.getByTestId('home-post-card-0');
    const firstLink = screen.getByTestId('home-post-link-hello-vitest');

    expect(postList).toBeInTheDocument();
    expect(firstLink).toHaveAttribute('href', '/blog/hello-vitest');
    expect(screen.getByTestId('home-post-category-hello-vitest')).toHaveTextContent('Testing');
    expect(screen.getByTestId('home-post-title-hello-vitest')).toHaveTextContent('Hello Vitest');
    expect(screen.getByTestId('home-post-excerpt-hello-vitest')).toHaveTextContent('First homepage post excerpt.');
    expect(screen.getByTestId('home-post-date-hello-vitest')).not.toHaveTextContent('');

    expect(within(firstCard).getByText('閱讀更多 →')).toBeInTheDocument();
  });

  it('測試首頁內容在無文章時是否正確渲染空狀態', () => {
    mockedGetAllPosts.mockReturnValue([]);

    render(<Content />);

    expect(screen.getByTestId('home-list-count')).toHaveTextContent('共 0 篇');
    expect(screen.getByTestId('home-empty-state')).toHaveTextContent('目前尚無文章，稍後再回來看看～');
    expect(screen.queryByTestId('home-post-list')).not.toBeInTheDocument();
  });

  it('會對包含特殊字元的 slug 進行 URL 編碼', () => {
    mockedGetAllPosts.mockReturnValue([
      {
        slug: '20260223_Web_SSR前端框架(Next.js, Nuxt3, Vike)對比',
        title: 'SSR 對比',
        date: '2026-02-23',
        category: 'Frontend',
        excerpt: 'Special slug article.',
        tags: ['ssr'],
        cover: '/images/default-cover.jpg',
      },
    ]);

    render(<Content />);

    expect(screen.getByTestId('home-post-link-20260223_Web_SSR前端框架(Next.js, Nuxt3, Vike)對比')).toHaveAttribute(
      'href',
      '/blog/20260223_Web_SSR%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6(Next.js%2C%20Nuxt3%2C%20Vike)%E5%B0%8D%E6%AF%94',
    );
  });
});