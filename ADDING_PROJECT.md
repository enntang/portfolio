## 新增作品集頁面指南（每個專案一個資料夾 + content.json）

本指南說明如何用「每個專案獨立資料夾 + content.json」的方式建立新作品頁，無需撰寫新 JSX。

### 0) 準備
- 封面與內頁圖片請放在 `public/`，引用路徑以 `/檔名.png` 形式。
- 路由格式為：`#/project/:slug`（例如 `#/project/mentor`）。

### 1) 在清單加入專案（列表卡片資料）
編輯 `src/assets/projects.json`，新增一筆物件（`slug` 必填、唯一）：

```json
{
  "title": "My New Project",
  "slug": "my-new-project",
  "description": "One-line description",
  "tags": ["UI/UX", "Graphic Design"],
  "imageSrc": "/project-cover-my-new.png",
  "imageAlt": "My New Project cover"
}
```

- 此資料會顯示在首頁/列表的卡片，也決定卡片點擊導向的 `#/project/my-new-project`。

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

### 延伸
需要新的版型（如圖庫、表格、三欄排版等），可提出需求，我們可以擴充 `sections` 類型並更新渲染器。


