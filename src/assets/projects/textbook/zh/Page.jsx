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
import FadeIn from "../../../../components/utilities/FadeIn";
import { useHeroIntro } from "../useHeroIntro";
import { useLogotypeReveal } from "../useLogotypeReveal";

import P from "../../../../components/post/P";
import H2 from "../../../../components/post/H2";
import H3 from "../../../../components/post/H3";
import UL from "../../../../components/post/UL";
import LI from "../../../../components/post/LI";

// Images live in src/assets/projects/textbook/image
import bgHero from "../image/bg-1@2x.jpg";
import bgGreen from "../image/bg-2@2x.png";
import bgCover from "../image/bg-3@2x.png";
import bgClosing from "../image/bg-4@2x.png";
import keyVision from "../image/key-vision.svg";
import text1 from "../image/text-1.svg";
import text2 from "../image/text-2.svg";
import text3 from "../image/text-3.svg";

import cover1 from "../image/cover-1.png";
import cover2 from "../image/cover-2.png";
import cover3 from "../image/cover-3.png";

import review1 from "../image/review-1.png";
import review2 from "../image/review-2.png";
import review3 from "../image/review-3.png";
import review4 from "../image/review-4.png";

import spread1 from "../image/spread-1.png";
import spread2 from "../image/spread-2.png";
import spread3 from "../image/spread-3.png";
import spread4 from "../image/spread-4.png";
import spread5 from "../image/spread-5.png";
import spread8 from "../image/spread-8.png";
import spread9 from "../image/spread-9.png";

import illust1 from "../image/illust-1.png";
import illust2 from "../image/illust-2.png";
import illust3 from "../image/illust-3.png";
import illust4 from "../image/illust-4.png";
import illust5 from "../image/illust-5.png";
import illust6 from "../image/illust-6.png";
import illust7 from "../image/illust-7.png";
import illust8 from "../image/illust-8.png";
import illust9 from "../image/illust-9.png";
import illust10 from "../image/illust-10.png";
import illust11 from "../image/illust-11.png";

import decoChalk from "../image/deco-1@2x.png";
import decoStudents from "../image/deco-2@2x.png";
import decoLamp from "../image/deco-3@2x.png";
import decoLeaf from "../image/deco-4@2x.png";
import decoClosing from "../image/deco-9@2x.png";

// 滿版自動輪播的內頁截圖。傾斜與高低差由 TILTS 依索引循環套用，
// 所以要加第五張以上，在這裡多一行就好。
const REVIEWS = [
  {
    src: review2,
    width: 806,
    height: 601,
    alt: "內頁：「百科全書」譯名的由來",
  },
  {
    src: review1,
    width: 841,
    height: 601,
    alt: "內頁：十八世紀法國出版業的圖解",
  },
  { src: review3, width: 893, height: 601, alt: "內頁：文化與認同的概念圖" },
  { src: review4, width: 676, height: 601, alt: "內頁：新文化運動的百科全書" },
];

// 跨頁都是去背的書冊造型（2000x1450，四邊透明），直接鋪在深綠底上，
// 不需要白框或陰影。編號沿用原書頁次，所以中間跳號是正常的。
const SPREADS = [
  {
    src: spread1,
    width: 2000,
    height: 1450,
    title: "1. 猜一猜！「Boba」是什麼？",
    caption:
      "巨幅手繪珍珠奶茶插畫貫穿版心，搭配溫潤的奶茶色調與圓點裝飾，讓語言學議題有了具體且貼近生活的視覺入口。",
  },
  {
    src: spread2,
    width: 2000,
    height: 1450,
    title: "2. 讓專業的來！嚴復與翻譯的中西對話",
    caption:
      "版面以筆記本格線為底，搭配書封掃描直接上版，營造出可以「翻閱」的檔案感。",
  },
  {
    src: spread3,
    width: 2000,
    height: 1450,
    title: "3. 教室裡的筆戰",
    caption:
      "採漫畫分鏡與對話框呈現論辯場景，色彩對比鮮明，讓史料辯論多了一層戲劇張力。",
  },
  {
    src: spread4,
    width: 2000,
    height: 1450,
    title: "4. 啟蒙時代的《百科全書》",
    caption:
      "左頁以古典油畫風插畫開場，營造啟蒙沙龍的莊重感；右頁轉為俐落的資訊卡片編排，形成古典與現代的對照。",
  },
  {
    src: spread5,
    width: 2000,
    height: 1450,
    title: "5. 觸怒教會的狄德羅",
    caption:
      "以詞條卡片相互參照的手法，搭配步驟化圖解，把百科全書背後的商業與盜版邏輯拆解得清楚易懂。",
  },
  {
    src: spread8,
    width: 2000,
    height: 1450,
    title: "6. 班級搶先報",
    caption:
      "插畫以教室黑板與海報製作的情境為主視覺，呼應「動一動」實作任務的動手做調性。",
  },
  {
    src: spread9,
    width: 2000,
    height: 1450,
    title: "7. 校園記憶中的口述史",
    caption:
      "跨頁以滿版的校園植栽插畫營造開闊、生活化的氛圍，緩和歷史學方法論本身的嚴肅感。",
  },
  // 燈箱的 alt 直接沿用標題，不用另外維護一份描述
].map((item) => ({ ...item, alt: item.title.replace(/^\d+\.\s*/, "") }));

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

