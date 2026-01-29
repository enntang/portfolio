import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = join(__dirname, '../../src/assets/blog')
const IMAGE_DIR = join(__dirname, '../../public/blog-images')

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

async function main() {
  console.log('🔍 正在從 Notion 獲取文章...')

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

    // 2. 獲取頁面內容
    const blocks = await getAllBlocks(page.id)

    // 3. 處理圖片並轉換內容
    const { content, imageCount } = await processContent(blocks, slug)

    // 4. 處理 Hero/Thumbnail 圖片
    const heroImage = await processMetaImage(getUrl(props.HeroImage), slug, 'hero')
    const thumbnailImage = await processMetaImage(getUrl(props.ThumbnailImage), slug, 'thumbnail')

    // 5. 組裝 post 物件
    const post = {
      id: slug,
      slug: slug,
      title: title,
      subtitle: getText(props.Subtitle),
      category: getSelect(props.Category),
      categoryLabel: getText(props.CategoryLabel) || getCategoryLabel(getSelect(props.Category)),
      date: getDate(props.Date),
      readingTime: getText(props.ReadingTime) || estimateReadingTime(content),
      featured: getCheckbox(props.Featured),
      spotlight: getCheckbox(props.Spotlight),
      heroImage: heroImage,
      thumbnailImage: thumbnailImage,
      author: getText(props.Author) || 'Enn Tang',
      content
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
    console.log(`   ✅ 已寫入: src/assets/blog/${slug}/content.js`)
    if (imageCount > 0) {
      console.log(`   🖼️  下載了 ${imageCount} 張圖片`)
    }
    console.log()
  }

  console.log('✨ 同步完成！')
}

// ============ 圖片處理 ============

async function processContent(blocks, slug) {
  const content = []
  let imageCount = 0
  let imageIndex = 0

  for (const block of blocks) {
    if (block.type === 'image') {
      imageIndex++
      const imageUrl = block.image?.file?.url || block.image?.external?.url
      const caption = block.image?.caption?.[0]?.plain_text || ''

      if (imageUrl) {
        const localPath = await downloadImage(imageUrl, slug, `image-${imageIndex}`)
        if (localPath) {
          content.push({
            type: 'image',
            src: localPath,
            caption: caption,
            width: 'full'
          })
          imageCount++
        }
      }
    } else {
      const item = convertBlock(block)
      if (item) content.push(item)
    }
  }

  return {
    content: mergeListItems(content),
    imageCount
  }
}

async function processMetaImage(url, slug, name) {
  if (!url) return ''

  // 如果已經是本地路徑，直接返回
  if (url.startsWith('/')) return url

  // 下載並返回本地路徑
  const localPath = await downloadImage(url, slug, name)
  return localPath || url
}

async function downloadImage(url, slug, name) {
  try {
    // 建立目錄
    const imageDir = join(IMAGE_DIR, slug)
    if (!existsSync(imageDir)) {
      mkdirSync(imageDir, { recursive: true })
    }

    // 取得副檔名
    const urlPath = new URL(url).pathname
    let ext = extname(urlPath).split('?')[0] || '.png'
    if (!ext.match(/^\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      ext = '.png'
    }

    const filename = `${name}${ext}`
    const filepath = join(imageDir, filename)
    const publicPath = `/blog-images/${slug}/${filename}`

    // 下載圖片
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
      // 處理重定向
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

// ============ Notion API ============

async function getAllBlocks(pageId) {
  const blocks = []
  let cursor = undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100
    })
    blocks.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return blocks
}

// ============ 內容轉換 ============

function convertBlock(block) {
  const type = block.type

  switch (type) {
    case 'paragraph':
      const text = getRichText(block.paragraph?.rich_text)
      return text || null

    case 'heading_2':
      return { type: 'h2', text: getRichText(block.heading_2?.rich_text) }

    case 'heading_3':
      return { type: 'h3', text: getRichText(block.heading_3?.rich_text) }

    case 'bulleted_list_item':
      return { type: 'list-item', text: getRichText(block.bulleted_list_item?.rich_text) }

    case 'numbered_list_item':
      return { type: 'ordered-list-item', text: getRichText(block.numbered_list_item?.rich_text) }

    case 'quote':
      return { type: 'quote', text: getRichText(block.quote?.rich_text) }

    case 'callout':
      return {
        type: 'callout',
        text: getRichText(block.callout?.rich_text),
        icon: block.callout?.icon?.emoji || ''
      }

    case 'code':
      return {
        type: 'code',
        language: block.code?.language || '',
        content: getRichText(block.code?.rich_text)
      }

    case 'divider':
      return { type: 'divider' }

    case 'image':
      // 圖片在 processContent 中單獨處理
      return null

    default:
      return null
  }
}

function getRichText(richTextArray) {
  if (!richTextArray || richTextArray.length === 0) return ''
  return richTextArray.map(rt => rt.plain_text).join('')
}

function mergeListItems(content) {
  const result = []
  let currentList = null

  for (const item of content) {
    if (!item) continue

    if (item?.type === 'list-item') {
      if (!currentList || currentList.type !== 'list') {
        currentList = { type: 'list', items: [] }
        result.push(currentList)
      }
      currentList.items.push(item.text)
    } else if (item?.type === 'ordered-list-item') {
      if (!currentList || currentList.type !== 'orderedList') {
        currentList = { type: 'orderedList', items: [] }
        result.push(currentList)
      }
      currentList.items.push(item.text)
    } else {
      currentList = null
      result.push(item)
    }
  }

  return result
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

function getCategoryLabel(category) {
  const labels = {
    design: 'Design',
    tooling: 'Tools & Practice',
    self: 'Self'
  }
  return labels[category] || category
}

function estimateReadingTime(content) {
  const text = content
    .filter(c => typeof c === 'string')
    .join(' ')
  const chars = text.length
  const minutes = Math.max(1, Math.ceil(chars / 500))
  return `${minutes} min read`
}

main().catch(console.error)
