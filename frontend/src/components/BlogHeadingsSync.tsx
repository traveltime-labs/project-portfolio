'use client';

import { useEffect } from 'react';

import type { ArticleHeading } from '@/lib/blogHeadings';
import { useArticleToc } from '@/providers/article-toc-provider';

type BlogHeadingsSyncProps = {
  headings: ArticleHeading[];
};

export default function BlogHeadingsSync({ headings }: BlogHeadingsSyncProps) {
  const { setHeadings } = useArticleToc();

  useEffect(() => {
    setHeadings(headings);

    return () => {
      setHeadings([]);
    };
  }, [headings, setHeadings]);

  return null;
}