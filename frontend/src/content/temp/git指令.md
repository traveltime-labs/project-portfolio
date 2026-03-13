# GIT 指令

## 最終提交流程
``` bash
npm run check                # 確認提交前是否有錯誤 

git status (檢查狀態)
git add . (暫存)
git commit -m "feat: 實作登入功能" (提交)

npm version [版本號提升]      # 快速流程

git push origin main --tags  # 與版本號一起推上去
```

** 備註原先流程
``` bash
git status (檢查狀態)
git add . (暫存)
git commit -m "feat: 實作登入功能" (提交)
git tag v1.0.1 (先在本地電腦打上標籤)
git push origin main (先把程式碼推上去)
git push origin v1.0.1 (再把這個標籤單獨推上去)
```

## 快速流程

``` bash
# 1. 修改完程式碼後
git add .
git commit -m "完成登入功能"

# 2. 讓 npm 幫你更新 package.json 的版本號並自動打 tag
# 範例: 會把 0.1.0 變成 0.1.1 並自動執行 git tag v0.1.1
npm version patch  # 一般小改動 (如: 修復bug)
npm version minor  # 完成一個大功能（如：購物車系統）
npm version major  # 專案正式上線/大改架構

# 3. 一口氣全部推上去
git push origin main --tags
```

## 特殊情況
如果你還在開發中，不想直接跳正式版，也可以使用：

``` bash
npm version prepatch # → 變成 0.1.1-0
npm version preminor # → 變成 0.2.0-0
```

## 補打 tag
``` bash
# 先找到那個 commit 的 ID (前 7 碼)
git log --oneline

# 針對該 ID 打標籤
git tag -a v0.9.0 7b2a3f1 -m "補打之前的版本"

# 推送上去
git push origin v0.9.0
```

## commit 發現少調整再次提交
--amend：表示要修改上一個 commit。
--no-edit：表示沿用上次的提交訊息（不用重新寫 commit message）。

``` bash
git commit --amend --no-edit
```

- 如果還沒 Push： 隨便你怎麼 amend 都可以，這是最推薦的使用時機。
- 如果已經 Push 到雲端： 請不要用 --amend。因為雲端的 ID 和你本地的 ID 會對不起來，導致你下次 push 時被拒絕（必須用 git push -f 強制覆蓋，這在多人協作時非常危險）。


``` bash
git add .
git commit -m "feat: 實作登入頁面"

(突然發現少寫一個 console.log 或 CSS 跑版)
修改程式碼...

git add .
git commit --amend --no-edit
(最後才執行) npm version patch
git push origin main --tags
```