import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Sidebar from '@/components/Sidebar';
import { sidebarLink } from '@/config/sidebarLinkSetting';

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, onClick, ...props }: { href: string; children: ReactNode; onClick?: () => void }) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe('Sidebar', () => {

  it('測試側邊欄在打開時是否正確渲染', () => {
    render(<Sidebar isOpen={true} />);

    expect(screen.getByTestId('sidebar-root')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-links')).toBeInTheDocument();

    for (const item of sidebarLink) {
      expect(screen.getByRole('link', { name: item.name })).toHaveAttribute('href', item.link);
    }
  });

  it('測試側邊欄在關閉時是否正確應用隱藏狀態的樣式', () => {
    render(<Sidebar isOpen={false} />);

    expect(screen.getByTestId('sidebar-root')).toHaveClass('-translate-x-full', 'opacity-0', 'pointer-events-none');
  });

  it('測試點擊導航連結時是否觸發 onClose 回調', () => {
    const onClose = vi.fn();
    render(<Sidebar isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('link', { name: '首頁' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});