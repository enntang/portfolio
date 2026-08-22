import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import Navbar from "../../../../components/utilities/Navbar";
import Footer from "../../../../components/utilities/Footer";
import Container from "../../../../components/projects/Container";
import SectionBlock from "../../../../components/projects/SectionBlock";
import TwoColumn from "../../../../components/projects/TwoColumn";
import RelatedProjects from "../../../../components/projects/RelatedProjects";
import TableOfContents from "../../../../components/utilities/TableOfContents";
import LazyImage from "../../../../components/utilities/LazyImage";
import Lightbox from "../../../../components/utilities/Lightbox";
import Parallax from "../../../../components/utilities/Parallax";
import PageFlipBook from "../../../../components/utilities/PageFlipBook";
import FadeIn from "../../../../components/utilities/FadeIn";
import Typewriter from "../../../../components/utilities/Typewriter";
import { useHeroIntro } from "../useHeroIntro";
import { useLogotypeReveal } from "../useLogotypeReveal";

import P from "../../../../components/post/P";
import H2 from "../../../../components/post/H2";
import H3 from "../../../../components/post/H3";
import UL from "../../../../components/post/UL";
import LI from "../../../../components/post/LI";

// Images live in src/assets/projects/textbook/image
import bgHero from "../image/bg-1@2x.webp";
import bgGreen from "../image/bg-2@2x.webp";
import bgCover from "../image/bg-3@2x.webp";
import bgClosing from "../image/bg-4@2x.webp";
import keyVision from "../image/key-vision.svg";
import text1 from "../image/text-1.svg";
import text2 from "../image/text-2.svg";
import text3 from "../image/text-3.svg";

import cover1 from "../image/cover-1.webp";
import cover2 from "../image/cover-2.webp";
import cover3 from "../image/cover-3.webp";
import cover3Back from "../image/cover-3-back.webp";

import review1 from "../image/review-1.webp";
import review2 from "../image/review-2.webp";
import review3 from "../image/review-3.webp";
import review4 from "../image/review-4.webp";

// 翻頁書的平面單頁（-1 左頁、-2 右頁）。七個跨頁各一組，school 有兩組。
import pageBoba1 from "../image/pages-boba-1.webp";
import pageBoba2 from "../image/pages-boba-2.webp";
import pageTranslate1 from "../image/pages-translate-1.webp";
import pageTranslate2 from "../image/pages-translate-2.webp";
import pageComic1 from "../image/pages-comic-1.webp";
import pageComic2 from "../image/pages-comic-2.webp";
import pageIntro1 from "../image/pages-intro-1.webp";
import pageIntro2 from "../image/pages-intro-2.webp";
import pageDiderot1 from "../image/pages-diderot-1.webp";
import pageDiderot2 from "../image/pages-diderot-2.webp";
import pageSchool1 from "../image/pages-school-1.webp";
import pageSchool2 from "../image/pages-school-2.webp";
import pageSchool3 from "../image/pages-school-3.webp";
import pageSchool4 from "../image/pages-school-4.webp";

import illust1 from "../image/illust-1.webp";
import illust2 from "../image/illust-2.webp";
import illust3 from "../image/illust-3.webp";
import illust4 from "../image/illust-4.webp";
import illust5 from "../image/illust-5.webp";
import illust6 from "../image/illust-6.webp";
import illust7 from "../image/illust-7.webp";
import illust8 from "../image/illust-8.webp";
import illust9 from "../image/illust-9.webp";
import illust10 from "../image/illust-10.webp";
import illust11 from "../image/illust-11.webp";

import decoChalk from "../image/deco-1@2x.webp";
import decoStudents from "../image/deco-2@2x.webp";
import decoLamp from "../image/deco-3@2x.webp";
import decoLeaf from "../image/deco-4@2x.webp";
import decoClosing from "../image/deco-9@2x.webp";

