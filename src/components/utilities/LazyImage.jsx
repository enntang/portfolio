import { useState, useEffect, useRef } from 'react'

// A 1x1 transparent SVG. It carries no intrinsic ratio of its own worth trusting,
// so callers should pass width/height (or aspectRatio) to reserve layout space.
const BLANK =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'

function LazyImage({
  src,
  // Responsive candidates. Held back until the real image is committed, otherwise
  // the browser would resolve them immediately and defeat the lazy load.
  srcSet,
  sizes,
  alt = '',
  className = '',
  // Intrinsic pixel size of `src`. Passing these reserves the right box before the
  // image arrives, which is what keeps the page from jumping as it loads.
  width,
  height,
  // Escape hatch when the intrinsic size is unknown but the ratio is fixed, e.g. '16 / 9'.
  aspectRatio,
  placeholder = BLANK,
  preload = false, // 設為 true 時立即載入
  style,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  // 如果 preload 為 true，立即開始載入圖片
  useEffect(() => {
    if (!preload || !src) return

    const img = new Image()
    if (sizes) img.sizes = sizes
    if (srcSet) img.srcset = srcSet
    img.src = src

    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }

    img.onerror = () => {
      console.error(`Failed to preload image: ${src}`)
    }
  }, [preload, src, srcSet, sizes])

  // Intersection Observer - 只在非 preload 模式下使用
  useEffect(() => {
    // 如果已經 preload，跳過 Intersection Observer
    if (preload) return

    const currentRef = imgRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // 提前50px開始載入
        threshold: 0.01
      }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [preload])

  // 當圖片進入視窗時載入（非 preload 模式）
  useEffect(() => {
    if (preload || !isInView) return

    const img = new Image()
    if (sizes) img.sizes = sizes
    if (srcSet) img.srcset = srcSet
    img.src = src

    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }

    img.onerror = () => {
      // 如果載入失敗，可以設置一個錯誤圖片或保持placeholder
      console.error(`Failed to load image: ${src}`)
    }
  }, [isInView, src, srcSet, sizes, preload])

  // Ensure className is properly formatted
  const finalClassName = `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`.trim()

  // Reserve the box up front. width/height attributes alone only work while the
  // element keeps its natural ratio, and the placeholder is 1:1 — so pin the ratio
  // explicitly whenever we know it.
  const ratio = aspectRatio || (width && height ? `${width} / ${height}` : undefined)
  const finalStyle = ratio ? { aspectRatio: ratio, ...style } : style

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={isLoaded ? srcSet : undefined}
      sizes={isLoaded ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      className={finalClassName}
      style={finalStyle}
      {...props}
    />
  )
}

export default LazyImage
