import { useEffect, useState } from 'react'

/**
 * Hero 進場動畫。
 *
 * 底層的規則書跨頁平常被遮罩和主視覺蓋住，幾乎看不見。進場時先讓它單獨顯示
 * 一段時間，接著遮罩淡入（同時跨頁降回原本的低透明度），最後主視覺與副標淡入。
 * 結束後的狀態與原本的設計完全相同，只是多了開場。
 *
 * 尊重 prefers-reduced-motion：使用者若關閉動畫效果，直接呈現最終狀態。
 */
const HOLD_MS = 2500 // 跨頁單獨顯示的時間
const FADE_MS = 800

const RESTING_BG_OPACITY = 0.1 // 等同原本的 opacity-10
const TINT_OPACITY = 0.72

export function useHeroIntro(tintColor) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 0：只有跨頁 / 1：遮罩已淡入 / 2：主視覺與文字也淡入（最終狀態）
  const [stage, setStage] = useState(prefersReducedMotion ? 2 : 0)
  // 使用者一旦自己切換，就停掉尚未執行的開場計時器，不要再蓋掉他的選擇
  const [userControlled, setUserControlled] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || userControlled) return
    const toTint = setTimeout(() => setStage(1), HOLD_MS)
    const toContent = setTimeout(() => setStage(2), HOLD_MS + FADE_MS)
    return () => {
      clearTimeout(toTint)
      clearTimeout(toContent)
    }
  }, [prefersReducedMotion, userControlled])

  // 在最終狀態按下就收起遮罩與主視覺、露出跨頁；其他情況（含開場播到一半）
  // 一律直接跳到最終狀態。
  const toggle = () => {
    setUserControlled(true)
    setStage(current => (current === 2 ? 0 : 2))
  }

  const transition = `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`

  return {
    toggle,
    // 跨頁是否正露出（遮罩與主視覺收起中）
    revealed: stage !== 2,
    backgroundStyle: {
      opacity: stage === 0 ? 1 : RESTING_BG_OPACITY,
      transition,
    },
    tintStyle: {
      backgroundColor: tintColor,
      opacity: stage === 0 ? 0 : TINT_OPACITY,
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
