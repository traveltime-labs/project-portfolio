// import { useQuery } from "@tanstack/react-query"
// // import { useSearchParams } from "next/navigation"
// import { getPostList } from "@/services/post"

// const useQueryPostList = () => {
//     // const searchParams = useSearchParams()
//     // const currentPage = searchParams.get("page") || "1"

//     // useQuery 主要處理：成功 錯誤 等狀態管理 共享數據 狀態
//     console.log('useQueryPostList')
//     return useQuery({
//         queryKey: ["posts"], // 最主要的作用就是幫queryKey做快取區分
//         queryFn: getPostList
//     })
// }

// export default useQueryPostList



// hooks/admin/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostList, addPost, updatePost, deletePost } from "@/services/post";

export default function usePosts() {
  const queryClient = useQueryClient();

  // 1. 讀取列表 (Query)
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostList,
  });

  // 2. 儲存動作 (Mutation: 新增 或 編輯)
  const saveMutation = useMutation({
    mutationFn: (data: Post) => (data.id ? updatePost(data) : addPost(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // 3. 刪除動作 (Mutation)
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // 回傳所有 UI 需要的東西
  return {
    // 數據狀態
    posts,
    isLoading,
    error,

    // 執行函式
    savePost: saveMutation.mutate,
    isSaving: saveMutation.isPending,

    deletePost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}