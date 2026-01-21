/**
 * 清單/地圖
Sitemap 是一個 XML 檔案，它列出了你網站上所有重要的頁面網址。
功能：主動告訴 Google：「這裏有這些頁面，請來爬取（Crawl）它們。」
優點：確保 Google 不會遺漏你藏得很深的文章。 
自動生成 /sitemap.xml
部署上線後，記得去 Google Search Console 提交 Sitemap 網址。
啟動 npm run dev 後，手動訪問 localhost:3000/sitemap.xml 和 localhost:3000/robots.txt。
如果能看到正確的 XML 和文字內容，就代表成功了！
Google Search Console(GSC)：網站部署上線後，記得去 Google Search Console 提交 Sitemap 網址。

 */



// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  //const baseUrl = 'https://your-domain.com' // 需要定義線上的網址
  const baseUrl = 'http://localhost:3000'

  // 1. 取得所有文章的 Slug
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const postUrls = fileNames.map((fileName) => ({
    url: `${baseUrl}/blog/${fileName.replace(/\.md$/, '')}`,
    lastModified: new Date(), // 如果能抓到檔案修改時間更好
    changeFrequency: 'weekly' as const, // 抓取頻率的時間
    priority: 0.8,
  }))

  // 2. 合併固定頁面（如首頁、關於我）
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...postUrls,
  ]
}