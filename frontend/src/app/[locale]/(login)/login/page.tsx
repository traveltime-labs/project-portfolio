
import Content from "@/modules/login/content";
import { Suspense } from "react";

// 登入入口
function LoginPage () {
    return (
        <Suspense fallback={<div>Loading </div>}>
            <Content />
        </Suspense>
    )
}

export default LoginPage;