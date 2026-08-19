import { useEffect, useRef, useState } from 'react'

/**
 * 標準字備選的揭曉動畫。
 *
 * 捲到面板時三款標準字依序浮現，全部到齊後停一秒，落選的兩款淡出，
 * 最後勝出的那款放大，深綠面板同時收合到剛好包住它（保留原本的 padding）。
 *
 * 尊重 prefers-reduced-motion：關掉動畫效果的話直接呈現最終狀態。
 */
const STEP_MS = 300 // 三款之間的間隔
const FADE_MS = 600
const HOLD_MS = 1000 // 三款都出現後停留多久
const COLLAPSE_MS = 700 // 落選淡出、面板收合
const SCALE = 1.6 // 勝出者放大倍率

// 0：還沒開始 / 1：依序浮現 / 2：落選淡出中 / 3：只剩勝出者，面板已收合
export function useLogotypeReveal(count, winnerIndex) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [step, setStep] = useState(prefersReducedMotion ? 3 : 0)
  const [panelWidth, setPanelWidth] = useState(null)

  const panelRef = useRef(null)
  const winnerRef = useRef(null)

  // 捲到面板才開始
  useEffect(() => {
    if (prefersReducedMotion) return
    const el = panelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setStep(1)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // 兩段分開排程。寫在同一個 effect 裡的話，step 從 1 變 2 會觸發 cleanup，
  // 把還沒到期的第二個 timer 一起清掉，最後一段就永遠不會發生。
  useEffect(() => {
    if (step !== 1) return
    const revealed = (count - 1) * STEP_MS + FADE_MS
    const toDrop = setTimeout(() => setStep(2), revealed + HOLD_MS)
    return () => clearTimeout(toDrop)
  }, [step, count])

  useEffect(() => {
    if (step !== 2) return
    const toFocus = setTimeout(() => setStep(3), COLLAPSE_MS)
    return () => clearTimeout(toFocus)
  }, [step])

  // 面板的收合寬度。用 offsetWidth 而不是 getBoundingClientRect，因為前者不受
  // transform 影響，放大前後量到的都是同一個值，算出來才穩定。
  useEffect(() => {
    if (step < 2) return
    const panel = panelRef.current
    const winner = winnerRef.current
    if (!panel || !winner) return
    const padding = parseFloat(getComputedStyle(panel).paddingLeft) * 2
    setPanelWidth(winner.offsetWidth * SCALE + padding)
  }, [step])

  return {
    panelRef,
    winnerRef,
    panelStyle: {
      maxWidth: step >= 3 && panelWidth ? `${panelWidth}px` : '100%',
      transition: `max-width ${COLLAPSE_MS}ms ease`,
    },
    // 落選者淡出後要真的移出版面，面板才收得起來
    isRemoved: (i) => step >= 3 && i !== winnerIndex,
    itemStyle: (i) => {
      const isWinner = i === winnerIndex
      const visible = step === 1 || (step >= 2 && isWinner)
      // 只有初次浮現要錯開，淡出時必須同步，不然會拖成兩段。
      // delay 直接寫進 transition 簡寫裡，跟 transitionDelay 混用 React 會警告。
      const delay = step === 1 ? i * STEP_MS : 0
      return {
        opacity: step === 0 || !visible ? 0 : 1,
        transform: `translateY(${step === 0 ? 24 : 0}px) scale(${
          isWinner && step >= 3 ? SCALE : 1
        })`,
        transition: `opacity ${FADE_MS}ms ease ${delay}ms, transform ${COLLAPSE_MS}ms ease ${delay}ms`,
      }
    },
  }
}
