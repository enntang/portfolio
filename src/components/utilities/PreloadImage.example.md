# 圖片 Preload 功能使用說明

## 概述

提供了兩種方式來預載入重要圖片：

1. **LazyImage 組件的 `preload` prop** - 用於需要顯示但需要立即載入的圖片
2. **PreloadImage 組件** - 用於在背景預載入圖片，不顯示圖片本身

## 方法一：使用 LazyImage 的 preload prop

當你需要顯示圖片，但希望它立即開始載入（而不是等到進入視窗），可以使用 `preload` prop：

```jsx
import LazyImage from './components/utilities/LazyImage'

// 重要圖片：立即開始載入
<LazyImage 
  src="/path/to/important-image.png" 
  alt="Important image"
  preload={true}  // 設為 true 立即載入
  className="w-full h-auto"
/>

// 一般圖片：使用 lazy loading（預設）
<LazyImage 
  src="/path/to/normal-image.png" 
  alt="Normal image"
  className="w-full h-auto"
/>
```

### 使用場景
- 首頁 Hero 圖片
- 重要的產品展示圖片
- 用戶頭像（如果很重要）
- 任何需要立即顯示的關鍵圖片

## 方法二：使用 PreloadImage 組件

當你需要在背景預載入圖片，但圖片會在稍後才顯示（例如輪播圖、模態框等），使用 `PreloadImage` 組件：

```jsx
import PreloadImage from './components/utilities/PreloadImage'

// 預載入單張圖片
<PreloadImage src="/path/to/image.png" />

// 預載入多張圖片（例如輪播圖）
<PreloadImage 
  src={[
    '/path/to/image1.png',
    '/path/to/image2.png',
    '/path/to/image3.png'
  ]}
  onLoad={() => console.log('所有圖片已載入！')}
/>

// 在組件中使用
function MyComponent() {
  const carouselImages = [
    '/bg-mentor.png',
    '/bg-ehairpos.png',
    '/bg-penguin.png',
  ]

  return (
    <>
      {/* 在背景預載入輪播圖 */}
      <PreloadImage 
        src={carouselImages}
        onLoad={() => setCarouselReady(true)}
      />
      
      {/* 稍後顯示的輪播組件 */}
      <ImageCarousel images={carouselImages} />
    </>
  )
}
```

### 使用場景
- 輪播圖的所有圖片
- 模態框/彈窗中的圖片
- 下一頁可能需要的圖片
- 任何需要提前準備的圖片資源

## 方法三：使用 usePreloadImage Hook

如果你需要在組件邏輯中控制預載入：

```jsx
import { usePreloadImage } from '../hooks/usePreloadImage'

function MyComponent() {
  // 預載入單張圖片
  const isLoaded = usePreloadImage('/path/to/image.png')
  
  // 預載入多張圖片
  const allLoaded = usePreloadImage([
    '/path/to/image1.png',
    '/path/to/image2.png',
  ])

  return (
    <div>
      {allLoaded ? (
        <p>所有圖片已準備好！</p>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  )
}
```

## 實際範例

### 範例 1：首頁輪播圖預載入

```jsx
// Home.jsx
import PreloadImage from './components/utilities/PreloadImage'
import { getPublicPath } from './utils/path'

function Home() {
  const carouselImages = [
    getPublicPath('/bg-mentor.png'),
    getPublicPath('/bg-ehairpos.png'),
    getPublicPath('/bg-penguin.png'),
  ]

  return (
    <>
      {/* 預載入輪播圖 */}
      <PreloadImage src={carouselImages} />
      
      <ImageCarousel slides={carouselImages} />
    </>
  )
}
```

### 範例 2：重要圖片立即載入

```jsx
// ProjectPage.jsx
import LazyImage from './components/utilities/LazyImage'

function ProjectPage() {
  return (
    <div>
      {/* Hero 圖片：立即載入 */}
      <LazyImage 
        src="/project-hero.png"
        alt="Project hero"
        preload={true}
        className="w-full h-auto"
      />
      
      {/* 其他圖片：使用 lazy loading */}
      <LazyImage 
        src="/project-detail-1.png"
        alt="Detail 1"
        className="w-full h-auto"
      />
    </div>
  )
}
```

### 範例 3：模態框圖片預載入

```jsx
// Gallery.jsx
import { useState } from 'react'
import PreloadImage from './components/utilities/PreloadImage'
import LazyImage from './components/utilities/LazyImage'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const images = ['/img1.png', '/img2.png', '/img3.png']

  return (
    <>
      {/* 預載入所有圖片，以便快速打開模態框 */}
      <PreloadImage src={images} />
      
      <div className="grid">
        {images.map((img, idx) => (
          <LazyImage
            key={idx}
            src={img}
            alt={`Image ${idx}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      
      {selectedImage && (
        <Modal>
          <img src={selectedImage} alt="Selected" />
        </Modal>
      )}
    </>
  )
}
```

## 注意事項

1. **不要過度使用 preload**：只對真正重要的圖片使用 preload，過多預載入會影響初始載入速度
2. **優先級順序**：
   - 首屏可見的重要圖片 → 使用 `preload={true}` 的 LazyImage
   - 即將顯示的圖片（輪播、模態框）→ 使用 PreloadImage
   - 其他圖片 → 使用預設的 LazyImage（lazy loading）
3. **效能考量**：預載入會增加初始載入時間，但能改善用戶體驗，請根據實際情況權衡

