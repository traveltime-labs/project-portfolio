import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import BlogTableOfContents from '@/components/blog/BlogTableOfContents';
import type { ArticleHeading } from '@/lib/blogHeadings';

const observedElements: Element[] = [];
let observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

class MockIntersectionObserver {
  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    observerCallback = callback;
  }

  observe(element: Element) {
    observedElements.push(element);
  }

  disconnect() {
    observedElements.length = 0;
  }

  unobserve() {}

  takeRecords() {
    return [];
  }
}

const headings: ArticleHeading[] = [
  { id: 'intro', text: 'Introduction', level: 2 },
  { id: 'setup-guide', text: 'Setup Guide', level: 3 },
];

describe('BlogTableOfContents', () => {
  beforeEach(() => {
    observedElements.length = 0;
    observerCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const intro = document.createElement('section');
    intro.id = 'intro';
    intro.scrollIntoView = vi.fn();

    const setup = document.createElement('section');
    setup.id = 'setup-guide';
    setup.scrollIntoView = vi.fn();

    document.body.append(intro, setup);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders heading links and scrolls to the target on click', () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    render(<BlogTableOfContents headings={headings} />);

    const link = screen.getByTestId('blog-toc-link-setup-guide');
    fireEvent.click(link);

    const target = document.getElementById('setup-guide') as HTMLElement & { scrollIntoView: ReturnType<typeof vi.fn> };
    expect(link).toHaveAttribute('href', '#setup-guide');
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#setup-guide');
  });

  it('highlights the active heading when intersection changes', () => {
    render(<BlogTableOfContents headings={headings} />);

    expect(observedElements).toHaveLength(2);
    act(() => {
      observerCallback?.([
        {
          isIntersecting: true,
          target: document.getElementById('setup-guide') as Element,
          boundingClientRect: { top: 32 } as DOMRectReadOnly,
        } as IntersectionObserverEntry,
      ]);
    });

    expect(screen.getByTestId('blog-toc-link-setup-guide')).toHaveAttribute('aria-current', 'true');
  });
});