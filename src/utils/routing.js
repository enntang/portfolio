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

function normalizeBaseUrl(baseUrl) {
  let base = baseUrl || '/'
  if (!base.startsWith('/')) base = '/' + base
  // Vite's import.meta.env.BASE_URL is typically '/' or '/repo/' (with trailing slash)
  if (!base.endsWith('/')) base = base + '/'
  return base
}

function stripBaseUrl(pathname) {
  const base = normalizeBaseUrl(import.meta.env.BASE_URL)
  let raw = pathname || '/'
  if (!raw.startsWith('/')) raw = '/' + raw

  // Root deploy
  if (base === '/') return raw

  // Exact base path like '/repo' or '/repo/'
  const baseNoTrailing = base.endsWith('/') ? base.slice(0, -1) : base
  if (raw === baseNoTrailing || raw === base) return '/'

  if (raw.startsWith(base)) {
    const rest = raw.slice(base.length)
    return rest ? '/' + rest : '/'
  }

  return raw
}

function withBaseUrl(pathname) {
  const base = normalizeBaseUrl(import.meta.env.BASE_URL)
  let p = pathname || '/'
  if (!p.startsWith('/')) p = '/' + p

  if (base === '/') return p
  // If navigating to app "root", preserve trailing slash so hash anchors become `${base}#...`
  // e.g. GitHub Pages base '/portfolio/' => '/portfolio/#home'
  if (p === '/') return base
  // base already ends with '/'
  const joined = base + p.slice(1)
  // Remove trailing slash unless it's the root
  return joined.length > 1 && joined.endsWith('/') ? joined.slice(0, -1) : joined
}

/**
 * 從路徑中提取語言和實際路徑
 * @param {string} pathname - 完整路徑，例如 '/' 或 '/tw/portfolio' 或 '/project/mentor'
 * @returns {{lang: string, path: string}} - 語言代碼和實際路徑
 */
export function parsePath(pathname) {
  let raw = stripBaseUrl(pathname)

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
    if (!prefix) return withBaseUrl('/')
    // Simonlin style language home path
    return withBaseUrl(`/${prefix}/home`)
  }

  // Projects list maps to /portfolio
  if (normalizedPath === '/projects') {
    if (!prefix) return withBaseUrl('/portfolio')
    return withBaseUrl(`/${prefix}/portfolio`)
  }

  // Other routes
  let externalPath = normalizedPath
  if (prefix) externalPath = `/${prefix}${normalizedPath}`

  return withBaseUrl(externalPath)
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

/**
 * Get the effective client-side route path.
 * Supports legacy hash routing (#/...) and normal history routing.
 * @returns {string}
 */
export function getCurrentLocationPath() {
  const hash = window.location.hash || ''
  if (hash.startsWith('#/')) return hash.slice(1) // '/...'
  return window.location.pathname || '/'
}
