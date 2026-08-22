import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const FLIP_MS = 700

/**
 * 繞書脊旋轉的翻頁書。
 *
 * 每一張「紙」（leaf）以書脊為軸旋轉 180 度，正面是右頁、背面翻過去之後
 * 成為左頁。所以攤開的跨頁是「前一張紙的背面 + 這一張紙的正面」。
 *
 * pages 是單頁陣列（不是跨頁），順序就是書的頁序：
 *   leaf k = { front: pages[2k], back: pages[2k+1] }
 * 每頁可以是 { src, alt } 或只有 { label }——只有 label 時畫成佔位頁，
 * 方便在真圖到齊之前先看版面與動態。
 *
 * 尊重 prefers-reduced-motion：關掉動畫效果時直接切換，不做旋轉。
 */
function PageFlipBook({
  pages,
  pageRatio = 0.72, // 單頁寬 / 高
  // 受控元件：翻到第幾張紙由外面決定，縮圖列之類的其他導覽才能一起驅動它
  turned,
  onTurnedChange,
  className = '',
}) {
  const leaves = useMemo(() => {
    const out = []
    for (let i = 0; i < pages.length; i += 2) {
      out.push({ front: pages[i], back: pages[i + 1] })
    }
    return out
  }, [pages])

  // 正在翻的那張要壓在所有紙上面，否則旋轉到一半會被鄰紙切掉
  const [flipping, setFlipping] = useState(null)
  // 拖曳中的狀態：{ leaf, forward, angle }
  const [drag, setDrag] = useState(null)
  const bookRef = useRef(null)
  const timer = useRef(null)
  const previous = useRef(turned)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = useCallback(
    (delta) => {
      const next = turned + delta
      if (next < 0 || next > leaves.length) return
      onTurnedChange?.(next)
    },
    [turned, leaves.length, onTurnedChange]
  )

  // 不論翻頁是按鈕觸發還是外部（縮圖）跳轉，都要把移動中的那張提到最上層
  useEffect(() => {
    const from = previous.current
    previous.current = turned
    if (from === turned) return
    setFlipping(turned > from ? turned - 1 : turned)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlipping(null), FLIP_MS)
  }, [turned])

  useEffect(() => () => clearTimeout(timer.current), [])

  // 把指標的水平位置換算成紙張角度。紙的自由邊在旋轉時的水平位置是
  // pageW * cos(angle)，所以反過來用 acos 就能讓那條邊剛好跟著手指走，
  // 拖起來才是 1:1 而不是憑經驗湊的比例。
  const angleAt = useCallback((clientX) => {
    const rect = bookRef.current.getBoundingClientRect()
    const pageW = rect.width / 2
    const rel = Math.min(1, Math.max(-1, (clientX - (rect.left + pageW)) / pageW))
    return -(Math.acos(rel) * 180) / Math.PI
  }, [])

  const onPointerDown = useCallback(
    (event) => {
      if (prefersReducedMotion || event.button > 0) return
      const rect = bookRef.current.getBoundingClientRect()
      // 從右半邊拉是往前翻，從左半邊拉是翻回去
      const forward = event.clientX >= rect.left + rect.width / 2
      const leaf = forward ? turned : turned - 1
      if (leaf < 0 || leaf >= leaves.length) return
      bookRef.current.setPointerCapture(event.pointerId)
      setDrag({ leaf, forward, angle: forward ? 0 : -180 })
    },
    [prefersReducedMotion, turned, leaves.length]
  )

  const onPointerMove = useCallback(
    (event) => {
      if (!drag) return
      const angle = angleAt(event.clientX)
      setDrag((current) => (current ? { ...current, angle } : current))
    },
    [drag, angleAt]
  )

  const onPointerUp = useCallback(() => {
    if (!drag) return
    // 過了一半就讓它翻完，沒過就彈回原位
    const pastHalf = drag.angle < -90
    setDrag(null)
    if (drag.forward && pastHalf) onTurnedChange?.(turned + 1)
    else if (!drag.forward && !pastHalf) onTurnedChange?.(turned - 1)
  }, [drag, turned, onTurnedChange])

  return (
    <div className={className}>
      <div
        ref={bookRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') go(1)
          else if (event.key === 'ArrowLeft') go(-1)
          else return
          event.preventDefault()
        }}
        tabIndex={0}
        role="group"
        aria-label={`翻頁書，共 ${leaves.length} 頁，目前第 ${turned} 頁。用左右方向鍵翻頁，或直接拖曳頁面。`}
        // pan-y 讓手機上的直向捲動照常，只攔截水平拖曳
        className={`relative mx-auto w-full select-none touch-pan-y [perspective:2400px] ${
          drag ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ aspectRatio: `${pageRatio * 2} / 1` }}
      >
        {leaves.map((leaf, k) => {
          const isTurned = k < turned
          const dragging = drag?.leaf === k
          return (
            <div
              key={k}
              className="absolute top-0 left-1/2 h-full w-1/2 [transform-style:preserve-3d]"
              style={{
                transformOrigin: 'left center',
                transform: `rotateY(${dragging ? drag.angle : isTurned ? -180 : 0}deg)`,
                // 拖曳時必須關掉過渡，紙才會貼著手指走而不是慢半拍
                transition:
                  dragging || prefersReducedMotion
                    ? 'none'
                    : `transform ${FLIP_MS}ms cubic-bezier(0.2, 0.7, 0.3, 1)`,
                zIndex:
                  dragging || flipping === k
                    ? leaves.length + 1
                    : isTurned
                      ? k + 1
                      : leaves.length - k,
              }}
            >
              <Face page={leaf.front} side="right" />
              <Face page={leaf.back} side="left" back />
            </div>
          )
        })}
      </div>

    </div>
  )
}

// 書脊側要壓一道漸層陰影，翻頁時才看得出紙有厚度、不是一塊平貼圖
function Face({ page, side, back = false }) {
  const spine =
    side === 'left'
      ? 'bg-gradient-to-l from-black/20 to-transparent right-0'
      : 'bg-gradient-to-r from-black/20 to-transparent left-0'

  // 書脊那一側是裝訂邊，維持直角；只有翻在外面的那一側才有圓角
  const corners = side === 'left' ? 'rounded-l-lg' : 'rounded-r-lg'

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden] ${corners}`}
      style={back ? { transform: 'rotateY(180deg)' } : undefined}
    >
      {page?.src ? (
        // draggable=false 擋掉瀏覽器對圖片的原生拖曳（那個半透明鬼影），
        // 否則一按住頁面就會中斷我們自己的 pointer 拖曳。pointer-events-none
        // 再讓命中測試一律落到外層書本上。
        <img
          src={page.src}
          alt={page.alt || ''}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center border border-black/10 bg-black/[0.03]">
          <span className="text-caption text-black/40">{page?.label || ''}</span>
        </div>
      )}
      <div aria-hidden="true" className={`pointer-events-none absolute top-0 h-full w-[8%] ${spine}`} />
    </div>
  )
}

export default PageFlipBook
