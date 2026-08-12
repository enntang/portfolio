/**
 * 專案標題拆分：標題格式為「前綴：副標」，例如
 * - "Mentor: Not just a product, but a team"
 * - "桌上遊戲：騎士精神"
 *
 * 中日文文案使用全形「：」，英文使用半形 ":"，兩者都要視為分隔符，
 * 否則同一個專案在不同語系會有不同的排版結果。
 *
 * @param {string} title
 * @returns {{ mainTitle: string, subtitle: string }}
 */
export function splitProjectTitle(title) {
  const raw = title || ''
  const colonIndex = raw.search(/[:：]/)

  if (colonIndex === -1) {
    // 沒有冒號時，去掉尾端的括號註記，整串作為主標題
    return { mainTitle: (raw.split(' (')[0] || raw).trim(), subtitle: '' }
  }

  return {
    mainTitle: raw.slice(0, colonIndex).trim(),
    subtitle: raw.slice(colonIndex + 1).trim(),
  }
}
