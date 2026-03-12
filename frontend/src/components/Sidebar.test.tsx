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
  it('renders sidebar links when open', () => {
    render(<Sidebar isOpen={true} />);

    expect(screen.getByTestId('sidebar-root')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-links')).toBeInTheDocument();

    for (const item of sidebarLink) {
      expect(screen.getByRole('link', { name: item.name })).toHaveAttribute('href', item.link);
    }
  });

  it('applies hidden state classes when closed', () => {
    render(<Sidebar isOpen={false} />);

    expect(screen.getByTestId('sidebar-root')).toHaveClass('-translate-x-full', 'opacity-0', 'pointer-events-none');
  });

  it('calls onClose when a navigation link is clicked', () => {
    const onClose = vi.fn();
    render(<Sidebar isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('link', { name: '首頁' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});