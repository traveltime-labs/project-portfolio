import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import TimeLine from '@/components/TimeLine';

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockTimeline = [
  {
    year: '2026',
    data: [
      {
        date: '03-10',
        title: 'Launch project',
        desc: 'Released the first public version.',
        link: '/blog/launch-project',
      },
      {
        date: '03-08',
        title: 'Internal planning',
      },
    ],
  },
  {
    year: '2025',
    data: [
      {
        date: '12-20',
        title: 'Prototype',
        desc: 'Built the first prototype.',
      },
    ],
  },
];

describe('TimeLine', () => {
  it('renders timeline groups and item content', () => {
    render(<TimeLine List={mockTimeline} />);

    expect(screen.getByTestId('timeline-root')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-year-0')).toHaveTextContent('2026');
    expect(screen.getByTestId('timeline-title-0-0')).toHaveTextContent('Launch project');
    expect(screen.getByTestId('timeline-desc-0-0')).toHaveTextContent('Released the first public version.');
    expect(screen.getByTestId('timeline-link-0-0')).toHaveAttribute('href', '/blog/launch-project');
  });

  it('omits optional link and description when data is absent', () => {
    render(<TimeLine List={mockTimeline} />);

    const planningItem = screen.getByTestId('timeline-item-0-1');
    expect(within(planningItem).queryByTestId('timeline-link-0-1')).not.toBeInTheDocument();
    expect(within(planningItem).queryByTestId('timeline-desc-0-1')).not.toBeInTheDocument();
  });
});