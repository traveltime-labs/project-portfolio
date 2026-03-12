import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Breadcrumb from '@/components/Breadcrumb';

const { mockUsePathname, mockUseBreadcrumbTitle } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(),
  mockUseBreadcrumbTitle: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: mockUsePathname,
}));

vi.mock('@/providers/breadcrumb-provider', () => ({
  useBreadcrumbTitle: mockUseBreadcrumbTitle,
}));

describe('Breadcrumb', () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUseBreadcrumbTitle.mockReset();
    mockUseBreadcrumbTitle.mockReturnValue({ breadcrumbTitle: null });
  });

  it('renders mapped labels for known sidebar routes', () => {
    mockUsePathname.mockReturnValue('/category');

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-nav')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb-home-link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('分類');
  });

  it('uses breadcrumb title on blog detail pages', () => {
    mockUsePathname.mockReturnValue('/blog/hello-vitest');
    mockUseBreadcrumbTitle.mockReturnValue({ breadcrumbTitle: 'Hello Vitest Article' });

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('blog');
    expect(screen.getByTestId('breadcrumb-label-1')).toHaveTextContent('Hello Vitest Article');
    expect(screen.queryByText('hello-vitest')).not.toBeInTheDocument();
  });

  it('decodes unknown path segments before rendering', () => {
    mockUsePathname.mockReturnValue('/tags/react%20hooks');

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('標籤');
    expect(screen.getByTestId('breadcrumb-label-1')).toHaveTextContent('react hooks');
  });
});