// 滿版自動輪播的內頁截圖。傾斜與高低差由 TILTS 依索引循環套用，
// 所以要加第五張以上，在這裡多一行就好。
const REVIEWS = [
  {
    src: review2,
    width: 1552,
    height: 1202,
    alt: "內頁：「百科全書」譯名的由來",
  },
  {
    src: review1,
    width: 1682,
    height: 1202,
    alt: "內頁：十八世紀法國出版業的圖解",
  },
  { src: review3, width: 1786, height: 1222, alt: "內頁：文化與認同的概念圖" },
  {
    src: review4,
    width: 1682,
    height: 1202,
    alt: "內頁：新文化運動的百科全書",
  },
];

// 跨頁都是去背的書冊造型（2000x1450，四邊透明），直接鋪在深綠底上，
// 不需要白框或陰影。
const SPREADS = [
  { left: pageBoba1, right: pageBoba2 },
  { left: pageTranslate1, right: pageTranslate2 },
  { left: pageComic1, right: pageComic2 },
  { left: pageIntro1, right: pageIntro2 },
  { left: pageDiderot1, right: pageDiderot2 },
  { left: pageSchool1, right: pageSchool2 },
  { left: pageSchool3, right: pageSchool4 },
];

// 輪播卡片的傾斜與高低差，依索引循環套用，所以 REVIEWS 加到第五張以上
// 也會自動有錯落感，不用另外設定。
const TILTS = [
  "-rotate-[7deg] translate-y-3",
  "rotate-[5deg] -translate-y-4",
  "-rotate-[4deg] translate-y-5",
  "rotate-[8deg] -translate-y-2",
];

// 十一張插畫，全部去背、比例各不相同，所以用 CSS columns 讓它們自然錯落，
// 不要硬塞進等高格子把直式的壓扁。
const ILLUSTRATIONS = [
  {
    src: illust1,
    width: 1862,
    height: 1091,
    alt: "天秤與電腦前思考的兩人：判斷與取捨",
  },
  {
    src: illust2,
    width: 2525,
    height: 1988,
    alt: "炒鍋與四散的食材：文化混融",
  },
  {
    src: illust3,
    width: 1551,
    height: 1146,
    alt: "標著 KNOWLEDGE 的輪船與箭頭：知識的跨海傳播",
  },
  {
    src: illust4,
    width: 1464,
    height: 1017,
    alt: "從猿到人的演化序列與讀書的人",
  },
  { src: illust5, width: 974, height: 1353, alt: "長袍人物搔頭困惑" },
  { src: illust6, width: 974, height: 1353, alt: "長袍人物坐在椅上翻書" },
  {
    src: illust7,
    width: 2470,
    height: 1895,
    alt: "兩人對話，思緒雲裡浮著 Nation、Culture、Belief 等詞彙",
  },
  {
    src: illust8,
    width: 1928,
    height: 1678,
    alt: "各國國旗與簽署場景：條約與翻譯",
  },
  { src: illust9, width: 1704, height: 800, alt: "兩人在成堆的書本間閱讀" },
  {
    src: illust10,
    width: 1354,
    height: 1838,
    alt: "兩位人物與空白對話框：待填入的觀點",
  },
  {
    src: illust11,
    width: 1323,
    height: 1582,
    alt: "「有口皆碑／潮到出水」海報式插畫",
  },
];

// 翻頁書用的單頁清單。turned=k 時攤開的是 pages[2k-1] | pages[2k]，
// 所以把內封放在最前面，之後每個跨頁貢獻「左頁、右頁」兩張，
// turned 就剛好等於目前的跨頁編號。真圖到齊後把 label 換成 src/alt 即可。
const BOOK_PAGES = [
  { src: cover3, alt: "封面：給年輕史家的漫遊指南" },
  // 還沒有平面單頁的跨頁先用佔位頁；圖補齊後在上面加 left/right 就會自動接上
  ...SPREADS.flatMap((s, i) => [
    s.left
      ? { src: s.left, alt: `內頁跨頁 ${i + 1}｜左頁` }
      : { label: `內頁跨頁 ${i + 1}｜左頁` },
    s.right
      ? { src: s.right, alt: `內頁跨頁 ${i + 1}｜右頁` }
      : { label: `內頁跨頁 ${i + 1}｜右頁` },
  ]),
  // 補一張讓總數成偶數，否則最後一張紙的背面會是空白
  { src: cover3Back, alt: "封底" },
];

