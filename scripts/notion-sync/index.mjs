import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { writeFileSync, mkdirSync, existsSync, createWriteStream, rmSync, readFileSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = join(__dirname, '../../src/assets/blog')
const IMAGE_DIR = join(__dirname, '../../public/blog-images')
const MANIFEST_FILE = join(__dirname, '../../.synced-articles.json')

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

async function main() {
  console.log('🔍 正在從 Notion 獲取文章...')

  // 載入已同步文章的 manifest
  const syncedArticles = loadManifest()

  // 1. 獲取 Published 文章
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Status',
      select: { equals: 'Published' }
    }
  })

  console.log(`📚 找到 ${response.results.length} 篇已發布文章\n`)

  for (const page of response.results) {
    const props = page.properties
    const slug = getText(props.Slug)
    const title = getTitle(props.Title)

    if (!slug) {
      console.log(`⚠️ 跳過：缺少 Slug - ${title}`)
      continue
    }

    console.log(`📝 處理: ${title} (${slug})`)

    // 2. 使用 notion-to-md 轉換頁面內容為 Markdown
    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdResult = n2m.toMarkdownString(mdBlocks)
    // toMarkdownString 回傳 { parent: string }
    let markdownContent = typeof mdResult === 'string' ? mdResult : (mdResult?.parent || '')

    // 3. 下載 Markdown 中的圖片到本地，並替換為本地路徑
    const { content, imageCount } = await processMarkdownImages(markdownContent || '', slug)

    // 4. 處理文章代表圖。Image 是新欄位，HeroImage/ThumbnailImage 保留向下相容。
    const imageUrl =
      getFileUrl(props.Image) ||
      getUrl(props.Image) ||
      getFileUrl(props.HeroImage) ||
      getUrl(props.HeroImage) ||
      getFileUrl(props.ThumbnailImage) ||
      getUrl(props.ThumbnailImage)
    const image = await processMetaImage(imageUrl, slug, 'image')
    const categories = getMultiSelect(props.Category)
    const primaryCategory = categories[0] || getSelect(props.Category)
    const description = getText(props.Description) || getText(props.Subtitle)

    // 5. 組裝 post 物件
    const post = {
      id: slug,
      slug: slug,
      title: title,
      description: description,
      categories: categories.length ? categories : (primaryCategory ? [primaryCategory] : []),
      category: primaryCategory,
      categoryLabels: (categories.length ? categories : (primaryCategory ? [primaryCategory] : [])).map(getCategoryLabel),
      categoryLabel: getCategoryLabel(primaryCategory),
      date: getDate(props.Date),
      featured: getCheckbox(props.Featured),
      image: image,
      content: content  // 現在是 Markdown 字串
    }

    // 6. 寫入檔案
    const postDir = join(BLOG_DIR, slug)
    if (!existsSync(postDir)) {
      mkdirSync(postDir, { recursive: true })
    }

    const fileContent = `const post = ${JSON.stringify(post, null, 2)}

export default post
`
    writeFileSync(join(postDir, 'content.js'), fileContent)
    syncedArticles.add(slug)
    console.log(`   ✅ 已寫入: src/assets/blog/${slug}/content.js`)
    if (imageCount > 0) {
      console.log(`   🖼️  下載了 ${imageCount} 張圖片`)
    }
    console.log()
  }

  // 7. 清理已取消發布的文章
  const publishedSlugs = response.results
    .map(page => getText(page.properties.Slug))
    .filter(Boolean)

  const { deletedCount, updatedSyncedArticles } = cleanupUnpublishedArticles(publishedSlugs, syncedArticles)
  if (deletedCount > 0) {
    console.log(`🗑️  已刪除 ${deletedCount} 篇取消發布的文章\n`)
  }

  // 8. 儲存 manifest
  saveManifest(updatedSyncedArticles)

  console.log('✨ 同步完成！')
}

// ============ Manifest 管理 ============

function loadManifest() {
  try {
    if (existsSync(MANIFEST_FILE)) {
      const data = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'))
      return new Set(data.syncedArticles || [])
    }
  } catch (e) {
    console.log('⚠️ 無法讀取 manifest，將建立新的')
  }
  return new Set()
}

