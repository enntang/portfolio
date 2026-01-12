import { useLanguage } from '../contexts/LanguageContext'
import enTranslations from '../locales/en-US.json'
import zhTranslations from '../locales/zh-TW.json'
import jaTranslations from '../locales/ja-JP.json'

const translations = {
  'en-US': enTranslations,
  'zh-TW': zhTranslations,
  'ja-JP': jaTranslations,
}

export function useTranslation() {
  const { language } = useLanguage()
  
  const t = (key, defaultValue = '') => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue || key
      }
    }
    
    return value || defaultValue || key
  }
  
  return { t, language }
}
