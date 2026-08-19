import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 捲動視差。外層 div 負責定位（照樣用 Tailwind 的 absolute / translate），
 * 內層才是 GSAP 實際位移的對象——兩者分開，GSAP 寫入的 transform 才不會
 * 把定位用的 translate 蓋掉。
 *
 * strength 為正時元素會「跟得比較慢」，看起來離畫面比較遠；負值則相反。
 * 尊重 prefers-reduced-motion：關掉動畫效果的話完全不套用。
 */
function Parallax({ strength = 60, className = '', children }) {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    // 以所屬區塊當觸發範圍，區塊從進場到離場之間平順地位移
    const section = el.closest('[data-parallax-scope]') || el.parentElement

    const tween = gsap.fromTo(
      el,
      { y: -strength },
      {
        y: strength,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [strength])

  return (
    <div className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  )
}

export default Parallax
