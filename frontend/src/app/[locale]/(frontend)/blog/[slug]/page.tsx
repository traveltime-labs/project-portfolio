import Content from "@/modules/frontend/blog/content";

// 文章內文
// 只有這個 page.tsx 會自動收到 params, 將參數往內傳
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 你必須把 params 傳下去
  return <Content params={params} />;
}