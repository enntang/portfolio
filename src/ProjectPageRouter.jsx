import { useLanguage } from './contexts/LanguageContext'
import NotFound from './NotFound.jsx'

// Eagerly load per-project pages with language variants
// Convention:
// - src/assets/projects/<slug>/Page.jsx (default/English)
// - src/assets/projects/<slug>/Page.en.jsx (English)
// - src/assets/projects/<slug>/Page.zh.jsx (Traditional Chinese)
// - src/assets/projects/<slug>/Page.ja.jsx (Japanese)
// - or src/assets/projects/<slug>/index.jsx (fallback)

// Load all page variants
const pageModules = import.meta.glob('./assets/projects/*/Page*.jsx', { eager: true, import: 'default' })
const indexModules = import.meta.glob('./assets/projects/*/index.jsx', { eager: true, import: 'default' })
// New convention: per-language folder
// - src/assets/projects/<slug>/en/Page.jsx
// - src/assets/projects/<slug>/zh/Page.jsx
// - src/assets/projects/<slug>/ja/Page.jsx
const folderPageModules = import.meta.glob('./assets/projects/*/*/Page.jsx', { eager: true, import: 'default' })

function buildSlugToComponentMap() {
  const map = {}
  
  // Helper to extract slug and language from path
  const parsePath = (path) => {
    const afterBase = path.split('/assets/projects/')[1] || ''
    const parts = afterBase.split('/')
    const slug = parts[0] || ''
    
    // Check for language variant in filename
    let lang = 'en' // default
    if (parts[1]) {
      const filename = parts[1]
      if (filename.includes('Page.zh.jsx')) lang = 'zh'
      else if (filename.includes('Page.ja.jsx')) lang = 'ja'
      else if (filename.includes('Page.en.jsx')) lang = 'en'
      else if (filename.includes('Page.jsx')) lang = 'en' // default Page.jsx is English
    }
    
    return { slug, lang }
  }

  // Helper to extract slug and language from folder page path
  const parseFolderPath = (path) => {
    const afterBase = path.split('/assets/projects/')[1] || ''
    const parts = afterBase.split('/')
    const slug = parts[0] || ''
    const langFolder = parts[1] || 'en'
    const lang = (langFolder === 'zh' || langFolder === 'ja' || langFolder === 'en') ? langFolder : 'en'
    return { slug, lang }
  }
  
  // Process Page*.jsx files
  Object.entries(pageModules).forEach(([path, Comp]) => {
    const { slug, lang } = parsePath(path)
    if (slug && Comp) {
      if (!map[slug]) {
        map[slug] = {}
      }
      map[slug][lang] = Comp
    }
  })

  // Process <lang>/Page.jsx folder convention (preferred if both exist)
  Object.entries(folderPageModules).forEach(([path, Comp]) => {
    const { slug, lang } = parseFolderPath(path)
    if (slug && Comp) {
      if (!map[slug]) {
        map[slug] = {}
      }
      map[slug][lang] = Comp
    }
  })
  
  // Process index.jsx files (fallback, treated as English)
  Object.entries(indexModules).forEach(([path, Comp]) => {
    const afterBase = path.split('/assets/projects/')[1] || ''
    const slug = afterBase.split('/')[0] || ''
    if (slug && Comp) {
      if (!map[slug]) {
        map[slug] = {}
      }
      // index.jsx as fallback English
      if (!map[slug]['en']) {
        map[slug]['en'] = Comp
      }
    }
  })
  
  return map
}

const slugToComponentMap = buildSlugToComponentMap()

function ProjectPageRouter({ slug }) {
  const { getLanguageCode } = useLanguage()
  const langCode = getLanguageCode() // Returns 'en', 'zh', or 'ja'
  
  const projectMap = slugToComponentMap[slug]
  if (!projectMap) {
    return <NotFound />
  }
  
  // Try to get component for current language, fallback to English, then any available
  let Component = projectMap[langCode] || projectMap['en'] || Object.values(projectMap)[0]
  
  if (!Component) {
    return <NotFound />
  }
  
  return <Component />
}

export default ProjectPageRouter


