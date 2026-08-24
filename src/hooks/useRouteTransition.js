import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { emitRouteCommit, getCurrentLocationPath } from '../utils/routing'

/**
 * 換頁動畫：一張紙從畫面下方升上來蓋住整個視窗，換頁在紙後面發生，
 * 紙再繼續往上離開，露出已經就定位的新頁面。
 *
 * 手感集中在下面這幾個常數。
 */
const COVER_DURATION = 0.42   // 紙從下方升起、蓋滿畫面
const HOLD_DURATION = 0.1     // 蓋住的那一拍（新頁面在這時換上）
const REVEAL_DURATION = 0.48  // 紙往上離開、露出新頁面
const COVER_EASE = 'power3.inOut'
const REVEAL_EASE = 'power3.inOut'

// 背景分頁不跑 rAF，GSAP 的 ticker 也跟著停：既沒必要動畫，
// 也不能讓換頁卡在動畫的 callback 上。
function shouldSkipAnimation() {
  if (document.hidden) return true
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** 新頁面就定位時，把捲軸帶回頂端（或帶到網址指定的錨點）。 */
function restoreScroll() {
  const hash = window.location.hash
  if (hash && hash.length > 1 && !hash.startsWith('#/')) {
    try {
      const anchor = document.querySelector(hash)
      if (anchor) {
        anchor.scrollIntoView()
        return
      }
    } catch {
      // 不合法的選擇器（例如 #123）就當作沒有錨點
    }
  }
  window.scrollTo(0, 0)
}

/**
 * 監聽所有路由變化（站內連結、programmatic navigate、上一頁／下一頁），
 * 把換頁的時機夾在幕布動畫中間。
 *
 * @returns {{ pathname: string, sheetRef: import('react').RefObject<HTMLDivElement> }}
 */
export function useRouteTransition() {
  const sheetRef = useRef(null)
  const timelineRef = useRef(null)
  const [pathname, setPathname] = useState(getCurrentLocationPath)
  // 已經畫在畫面上的路徑
  const renderedPathRef = useRef(pathname)
  // 這次切換要去的路徑（紙蓋滿之後才會變成 renderedPath）
  const targetPathRef = useRef(pathname)
  const scrollPendingRef = useRef(false)
  // 保險絲：幕布動畫要是沒能播完（例如播到一半分頁被切到背景，
  // GSAP 的 ticker 就停了），換頁不能跟著卡住。
  const coverFallbackRef = useRef(null)

  const clearCoverFallback = useCallback(() => {
    if (coverFallbackRef.current === null) return
    clearTimeout(coverFallbackRef.current)
    coverFallbackRef.current = null
  }, [])

  const commit = useCallback((next) => {
    clearCoverFallback()
    targetPathRef.current = next
    if (renderedPathRef.current === next) return
    renderedPathRef.current = next
    scrollPendingRef.current = true
    setPathname(next)
    // 語言（以及其他跟著網址走的狀態）跟路由同一拍更新，
    // 才不會在舊頁面還露在外面時就先換掉文案。
    emitRouteCommit()
  }, [clearCoverFallback])

  // 紙回到畫面下方待命的位置
  const resetSheet = useCallback(() => {
    const sheet = sheetRef.current
    if (!sheet) return
    gsap.set(sheet, { yPercent: 100, pointerEvents: 'none' })
  }, [])

  const syncRoute = useCallback(() => {
    const next = getCurrentLocationPath()
    if (next === targetPathRef.current) return
    targetPathRef.current = next
    clearCoverFallback()

    const sheet = sheetRef.current
    if (!sheet || shouldSkipAnimation()) {
      timelineRef.current?.kill()
      timelineRef.current = null
      resetSheet()
      commit(next)
      return
    }

    // 連續點兩個連結時不重來一次：紙從目前的位置接著走完剩下的動線。
    timelineRef.current?.kill()
    timelineRef.current = gsap.timeline({
      onComplete: () => { timelineRef.current = null },
    })
      .set(sheet, { pointerEvents: 'auto' })
      .to(sheet, { yPercent: 0, duration: COVER_DURATION, ease: COVER_EASE })
      // 畫面被蓋住的這一刻才換頁
      .add(() => commit(next))
      .to(sheet, { yPercent: -100, duration: REVEAL_DURATION, ease: REVEAL_EASE }, `+=${HOLD_DURATION}`)
      .add(resetSheet)

    coverFallbackRef.current = window.setTimeout(() => {
      timelineRef.current?.kill()
      timelineRef.current = null
      resetSheet()
      commit(next)
    }, (COVER_DURATION + HOLD_DURATION) * 1000 + 300)
  }, [clearCoverFallback, commit, resetSheet])

  // 紙的起始位置交給 GSAP 管，避免 CSS 的 transform 和 GSAP 的 yPercent 疊在一起。
  useLayoutEffect(() => {
    resetSheet()
  }, [resetSheet])

  useEffect(() => () => {
    clearCoverFallback()
    timelineRef.current?.kill()
  }, [clearCoverFallback])

  useEffect(() => {
    window.addEventListener('popstate', syncRoute)
    // legacy hash routing（#/projects）
    window.addEventListener('hashchange', syncRoute)
    // routing.navigate() 發出的程式化導航
    window.addEventListener('navigate', syncRoute)
    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
      window.removeEventListener('navigate', syncRoute)
    }
  }, [syncRoute])

  // 站內 <a> 原本是整頁重新載入，動畫沒有機會播。改成攔下來走 client-side 導航。
  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!anchor || anchor.hasAttribute('download')) return

      const target = anchor.getAttribute('target')
      if (target && target !== '_self') return

      let url
      try {
        url = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      // 同頁錨點（#home、#contact）維持瀏覽器原本的捲動行為
      const isLegacyHashRoute = url.hash.startsWith('#/')
      if (!isLegacyHashRoute && url.hash
        && url.pathname === window.location.pathname
        && url.search === window.location.search) return

      event.preventDefault()
      if (url.href === window.location.href) return

      window.history.pushState({}, '', url.pathname + url.search + url.hash)
      syncRoute()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [syncRoute])

  // 新頁面掛上來時捲軸回到頂端——此時畫面還被紙蓋著，看不到跳動。
  useLayoutEffect(() => {
    if (!scrollPendingRef.current) return
    scrollPendingRef.current = false
    restoreScroll()
  }, [pathname])

  return { pathname, sheetRef }
}
