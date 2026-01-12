# 多語系設定說明

本專案已支援中、英、日三種語系切換。

## 架構說明

### 1. 路由方式
- 使用 URL 參數：`?lang=en`, `?lang=zh-TW`, `?lang=ja`
- 預設語言：英文（無參數時）
- 範例：
  - `#/project/mentor?lang=en` (英文)
  - `#/project/mentor?lang=zh-TW` (中文)
  - `#/project/mentor?lang=ja` (日文)

### 2. 其他頁面（使用語言包）
- 語言包位置：`src/locales/`
  - `en-US.json` (英文)
  - `zh-TW.json` (繁體中文)
  - `ja-JP.json` (日文)
- 已支援的頁面：
  - Home (`/`)
  - About (`/about`)
  - Projects List (`/projects`)
  - Blog List (`/blog`)

### 3. 專案作品頁面（獨立檔案方式）

每個專案需要建立不同語言版本的檔案：

#### 檔案結構
```
src/assets/projects/<slug>/
├── Page.jsx              (預設/英文版，當找不到對應語言時使用)
├── Page.en.jsx           (英文版，可選，與 Page.jsx 相同)
├── Page.zh.jsx           (繁體中文版)
├── Page.ja.jsx           (日文版)
├── images/               (共用圖片資料夾)
│   ├── icon-arrow-down.svg
│   └── ...
├── en/                   (英文版專屬圖片)
│   ├── projectInfo-xxx-screenshot1.png
│   └── ...
├── zh/                   (中文版專屬圖片)
│   ├── projectInfo-xxx-screenshot1.png
│   └── ...
└── ja/                   (日文版專屬圖片)
    ├── projectInfo-xxx-screenshot1.png
    └── ...
```

#### 圖片引用方式

在各語言版本的 `Page.jsx` 中，從對應的圖片資料夾 import：

**Page.zh.jsx (中文版)**
```jsx
// 共用圖片（從 images/ 資料夾）
import arrowDown from './images/icon-arrow-down.svg'

// 中文版專屬圖片（從 zh/ 資料夾）
import screenshot1 from './zh/projectInfo-mentor-screenshot1.png'
import bg1 from './zh/projectInfo-mentor-bg-1.png'
```

**Page.en.jsx (英文版)**
```jsx
// 共用圖片
import arrowDown from './images/icon-arrow-down.svg'

// 英文版專屬圖片
import screenshot1 from './en/projectInfo-mentor-screenshot1.png'
import bg1 from './en/projectInfo-mentor-bg-1.png'
```

**Page.ja.jsx (日文版)**
```jsx
// 共用圖片
import arrowDown from './images/images/icon-arrow-down.svg'

// 日文版專屬圖片
import screenshot1 from './ja/projectInfo-mentor-screenshot1.png'
import bg1 from './ja/projectInfo-mentor-bg-1.png'
```

### 4. 專案列表資料

專案列表的標題和描述已支援多語系：
- `src/assets/projects.en-US.json` (英文)
- `src/assets/projects.zh-TW.json` (繁體中文)
- `src/assets/projects.ja-JP.json` (日文)

系統會根據當前語言自動載入對應的專案列表資料。

## 使用方式

### 在組件中使用翻譯

```jsx
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

function MyComponent() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  
  return (
    <div>
      <h1>{t('home.greeting')}</h1>
      <p>Current language: {language}</p>
    </div>
  )
}
```

### 在連結中加入語言參數

```jsx
import { useLanguage } from '../contexts/LanguageContext'

function MyComponent() {
  const { language } = useLanguage()
  
  const addLangToHref = (href) => {
    if (!href) return href
    if (href.startsWith('#')) {
      const langCode = language === 'zh-TW' ? 'zh-TW' : language === 'ja-JP' ? 'ja' : 'en'
      if (langCode !== 'en') {
        return `${href}?lang=${langCode}`
      }
    }
    return href
  }
  
  return <a href={addLangToHref('#/about')}>About</a>
}
```

## 語言切換器

Navbar 右上角已加入語言切換器，點擊即可切換語言：
- **EN** - 英文
- **中** - 繁體中文
- **日** - 日文

語言選擇會保存在 localStorage，並在 URL 中顯示。

## 注意事項

1. **專案頁面檔案命名**：
   - 必須使用 `Page.zh.jsx`、`Page.en.jsx`、`Page.ja.jsx` 的格式
   - `Page.jsx` 作為預設/英文版（當找不到對應語言時使用）

2. **圖片資料夾命名**：
   - 必須使用 `zh/`、`en/`、`ja/` 的格式
   - 共用圖片放在 `images/` 資料夾

3. **預設語言**：
   - 無 `lang` 參數時預設為英文（en-US）

4. **專案列表**：
   - 每個語言版本都需要維護對應的 `projects.{lang}.json` 檔案
