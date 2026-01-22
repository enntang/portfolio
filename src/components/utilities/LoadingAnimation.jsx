import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 等待頁面完全載入
    const handleLoad = () => {
      // 延遲一點時間讓動畫完成
      setTimeout(() => {
        gsap.to('.loading-overlay', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            setIsVisible(false)
          }
        })
      }, 500)
    }

    // 如果頁面已經載入完成
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-overlay fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="loading-content flex flex-col items-center gap-4">
        {/* 主動畫 - 旋轉的圓圈 */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-transparent rounded-full"></div>
          <div className="absolute inset-0 border-4 border-highlight rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* 可選的文字 */}
        <div className="text-sm text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  )
}

export default LoadingAnimation

