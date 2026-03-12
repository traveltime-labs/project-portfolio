'use client';

import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import type { ArticleHeading } from '@/lib/blogHeadings';

type BlogTableOfContentsProps = {
  headings: ArticleHeading[];
};

export default function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);

    if (visibleEntries[0]?.target.id) {
      setActiveId(visibleEntries[0].target.id);
    }
  }, []);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      handleIntersect(entries);
    }, {
      rootMargin: '-128px 0px -55% 0px',
      threshold: [0, 1],
    });

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80" data-testid="blog-toc">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500" data-testid="blog-toc-title">
        文章目錄
      </div>
      <nav aria-label="文章目錄">
        <ul className="space-y-1.5" data-testid="blog-toc-list">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;

            return (
              <li
                key={heading.id}
                className={cn(
                  heading.level === 3 && 'pl-3',
                  heading.level === 4 && 'pl-6',
                )}
              >
                <a
                  href={`#${heading.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100',
                    isActive && 'bg-slate-100 font-medium text-slate-900 dark:bg-slate-900 dark:text-slate-100',
                  )}
                  data-testid={`blog-toc-link-${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(heading.id);
                    if (!target) {
                      return;
                    }

                    setActiveId(heading.id);
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.replaceState(null, '', `#${heading.id}`);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}