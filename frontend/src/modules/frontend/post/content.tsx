"use client";

import Post from "@/components/frontend/post";
import { useRouter, useParams } from "next/navigation";
import useQueryPost from "@/hooks/use-query-post";

// 文章詳細頁面
const Content = () => {
  const router = useRouter();
  const {id} = useParams();
  console.log(id)
  const { data, isLoading, error} = useQueryPost();

  return (
    <div>
      <button onClick={() => router.back()} className="text-sm text-dark dark:text-white font-bold">
        {"← Back"}
      </button>
      <Post post={data} />
    </div>
  );
};

export default Content;
