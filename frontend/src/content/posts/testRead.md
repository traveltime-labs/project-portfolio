
# 測試用

---
title: 我的第一篇 Next.js 文章
date: 2024-05-20
category: 技術
---

[測試連結](http://localhost:3000)



![側視圖片](/blog/testRead/bitcoin-banner.jpeg)


@tailwindcss/typography
next-mdx-remote
gray-matter

Fuse.js (搜尋)：
功能： 在前端實作「模糊搜尋」，不需要後端 API 就能搜文章標題。

Google AdSense (廣告)：
方式： 直接在 React 組件中貼上 Google 提供的 `<script>` 代碼。


後端後續
Slug（文章唯一辨識碼）



## 架構
```
my-blog/
├── content/              # 存放你的文章 (Markdown/MDX 檔案)
│   ├── post-1.mdx
│   └── post-2.mdx
├── src/
│   ├── app/              # Next.js 路由 (分類頁、內頁、關於我)
│   │   ├── posts/
│   │   │   └── [slug]/   # 文章內頁動態路由
│   │   ├── category/     # 文章分類頁
│   │   └── about/        # 關於我頁面
│   ├── components/       # 共用組件 (導覽列、搜尋框、廣告版位)
│   │   ├── AdBanner.tsx  # 廣告組件
│   │   └── SearchBar.tsx # 搜尋組件
│   └── lib/              # 工具函式 (例如搜尋邏輯)
├── tailwind.config.js    # 樣式設定
├── contentlayer.config.ts # Markdown 結構定義 (標題、日期、分類)
└── next.config.js
```

```ts
console.log('test')
```

## 架構
類別,推薦技術,說明
前端框架,Next.js 14+ (App Router),目前 React 生態系的標準，支援強大的 SEO 與靜態生成。
樣式處理,Tailwind CSS,快速開發 UI，且打包後的 CSS 體積極小，有利於速度。
內容管理,Contentlayer,靈魂組件。它會監控你的 Markdown 檔案，自動轉換成 Type-safe 的 JSON 資料。
文章格式,MDX (Markdown + JSX),比純 Markdown 更強，讓你在文章中直接嵌入 React 廣告組件或圖表。
搜尋功能,Fuse.js,輕量級模糊搜尋，不需資料庫，直接在前端對文章索引進行檢索。
部署平台,Vercel,Next.js 官方部署平台，支援 GitHub 聯動，一鍵自動發布。



