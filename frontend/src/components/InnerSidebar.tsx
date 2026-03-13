"use client";

import { useState, useMemo, useEffect } from "react";
import BlogTableOfContents from '@/components/blog/BlogTableOfContents';
import { Link } from "@/i18n/routing";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { useArticleToc } from '@/providers/article-toc-provider';
import Fuse from "fuse.js";

interface Post {
  slug: string;
  title: string;
  date?: string;
  category?: string;
  excerpt?: string;
  tags?: string[];
  cover?: string;
}

const parseDateValue = (value?: string) => {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export default function InnerSideBar() {
  const { headings } = useArticleToc();
  const [searchInput, setSearchInput] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 從API獲取文章列表
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        const result = await response.json();
        setAllPosts(result.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, []);
  
  // 模糊搜尋邏輯
  const fuse = useMemo(
    () =>
      new Fuse(allPosts, {
        threshold: 0.4,
        ignoreLocation: true,
        keys: ["title", "excerpt", "category", "slug", "tags"],
      }),
    [allPosts],
  );

  const searchResults = useMemo(() => {
    if (!searchInput.trim()) return [];

    return fuse
      .search(searchInput.trim())
      .slice(0, 6)
      .map((item) => item.item);
  }, [searchInput, fuse]);

  const categories = useMemo(() => {
    return allPosts.reduce((acc, post) => {
      const category = post.category || '未分類';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [allPosts]);

  const tags = useMemo(() => {
    return allPosts.reduce((acc, post) => {
      const postTags = Array.isArray(post.tags) ? post.tags : [];
      postTags.forEach((tag) => {
        const safeTag = String(tag).trim();
        if (!safeTag) return;
        acc[safeTag] = (acc[safeTag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [allPosts]);

  const recentPosts = useMemo(() => {
    return [...allPosts]
      .sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date))
      .slice(0, 5);
  }, [allPosts]);

  const socials = [
    { name: 'GitHub', href: 'https://github.com', icon: <FaGithub /> },
    { name: 'Linkedin', href: 'https://linkedin.com', icon: <FaLinkedin /> },
    { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebookSquare /> },
  ];


  // search

  return (
    <aside className="space-y-6 mt-6 mx-auto container lg:max-w-75" data-testid="home-sidebar">
      {/* Author Card */}
    {/* <aside className="col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <div className="mx-auto h-28 w-28 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-600">W</div>
            <h3 className="mt-4 text-lg font-semibold">W — 前端工程師</h3>
            <p className="mt-2 text-sm text-slate-500">專注於前端元件、效能優化與開發者體驗。</p>

            <div className="mt-4 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <BsTelephoneFill /> <span>+886 912 345 678</span>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">技能</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <Badge key={s} className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside> */}


      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center" data-testid="sidebar-author-card">
        <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-300">W</div>
        <h3 className="mt-3 text-sm font-semibold">W - 練習用</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {/* 寫作筆記、實作記錄與專案切片。 */}
            練習用brabrabra....
        </p>
        <div className="mt-3 flex items-center justify-center space-x-3">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="text-xs text-slate-600 hover:text-blue-600">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl" data-testid="sidebar-search">
        <label className="block text-xs text-slate-500 mb-2 trasnition-colors">搜尋文章</label>
        <div className="relative">
          <input
            data-testid="sidebar-search-input"
            placeholder="輸入關鍵字"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 120)}
            className="dark:bg-slate-800 w-full rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none"
          />

          {isSearchOpen && searchInput.trim() && (
            <ul className="absolute top-10 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto" data-testid="sidebar-search-results">
              {searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <li key={post.slug} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-200 dark:border-slate-700 last:border-b-0" data-testid={`sidebar-search-result-${post.slug}`}>
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      className="block text-sm text-slate-700 dark:text-slate-300"
                      onClick={() => {
                        setSearchInput("");
                        setIsSearchOpen(false);
                      }}
                    >
                      <div className="font-medium">{post.title}</div>
                      {post.category && <div className="text-xs text-slate-500">[{post.category}]</div>}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-sm text-slate-500 text-center" data-testid="sidebar-search-empty">未找到相關文章</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className={cn('space-y-6', headings.length > 0 && 'lg:sticky lg:top-24')} data-testid="sidebar-floating-section">
        {headings.length > 0 ? (
          <div className="hidden lg:block" data-testid="sidebar-article-toc">
            <BlogTableOfContents headings={headings} />
          </div>
        ) : null}

        {/* Categories */}
        <div className="light:bg-white border dark:bg-slate-800 light:border-slate-200 rounded-2xl p-4 hidden lg:block" data-testid="sidebar-categories">
          <h4 className="text-sm transition-colors font-semibold mb-3" data-testid="sidebar-categories-title">文章分類</h4>
          <ul className="space-y-2 text-sm" data-testid="sidebar-categories-list">
            {Object.entries(categories).map(([category, count]) => (
              <li key={category} className="flex items-center justify-between" data-testid={`sidebar-category-item-${encodeURIComponent(category)}`}>
                <Link href={`/category/${encodeURIComponent(category)}`} className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300" data-testid={`sidebar-category-link-${encodeURIComponent(category)}`}>{category}</Link>
                <span className="text-xs text-slate-400" data-testid={`sidebar-category-count-${encodeURIComponent(category)}`}>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="light:bg-white border dark:bg-slate-800 light:border-slate-200 rounded-2xl p-4 hidden lg:block" data-testid="sidebar-tags">
          <h4 className="text-sm transition-colors font-semibold mb-3" data-testid="sidebar-tags-title">文章標籤</h4>
          <ul className="space-y-2 text-sm" data-testid="sidebar-tags-list">
            {Object.entries(tags).map(([tag, count]) => (
              <li key={tag} className="flex items-center justify-between" data-testid={`sidebar-tag-item-${encodeURIComponent(tag)}`}>
                <Link href={`/tags/${encodeURIComponent(tag)}`} className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300" data-testid={`sidebar-tag-link-${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
                <span className="text-xs text-slate-400" data-testid={`sidebar-tag-count-${encodeURIComponent(tag)}`}>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="light:bg-white border dark:bg-slate-800 light:border-slate-200 rounded-2xl p-4 hidden lg:block" data-testid="sidebar-recent-posts">
          <h4 className="text-sm transition-colors font-semibold mb-3" data-testid="sidebar-recent-posts-title">近期文章</h4>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300" data-testid="sidebar-recent-posts-list">
            {recentPosts.map((post) => (
              <li key={post.slug} data-testid={`sidebar-recent-post-${post.slug}`}>
                <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="hover:text-blue-600 transition-colors line-clamp-1" data-testid={`sidebar-recent-post-link-${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mini widget */}
      {/* <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm text-slate-500">
        天氣：待串接 API
      </div> */}
    </aside>
  );
}
  