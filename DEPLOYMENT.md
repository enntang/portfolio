# GitHub Pages 部署說明

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

部署完成後，網站 URL 取決於 Pages 類型：
- **User site**（repo 名稱是 `<username>.github.io`）：`https://<username>.github.io/`
- **Project site**（一般 repo）：`https://<username>.github.io/<repo>/`

## 自動部署

每次推送到 `main` 分支時，GitHub Actions 會自動：
1. 安裝依賴
2. 構建項目
3. 部署到 GitHub Pages

## 注意事項

- 本專案使用 **History API 路由**（不是 hash routing）。
- 為了支援 GitHub Pages 的深連結（例如直接打開 `/about`），`npm run build` 會自動把 `dist/index.html` 複製成 `dist/404.html` 當作 SPA fallback。
- GitHub Actions 會自動設置 `VITE_BASE`：
  - user site：`/`
  - project site：`/<repo>/`
- 如果你的 repo 名稱剛好叫 `portfolio`，而你也有 `'/portfolio'` 這個站內路由，project site URL 會變成 `.../portfolio/portfolio`（可接受但不美觀）。想避免的話可以：
  - 把 repo 改名（建議），或
  - 把站內路由 `/portfolio` 改成別的（例如 `/work`）。

## 本機驗證（可選）

```bash
npm run build
npm run preview
```

