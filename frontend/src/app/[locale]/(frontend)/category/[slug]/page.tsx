import Content from "@/modules/frontend/category/DetailContent";
import { getPostsByCategory } from "@/hooks/blogLists";

interface PageProps {
  params: { slug: string; locale: string };
}

// 某個分類列表頁面
const CategoryPage = ({ params }: PageProps) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const posts = getPostsByCategory(decodedSlug);

  return <Content slug={decodedSlug} posts={posts} />;
};

export default CategoryPage;