const COVERS = [
  {
    src: cover1,
    width: 1492,
    height: 2002,
    alt: "封面第一版：古書、放大鏡與懷錶的寫實風格",
    caption: "第一版",
  },
  {
    src: cover2,
    width: 1492,
    height: 2002,
    alt: "封面第二版：藍底、標準字置中的圖像風格",
    caption: "第二版",
  },
  {
    src: cover3,
    width: 1490,
    height: 2002,
    alt: "封面最終版：淺色留白、標準字置頂",
    caption: "最終版",
  },
];

// 三本封面階梯式下降，後面的疊在前面之上。負的左邊距讓相鄰兩本略為重疊。
const COVER_STAIR = [
  "mt-0 z-10",
  "mt-[10%] -ml-[3%] z-20",
  "mt-[20%] -ml-[3%] z-30",
];

// 標準字提案。三個比例差很多（直排 100x191、橫排 223x132、斜置 300x120），
// 所以各自用高度對齊視覺重量，不要硬塞進等寬格子。
// 勝出的是第二款：它就是 cover-3 最終封面上用的那個版型
const WINNER_LOGOTYPE = 1;

const LOGOTYPES = [
  { src: text1, alt: "標準字提案：直排", size: "h-[168px] mobile:h-[112px]" },
  {
    src: text2,
    alt: "標準字提案：兩行橫排（最終採用）",
    size: "h-[104px] mobile:h-[68px]",
  },
  {
    src: text3,
    alt: "標準字提案：斜置橫排",
    size: "h-[84px] mobile:h-[56px]",
  },
];

// 取樣自 bg-2@2x.png 的平均色，當底紋圖還沒載入時的底色
const GREEN = "#0E473D";
const GREEN_TEXT = "#F2EFE6";
const LIGHT = "#F4F5F8";

const greenStyle = { backgroundColor: GREEN, color: GREEN_TEXT };
// 疊在插畫帶上的說明面板。0.85 是「還看得到底下插畫」和「米色字仍過 AA 對比」
// 之間的平衡點，要更透就調這個數字。
const panelStyle = {
  backgroundColor: "rgba(14, 71, 61, 0.85)",
  color: GREEN_TEXT,
};
const lightStyle = { backgroundColor: LIGHT };

// 空心字：只描邊、不填色。等傾斜底圖進來之後，描邊色大概會改成白色。
const OUTLINE_TEXT = {
  color: "transparent",
  WebkitTextStroke: `1px ${GREEN}`,
  whiteSpace: "nowrap",
};

// SectionBlock 會鋪成 fixed 背景（iOS 不支援 fixed，會自動退回平鋪）。
const backgrounds = {
  hero: bgHero,
  green: bgGreen,
  cover: bgCover,
  closing: bgClosing,
};

// 燈箱。內頁和封面在手機上縮到螢幕寬就讀不到字，一律可以點開放大。
// 兩組各自是獨立的相簿，從封面按「下一張」不會跳到內頁去。
const EMPTY_ZOOM = { items: [], index: null };
const zoomAt = (items, index) => ({ items, index });

// 兩個作品示範圖群組共用的 hover 行為：指到的那張放大並浮到最上層，
// 左右緊鄰的兩張往外讓開。用 :has() 才選得到「前一個兄弟」。
//
// 兩份寫法只差在選擇器：封面是容器的直接子元素，輪播的卡片則包在
// Swiper 自己的 .swiper-wrapper 底下。不能用樣板字串合成——Tailwind 掃的是
// 原始碼裡的字面字串，組出來的 class 不會被產生。
const HOVER_PUSH_COVERS =
  "[&>*]:transition-transform [&>*]:duration-300 [&>*]:ease-out " +
  "[&>*:hover]:scale-[1.08] [&>*:hover]:z-40 " +
  "[&>*:hover+*]:translate-x-7 [&>*:has(+*:hover)]:-translate-x-7";

