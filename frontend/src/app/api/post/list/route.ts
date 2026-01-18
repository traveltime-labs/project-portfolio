import pool from "@/lib/pgdb";
import { NextRequest } from "next/server";
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";

export const GET = withApiHandler(async (request: NextRequest) => {
    const client = await pool.connect();
    try {
        const r = await client.query("SELECT id, title, author, content, group_id, category_id, image, enable, link, stats, created_at, updated_at FROM tools ORDER BY created_at DESC");
        return Response.json(success(r.rows), { status: 200 } );
    } catch (e) {
        console.error(e)
        return Response.json(error("Database error"), { status: 500 });
    } finally {
        client.release();
    }
})
