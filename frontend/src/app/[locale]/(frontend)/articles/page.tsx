// import FrontendUIWrapper from "@/components/frontend/FrontendUIWrapper";
import Content from "@/modules/frontend/articles/content";
import { getAllPosts } from "@/hooks/blogLists";
// 文章列表
const Articles = () => {
  const posts = getAllPosts();

  return (
    <Content posts={posts} />
  );
};

export default Articles;



