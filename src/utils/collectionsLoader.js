import enCollections from '../assets/collections.en-US.json'
import zhCollections from '../assets/collections.zh-TW.json'
import jaCollections from '../assets/collections.ja-JP.json'

// Collection 和 Case Study 一樣來自 Notion 的 Portfolio Sync 資料庫（Category = Collection），
// 由 npm run sync:projects 產生這三個檔案，不要手改。
const collectionsByLanguage = {
  'en-US': enCollections,
  'zh-TW': zhCollections,
  'ja-JP': jaCollections,
}

export function getCollectionsByLanguage(language) {
  return collectionsByLanguage[language] || collectionsByLanguage['en-US']
}
