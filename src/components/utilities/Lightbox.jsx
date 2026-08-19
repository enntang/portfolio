import { useCallback, useEffect, useRef, useState } from 'react'

const FADE_MS = 250

/**
 * 圖片燈箱。用在「縮到手機螢幕寬就讀不到字」的圖：跨頁、內頁、封面。
 *
 * 預設整張縮進畫面（fit）。點圖片切換成原尺寸，容器可捲動平移，手機才真的
 * 看得到內文。Esc 關閉、左右鍵換圖、點背景關閉。
 *
 * index 傳 null 就是關閉狀態，所以呼叫端只要維護一個 useState 即可。
 * 關閉時會多留 FADE_MS 才卸載，淡出才播得完。
 */
function Lightbox({ items, index, onClose, onNavigate }) {
  const isOpen = index !== null && index !== undefined && !!items[index]

  // mounted 撐住淡出的那段時間；shown 才是實際的 opacity 開關
  const [mounted, setMounted] = useState(isOpen)
  const [shown, setShown] = useState(false)
  // 淡出期間 index 已經是 null，所以要記住最後一張才有東西可以畫
  const [lastItem, setLastItem] = useState(null)
  const [actualSize, setActualSize] = useState(false)

  const dialogRef = useRef(null)
  const scrollerRef = useRef(null)
  // 關閉後把焦點還給原本觸發的元素，不要讓它掉回頁面最上面
  const lastFocused = useRef(null)

  const count = items.length
  const go = useCallback(
    (delta) => {
      if (!onNavigate || count < 2) return
      onNavigate((index + delta + count) % count)
    },
    [onNavigate, index, count]
  )

  useEffect(() => {
    if (isOpen) {
      setLastItem(items[index])
      setMounted(true)
      // 要等瀏覽器真的畫過 opacity:0 的那一幀，過渡才會生效。單層 rAF 有機會
      // 和掛載後的第一次繪製擠在同一幀，所以這裡用兩層。
      let inner
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        if (inner) cancelAnimationFrame(inner)
      }
    }
    setShown(false)
    const timer = setTimeout(() => setMounted(false), FADE_MS)
    return () => clearTimeout(timer)
  }, [isOpen, index, items])

  // 換圖時回到 fit，不然會停在上一張的捲動位置
  useEffect(() => setActualSize(false), [index])

  // 放大後預設捲到圖片正中央。不做的話會停在左上角，看到的是左邊三分之一，
  // 感覺像畫面跳掉而不是放大。
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!actualSize || !scroller) return
    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2
    scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2
  }, [actualSize, index])

  useEffect(() => {
    if (!isOpen) return

    lastFocused.current = document.activeElement
    dialogRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKeyDown)

    // 背景不要跟著捲
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lastFocused.current?.focus?.()
    }
  }, [isOpen, onClose, go])

  const item = isOpen ? items[index] : lastItem
  if (!mounted || !item) return null

  const stop = (event) => event.stopPropagation()

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || '圖片檢視'}
      tabIndex={-1}
      onClick={onClose}
      style={{ transition: `opacity ${FADE_MS}ms ease` }}
      className={`fixed inset-0 z-[80] bg-black/90 flex flex-col outline-none ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white/80 text-caption">
        <span>{count > 1 ? `${index + 1} / ${count}` : ''}</span>
        <button
          type="button"
          onClick={(event) => {
            stop(event)
            onClose()
          }}
          aria-label="關閉"
          className="w-10 h-10 rounded-full hover:bg-white/10 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={`flex-1 flex p-4 ${
          actualSize ? 'overflow-auto' : 'overflow-hidden items-center justify-center'
        }`}
      >
        <img
          src={item.src}
          alt={item.alt || ''}
          onClick={(event) => {
            stop(event)
            setActualSize((value) => !value)
          }}
          style={{ transition: `transform ${FADE_MS}ms ease` }}
          className={`${
            actualSize
              ? 'max-w-none m-auto cursor-zoom-out'
              : 'max-w-full max-h-full object-contain m-auto cursor-zoom-in'
          } ${shown ? 'scale-100' : 'scale-95'}`}
        />
      </div>

      {count > 1 && (
        <div onClick={stop}>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="上一張"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full text-2xl leading-none text-white/80 bg-white/5 hover:bg-white/20 transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="下一張"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full text-2xl leading-none text-white/80 bg-white/5 hover:bg-white/20 transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}

export default Lightbox
