# Google Search Console 與 Google Tag Manager 設定指南

---

## Google Search Console（GSC）- SEO 用

### 是什麼
監控你的網站在 Google 搜尋結果的表現。

### 主要功能
- ✓ 檢查網站有沒有被 Google 收錄
- ✓ 查看哪些關鍵字帶來流量
- ✓ 發現 SEO 問題（爬蟲錯誤、404、重複內容）
- ✓ 提交 sitemap 加速收錄

---

### 如何設定

#### 1. 前往 Google Search Console
https://search.google.com/search-console

#### 2. 新增資源
- 輸入你的網址：`https://yourdomain.com`
- 或選擇「網域」（需要驗證 DNS）

#### 3. 驗證擁有權
可選擇以下方法之一：
- **方法一**：上傳 HTML 檔案到網站根目錄
- **方法二**：在 `<head>` 加入 meta tag
- **方法三**：用 Google Analytics 驗證
- **方法四**：DNS 驗證（推薦，一勞永逸）

#### 4. Next.js 用 meta tag 驗證（最簡單）

在 `app/layout.tsx`：

```typescript
// <meta name="google-site-verification" content="RuIq0qucsMix2kGhgEx_dXql8Berm4NxleEW_oJ84hs" />
// google: content
export const metadata = {
  verification: {
    google: 'your-verification-code-here',  // ← GSC 給你的驗證碼
  },
}
```

#### 5. 提交 Sitemap

Next.js 自動產生 sitemap，在 `app/sitemap.ts`：

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
    },
    {
      url: 'https://yourdomain.com/zh/admin',
      lastModified: new Date(),
    },
    // ... 其他頁面
  ]
}
```

然後在 GSC 提交：
```
左側選單 → Sitemap → 輸入 https://yourdomain.com/sitemap.xml
```

---

### 如何看 SEO 設定有沒有問題

#### 成效報表（最常看）
```
GSC 左側 → 成效
→ 看到：點擊次數、曝光次數、點閱率、平均排名
```

#### 涵蓋範圍（檢查爬蟲）
```
GSC 左側 → 涵蓋範圍
→ 綠色：已建立索引（正常）
→ 紅色：錯誤（需要修）
→ 黃色：警告
```

#### 網頁體驗
```
GSC 左側 → 網頁體驗
→ 檢查 Core Web Vitals（載入速度）
```

---

## Google Tag Manager（GTM）- 追蹤用

### 是什麼
管理網站上的追蹤碼（GA、FB Pixel、各種事件）。

### 主要功能
- ✓ 統一管理所有追蹤碼
- ✓ 不用改程式碼就能加追蹤
- ✓ 追蹤用戶行為（點擊、滾動、表單提交）

---

### 如何看 GTM 有沒有正常運作

#### 方法一：GTM Preview Mode（最推薦）

1. 進入 GTM 後台：https://tagmanager.google.com
2. 右上角點「Preview」（預覽）或者  建立帳戶和容器
第一次:
→ 建立帳戶
   帳戶名稱：你的公司/專案名稱
   國家/地區：台灣

→ 設定容器
   容器名稱：your-project.vercel.app
   目標平台：選「網頁」
   
→ 建立

產生一些代碼
```
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NLM295VT');</script>
<!-- End Google Tag Manager -->
```
```
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NLM295VT"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```
取得GTM: GTM-NLM295VT

→ 會跳出安裝說明（先關掉，我們用 Next.js 的方式裝）

3. 輸入你的網站網址 `http://localhost:3000`
4. 會開一個新視窗，底部有 GTM Debug Panel
GTM-XXXXXX  ← 這就是你的 GTM ID

5. 在網站上操作（註冊、登入）
6. Debug Panel 會即時顯示：
   - ✓ 觸發了哪些事件（`user_register`、`login`）
   - ✓ 哪些代碼被執行
   - ✓ dataLayer 的內容

7. 在 Next.js 安裝 GTM



```
npm install @next/third-parties
```

```
import { GoogleTagManager } from '@next/third-parties'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleTagManager gtmId="GTM-XXXXXX" />  {/* ← 貼上你的 ID */}
      </body>
    </html>
  )
}
```

#### 方法二：瀏覽器 Console

打開 DevTools Console，輸入：

```javascript
window.dataLayer
```

會看到類似：

```javascript
[
  { event: 'gtm.js', ... },
  { event: 'user_register', method: 'email', user_id: '123' },
  { event: 'page_view', page_path: '/zh/admin' }
]
```

---

#### 方法三：Google Tag Assistant（Chrome 擴充套件）

1. 安裝：https://chrome.google.com/webstore  
   搜尋 "Tag Assistant Legacy"
2. 點擊擴充套件圖示 → Enable → 重新整理頁面
3. 會顯示頁面上所有的 Google 追蹤碼：
   - ✓ GTM 容器是否載入
   - ✓ GA4 是否正常
   - ✓ 有沒有錯誤

---

### GTM 常見問題排查

#### 問題一：GTM 沒載入

檢查 `layout.tsx` 有沒有加：

```typescript
import { GoogleTagManager } from '@next/third-parties/google'

<GoogleTagManager gtmId="GTM-XXXXXX" />
```

#### 問題二：事件沒觸發

在 Console 檢查 dataLayer：

```javascript
window.dataLayer
// 如果是空的或沒有你的事件，檢查程式碼有沒有 push
```

#### 問題三：GTM Preview 連不上

- 檢查有沒有 AdBlocker 擋掉
- 確認網站是 `http://localhost:3000`（不是 https）

---

## 兩者的差別

| | Google Search Console | Google Tag Manager |
|---|---|---|
| **用途** | SEO 監控 | 用戶行為追蹤 |
| **看什麼** | 搜尋排名、爬蟲狀況 | 用戶點擊、轉換 |
| **何時看** | 每週/每月（長期） | 每天（即時） |
| **需要流量** | 需要（要有人搜尋） | 不需要（開發就能測） |

---

## 快速總結

### GSC（SEO）
- 網站上線後才有用
- 主要看「成效」和「涵蓋範圍」
- 提交 sitemap 加速收錄

### GTM（追蹤）
- 現在就能測試
- 用 Preview Mode 即時看事件
- Console 檢查 `window.dataLayer`