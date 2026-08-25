import { useEffect, useRef, useState } from 'react'
import Navbar from './components/utilities/Navbar'
import BtnWhite from './components/utilities/BtnWhite'
import { getPublicPath } from './utils/path'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { getProjectsByLanguage } from './utils/projectsLoader'
import { buildPath } from './utils/routing'
import { splitProjectTitle } from './utils/projectTitle'
import { getCollectionsByLanguage } from './utils/collectionsLoader'
import CollectionCard from './components/projects/CollectionCard'
import ProjectViewToggle, { CASE_STUDY_VIEW, COLLECTION_VIEW } from './components/projects/ProjectViewToggle'
import ProjectTagFilter from './components/projects/ProjectTagFilter'
import ListLoading from './components/projects/ListLoading'
import { collectTags, filterByTag } from './utils/tags'

// Chivalry has no dedicated banner artwork; mirror its case study's palette instead.
import chivalryCover from './assets/projects/chivalry/image/chivalry-cover-transparent.png'
import chivalryTexture from './assets/projects/chivalry/image/chivalry-background-rulebook.png'
// Same story for the textbook: reuse the case study's own background and one of its illustrations.
import textbookBg from './assets/projects/textbook/image/bg-3@2x.webp'
import textbookIllust from './assets/projects/textbook/image/illust-1.webp'

const CHIVALRY_BG = '#420C22'

// Banner backgrounds follow the shipped artwork ratio: wide on desktop, portrait on mobile.
const BANNER_ASPECT = 'aspect-[2168/782] mobile:aspect-[7/10]'

