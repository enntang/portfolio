import { useState, useEffect, useRef } from 'react'

function LazyImage({ 
  src, 
  alt = '', 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  preload = false, // 新增 preload prop，設為 true 時立即載入
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  // 如果 preload 為 true，立即開始載入圖片
  useEffect(() => {
    if (preload && src) {
      const img = new Image()
      img.src = src

      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }

      img.onerror = () => {
        console.error(`Failed to preload image: ${src}`)
      }
    }
  }, [preload, src])

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
    img.src = src

    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
    }

    img.onerror = () => {
      // 如果載入失敗，可以設置一個錯誤圖片或保持placeholder
      console.error(`Failed to load image: ${src}`)
    }
  }, [isInView, src, preload])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      {...props}
    />
  )
}

export default LazyImage

