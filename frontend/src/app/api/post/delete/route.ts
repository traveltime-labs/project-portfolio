import { NextRequest } from "next/server";
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import pool from "@/lib/pgdb";

export const DELETE = withApiHandler(async (req: NextRequest) => {
    if (req.method !== "DELETE") {
        return Response.json(error("Method not allowed"), { status: 200 } );
    }

    const body = await req.json()
    
    const { id } = body;
    if (!id) {
        return Response.json(error("Missing tool id"), { status: 400 } );
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const toolRes = await client.query(
            'DELETE FROM tools WHERE id = $1 RETURNING *',
            [id]
        )

        if (toolRes.rowCount === 0) {
            throw new Error('找不到此筆');
        }

        await client.query('COMMIT');
        return Response.json(success({
            message: '刪除成功',
        }), { status: 200 });
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
        return Response.json(error("Database error"), { status: 500 });
    } finally {
        client.release();
    }
})
