import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import BtnWhite from './components/utilities/BtnWhite'
import Navbar from './components/utilities/Navbar'
import Projects from './components/projects/Projects'
import Contact from './components/home/Contact'
import Recommendations from './components/home/Recommendations'
import Footer from './components/utilities/Footer'
import Tooltip from './components/utilities/Tooltip'
import { getPublicPath } from './utils/path'
import PreloadImage from './components/utilities/PreloadImage'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { buildPath, navigate } from './utils/routing'


function Home() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const swiperRef = useRef(null)

  // 預載入首頁輪播圖的重要圖片
  const carouselImages = [
    getPublicPath('/bg-mentor.png'),
    getPublicPath('/bg-illustration.png'),
    getPublicPath('/bg-ehairpos.png'),
    getPublicPath('/bg-textbook.png'),
    getPublicPath('/bg-penguin.png'),
  ]

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const slides = [
    { src: getPublicPath('/bg-mentor.png'), title: 'Intuitive and visually appealing UI design', subtitle: t('home.carousel.focusedOn'), projectName: 'Mentor: AI-integrated learning platform', slug: 'mentor' },
    { src: getPublicPath('/bg-illustration.png'), title: 'Illustrations that tell stories', subtitle: t('home.carousel.create'), projectName: 'Star', href: '#/projects'},
    { src: getPublicPath('/bg-ehairpos.png'), title: 'Intuitive and visually appealing UI design', subtitle: t('home.carousel.focusedOn'), projectName: 'eHairPOS', slug: 'ehairpos' },
    { src: getPublicPath('/bg-textbook.png'), title: 'Graphic Design & Editorial Layout', subtitle: t('home.carousel.specialize'), projectName: "A Traveler's Guide for Young Historians", href: '#/projects' },
    { src: getPublicPath('/bg-penguin.png'), title: 'Playful Game UI Design', subtitle: t('home.carousel.do'), projectName: 'Penguin Game', slug: 'penguin-territory' },
  ]

  useEffect(() => {
    // Preload images for smoother transitions
    slides.forEach(s => {
      const img = new Image()
      img.src = s.src
    })
  }, [])

  useEffect(() => {
    if (!swiperRef.current?.swiper) return
    
    if (isHovered) {
      swiperRef.current.swiper.autoplay.stop()
    } else {
      swiperRef.current.swiper.autoplay.start()
    }
  }, [isHovered])

  const handleSlideClick = () => {
    const activeSlide = slides[activeIndex]
    
    if (!activeSlide) {
      navigate('/projects', language)
      return
    }
    if (activeSlide.href) {
      // activeSlide.href 可能是 '#/projects'，需要轉換
      const path = activeSlide.href.replace(/^#/, '') || '/projects'
      navigate(path, language)
      return
    }
    if (activeSlide.slug) {
      navigate(`/project/${encodeURIComponent(activeSlide.slug)}`, language)
      return
    }
    navigate('/projects', language)
  }

  const activeSlide = slides[activeIndex]

  return (
    <div className='h-screen lg:flex flex-row'>
      {/* 預載入輪播圖的重要圖片 */}
      <PreloadImage src={carouselImages} />
      
      <Navbar
        isWhite={false}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />
      <div className='bg-white w-full lg:w-1/2 h-full'>
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (!rect) return
            setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
          onClick={handleSlideClick}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={700}
            loop={slides.length > 1}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="w-full h-full !z-0"
          >
            {slides.map((s, index) => (
              <SwiperSlide key={s.src + index}>
                <img
                  src={s.src}
                  alt={s.alt || 'carousel'}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Overlay content layer - above Swiper */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Hover dim overlay */}
            <div className={`absolute inset-0 bg-gray-900/80 pb-16 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Project name in center on hover */}
            {isHovered && activeSlide.projectName ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-8">
                  {activeSlide.projectName}
                </div>
              </div>
            ) : null}

            {/* Subtitle (static) */}
            {activeSlide.subtitle ? (
              <div className="absolute left-6 bottom-40 text-white/70 text-sm tracking-wide inline-flex items-center after:ml-3 after:content-[''] after:inline-block after:w-16 after:h-[1px] after:bg-white/80">
                {activeSlide.subtitle}
              </div>
            ) : null}

            {/* Marquee title */}
            {activeSlide.title ? (
              <div className={`absolute left-0 right-0 bottom-16 text-white/70 select-none`}>
                <div className={`marquee ${isHovered ? 'paused' : ''}`}>
                  <div className="marquee__inner text-white/70 text-large">
                    <span className="mx-6">{activeSlide.title}</span>
                    <span className="mx-6">{activeSlide.title}</span>
                    {/* duplicated to create seamless loop */}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Tooltip near cursor on hover */}
          <Tooltip
            visible={isHovered}
            x={cursor.x}
            y={cursor.y}
            containerRef={containerRef}
          >
            {t('home.discoverMore')}
          </Tooltip>
        </div>
      </div>
      <div className='w-full lg:w-1/2 relative p-8 xl:p-16 bg-bg bg-center bg-no-repeat overflow-visible md:overflow-scroll'>

        <div className='flex flex-col'>

          <section className='flex flex-col py-16 py-8 text-gray-900 md:w-2/3'>
            <h2 className=' text-4xl text-2xl text-gray-300 mb-6 text-large text-large-mobile'>{t('home.greeting')}</h2>
            <p className='text-p mb-6 mb-4'>{t('home.description')}</p>
            <BtnWhite name={t('home.moreAboutMe')} className='w-fit' href={buildHref('/about')} />
          </section>

          {/* Projects Section */}
          <Projects />

          {/* Recommendations Section */}
          <Recommendations />

          <section className="relative py-16 mobile:py-8">         
            <Contact />
          </section>

          <Footer />


        </div>
      </div>
    </div>
  )
}

export default Home
