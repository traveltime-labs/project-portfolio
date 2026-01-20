---
title: "testREAD.md"
date: "2024-05-20"
category: "Frontend"
excerpt: "這篇文章記錄了我從 Next-mdx-remote 切換到 Tailwind v4 的過程，以及如何解決樣式衝突問題。"
tags: ["Next.js", "Tailwind", "MDX"]
---

# 歡迎來到我的技術部落格

這是一篇使用 **Next.js 15** 渲染的測試文章。透過 `@tailwindcss/typography`，你可以看到標準的 HTML 標籤都已經自動美化了。

## 1. 為什麼選擇 Next-mdx-remote？

在比較了多個套件後，我發現它最具備靈活性：
* **輕量化**：不影響編譯速度。
* **可擴充**：未來可以輕鬆對接 .NET API。
* **穩定性**：在 Next.js 大版本更新時不容易壞掉。

---

## 2. 程式碼區塊測試

這裡測試我們之前討論的語法高亮功能：

```typescript
// src/lib/mdx.ts
export async function getPostBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return matter(fileContent);
}
```

## 3. 表格測試

套件名稱	用途	推薦指數
Next.js 15	核心框架	⭐⭐⭐⭐⭐
Tailwind v4	樣式系統	⭐⭐⭐⭐⭐
Consola	Log 工具	⭐⭐⭐⭐
		
		

## 4. 圖片測試

---

### 💡 小建議：如何讓你的文章列表更好看？

你在 `read.md` 裡面加了 `excerpt` (摘要) 和 `tags`。你可以修改你之前寫的文章列表組件，讓它顯示這些資訊：

1.  **摘要**：在卡片上顯示前兩行文字，增加點擊慾望。
2.  **標籤**：在標題下方放幾個彩色的小標籤（Badge），讓分類更清晰。


**你的畫面上現在能正確顯示這篇文章了嗎？如果表格或程式碼看起來還是「素素的」，可能是我們之前的 `prose` 設定還需要調整一點點。**