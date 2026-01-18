import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withApiHandler } from "@/utils/withApiHandler";
import { success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import { error } from "console";

export const POST = withApiHandler(async (req: NextRequest) => {
    const { account, password } = await req.json();
    // 假登入
     if ( account === 'admin' && password === '123456') {
      const cookieStore = await cookies();
      // 簡易寫cookie方法
      cookieStore.set("auth_token", "true", {
        httpOnly: true,
        path: "/",
      });
      // 回應格式
    return Response.json(success('登入成功'), { status: 200 });
     }

    return Response.json(error('登入異常'), { status: 401 });
})

