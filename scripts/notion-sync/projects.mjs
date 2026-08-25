// 從 Notion「Portfolio Sync」資料庫同步作品集清單。
//
// 依 Category 分成兩份輸出：
//   Case Study → src/assets/projects.*.json（有內頁的完整作品）
//   Collection → src/assets/collections.*.json（沒有內頁，圖片直接放在 Notion 頁面內容裡）
//
// 圖片一律下載回 public/ 並轉成 WebP：
//   封面（Cover 附件欄位）      → public/project-covers/<slug>.webp
//   Collection 頁面內容的圖片   → public/collection-gallery/<slug>/<n>.webp
//
// 使用方式：
//   cd scripts/notion-sync
//   NOTION_API_KEY=xxx NOTION_PROJECTS_DATABASE_ID=xxx node projects.mjs
//   加上 --dry-run 只印出結果、不寫檔（也不會下載圖片）。
//
// Notion 是唯一的資料來源：每次同步都會整份重寫那六個 JSON，
// 手動改內容會在下次同步時被覆蓋。

import { Client } from '@notionhq/client'
import sharp from 'sharp'
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = join(__dirname, '../../src/assets')
// 這兩個資料夾整個由同步腳本擁有：不在 Notion 裡的檔案每次同步都會被清掉，
// 所以不要把手放的圖片放進來。
const COVER_DIR = join(__dirname, '../../public/project-covers')
const GALLERY_DIR = join(__dirname, '../../public/collection-gallery')
const COVER_PUBLIC_PREFIX = '/project-covers'
const GALLERY_PUBLIC_PREFIX = '/collection-gallery'

// 轉檔設定。長邊上限 1600px 對網頁夠用，原圖動輒 3~5MB，轉完大約 100~250KB。
const MAX_EDGE = 1600
const WEBP_QUALITY = 82

const DRY_RUN = process.argv.includes('--dry-run')

// 每個語系對應 Notion 的欄位後綴，以及輸出檔名。
// separator 是主標與副標之間的分隔符：中日文用全形「：」，英文用半形「: 」。
const LANGUAGES = [
  { code: 'zh-TW', suffix: 'ZH', separator: '：' },
  { code: 'en-US', suffix: 'EN', separator: ': ' },
  { code: 'ja-JP', suffix: 'JA', separator: '：' },
]

// Notion 的 Category。沒填的當成 Case Study，才不會因為忘了選而整筆從網站消失。
const CASE_STUDY = 'Case Study'
const COLLECTION = 'Collection'

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

  const caseStudies = []
  const collections = []
  const seenSlugs = new Set()
  const usedCovers = new Set()
  const usedGalleries = new Set()

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

    const category = getSelect(props['Category']) || CASE_STUDY
    const tags = getMultiSelect(props['Tags'])

    // Collection 的輪播圖來自 Notion 頁面內容裡的圖片區塊（Case Study 有自己的內頁，不需要）。
    const images = category === COLLECTION ? await syncGallery(page.id, slug) : []
    if (images.length) usedGalleries.add(slug)

    // 封面讀 Cover 附件欄位；Collection 沒上傳封面時就拿頁面內容的第一張圖頂著。
    const coverUrl = getFirstFileUrl(props['Cover'])
    let cover = coverUrl ? await downloadCover(coverUrl, slug) : ''
    if (cover) usedCovers.add(cover.slice(COVER_PUBLIC_PREFIX.length + 1))
    if (!cover) cover = images[0] || ''
    if (!cover) {
      console.log(`⚠️  ${slug}：沒有封面圖（Cover 沒上傳，頁面內容也沒有圖片）`)
    }

    const entry = { slug, category, byLanguage: {} }

    for (const lang of LANGUAGES) {
      // Collection 常常只填 Project 一欄當名字，所以各語系的標題留空時退回 Project，
      // 不然網站上會出現沒有標題的作品。
      const mainTitle = getText(props[`Title ${lang.suffix}`]) || name
      const subtitle = getText(props[`Subtitle ${lang.suffix}`])
      const description = getText(props[`Description ${lang.suffix}`])
      const imageAlt = getText(props[`Alt ${lang.suffix}`])

      if (!getText(props[`Title ${lang.suffix}`])) {
        console.log(`⚠️  ${slug}：缺少 Title ${lang.suffix}，${lang.code} 會顯示 Project 欄位的名稱`)
      }

      entry.byLanguage[lang.code] = {
        title: joinTitle(mainTitle, subtitle, lang.separator),
        slug,
        description,
        imageSrc: cover,
        imageAlt: imageAlt || mainTitle,
        tags,
        ...(category === COLLECTION ? { images } : {}),
      }
    }

    if (category === COLLECTION) {
      collections.push(entry)
    } else {
      caseStudies.push(entry)
    }
    console.log(
      `📝 ${slug}${name ? ` (${name})` : ''} · ${category}` +
        `${tags.length ? ` · ${tags.join(', ')}` : ''}${images.length ? ` · ${images.length} 張輪播圖` : ''}`
    )
  }

  if (caseStudies.length === 0) {
    console.error('❌ 沒有任何 Case Study，為避免清空網站清單，同步中止。')
    process.exit(1)
  }

  console.log()

  writeLanguageFiles('projects', caseStudies)
  writeLanguageFiles('collections', collections)
  pruneDir(COVER_DIR, COVER_PUBLIC_PREFIX, usedCovers)
  pruneDir(GALLERY_DIR, GALLERY_PUBLIC_PREFIX, usedGalleries)

  console.log(DRY_RUN ? '\n✨ dry-run 結束，未寫入任何檔案。' : '\n✨ 同步完成！')
}

