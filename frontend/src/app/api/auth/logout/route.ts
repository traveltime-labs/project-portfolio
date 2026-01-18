import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withApiHandler } from "@/utils/withApiHandler";
import { success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import { error } from "console";

// 假模擬
export async function POST() {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", "", { path: "/", maxAge: 0 });

    return Response.json(success('登出成功'), { status: 200 });
  }

