import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';

const { mockUseTheme, mockUseTranslations } = vi.hoisted(() => ({
  mockUseTheme: vi.fn(),
  mockUseTranslations: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: vi.fn(),
}));

vi.mock('next-themes', () => ({
  useTheme: mockUseTheme,
}));

vi.mock('next-intl', () => ({
  useTranslations: mockUseTranslations,
}));

vi.mock('@/components/Breadcrumb', () => ({
  default: () => <div data-testid="breadcrumb-stub">breadcrumb</div>,
}));

describe('Header', () => {
  const setTheme = vi.fn();
  const toggleSidebar = vi.fn();

  beforeEach(() => {
    setTheme.mockReset();
    toggleSidebar.mockReset();
    mockUseTheme.mockReset();
    mockUseTranslations.mockReset();

    mockUseTheme.mockReturnValue({ theme: 'light', setTheme });
    mockUseTranslations.mockReturnValue((key: string) => {
      const messages: Record<string, string> = {
        'HomePage.title': '網站標題',
        'Menu.Home': '首頁',
        'Menu.Category': '分類',
        'Menu.Tags': '標籤',
        'Menu.About': '關於我',
        'Menu.List': '文章列表',
      };

      return messages[key] ?? key;
    });
  });

  it('測試標題、導航連結和麵包屑是否正確渲染', () => {
    render(<Header toggleSidebar={toggleSidebar} isSidebarOpen={false} />);

    expect(screen.getByTestId('header-root')).toBeInTheDocument();
    expect(screen.getByTestId('header-title-link')).toHaveAttribute('href', '/');
    expect(screen.getByTestId('header-nav-category')).toHaveAttribute('href', '/category');
    expect(screen.getByTestId('header-nav-tags')).toHaveAttribute('href', '/tags');
    expect(screen.getByTestId('header-nav-about')).toHaveAttribute('href', '/about');
    expect(screen.getByTestId('header-nav-articles')).toHaveAttribute('href', '/articles');
    expect(screen.getByTestId('header-breadcrumb')).toContainElement(screen.getByTestId('breadcrumb-stub'));
  });

  it('測試主題切換從淺色到深色', () => {
    render(<Header toggleSidebar={toggleSidebar} isSidebarOpen={false} />);

    fireEvent.click(screen.getByTestId('header-theme-toggle'));

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('測試側邊欄切換從行動裝置控制', () => {
    render(<Header toggleSidebar={toggleSidebar} isSidebarOpen={false} />);

    fireEvent.click(screen.getByTestId('header-sidebar-toggle'));

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });
});