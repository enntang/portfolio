import { useState } from 'react'
import Navbar from './components/utilities/Navbar'
import NotFound from './NotFound'
import { getPublicPath } from './utils/path'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { getCollectionsByLanguage } from './utils/collectionsLoader'
import { getTagLabel, tagToSlug } from './utils/tags'
import { buildPath } from './utils/routing'

/**
 * Collection 的作品頁：左邊是標題／描述／標籤，右邊是直向捲動的圖片列。
 *
 * 圖片來自 Notion 頁面內容裡的圖片區塊（同步時已轉成 WebP）。
 */
function CollectionPage({ slug }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()

  const item = getCollectionsByLanguage(language).find(entry => entry.slug === slug)
  if (!item) return <NotFound />

  // 沒有內容圖片時退回封面，至少有一張可以看；兩者都沒有就整個不畫圖片區。
  const images = item.images && item.images.length ? item.images : [item.imageSrc].filter(Boolean)
  const hasImages = images.length > 0

  return (
    <div className='min-h-screen bg-bg flex flex-col'>
      {/* 回上頁的方式跟 Case Study 的作品頁一致：左上角一顆返回箭頭。
          arrow 版型的置中 logo 是 isWhite 為 true 時才轉白字，那是給 Case Study
          那種深色 hero 用的；這一頁底色是淺的，所以要傳 false 才看得到 logo。 */}
      <Navbar
        isWhite={false}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant='arrow'
      />

      {/* 桌機版整個 main 就是一個滿版畫面（扣掉 navbar 的 pt-24），右欄自己捲動，
          左欄固定不動。手機版維持依內容長度、整頁一起捲。 */}
      <main className='pt-24 h-screen mobile:h-auto mobile:pb-12 flex flex-col'>
        <div className='flex-1 min-h-0 flex mobile:flex-col gap-10 mobile:gap-8'>
          {/* 左欄：文字。窄一點，把空間讓給圖片。 */}
          <div className={`${hasImages ? 'w-[26%] pr-2' : 'w-full max-w-3xl mx-auto'} mobile:w-full shrink-0 pl-6 mobile:px-6 flex flex-col justify-center`}>
            <h1 className='text-h1 mobile:text-mobile-h1 text-gray-900'>{item.title}</h1>

            {/* Notion 的描述可能有換行，whitespace-pre-line 才不會被壓成一整段 */}
            {item.description && (
              <p className='mt-4 text-caption leading-relaxed text-gray-700 whitespace-pre-line'>
                {item.description}
              </p>
            )}

            {/* 標籤點下去回到作品列表的 Collection 分頁，並且直接套用那個標籤的篩選 */}
            {item.tags && item.tags.length > 0 && (
              <ul className='mt-6 flex flex-wrap gap-2'>
                {item.tags.map(tag => (
                  <li key={tag}>
                    <a
                      href={`${buildPath('/projects', language)}?view=collection&tag=${tagToSlug(tag)}`}
                      className='inline-block rounded-full border border-gray-300 px-3 py-1 text-caption text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
                    >
                      {getTagLabel(t, tag)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 右欄：直向捲動的圖片列。桌機版只有這一欄會捲，手機版跟著整頁捲。 */}
          {hasImages && (
            <div className='flex-1 min-w-0 h-full mobile:h-auto overflow-y-auto mobile:overflow-visible pr-6 pb-6 mobile:px-6 mobile:pb-0 flex flex-col gap-6'>
              {images.map((src, index) => (
                <img
                  key={src}
                  src={getPublicPath(src)}
                  alt={index === 0 ? item.imageAlt || item.title : ''}
                  className='w-full h-auto object-contain rounded-xl'
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <div className='px-6 pt-10 pb-10 mobile:pt-0 text-center text-sm text-gray-400'>
        {t('common.copyright')}
      </div>
    </div>
  )
}

export default CollectionPage
