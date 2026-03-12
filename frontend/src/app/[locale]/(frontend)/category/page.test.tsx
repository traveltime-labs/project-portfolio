import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CategoryPage from './page';
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

describe('/category page', () => {
  beforeEach(() => {
    mockedGetAllPosts.mockReset();
  });

  it('renders grouped categories from posts', () => {
    mockedGetAllPosts.mockReturnValue([
      { slug: 'alpha', category: 'Testing' },
      { slug: 'beta', category: 'Testing' },
      { slug: 'gamma', category: 'Frontend' },
    ] as ReturnType<typeof getAllPosts>);

    render(<CategoryPage />);

    expect(screen.getByTestId('category-page')).toBeInTheDocument();
    expect(screen.getByTestId('category-title')).toHaveTextContent('分類列表');
    expect(screen.getByTestId('category-link-Testing')).toHaveAttribute('href', '/category/Testing');
    expect(screen.getByTestId('category-link-Testing')).toHaveTextContent('Testing (2)');
    expect(screen.getByTestId('category-link-Frontend')).toHaveTextContent('Frontend (1)');
  });

  it('renders empty state when no categories exist', () => {
    mockedGetAllPosts.mockReturnValue([]);

    render(<CategoryPage />);

    expect(screen.getByTestId('category-empty-state')).toHaveTextContent('No posts found.');
  });
});