function ProjectBanner({
  href,
  desktopSrc,
  mobileSrc,
  title,
  subtitle,
  kicker, // small category label above the title, e.g. "Board Game" above "Chivalry"
  description,
  align = 'left',
  cta = 'Case Study',
  comingSoon = false,
  variant = 'dark', // 'dark' or 'light'
  mainImage,
  mainImageClass = 'max-w-[200px] max-h-[200px]',
  mainImageClassMobile = 'max-w-[130px] max-h-[130px]',
  // Takes the desktop artwork out of the flex row so it can be as large as it likes
  // without squeezing the text column. The text sits on top of it (it already carries z-10).
  mainImageFloat = false,
  aspectClass = BANNER_ASPECT, // only meaningful without banner artwork, where the box is ours to size
  bgColor, // used instead of desktopSrc/mobileSrc when a project has no banner artwork
  bgImage, // full-strength background art, for projects whose own artwork already reads as a banner
  textureSrc, // optional texture layered over bgColor, kept faint on purpose
  t, // translation function
}) {
  // 根据 variant 决定文字颜色
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleColor = variant === 'dark' ? 'text-white/90' : 'text-gray-900/80'
  const descriptionColor = variant === 'dark' ? 'text-white/90 mobile:text-gray-100' : 'text-gray-900/80'

  return (
    <a href={comingSoon ? undefined : href} className='block group'>
      <div className='relative rounded-md overflow-hidden shadow-sm max-h-[70vh] md:max-h-fit'>
        {desktopSrc ? (
          <picture className='block sm:h-full sm:w-full'>
            <source media='(max-width: 768px)' srcSet={mobileSrc} />
            <img src={desktopSrc} alt={title} className='w-full h-auto block mobile:h-full mobile:object-cover sm:h-full sm:w-full sm:object-cover' />
          </picture>
        ) : (
          <div className={`block w-full ${aspectClass}`} style={{ backgroundColor: bgColor }}>
            {bgImage && (
              <img
                src={bgImage}
                alt=''
                aria-hidden='true'
                className='pointer-events-none select-none absolute inset-0 w-full h-full object-cover'
                loading='lazy'
              />
            )}
            {textureSrc && (
              <img
                src={textureSrc}
                alt=''
                aria-hidden='true'
                className='pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.06]'
                loading='lazy'
              />
            )}
          </div>
        )}

        <div className={`absolute inset-0 p-10 mobile:p-6 flex items-center justify-between ${align === 'right' ? 'mobile:flex-col-reverse' : 'mobile:flex-col'} mobile:justify-center`}>
          
          {mainImage && (
            <div className={`hidden mobile:flex mobile:justify-center ${align === 'right' ? 'mt-4' : 'mb-4'}`}>
              <img 
                src={mainImage} 
                alt='' 
                className={`${mainImageClassMobile} w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]`}
              />
            </div>
          )}

          
          {mainImage && align === 'right' && (
            <div className={mainImageFloat ? 'mobile:hidden absolute left-4 top-1/2 -translate-y-1/2' : 'mobile:hidden mr-8'}>
              <img
                src={mainImage}
                alt=''
                className={`${mainImageClass} w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]`}
              />
            </div>
          )}

          <div className={`${align === 'right' ? 'text-right ml-auto mobile:ml-0 mobile:text-center' : 'mobile:text-center'} max-w-[520px] mobile:max-w-full z-10`}>
            {kicker && (
              <div className={`${subtitleColor} text-h3 tracking-wide mb-1`}>
                {kicker}
              </div>
            )}
            <h3 className={`${textColor} text-h2 leading-tight mobile:text-h2-mobile mb-2`}>
              {title}
            </h3>
            {subtitle && (
              <div className={`${subtitleColor} text-h3 tracking-wide mb-3 mobile:mb-2`}>
                {subtitle}
              </div>
            )}
            {description && (
              <p className={`${descriptionColor} text-caption leading-relaxed mb-6 mobile:mb-4 max-w-[520px]`}>
                {description}
              </p>
            )}

            {!comingSoon ? (
              <BtnWhite 
                name={cta || (t ? t('projects.caseStudy') : 'Case Study')} 
                variant={variant === 'light' ? 'bordered' : 'default'} 
                // Avoid nested <a> inside the outer banner <a>
                as="span"
              />
            ) : (
              <span className='inline-flex items-center bg-white/80 text-gray-700 rounded-full px-4 py-1.5 text-sm font-medium'>
                {t ? t('projects.comingSoon') : 'Coming Soon'}
              </span>
            )}
          </div>

          
          {mainImage && align === 'left' && (
            <div className={mainImageFloat ? 'mobile:hidden absolute right-10 top-1/2 -translate-y-1/2' : 'mobile:hidden ml-8'}>
              <img
                src={mainImage}
                alt=''
                className={`${mainImageClass} w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]`}
              />
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

// Per-project banner artwork and styling. A project only appears in the list once
// it has an entry here; `imageKey` points at /projectList-bg-<key>-{desktop,mobile}.png,
// and projects without banner artwork fall back to `bgColor` + `textureSrc`.
const projectVisuals = {
  'mentor': {
    imageKey: 'memtor',
    icon: '/projectList-icon-mentor.png',
    variant: 'dark',
    align: 'left',
  },
  'ehairpos': {
    imageKey: 'ehairpos',
    icon: '/projectList-icon-ehairpos.png',
    variant: 'light',
    align: 'left',
  },
  'penguin-territory': {
    imageKey: 'penguin',
    icon: '/projectList-icon-penguin.png',
    // Subtitle is the medium ("回合制網頁遊戲"), so it reads as a kicker.
    subtitleAsKicker: true,
    variant: 'light',
    align: 'right',
  },
  'chivalry': {
    // No banner artwork yet — reuse the case study's background colour and rulebook texture.
    bgColor: CHIVALRY_BG,
    textureSrc: chivalryTexture,
    mainImage: chivalryCover,
    // The cover is a wide logotype, so it needs more width than the square icons.
    mainImageClass: 'max-w-[280px] max-h-[160px]',
    mainImageClassMobile: 'max-w-[200px] max-h-[112px]',
    // Subtitle is the medium ("Board Game"), so it reads as a kicker.
    subtitleAsKicker: true,
    variant: 'dark',
    align: 'left',
  },
  'textbook': {
    // No banner artwork yet — the case study's own cover-section background reads as one,
    // and it is pale enough to take dark text.
    bgImage: textbookBg,
    mainImage: textbookIllust,
    // The illustration is wide (1862x1091), so height is what actually constrains it.
    // Kept narrower than Chivalry's logotype: this is the longest title in the list
    // (three lines in English) and the banner box is a fixed aspect, so the text
    // column is what needs the room.
    // Floated out of the flex row so its size is independent of the text column.
    // The text carries z-10, so it reads on top wherever the two meet.
    mainImageFloat: true,
    mainImageClass: 'max-w-[294px] max-h-[168px]',
    mainImageClassMobile: 'max-w-[260px] max-h-[165px]',
    // Longest kicker+title pair in the list, and the background is a texture rather than
    // composed artwork, so the box can afford to be a little taller than the shipped banners.
    aspectClass: 'aspect-[2168/860] mobile:aspect-[7/10]',
    // Subtitle is the medium ("History Textbook"), so it reads as a kicker.
    subtitleAsKicker: true,
    variant: 'light',
    align: 'right',
  },
}

// 換標籤時假裝在載入的時間。純粹是為了讓篩選有「真的在篩」的手感，不是真的在等資料。
const FILTER_DELAY_MS = 500

// 目前看的是哪一區塊會寫進網址（?view=collection），重新整理或分享連結才不會跳回 Case Study。
const VIEW_PARAM = 'view'

function readViewFromUrl() {
  if (typeof window === 'undefined') return CASE_STUDY_VIEW
  const params = new URLSearchParams(window.location.search)
  return params.get(VIEW_PARAM) === COLLECTION_VIEW ? COLLECTION_VIEW : CASE_STUDY_VIEW
}

function writeViewToUrl(view) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (view === COLLECTION_VIEW) {
    url.searchParams.set(VIEW_PARAM, COLLECTION_VIEW)
  } else {
    url.searchParams.delete(VIEW_PARAM)
  }
  // 換的是同一頁的檢視，不是換頁，所以用 replaceState 不留下一筆上一頁。
  window.history.replaceState({}, '', url)
}

function ProjectsList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [view, setView] = useState(readViewFromUrl)
  const [selectedTag, setSelectedTag] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimer = useRef(null)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const projectsData = getProjectsByLanguage(language)
  const allCollections = getCollectionsByLanguage(language)
  const collections = filterByTag(allCollections, selectedTag)

  // 兩個分頁各自算自己的標籤清單，切換分頁時清掉選取（不然會停在對面沒有的標籤上）。
  const isCollectionView = view === COLLECTION_VIEW
  const availableTags = collectTags(isCollectionView ? allCollections : projectsData)
  const totalCount = isCollectionView ? allCollections.length : projectsData.length

  const handleTagChange = (nextTag) => {
    if (nextTag === selectedTag) return
    setSelectedTag(nextTag)
    setIsFiltering(true)
    clearTimeout(filterTimer.current)
    filterTimer.current = setTimeout(() => setIsFiltering(false), FILTER_DELAY_MS)
  }

  useEffect(() => () => clearTimeout(filterTimer.current), [])

  const handleViewChange = (next) => {
    if (next === view) return
    setView(next)
    setSelectedTag('')
    setIsFiltering(false)
    clearTimeout(filterTimer.current)
    writeViewToUrl(next)
  }

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const banners = filterByTag(projectsData, selectedTag)
    .filter(p => projectVisuals[p.slug])
    .map(p => {
      const visuals = projectVisuals[p.slug]
      const { mainTitle, subtitle } = splitProjectTitle(p.title)
      // Notion always stores the project name as the title and the category or tagline as
      // the subtitle, so the name is always the headline. Subtitles that name a medium
      // ("Board Game", "回合制網頁遊戲") read better as a small kicker above the name;
      // tagline-style subtitles ("Not just a product, but a team") stay below it.
      const subtitleIsCategory = visuals.subtitleAsKicker === true

      return {
        href: buildHref(`/project/${p.slug}`),
        // Public assets should be referenced by URL (and base-prefixed via getPublicPath),
        // not imported from /public (Vite disallows that).
        desktopSrc: visuals.imageKey ? getPublicPath(`/projectList-bg-${visuals.imageKey}-desktop.png`) : undefined,
        mobileSrc: visuals.imageKey ? getPublicPath(`/projectList-bg-${visuals.imageKey}-mobile.png`) : undefined,
        aspectClass: visuals.aspectClass,
        bgColor: visuals.bgColor,
        bgImage: visuals.bgImage,
        textureSrc: visuals.textureSrc,
        title: mainTitle,
        subtitle: subtitleIsCategory ? '' : subtitle,
        kicker: subtitleIsCategory ? subtitle : '',
        description: p.description,
        align: visuals.align,
        // Every listed project page is live; do not force a "coming soon" state.
        comingSoon: false,
        variant: visuals.variant,
        mainImage: visuals.mainImage || (visuals.icon ? getPublicPath(visuals.icon) : null),
        mainImageClass: visuals.mainImageClass,
        mainImageClassMobile: visuals.mainImageClassMobile,
        mainImageFloat: visuals.mainImageFloat,
      }
    })

  return (
    <div className='min-h-screen bg-bg'>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      <main className='pt-24 relative'>
        {/* 標題和控制列同一個區塊：不吃 max-w-3xl，整個頁面寬只留左右邊距，
            標題靠左，標籤才也排得開。左右的 px-6 要跟 Navbar 一致，
            Logo、標題、控制列的左邊界才會切齊。 */}
        <div className='mb-12 px-6'>
          <h1 className='text-h1 mobile:text-mobile-h1 mb-8 text-gray-800'>
            {t('projects.title')}
          </h1>

          {/* 標籤篩選 + Case Study / Collection 切換。
              桌機左右並排；手機上下疊，且切換鈕在上（flex-col-reverse）。 */}
          <div className='flex items-center justify-between gap-x-8 gap-y-4 mobile:flex-col-reverse'>
            {/* 包一層 flex-1：這樣切換鈕永遠貼在右邊，不會因為標籤少或沒有標籤而跑位 */}
            <div className='flex-1 min-w-0 mobile:w-full'>
              <ProjectTagFilter
                tags={availableTags}
                selectedTag={selectedTag}
                onChange={handleTagChange}
                allLabel={t('projects.allTags')}
                count={totalCount}
                t={t}
              />
            </div>

            <ProjectViewToggle
              value={view}
              onChange={handleViewChange}
              caseStudyLabel={t('projects.tabs.caseStudy')}
              collectionLabel={t('projects.tabs.collection')}
              switchLabel={t('projects.tabs.switchLabel')}
            />
          </div>
        </div>

        {/* Project Banners */}
        {view === CASE_STUDY_VIEW && (
        <div className='max-w-3xl mx-auto px-8 space-y-10 mobile:space-y-6 pb-10'>
          {/* 兩張 banner 加中間的間距（254 * 2 + 40），手機的 banner 是直式所以另外抓 */}
          {isFiltering && <ListLoading minHeightClass='min-h-[548px] mobile:min-h-[70vh]' />}
          {!isFiltering && banners.length === 0 && (
            <p className='text-p text-center text-gray-500 py-16'>{t('projects.noMatch')}</p>
          )}
          {!isFiltering && banners.map(b => (
            <ProjectBanner
              key={b.title}
              href={b.href}
              desktopSrc={b.desktopSrc}
              mobileSrc={b.mobileSrc}
              title={b.title}
              subtitle={b.subtitle}
              kicker={b.kicker}
              description={b.description}
              align={b.align}
              comingSoon={b.comingSoon}
              variant={b.variant}
              mainImage={b.mainImage}
              mainImageClass={b.mainImageClass}
              mainImageClassMobile={b.mainImageClassMobile}
              mainImageFloat={b.mainImageFloat}
              aspectClass={b.aspectClass}
              bgColor={b.bgColor}
              bgImage={b.bgImage}
              textureSrc={b.textureSrc}
              t={t}
            />
          ))}
        </div>
        )}

        {/* Collection：只有一張圖 + 標題 + 描述，點圖片用燈箱看大圖 */}
        {view === COLLECTION_VIEW && (
          <div className='max-w-3xl mx-auto px-8 pb-10'>
            {isFiltering ? (
              /* Collection 是兩欄，所以「兩個項目」剛好是一列：圖 4:3 加標題與描述 */
              <ListLoading minHeightClass='min-h-[340px] mobile:min-h-[60vh]' />
            ) : collections.length > 0 ? (
              <div className='grid grid-cols-2 mobile:grid-cols-1 gap-x-8 gap-y-12 mobile:gap-y-8'>
                {collections.map(item => (
                  <CollectionCard key={item.slug} item={item} />
                ))}
              </div>
            ) : (
              <p className='text-p text-center text-gray-500 py-16'>
                {selectedTag ? t('projects.noMatch') : t('projects.collectionEmpty')}
              </p>
            )}
          </div>
        )}

        <div className='max-w-6xl mx-auto px-8 pb-16 text-center text-sm text-gray-400'>
          {t('common.copyright')}
        </div>
      </main>
    </div>
  )
}

export default ProjectsList
