import { useState } from 'react'
import { getPublicPath } from '../../utils/path'
import LazyImage from '../utilities/LazyImage'
import { useLanguage } from '../../contexts/LanguageContext'
import { buildPath } from '../../utils/routing'

/**
 * Collection 的列表卡片：一張圖 + 標題 + 描述，點下去進到作品頁（/collection/:slug）。
 */
// 鍵盤 focus 的外框跟著網站標準色走，不要用瀏覽器預設的橘框。
const FOCUS_RING =
  'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-4 focus-visible:ring-offset-bg'

function CollectionCard({ item }) {
  const { slug, title, description, imageSrc, imageAlt } = item
  const { language } = useLanguage()
  // 橫式圖裁切填滿；正方形和直式圖完整顯示、留白處鋪模糊底。
  // 還不知道尺寸前先當成直式，因為那個樣式不會裁到圖。
  const [isLandscape, setIsLandscape] = useState(false)

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    // LazyImage 一開始畫的是 1x1 的透明佔位圖，那次 load 不能拿來判斷。
    if (naturalWidth <= 1 || naturalHeight <= 1) return
    setIsLandscape(naturalWidth > naturalHeight)
  }

  return (
    <a href={buildPath(`/collection/${slug}`, language)} className={`group block ${FOCUS_RING}`}>
      {/* 封面圖的比例不一定等於 4:3 的框：
          橫式圖直接裁切填滿；正方形和直式圖整張顯示，留白處鋪上同一張圖
          放大模糊打淡當底。兩層是同一個網址，瀏覽器只會抓一次。 */}
      <div className='relative overflow-hidden rounded-md bg-gray-100 aspect-[4/3]'>
        {imageSrc && (
          <>
            {!isLandscape && (
              <img
                src={getPublicPath(imageSrc)}
                alt=''
                aria-hidden='true'
                loading='lazy'
                className='absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60'
              />
            )}
            <LazyImage
              src={getPublicPath(imageSrc)}
              alt={imageAlt || title}
              onLoad={handleImageLoad}
              className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                isLandscape ? 'object-cover' : 'object-contain'
              }`}
            />
          </>
        )}
      </div>

      <h3 className='mt-5 mobile:mt-4 text-h3 mobile:text-h3-mobile text-gray-900'>{title}</h3>
      <p className='mt-2 text-caption leading-relaxed text-gray-700 line-clamp-3'>{description}</p>
    </a>
  )
}

export default CollectionCard