// ============ 輸出 ============

function writeLanguageFiles(fileBase, entries) {
  for (const lang of LANGUAGES) {
    const filePath = join(ASSETS_DIR, `${fileBase}.${lang.code}.json`)
    const data = entries.map((entry) => entry.byLanguage[lang.code])
    const contents = `${JSON.stringify(data, null, 2)}\n`

    if (DRY_RUN) {
      const before = existsSync(filePath) ? readFileSync(filePath, 'utf-8') : ''
      const status = before === contents ? '沒有變更' : '會被更新'
      console.log(`🔎 [dry-run] src/assets/${fileBase}.${lang.code}.json：${status}`)
      continue
    }

    writeFileSync(filePath, contents)
    console.log(`✅ 已寫入: src/assets/${fileBase}.${lang.code}.json`)
  }
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

// 頁面內容裡的圖片，依 Notion 上的排列順序。圖片可能被放在欄位（column）裡，
// 所以有子區塊就往下找。
async function collectImageUrls(blockId, depth = 0) {
  if (depth > 3) return []

  const urls = []
  let cursor = undefined

  do {
    const response = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor })

    for (const block of response.results) {
      if (block.type === 'image') {
        const url = block.image?.file?.url || block.image?.external?.url
        if (url) urls.push(url)
      } else if (block.has_children) {
        urls.push(...(await collectImageUrls(block.id, depth + 1)))
      }
    }

    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return urls
}

// ============ 圖片 ============

async function syncGallery(pageId, slug) {
  const urls = await collectImageUrls(pageId)
  if (urls.length === 0) return []

  if (DRY_RUN) {
    console.log(`🔎 [dry-run] ${slug}：會下載 ${urls.length} 張輪播圖`)
    return []
  }

  const dir = join(GALLERY_DIR, slug)
  // 整個資料夾重建，Notion 上刪掉的圖才不會留在網站上。
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  const paths = []
  for (const [index, url] of urls.entries()) {
    const filename = `${index + 1}.webp`
    try {
      await downloadAsWebp(url, join(dir, filename))
      paths.push(`${GALLERY_PUBLIC_PREFIX}/${slug}/${filename}`)
    } catch (error) {
      console.error(`   ⚠️ ${slug}：第 ${index + 1} 張輪播圖處理失敗（${error.message}）`)
    }
  }
  return paths
}

// Notion 給的檔案網址是有時效的簽章網址，不能直接寫進網站，一定要下載回 public/。
async function downloadCover(url, slug) {
  if (DRY_RUN) {
    console.log(`🔎 [dry-run] ${slug}：會下載封面圖`)
    return ''
  }

  try {
    mkdirSync(COVER_DIR, { recursive: true })
    await downloadAsWebp(url, join(COVER_DIR, `${slug}.webp`))
    return `${COVER_PUBLIC_PREFIX}/${slug}.webp`
  } catch (error) {
    console.error(`   ⚠️ ${slug}：封面圖處理失敗（${error.message}）`)
    return ''
  }
}

// 下載 + 轉 WebP 一次做完。SVG 沒有點陣化的必要，原樣存下來。
async function downloadAsWebp(url, filepath) {
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const input = Buffer.from(await response.arrayBuffer())
  await sharp(input)
    .rotate() // 依 EXIF 轉正，不然手機拍的照片會躺著
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(filepath)
}

// 這些資料夾只放這次同步用得到的東西，其餘一律刪掉（改 slug、刪圖都會留下孤兒檔）。
function pruneDir(dir, publicPrefix, used) {
  if (DRY_RUN || !existsSync(dir)) return

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || used.has(entry.name)) continue
    rmSync(join(dir, entry.name), { recursive: true, force: true })
    console.log(`🧹 已清除: ${publicPrefix}/${entry.name}`)
  }
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

function getSelect(prop) {
  return prop?.select?.name || ''
}

// Notion 的多選欄位保持使用者排的順序，網站上的標籤順序就跟 Notion 看到的一致。
function getMultiSelect(prop) {
  if (!Array.isArray(prop?.multi_select)) return []
  return prop.multi_select.map((option) => option.name).filter(Boolean)
}

// 封面只取第一個附件；Notion 上傳的檔案是 file.url，外部連結則是 external.url。
function getFirstFileUrl(prop) {
  const files = prop?.files
  if (!Array.isArray(files) || files.length === 0) return ''
  const first = files[0]
  return first?.file?.url || first?.external?.url || ''
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
