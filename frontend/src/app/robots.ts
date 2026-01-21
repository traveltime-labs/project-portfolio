// 守門員: 規定爬蟲可以爬那些資料
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 針對所有爬蟲
      allow: '/',     // 允許爬取全站
      disallow: ['/admin', '/private'], // 禁止爬取特定資料夾
    },
    sitemap: 'http://localhost:3000'
    //sitemap: 'https://your-domain.com/sitemap.xml', // 告訴 Google Sitemap 在哪
  }
}