# Unit Test

## 執行指令

```bash
npm run test:unit
```

最後驗證時間：2026-03-12

驗證結果：4 個測試檔、9 個測試案例，全部通過。

## 本次補強範圍

### 1. 側欄搜尋與文章標籤

測試檔案：`src/components/InnerSidebar.test.tsx`

覆蓋案例：

- API 文章資料載入後，能正確聚合標籤數量。
- 以關鍵字搜尋文章時，只顯示符合條件的結果。
- 搜尋沒有結果時，會顯示空狀態訊息。

使用到的測試選取器：

- `sidebar-search-input`
- `sidebar-search-results`
- `sidebar-search-result-{slug}`
- `sidebar-search-empty`
- `sidebar-tags-list`
- `sidebar-tag-link-{tag}`
- `sidebar-tag-count-{tag}`

### 2. 文章列表

測試檔案：`src/modules/frontend/post-list.test.tsx`

覆蓋案例：

- 載入中狀態會顯示 loading。
- 無資料時會顯示空列表訊息。
- 有資料時會正確渲染卡片內容與連結。
- 小工具卡片導向 `post.link.page`。
- 非小工具卡片導向 `/post/{id}`。

本次新增選取器：

- `post-list-grid`
- `post-list-loading`
- `post-list-empty`
- `post-card-link-{id}`
- `post-card-image-{id}`
- `post-card-content-{id}`
- `post-card-title-{id}`
- `post-card-group-{id}`
- `post-card-author-{id}`
- `post-card-description-{id}`

### 3. 首頁文章清單

既有測試檔案：`src/modules/frontend/home/content.test.tsx`

已確認案例：

- 有文章時會顯示首頁文章卡片與摘要。
- 沒有文章時會顯示空狀態。

## 修正摘要

本次為了讓單元測試穩定執行，補上最小必要的 `data-testid`：

- `src/components/InnerSidebar.tsx`：新增搜尋無結果狀態選取器。
- `src/modules/frontend/post-list.tsx`：新增文章列表容器、loading、empty 選取器。
- `src/components/frontend/postCard.tsx`：新增卡片內容與連結選取器。

## 驗證清單

- [x] 側欄搜尋可依關鍵字篩出文章
- [x] 側欄搜尋無結果時顯示空狀態
- [x] 側欄文章標籤數量聚合正確
- [x] 文章列表 loading 狀態正確
- [x] 文章列表 empty 狀態正確
- [x] 文章列表卡片內容與跳轉連結正確
- [x] 既有首頁文章清單測試未被破壞