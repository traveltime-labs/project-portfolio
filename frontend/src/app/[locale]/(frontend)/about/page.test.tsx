import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import AboutPage from './page';

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('/about page', () => {
  it('測試關於頁面是否正確渲染各個區塊', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByTestId('about-title')).toHaveTextContent('about');
    expect(screen.getByTestId('about-history-title')).toHaveTextContent('work history');
    expect(screen.getByTestId('timeline-root')).toBeInTheDocument();
    expect(screen.getByTestId('about-works-title')).toHaveTextContent('作品集');
    expect(screen.getAllByTestId(/about-work-card-/)).toHaveLength(6);
  });
});