import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import Navbar from './components/utilities/Navbar'
import NotFound from './NotFound'
import { getPublicPath } from './utils/path'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { getCollectionsByLanguage } from './utils/collectionsLoader'
import { getTagLabel } from './utils/tags'

// 圖片牆是「一直緩緩往左流」，不是每隔幾秒跳一張：autoplay 的 delay 設 0，
// 由很長的 speed（配上 index.css 裡的 linear timing）撐出等速捲動。
// speed 是「走完一張圖」的時間，所以不管幾張圖，流動速度都一樣。
const MARQUEE_MS_PER_SLIDE = 5000
// 按左右鍵時要立刻換一張，不能跟著上面那個超長的 speed 走。
const MANUAL_SPEED_MS = 500

/**
 * Collection 的作品頁：左邊是標題／描述／標籤，右邊是橫向捲動的圖片牆。
 *
 * 圖片來自 Notion 頁面內容裡的圖片區塊（同步時已轉成 WebP），只有一張時
 * 不自動播、也不顯示左右鍵，免得看起來像壞掉。
 */
function CollectionPage({ slug }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const swiperRef = useRef(null)

  // 手動換頁：緩流是一段長達 5 秒的 transition，而 Swiper 在動畫進行中會直接
  // 擋掉 slideNext/slidePrev（loopPreventsSliding），所以要先把它凍結在目前位置，
  // 用比較快的 speed 走一張，再把緩流接回去。
  const step = (direction) => {
    const swiper = swiperRef.current
    if (!swiper) return

    swiper.autoplay?.stop()
    swiper.setTransition(0)
    swiper.setTranslate(swiper.getTranslate())
    swiper.animating = false
    swiper.updateProgress()
    swiper.updateActiveIndex()
    swiper.updateSlidesClasses()

    if (direction === 'next') swiper.slideNext(MANUAL_SPEED_MS)
    else swiper.slidePrev(MANUAL_SPEED_MS)

    setTimeout(() => swiper.autoplay?.start(), MANUAL_SPEED_MS)
  }

  const item = getCollectionsByLanguage(language).find(entry => entry.slug === slug)
  if (!item) return <NotFound />

  // 沒有內容圖片時退回封面，至少有一張可以看；兩者都沒有就整個不畫圖片牆。
  const images = item.images && item.images.length ? item.images : [item.imageSrc].filter(Boolean)
  const canLoop = images.length > 1
  const hasImages = images.length > 0

  return (
    <div className='min-h-screen bg-bg flex flex-col'>
      {/* 回上頁的方式跟 Case Study 的作品頁一致：左上角一顆返回箭頭 */}
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant='arrow'
      />

      {/* 桌機版整個 main 就是一個滿版畫面（扣掉 navbar 的 pt-24），圖片牆才能撐到底，
          頁尾自然被推到畫面外。手機版維持依內容長度。 */}
      <main className='pt-24 h-screen mobile:h-auto mobile:pb-12 flex flex-col'>
        <div className='flex-1 min-h-0 flex mobile:flex-col gap-10 mobile:gap-8'>
          {/* 左欄：文字。窄一點，把空間讓給圖片牆；右邊不留 padding，圖片才能一路延伸出畫面外。 */}
          <div className={`${hasImages ? 'w-[26%] pr-2' : 'w-full max-w-3xl mx-auto'} mobile:w-full shrink-0 pl-6 mobile:px-6 flex flex-col justify-center`}>
            <h1 className='text-h1 mobile:text-mobile-h1 text-gray-900'>{item.title}</h1>

            {/* Notion 的描述可能有換行，whitespace-pre-line 才不會被壓成一整段 */}
            {item.description && (
              <p className='mt-4 text-p text-gray-700 whitespace-pre-line'>{item.description}</p>
            )}

            {item.tags && item.tags.length > 0 && (
              <ul className='mt-6 flex flex-wrap gap-2'>
                {item.tags.map(tag => (
                  <li
                    key={tag}
                    className='rounded-full border border-gray-300 px-3 py-1 text-caption text-gray-600'
                  >
                    {getTagLabel(t, tag)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 右欄：橫向圖片牆 */}
          {hasImages && (
          <div className='flex-1 min-w-0 h-full mobile:h-auto relative mobile:pl-6'>
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView='auto'
              spaceBetween={16}
              loop={canLoop}
              speed={canLoop ? MARQUEE_MS_PER_SLIDE : 0}
              freeMode={canLoop ? { enabled: true, momentum: false } : false}
              // 不加 pauseOnMouseEnter：滑鼠停在圖上就整個停住，看起來像壞掉。
              autoplay={canLoop ? { delay: 0, disableOnInteraction: false } : false}
              onSwiper={swiper => { swiperRef.current = swiper }}
              // 容器本身圓角（Swiper 的 overflow 是 hidden），圖片被裁掉的那一側就不會是硬邊
              className='collection-marquee w-full h-full mobile:h-auto rounded-2xl'
            >
              {images.map((src, index) => (
                <SwiperSlide key={src} className='!w-auto !h-full mobile:!h-auto'>
                  <img
                    src={getPublicPath(src)}
                    alt={index === 0 ? item.imageAlt || item.title : ''}
                    className='h-full mobile:h-[50vh] w-auto max-w-none object-contain rounded-xl'
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {canLoop && (
              <div className='absolute bottom-6 left-6 z-10 flex gap-3 mobile:static mobile:mt-4 mobile:justify-center'>
                <CarouselButton
                  direction='left'
                  label={t('projects.prevImage')}
                  onClick={() => step('prev')}
                />
                <CarouselButton
                  direction='right'
                  label={t('projects.nextImage')}
                  onClick={() => step('next')}
                />
              </div>
            )}
          </div>
          )}
        </div>
      </main>

      <div className='px-6 pb-10 text-center text-sm text-gray-400'>
        {t('common.copyright')}
      </div>
    </div>
  )
}

function CarouselButton({ direction, label, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={label}
      className='w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm flex items-center justify-center transition-colors hover:bg-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
    >
      <img src={getPublicPath(`/icon-arrow-${direction}.svg`)} alt='' className='w-5 h-5' />
    </button>
  )
}

export default CollectionPage
