import { useEffect, useState } from 'react'

/**
 * Hero 進場動畫。沿用騎士精神的三階段結構，差別在遮罩：
 * 騎士精神是整片壓暗的深色 tint，這裡改成主視覺背後的白色光暈。
 *
 * 進場時先讓實拍底圖單獨顯示兩秒，接著光暈淡入，最後主視覺與副標淡入。
 * 結束後就是設計稿上的最終狀態，只是多了開場。
 *
 * 尊重 prefers-reduced-motion：使用者若關閉動畫效果，直接呈現最終狀態。
 */
const HOLD_MS = 2000 // 底圖單獨顯示的時間
const FADE_MS = 800

export function useHeroIntro() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 0：只有底圖 / 1：光暈已淡入 / 2：主視覺與文字也淡入（最終狀態）
  const [stage, setStage] = useState(prefersReducedMotion ? 2 : 0)
  // 使用者一旦自己切換，就停掉尚未執行的開場計時器，不要再蓋掉他的選擇
  const [userControlled, setUserControlled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || userControlled) return
    const toGlow = setTimeout(() => setStage(1), HOLD_MS)
    const toContent = setTimeout(() => setStage(2), HOLD_MS + FADE_MS)
    return () => {
      clearTimeout(toGlow)
      clearTimeout(toContent)
    }
  }, [prefersReducedMotion, userControlled])

  // 在最終狀態按下就收起光暈與主視覺、露出整張底圖；其他情況（含開場播到一半）
  // 一律直接跳到最終狀態。
  const toggle = () => {
    setUserControlled(true)
    setStage((current) => (current === 2 ? 0 : 2))
  }

  const transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`

  return {
    toggle,
    // 底圖是否正完整露出（光暈與主視覺收起中）
    revealed: stage !== 2,
    // 主視覺背後的白色光暈。主視覺本身就佔了約八成版面寬，所以亮區要一路撐到
    // 七成半才收，否則兩側的筆畫會壓在書本照片上讀不到。
    glowStyle: {
      backgroundImage:
        'radial-gradient(ellipse 82% 62% at 50% 45%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0) 100%)',
      opacity: stage === 0 ? 0 : 1,
      transition,
    },
    contentStyle: {
      opacity: stage < 2 ? 0 : 1,
      transform: stage < 2 ? 'translateY(16px)' : 'none',
      // 收起時不要讓看不見的內容擋住點擊
      pointerEvents: stage < 2 ? 'none' : 'auto',
      transition,
    },
  }
}
