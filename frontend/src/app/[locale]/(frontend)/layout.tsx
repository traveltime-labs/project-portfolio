

/**
 * 前台外殼 - 中間層(路由佈局 Route Layout)
 * 入口處 前台的主要外殼
 * 是一個 Server Component。
 * 為了 SEO，它負責把 Metadata 定義好，然後把內容傳給下一層。
 * 定義 SEO 和 靜態組件。這是 Google 爬蟲會看到的地方。
 */

import type { Metadata } from "next";
import FrontendUIWrapper from "@/components/FrontendUIWrapper";

export const metadata: Metadata = {
  title: {
    default: "TEST Blog",
    template: "%s | TEST Blog", // 子頁面標題會自動變成 "文章標題"
  },
  description: "分享 TEST BLOG",
  keywords: ["Next.js", "React", "TypeScript", "部落格"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "TEST Blog",
    description: "分享技術心得",
    url: "https://your-domain.com",
    siteName: "My Blog",
    images: [
      {
        url: "/og-image.jpg", // 放在 public 資料夾
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
};


export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <FrontendUIWrapper>
      {children}
    </FrontendUIWrapper>
  );
}