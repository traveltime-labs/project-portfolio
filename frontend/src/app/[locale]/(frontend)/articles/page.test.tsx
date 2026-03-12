import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ArticlesPage from './page';
import { getAllPosts } from '@/hooks/blogLists';

vi.mock('@/hooks/blogLists', () => ({
  getAllPosts: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockedGetAllPosts = vi.mocked(getAllPosts);

describe('/articles page', () => {
  beforeEach(() => {
    mockedGetAllPosts.mockReset();
  });

  it('測試文章頁面在有文章時是否正確渲染', () => {
    mockedGetAllPosts.mockReturnValue([
      {
        slug: 'hello-vitest',
        title: 'Hello Vitest',
        date: '2026-03-10',
        category: 'Testing',
        excerpt: 'First article excerpt.',
      },
    ] as ReturnType<typeof getAllPosts>);

    render(<ArticlesPage />);

    expect(screen.getByTestId('articles-page')).toBeInTheDocument();
    expect(screen.getByTestId('articles-title')).toHaveTextContent('文章列表');
    expect(screen.getByTestId('articles-link-hello-vitest')).toHaveAttribute('href', '/blog/hello-vitest');
    expect(screen.getByTestId('articles-category-hello-vitest')).toHaveTextContent('Testing');
    expect(screen.getByTestId('articles-excerpt-hello-vitest')).toHaveTextContent('First article excerpt.');
  });

  it('測試文章頁面在無文章時是否正確渲染空狀態', () => {
    mockedGetAllPosts.mockReturnValue([]);

    render(<ArticlesPage />);

    expect(screen.getByTestId('articles-empty-state')).toHaveTextContent('沒有資料');
  });

  it('會對包含特殊字元的 slug 產生安全的文章連結', () => {
    mockedGetAllPosts.mockReturnValue([
      {
        slug: '20260223_Web_SSR前端框架(Next.js, Nuxt3, Vike)對比',
        title: 'SSR 對比',
        date: '2026-02-23',
        category: 'Frontend',
        excerpt: 'Special slug article.',
      },
    ] as ReturnType<typeof getAllPosts>);

    render(<ArticlesPage />);

    expect(screen.getByTestId('articles-link-20260223_Web_SSR前端框架(Next.js, Nuxt3, Vike)對比')).toHaveAttribute(
      'href',
      '/blog/20260223_Web_SSR%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6(Next.js%2C%20Nuxt3%2C%20Vike)%E5%B0%8D%E6%AF%94',
    );
  });
});