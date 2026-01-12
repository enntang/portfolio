/**
 * 路由工具函數
 * 支援路徑式路由（Simonlin 風格）
 * - 英文：無語言前綴
 * - 中文：/tw/...
 * - 日文：/ja/...
 *
 * URL 設計：
 * - Home:        /            (en)   | /tw/home        | /ja/home
 * - Portfolio:   /portfolio   (en)   | /tw/portfolio   | /ja/portfolio
 * - Other pages: /about       (en)   | /tw/about       | /ja/about
 * - Project:     /project/:slug      | /tw/project/:slug | /ja/project/:slug
 *
 * 內部路由（給 Router / components 用）：
 * - /            => Home
 * - /projects    => ProjectsList（對外映射到 /portfolio）
 * - /about, /blog, /project/:slug ... 그대로
 */

const LANGUAGE_PREFIXES = {
  'zh-TW': 'tw',
  'ja-JP': 'ja',
  'en-US': '', // 英文無前綴
}

const PREFIX_TO_LANGUAGE = {
  'tw': 'zh-TW',
  'ja': 'ja-JP',
  '': 'en-US',
}

/**
 * 從路徑中提取語言和實際路徑
 * @param {string} pathname - 完整路徑，例如 '/' 或 '/tw/portfolio' 或 '/project/mentor'
 * @returns {{lang: string, path: string}} - 語言代碼和實際路徑
 */
export function parsePath(pathname) {
  let raw = pathname || '/'
  if (!raw.startsWith('/')) raw = '/' + raw

  // Root: English home
  if (raw === '/' || raw === '') {
    return { lang: 'en-US', path: '/' }
  }

  const parts = raw.split('/').filter(Boolean)
  const first = parts[0] || ''

  // Determine language
  let lang = 'en-US'
  let restParts = parts
  if (first === 'tw' || first === 'ja') {
    lang = PREFIX_TO_LANGUAGE[first]
    restParts = parts.slice(1)
  }

  // If only /tw or /ja, treat as home (and later buildPath will generate /tw/home, but we accept /tw as home)
  if (restParts.length === 0) {
    return { lang, path: '/' }
  }

  const rest = '/' + restParts.join('/')

  // Map external routes to internal routes
  if (rest === '/home') return { lang, path: '/' }
  if (rest === '/portfolio') return { lang, path: '/projects' }

  return { lang, path: rest }
}

/**
 * 根據語言和路徑生成完整 URL
 * @param {string} path - 路徑，例如 '/' 或 '/projects' 或 '/project/mentor'
 * @param {string} lang - 語言代碼，例如 'zh-TW', 'ja-JP', 'en-US'
 * @returns {string} - 完整路徑，例如 '/' 或 '/portfolio' 或 '/tw/portfolio'
 */
export function buildPath(path, lang = 'en-US') {
  const prefix = LANGUAGE_PREFIXES[lang] || ''

  const normalizedPath = path && path.startsWith('/') ? path : '/' + (path || '')

  // Home
  if (normalizedPath === '/') {
    if (!prefix) return '/'
    // Simonlin style language home path
    return `/${prefix}/home`
  }

  // Projects list maps to /portfolio
  if (normalizedPath === '/projects') {
    if (!prefix) return '/portfolio'
    return `/${prefix}/portfolio`
  }

  // Other routes
  if (!prefix) return normalizedPath
  return `/${prefix}${normalizedPath}`
}

/**
 * 取得當前語言代碼（簡化版，用於檔案命名）
 * @param {string} lang - 完整語言代碼
 * @returns {string} - 'zh', 'ja', 或 'en'
 */
export function getLanguageCode(lang) {
  if (lang === 'zh-TW') return 'zh'
  if (lang === 'ja-JP') return 'ja'
  return 'en'
}

/**
 * 程式化導航到指定路徑
 * @param {string} path - 路徑，例如 '/projects' 或 '/project/mentor'
 * @param {string} lang - 語言代碼，例如 'zh-TW', 'ja-JP', 'en-US'
 */
export function navigate(path, lang = 'en-US') {
  const fullPath = buildPath(path, lang)
  window.history.pushState({}, '', fullPath)
  // 觸發自定義事件通知路由更新
  window.dispatchEvent(new Event('navigate'))
}
