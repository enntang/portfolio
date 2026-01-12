import { useState } from 'react'
import Navbar from './components/utilities/Navbar'
import BtnWhite from './components/utilities/BtnWhite'
import mentorImg from '../public/projectList-icon-mentor.png'
import ehairposImg from '../public/projectList-icon-ehairpos.png'
import penguinImg from '../public/projectList-icon-penguin.png'
import { getPublicPath } from './utils/path'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { getProjectsByLanguage } from './utils/projectsLoader'
import { buildPath } from './utils/routing'

function ProjectBanner({
  href,
  desktopSrc,
  mobileSrc,
  title,
  subtitle,
  description,
  align = 'left',
  cta = 'Case Study',
  comingSoon = false,
  variant = 'dark', // 'dark' or 'light'
  mainImage, // 主图
  t, // translation function
}) {
  // 根据 variant 决定文字颜色
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900'
  const subtitleColor = variant === 'dark' ? 'text-white/90' : 'text-gray-900/80'
  const descriptionColor = variant === 'dark' ? 'text-white/90 mobile:text-gray-100' : 'text-gray-900/80'

  return (
    <a href={comingSoon ? undefined : href} className='block group'>
      <div className='relative rounded-md overflow-hidden shadow-sm max-h-[70vh] md:max-h-fit'>
        <picture className='block sm:h-full sm:w-full'>
          <source media='(max-width: 768px)' srcSet={mobileSrc} />
          <img src={desktopSrc} alt={title} className='w-full h-auto block mobile:h-full mobile:object-cover sm:h-full sm:w-full sm:object-cover' />
        </picture>

        <div className={`absolute inset-0 p-10 mobile:p-6 flex items-center justify-between ${align === 'right' ? 'mobile:flex-col-reverse' : 'mobile:flex-col'} mobile:justify-center`}>
          {/* 移动端：主图（默认在上方，penguin在下方） */}
          {mainImage && (
            <div className={`hidden mobile:flex mobile:justify-center ${align === 'right' ? 'mt-4' : 'mb-4'}`}>
              <img 
                src={mainImage} 
                alt='' 
                className='max-w-[130px] max-h-[130px] w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]' 
              />
            </div>
          )}

          {/* 桌面端：align=right 时主图在左侧 */}
          {mainImage && align === 'right' && (
            <div className='mobile:hidden mr-8'>
              <img 
                src={mainImage} 
                alt='' 
                className='max-w-[200px] max-h-[200px] w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]' 
              />
            </div>
          )}

          <div className={`${align === 'right' ? 'text-right ml-auto mobile:ml-0 mobile:text-center' : 'mobile:text-center'} max-w-[520px] mobile:max-w-full z-10`}>
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
              />
            ) : (
              <span className='inline-flex items-center bg-white/80 text-gray-700 rounded-full px-4 py-1.5 text-sm font-medium'>
                {t ? t('projects.comingSoon') : 'Coming Soon'}
              </span>
            )}
          </div>

          {/* 桌面端：align=left 时主图在右侧 */}
          {mainImage && align === 'left' && (
            <div className='mobile:hidden ml-8'>
              <img 
                src={mainImage} 
                alt='' 
                className='max-w-[200px] max-h-[200px] w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[5deg]' 
              />
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

function ProjectsList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const projectsData = getProjectsByLanguage(language)
  const imageKeyMap = { 'mentor': 'memtor', 'ehairpos': 'ehairpos', 'penguin-territory': 'penguin' }

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const banners = projectsData.slice(0, 3).map((p, index) => {
    const hasColon = p.title.includes(':')
    const mainTitle = hasColon ? p.title.split(':')[0].trim() : (p.title.split(' (')[0] || p.title).trim()
    const subtitle = hasColon ? p.title.split(':').slice(1).join(':').trim() : ''
    const key = imageKeyMap[p.slug] || p.slug
    
    // 根据项目决定 variant (深色底配白字 或 淡色底配深色字)
    const variant = (p.slug === 'ehairpos' || p.slug === 'penguin-territory') ? 'light' : 'dark'
    
    // 根据项目分配主图
    let mainImage = null
    if (p.slug === 'mentor') mainImage = mentorImg
    else if (p.slug === 'ehairpos') mainImage = ehairposImg
    else if (p.slug === 'penguin-territory') mainImage = penguinImg
    
    return {
      href: buildHref(`/project/${p.slug}`),
      desktopSrc: getPublicPath(`/projectList-bg-${key}-desktop.png`),
      mobileSrc: getPublicPath(`/projectList-bg-${key}-mobile.png`),
      title: mainTitle,
      subtitle,
      description: p.description,
      align: p.slug === 'penguin-territory' ? 'right' : 'left',
      comingSoon: p.slug === 'penguin-territory',
      variant,
      mainImage,
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
        {/* Page Header */}
        <div className='max-w-3xl mx-auto px-8'>
          <h1 className='text-h1 mobile:text-mobile-h1 mb-6 text-center text-gray-800'>
            {t('projects.title')}
          </h1>
          <p className='text-p text-center text-gray-600 mb-12'>
            {t('projects.description')}
          </p>
        </div>

        {/* Project Banners */}
        <div className='max-w-3xl mx-auto px-8 space-y-10 mobile:space-y-6 pb-10'>
          {banners.map(b => (
            <ProjectBanner
              key={b.title}
              href={b.href}
              desktopSrc={b.desktopSrc}
              mobileSrc={b.mobileSrc}
              title={b.title}
              subtitle={b.subtitle}
              description={b.description}
              align={b.align}
              comingSoon={b.comingSoon}
              variant={b.variant}
              mainImage={b.mainImage}
              t={t}
            />
          ))}
        </div>

        <div className='max-w-6xl mx-auto px-8 pb-16 text-center text-sm text-gray-400'>
          {t('common.copyright')}
        </div>
      </main>
    </div>
  )
}

export default ProjectsList
