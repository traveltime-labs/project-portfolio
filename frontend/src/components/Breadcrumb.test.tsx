import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Breadcrumb from '@/components/Breadcrumb';

const { mockUsePathname, mockUseBreadcrumbTitle } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(),
  mockUseBreadcrumbTitle: vi.fn(),
}));

// mock usePathname，因為 Breadcrumb 組件主要依賴這兩個 hook 來決定渲染內容
vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: mockUsePathname,
}));

// mock useBreadcrumbTitle，因為 Breadcrumb 組件主要依賴這兩個 hook 來決定渲染內容
vi.mock('@/providers/breadcrumb-provider', () => ({
  useBreadcrumbTitle: mockUseBreadcrumbTitle,
}));

describe('Breadcrumb', () => {
  // 在每個測試之前重置 mock 的返回值，確保測試之間不會互相影響
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUseBreadcrumbTitle.mockReset();
    mockUseBreadcrumbTitle.mockReturnValue({ breadcrumbTitle: null });
  });

  it('測試已知路由的映射標籤是否正確渲染', () => {
    // 模擬在 /category 頁面，並且 useBreadcrumbTitle 返回 null，表示沒有特定的 breadcrumbTitle
    mockUsePathname.mockReturnValue('/category');

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-nav')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb-home-link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('分類');
  });

  it('測試在 blog 詳細頁面使用 breadcrumb title', () => {
    // 模擬在 blog 詳細頁面，路徑為 /blog/hello-vitest，並且 useBreadcrumbTitle 返回一個特定的 breadcrumbTitle
    mockUsePathname.mockReturnValue('/blog/hello-vitest');
    mockUseBreadcrumbTitle.mockReturnValue({ breadcrumbTitle: 'Hello Vitest Article' });

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('blog');
    expect(screen.getByTestId('breadcrumb-label-1')).toHaveTextContent('Hello Vitest Article');
    expect(screen.queryByText('hello-vitest')).not.toBeInTheDocument();
  });

  it('測試對於未知路由，Breadcrumb 是否能夠正確解碼並渲染路徑段的文本內容', () => {
    // 模擬一個未知路由，並且路徑中包含 URL 編碼的空格（%20）
    mockUsePathname.mockReturnValue('/tags/react%20hooks');

    render(<Breadcrumb />);

    expect(screen.getByTestId('breadcrumb-label-0')).toHaveTextContent('標籤');
    expect(screen.getByTestId('breadcrumb-label-1')).toHaveTextContent('react hooks');
  });
});