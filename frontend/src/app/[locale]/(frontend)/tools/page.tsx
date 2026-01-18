
import Content from "@/modules/frontend/tools/content";
import { Suspense } from "react";

// 分類：小工具列表頁
function ToolsList () {
    return (
        <Suspense fallback={<div>Loading posts...</div>}>
            <Content />
        </Suspense>
    )
}

export default ToolsList;