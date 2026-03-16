// import FrontendUIWrapper from "@/components/frontend/FrontendUIWrapper";
import Content from "@/modules/frontend/tags/DetailContent";
import { getPostsByTag } from "@/hooks/blogLists";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// 標籤明細
const Post = async ({ params }: PageProps) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = getPostsByTag(decodedSlug);

  return (
    <Content slug={decodedSlug} posts={posts} />
  );
};

export default Post;



