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

  return (
    <a href={buildPath(`/collection/${slug}`, language)} className={`group block ${FOCUS_RING}`}>
      <div className='relative overflow-hidden rounded-md bg-gray-100 aspect-[4/3]'>
        {imageSrc && (
          <LazyImage
            src={getPublicPath(imageSrc)}
            alt={imageAlt || title}
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
          />
        )}
      </div>

      <h3 className='mt-5 mobile:mt-4 text-h3 mobile:text-h3-mobile text-gray-900'>{title}</h3>
      <p className='mt-2 text-caption leading-relaxed text-gray-700 line-clamp-3'>{description}</p>
    </a>
  )
}

export default CollectionCard
