# GitHub Pages 部署說明

## 已完成配置

1. ✅ 已更新 `vite.config.js`，設置 base 路徑為 `/portfolio/`
2. ✅ 已創建 GitHub Actions workflow (`.github/workflows/deploy.yml`)

## 部署步驟

### 1. 啟用 GitHub Pages

1. 前往 GitHub 倉庫頁面：`https://github.com/enntang/portfolio`
2. 點擊 **Settings** (設置)
3. 在左側選單中找到 **Pages** (頁面)
4. 在 **Source** (來源) 部分：
   - 選擇 **GitHub Actions** 作為部署來源
5. 保存設置

### 2. 推送代碼觸發部署

將代碼推送到 `main` 分支：

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. 查看部署狀態

1. 前往倉庫的 **Actions** 標籤頁
2. 查看最新的 workflow 運行狀態
3. 等待部署完成（通常需要 1-2 分鐘）

### 4. 訪問網站

部署完成後，網站將在以下 URL 可用：
- `https://enntang.github.io/portfolio/`

## 自動部署

每次推送到 `main` 分支時，GitHub Actions 會自動：
1. 安裝依賴
2. 構建項目
3. 部署到 GitHub Pages

## 注意事項

- 項目使用 hash routing (`#/`)，這對 GitHub Pages 很友好，無需額外配置
- 如果更改了倉庫名稱，記得更新 `vite.config.js` 中的 `base` 路徑
- 部署可能需要幾分鐘時間，請耐心等待

