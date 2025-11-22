import { useEffect, useRef, useState } from 'react'

import Navbar from './components/utilities/Navbar'
import ExperienceItem from './components/about/ExperienceItem'
import AboutSectionTitle from './components/about/AboutSectionTitle'
import ArchivedWorkItem from './components/about/ArchivedWorkItem'
import { getPublicPath } from './utils/path'
import BtnWhite from './components/utilities/BtnWhite'


function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredWhatIDoKey, setHoveredWhatIDoKey] = useState(null)
  const [lastHoveredWhatIDoKey, setLastHoveredWhatIDoKey] = useState(null)
  const hoverImageByKey = {
    uiux: getPublicPath('/bg-mentor.png'),
    graphic: getPublicPath('/bg-chivalry.png'),
    illustration: getPublicPath('/bg-penguin.png'),
  }

  const profileRef = useRef(null)
  const whatIDoRef = useRef(null)
  const experienceRef = useRef(null)
  const educationRef = useRef(null)
  const worksRef = useRef(null)

  useEffect(() => {
    // If navigated with hash like #/about?section=experience, scroll to it
    const url = new URL(window.location.href)
    const section = url.searchParams.get('section')
    const map = {
      profile: profileRef,
      what: whatIDoRef,
      experience: experienceRef,
      education: educationRef,
      works: worksRef,
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
    <div className=' md:flex flex-row bg-bg h-fit md:h-screen'>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      {/* Left column - headline and photo */}
      <div className='w-full md:w-1/2 p-8 xl:p-16 flex flex-col gap-8 h-auto overflow-visible md:overflow-scroll relative'>
        <>
          <div
            className={`absolute inset-0 w-full h-full z-10 pointer-events-none transition-opacity duration-700 ease-in-out ${hoveredWhatIDoKey ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: lastHoveredWhatIDoKey ? `url(${hoverImageByKey[lastHoveredWhatIDoKey]})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </>
        <div className='pt-16 relative isolate mb-16'>
          <h1 data-aos="fade-up" data-aos-duration="1000" className='md:col-span-2 text-large-mobile xl:text-large text-gray-300 leading-tight mix-blend-screen mb-8'>
            Making digital products clear, engaging, and meaningful for users.
          </h1>
          <img data-aos="fade-up" data-aos-duration="2000" src={getPublicPath('/portrait.png')} alt='profile' className='w-40 h-40 mix-blend-screen absolute right-0 bottom-0' />
          <BtnWhite name="Read CV" href="https://www.cake.me/resumes/enn-tang" target="_blank" />
        </div>

        <div ref={profileRef} className='space-y-3 text-gray-800 mb-40'>
          <AboutSectionTitle>Profile</AboutSectionTitle>
          <p className='text-p'>
            Enn is a UI/UX designer with 10+ years of experience in publishing, education, gaming, and government. She specializes in creating digital products that enhance lives by seamlessly integrating usability with aesthetics, delivering clear and engaging designs.
          </p>
          <p className='text-p'>
            With extensive experience in the education sector, Enn led a team of four designers in the 0-to-1 development of Mentor, an AI-powered learning platform for K-12 students; she also possesses strong illustration and graphic design skills, having independently designed the visuals for the tabletop game Chivalry and the web-based game Penguin Territory.
          </p>
        </div>
      </div>

      {/* Right column - sections */}
      <div className='w-full md:w-1/2 min-h-screen p-8 xl:p-16 bg-white h-full overflow-visible  md:overflow-scroll'>
        <div className='flex flex-col gap-10'>
          {/* What I Do */}
          <section data-aos="fade-up" ref={whatIDoRef} className='space-y-4 pt-16'>
            <AboutSectionTitle>What I Do</AboutSectionTitle>
            <div className='flex flex-col divide-y divide-gray-200'>
              <a
                href='#/projects'
                className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                onMouseEnter={() => { setHoveredWhatIDoKey('uiux'); setLastHoveredWhatIDoKey('uiux') }}
                onMouseLeave={() => setHoveredWhatIDoKey(null)}
              >
                <div className='flex items-center justify-between'>
                  <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>UI/UX Design</div>
                  <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    watch more
                    <img
                      src={getPublicPath('/icon-arrow-right.svg')}
                      alt=''
                      className='w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                    />
                  </span>
                </div>
              </a>
              <a
                href='#/projects'
                className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                onMouseEnter={() => { setHoveredWhatIDoKey('graphic'); setLastHoveredWhatIDoKey('graphic') }}
                onMouseLeave={() => setHoveredWhatIDoKey(null)}
              >
                <div className='flex items-center justify-between'>
                  <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>Graphic Design</div>
                  <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    watch more
                    <img
                      src={getPublicPath('/icon-arrow-right.svg')}
                      alt=''
                      className='w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1'
                    />
                  </span>
                </div>
              </a>
              <a
                href='#/projects'
                className='group block text-left py-6 px-4 -mx-4  transition-colors duration-200 hover:bg-highlight'
                onMouseEnter={() => { setHoveredWhatIDoKey('illustration'); setLastHoveredWhatIDoKey('illustration') }}
                onMouseLeave={() => setHoveredWhatIDoKey(null)}
              >
                <div className='flex items-center justify-between'>
                  <div className='text-5xl font-semibold text-gray-200 group-hover:text-gray-800 transition-colors duration-200'>Illustration</div>
                  <span className='inline-flex items-center gap-2 text-sm tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    watch more
                    <img
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
          <section ref={experienceRef} className='space-y-4' data-aos="fade-up">
            <AboutSectionTitle>Experience</AboutSectionTitle>
            <div className='space-y-6 text-gray-800'>
              <ExperienceItem
                role='Design Lead'
                period='Mar 2023 - May 2024'
                company='Somebest Co., Ltd'
                items={[
                  'Managed design quality and cross-departmental collaboration.',
                  'Built the department from a one-person team, responsible for talent recruitment, training, and 1-on-1 mentoring, achieving a zero-turnover rate.',
                  'Led design team members in projects such as revamping existing products and launching new products, resulting in high satisfaction ratings in user surveys.',
                ]}
              />
              <ExperienceItem
                role='UI/UX Designer'
                period='Jan 2021  - Mar 2023'
                company='TutorABC'
                items={[
                  'Responsible for interface design of brand websites and app products.Established product design guidelines and led Figma training sessions, successfully integrating it into the R&D department’s workflows.'
                
                ]}
              />
              <ExperienceItem
                role='UI/UX Designer'
                period='Jun 2018 - Dec 2020'
                company='ACubeDT'
                items={[
                  'Led multiple RWD web design and POS system projects, responsible for requirements interviews and UI interface design. Clients included government agencies and educational institutions.'
                ]}
              />
              <ExperienceItem
                role='Graphic Designer'
                period='Jan 2016 - Feb 2018'
                company='Nan I Book Enterprise '
                items={[
                  'Worked as a graphic designer at a well-known educational publishing company, responsible for cover and layout design.'
                ]}
              />
            </div>
          </section>

          {/* Education */}
          <section ref={educationRef} className='space-y-4'>
            <AboutSectionTitle>Education</AboutSectionTitle>
            <div className='space-y-6 text-gray-800'>
              <ExperienceItem
                role='National Taiwan University of Science and Technology'
                period='Sep 2023 - Jun 2025'
                company='Department of Design'
                items={[
                
                ]}
              />
              <ExperienceItem
                title='National Taipei University of Education'
                period='Sep 2010 - Jun 2013'
                subtitle='Department of Arts and Design'
                items={[
                ]}
              />
            </div>
          </section>

          {/* Archived Works */}
          <section ref={worksRef}  className='space-y-4 pb-24'>
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

      {/* Mobile bottom tab bar */}
      <div className='fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/90 backdrop-blur border-t border-gray-200'>
        <div className='grid grid-cols-5 text-sm text-gray-400'>
          <button className='py-3' onClick={() => scrollTo(profileRef)}>Profile</button>
          <button className='py-3' onClick={() => scrollTo(whatIDoRef)}>What I Do</button>
          <button className='py-3' onClick={() => scrollTo(experienceRef)}>Experience</button>
          <button className='py-3' onClick={() => scrollTo(educationRef)}>Education</button>
          <button className='py-3' onClick={() => scrollTo(worksRef)}>Works</button>
        </div>
      </div>
    </div>
  )
}

export default About

