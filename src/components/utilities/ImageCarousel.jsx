import { useEffect, useMemo, useRef, useState } from 'react'
import Tooltip from './Tooltip'

function ImageCarousel({ slides, images, intervalMs = 7000, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  const handleSlideClick = () => {
    if (!activeSlide) {
      window.location.hash = '#/projects'
      return
    }
    if (activeSlide.href) {
      window.location.hash = activeSlide.href.replace(/^#/, '')
      return
    }
    if (activeSlide.slug) {
      window.location.hash = `#/project/${encodeURIComponent(activeSlide.slug)}`
      return
    }
    window.location.hash = '#/projects'
  }

  const sanitizedSlides = useMemo(() => {
    if (Array.isArray(slides) && slides.length) {
      return slides
        .filter(Boolean)
        .map(s => ({
          src: s.src,
          title: s.title || '',
          subtitle: s.subtitle || '',
          projectName: s.projectName || '',
          alt: s.alt || 'carousel slide',
          slug: s.slug || '',
          href: s.href || ''
        }))
        .filter(s => Boolean(s.src))
    }
    // Fallback to images array for backward compatibility
    return (images || [])
      .filter(Boolean)
      .map(src => ({ src, title: '', subtitle: '', projectName: '', alt: 'carousel slide', slug: '', href: '' }))
  }, [slides, images])

  useEffect(() => {
    // Preload images for smoother transitions
    sanitizedSlides.forEach(s => {
      const img = new Image()
      img.src = s.src
    })
  }, [sanitizedSlides])

  useEffect(() => {
    if (sanitizedSlides.length <= 1) return

    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % sanitizedSlides.length)
    }, intervalMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [sanitizedSlides.length, intervalMs])

  if (!sanitizedSlides.length) return null

  const activeSlide = sanitizedSlides[activeIndex]

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onClick={handleSlideClick}
    >
      {sanitizedSlides.map((s, index) => (
        <img
          key={s.src + index}
          src={s.src}
          alt={s.alt || 'carousel'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Hover dim overlay */}
      <div className={`pointer-events-none absolute inset-0 bg-gray-900/80  pb-16 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Project name in center on hover */}
      {isHovered && activeSlide.projectName ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-8">
            {activeSlide.projectName}
          </div>
        </div>
      ) : null}

      {/* Subtitle (static) */}
      {activeSlide.subtitle ? (
        <div className="pointer-events-none absolute left-6 bottom-40 text-white/70 text-sm tracking-wide inline-flex items-center after:ml-3 after:content-[''] after:inline-block after:w-16 after:h-[1px] after:bg-white/80">
          {activeSlide.subtitle}
        </div>

      ) : null}

      {/* Marquee title */}
      {activeSlide.title ? (
        <div className={`absolute left-0 right-0 bottom-16 text-white/70 select-none`}>
          <div className={`marquee ${isHovered ? 'paused' : ''}`}>
            <div className="marquee__inner text-white/70  text-large ">
              <span className="mx-6">{activeSlide.title}</span>
              <span className="mx-6">{activeSlide.title}</span>
              {/* duplicated to create seamless loop */}
            </div>
          </div>
        </div>
      ) : null}

      {/* Tooltip near cursor on hover */}
      <Tooltip
        visible={isHovered}
        x={cursor.x}
        y={cursor.y}
        containerRef={containerRef}
      >
        {'discover more'}
      </Tooltip>
    </div>
  )
}

export default ImageCarousel


