import { createContext } from 'react'

/**
 * FadeIn 是否已經淡入完成。子元件（例如 Typewriter）可以據此決定何時開始動畫，
 * 免得在父層還透明的時候就把動畫演完。
 *
 * 預設 true：不在 FadeIn 裡面的元件不受影響，照常自己判斷進場時機。
 *
 * 單獨一個檔案是因為 react-refresh 不接受同一個檔案既匯出元件又匯出 context。
 */
export const FadeInVisibleContext = createContext(true)
