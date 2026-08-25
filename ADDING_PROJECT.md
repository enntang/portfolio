## 新增作品集頁面指南（每個專案一個資料夾 + content.json）

本指南說明如何用「每個專案獨立資料夾 + content.json」的方式建立新作品頁，無需撰寫新 JSX。

### 0) 準備
- 封面與內頁圖片請放在 `public/`，引用路徑以 `/檔名.png` 形式。
- 路由格式為：`#/project/:slug`（例如 `#/project/mentor`）。

### 1) 在清單加入專案（列表卡片資料）

列表卡片的資料由 Notion 的 **Portfolio Sync** 資料庫管理，**不要直接編輯
`src/assets/projects.*.json`**，那三個檔案是同步產生的，手改會在下次同步時被覆蓋。

在 Notion 資料庫新增一列，填入：

| 欄位 | 說明 |
|-----|------|
| Project | 專案代稱（只給自己看，不會出現在網站上） |
| Slug | 網址路徑，必填且唯一，決定 `#/project/:slug` |
| Status | 設為 `Published` 才會出現在網站 |
| Category | `Case Study`（有內頁的完整作品）或 `Collection`（只有一張圖的視覺作品）；留空當成 Case Study |
| Order | 顯示順序，數字小的排前面（兩區各自排序） |
| Tags | 作品類型，複選，例如「插畫 + UI/UX」。列表頁的篩選鈕和卡片上的標籤都吃這一欄 |
| Cover | 封面圖，直接把檔案拖進這個附件欄位 |
| Title ZH / EN / JA | 主標題，例如 `Mentor`、`桌上遊戲` |
| Subtitle ZH / EN / JA | 副標題，例如 `不只是做產品，更是建立團隊`；沒有副標就留空 |
| Description ZH / EN / JA | 卡片上的一句話描述 |
| Alt ZH / EN / JA | 封面圖替代文字 |

主標與副標是分開的兩欄，同步時才會依語系接成 `主標：副標`（中日文用全形
`：`，英文用半形 `: `），所以不需要自己打分隔符號。

**Tags**：在 Notion 一律用英文管理（`UI/UX`、`Illustration`、`Graphic Design`、
`Web Design`、`Game Design`、`Branding`），網站會依當前語系翻成中文／日文顯示。
要加新選項就直接在 Notion 加，然後到 `src/locales/*.json` 的 `projects.tagLabels`
補上三語翻譯；沒補翻譯的標籤會直接顯示英文原字，不會壞掉。

**Cover**：附件同步時會下載並轉成 WebP，存到 `public/project-covers/<slug>.webp`。
Collection 的輪播圖則取自 Notion 頁面內容裡的圖片，存到
`public/collection-gallery/<slug>/<n>.webp`。這兩個資料夾都由同步腳本管理，每次同步
都會清掉沒對應到 Notion 的檔案，所以不要把手放的圖片放進去。

填好之後執行同步（見 README 的「Notion 內容同步」）：

```bash
npm run sync:projects
```

### 2) 建立專案資料夾與內容檔
在 `src/assets/projects/` 底下建立以 `slug` 命名的資料夾，新增 `content.json`：

路徑：`src/assets/projects/my-new-project/content.json`

```json
{
  "meta": {
    "year": "2025",
    "cover": "/project-cover-my-new.png",
    "titleOverride": null
  },
  "sections": [
    { "type": "p", "text": "本專案是一個......的簡介。" },
    { "type": "h2", "text": "目標與角色" },
    { "type": "responsibilitiesGrid", "items": [
      { "number": "01", "text": "負責核心 UX 流程設計" },
      { "number": "02", "text": "制定設計規範與元件庫" }
    ]},
    { "type": "twoColumns",
      "leftImage": { "src": "/bg-mentor.png", "alt": "overview", "height": "h-80" },
      "rightParagraphs": ["說明重點 A。", "說明重點 B。"]
    },
    { "type": "h2", "text": "成果示例" },
    { "type": "image", "src": "/bg-mentor.png", "alt": "screenshot", "height": "h-80" },
    { "type": "quote", "cite": "PM", "text": "這段話用於呈現回饋或亮點。" },
    { "type": "relatedProjects" }
  ]
}
```

說明：
- `meta.year`：頁首年份；`meta.cover`：頁首圖；`titleOverride` 可覆寫標題（不填則用清單的 `title`）。
- `sections` 為依序渲染的內容區塊（見下方速查）。
- 系統會自動以 `import.meta.glob` 掃描 `src/assets/projects/*/content.json` 並依資料夾名稱作為 `slug` 載入。

### 3) 放置圖片
- 將 `imageSrc`、區塊中的 `src` 對應的檔案放到 `public/`。
- JSON 中使用 `/檔名.png` 絕對路徑（以 `public` 為根）。

