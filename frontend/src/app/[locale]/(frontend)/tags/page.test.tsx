import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import TagsPage from './page';
import { getTagCounts } from '@/hooks/blogLists';

vi.mock('@/hooks/blogLists', async () => {
  const actual = await vi.importActual<typeof import('@/hooks/blogLists')>('@/hooks/blogLists');
  return {
    ...actual,
    getTagCounts: vi.fn(),
  };
});

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockedGetTagCounts = vi.mocked(getTagCounts);

describe('/tags page', () => {
  beforeEach(() => {
    mockedGetTagCounts.mockReset();
  });

  it('renders tag list and counts', () => {
    mockedGetTagCounts.mockReturnValue({
      react: 3,
      vitest: 1,
    });

    render(<TagsPage />);

    expect(screen.getByTestId('tags-page')).toBeInTheDocument();
    expect(screen.getByTestId('tags-title')).toHaveTextContent('標籤列表');
    expect(screen.getByTestId('tags-link-react')).toHaveAttribute('href', '/tags/react');
    expect(screen.getByTestId('tags-link-react')).toHaveTextContent('react (3)');
    expect(screen.getByTestId('tags-link-vitest')).toHaveTextContent('vitest (1)');
  });

  it('renders empty state when no tags exist', () => {
    mockedGetTagCounts.mockReturnValue({});

    render(<TagsPage />);

    expect(screen.getByTestId('tags-empty-state')).toHaveTextContent('No posts found.');
  });
});