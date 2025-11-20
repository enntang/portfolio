## 專案內容「區塊化資料驅動」說明

這份文件說明如何使用 JSON 以「區塊化」的方式大量產出作品說明頁，並透過現有的 `ProjectInfoPage.jsx` 自動渲染內容與目錄。

### 1) 兩個重要檔案
- `src/assets/projects.json`：專案清單（列表、卡片需要的基本資料）
  - 重要欄位：`title`, `slug`, `description`, `tags`, `imageSrc`, `imageAlt`
- `src/assets/project-contents.json`：依 `slug` 存放每個作品頁的「內容區塊」
  - 結構為：`{ [slug]: { meta, sections } }`

### 2) 路由規則
- 詳細頁路由採 Hash 形式：`#/project/:slug`
- 卡片已自動連到 `#/project/${slug}`，`main.jsx` 會解析並把 `slug` 傳給 `ProjectInfoPage`

### 3) `meta` 欄位（可選）
放在 `project-contents.json` 中每個 slug 下：
- `year`：頁首年份文字
- `cover`：頁首覆蓋圖片（預設使用 `projects.json` 的 `imageSrc`）
- `titleOverride`：覆寫標題（預設使用 `projects.json` 的 `title`）

範例（節錄）：
```json
{
  "chivalry": {
    "meta": {
      "year": "2017",
      "cover": "/project-cover-chivalry.png",
      "titleOverride": "Board Game: Chivalry"
    },
    "sections": [ /* 內容區塊，見下 */ ]
  }
}
```

### 4) 區塊類型（sections）
使用 `sections` 陣列描述頁面結構，自上而下渲染。支援下列 `type`：

- `h2`：
  - 欄位：`text`
- `h3`：
  - 欄位：`text`
- `p`（段落）：
  - 欄位：`text`
- `image`（單張圖片）：
  - 欄位：`src`, `alt?`, `height?`（預設 `h-80`）
- `twoColumns`（左圖右文）：
  - 欄位：
    - `leftImage?`: `{ src, alt?, height? }`
    - `rightParagraphs?`: `string[]`
- `responsibilitiesGrid`（兩欄重點格）：
  - 欄位：`items: { number, text }[]`
- `code`：
  - 欄位：`language`（如 `js`）, `code`
- `quote`：
  - 欄位：`cite`, `text`
- `relatedPosts`：
  - 欄位：`items: { title, href }[]`
  - 會自動從 TOC 排除
- `relatedProjects`：
  - 無欄位。會渲染內建的 `<Projects direction="vertical" />`，並自動從 TOC 排除

### 5) 完整範例（節錄）
```json
{
  "mentor": {
    "meta": { "year": "2023", "cover": "/project-cover-mentor.png" },
    "sections": [
      { "type": "p", "text": "Mentor is a personalized learning coach..." },
      { "type": "image", "src": "/bg-mentor.png", "alt": "mentor", "height": "h-80" },
      { "type": "h2", "text": "Key Responsibilities" },
      { "type": "responsibilitiesGrid", "items": [
        { "number": "01", "text": "建立學習體驗與流程，確保學習引導清晰。" },
        { "number": "02", "text": "制定設計系統與規範，提升設計一致性。" }
      ]},
      { "type": "twoColumns",
        "leftImage": { "src": "/bg-mentor.png", "alt": "overview", "height": "h-80" },
        "rightParagraphs": [
          "Mentor 透過 AI 提供即時學習回饋...",
          "我負責核心使用流程、學習儀表板..."
        ]
      },
      { "type": "h2", "text": "Code" },
      { "type": "code", "language": "js", "code": "console.log('hello')" },
      { "type": "quote", "cite": "ENN Tang", "text": "保持好奇..." },
      { "type": "relatedPosts", "items": [{ "title": "設計系統的實戰經驗", "href": "#" }] },
      { "type": "relatedProjects" }
    ]
  }
}
```

### 6) 建立新作品頁流程
1. 在 `src/assets/projects.json` 新增一筆專案，包含唯一 `slug`
2. 在 `src/assets/project-contents.json` 以相同 `slug` 新增 `meta` 與 `sections`
3. 圖片放在 `public/` 目錄，JSON 內使用 `/檔名` 路徑
4. 直接開啟 `#/project/<slug>` 頁面即可預覽

### 7) 目錄（ToC）規則
- ToC 會自動擷取頁面中的 `<h2>` 與 `<h3>`（對應 `type: "h2" | "h3"` 區塊）
- `relatedPosts` 與 `relatedProjects` 區塊會自動以 `data-toc-exclude` 排除

### 8) 小技巧與建議
- 標題（`h2`、`h3`）文字請簡潔，讓 TOC 更易讀
- 長文可拆成多個 `p` 區塊，提升排版彈性
- 若某頁尚未建立內容，會顯示「This project does not have structured content yet.」


