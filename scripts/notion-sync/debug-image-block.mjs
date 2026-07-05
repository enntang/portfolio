// 除錯用小工具：印出指定 Notion 頁面中所有 image block 的完整原始 JSON，
// 用來確認 Notion 公開 API 到底有沒有回傳寬度（resize）相關欄位。
//
// 使用方式：
//   cd scripts/notion-sync
//   NOTION_API_KEY=xxx node debug-image-block.mjs <pageId>
//
// <pageId> 可以從文章頁面的 Notion 網址複製，例如：
//   https://www.notion.so/xxx/我的文章標題-2f7bba8d456d80b1afc6ef0f21a9e2cf
// 網址最後那串 32 碼（或帶連字號的 UUID）就是 pageId。

import { Client } from '@notionhq/client'

const pageId = process.argv[2]

if (!pageId) {
  console.error('請提供 pageId，例如：node debug-image-block.mjs 2f7bba8d456d80b1afc6ef0f21a9e2cf')
  process.exit(1)
}

if (!process.env.NOTION_API_KEY) {
  console.error('請設定 NOTION_API_KEY 環境變數')
  process.exit(1)
}

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function main() {
  const blocks = await notion.blocks.children.list({ block_id: pageId, page_size: 100 })

  const imageBlocks = blocks.results.filter((b) => b.type === 'image')

  if (imageBlocks.length === 0) {
    console.log('這個頁面第一層沒有找到 image block（如果圖片在 toggle/column 裡面，需要再往下一層抓）')
    return
  }

  console.log(`找到 ${imageBlocks.length} 個 image block，完整原始 JSON 如下：\n`)
  imageBlocks.forEach((b, i) => {
    console.log(`--- image block ${i + 1} ---`)
    console.log(JSON.stringify(b, null, 2))
    console.log()
  })
}

main().catch(console.error)
