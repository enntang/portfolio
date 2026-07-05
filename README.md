# Portfolio Project

一個使用 Vite + React + Tailwind CSS 建立的現代化前端開發環境。

## 技術棧

- ⚡ **Vite** - 極速的前端建構工具
- ⚛️ **React** - 用於構建用戶界面的 JavaScript 庫
- 🎨 **Tailwind CSS** - 實用優先的 CSS 框架

## 開始使用

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器將在 `http://localhost:5173` 啟動

### 建構生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 專案結構

```
portfolio-new/
├── src/
│   ├── App.jsx          # 主要應用組件
│   ├── main.jsx         # 應用入口點
│   └── index.css        # Tailwind CSS 配置
├── public/              # 靜態資源
├── index.html           # HTML 模板
├── tailwind.config.js   # Tailwind 配置文件
├── postcss.config.js    # PostCSS 配置
└── vite.config.js       # Vite 配置文件
```

## 開發指南

### 使用 Tailwind CSS

這個專案已經配置好 Tailwind CSS。你可以直接在 JSX 中使用 Tailwind 的實用類別：

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>
```

### 熱模組替換 (HMR)

Vite 提供了極快的 HMR 支援。當你修改代碼時，變更會立即反映在瀏覽器中，無需完整重新載入頁面。

## 相關資源

- [Vite 文檔](https://vitejs.dev/)
- [React 文檔](https://react.dev/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)

## 作品頁「區塊化資料驅動」

請參考 `PROJECT_CONTENT.md`，了解如何以 JSON 區塊建立作品頁內容，並透過 `#/project/:slug` 自動渲染。

---

## Notion 文章同步

本專案支援從 Notion 資料庫自動同步部落格文章到 GitHub Pages。

### 功能特色

- 自動將 Notion 文章轉換為網站內容
- 支援圖片自動下載（包含內文圖片、HeroImage、ThumbnailImage）
- **每次同步會重新建立全新內容**，Notion 文章更新後會自動覆蓋
- 只刪除由 sync 產生的文章，**不影響手動建立的文章**
- 同步完成後自動觸發部署

### 同步方式

#### 自動同步

- **排程**：每天 UTC 00:00（台灣時間 08:00）自動執行
- 只同步 Notion 中 `Status = Published` 的文章
- 有變更時自動 commit 並觸發部署

#### 手動同步

1. 前往 GitHub repo 的 **Actions** 頁面
2. 選擇 **Sync Notion Articles** workflow
3. 點擊 **Run workflow**

### 設定方式

#### 1. Notion 設定

在 Notion 資料庫中，文章需要包含以下屬性：

| 屬性名稱 | 類型 | 說明 |
|---------|------|------|
| Title | Title | 文章標題 |
| Slug | Text | 網址路徑（必填，如 `my-first-article`） |
| Status | Select | 設為 `Published` 才會同步 |
| Description | Text | 文章摘要，會顯示在列表卡片與文章頁開頭 |
| Category | Multi-select | 文章標籤（design / tooling / self，可複選） |
| Date | Date | 發布日期 |
| Featured | Checkbox | 是否為精選文章 |
| Image | Files & media | 文章代表圖，用於列表卡片與文章頁主圖 |

**使用 CSV 模板快速建立資料庫：**

1. 匯入 `scripts/notion-sync/notion-template.csv` 到 Notion
2. CSV 是純文字格式，匯入後需**手動調整欄位類型**：

| 欄位 | 匯入後類型 | 需改成 |
|-----|----------|-------|
| Status | Text | **Select**（選項：Published / Draft / Archived） |
| Category | Text | **Multi-select**（選項：design / tooling / self，可複選） |
| Date | Text | **Date** |
| Featured | Text | **Checkbox** |
| Image | Text | **Files & media**|

#### 2. GitHub Secrets 設定

在 repo 的 **Settings > Secrets and variables > Actions** 中新增：

| Secret 名稱 | 說明 |
|------------|------|
| `NOTION_API_KEY` | Notion Integration Token |
| `NOTION_DATABASE_ID` | Notion 資料庫 ID |

#### 3. Notion Integration 設定

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations) 建立 Integration
2. 複製 Internal Integration Token

### 文章刪除機制

- 當文章在 Notion 中的 Status 改為非 `Published` 時，下次同步會自動刪除該文章
- **只會刪除由 sync 產生的文章**（記錄在 `.synced-articles.json`）
- 手動建立在 `src/assets/blog/` 的文章不會被影響

### 本地測試

```bash
cd scripts/notion-sync
npm install

# 設定環境變數
export NOTION_API_KEY="your-api-key"
export NOTION_DATABASE_ID="your-database-id"

# 執行同步
node index.mjs
```

### 檔案結構

```
portfolio/
├── src/assets/blog/           # 文章內容（content.js）
├── public/blog-images/        # 文章圖片
├── scripts/notion-sync/       # 同步腳本
├── .synced-articles.json      # 追蹤由 sync 產生的文章
└── .github/workflows/
    ├── notion-sync.yml        # 同步 workflow
    └── deploy-pages.yml       # 部署 workflow
```

---

## 授權

MIT
