import Content from "@/modules/frontend/category/DetailContent";
import { getAllPosts } from "@/hooks/blogLists";

interface PageProps {
  params: { slug: string; locale: string };
}

// 某個分類列表頁面
const CategoryPage = ({ params }: PageProps) => {
 const normalized = params.slug.toLowerCase();
  const posts = getAllPosts().filter(
    (p) => (p.category || "").toString().toLowerCase() === normalized
  );

  const { slug } = params;
  return <Content slug={slug} posts={posts} />;
};

export default CategoryPage;



