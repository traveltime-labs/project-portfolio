'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { ArticleHeading } from '@/lib/blogHeadings';

type ArticleTocContextValue = {
  headings: ArticleHeading[];
  setHeadings: (headings: ArticleHeading[]) => void;
};

const ArticleTocContext = createContext<ArticleTocContextValue | null>(null);

export function ArticleTocProvider({ children }: { children: ReactNode }) {
  const [headings, setHeadings] = useState<ArticleHeading[]>([]);
  const value = useMemo(() => ({ headings, setHeadings }), [headings]);

  return <ArticleTocContext.Provider value={value}>{children}</ArticleTocContext.Provider>;
}

export function useArticleToc() {
  const context = useContext(ArticleTocContext);

  if (!context) {
    throw new Error('useArticleToc must be used within ArticleTocProvider');
  }

  return context;
}