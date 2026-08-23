import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const FLIP_MS = 700;
const FLIP_EASE = "cubic-bezier(0.2, 0.7, 0.3, 1)";
// 指標移動超過這麼多才算「拖曳」，以內都當成點擊
const CLICK_SLOP = 6;

// 提示動畫：書一進畫面，最上面那張紙自己掀起來又放下，讓人看得出來它會動。
// 掀的角度刻意不大——目的是「這裡可以翻」，不是替使用者翻一頁。
const HINT_ANGLE = -20;
const HINT_MS = 520; // 掀起／放下各花多久
const HINT_HOLD = 180; // 掀到頂停一下
const HINT_GAP = 300; // 兩次之間的間隔
const HINT_TIMES = 2;
const HINT_DELAY = 450; // 進畫面之後先等一下，捲動停穩了再動

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
 * 翻頁有兩種操作：直接把紙拖過去，或是點一下——點右半邊往前翻、左半邊翻回去。
 * 兩種都不是一眼看得出來的，所以書捲進畫面時會自己掀一下頁角當作提示，
 * 下面也帶一行說明；使用者一動就都收掉，不再打擾。
 *
 * 尊重 prefers-reduced-motion：關掉動畫效果時直接切換，不做旋轉。
 */
function PageFlipBook({
  pages,
  pageRatio = 0.72, // 單頁寬 / 高
  // 受控元件：翻到第幾張紙由外面決定，縮圖列之類的其他導覽才能一起驅動它
  turned,
  onTurnedChange,
  // 書下面那行提示文案，傳 null 可以不要
  hintLabel = "點擊或拖曳頁面即可翻頁",
  className = "",
}) {
  const leaves = useMemo(() => {
    const out = [];
    for (let i = 0; i < pages.length; i += 2) {
      out.push({ front: pages[i], back: pages[i + 1] });
    }
    return out;
  }, [pages]);

  // 正在翻的那張要壓在所有紙上面，否則旋轉到一半會被鄰紙切掉
  const [flipping, setFlipping] = useState(null);
  // 拖曳中的狀態：{ leaf, forward, angle, startX, moved }
  const [drag, setDrag] = useState(null);
  // 提示動畫：hintAngle 是當下掀起的角度，hintActive 涵蓋整段過程
  // （用來換掉過渡時間），engaged 表示使用者已經動過了。
  const [hintAngle, setHintAngle] = useState(0);
  const [hintActive, setHintActive] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const hintDone = useRef(false);
  const hintTimers = useRef([]);
  const bookRef = useRef(null);
  const timer = useRef(null);
  const previous = useRef(turned);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 使用者一有動作就收掉提示，並且不再重來
  const stopHint = useCallback(() => {
    hintDone.current = true;
    hintTimers.current.forEach(clearTimeout);
    hintTimers.current = [];
    setHintAngle(0);
    setHintActive(false);
    setEngaged(true);
  }, []);

  const go = useCallback(
    (delta) => {
      const next = turned + delta;
      if (next < 0 || next > leaves.length) return;
      onTurnedChange?.(next);
    },
    [turned, leaves.length, onTurnedChange],
  );

  // 不論翻頁是按鈕觸發還是外部（縮圖）跳轉，都要把移動中的那張提到最上層
  useEffect(() => {
    const from = previous.current;
    previous.current = turned;
    if (from === turned) return;
    stopHint();
    setFlipping(turned > from ? turned - 1 : turned);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlipping(null), FLIP_MS);
  }, [turned, stopHint]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // 捲到書才提示，而且只提示一次。關掉動畫效果的人就只留下面那行字。
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = bookRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hintDone.current) return;
        observer.disconnect();
        hintDone.current = true;

        const push = (fn, at) => hintTimers.current.push(setTimeout(fn, at));
        let at = HINT_DELAY;
        setHintActive(true);
        for (let i = 0; i < HINT_TIMES; i += 1) {
          push(() => setHintAngle(HINT_ANGLE), at);
          at += HINT_MS + HINT_HOLD;
          push(() => setHintAngle(0), at);
          at += HINT_MS + HINT_GAP;
        }
        push(() => setHintActive(false), at);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => () => hintTimers.current.forEach(clearTimeout), []);

  // 把指標的水平位置換算成紙張角度。紙的自由邊在旋轉時的水平位置是
  // pageW * cos(angle)，所以反過來用 acos 就能讓那條邊剛好跟著手指走，
  // 拖起來才是 1:1 而不是憑經驗湊的比例。
  const angleAt = useCallback((clientX) => {
    const rect = bookRef.current.getBoundingClientRect();
    const pageW = rect.width / 2;
    const rel = Math.min(
      1,
      Math.max(-1, (clientX - (rect.left + pageW)) / pageW),
    );
    return -(Math.acos(rel) * 180) / Math.PI;
  }, []);

  const onPointerDown = useCallback(
    (event) => {
      if (event.button > 0) return;
      stopHint();
      const rect = bookRef.current.getBoundingClientRect();
      // 從右半邊拉是往前翻，從左半邊拉是翻回去
      const forward = event.clientX >= rect.left + rect.width / 2;
      const leaf = forward ? turned : turned - 1;
      if (leaf < 0 || leaf >= leaves.length) return;
      bookRef.current.setPointerCapture(event.pointerId);
      setDrag({
        leaf,
        forward,
        angle: forward ? 0 : -180,
        startX: event.clientX,
        moved: false,
      });
    },
    [turned, leaves.length, stopHint],
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!drag) return;
      // 沒超過 slop 就不動角度：只是點一下的話，紙要完全不抖
      if (!drag.moved && Math.abs(event.clientX - drag.startX) <= CLICK_SLOP) {
        return;
      }
      // 關掉動畫效果的人不跟著手指走，一律當成點擊
      if (prefersReducedMotion) return;
      const angle = angleAt(event.clientX);
      setDrag((current) =>
        current ? { ...current, moved: true, angle } : current,
      );
    },
    [drag, angleAt, prefersReducedMotion],
  );

  const onPointerUp = useCallback(() => {
    if (!drag) return;
    setDrag(null);
    // 沒有真的拖動就是點擊：點哪半邊就往那個方向翻一頁。
    // 方向和可不可以翻在 pointerdown 就驗過了，這裡不用再檢查邊界。
    if (!drag.moved) {
      onTurnedChange?.(turned + (drag.forward ? 1 : -1));
      return;
    }
    // 過了一半就讓它翻完，沒過就彈回原位
    const pastHalf = drag.angle < -90;
    if (drag.forward && pastHalf) onTurnedChange?.(turned + 1);
    else if (!drag.forward && !pastHalf) onTurnedChange?.(turned - 1);
  }, [drag, turned, onTurnedChange]);

  // 封面和封底只有半邊有紙，整本往內挪半頁，視覺上才會落在版面正中間。
  // 拖曳中依角度內插，紙翻到哪位置就跟到哪，不會等放手才忽然歸位。
  //
  // 位移加在每張紙自己的 transform 上，而不是推整個書本容器：容器連空著的
  // 那半邊一起往右移，會把頁面撐出橫向捲軸；而在外面包一層 overflow clip
  // 擋捲軸，又會讓翻面的那張紙 3D 破圖。只搬紙就不會多出任何版位。
  // 單位是紙寬的百分比，紙寬是書的一半，所以要乘二。
  const edgeOffset = (at) => (at === 0 ? -50 : at === leaves.length ? 50 : 0);
  const from = edgeOffset(turned);
  const to = drag?.moved ? edgeOffset(turned + (drag.forward ? 1 : -1)) : from;
  const progress = drag?.moved
    ? Math.min(
        1,
        Math.max(0, drag.forward ? -drag.angle / 180 : 1 + drag.angle / 180),
      )
    : 0;
  const leafShift = from + (to - from) * progress;

  return (
    <div className={className}>
      <div
        ref={bookRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          else if (event.key === "ArrowLeft") go(-1);
          else return;
          stopHint();
          event.preventDefault();
        }}
        tabIndex={0}
        role="group"
        aria-label={`翻頁書，共 ${leaves.length} 頁，目前第 ${turned} 頁。用左右方向鍵翻頁，也可以直接點擊或拖曳頁面。`}
        // pan-y 讓手機上的直向捲動照常，只攔截水平拖曳
        className={`relative mx-auto w-full select-none touch-pan-y [perspective:2400px] ${
          drag?.moved ? "cursor-grabbing" : "cursor-pointer"
        }`}
        style={{ aspectRatio: `${pageRatio * 2} / 1` }}
      >
        {leaves.map((leaf, k) => {
          const isTurned = k < turned;
          const dragging = drag?.leaf === k && drag.moved;
          // 提示只掀最上面那張還沒翻過去的紙
          const peeking = hintActive && !drag && k === turned;
          return (
            <div
              key={k}
              className="absolute top-0 left-1/2 h-full w-1/2 [transform-style:preserve-3d]"
              style={{
                transformOrigin: "left center",
                // 位移要寫在旋轉前面：先搬座標系再繞書脊轉，整本才是一起移動
                transform: `translateX(${leafShift}%) rotateY(${dragging ? drag.angle : isTurned ? -180 : peeking ? hintAngle : 0}deg)`,
                // 拖曳時必須關掉過渡，紙才會貼著手指走而不是慢半拍。
                // 沒被拖到的紙也要一起關掉，不然置中的位移會慢 700ms 才跟上。
                transition:
                  drag?.moved || prefersReducedMotion
                    ? "none"
                    : `transform ${peeking ? HINT_MS : FLIP_MS}ms ${FLIP_EASE}`,
                zIndex:
                  dragging || peeking || flipping === k
                    ? leaves.length + 1
                    : isTurned
                      ? k + 1
                      : leaves.length - k,
              }}
            >
              <Face page={leaf.front} side="right" />
              <Face page={leaf.back} side="left" back />
            </div>
          );
        })}
      </div>

      {/* 說明文字。aria-label 已經講過同樣的事，所以這行只給看得見的人。 */}
      {hintLabel && (
        <p
          aria-hidden="true"
          className={`mt-4 text-center text-caption text-current transition-opacity duration-500 ${
            engaged ? "opacity-0" : "opacity-60"
          }`}
        >
          {hintLabel}
        </p>
      )}
    </div>
  );
}

// 書脊側要壓一道漸層陰影，翻頁時才看得出紙有厚度、不是一塊平貼圖
function Face({ page, side, back = false }) {
  const spine =
    side === "left"
      ? "bg-gradient-to-l from-black/20 to-transparent right-0"
      : "bg-gradient-to-r from-black/20 to-transparent left-0";

  // 書脊那一側是裝訂邊，維持直角；只有翻在外面的那一側才有圓角
  const corners = side === "left" ? "rounded-l-lg" : "rounded-r-lg";

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden] ${corners}`}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      {page?.src ? (
        // draggable=false 擋掉瀏覽器對圖片的原生拖曳（那個半透明鬼影），
        // 否則一按住頁面就會中斷我們自己的 pointer 拖曳。pointer-events-none
        // 再讓命中測試一律落到外層書本上。
        <img
          src={page.src}
          alt={page.alt || ""}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center border border-black/10 bg-black/[0.03]">
          <span className="text-caption text-black/40">
            {page?.label || ""}
          </span>
        </div>
      )}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 h-full w-[8%] ${spine}`}
      />
    </div>
  );
}

export default PageFlipBook;
