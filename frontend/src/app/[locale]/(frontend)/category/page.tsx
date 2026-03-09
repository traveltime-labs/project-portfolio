import Content from "@/modules/frontend/category/content";
import { getAllPosts } from "@/hooks/blogLists";


// 分類
const Post = () => {
  const posts = getAllPosts();

  return (
    <Content posts={posts} />
  );
};

export default Post;



