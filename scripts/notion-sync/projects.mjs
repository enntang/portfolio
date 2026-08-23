// 從 Notion「Portfolio Sync」資料庫同步作品集清單，產生三語系的 projects.*.json。
//
// 使用方式：
//   cd scripts/notion-sync
//   NOTION_API_KEY=xxx NOTION_PROJECTS_DATABASE_ID=xxx node projects.mjs
//   加上 --dry-run 只印出結果、不寫檔。
//
// Notion 是唯一的資料來源：每次同步都會整份重寫 projects.*.json，
// 手動改這三個檔案的內容會在下次同步時被覆蓋。

import { Client } from '@notionhq/client'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = join(__dirname, '../../src/assets')

const DRY_RUN = process.argv.includes('--dry-run')

// 每個語系對應 Notion 的欄位後綴，以及輸出檔名。
// separator 是主標與副標之間的分隔符：中日文用全形「：」，英文用半形「: 」。
const LANGUAGES = [
  { code: 'zh-TW', suffix: 'ZH', separator: '：' },
  { code: 'en-US', suffix: 'EN', separator: ': ' },
  { code: 'ja-JP', suffix: 'JA', separator: '：' },
]

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function main() {
  if (!process.env.NOTION_API_KEY) {
    console.error('❌ 請設定 NOTION_API_KEY 環境變數')
    process.exit(1)
  }
  if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
    console.error('❌ 請設定 NOTION_PROJECTS_DATABASE_ID 環境變數')
    process.exit(1)
  }

  console.log('🔍 正在從 Notion 取得作品集清單...')

  const rows = await fetchAllRows()
  console.log(`📁 找到 ${rows.length} 個已發布的作品\n`)

  const projects = []
  const seenSlugs = new Set()

  for (const page of rows) {
    const props = page.properties
    const name = getTitle(props['Project'])
    const slug = getText(props['Slug'])

    if (!slug) {
      console.log(`⚠️  跳過：缺少 Slug - ${name || '(未命名)'}`)
      continue
    }
    if (seenSlugs.has(slug)) {
      console.error(`❌ Slug 重複：${slug}（${name}）。每個作品的 Slug 必須唯一。`)
      process.exit(1)
    }
    seenSlugs.add(slug)

    const cover = getText(props['Cover Path'])
    if (!cover) {
      console.log(`⚠️  ${slug}：沒有填 Cover Path，卡片會沒有封面圖`)
    }

    const entry = { slug, cover, name, byLanguage: {} }

    for (const lang of LANGUAGES) {
      const mainTitle = getText(props[`Title ${lang.suffix}`])
      const subtitle = getText(props[`Subtitle ${lang.suffix}`])
      const description = getText(props[`Description ${lang.suffix}`])
      const imageAlt = getText(props[`Alt ${lang.suffix}`])

      if (!mainTitle) {
        console.log(`⚠️  ${slug}：缺少 Title ${lang.suffix}，${lang.code} 會顯示空標題`)
      }

      entry.byLanguage[lang.code] = {
        title: joinTitle(mainTitle, subtitle, lang.separator),
        slug,
        description,
        imageSrc: cover,
        imageAlt: imageAlt || mainTitle,
      }
    }

    projects.push(entry)
    console.log(`📝 ${slug}${name ? ` (${name})` : ''}`)
  }

  if (projects.length === 0) {
    console.error('❌ 沒有任何可同步的作品，為避免清空網站清單，同步中止。')
    process.exit(1)
  }

  console.log()

  for (const lang of LANGUAGES) {
    const filePath = join(ASSETS_DIR, `projects.${lang.code}.json`)
    const data = projects.map((p) => p.byLanguage[lang.code])
    const contents = `${JSON.stringify(data, null, 2)}\n`

    if (DRY_RUN) {
      const before = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''
      const status = before === contents ? '沒有變更' : '會被更新'
      console.log(`🔎 [dry-run] src/assets/projects.${lang.code}.json：${status}`)
      continue
    }

    writeFileSync(filePath, contents)
    console.log(`✅ 已寫入: src/assets/projects.${lang.code}.json`)
  }

  console.log(DRY_RUN ? '\n✨ dry-run 結束，未寫入任何檔案。' : '\n✨ 同步完成！')
}

// ============ Notion 查詢 ============

// 只取 Status = Published，並依 Order 由小到大排序（Order 就是網站上的顯示順序）。
async function fetchAllRows() {
  const results = []
  let cursor = undefined

  do {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'Order', direction: 'ascending' }],
      start_cursor: cursor,
    })

    results.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return results
}

// ============ Helper Functions ============

// 主標與副標在 Notion 是分開的兩欄，這裡才組合成網站用的單一字串，
// 讓「主標：副標」的格式由程式保證，不必每個語系各自手動維護。
function joinTitle(mainTitle, subtitle, separator) {
  const main = (mainTitle || '').trim()
  const sub = (subtitle || '').trim()
  if (!sub) return main
  if (!main) return sub
  return `${main}${separator}${sub}`
}

function getTitle(prop) {
  return joinRichText(prop?.title)
}

function getText(prop) {
  return joinRichText(prop?.rich_text)
}

// Notion 會因為套用格式（粗體、連結等）把一段文字切成多個片段，
// 只讀 [0] 會漏掉後半段，所以整段接起來。
function joinRichText(segments) {
  if (!Array.isArray(segments)) return ''
  return segments.map((s) => s.plain_text || '').join('').trim()
}

main().catch((error) => {
  console.error('❌ 同步失敗：', error.message || error)
  process.exit(1)
})
