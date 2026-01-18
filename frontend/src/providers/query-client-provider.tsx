"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

/*
這段程式碼的功能是 建立一個 React Provider，
讓整個 App 都能使用 React Query 的功能（資料快取、請求狀態管理）。

白話：
放在 App 最外層的一個控制中心，讓所有子元件都能使用統一的 Query 設定與快取。
*/

export default function ReactQueryProvider({ children }: Props) {
  // 只在 component 初始化時建立 QueryClient，不會重複初始化
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
