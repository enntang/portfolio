import { useState } from 'react'
import Navbar from './components/utilities/Navbar'
import BtnWhite from './components/utilities/BtnWhite'
import { getPublicPath } from './utils/path'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { getProjectsByLanguage } from './utils/projectsLoader'
import { buildPath } from './utils/routing'
import { splitProjectTitle } from './utils/projectTitle'

// Chivalry has no dedicated banner artwork; mirror its case study's palette instead.
import chivalryCover from './assets/projects/chivalry/image/chivalry-cover-transparent.png'
import chivalryTexture from './assets/projects/chivalry/image/chivalry-background-rulebook.png'

const CHIVALRY_BG = '#420C22'

// Banner backgrounds follow the shipped artwork ratio: wide on desktop, portrait on mobile.
const BANNER_ASPECT = 'aspect-[2168/782] mobile:aspect-[7/10]'

function ProjectBanner({
  href,
  desktopSrc,
  mobileSrc,
  title,
  subtitle,
  kicker, // small label above the title, for titles like "Board Game: Chivalry"
  description,
  align = 'left',
  cta = 'Case Study',
  comingSoon = false,
  variant = 'dark', // 'dark' or 'light'
  mainImage,
  mainImageClass = 'max-w-[200px] max-h-[200px]',
  mainImageClassMobile = 'max-w-[130px] max-h-[130px]',
  bgColor, // used instead of desktopSrc/mobileSrc when a project has no banner artwork
  textureSrc, // optional texture layered over bgColor
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
          <div className={`block w-full ${BANNER_ASPECT}`} style={{ backgroundColor: bgColor }}>
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
            <div className='mobile:hidden mr-8'>
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
            <div className='mobile:hidden ml-8'>
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
    // Title reads "<category>: Chivalry", so the category becomes the kicker.
    titleLeadsWithCategory: true,
    variant: 'dark',
    align: 'left',
  },
}

function ProjectsList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const projectsData = getProjectsByLanguage(language)

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const banners = projectsData
    .filter(p => projectVisuals[p.slug])
    .map(p => {
      const visuals = projectVisuals[p.slug]
      const { mainTitle, subtitle } = splitProjectTitle(p.title)
      // Most titles lead with the project name ("Mentor: <tagline>"), so the first
      // half is the headline. Titles that lead with the category ("Board Game: Chivalry")
      // demote that half to a kicker so the project name stays the headline.
      const leadsWithCategory = visuals.titleLeadsWithCategory === true

      return {
        href: buildHref(`/project/${p.slug}`),
        // Public assets should be referenced by URL (and base-prefixed via getPublicPath),
        // not imported from /public (Vite disallows that).
        desktopSrc: visuals.imageKey ? getPublicPath(`/projectList-bg-${visuals.imageKey}-desktop.png`) : undefined,
        mobileSrc: visuals.imageKey ? getPublicPath(`/projectList-bg-${visuals.imageKey}-mobile.png`) : undefined,
        bgColor: visuals.bgColor,
        textureSrc: visuals.textureSrc,
        title: leadsWithCategory && subtitle ? subtitle : mainTitle,
        subtitle: leadsWithCategory ? '' : subtitle,
        kicker: leadsWithCategory && subtitle ? mainTitle : '',
        description: p.description,
        align: visuals.align,
        // Every listed project page is live; do not force a "coming soon" state.
        comingSoon: false,
        variant: visuals.variant,
        mainImage: visuals.mainImage || (visuals.icon ? getPublicPath(visuals.icon) : null),
        mainImageClass: visuals.mainImageClass,
        mainImageClassMobile: visuals.mainImageClassMobile,
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
              kicker={b.kicker}
              description={b.description}
              align={b.align}
              comingSoon={b.comingSoon}
              variant={b.variant}
              mainImage={b.mainImage}
              mainImageClass={b.mainImageClass}
              mainImageClassMobile={b.mainImageClassMobile}
              bgColor={b.bgColor}
              textureSrc={b.textureSrc}
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
