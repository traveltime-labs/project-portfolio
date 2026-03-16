import Content from "@/modules/frontend/category/DetailContent";
import { getPostsByCategory } from "@/hooks/blogLists";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// 某個分類列表頁面
const CategoryPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getPostsByCategory(decodedSlug);

  return <Content slug={decodedSlug} posts={posts} />;
};

export default CategoryPage;



