"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

interface Post {
  slug: string;
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  cover?: string;
}

export default function InnerSideBar() {
  const categories = ["程式語言", "框架", "工具", "專案進度"];
  const [searchInput, setSearchInput] = useState("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 從API獲取文章列表
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const result = await response.json();
        setAllPosts(result.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // 模糊搜尋邏輯
  const searchResults = useMemo(() => {
    if (!searchInput.trim()) return [];
    
    const query = searchInput.toLowerCase();
    return allPosts.filter((post) => {
      const title = (post.title || "").toLowerCase();
      const category = (post.category || "").toLowerCase();
      const excerpt = (post.excerpt || "").toLowerCase();
      
      return title.includes(query) || category.includes(query) || excerpt.includes(query);
    });
  }, [searchInput, allPosts]);
  const socials = [
    { name: 'GitHub', href: 'https://github.com', icon: <FaGithub /> },
    { name: 'Linkedin', href: 'https://linkedin.com', icon: <FaLinkedin /> },
    { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebookSquare /> },
  ];


  // search

  return (
    <aside className="space-y-6 mt-6 mx-auto container lg:max-w-[300px]">
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


      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center">
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
      <div className="rounded-2xl">
        <label className="block text-xs text-slate-500 mb-2 trasnition-colors">搜尋文章</label>
        <div className="flex relative">
          <input
            placeholder="輸入關鍵字"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="dark:bg-slate-800 flex-1 rounded-l-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none"
          />
          {searchInput && (
            <ul className="absolute top-10 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <li key={post.slug} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <Link href={`/blog/${post.slug}`} className="block text-sm text-slate-700 dark:text-slate-300">
                      <div className="font-medium">{post.title || post.slug}</div>
                      {post.category && <div className="text-xs text-slate-500">[{post.category}]</div>}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-sm text-slate-500 text-center">未找到相關文章</li>
              )}
            </ul>
          )}
          
          <button className="bg-blue-600 text-white px-3 py-2 rounded-r-lg text-sm hover:bg-blue-700">搜尋</button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border dark:bg-slate-800  border-slate-200 rounded-2xl p-4 hidden lg:block">
        <h4 className="text-sm transition-colors font-semibold mb-3">文章分類</h4>
        <ul className="space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c} className="flex items-center justify-between">
              <Link href={`/?category=${encodeURIComponent(c)}`} className="text-slate-700 transition-colors hover:text-blue-600">{c}</Link>
              <span className="text-xs text-slate-400">3</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent posts (placeholder) */}
      <div className="bg-white dark:bg-slate-800  border border-slate-200 rounded-2xl p-4 hidden lg:block">
        <h4 className="text-sm transition-colors font-semibold mb-3">近期文章</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>
            <Link href="/blog/testRead" className="hover:text-blue-600 transition-colors">如何建立一個乾淨的前端專案結構</Link>
          </li>
          <li>
            <Link href="/blog/testRead2" className="hover:text-blue-600 transition-colors">用 Vite + React 加速開發</Link>
          </li>
          <li>
            <Link href="/blog/testRead3" className="hover:text-blue-600 transition-colors">部署與 CI/CD 快速入門</Link>
          </li>
        </ul>
      </div>

      {/* Mini widget */}
      {/* <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm text-slate-500">
        天氣：待串接 API
      </div> */}
    </aside>
  );
}
  