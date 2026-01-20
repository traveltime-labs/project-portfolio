

/**
 * 前台外殼 - 中間層(路由佈局 Route Layout)
 * 它決定了前台長什麼樣子（例如：要有 Header 和 Footer）。
 * 它是一個 Server Component。為了 SEO，它負責把 Metadata 定義好，然後把內容傳給下一層。
 * 定義 SEO 和 靜態組件。這是 Google 爬蟲會看到的地方。
 */

import type { Metadata } from "next";
import FrontendUIWrapper from "@/components/FrontendUIWrapper";

export const metadata: Metadata = {
  title: "toolkit",
  //description: "各式各樣的線上工具組",
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <FrontendUIWrapper>
      {children}
    </FrontendUIWrapper>
  );
}