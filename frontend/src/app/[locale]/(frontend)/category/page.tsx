import Content from "@/modules/frontend/category/content";
import { getAllPosts } from "@/hooks/blogLists";


// 分類
const Post = () => {
   const posts = getAllPosts()
     .filter((p) => p.category && p.category.toLowerCase() === "uncategorized")
     .map((p) => ({
       ...p,
       content: (p as any).content || '',
       tags: (p as any).tags || [],
       group: (p as any).group || '',
       image: (p as any).image || p.cover || '',
     }));
  return (
    <Content posts={posts} />
  );
};

export default Post;



