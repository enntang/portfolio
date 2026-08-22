import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { FadeInVisibleContext } from './FadeInVisibleContext'

const SPEED_MS = 90

/**
 * 標題的打字機效果。捲到才開始，一個字一個字浮現。
 *
 * 所有字元一開始就都在 DOM 裡，只用 opacity 控制顯隱——不是逐字插入節點。
 * 這樣有兩個好處：textContent 從頭到尾都是完整標題（目錄靠它抓文字、螢幕
 * 閱讀器也讀得到），而且版位一開始就撐好，不會逐字把後面的內容推開。
 *
 * 尊重 prefers-reduced-motion：關掉動畫效果時直接顯示完整標題。
 */
function Typewriter({ as = 'span', text, speed = SPEED_MS, className = '', ...rest }) {
  // 在函式內轉成變數：eslint 沒有裝 react plugin，JSX 裡的使用不會被算成
  // 「已使用」，而 varsIgnorePattern 只作用在變數上，不管函式參數。
  const Tag = as
  const chars = [...text]

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const fadeInVisible = useContext(FadeInVisibleContext)
  const [shown, setShown] = useState(prefersReducedMotion ? chars.length : 0)
  const [intersecting, setIntersecting] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    setIntersecting(false)
    setShown(prefersReducedMotion ? chars.length : 0)
  }, [text, prefersReducedMotion, chars.length])

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIntersecting(true)
        observer.disconnect()
      },
      { threshold: 0.4 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [text, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !intersecting || !fadeInVisible) return

    let i = 0
    timer.current = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= chars.length) clearInterval(timer.current)
    }, speed)

    return () => clearInterval(timer.current)
  }, [intersecting, fadeInVisible, speed, chars.length, prefersReducedMotion])

  const done = shown >= chars.length

  return (
    <Tag ref={ref} className={className} {...rest}>
      {chars.map((char, i) => (
        <Fragment key={i}>
          {/* 游標寬度為 0，插在已顯示與未顯示之間，不會把字推開 */}
          {i === shown && !done && (
            <span
              aria-hidden="true"
              className="inline-block w-0 border-l-2 border-current align-middle animate-pulse"
              style={{ height: '0.85em' }}
            />
          )}
          <span style={{ opacity: i < shown ? 1 : 0 }}>{char}</span>
        </Fragment>
      ))}
    </Tag>
  )
}

export default Typewriter
