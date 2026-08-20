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

  const canPrev = turned > 0
  const canNext = turned < leaves.length

  return (
    <div className={className}>
      <div
        className="relative mx-auto w-full [perspective:2400px]"
        style={{ aspectRatio: `${pageRatio * 2} / 1` }}
      >
        {leaves.map((leaf, k) => {
          const isTurned = k < turned
          return (
            <div
              key={k}
              className="absolute top-0 left-1/2 h-full w-1/2 [transform-style:preserve-3d]"
              style={{
                transformOrigin: 'left center',
                transform: `rotateY(${isTurned ? -180 : 0}deg)`,
                transition: prefersReducedMotion
                  ? 'none'
                  : `transform ${FLIP_MS}ms cubic-bezier(0.2, 0.7, 0.3, 1)`,
                zIndex: flipping === k ? leaves.length + 1 : isTurned ? k + 1 : leaves.length - k,
              }}
            >
              <Face page={leaf.front} side="right" />
              <Face page={leaf.back} side="left" back />
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <FlipButton onClick={() => go(-1)} disabled={!canPrev} label="上一頁">
          ←
        </FlipButton>
        <span className="text-caption opacity-70">
          {turned} / {leaves.length}
        </span>
        <FlipButton onClick={() => go(1)} disabled={!canNext} label="下一頁">
          →
        </FlipButton>
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

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden]"
      style={back ? { transform: 'rotateY(180deg)' } : undefined}
    >
      {page?.src ? (
        <img src={page.src} alt={page.alt || ''} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center border border-black/10 bg-black/[0.03]">
          <span className="text-caption text-black/40">{page?.label || ''}</span>
        </div>
      )}
      <div aria-hidden="true" className={`pointer-events-none absolute top-0 h-full w-[8%] ${spine}`} />
    </div>
  )
}

function FlipButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 rounded-full text-lg leading-none transition-colors disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-current/10"
    >
      {children}
    </button>
  )
}

export default PageFlipBook
