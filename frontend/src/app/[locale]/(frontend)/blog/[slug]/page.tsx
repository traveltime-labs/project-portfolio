import Content from "@/modules/frontend/blog/content";
import { readPostFile } from "@/lib/postContent";
import { Metadata } from "next";
import matter from "gray-matter";

// 新增SEO meta 標籤:  src/app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const postFile = readPostFile(slug);
  if (!postFile) {
    return {
      title: "找不到文章",
      description: "你要查看的文章不存在或已被移除。",
    };
  }

  const { fileContent } = postFile;
  const { data } = matter(fileContent);
  const safeTitle = typeof data.title === "string" ? data.title : slug;
  const safeExcerpt = typeof data.excerpt === "string" ? data.excerpt : `閱讀更多關於 ${safeTitle}`;
  const safeDate = typeof data.date === "string" ? data.date : undefined;

  return {
    title: safeTitle,
    description: safeExcerpt,
    openGraph: {
      title: safeTitle,
      description: safeExcerpt,
      type: "article",
      publishedTime: safeDate,
      images: [`/blog/${slug}/cover.jpg`],
    },
  };
}


// 文章內文: 自動收到 params, 將參數往內傳
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 你必須把 params 傳下去
  return <Content params={params} />;
}