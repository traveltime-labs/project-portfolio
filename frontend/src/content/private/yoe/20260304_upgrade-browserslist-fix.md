---
title: "ios13舊裝置無法使用調整"
date: "2026-03-04"
category: "yoe"
excerpt: "紀錄調整方向"
tags: ["device", "vue2", "webpack"]
---


# 原因
2026/03/03 同事拿了一隻非常舊的系統裝置做測試, 發現無法起單及兌換,
當中也發現有些日期顯示異常狀況, 一併調整

## 檢查清單
列出現在可以相容的清單
```
npx browserslist
```

## browserslist 升等
```
npx update-browserslist-db@latest
```

遇到相關問題 記錄在底下 [修復紀錄](#升級 browserslist-db 後修復紀錄)

## 安裝
```
npm install @babel/runtime-corejs3 --save-dev

```

### 調整方向

非同步導致畫面不釋放
1. 引用 i18nInitCookie 設定為 defer

browserslist 多加了一條
```
"browserslist": [
    "last 2 version",
    "> 0.5%",
    "not dead",
    "ios_saf >= 13"
],
```

### 不支援語法 需向下相容

安裝
```
npm install @babel/runtime-corejs3 --save
```
之所以加上 "ios_saf >= 13" 後才噴錯，是因為 Babel 偵測到 iOS 13 缺乏許多現代功能（例如 URL 對象或物件屬性定義），因此它試圖從 @babel/runtime-corejs3 引入補丁（Polyfills）。


.babelrc
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3,
        "targets": "defaults, ios_saf >= 13" 
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

## 日期顯示異常修正

iOS（尤其 iOS 15 以下的 WebKit）的 new Date() 不支援 YYYY-MM-DD HH:mm:ss 這種空格分隔格式，\
只認識 ISO 8601 的 T 分隔符。

```
new Date('2024-12-31 16:45:00.000')
// iOS → Invalid Date → NaN
// Chrome/Node → 正常
```

toISOString helper 只做一件事：把第一個空格換成 T，不影響其他邏輯，也不需要引入額外套件。
如果後端回傳的字串本來就有 T，replace(' ', 'T') 不會動它，安全無副作用。

```
const toISOString = (str) => str ? String(str).replace(' ', 'T') : ''
// const startTime = new Date(toISOString(data.贈送開始時間)); // 2024-12-17 16:45:00.000
const endTime = new Date(toISOString(data.遊戲活動圖片結束時間)); //   2024-12-31 16:45:00.000
const now = new Date();
```



## 升級 browserslist-db 後修復紀錄

**日期：** 2026-03-04  
**觸發原因：** 執行 `npx update-browserslist-db@latest` 後網頁無法載入，畫面卡在 loading 不釋放

---

## 問題一：`.babelrc` 雙重 Polyfill 衝突（根本原因）

### 問題描述

`.babelrc` 同時啟用兩套 polyfill 機制，升級後兩者產生衝突：

| 設定 | 作用 |
|------|------|
| `preset-env` 的 `useBuiltIns: "usage"` + `corejs: 3` | 直接把 core-js 模組 inline 注入每個檔案 |
| `plugin-transform-runtime` + `@babel/runtime-corejs3` | 改用 runtime helpers 包裝 import 與 async 邏輯 |

衝突導致動態 `import()` 的 CJS module 被雙重包裝，`module.default` 變成 namespace object 而非 function，引發：

```
Uncaught (in promise) TypeError: dayjs is not a function
    at isActive (store.js:211)
    at Store.isShowBanner (store.js:209)
    at Store.getLoadData (store.js:182)
```

### 修正：`clientcode/.babelrc`

```jsonc
// 修正前
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",   // ← 與 transform-runtime 衝突
      "corejs": 3               // ← 移除
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
      "helpers": true,
      "regenerator": true,
      "useESModules": false
      // ← 沒有 corejs，導致兩套系統並存
    }]
  ]
}

// 修正後
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": false      // ← 關閉，交由 transform-runtime 統一處理
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
      "helpers": true,
      "regenerator": true,
      "corejs": 3,              // ← 由此統一處理 polyfill（需安裝 @babel/runtime-corejs3）
      "useESModules": false
    }]
  ]
}
```

> **原則：** `useBuiltIns` 與 `@babel/plugin-transform-runtime` 的 `corejs` 只能擇一使用。

---

## 問題二：動態載入 CJS module 的 interop 防護

### 問題描述

即使 `.babelrc` 修正後，`getDayJsPlugin` 直接回傳 `module.default`，在某些 Babel 版本/打包狀況下可能拿到 namespace object 而非 function。

### 修正：`clientcode/src/assets/js/base/loadPlugin.js`

#### `getDayJsPlugin`

```js
// 修正前
DayJsInstance = import('../lib/dayjs.min.js').then(module => {
  return module.default
})

// 修正後
DayJsInstance = import('../lib/dayjs.min.js').then(module => {
  const d = module.default;
  if (typeof d === 'function') return d;
  if (d && typeof d.default === 'function') return d.default;
  return module;
})
```

#### `getCurrentDevicePlugin`

```js
// 修正前
deviceInstance = import('../lib/current-device.js').then(r => r.default)

// 修正後
deviceInstance = import('../lib/current-device.js').then(module => {
  const d = module.default;
  if (typeof d === 'function' || (d && typeof d === 'object')) return d;
  if (d && typeof d.default !== 'undefined') return d.default;
  return module;
})
```

---

## 問題三：Razor Layout script 載入異常

### 問題描述

部分 Shared Layout 的 `<script>` 有以下問題，導致關鍵 chunk 請求失敗或初始化順序錯誤，畫面 `#header`、`.wp`、`#footer` 維持 `display: none` 不釋放：

| 問題 | 影響頁面 |
|------|---------|
| script `src` 路徑尾端有空白（`*.min.js "`），ASP.NET Core 產生帶空白的 URL 造成 404 | `_MemberCenterLayout.cshtml`、`_NewsContentLayout.cshtml` |
| `i18nInitCookie.min.js` 加了 `defer`，但後續的 `592.min.js`、`main.min.js` 是同步載入且依賴 i18n 初始化 | `_MemberCenterLayout.cshtml`、`_ProductLayout.cshtml` |
| `member.min.js` 在 `runtime.min.js` 前載入，webpack runtime 尚未就緒就執行 chunk | `_MemberCenterLayout.cshtml` |

### 修正：`Views/Shared/_MemberCenterLayout.cshtml`

```html
<!-- 修正前 -->
<script defer src="~/js/i18nInitCookie.min.js " asp-append-version="true"></script>
<script src="~/js/592.min.js " asp-append-version="true"></script>
<script src="~/js/member.min.js" asp-append-version="true"></script>
<script src="~/js/runtime.min.js" asp-append-version="true"></script>

<!-- 修正後 -->
<script src="~/js/i18nInitCookie.min.js" asp-append-version="true"></script>
<script src="~/js/592.min.js" asp-append-version="true"></script>
<script src="~/js/runtime.min.js" asp-append-version="true"></script>
<script src="~/js/member.min.js" asp-append-version="true"></script>
```

### 修正：`Views/Shared/_NewsContentLayout.cshtml`

```html
<!-- 修正前 -->
<script src="~/js/i18nInitCookie.min.js " asp-append-version="true"></script>
<script src="~/js/592.min.js " asp-append-version="true"></script>

<!-- 修正後 -->
<script src="~/js/i18nInitCookie.min.js" asp-append-version="true"></script>
<script src="~/js/592.min.js" asp-append-version="true"></script>
```

### 修正：`Views/Shared/_ProductLayout.cshtml`

```html
<!-- 修正前 -->
<script defer src="~/js/i18nInitCookie.min.js" asp-append-version="true"></script>

<!-- 修正後 -->
<script src="~/js/i18nInitCookie.min.js" asp-append-version="true"></script>
```

---

## 正確的 script 載入順序（所有 Layout 應遵循）

```
i18nInitCookie.min.js   ← 語系初始化，不可 defer
592.min.js              ← vue / vuex / axios / core-js
runtime.min.js          ← webpack runtime chunk（必須最先於其他 chunk）
[member.min.js]         ← 會員專區專用，在 runtime 之後
mixins.min.js
main.min.js             ← 頁面入口
```

---

## 相關套件版本

```
@babel/core
@babel/preset-env
@babel/plugin-transform-runtime
@babel/runtime-corejs3   ← 新安裝
core-js@3
```
