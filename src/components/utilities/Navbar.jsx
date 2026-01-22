
import { useEffect, useRef, useState } from 'react'
import BtnWhite from './BtnWhite'
import EmailCopy from './EmailCopy'
import { getPublicPath } from '../../utils/path'
import LazyImage from './LazyImage'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import { buildPath, getCurrentLocationPath, navigate, parsePath } from '../../utils/routing'
 

function Navbar({ isWhite = false, isMenuOpen = false, onToggleMenu, variant = 'default', onBack }) {
  const { language, changeLanguage, getLanguagePrefix } = useLanguage()
  const { t } = useTranslation()
  const menuContainerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const [showMenu, setShowMenu] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    const checkIsHome = () => {
      const { path } = parsePath(getCurrentLocationPath())
      setIsHome(path === '/' || path === '')
    }
    
    checkIsHome()
    const handleRouteChange = () => checkIsHome()
    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)
    window.addEventListener('navigate', handleRouteChange)
    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('navigate', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0

      // 開啟選單時強制顯示 Navbar
      if (isMenuOpen) {
        setIsHidden(false)
        lastScrollYRef.current = currentY
        return
      }

      // 回到頂部時顯示
      if (currentY <= 0) {
        setIsHidden(false)
        lastScrollYRef.current = currentY
        return
      }

      const diff = currentY - lastScrollYRef.current

      // 加一點 threshold 避免小幅捲動抖動
      if (diff > 10) {
        // 向下捲 -> 隱藏
        setIsHidden(true)
      } else if (diff < -10) {
        // 向上捲 -> 顯示
        setIsHidden(false)
      }

      lastScrollYRef.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  useEffect(() => {
    let timeoutId

    if (isMenuOpen) {
      setShowMenu(true)
      setIsClosing(false)
    } else if (!isMenuOpen && showMenu) {
      setIsClosing(true)
      timeoutId = setTimeout(() => {
        setShowMenu(false)
        setIsClosing(false)
      }, 300)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isMenuOpen, showMenu])
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack()
    } else {
      window.history.back()
    }
  }

  // Helper function to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const navLinks = [
    {
      id: '01',
      path: '/',
      text: t('nav.home'),
    },
    {
      id: '02',
      path: '/projects',
      text: t('nav.projects'),
    },
    // {
    //   id: '03',
    //   path: '/blog',
    //   text: t('nav.blog'),
    // },
    {
      id: '03',
      path: '/about',
      text: t('nav.about'),
    },
  ]

  const handleLanguageChange = (newLang) => {
    // 獲取當前路徑
    const { path: currentPath } = parsePath(getCurrentLocationPath())
    
    // 更新語言狀態
    changeLanguage(newLang)
    
    // 導航到相同路徑但使用新語言
    navigate(currentPath, newLang)
  }

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 transition-all duration-300 transform py-4 px-8 z-[70] ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isHome || !isWhite ? 'bg-transparent' : 'backdrop-blur-md'}`}
      >
        <div className="grid grid-cols-3 items-center">
          {/* Left area */}
          <div className="flex items-center">
            {variant === 'arrow' ? (
              <button
                aria-label="Go back"
                onClick={handleBack}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm  hover:bg-highlight transition-all duration-300 ease-in-out"
              >
                <LazyImage src={getPublicPath("/icon-arrow-left.svg")} alt="back" className="w-6 h-6" />
              </button>
            ) : (
              <a href={`${buildHref('/')}#home`} aria-label="Go to home" className="inline-block">
                <h1 className={`text-2xl font-bold ${isWhite ? 'text-gray-400' : 'text-white'
                  }`}>ENN<br />TANG</h1>
              </a>
            )}
          </div>

          {/* Center area */}
          <div className="flex items-center justify-center">
            {variant === 'arrow' && (
              <a href={`${buildHref('/')}#home`} aria-label="Go to home" className="inline-block">
                <h1 className={`text-2xl font-bold text-gray-800`}>ENN&nbsp;TANG</h1>
              </a>
            )}
          </div>

          {/* Right area */}
          <div className="flex items-center justify-end gap-4">
            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={onToggleMenu}
              className="flex flex-col items-center gap-1"
            >
              <div className="menu-icon w-6 h-3.5 cursor-pointer relative">
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                      ? 'top-1.5 rotate-45' 
                      : 'top-0 rotate-0'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                      ? 'opacity-0' 
                      : 'opacity-100'
                  }`}
                  style={{ top: '6px' }}
                />
                <span 
                  className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
                    isMenuOpen 
                      ? 'top-1.5 -rotate-45' 
                      : 'top-3 rotate-0'
                  }`}
                />
              </div>
              <span className="text-gray-900 text-xs tracking-widest text-bold mt-2">
                MENU
              </span>
            </button>
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          ref={menuContainerRef}
          className={`fixed inset-0 w-screen h-screen z-[60] bg-bg text-white p-4 md:p-28 lg:p-40 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ animation: isClosing ? 'none' : 'modalSlideIn 0.3s ease-out' }}
        >
          <div className="flex flex-col md:flex-row w-full h-full">
            {/* Main Menu */}
            <nav className="flex flex-col gap-8 h-full w-full mobile:pt-32">
              {navLinks.map(item => (
                <div key={item.text} className='flex flex-col'>
                  <div className='text-caption font-semibold tracking-widest text-gray-800'>{item.id}</div>
                  <a href={buildHref(item.path)} onClick={onToggleMenu} className="pl-8 text-5xl md:text-6xl font-semibold text-gray-400 hover:text-highlight transition-all duration-300">{item.text}</a>
                </div>
              ))}
            </nav>

            {/* Contact section */}
            <div className="flex flex-col gap-8 justify-end">
              <div>
                <div className="text-caption font-semibold tracking-widest text-gray-400 pb-2">CV</div>
                <BtnWhite name={t('about.readCV')} href="https://www.cake.me/resumes/enn-tang" target="_blank" />
              </div>
              <div>
                <div className="text-caption font-semibold tracking-widest text-gray-400 pb-2">Language</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLanguageChange('en-US')}
                    className={`text-sm px-2 py-1 rounded-full transition-colors ${
                      language === 'en-US'
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-500 hover:bg-highlight'
                    }`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleLanguageChange('zh-TW')}
                    className={`text-sm px-2 py-1 rounded-full transition-colors ${
                      language === 'zh-TW'
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-500 hover:bg-highlight'
                    }`}
                    aria-label="Switch to Traditional Chinese"
                  >
                    中
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleLanguageChange('ja-JP')}
                    className={`text-sm px-2 py-1 rounded-full transition-colors ${
                      language === 'ja-JP'
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-500 hover:bg-highlight'
                    }`}
                    aria-label="Switch to Japanese"
                  >
                    日
                  </button>
                </div>
              </div>
              <div>
                <div className="text-caption font-semibold tracking-widest text-gray-400">{t('common.contactMe')}</div>
                <EmailCopy />
              </div>
             
            </div>
          </div>
        </div>


      )}
    </>
  )
}

export default Navbar
