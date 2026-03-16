
## Code Review Prompt 
請幫我 review 這段 code
找出：
1. 潛在 bug
2. edge cases
3. performance 問題
4. 可讀性問題

## Refactor Prompt 重構提示詞
請幫我重構這段 code
要求：
- 提升可讀性
- 避免重複邏輯
- 使用 best practice
- 保持相同功能


## Test Coverage Prompt 
幫我為這個檔案生成 Vitest unit tests
要求：
- 包含 edge cases
- 100% branch coverage
- 使用 describe 分組
- 如果需要選取選擇器, 協助補 data-testid

🎯 選取器設定 — 自動補 data-testid、語義化選取器
🗂️ 假資料策略 — factory function、邊界值、TypeScript 型別
🌐 API Mock — MSW、jest.fn、loading/success/error 三態
⚡ Next.js 專項 — mock router、image、Server Component
✅ 測試涵蓋範圍 — 互動、條件渲染、無障礙
🏗️ 測試結構 — describe 分組、AAA 模式、命名規範

## Debug Prompt
這段 code 有 bug
錯誤訊息是：

xxx error

請分析：
1. 可能原因
2. 如何修復
3. 如何避免未來發生


## Architecture Prompt
xxxx
請幫我設計：
1. folder structure
2. API design
3. state management
4. test strategy







