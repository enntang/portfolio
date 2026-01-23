import { useEffect, useRef, useState } from 'react'

import Navbar from './components/utilities/Navbar'
import ExperienceItem from './components/about/ExperienceItem'
import AboutSectionTitle from './components/about/AboutSectionTitle'
import ArchivedWorkItem from './components/about/ArchivedWorkItem'
import { getPublicPath } from './utils/path'
import BtnWhite from './components/utilities/BtnWhite'
import LazyImage from './components/utilities/LazyImage'
import P from './components/post/P'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { buildPath } from './utils/routing'


function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const profileRef = useRef(null)
  const whatIDoRef = useRef(null)
  const experienceRef = useRef(null)
  const educationRef = useRef(null)

  useEffect(() => {
    // If navigated with hash like #/about?section=experience, scroll to it
    const url = new URL(window.location.href)
    const section = url.searchParams.get('section')
    const map = {
      profile: profileRef,
      what: whatIDoRef,
      experience: experienceRef,
      education: educationRef,
    }
    if (section && map[section]?.current) {
      map[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const scrollTo = (ref) => {
    if (ref?.current) {
      const elementPosition = ref.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 200

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }



  return (
    <div className='bg-bg'>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      {/* Single column layout */}
      <div className="container max-w-3xl mx-auto">
        <div className='w-full p-8 xl:p-16 flex flex-col gap-8'>
          <div className='pt-16 relative isolate mb-16'>
            <h1 className='text-large-mobile md:pr-28 text-gray-300 leading-tight mix-blend-screen mb-8'>
              {t('about.title')}
            </h1>
            <LazyImage
              src={getPublicPath('/portrait.png')}
              alt='profile'
              className='w-40 h-40 mix-blend-screen absolute right-0 bottom-0'
              preload={true}
            />
            <BtnWhite name={t('about.readCV')} href="https://www.cake.me/resumes/enn-tang" target="_blank" />
          </div>

          <div ref={profileRef} className='space-y-3 text-gray-800 mb-40'>
            
            <P>
            {t('about.profile.intro')}
            </P>
            <p className='text-p'>
            {t('about.profile.career')}</p>
          </div>

          <div className='flex flex-col gap-10'>
            {/* What I Do */}
            <section ref={whatIDoRef} className='space-y-4'>
              <AboutSectionTitle>{t('about.whatIDo')}</AboutSectionTitle>
              <div className='flex flex-col divide-y divide-gray-200'>
                <a
                  href={buildHref('/projects')}
                  className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                >
                  <div className='flex items-center justify-between'>
                    <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>UI/UX Design</div>
                    <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                      {t('about.watchMore')}
                      <LazyImage
                        src={getPublicPath('/icon-arrow-right.svg')}
                        alt=''
                        className='w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                      />
                    </span>
                  </div>
                </a>
                <a
                  href={buildHref('/projects')}
                  className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                >
                  <div className='flex items-center justify-between'>
                    <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>Graphic Design</div>
                    <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                      {t('about.watchMore')}
                      <LazyImage
                        src={getPublicPath('/icon-arrow-right.svg')}
                        alt=''
                        className='w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                      />
                    </span>
                  </div>
                </a>
                <a
                  href={buildHref('/projects')}
                  className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                >
                  <div className='flex items-center justify-between'>
                    <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>Illustration</div>
                    <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                      {t('about.watchMore')}
                      <LazyImage
                        src={getPublicPath('/icon-arrow-right.svg')}
                        alt=''
                        className='w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                      />
                    </span>
                  </div>
                </a>

              </div>
            </section>

            {/* Experience */}
            <section ref={experienceRef} className='space-y-4'>
              <AboutSectionTitle>{t('about.experience')}</AboutSectionTitle>
              <div className='space-y-6 text-gray-800'>
                <ExperienceItem
                  role={t('about.experienceItems.somebest.role')}
                  period={t('about.experienceItems.somebest.period')}
                  company={t('about.experienceItems.somebest.company')}
                  items={t('about.experienceItems.somebest.items', [])}
                />
                <ExperienceItem
                  role={t('about.experienceItems.tutorabc.role')}
                  period={t('about.experienceItems.tutorabc.period')}
                  company={t('about.experienceItems.tutorabc.company')}
                  items={t('about.experienceItems.tutorabc.items', [])}
                />
                <ExperienceItem
                  role={t('about.experienceItems.acubedt.role')}
                  period={t('about.experienceItems.acubedt.period')}
                  company={t('about.experienceItems.acubedt.company')}
                  items={t('about.experienceItems.acubedt.items', [])}
                />
                <ExperienceItem
                  role={t('about.experienceItems.nani.role')}
                  period={t('about.experienceItems.nani.period')}
                  company={t('about.experienceItems.nani.company')}
                  items={t('about.experienceItems.nani.items', [])}
                />
              </div>
            </section>

            {/* Education */}
            <section ref={educationRef} className='space-y-4'>
              <AboutSectionTitle>{t('about.education')}</AboutSectionTitle>
              <div className='space-y-6 text-gray-800'>
                <ExperienceItem
                  role={t('about.educationItems.ntust.role')}
                  period={t('about.educationItems.ntust.period')}
                  company={t('about.educationItems.ntust.company')}
                  items={t('about.educationItems.ntust.items', [])}
                />
                <ExperienceItem
                  title={t('about.educationItems.ntue.title')}
                  period={t('about.educationItems.ntue.period')}
                  subtitle={t('about.educationItems.ntue.subtitle')}
                  items={t('about.educationItems.ntue.items', [])}
                />
              </div>
            </section>

            {/* Archived Works */}
            <section className='space-y-4 pb-24'>
              <AboutSectionTitle>{t('about.archivedWorks')}</AboutSectionTitle>
              <div className=''>
                <ArchivedWorkItem
                  title='tutorJr 2022 New Official Website UI Design'
                  company='TutorABC'
                  href='https://www.tutorjr.com/aspx/mvc/zh-tw'
                  target='_blank'
                />
                <ArchivedWorkItem
                  title='tutorJr x Disney: Early Childhood English Learning App and Game Main Visual Design'
                  company='TutorABC'
                  href='https://apps.apple.com/tw/app/tutorjr/id1111504215'
                  target='_blank'
                />
                <ArchivedWorkItem
                  title='eHairPOS'
                  company='AcubeDT'
                  href='https://www.ehairpos.com/'
                  target='_blank'
                />

              </div>

            </section>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default About

