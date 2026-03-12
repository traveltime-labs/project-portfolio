import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import InnerSidebar from '@/components/InnerSidebar';

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockPosts = [
  {
    slug: 'hello-vitest',
    title: 'Hello Vitest',
    date: '2026-03-11',
    category: 'Testing',
    excerpt: 'Vitest setup and examples.',
    tags: ['Vitest', 'React'],
  },
  {
    slug: 'react-patterns',
    title: 'React Patterns',
    date: '2026-03-10',
    category: 'Frontend',
    excerpt: 'Component composition guide.',
    tags: ['React', 'UI'],
  },
  {
    slug: 'next-routing',
    title: 'Next Routing',
    date: '2026-03-09',
    category: 'Frontend',
    excerpt: 'Routing guide for localized apps.',
    tags: ['Next.js', 'Routing'],
  },
  {
    slug: 'database-basics',
    title: 'Database Basics',
    date: '2026-03-08',
    category: 'Backend',
    excerpt: 'Intro to relational data.',
    tags: ['Database'],
  },
  {
    slug: 'accessibility-guide',
    title: 'Accessibility Guide',
    date: '2026-03-07',
    category: 'Frontend',
    excerpt: 'Inclusive UI checklist.',
    tags: ['A11y', 'UI'],
  },
  {
    slug: 'old-post',
    title: 'Old Post',
    date: '2026-03-01',
    category: 'Archive',
    excerpt: 'Historical notes.',
    tags: ['Legacy'],
  },
];

// 模擬 fetch API 返回文章列表
describe('InnerSidebar', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ data: mockPosts }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders aggregated article tags from fetched posts', async () => {
    render(<InnerSidebar />);

    const tagsList = await screen.findByTestId('sidebar-tags-list');
    expect(tagsList).toBeInTheDocument();

    expect(screen.getByTestId('sidebar-tag-link-React')).toHaveAttribute('href', '/tags/React');
    expect(screen.getByTestId('sidebar-tag-count-React')).toHaveTextContent('2');
    expect(screen.getByTestId('sidebar-tag-count-Vitest')).toHaveTextContent('1');
    expect(screen.getByTestId('sidebar-tag-count-UI')).toHaveTextContent('2');
  });

  it('renders article category counts from fetched posts', async () => {
    render(<InnerSidebar />);

    const categoriesList = await screen.findByTestId('sidebar-categories-list');
    expect(categoriesList).toBeInTheDocument();

    expect(screen.getByTestId('sidebar-category-link-Frontend')).toHaveAttribute('href', '/category/Frontend');
    expect(screen.getByTestId('sidebar-category-count-Frontend')).toHaveTextContent('3');
    expect(screen.getByTestId('sidebar-category-count-Testing')).toHaveTextContent('1');
    expect(screen.getByTestId('sidebar-category-count-Backend')).toHaveTextContent('1');
  });

  it('renders the five most recent posts in descending date order', async () => {
    render(<InnerSidebar />);

    const recentPostsList = await screen.findByTestId('sidebar-recent-posts-list');
    const recentLinks = within(recentPostsList).getAllByRole('link');

    expect(recentLinks).toHaveLength(5);
    expect(recentLinks.map((link) => link.textContent)).toEqual([
      'Hello Vitest',
      'React Patterns',
      'Next Routing',
      'Database Basics',
      'Accessibility Guide',
    ]);
    expect(screen.queryByTestId('sidebar-recent-post-old-post')).not.toBeInTheDocument();
  });

  it('搜尋功能測試', async () => {
    const user = userEvent.setup();

    render(<InnerSidebar />);

    // 等待文章列表載入完成，確保標籤也已渲染
    await screen.findByTestId('sidebar-tag-link-React');

    // 輸入搜尋關鍵字
    const searchInput = screen.getByTestId('sidebar-search-input');
    await user.type(searchInput, 'vitest');

    // 等待搜尋結果更新
    const results = await screen.findByTestId('sidebar-search-results');
    const matchedItem = within(results).getByTestId('sidebar-search-result-hello-vitest');

    // 驗證搜尋結果正確顯示
    expect(matchedItem).toBeInTheDocument();
    expect(within(matchedItem).getByText('Hello Vitest')).toBeInTheDocument();
    expect(within(matchedItem).getByText('[Testing]')).toBeInTheDocument();
    expect(within(results).queryByTestId('sidebar-search-result-react-patterns')).not.toBeInTheDocument();
  });

  it('測試搜尋無結果情況', async () => {
    const user = userEvent.setup();

    render(<InnerSidebar />);

    await screen.findByTestId('sidebar-tag-link-React');

    // 輸入搜尋關鍵字
    const searchInput = screen.getByTestId('sidebar-search-input');
    await user.type(searchInput, 'graphql');

    await waitFor(() => {
      expect(screen.getByTestId('sidebar-search-empty')).toHaveTextContent('未找到相關文章');
    });
  });
});