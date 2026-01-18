import pool from "@/lib/pgdb";
import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/utils/apiResponse";
import { withApiHandler } from "@/utils/withApiHandler";

export const GET = withApiHandler(async (req: NextRequest) => {
    const client = await pool.connect();
    try {
        
        // 從資料庫撈取三張表格合併在一起回傳
        const [tagsResult, categoriesResult, groupsResult] = await Promise.all([
            client.query("SELECT id, name FROM tags"),
            client.query("SELECT id, name FROM categories"),
            client.query("SELECT id, name FROM groups"),
        ])

        return Response.json(success({
            tags: tagsResult.rows,
            categories: categoriesResult.rows,
            groups: groupsResult.rows,
        }), { status: 200 });

    } catch (err) {
        console.error(err);
        return Response.json(error("Database error"), { status: 500 });
    } finally {
        client.release();
    }
})


