import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentLocationPath, parsePath, ROUTE_COMMIT_EVENT } from '../utils/routing'

const LanguageContext = createContext()

const SUPPORTED_LANGUAGES = {
  'en': 'en-US',
  'en-US': 'en-US',
  'zh-TW': 'zh-TW',
  'zh': 'zh-TW',
  'ja': 'ja-JP',
  'ja-JP': 'ja-JP',
}

const DEFAULT_LANGUAGE = 'en-US'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 從路徑讀取語言
    const { lang } = parsePath(getCurrentLocationPath())
    
    if (lang && SUPPORTED_LANGUAGES[lang]) {
      return SUPPORTED_LANGUAGES[lang]
    }
    
    // 從 localStorage 讀取
    const savedLang = localStorage.getItem('language')
    if (savedLang && SUPPORTED_LANGUAGES[savedLang]) {
      return SUPPORTED_LANGUAGES[savedLang]
    }
    
    return DEFAULT_LANGUAGE
  })

  // 當路徑改變時更新語言
  useEffect(() => {
    const handlePopState = () => {
      const { lang } = parsePath(getCurrentLocationPath())
      
      if (lang && SUPPORTED_LANGUAGES[lang]) {
        const newLang = SUPPORTED_LANGUAGES[lang]
        if (newLang !== language) {
          setLanguage(newLang)
          localStorage.setItem('language', newLang)
        }
      }
    }
    
    // 初始檢查
    handlePopState()

    // 只聽路由「真的換過去」的那一刻（見 useRouteTransition）：
    // 直接聽 popstate／navigate 的話，語言會在舊頁面還在退場時就先換掉。
    window.addEventListener(ROUTE_COMMIT_EVENT, handlePopState)
    return () => {
      window.removeEventListener(ROUTE_COMMIT_EVENT, handlePopState)
    }
  }, [language])

  // 讓 <html lang> 跟著網址的語言走（分享／SEO 用）
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGUAGES[newLang]) {
      console.warn(`Unsupported language: ${newLang}`)
      return
    }
    
    const normalizedLang = SUPPORTED_LANGUAGES[newLang]
    setLanguage(normalizedLang)
    localStorage.setItem('language', normalizedLang)
    
    // 注意：URL 更新由 Navbar 的 handleLanguageChange 處理
    // 這裡只更新狀態，避免重複更新 URL
  }

  // 取得簡化的語言代碼（用於專案頁面檔案命名）
  const getLanguageCode = () => {
    if (language === 'zh-TW') return 'zh'
    if (language === 'ja-JP') return 'ja'
    return 'en' // 預設英文
  }

  // 取得語言前綴（用於路徑）
  const getLanguagePrefix = () => {
    if (language === 'zh-TW') return 'tw'
    if (language === 'ja-JP') return 'ja'
    return '' // 英文無前綴
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, getLanguageCode, getLanguagePrefix }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
