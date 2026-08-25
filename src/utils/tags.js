// Notion 的 Tags 一律用英文管理（'UI/UX'、'Illustration'…），網站顯示時才翻成當前語系。
// 沒有對應翻譯的標籤直接顯示 Notion 上的原字，之後在 Notion 新增選項不必先改程式。
export function getTagLabel(t, tag) {
  return t(`projects.tagLabels.${tag}`, tag)
}

// 目前這批作品實際用到的標籤，依第一次出現的順序（也就是 Notion 的 Order）排。
export function collectTags(items) {
  const seen = []
  for (const item of items) {
    for (const tag of item.tags || []) {
      if (!seen.includes(tag)) seen.push(tag)
    }
  }
  return seen
}

// 單選：空字串代表 ALL，不過濾。
export function filterByTag(items, selectedTag) {
  if (!selectedTag) return items
  return items.filter(item => (item.tags || []).includes(selectedTag))
}

// 標籤在網址上的樣子：'UI/UX' → 'ui-ux'、'Web Design' → 'web-design'。
// 直接把 Notion 的原字塞進網址會變成 UI%2FUX 這種東西，分享出去不好看也不好讀。
export function tagToSlug(tag) {
  return (tag || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 把網址上的值對回實際的標籤。傳進來的可以是 slug（分享連結）或標籤原字
// （站內點選、或早期的舊連結），對不上就回空字串，當成沒有篩選。
export function resolveTag(value, tags) {
  if (!value) return ''
  const slug = tagToSlug(value)
  return tags.find(tag => tagToSlug(tag) === slug) || ''
}
