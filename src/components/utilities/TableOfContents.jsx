import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function TableOfContents() {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const tocRef = useRef(null)
  const observerRef = useRef(null)

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    // 等待 DOM 完全加载后再查找标题
    const findHeadings = () => {
      // 只查找 H2 元素
      const h2Elements = Array.from(document.querySelectorAll('h2'))
      
      const headingList = []
      
      const seenIds = new Set()
      const seenTexts = new Set()
      
      h2Elements.forEach((h2, index) => {
        // 檢查元素是否可見
        const style = window.getComputedStyle(h2)
        const rect = h2.getBoundingClientRect()
        const isVisible = style.display !== 'none' && 
                         style.visibility !== 'hidden' &&
                         rect.width > 0 && 
                         rect.height > 0
        
        if (!isVisible) {
          return
        }
        
        const text = h2.textContent?.trim() || ''
        
        // 如果這個文本已經出現過，跳過它（避免重複）
        if (seenTexts.has(text)) {
          return
        }
        
        // 如果没有 id，自动生成一个
        if (!h2.id) {
          const idText = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || `h2-${index}`
          h2.id = idText
        }
        
        // 如果這個 ID 已經出現過，跳過它（避免重複）
        if (seenIds.has(h2.id)) {
          return
        }
        
        seenIds.add(h2.id)
        seenTexts.add(text)
        headingList.push({
          id: h2.id,
          text: text,
          element: h2
        })
      })

      setHeadings(headingList)

      // 清理之前的 Observer
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // 使用 Intersection Observer 追踪当前可见的标题（更可靠）
      const observerOptions = {
        rootMargin: '-120px 0px -70% 0px',
        threshold: [0, 0.1, 0.5, 1]
      }

      const observer = new IntersectionObserver((entries) => {
        // 找到所有可见的标题，选择最接近顶部的
        const visibleHeadings = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.boundingClientRect.top,
            ratio: entry.intersectionRatio
          }))
          .sort((a, b) => a.top - b.top)

        if (visibleHeadings.length > 0) {
          // 选择最接近顶部且在视口内的标题
          const activeHeading = visibleHeadings[0]
          setActiveId(activeHeading.id)
        }
      }, observerOptions)

      observerRef.current = observer

      headingList.forEach((heading) => {
        observer.observe(heading.element)
      })
    }

    // 延迟执行以确保 DOM 已渲染
    const timeoutId = setTimeout(findHeadings, 100)

    return () => {
      clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // 考虑导航栏高度
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // 点击后关闭菜单
      setIsOpen(false)
    }
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* 按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-8 z-50 bg-white w-12  h-12  shadow-xl rounded-full p-3 hover:bg-highlight transition-all "
        aria-label="Toggle table of contents"
      >
        <div className="menu-icon w-6 h-3.5 cursor-pointer relative">
          <span 
            className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'top-1.5 rotate-45' 
                : 'top-0 rotate-0'
            }`}
          />
          <span 
            className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'opacity-0' 
                : 'opacity-100'
            }`}
            style={{ top: '6px' }}
          />
          <span 
            className={`absolute left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'top-1.5 -rotate-45' 
                : 'top-3 rotate-0'
            }`}
          />
        </div>
      </button>

      {/* 遮罩层和目录容器 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeMenu}
        >
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* 目录内容 */}
          <nav
            ref={tocRef}
            className="fixed bottom-20 left-6 right-6 z-50 transition-all w-fit duration-300 opacity-100 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white backdrop-blur-sm shadow-xl rounded-lg p-4 max-h-[70vh] w-fit overflow-y-auto">
              <ul className="space-y-1">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={`text-left w-full py-1 px-2 rounded text-sm font-light transition-colors truncate ${
                        activeId === heading.id
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-400 hover:text-highlight'
                      }`}
                      title={heading.text}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default TableOfContents

