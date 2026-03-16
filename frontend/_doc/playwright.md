
## 安裝 Playwright

npm init playwright@latest

## 結構

```
tests/
   example.spec.ts

playwright.config.ts
```

## 提示詞

幫我寫 playwright 測試
測試流程：

1. 進入 login page
2. 輸入帳號
3. 輸入密碼
4. 點擊 login
5. 檢查成功跳轉


或者 

請為我的 login flow 寫 playwright E2E test

流程：
1. 打開首頁
2. 點擊 login
3. 輸入 email password
4. submit
5. 確認跳轉 dashboard


## 自動錄製
1. 開瀏覽器
2. 你操作
3. 自動生成 test code

npx playwright codegen http://localhost:5173


## 測試流程

寫功能
↓
Copilot 生成 unit tests
↓
Playwright 寫 E2E tests
↓
CI 跑測試


## 測試

