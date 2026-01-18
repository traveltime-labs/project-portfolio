import { useQuery } from "@tanstack/react-query"
import { getPost } from "@/services/post"
import { useParams } from "next/navigation"
// useQuery 主要處理：成功 錯誤 等狀態管理 共享數據 狀態
const useQueryPost = () => {
    const {id} = useParams();
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id as string),
    })
}

export default useQueryPost;