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
