import formidable, { File } from "formidable";
import path from "path";
import fs from "fs";

// 解析 FormData，回傳 fields 與 files
export async function parseForm(
  req: any,
  uploadDir: string = path.join(process.cwd(), "public/uploads")
): Promise<{ fields: any; files: { [key: string]: File } }> {
  // 如果資料夾不存在，建立
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      const timestamp = Date.now();
      const base = part.originalFilename?.replace(/\s+/g, "_") || "file";
      return `${base}-${timestamp}${ext}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files: files as any });
    });
  });
}
