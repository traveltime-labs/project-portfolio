import Content from "@/modules/frontend/blog/content";
import { Metadata } from "next";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

// 新增SEO meta 標籤:  src/app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. 讀取 md 檔案內容
  const filePath = path.join(process.cwd(), "src", "content", "posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  // 2. 回傳 SEO 設定
  return {
    title: data.title,
    description: data.excerpt || "閱讀更多關於 " + data.title,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      type: "article",
      publishedTime: data.date,
      // 如果你有放圖片在 public/blog/slug/cover.jpg
      images: [`/blog/${slug}/cover.jpg`], 
    },
  };
}


// 文章內文: 自動收到 params, 將參數往內傳
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 你必須把 params 傳下去
  return <Content params={params} />;
}