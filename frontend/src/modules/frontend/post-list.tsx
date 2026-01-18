"use client";

import { usePostList } from '@/hooks/frontend/postList';
import PostCard from "@/components/frontend/postCard";

// 文章列表頁面
const PostList = () => {
  const {t, isLoading, posts} = usePostList()
  return (
    <>
    {/* <div className="pt-4 text-center">
      ui元件, 小工具
    </div> */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-4 lg:mx-0">
      {isLoading && <div>Loading...</div>}
      {/* {error && <div> {error.message} </div>} */}
      {!isLoading && posts.length === 0 && <div>No posts found.</div>}
      {!isLoading && posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
    {/* 
      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    */}
    </>
  );
};

export default PostList;
