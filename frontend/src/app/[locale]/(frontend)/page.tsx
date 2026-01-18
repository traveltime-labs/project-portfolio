import Content from "@/modules/frontend/home/content";
import { Suspense } from "react";

// 首頁：列表
export default function Home() {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <Content />
    </Suspense>
  );
}
