import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/pgdb";
import path from "path";
import { parseForm } from "@/lib/formidableUtils";

// 由於 app 無法使用 NextApiRequest 與 NextApiResponse，改用 Pages API Route 實作


// 使用 Pages API Route，需要關閉 body 解析 
export const config = { api: { bodyParser: false } };

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // 解析 FormData
    const { fields, files } = await parseForm(req);

    console.log(fields)

    // 解析欄位
    const title = fields.title[0] as string;
    const content = fields.content[0] as string;
    const group_id = parseInt(fields.group_id as string, 10);
    const category_id = parseInt(fields.category_id as string, 10);
    const author = fields.author[0] || "Wendy";
    const enable = fields.enable[0] !== "false";

    // JSON 欄位
    let tags: string[] = [];
    try {
      if (fields.tags) tags = JSON.parse(fields.tags as string);
    } catch {
      tags = [];
    }

    let link: any = {};
    try {
      if (fields.link) link = JSON.parse(fields.link as string);
    } catch {
      link = {};
    }

    if (!title || !group_id || !category_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 處理圖片
    let imageUrl = "/default-image.png";
    if (files.image) {
      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      imageUrl = `/uploads/${path.basename(file.filepath)}`;
    }

    // 預設點擊次數
    const stats = { views: 0, clicks: 0 };

    // 連線資料庫
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // 開始交易

      // 1. 處理工具列表
      const toolRes = await client.query(
        `INSERT INTO tools
          (title, content, group_id, category_id, author, created_at, updated_at, image, enable, link, stats)
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW(),$6,$7,$8::jsonb,$9::jsonb)
         RETURNING *`,
        [title, content, group_id, category_id, author, imageUrl, enable, link, stats]
      );

      const tool = toolRes.rows[0];
      const toolId = tool.id;

      // 2. 處理 tags
      for (const tagName of tags) {
        // 先插入 tag，如果已存在就忽略
        const tagRes = await client.query(
          `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
          [tagName]
        );

        let tagId;
        if (tagRes.rows.length > 0) {
          tagId = tagRes.rows[0].id;
        } else {
          // 已存在的 tag 拿 id
          const existing = await client.query(`SELECT id FROM tags WHERE name = $1`, [tagName]);
          tagId = existing.rows[0].id;
        }

        // 建立 tool_tags 關聯
        await client.query(`INSERT INTO tool_tags (tool_id, tag_id) VALUES ($1, $2)`, [toolId, tagId]);
      }

      await client.query("COMMIT"); // 全部成功才真的寫入資料庫

      return res.status(201).json({ post: tool });
    } catch (dbErr) {
      await client.query("ROLLBACK"); // 發生錯誤回到 begin 前的狀態, 不回寫入
      console.error(dbErr);
      return res.status(500).json({ error: "Database insert error" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Form parse error" });
  }
}
