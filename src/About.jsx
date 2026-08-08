import { useEffect, useRef, useState } from 'react'

import Navbar from './components/utilities/Navbar'
import ExperienceItem from './components/about/ExperienceItem'
import AboutSectionTitle from './components/about/AboutSectionTitle'
import ArchivedWorkItem from './components/about/ArchivedWorkItem'
import AboutValuesTimeline from './components/about/AboutValuesTimeline'
import { getPublicPath } from './utils/path'
import BtnWhite from './components/utilities/BtnWhite'
import LazyImage from './components/utilities/LazyImage'
import Footer from './components/utilities/Footer'
import P from './components/post/P'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { buildPath } from './utils/routing'

// Order must match each theme's `moments` array in the locale files (about.values.items)
const aboutMomentImages = [
  ['/about-moments/designer-1.jpg', '/about-moments/designer-2.jpg'],
  ['/about-moments/sharer-1.jpg', '/about-moments/sharer-2.jpeg'],
  ['/about-moments/traveler-1.jpg', '/about-moments/traveler-2.jpg', '/about-moments/traveler-3.jpg'],
]

function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Set while the full-bleed dark "Who I Am" band sits under the navbar
  const [isNavOverDark, setIsNavOverDark] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  // The element that paints the page background; the "Who I Am" section scrubs
  // it from light to dark as it comes into view.
  const surfaceRef = useRef(null)
  // Everything above the "Who I Am" section, dissolved as that section arrives
  const precedingRef = useRef(null)
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
    // overflow-x-clip contains the full-bleed 100vw "Who I Am" track on platforms
    // with classic scrollbars. `clip` (not `hidden`) avoids creating a scroll
    // container, which would interfere with the section's ScrollTrigger pin.
    <div ref={surfaceRef} className='bg-bg overflow-x-clip'>
      <Navbar
        isWhite={true}
        isDark={isNavOverDark}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      {/* Single column layout */}
      <div className="container max-w-3xl mx-auto">
        <div className='w-full p-8 xl:p-16 flex flex-col gap-8'>
          {/* Everything before "Who I Am". Grouped so that section can dissolve
              it as the page background goes dark, instead of needing a stretch
              of empty scroll to transition across. */}
          <div ref={precedingRef} className='flex flex-col gap-8'>
          <div className='pt-16 relative isolate mb-16'>
            <h1 className='text-large-mobile md:pr-28 text-gray-300 leading-tight mix-blend-screen mb-8'>
              {t('about.title')}
            </h1>
            <LazyImage
              src={getPublicPath('/portrait.png')}
              alt='profile'
              className='w-40 h-40 rounded-lg mix-blend-screen absolute right-0 bottom-0'
              preload={true}
            />
            <BtnWhite name={t('about.readCV')} href={buildHref('/resume')} target="_blank" />
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
              {/* Section titles stay English in every locale — deliberate, so
                  they are literals rather than translation keys */}
              <AboutSectionTitle>What I Do</AboutSectionTitle>
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
              <AboutSectionTitle>Experience</AboutSectionTitle>
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
              <AboutSectionTitle>Education</AboutSectionTitle>
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
              <AboutSectionTitle>Archived Works</AboutSectionTitle>
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

          {/* Who I Am — full-bleed dark band, owns its own section title so the
              label stays pinned on screen while the panels slide */}
          <section>
            <AboutValuesTimeline
              title="Who I Am"
              surfaceRef={surfaceRef}
              precedingRef={precedingRef}
              onDarkChange={setIsNavOverDark}
              items={t('about.values.items', []).map((item, idx) => ({
                title: item.title,
                body: item.body,
                photos: (item.moments || []).map((moment, i) => ({
                  ...moment,
                  src: getPublicPath(aboutMomentImages[idx][i]),
                })),
              }))}
            />
          </section>

          {/* Mirrors the home page's contact block, including the accent rule.
              Sits on the dark background the page settles into, so the lead-in
              takes a light grey where home uses gray-800, and the lead-in is a
              sentence rather than a label — no uppercase or letter-spacing.
              TODO: point at the Contact page once it exists, instead of mailto */}
          <section className='pt-16 pb-32 mobile:pt-8 mobile:pb-16'>
            <div className='flex flex-col items-center text-center'>
              {/* In flow rather than absolutely positioned like the home page's
                  copy of this rule: there the gap below it falls out of the
                  section's responsive padding, which closes to zero under md */}
              <div className='w-[1px] h-24 bg-highlight'></div>
              <p className='text-2xl font-bold text-gray-200 mt-16 mb-8'>
                {t('about.talkLead')}
              </p>
              <BtnWhite name="Let's talk" href='mailto:enntang.work@gmail.com' />
            </div>
          </section>

          <div className='pt-16'>
            <Footer className='text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

