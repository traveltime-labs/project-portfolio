"use client"

import { Link, useRouter, usePathname } from "@/i18n/routing";
import { userLogout } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()

    // mutation 要在最頂層定義，不能在 function 裡面定義
    const { mutate: logout, isPending } = useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            console.log('登出成功')
            // 1. 清除所有 React Query 的快取，防止下一個使用者看到舊資料
            queryClient.clear();

            // 2. 登出成功後跳轉至登入頁
            router.push("/login");
        },
        onError: (error) => {
            console.error("登出失敗:", error);
            // 可以選擇在這裡跳出警告通知
        }
    });


    const handleLogout = async () => logout();

    return {
        handleLogout,
    }
}
