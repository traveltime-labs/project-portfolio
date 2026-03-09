// import FrontendUIWrapper from "@/components/frontend/FrontendUIWrapper";
import Content from "@/modules/frontend/tags/DetailContent";
import { getPostsByTag } from "@/hooks/blogLists";

interface PageProps {
  params: { slug: string; locale: string };
}

// 標籤明細
const Post = ({ params }: PageProps) => {
  const slug = decodeURIComponent(params.slug);
  const posts = getPostsByTag(slug);

  return (
    <Content slug={slug} posts={posts} />
  );
};

export default Post;