// transform 要加 !：Swiper 的 .swiper-backface-hidden .swiper-slide 也宣告了
// transform: translateZ(0)，不標 important 的話位移和縮放會被它蓋掉。
const HOVER_PUSH_SLIDES =
  "[&_.swiper-slide]:transition-transform [&_.swiper-slide]:duration-300 [&_.swiper-slide]:ease-out " +
  "[&_.swiper-slide:hover]:!scale-[1.08] [&_.swiper-slide:hover]:z-40 " +
  "[&_.swiper-slide:hover+.swiper-slide]:!translate-x-7 " +
  "[&_.swiper-slide:has(+.swiper-slide:hover)]:!-translate-x-7";

// 比內文欄（640px）寬、但沒有到滿版的容器。設計稿上多數圖組都落在這個寬度。
function Wide({ children, className = "" }) {
  return (
    <div
      className={`max-w-[1100px] mx-auto w-full px-16 mobile:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

// 連續等速前進的插畫帶。reverse 讓第二排往反方向跑。
// 插畫比例各不相同，所以固定高度、寬度自適應，跟 partner logo 帶一樣。
function IllustrationRow({
  items,
  offset = 0,
  onSelect,
  reverse = false,
  className = "",
}) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView="auto"
      spaceBetween={40}
      loop
      freeMode={{ enabled: true, momentum: false }}
      speed={18000}
      allowTouchMove={false}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      // Swiper 只改 transition-duration，不動 timing-function，設一次就一路等速
      onSwiper={(swiper) => {
        swiper.wrapperEl.style.transitionTimingFunction = "linear";
      }}
      className={className}
    >
      {items.map(({ src, width, height, alt }, i) => (
        <SwiperSlide key={src} className="!w-auto">
          <button
            type="button"
            onClick={() => onSelect(offset + i)}
            aria-label={`放大檢視：${alt}`}
            className="block cursor-zoom-in transition-transform duration-300 hover:scale-[1.06]"
          >
            <LazyImage
              src={src}
              width={width}
              height={height}
              alt={alt}
              className="h-[200px] mobile:h-[130px] w-auto"
            />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// 佔位框。圖切好放進 image/ 之後，把整個 <Slot> 換成 <LazyImage> 就好。
// label 寫這格是什麼，spec 寫我需要的匯出規格（見討論串的寬度等級）。
function Slot({
  label,
  spec,
  ratio = "16 / 9",
  tone = "light",
  className = "",
}) {
  const skin =
    tone === "dark"
      ? "border-white/25 bg-white/5 text-white/70"
      : "border-black/15 bg-black/[0.03] text-black/50";
  return (
    <div
      className={`w-full rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center p-6 ${skin} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="text-p-strong">{label}</span>
      <span className="text-caption mt-1 opacity-80">{spec}</span>
    </div>
  );
}

export default function YoungHistoriansGuidePageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { glowStyle, contentStyle, toggle, revealed } = useHeroIntro();
  // index 為 null 就是燈箱關閉
  const [zoom, setZoom] = useState(EMPTY_ZOOM);
  // turned = 翻過去的紙數，也就是目前攤開的跨頁編號。
  const [turned, setTurned] = useState(1);
  const logotypes = useLogotypeReveal(LOGOTYPES.length, WINNER_LOGOTYPE);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: LIGHT }}
    >
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        variant="arrow"
      />

      <main style={{ backgroundColor: LIGHT }}>
        {/* ── 01 Hero ─────────────────────────────────────────────
            滿版實拍照，先單獨顯示兩秒，接著白色光暈與主視覺淡入（見 ../useHeroIntro）。
            手機待決：這張橫幅照在 375px 會裁到剩中間，可能需要一張直式裁切版本。 */}
        <header className="relative overflow-hidden">
          <SectionBlock
            className="relative min-h-screen flex items-center"
            bgVariant="hero"
            backgrounds={backgrounds}
            style={lightStyle}
            textDarkOnBg
          >
            <TableOfContents />
            {/* 主視覺背後的白色光暈 */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0"
              style={glowStyle}
            />
            {/* 點擊切換光暈與主視覺；用 button 才有鍵盤與螢幕閱讀器支援 */}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={revealed}
              aria-label="顯示或隱藏主視覺"
              className="absolute inset-0 z-20 cursor-pointer"
            />
            <div className="relative z-10 w-full" style={contentStyle}>
              <Container className="flex flex-col items-center justify-center text-center">
                <h1 className="sr-only">給年輕史家的漫遊指南</h1>

                <img
                  src={keyVision}
                  alt=""
                  aria-hidden="true"
                  className="w-full max-w-[240px] h-auto"
                  loading="eager"
                />

                <H3 className="text-gray-800">
                  南一書局高中歷史課本｜編排設計、插畫｜2018
                </H3>
                <P className="mt-6 w-full md:w-2/3 text-gray-800">
                  A thematic history textbook that breaks away from traditional
                  chronological narratives.
                </P>
              </Container>
            </div>
          </SectionBlock>
        </header>

        {/* ── 02 專案簡介 ──────────────────────────────────────────
            深綠底紋。左文右資訊卡，下方是滿版自動輪播的內頁截圖 + 吊燈／葉子／粉筆軌跡／學生裝飾。 */}
        <SectionBlock
          bgVariant="green"
          backgrounds={backgrounds}
          style={greenStyle}
          className="overflow-hidden"
        >
          {/* 裝飾層。純裝飾所以整層 aria-hidden，也不吃點擊。
              每張都帶 width/height，載入前才有版位，不會擠動版面。 */}
          <div
            aria-hidden="true"
            data-parallax-scope
            className="pointer-events-none select-none absolute inset-0 overflow-hidden"
          >
            {/* 吊燈：自帶垂線，所以貼齊區塊上緣 */}
            <img
              src={decoLamp}
              alt=""
              className="absolute top-0 right-[9%] w-[134px] mobile:w-[76px] h-auto"
              width={268}
              height={298}
              loading="lazy"
            />
            {/* 粉筆軌跡：這條線是右下角兩個學生畫出來的，所以高度要對齊他們舉筆的
                位置。用固定的 bottom 而不是百分比，區塊變高時才不會跟著飄走。 */}
            <img
              src={decoChalk}
              alt=""
              className="absolute left-0 bottom-[40px] mobile:bottom-[24px] w-full min-w-[900px] h-auto"
              width={2682}
              height={420}
              loading="lazy"
            />
            {/* 左下角葉子：讓它一部分溢出到版面外，並帶視差 */}
            <Parallax
              strength={70}
              className="absolute left-0 bottom-[4%] w-[281px] mobile:w-[130px] -translate-x-[28%]"
            >
              <img
                src={decoLeaf}
                alt=""
                className="w-full h-auto"
                width={562}
                height={692}
                loading="lazy"
              />
            </Parallax>
            {/* 右下角兩個學生 */}
            <img
              src={decoStudents}
              alt=""
              className="absolute right-[3%] bottom-0 w-[380px] mobile:w-[190px] h-auto"
              width={1174}
              height={646}
              loading="lazy"
            />
          </div>

          <FadeIn className="relative z-10">
            <Container>
              <H2 id="brief">專案簡介</H2>

              {/* TwoColumn 預設是 md（768px）才分欄，平板會掉成上下欄；
                  加上 sm 讓 640px 以上就維持左右兩欄 */}
              <TwoColumn className="items-start sm:grid-cols-2">
                <div>
                  <P>
                    這是一本因應新課綱，南一書局高中歷史組和作者群傾盡心血製作的課本，內容在講述語言、翻譯如何影響我們的日常生活，是一個跨越地理位置與時間軸來看歷史的嶄新方法。
                  </P>
                  <P>
                    我負責全書的美術風格定調、排版設計，並擔綱插畫師，進行重要知識點的圖文整合，讓有趣的漫畫與圖解走入教科書，課本不再生澀無聊。
                  </P>
                  <p className="mt-4 text-caption italic opacity-70">
                    *因涉及版權無法展露全文，部分內文模糊處理
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <p className="text-h3 mb-2">角色</p>
                  <P className="mb-6">平面設計師</P>

                  <p className="text-h3 mb-2">時程</p>
                  <P className="mb-6">2017/12 – 2018/11</P>

                  <p className="text-h3 mb-2">工具</p>
                  <UL>
                    <LI>Adobe Photoshop</LI>
                    <LI>Adobe Illustrator</LI>
                    <LI>Adobe InDesign</LI>
                  </UL>
                </div>
              </TwoColumn>
            </Container>
            {/* 滿版自動輪播。刻意不放進 Wide，讓卡片一路溢出到螢幕外。 */}
            <div className="mt-8 -mt-4">
              <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView="auto"
                // 負值讓卡片彼此重疊；手機卡片較窄，重疊量也跟著縮小
                spaceBetween={-40}
                breakpoints={{ 769: { spaceBetween: -70 } }}
                loop={REVIEWS.length > 1}
                freeMode={{ enabled: true, momentum: false }}
                speed={16000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                // Swiper 只會改 transition-duration，不會動 timing-function，
                // 所以在這裡設一次 linear 就能一路等速，不會每段都 ease 出停頓感。
                onSwiper={(swiper) => {
                  swiper.wrapperEl.style.transitionTimingFunction = "linear";
                }}
                className={`!py-8 ${HOVER_PUSH_SLIDES}`}
              >
                {REVIEWS.map(({ src, width, height, alt }, i) => (
                  <SwiperSlide
                    key={alt}
                    className={`!w-[360px] mobile:!w-[240px] relative ${i % 2 ? "z-20" : "z-10"}`}
                  >
                    <button
                      type="button"
                      onClick={() => setZoom(zoomAt(REVIEWS, i))}
                      aria-label={`放大檢視：${alt}`}
                      className={`block w-full rounded-lg shadow-2xl cursor-zoom-in ${TILTS[i % TILTS.length]}`}
                    >
                      <LazyImage
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        sizes="(max-width: 768px) 240px, 360px"
                        className="w-full h-auto rounded-lg"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </FadeIn>
        </SectionBlock>

        {/* ── 03 封面設計 ──────────────────────────────────────────
            bg-3 是很淡的傾斜書頁照，當整區的底。空心跑馬燈、三本封面、
            標準字面板都長在同一塊背景上，中間不切斷。 */}
        <SectionBlock
          bgVariant="cover"
          backgrounds={backgrounds}
          style={lightStyle}
          className="overflow-hidden"
          textDarkOnBg
        >
          {/* 空心英文跑馬燈。沿用首頁的 .marquee（src/index.css），只描邊不填色。 */}
          <div className="flex items-center pointer-events-none select-none mb-20 mobile:mb-12">
            <div className="marquee">
              <div
                className="marquee__inner text-large mobile:text-large-mobile"
                style={OUTLINE_TEXT}
              >
                <span className="mx-6">
                  A Traveler’s Guide for Young Historians
                </span>
                {/* 複製一份才能無縫接回，跟首頁一樣 */}
                <span className="mx-6">
                  A Traveler’s Guide for Young Historians
                </span>
              </div>
            </div>
          </div>

          <FadeIn>
            <Container>
              {/* 標題走 Typewriter 而不是 H2，樣式沿用 H2 的 text-h2 / 500 字重 */}
              <div className="grid grid-cols-1 sm:grid-cols-[5fr_7fr] gap-12 items-start">
                <Typewriter
                  as="h2"
                  id="cover"
                  className="text-h2"
                  style={{ fontWeight: 500 }}
                  text="封面與標準字設計"
                />
                <P className="!mb-0">
                  最初以金色配色與真實物件堆疊營造歷史感，但因應行銷方向調整，與編輯討論後逐步簡化風格。最終版本改以插畫感的地圖與書頁元素，展示影響詞彙的關鍵書籍，呼應「漫遊」的核心意象。
                </P>
              </div>
            </Container>

            {/* 三本封面階梯式下降，後面的疊在前面之上 */}
            <Wide className="mt-12">
              <div className={`flex items-start ${HOVER_PUSH_COVERS}`}>
                {COVERS.map(({ src, width, height, alt, caption }, i) => (
                  <figure
                    key={caption}
                    className={`relative w-1/3 ${COVER_STAIR[i]}`}
                  >
                    <button
                      type="button"
                      onClick={() => setZoom(zoomAt(COVERS, i))}
                      aria-label={`放大檢視：${alt}`}
                      className="block w-full rounded-lg shadow-2xl cursor-zoom-in"
                    >
                      <LazyImage
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        sizes="(max-width: 768px) 30vw, 330px"
                        className="w-full h-auto rounded-lg"
                      />
                    </button>
                    <figcaption className="mt-4 mobile:mt-2 text-center">
                      <span
                        className="inline-block rounded-sm px-4 mobile:px-2 py-1 text-caption"
                        style={greenStyle}
                      >
                        {caption}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Wide>

            {/* 標準字：副標在面板外，面板右上角有一個指回「最終版」的三角形 */}
            <Wide className="mt-16">
              {/* 收合的寬度掛在外層，副標才會跟著面板一起縮進來、不會被留在最左邊 */}
              <div className="mx-auto" style={logotypes.panelStyle}>
                <p className="text-p-strong mb-4">
                  標準字備選名單！最後勝出的是⋯
                </p>

                <div
                  ref={logotypes.panelRef}
                  className="relative rounded-lg p-16 mobile:p-10"
                  style={greenStyle}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 right-[12%] mobile:right-[8%] w-0 h-0 border-l-[14px] border-r-[14px] border-b-[14px] border-l-transparent border-r-transparent"
                    style={{ borderBottomColor: GREEN }}
                  />
                  {/* 依序浮現 → 停一秒 → 落選淡出 → 勝出者放大、面板收合。
                    整段時序在 ../useLogotypeReveal。 */}
                  <div className="flex flex-wrap items-center justify-center gap-12 mobile:gap-10">
                    {LOGOTYPES.map(({ src, alt, size }, i) => (
                      <img
                        key={alt}
                        ref={
                          i === WINNER_LOGOTYPE
                            ? logotypes.winnerRef
                            : undefined
                        }
                        src={src}
                        alt={alt}
                        className={`w-auto ${size} ${logotypes.isRemoved(i) ? "hidden" : ""}`}
                        style={logotypes.itemStyle(i)}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Wide>
          </FadeIn>
        </SectionBlock>
        {/* ── 04 內頁設計 ──────────────────────────────────────────
            深綠底紋。一張大跨頁 + 底下縮圖列。
            手機待決（最大的坑）：跨頁在 375px 讀不到字，要單頁裁切／橫滑／燈箱三選一。 */}
        <SectionBlock
          bgVariant="green"
          backgrounds={backgrounds}
          style={greenStyle}
        >
          <FadeIn>
            <Container>
              <div className="grid grid-cols-1 sm:grid-cols-[5fr_7fr] gap-12 items-start">
                <Typewriter
                  as="h2"
                  id="interior"
                  className="text-h2"
                  style={{ fontWeight: 500 }}
                  text="內頁設計"
                />
                <P className="!mb-0">
                  使用大量的插圖以及引導思考的問答，減去生硬感，增加學生投入意願。
                </P>
              </div>
            </Container>

            <Wide className="mt-12">
              <figure>
                {/* 真的可以翻的書。頁面內容目前是佔位頁，等單頁圖上傳後換掉 BOOK_PAGES。 */}
                <PageFlipBook
                  pages={BOOK_PAGES}
                  pageRatio={0.745}
                  turned={turned}
                  onTurnedChange={setTurned}
                />
              </figure>
            </Wide>
          </FadeIn>
        </SectionBlock>

        {/* ── 05 插畫設計 ──────────────────────────────────────────
            一整排插畫 + 疊在上面的深綠說明面板。
            手機待決：面板疊著一定爆版，建議落到圖下方；插畫每隻獨立切才能重排。 */}
        <SectionBlock style={lightStyle}>
          <FadeIn>
            <Container className="text-center">
              <Typewriter
                as="h2"
                id="illustration"
                className="text-h2 mb-8"
                style={{ fontWeight: 500 }}
                text="插畫設計"
              />
            </Container>

            {/* 兩排反向跑的插畫帶，說明面板半透明疊在上面。
                刻意不放進 Wide，讓插畫一路溢出到螢幕外。 */}
            <div className="mt-12 relative">
              <IllustrationRow
                items={ILLUSTRATIONS.slice(0, 6)}
                onSelect={(i) => setZoom(zoomAt(ILLUSTRATIONS, i))}
              />
              <IllustrationRow
                items={ILLUSTRATIONS.slice(6)}
                offset={6}
                onSelect={(i) => setZoom(zoomAt(ILLUSTRATIONS, i))}
                reverse
                className="mt-4"
              />

              {/* Swiper 的 stylesheet 給 .swiper 設了 z-index: 1，所以這層要明確拉高才蓋得住 */}
              <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                <Wide>
                  <div
                    className="w-[46%] mobile:w-full rounded-lg p-8 mobile:p-6"
                    style={panelStyle}
                  >
                    <P>
                      全書插畫皆親手完成。以手繪感的線條與柔和色塊為主，人物造型盡量生活化、去除說教感，讓歷史人物看起來更像能與學生對話的角色，而不是冰冷的肖像。
                    </P>
                    <P className="!mb-0">
                      同時，插畫也承擔了圖解功能，把制度、事件或因果關係轉譯成一眼能看懂的視覺敘事，減少學生對長篇文字的抗拒感。
                    </P>
                  </div>
                </Wide>
              </div>
            </div>
          </FadeIn>
        </SectionBlock>

        {/* ── 06 結語 ────────────────────────────────────────────
            bg-4 是淺藍底紋。相關專案與頁尾本來就在同一個 SectionBlock 裡，
            所以一起吃到這張背景。 */}
        <SectionBlock
          bgVariant="closing"
          backgrounds={backgrounds}
          style={lightStyle}
          textDarkOnBg
        >
          <FadeIn>
            <Container className="text-center">
              {/* 字級字重沿用全站的 text-p（透過 <P>），不另外加大 */}
              <blockquote className="w-full md:w-2/3 mx-auto text-gray-800">
                <P>
                  身兼美術統籌與插畫師的作品，從色彩、版面到每一張手繪插圖，都是一次把「教科書」重新想像成「可以翻閱的故事」的練習。
                </P>
                <P>
                  歷史並不是離我們非常遙遠的陳年舊事，而是藏在每一次翻譯、每一個新詞彙裡，持續在改寫我們理解世界的方式。
                </P>
                <P className="!mb-0">
                  這也是我想把它做成一本故事書的原因：讓讀者在翻頁之間，發現歷史其實一直都在身邊。
                </P>
              </blockquote>
              <img
                src={decoClosing}
                alt=""
                aria-hidden="true"
                className="mx-auto w-[176px] h-auto mt-10"
                width={352}
                height={388}
                loading="lazy"
              />
              <p className="text-h3 font-light mt-10">給年輕史家的漫遊指南</p>
              <p className="text-caption text-gray-500 font-light">2018</p>
            </Container>
          </FadeIn>

          <RelatedProjects />

          <hr className="w-full my-8 border-black/10" />
          <Footer />
        </SectionBlock>
      </main>

      <Lightbox
        items={zoom.items}
        index={zoom.index}
        onClose={() => setZoom(EMPTY_ZOOM)}
        onNavigate={(index) => setZoom((current) => ({ ...current, index }))}
      />
    </div>
  );
}