const COVERS = [
  {
    src: cover1,
    width: 746,
    height: 1001,
    alt: "封面第一版：古書、放大鏡與懷錶的寫實風格",
    caption: "第一版",
  },
  {
    src: cover2,
    width: 746,
    height: 1001,
    alt: "封面第二版：藍底、標準字置中的圖像風格",
    caption: "第二版",
  },
  {
    src: cover3,
    width: 745,
    height: 1001,
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
  "[&>*:hover+*]:translate-x-7 [&>*:has(+*:hover)]:-translate-x-7"

// transform 要加 !：Swiper 的 .swiper-backface-hidden .swiper-slide 也宣告了
// transform: translateZ(0)，不標 important 的話位移和縮放會被它蓋掉。
const HOVER_PUSH_SLIDES =
  "[&_.swiper-slide]:transition-transform [&_.swiper-slide]:duration-300 [&_.swiper-slide]:ease-out " +
  "[&_.swiper-slide:hover]:!scale-[1.08] [&_.swiper-slide:hover]:z-40 " +
  "[&_.swiper-slide:hover+.swiper-slide]:!translate-x-7 " +
  "[&_.swiper-slide:has(+.swiper-slide:hover)]:!-translate-x-7"

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
  const [spreadIndex, setSpreadIndex] = useState(0);
  const logotypes = useLogotypeReveal(LOGOTYPES.length, WINNER_LOGOTYPE);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: LIGHT }}>
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
          {/* 裝飾層。純裝飾所以整層 aria-hidden，也不吃點擊。 */}
          <div
            aria-hidden="true"
            data-parallax-scope
            className="pointer-events-none select-none absolute inset-0 overflow-hidden"
          >
            {/* 吊燈：自帶垂線，所以貼齊區塊上緣 */}
            <img
              src={decoLamp}
              alt=""
              className="absolute top-0 right-[9%] w-[134px] mobile:w-[76px]"
              loading="lazy"
            />
            {/* 粉筆軌跡：這條線是右下角兩個學生畫出來的，所以高度要對齊他們舉筆的
                位置。用固定的 bottom 而不是百分比，區塊變高時才不會跟著飄走。 */}
            <img
              src={decoChalk}
              alt=""
              className="absolute left-0 bottom-[40px] mobile:bottom-[24px] w-full min-w-[900px]"
              loading="lazy"
            />
            {/* 左下角葉子：讓它一部分溢出到版面外，並帶視差 */}
            <Parallax
              strength={70}
              className="absolute left-0 bottom-[4%] w-[281px] mobile:w-[130px] -translate-x-[28%]"
            >
              <img src={decoLeaf} alt="" className="w-full" loading="lazy" />
            </Parallax>
            {/* 右下角兩個學生 */}
            <img
              src={decoStudents}
              alt=""
              className="absolute right-[3%] bottom-0 w-[380px] mobile:w-[190px]"
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
            <div className="mt-16">
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
                className={`!py-12 ${HOVER_PUSH_SLIDES}`}
              >
                {REVIEWS.map(({ src, width, height, alt }, i) => (
                  <SwiperSlide
                    key={alt}
                    className={`!w-[420px] mobile:!w-[260px] relative ${i % 2 ? "z-20" : "z-10"}`}
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
                        sizes="(max-width: 768px) 260px, 420px"
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
              <H2 id="cover">封面設計</H2>
              <P>風格與標準字都經過多次的演進過程。</P>
              <P>
                最初以金色配色與真實物件堆疊營造歷史感，但因應行銷方向調整，與編輯討論後逐步簡化風格。最終版本改以插畫感的地圖與書頁元素，展示影響詞彙的關鍵書籍，呼應「漫遊」的核心意象。
              </P>
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
            <Container className="text-center">
              <H2 id="interior">內頁設計</H2>
              <P>
                在課本內，我們使用大量的插圖以及引導思考的問答，減去生硬感，增加學生投入意願。
              </P>
            </Container>

            <Container className="mt-12">
              <figure>
                <button
                  type="button"
                  onClick={() => setZoom(zoomAt(SPREADS, spreadIndex))}
                  aria-label={`放大檢視：${SPREADS[spreadIndex].alt}`}
                  className="block w-full cursor-zoom-in"
                >
                  <LazyImage
                    key={SPREADS[spreadIndex].src}
                    src={SPREADS[spreadIndex].src}
                    width={SPREADS[spreadIndex].width}
                    height={SPREADS[spreadIndex].height}
                    alt={SPREADS[spreadIndex].alt}
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="w-full h-auto"
                    preload
                  />
                </button>
                <figcaption className="mt-6 text-center max-w-[640px] mx-auto">
                  <p className="text-p-strong">{SPREADS[spreadIndex].title}</p>
                  <p className="text-caption mt-2 opacity-80">
                    {SPREADS[spreadIndex].caption}
                  </p>
                </figcaption>
              </figure>

              <div className="grid grid-cols-7 mobile:grid-cols-4 gap-3 mt-10">
                {SPREADS.map(({ src, width, height, alt }, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSpreadIndex(i)}
                    aria-label={`切換到：${alt}`}
                    aria-current={i === spreadIndex}
                    className={`block rounded-sm overflow-hidden transition-opacity duration-300 ${
                      i === spreadIndex
                        ? "opacity-100 ring-2 ring-white/70"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <LazyImage
                      src={src}
                      width={width}
                      height={height}
                      alt=""
                      sizes="140px"
                      className="w-full h-auto"
                    />
                  </button>
                ))}
              </div>
            </Container>
          </FadeIn>
        </SectionBlock>

        {/* ── 05 插畫設計 ──────────────────────────────────────────
            一整排插畫 + 疊在上面的深綠說明面板。
            手機待決：面板疊著一定爆版，建議落到圖下方；插畫每隻獨立切才能重排。 */}
        <SectionBlock style={lightStyle}>
          <FadeIn>
            <Container className="text-center">
              <H2 id="illustration">插畫設計</H2>
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
