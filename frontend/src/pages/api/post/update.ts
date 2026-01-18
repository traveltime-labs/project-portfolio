import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/pgdb";
import path from "path";
import { parseForm } from "@/lib/formidableUtils";

export const config = { api: { bodyParser: false } };

export default async function update(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);

    const id = Number(fields.id);
    if (!id) return res.status(400).json({ error: "Missing tool id" });

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1️⃣ 先取得原資料
      const oldRes = await client.query(
        "SELECT * FROM tools WHERE id = $1",
        [id]
      );

      if (oldRes.rowCount === 0) {
        throw new Error("Tool not found");
      }

      const old = oldRes.rows[0];

      // 2️⃣ 欄位處理（沒傳就用舊的）
      const title = fields.title?.[0] ?? old.title;
      const content = fields.content?.[0] ?? old.content;
      const group_id = fields.group_id
        ? Number(fields.group_id)
        : old.group_id;
      const category_id = fields.category_id
        ? Number(fields.category_id)
        : old.category_id;
      const author = fields.author?.[0] ?? old.author;
      const enable =
        fields.enable !== undefined
          ? fields.enable[0] === "true"
          : old.enable;

      // JSON 欄位
      let link = old.link;
      try {
        if (fields.link) link = JSON.parse(fields.link as string);
      } catch {}

      // 圖片（沒上傳就保留）
      let imageUrl = old.image;
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        imageUrl = `/uploads/${path.basename(file.filepath)}`;
      }

      // 3️⃣ UPDATE tools
      const updateRes = await client.query(
        `
        UPDATE tools
        SET title = $1,
            content = $2,
            group_id = $3,
            category_id = $4,
            author = $5,
            image = $6,
            enable = $7,
            link = $8::jsonb,
            updated_at = NOW()
        WHERE id = $9
        RETURNING *
        `,
        [
          title,
          content,
          group_id,
          category_id,
          author,
          imageUrl,
          enable,
          link,
          id,
        ]
      );

      // 4️⃣ tags（先清空再建）
      let tags: string[] = [];
      try {
        if (fields.tags) tags = JSON.parse(fields.tags as string);
      } catch {}

      await client.query("DELETE FROM tool_tags WHERE tool_id = $1", [id]);

      for (const tagName of tags) {
        const tagRes = await client.query(
          `INSERT INTO tags (name)
           VALUES ($1)
           ON CONFLICT (name) DO NOTHING
           RETURNING id`,
          [tagName]
        );

        let tagId = tagRes.rows[0]?.id;
        if (!tagId) {
          const existing = await client.query(
            "SELECT id FROM tags WHERE name = $1",
            [tagName]
          );
          tagId = existing.rows[0].id;
        }

        await client.query(
          "INSERT INTO tool_tags (tool_id, tag_id) VALUES ($1, $2)",
          [id, tagId]
        );
      }

      await client.query("COMMIT");

      return res.status(200).json({ post: updateRes.rows[0] });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      return res.status(500).json({ error: "Database update error" });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Form parse error" });
  }
}
