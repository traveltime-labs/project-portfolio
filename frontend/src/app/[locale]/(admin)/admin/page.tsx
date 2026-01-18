import { Suspense } from "react";
import Content from "@/modules/admin/posts/content";

export default function Home() {
    return (
      <Suspense fallback={<div>Loading posts...</div>}>
        <Content />
      </Suspense>
    );
  }