function saveManifest(syncedArticles) {
  const data = {
    lastSync: new Date().toISOString(),
    syncedArticles: [...syncedArticles]
  }
  writeFileSync(MANIFEST_FILE, JSON.stringify(data, null, 2))
}

// ============ 清理功能 ============

function cleanupUnpublishedArticles(publishedSlugs, syncedArticles) {
  let deletedCount = 0
  const updatedSyncedArticles = new Set(syncedArticles)

  for (const slug of syncedArticles) {
    if (!publishedSlugs.includes(slug)) {
      console.log(`🗑️  刪除取消發布的文章: ${slug}`)

      const contentDir = join(BLOG_DIR, slug)
      if (existsSync(contentDir)) {
        rmSync(contentDir, { recursive: true })
      }

      const imageDir = join(IMAGE_DIR, slug)
      if (existsSync(imageDir)) {
        rmSync(imageDir, { recursive: true })
      }

      updatedSyncedArticles.delete(slug)
      deletedCount++
    }
  }

  return { deletedCount, updatedSyncedArticles }
}

// ============ Markdown 圖片處理 ============

async function processMarkdownImages(markdown, slug) {
  // 防護：確保 markdown 是字串
  if (!markdown || typeof markdown !== 'string') {
    return { content: '', imageCount: 0 }
  }

  // 匹配 Markdown 圖片語法: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let imageCount = 0
  let imageIndex = 0
  let processedMarkdown = markdown

  const matches = [...markdown.matchAll(imageRegex)]

  for (const match of matches) {
    const [fullMatch, alt, url] = match

    // 跳過已經是本地路徑的圖片
    if (url.startsWith('/')) continue

    imageIndex++
    const localPath = await downloadImage(url, slug, `image-${imageIndex}`)

    if (localPath) {
      // 替換 URL 為本地路徑
      processedMarkdown = processedMarkdown.replace(fullMatch, `![${alt}](${localPath})`)
      imageCount++
    }
  }

  return {
    content: processedMarkdown,
    imageCount
  }
}

async function processMetaImage(url, slug, name) {
  if (!url) return ''
  if (url.startsWith('/')) return url

  const localPath = await downloadImage(url, slug, name)
  return localPath || url
}

async function downloadImage(url, slug, name) {
  try {
    const imageDir = join(IMAGE_DIR, slug)
    if (!existsSync(imageDir)) {
      mkdirSync(imageDir, { recursive: true })
    }

    const urlPath = new URL(url).pathname
    let ext = extname(urlPath).split('?')[0] || '.png'
    if (!ext.match(/^\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      ext = '.png'
    }

    const filename = `${name}${ext}`
    const filepath = join(imageDir, filename)
    const publicPath = `/blog-images/${slug}/${filename}`

    await downloadFile(url, filepath)

    return publicPath
  } catch (error) {
    console.error(`   ⚠️ 圖片下載失敗: ${url}`, error.message)
    return null
  }
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    const request = protocol.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`))
        return
      }

      const file = createWriteStream(filepath)
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
      file.on('error', reject)
    })

    request.on('error', reject)
    request.setTimeout(30000, () => {
      request.destroy()
      reject(new Error('Timeout'))
    })
  })
}

// ============ Helper Functions ============

function getTitle(prop) {
  return prop?.title?.[0]?.plain_text || ''
}

function getText(prop) {
  return prop?.rich_text?.[0]?.plain_text || ''
}

function getSelect(prop) {
  return prop?.select?.name || ''
}

function getMultiSelect(prop) {
  return prop?.multi_select?.map(option => option.name).filter(Boolean) || []
}

function getDate(prop) {
  const date = prop?.date?.start
  return date ? date.replace(/-/g, '/') : new Date().toISOString().slice(0, 10).replace(/-/g, '/')
}

function getCheckbox(prop) {
  return prop?.checkbox || false
}

function getUrl(prop) {
  return prop?.url || ''
}

function getFileUrl(prop) {
  const file = prop?.files?.[0]
  if (!file) return ''

  if (file.type === 'file') {
    return file.file?.url || ''
  }
  if (file.type === 'external') {
    return file.external?.url || ''
  }
  return ''
}

function getCategoryLabel(category) {
  const labels = {
    design: 'Design',
    tooling: 'Tools & Practice',
    self: 'Self'
  }
  return labels[category] || category
}

main().catch(console.error)
