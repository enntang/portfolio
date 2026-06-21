# 作品集專案狀態

## 現有專案（列在 JSON、有頁面內容）

| slug | 語言版本 | 備注 |
|---|---|---|
| `mentor` | zh / en / ja | 完整。根目錄 + `en/` `zh/` `ja/` |
| `ehairpos` | zh / ja（+ en fallback） | 無獨立 `en/` 資料夾；英文時 router fallback 到根目錄 `Page.jsx` |
| `penguin-territory` | zh / en / ja | 完整 |
| `chivalry` | zh / en / ja | JSON 有 `link` 欄位，目前指向外部連結 |

## 尚未列入 JSON（內容還在確認中）

| slug | 狀況 |
|---|---|
| `textbook` | 有資料夾與 zh / en / ja Page.jsx，但尚未加入 JSON，不對外顯示 |

## 已移除

| slug | 移除原因 |
|---|---|
| `shopping-site` | 沒有對應頁面資料夾，不納入作品集 |
| `basel-convention` | 沒有對應頁面資料夾，不納入作品集 |
| `masonry-gallery` | 不納入作品集，資料夾已刪除 |

## 備用資料夾（不對外顯示）

- `mentor-v1`：舊版 Mentor 頁面，保留備用

## 多語言機制

- `ProjectPageRouter.jsx` 的 fallback 順序：`指定語言 → en → 任何可用版本`
- JSON 順序即為「相關專案」顯示順序（取前 3 個，排除當前頁）
- 要新增專案：①建立 `src/assets/projects/<slug>/` ②加入三個語言的 JSON

## 語言版本放置規則

- `src/assets/projects/<slug>/Page.jsx` → 預設英文（無獨立 en 資料夾時使用）
- `src/assets/projects/<slug>/en/Page.jsx` → 英文
- `src/assets/projects/<slug>/zh/Page.jsx` → 繁體中文
- `src/assets/projects/<slug>/ja/Page.jsx` → 日文
