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

## Notion 內容同步

本專案支援從 Notion 資料庫自動同步部落格文章與作品集清單到 GitHub Pages。

### 功能特色

- 自動將 Notion 文章轉換為網站內容
- 支援圖片自動下載（包含內文圖片、HeroImage、ThumbnailImage）
- **每次同步會重新建立全新內容**，Notion 文章更新後會自動覆蓋
- 只刪除由 sync 產生的文章，**不影響手動建立的文章**
- 同步完成後自動觸發部署

### 同步方式

#### 自動同步

- **排程**：每天 UTC 00:00（台灣時間 08:00）自動執行，文章與作品集一起同步
- 只同步 Notion 中 `Status = Published` 的項目
- 有變更時自動 commit 並觸發部署（沒有變更就不會產生 commit）

#### 手動同步

1. 前往 GitHub repo 的 **Actions** 頁面
2. 選擇 **Sync Notion Content** workflow
3. 點擊 **Run workflow**，並選擇要同步的內容：
   - `all`：文章 + 作品集（預設）
   - `articles`：只同步文章
   - `projects`：只同步作品集清單

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
| `NOTION_DATABASE_ID` | 文章資料庫 ID |
| `NOTION_PROJECTS_DATABASE_ID` | 作品集資料庫 ID（Portfolio Sync），沒設定時會跳過作品集同步 |

#### 3. Notion Integration 設定

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations) 建立 Integration
2. 複製 Internal Integration Token

### 作品集清單同步

作品集的列表卡片資料（標題、副標題、描述、封面、標籤）集中在 Notion 的
**Portfolio Sync** 資料庫，由 `scripts/notion-sync/projects.mjs` 依 `Category`
分成兩組、各三個語系檔：

- Case Study → `src/assets/projects.{zh-TW,en-US,ja-JP}.json`
- Collection → `src/assets/collections.{zh-TW,en-US,ja-JP}.json`

> ⚠️ 這六個檔案是同步產生的，請不要手動編輯，改 Notion 才是正確做法。

資料庫欄位：

| 欄位 | 類型 | 說明 |
|-----|------|------|
| Project | Title | 專案代稱（內部識別用，不會出現在網站上） |
| Slug | Text | 網址路徑，必填且唯一，對應 `#/project/:slug` |
| Status | Select | 設為 `Published` 才會同步到網站 |
| Category | Select | `Case Study` 或 `Collection`；留空當成 Case Study |
| Order | Number | 顯示順序，數字小的排前面 |
| Tags | Multi-select | 作品類型（英文管理），對應列表頁的篩選鈕與卡片標籤 |
| Cover | Files | 封面圖，直接把檔案拖進來上傳 |
| Title ZH / EN / JA | Text | 主標題 |
| Subtitle ZH / EN / JA | Text | 副標題，沒有就留空 |
| Description ZH / EN / JA | Text | 卡片描述 |
| Alt ZH / EN / JA | Text | 封面圖替代文字 |

**Tags** 在 Notion 一律用英文（`UI/UX`、`Illustration`、`Graphic Design`、
`Web Design`、`Game Design`、`Branding`），網站顯示時翻成當前語系；翻譯放在
`src/locales/*.json` 的 `projects.tagLabels`，查不到翻譯就顯示英文原字。

**Cover** 是 Notion 附件，同步時會下載並轉成 WebP，存到
`public/project-covers/<slug>.webp`。

**Collection 的輪播圖**取自那一列 Notion **頁面內容**裡的圖片區塊（不是 Cover 欄位），
同樣轉成 WebP，存到 `public/collection-gallery/<slug>/<n>.webp`，順序照 Notion 上的排列。

這兩個資料夾都由同步腳本管理：每次同步都會刪掉沒對應到 Notion 的檔案，所以不要把
手動放的圖片放進去。轉檔用 sharp（長邊上限 1600px、quality 82），所以
`scripts/notion-sync` 要先 `npm install`。

**主標與副標分成兩欄**，同步時才依語系接成 `主標：副標`：中日文用全形 `：`，
英文用半形 `: `。這樣分隔符號的格式由程式保證，不會再出現各語系寫法不一致的情況。

同步行為：

- 只同步 `Status = Published` 的作品，`Draft` / `Hidden` 不會出現在網站上
- 每次都整份重寫六個 JSON，Notion 就是唯一的資料來源
- Slug 重複或查不到任何 Case Study 時會直接報錯中止，避免清單被清空
- Collection 可以是零筆，列表頁會顯示空狀態文案
- 只影響列表卡片；作品內頁仍是 `src/assets/projects/<slug>/<lang>/Page.jsx` 手寫的 JSX

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
export NOTION_PROJECTS_DATABASE_ID="your-projects-database-id"

# 同步文章
node index.mjs

# 同步作品集清單（先看會改到什麼，不寫檔）
node projects.mjs --dry-run
node projects.mjs
```

安裝過相依套件之後，作品集同步也可以直接從專案根目錄執行：

```bash
npm run sync:projects
```

### 檔案結構

```
portfolio/
├── src/assets/blog/           # 文章內容（content.js）
├── src/assets/projects.*.json # Case Study 清單（同步產生，勿手改）
├── src/assets/collections.*.json # Collection 清單（同步產生，勿手改）
├── public/blog-images/        # 文章圖片
├── scripts/notion-sync/
│   ├── index.mjs              # 文章同步腳本
│   └── projects.mjs           # 作品集清單同步腳本
├── .synced-articles.json      # 追蹤由 sync 產生的文章
└── .github/workflows/
    ├── notion-sync.yml        # 同步 workflow
    └── deploy-pages.yml       # 部署 workflow
```

---

## 授權

MIT