### 4) 預覽與驗證
1. 啟動開發伺服器：`npm run dev`
2. 進入 `#/project/my-new-project`
3. 檢查：
   - 頁首是否顯示 `meta.cover` 與標題/年份
   - 內容區塊是否依序渲染
   - 左下角「Contents」是否正確擷取 `h2`/`h3`
   - 相關專案、相關文章（若使用）是否顯示
   - 若尚未建立 `content.json`，會顯示 404 頁，可點「View Projects」回列表，或返回上一頁

### 區塊類型速查
- `h2`：`{ "type": "h2", "text": "標題" }`
- `h3`：`{ "type": "h3", "text": "小標題" }`
- `p`：`{ "type": "p", "text": "段落文字" }`
- `image`：`{ "type": "image", "src": "/x.png", "alt": "說明", "height": "h-80" }`
- `twoColumns`：
  - `leftImage?`: `{ src, alt?, height? }`
  - `rightParagraphs?`: `string[]`
- `responsibilitiesGrid`：`{ "type": "responsibilitiesGrid", "items": [{ "number": "01", "text": "..." }] }`
- `code`：`{ "type": "code", "language": "js", "code": "..." }`
- `quote`：`{ "type": "quote", "cite": "署名", "text": "引用文字" }`
- `relatedPosts`：`{ "type": "relatedPosts", "items": [{ "title": "文章", "href": "#" }] }`
- `relatedProjects`：`{ "type": "relatedProjects" }`

### 常見問題
- 看不到圖片：
  - 確認檔案在 `public/` 底下；JSON 中路徑要以 `/` 開頭。
- TOC 沒出現該標題：
  - TOC 只會擷取 `h2`/`h3` 區塊；`relatedPosts`、`relatedProjects` 會自動排除。
- 卡片沒出現在列表：
  - 確認已在 `projects.json` 新增，並且過濾標籤（`tags`）有被當前頁面選中。

### 新增 Collection 作品（不需要內頁）

作品列表頁（`/portfolio`）上的切換鈕分成兩區，兩區都來自同一個 Notion 資料庫，
差別只在 **Category** 這一欄：

- **Case Study**：上面 1)~4) 的完整流程，每筆都有自己的內頁。
- **Collection**：平面設計、網頁視覺等偏視覺的作品，網站上只顯示
  封面圖 + 標題 + 描述 + 標籤，點圖片用燈箱看大圖。

新增一筆 Collection 作品只要做 1) 那一步，**不需要**建資料夾或 `content.json`：

1. 在 Notion 新增一列，Category 選 `Collection`
2. 封面拖進 **Cover** 欄位（列表卡片用這張）
3. **作品頁要橫向捲動的圖片，直接貼在那一列的 Notion 頁面內容裡**（打開該列 → 頁面內容
   插入圖片），順序就是輪播的順序
4. 填好 Title / Subtitle / Description / Alt 和 Tags；三語的 Title 留空時會退回用
   `Project` 欄位的名稱
5. 跑 `npm run sync:projects`

同步會產生 `src/assets/collections.*.json`（Case Study 則是 `projects.*.json`），
這六個檔案都是產生出來的，手改會在下次同步時被覆蓋。Collection 一筆都沒有時，
列表頁會顯示 `projects.collectionEmpty` 的空狀態文案。

**Collection 作品頁**：路徑是 `/collection/<slug>`，版型固定（左邊標題／描述／標籤，
右邊橫向圖片牆，兩張以上會自動輪播並無限循環，並顯示左右切換鈕），由
`src/CollectionPage.jsx` 統一渲染，不必為每件作品寫 JSX。頁面內容沒有圖片時會退回
用 Cover 那一張；兩者都沒有就只顯示文字。

### 分享篩選好的網址

作品列表頁的分頁和標籤篩選都會寫進網址，所以每一種篩選都有自己的連結，可以直接分享：

| 網址 | 開起來會是 |
|---|---|
| `/portfolio` | Case Study，全部 |
| `/portfolio?tag=ui-ux` | Case Study，只看 UI/UX |
| `/portfolio?view=collection` | Collection，全部 |
| `/portfolio?view=collection&tag=web-design` | Collection，只看網頁設計 |
| `/tw/portfolio?view=collection&tag=illustration` | 中文版的同一個畫面（`/ja/` 則是日文版） |

`tag` 用的是標籤的小寫連字號形式（`UI/UX` → `ui-ux`、`Graphic Design` → `graphic-design`）。
直接寫標籤原字（`?tag=Graphic%20Design`）也讀得懂，舊連結不會壞。網址上的標籤如果
不屬於當前分頁，就當成沒有篩選顯示全部，不會出現空清單。

Collection 作品頁上的標籤也是連到這種網址，點下去就會回到列表並套用該標籤。

### 延伸
需要新的版型（如圖庫、表格、三欄排版等），可提出需求，我們可以擴充 `sections` 類型並更新渲染器。


