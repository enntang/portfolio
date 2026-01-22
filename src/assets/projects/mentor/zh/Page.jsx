import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Navbar from '../../../../components/utilities/Navbar'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import ImageWithHotspots from '../../../../components/utilities/ImageWithHotspots'
import Footer from '../../../../components/utilities/Footer'
import ProjectNote from '../../../../components/projects/ProjectNote'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import TableOfContents from '../../../../components/utilities/TableOfContents'

gsap.registerPlugin(ScrollTrigger)

// Images (reuse EN assets; put localized images into ../zh/ later if needed)
import BG1 from '../image/projectInfo-mentor-bg-1.png'
import BG2 from '../image/projectInfo-mentor-bg-2.png'
import BG3 from '../image/projectInfo-mentor-bg-3.png'
import BG4 from '../image/projectInfo-mentor-bg-4.png'

const mentorBackgrounds = {
  purple: BG1,
  dark: BG2,
  blue: BG3,
  mentor: BG4,
}

import shineImage from '../image/projectInfo-mentor-shine.svg'
import glintImage from '../image/projectInfo-mentor-glint.svg'

import tabletMockup from '../image/projectInfo-mentor-tablet-mockup.png'
import mentor from '../image/projectInfo-mentor-mentor.png'
import arrowDown from '../../../../../public/icon-arrow-down.svg'
import quoteIcon from '../../../../../public/icon-quote.svg'
import phases from '../image/projectInfo-mentor-phase.png'
import chartImg from '../image/projectInfo-mentor-chart.png'
import deliverablesDraft from '../image/projectInfo-mentor-draft.png'
import deliverablesLayout1 from '../image/projectInfo-mentor-layout1.png'
import deliverablesLayout2 from '../image/projectInfo-mentor-layout2.png'
import guidelineImg from '../image/projectInfo-mentor-guideline.png'
import mentorDraft from '../image/projectInfo-mentor-draft-2.png'
import mentorVariants from '../image/projectInfo-mentor-variants.png'
import pyramid from '../image/projectInfo-mentor-pyramid.png'
import screenShot1 from '../image/projectInfo-mentor-screenshot1.png'
import screenShot2 from '../image/projectInfo-mentor-screenshot2.png'
import screenShot3 from '../image/projectInfo-mentor-screenshot3.png'
import screenShot4 from '../image/projectInfo-mentor-screenshot4.png'
import screenShot5 from '../image/projectInfo-mentor-screenshot5.png'
import screenShot6 from '../image/projectInfo-mentor-screenshot6.png'
import screenShot7 from '../image/projectInfo-mentor-screenshot7.png'
import screenShot8 from '../image/projectInfo-mentor-screenshot8.png'
import typesImg from '../image/projectInfo-mentor-4types.png'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function MentorPageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const parentsCircleRef = useRef(null)
  const studentsCircleRef = useRef(null)

  // Use floating animation hook for mentor image
  const mentorImgRef = useFloatingAnimation({ y: -20, duration: 2 })
  // Use floating animation for arrow down icon
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })

  // Define hotspots
  const learningPersonaHotspots = [
    {
      id: 'point1',
      x: 20,
      y: 25,
      content: '選擇最適合的學習路徑：每週要投入多少時間學習。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 78,
      y: 55,
      content: '系統會顯示學生類型。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 12,
      y: 20,
      content:
        '建立學習計畫共有 4 個步驟：1. 選擇學習期間 2. 選擇每週學習日 3. 設定學習目標 4. 確認計畫。',
      arrowPosition: 'bottom',
    },
  ]
  const learningGoalHotspots = [
    {
      id: 'point1',
      x: 18,
      y: 14,
      content:
        '流程最後，系統會顯示學習計畫；學生可在時間軸與月曆視圖之間切換，以查看規劃內容。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content: '不同顏色的圓點代表不同的學習科目。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: '單日學習內容概覽。',
      arrowPosition: 'bottom',
    },
  ]
  const learningReportHotspots = [
    {
      id: 'point1',
      x: 38,
      y: 4,
      content:
        '報表涵蓋三種時間維度：每日、每週與每月，分別呈現不同深度的學習狀況。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 8,
      y: 44,
      content: '家長可以在不同孩子之間切換查看報表。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: '學生的學習表現與進度總覽。',
      arrowPosition: 'bottom',
    },
  ]
  const badgeCollectionHotspots = [
    {
      id: 'point1',
      x: 28,
      y: 4,
      content: '學生可以查看自己的收集進度。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content:
        '每枚徽章都有獨特的視覺識別，並在「成就殿堂」介面中展示。',
      arrowPosition: 'bottom',
    },
  ]

  useEffect(() => {
    // Animate parents circle from left
    gsap.fromTo(
      parentsCircleRef.current,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: parentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )

    // Animate students circle from right
    gsap.fromTo(
      studentsCircleRef.current,
      {
        x: 300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: studentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant="arrow"
      />
      <main className="bg-bg">
        {/* Hero */}
        <header className=" relative overflow-hidden">
          <SectionBlock bgVariant="purple" className="relative" backgrounds={mentorBackgrounds}>
            <TableOfContents />
            <img src={shineImage} alt="shine" className="absolute top-0 right-0" />
            <img src={glintImage} alt="glint" className="absolute bottom-0 left-0" />
            <Container className="flex flex-col items-center justify-center text-center">
              <img ref={mentorImgRef} src={mentor} alt="Mentor" className="h-48 w-48 md:h-64 md:w-64" />
              <h1 className="text-large mobile:text-large-mobile">Mentor</h1>
              <H3 className="mb-24">AI 整合學習平台</H3>
              <P className="w-full md:w-2/3">
                設計 Mentor 不只是打造畫面與流程，更是打造一個團隊、一個故事，以及一份對學習的共同信念。
              </P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container className="flex flex-col items-center justify-center">
            <div className="text-center mb-10">
              <H2>專案簡介</H2>
            </div>
            <img src={tabletMockup} alt="Mentor 設計預覽" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  在 Samebest，我擔任全新產品「Mentor」的 UI 與平面設計團隊設計主管。這款 App
                  旨在協助學生更有效率地規劃與完成學習旅程，準備各類校內考試與升學考試（包含高中與大學入學考）。
                  我帶領團隊完成介面設計，並建立可延展的品牌視覺基礎。
                </P>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-h3">角色</p>
                <P>設計主管（Design Lead）</P>
                <p className="text-h3">時程</p>
                <P>2019/05 – 2024/06</P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Responsibilities (dark) */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2>主要職責</H2>

            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="responsibilities-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H3>1. 團隊領導</H3>
                    <UL>
                      <LI>帶領 4 位設計師完成 0–1 產品孵化流程。</LI>
                      <LI>依據成員優勢分配任務，協助其思考與落地。</LI>
                      <LI>促進與 PM、R&amp;D 協作，確保設計成果兼顧可用性與可行性。</LI>
                    </UL>
                    <P>在領導過程中，我也主持團隊定期討論：</P>
                    <UL>
                      <LI>早期概念探索與競品分析，找出產品差異化切入點。</LI>
                      <LI>設計執行策略，如何與工程端的工作流對齊。</LI>
                      <LI>在複雜結構與大型需求下，兼顧使用者體驗與整體一致性。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. 設計系統建立</H3>
                    <UL>
                      <LI>制定產品整體視覺風格方向。</LI>
                      <LI>依國高中主要使用者的審美與語言習慣調整 UX 與視覺表現。</LI>
                      <LI>與團隊蒐集與整理視覺參考，建立一致的設計語言。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div>
                <H3>1. 團隊領導</H3>
                <UL>
                  <LI>帶領跨設計與工程團隊推進產品。</LI>
                  <LI>依據成員優勢分配任務，協助其思考與落地。</LI>
                  <LI>促進與 PM、R&amp;D 協作，確保設計成果兼顧可用性與可行性。</LI>
                </UL>
                <P>在領導過程中，我也主持團隊定期討論：</P>
                <UL>
                  <LI>早期概念探索與競品分析，找出產品差異化切入點。</LI>
                  <LI>設計執行策略，如何與工程端的工作流對齊。</LI>
                  <LI>在複雜結構與大型需求下，兼顧使用者體驗與整體一致性。</LI>
                </UL>
              </div>
              <div>
                <H3>2. 設計系統建立</H3>
                <UL>
                  <LI>制定產品整體視覺風格方向。</LI>
                  <LI>依國高中主要使用者的審美與語言習慣調整 UX 與視覺表現。</LI>
                  <LI>與團隊蒐集與整理視覺參考，建立一致的設計語言。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Workflow */}
        <SectionBlock className="pb-0" backgrounds={mentorBackgrounds}>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <H2>工作流程</H2>
              <UL className="md:col-span-2">
                <LI>每個功能以約兩個月為一個週期，跨職能協作設計與開發。</LI>
                <LI>在探索與發想階段以小組形式進行，快速產出最有效的解法。</LI>
                <LI>最終交付前與工程端共同檢視可行性，並持續迭代精修。</LI>
              </UL>
            </div>
          </Container>
          <img src={phases} alt="工作流程階段" />
        </SectionBlock>

        {/* Background + Insights alternating backgrounds */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="background-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>背景</H2>
                    <P>
                      Mentor 最初被構想為公司既有桌面端自學軟體（提供錄播課程）的行動端伴侶。
                    </P>
                    <P>
                      團隊在早期<strong>設定了三種不同的學習情境</strong>，對應學生最常使用平台的典型場景。
                    </P>
                    <P className="text-xs text-gray-100">
                      系統一開始被設計為用來控制桌面端影音自學軟體的「遠端介面」。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">在家：坐在書桌前</div>
                      <p className="pb-0">可使用桌機、平板與課本。</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">在學校或圖書館</div>
                      <p className="pb-0">只有平板與課本，作為課堂延伸學習。</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">在外移動中</div>
                      <p className="pb-0">僅帶著平板，作為主要學習工具。</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <TwoColumn>
                <div>
                  <H2 id="背景">背景</H2>
                  <P>
                    Mentor 最初被構想為公司既有桌面端自學軟體（提供錄播課程）的行動端伴侶。
                  </P>
                  <P>
                    團隊在早期<strong>設定了三種不同的學習情境</strong>，對應學生最常使用平台的典型場景。
                  </P>
                  <P className="text-xs text-gray-100">
                    系統一開始被設計為用來控制桌面端影音自學軟體的「遠端介面」。
                  </P>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">在家：坐在書桌前</div>
                    <p className="pb-0">可使用桌機、平板與課本。</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">在學校或圖書館</div>
                    <p className="pb-0">只有平板與課本，作為課堂延伸學習。</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">在外移動中</div>
                    <p className="pb-0">僅帶著平板，作為主要學習工具。</p>
                  </div>
                </div>
              </TwoColumn>
            </div>
          </Container>
        </SectionBlock>

        {/* Research Insight */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className=" overflow-hidden">
            <div className=" mb-10 mx-auto">
              <H2>研究洞察</H2>
              <P>
                在開發初期，我們做了基礎使用者研究，驗證假設並挖掘痛點；研究聚焦兩個核心族群：<strong>家長與學生。</strong>
              </P>
              <P>
                我們發現雙方都有同樣的困擾：<br />
                對學習進度缺乏清楚認知，導致挫折感—學生覺得沒有變好，家長則覺得無從協助。
              </P>

              {/* two circles for infographic */}
              <div className="flex flex-row justify-center items-center my-16 relative isolate">
                {/* Parents Circle - Blue gradient */}
                <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">家長</p>
                    <p className="text-xl leading-relaxed">「我不知道學校在教什麼，也不知道孩子為什麼考不好。」</p>
                  </div>
                </div>
                {/* Students Circle - Purple gradient */}
                <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-32 md:-ml-40 z-20 mix-blend-multiply">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">學生</p>
                    <p className="text-xl leading-relaxed">「我一直做錯，卻不知道錯在哪裡。」</p>
                  </div>
                </div>
              </div>
              <P>
                根因其實一致：<strong>基礎不穩、缺乏結構化的複習策略。</strong>
                <br />
                這些洞察揭示了努力與成果之間的落差，也成為後續設計目標的基礎。
              </P>
            </div>
          </Container>
        </SectionBlock>

        {/* how might we */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <img src={quoteIcon} alt="quote icon" className="mb-8" />
              <H2 className="text-gray-900">我們如何能夠…</H2>
              <P className="mx-auto text-gray-900">
                我們如何協助學習進度不清、缺乏回饋而感到挫折的學生與家長，建立清晰感、動機，以及更個人化的下一步建議？
              </P>
            </div>
          </Container>
        </SectionBlock>

        {/* design goals */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="design-goals-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>設計目標</H2>
                    <P className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      依據研究洞察，我們整理出三個設計目標，以回應家長與學生的主要疑慮：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>1. 個人化目標設定與學習引導</H3>
                    <P>
                      為降低認知負荷並建立方向感，Mentor 會依學生程度、歷史表現與近期錯題來客製化讀書計畫。學生只要跟著 AI 引導逐步完成，就能穩定進步。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. 清楚易懂的回饋與下一步</H3>
                    <P>
                      不再只給模糊的分數，Mentor 會生成視覺化學習報表：呈現進度、指出弱點並提供下一步建議，讓家長與學生都能在清楚的資訊下持續前進。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>3. 透過成就感強化動機</H3>
                    <P>
                      以具體進度指標（錯誤減少、任務完成、連續學習等）建立情緒動能，鼓勵學生持續投入。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div>
                <H2 id="設計目標">設計目標</H2>
                <P className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  依據研究洞察，我們整理出三個設計目標，以回應家長與學生的主要疑慮：
                </P>
              </div>
              <div>
                <div className="mb-8">
                  <H3>1. 個人化目標設定與學習引導</H3>
                  <P>
                    為降低認知負荷並建立方向感，Mentor 會依學生程度、歷史表現與近期錯題來客製化讀書計畫。學生只要跟著 AI 引導逐步完成，就能穩定進步。
                  </P>
                </div>
                <div className="mb-8">
                  <H3>2. 清楚易懂的回饋與下一步</H3>
                  <P>
                    不再只給模糊的分數，Mentor 會生成視覺化學習報表：呈現進度、指出弱點並提供下一步建議，讓家長與學生都能在清楚的資訊下持續前進。
                  </P>
                </div>
                <div>
                  <H3>3. 透過成就感強化動機</H3>
                  <P>
                    以具體進度指標（錯誤減少、任務完成、連續學習等）建立情緒動能，鼓勵學生持續投入。
                  </P>
                </div>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* core philosophy */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container>
            <img src={chartImg} alt="chart" className="mt-[-200px] shadow-xl rounded-sm" />
            <div className="bg-[#3E3AFF] rounded-sm p-8 mt-16">
              <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                <div className="order-2 md:order-1 text-left">
                  <H2>核心理念</H2>
                  <P>
                    Mentor 最終被定義為一位個人化學習教練：這個清楚且好記的概念，統一了設計原則，同時回應使用者的情感與功能需求，讓產品對家長與學生都更具親和力。
                  </P>
                </div>
                <img src={mentor} alt="mentor" className="w-32 h-32 md:w-48 md:h-48 order-1 md:order-2" />
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock className="pb-0" backgrounds={mentorBackgrounds}>
          <Container className="relative">
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="design-deliverables-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>設計產出</H2>
                    <P>
                      為了傳達 Mentor 作為個人化學習教練的價值，我們以敘事方式去設計整體體驗：Mentor 不只是一個 App，而是陪伴學生設定可達成目標、保持節奏、並在可見進步中建立自信的智慧夥伴。以此視角，我主導視覺設計與 UI 系統建立，並與三個核心設計目標對齊。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ProjectNote>
                      從線框到中保真 POC，再到最終主題化 UI，每一次迭代都幫助我們釐清版面邏輯，並逐步形塑產品的敘事識別。
                    </ProjectNote>
                    <img src={deliverablesDraft} alt="設計草稿" className="my-16" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={deliverablesLayout1} alt="版面設計 1" className="w-full" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={deliverablesLayout2} alt="版面設計 2" className="w-full" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>
                      作為設計主管，我定義產品視覺風格並與團隊共同建立一致的設計系統。由於主要使用者是國高中生，我們必須貼近其審美與語言習慣，使 UX 設計更具挑戰。團隊一起蒐集風格參考、探索不同方向，最終建立符合產品語氣的系統。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2 id="設計產出">設計產出</H2>
              <P>
                為了傳達 Mentor 作為個人化學習教練的價值，我們以敘事方式去設計整體體驗：Mentor 不只是一個 App，而是陪伴學生設定可達成目標、保持節奏、並在可見進步中建立自信的智慧夥伴。以此視角，我主導視覺設計與 UI 系統建立，並與三個核心設計目標對齊。
              </P>

              <ProjectNote className="absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32">
                從線框到中保真 POC，再到最終主題化 UI，每一次迭代都幫助我們釐清版面邏輯，並逐步形塑產品的敘事識別。
              </ProjectNote>
              <img src={deliverablesDraft} alt="設計草稿" className="my-16" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={deliverablesLayout1} alt="版面設計 1" className="md:h-full md:object-cover" />
                <img src={deliverablesLayout2} alt="版面設計 2" className="md:h-full md:object-cover" />
              </div>
              <div className="my-16">
                <P>
                  作為設計主管，我定義產品視覺風格並與團隊共同建立一致的設計系統。由於主要使用者是國高中生，我們必須貼近其審美與語言習慣，使 UX 設計更具挑戰。團隊一起蒐集風格參考、探索不同方向，最終建立符合產品語氣的系統。
                </P>
              </div>
            </div>
          </Container>
          <img src={guidelineImg} alt="guideline" />
        </SectionBlock>

        {/* story of mentor */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="story-mentor-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>Mentor 的故事</H2>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <P className="">
                        「Mentor」一詞源自希臘神話：一位睿智的守護者，被託付在奧德修斯遠行時引導他的兒子。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>
                      在 AI 與資訊超載的時代，Mentor 成為指引之神，卻意外被困在宇宙方塊中。
                    </P>
                    <P>
                      為了取回力量並回到地球，他必須引導學生穿越宇宙展開學習旅程，收集象徵成長的徽章。<strong>每位學生的進步都會推動 Mentor 的進化，讓學習成為共同冒險。</strong>
                    </P>
                    <P>
                      這段寓言式的故事讓 App 體驗不僅是教育工具，更像是一場學生與 Mentor 共同變身的任務。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2 id="mentor-的故事">Mentor 的故事</H2>
              <TwoColumn>
                <div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 ">
                    <P className="">
                      「Mentor」一詞源自希臘神話：一位睿智的守護者，被託付在奧德修斯遠行時引導他的兒子。
                    </P>
                  </div>
                </div>
                <div>
                  <P>
                    在 AI 與資訊超載的時代，Mentor 成為指引之神，卻意外被困在宇宙方塊中。
                  </P>
                  <P>
                    為了取回力量並回到地球，他必須引導學生穿越宇宙展開學習旅程，收集象徵成長的徽章。<strong>每位學生的進步都會推動 Mentor 的進化，讓學習成為共同冒險。</strong>
                  </P>
                  <P>
                    這段寓言式的故事讓 App 體驗不僅是教育工具，更像是一場學生與 Mentor 共同變身的任務。
                  </P>
                </div>
              </TwoColumn>
            </div>
          </Container>
        </SectionBlock>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            <div>
              <img src={mentorDraft} alt="mentor draft" className=" md:object-cover" />
              <P className="text-caption p-8 md:ml-24 mt-4 md:mt-8">
                早期草圖：探索 Mentor 作為宇宙引導者的象徵角色，以及學習、節奏、對話與成長的抽象表現。
              </P>
            </div>
            <div>
              <img src={mentorVariants} alt="mentor variants" className=" md:object-cover" />
              <P className="text-caption p-8 md:mr-24 mt-4 md:mt-8">
                為反映每位學習者的獨特旅程，Mentor 會隨時間進化—外觀會依學生行為、步調與投入方式而改變。
              </P>
            </div>
          </div>

          {/* Mentor as a UI Guide */}
        </SectionBlock>
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="w-full md:w-2/3 mx-auto">
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="mentor-ui-guide-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>Mentor 作為介面引導者</H2>
                    <P>
                      Mentor 會停留在右下角，作為即時的學習代理：依學生操作提供回饋、提醒與鼓勵。
                    </P>
                    <P>
                      發光的科幻方塊化身結合「智慧」與「神話感」，形成雙層互動模型：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={pyramid} alt="pyramid chart" />
                    <P>
                      以教育代理理論為基礎，Mentor 成為敘事驅動的介面代理：強化情緒投入，讓學習流程更有意義、更有動力。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={screenShot1} alt="updates screen" className="rounded-sm" />
                    <p className="text-caption p-8">Mentor 讓例行更新變成鼓勵式互動。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={screenShot2} alt="first-time onboarding screen" className="rounded-sm" />
                    <p className="text-caption p-8">
                      首次引導中，學生需要依自信程度把科目從強到弱排序。
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2 id="mentor-作為介面引導者">Mentor 作為介面引導者</H2>
              <P>
                Mentor 會停留在右下角，作為即時的學習代理：依學生操作提供回饋、提醒與鼓勵。
              </P>
              <P>發光的科幻方塊化身結合「智慧」與「神話感」，形成雙層互動模型：</P>
              <img src={pyramid} alt="pyramid chart" />
              <P>
                以教育代理理論為基礎，Mentor 成為敘事驅動的介面代理：強化情緒投入，讓學習流程更有意義、更有動力。
              </P>
            </div>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-24">
            <div>
              <img src={screenShot1} alt="updates screen" className="rounded-sm" />
              <p className="text-caption p-8">Mentor 讓例行更新變成鼓勵式互動。</p>
            </div>
            <div>
              <img src={screenShot2} alt="first-time onboarding screen" className="rounded-sm" />
              <p className="text-caption p-8">
                首次引導中，學生需要依自信程度把科目從強到弱排序。
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* features */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2>功能特色</H2>
            <P>
              流程從「每週何時、每次多久想學習」開始。使用者可自由選擇每週學習日與時間長度，貼近真實生活節奏。
            </P>
            <ImageWithHotspots
              src={screenShot3}
              alt="learning persona classification"
              hotspots={learningPersonaHotspots}
            />

            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="features-swiper mt-8"
              >
                <SwiperSlide>
                  <div>
                    <H3>學習人格分類</H3>
                    <P>
                      為了讓學習更貼近個人，Mentor 會依學生每週學習時間自動分配四種學習人格之一：
                    </P>
                    <img src={typesImg} alt="types" />
                    <UL>
                      <LI>佛系學生（Laid-back Learner）：喜歡輕鬆、低壓的節奏。</LI>
                      <LI>勤奮學子（Consistent Striver）：規律投入、穩定前進。</LI>
                      <LI>資優菁英（Curious Achiever）：主動探索、喜歡挑戰。</LI>
                      <LI>天才學霸（Elite Performer）：追求頂尖表現、強烈企圖心。</LI>
                    </UL>
                    <P>
                      這套帶點趣味的系統能幫助學生建立自我認知，也能在學習過程中追蹤成長的身份變化。
                    </P>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div>
                    <H3>目標設定：個人化學習路徑</H3>
                    <UL>
                      <LI>
                        計畫同時提供時間軸與月曆視圖；每日任務卡包含科目、知識點與預估時間，學生可隨時調整與重新排序。
                      </LI>
                      <LI>
                        對每個任務，系統會清楚說明學習目標，並提供影片教學。
                      </LI>
                    </UL>
                    <ImageWithHotspots
                      src={screenShot4}
                      alt="learning goal setting"
                      hotspots={learningGoalHotspots}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                      <P>
                        <strong>設計重點：</strong>
                      </P>
                      <P>
                        讓學生共同參與計畫制定，並提前視覺化整體結構，可降低摩擦並提升掌控感。資訊清晰與可彈性調度，是維持長期投入的關鍵。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>學習報表：視覺化回饋與下一步</H3>
                    <P>
                      為了回應「回饋模糊/延遲」帶來的焦慮，我們設計了可在桌機與手機上使用的 Web 報表系統，讓家長能即時掌握狀況。
                    </P>
                    <ImageWithHotspots
                      src={screenShot5}
                      alt="learning goal setting"
                      hotspots={learningReportHotspots}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P className="mt-6">報表涵蓋三種時間維度：</P>
                    <UL>
                      <LI>
                        <strong>每日報表</strong>：呈現完成任務、知識點與測驗結果。
                      </LI>
                      <LI>
                        <strong>每週報表</strong>：呈現投入程度、人格變化與表現趨勢。
                      </LI>
                      <LI>
                        <strong>每月報表</strong>：提供時間投入、科目表現與診斷洞察的總覽。
                      </LI>
                    </UL>
                    <P>
                      所有報表都以簡化圖表與進度指標呈現，確保家長與學生都能快速理解。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                      <P>
                        <strong>設計重點：</strong>
                      </P>
                      <P>
                        最大挑戰是把複雜的表現數據轉換為可行動的洞察，同時維持情緒支持。透過與視覺語言一致的報表語氣，我們建立了一套透明且鼓勵式的系統，促進家長與學生溝通。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>徽章收集：以里程碑建立動機</H3>
                    <P>
                      為鼓勵持續投入，我們加入遊戲化的徽章收集系統。學生可透過達成學習里程碑解鎖徽章，例如完成課程、達成每日目標、或調整學習計畫等。
                    </P>
                    <ImageWithHotspots
                      src={screenShot6}
                      alt="badge collection"
                      hotspots={badgeCollectionHotspots}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P className="mt-6">
                      進度追蹤與解鎖回饋滿足「收集欲」，並強化習慣養成。
                    </P>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                      <img src={screenShot7} alt="badge 1" className="rounded-sm" />
                      <img src={screenShot8} alt="badge 2" className="rounded-sm" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                      <P>
                        <strong>設計重點：</strong>
                      </P>
                      <P>
                        我們結合可收集物的視覺吸引力與里程碑設計，讓進步變得「可被獎勵」，同時避免過度競爭式的遊戲化。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className=" mb-10  mx-auto">
                <H3>學習人格分類</H3>
                <P>
                  為了讓學習更貼近個人，Mentor 會依學生每週學習時間自動分配四種學習人格之一：
                </P>
                <img src={typesImg} alt="types" />
                <UL>
                  <LI>佛系學生（Laid-back Learner）：喜歡輕鬆、低壓的節奏。</LI>
                  <LI>勤奮學子（Consistent Striver）：規律投入、穩定前進。</LI>
                  <LI>資優菁英（Curious Achiever）：主動探索、喜歡挑戰。</LI>
                  <LI>天才學霸（Elite Performer）：追求頂尖表現、強烈企圖心。</LI>
                </UL>
                <P>
                  這套帶點趣味的系統能幫助學生建立自我認知，也能在學習過程中追蹤成長的身份變化。
                </P>
              </div>
              <div className=" mb-10  mx-auto">
                <H3>目標設定：個人化學習路徑</H3>
                <UL>
                  <LI>
                    計畫同時提供時間軸與月曆視圖；每日任務卡包含科目、知識點與預估時間，學生可隨時調整與重新排序。
                  </LI>
                  <LI>
                    對每個任務，系統會清楚說明學習目標，並提供影片教學。
                  </LI>
                </UL>
                <ImageWithHotspots
                  src={screenShot4}
                  alt="learning goal setting"
                  hotspots={learningGoalHotspots}
                />
              </div>
              <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                <P>
                  <strong>設計重點：</strong>
                </P>
                <P>
                  讓學生共同參與計畫制定，並提前視覺化整體結構，可降低摩擦並提升掌控感。資訊清晰與可彈性調度，是維持長期投入的關鍵。
                </P>
              </div>
              <div className=" mb-10  mx-auto">
                <H3>學習報表：視覺化回饋與下一步</H3>
                <P>
                  為了回應「回饋模糊/延遲」帶來的焦慮，我們設計了可在桌機與手機上使用的 Web 報表系統，讓家長能即時掌握狀況。
                </P>
                <ImageWithHotspots
                  src={screenShot5}
                  alt="learning goal setting"
                  hotspots={learningReportHotspots}
                />
                <P className="mt-6">報表涵蓋三種時間維度：</P>
                <UL>
                  <LI>
                    <strong>每日報表</strong>：呈現完成任務、知識點與測驗結果。
                  </LI>
                  <LI>
                    <strong>每週報表</strong>：呈現投入程度、人格變化與表現趨勢。
                  </LI>
                  <LI>
                    <strong>每月報表</strong>：提供時間投入、科目表現與診斷洞察的總覽。
                  </LI>
                </UL>
                <P>
                  所有報表都以簡化圖表與進度指標呈現，確保家長與學生都能快速理解。
                </P>
                <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                  <P>
                    <strong>設計重點：</strong>
                  </P>
                  <P>
                    最大挑戰是把複雜的表現數據轉換為可行動的洞察，同時維持情緒支持。透過與視覺語言一致的報表語氣，我們建立了一套透明且鼓勵式的系統，促進家長與學生溝通。
                  </P>
                </div>
                <div className=" mb-10  mx-auto">
                  <H3>徽章收集：以里程碑建立動機</H3>
                  <P>
                    為鼓勵持續投入，我們加入遊戲化的徽章收集系統。學生可透過達成學習里程碑解鎖徽章，例如完成課程、達成每日目標、或調整學習計畫等。
                  </P>

                  <ImageWithHotspots
                    src={screenShot6}
                    alt="badge collection"
                    hotspots={badgeCollectionHotspots}
                  />
                  <P className="mt-6">進度追蹤與解鎖回饋滿足「收集欲」，並強化習慣養成。</P>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <img src={screenShot7} alt="badge 1" className="rounded-sm" />
                    <img src={screenShot8} alt="badge 2" className="rounded-sm" />
                  </div>
                </div>
                <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                  <P>
                    <strong>設計重點：</strong>
                  </P>
                  <P>
                    我們結合可收集物的視覺吸引力與里程碑設計，讓進步變得「可被獎勵」，同時避免過度競爭式的遊戲化。
                  </P>
                </div>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container className="w-full md:w-2/3 mx-auto">
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={24}
                slidesPerView={1}
                className="reflection-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>反思</H2>
                    <P>
                      設計 Mentor 不只是視覺或功能挑戰，更是一段高度協作、跨團隊反覆迭代的過程。回顧設計主管的角色，我整理出三個重要反思：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>1. 讓每個人都在同一個資訊節奏上</H3>
                    <UL>
                      <LI>面對宏大的產品願景與複雜需求，清楚且即時的溝通是推進的關鍵。</LI>
                      <LI>
                        我克服過去「委婉迂迴」的習慣，學會在設計與跨職能討論中更直接清楚地表達，保護團隊並確保進度順暢。
                      </LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. 向市場學習</H3>
                    <UL>
                      <LI>除了使用者研究，我也學會重視來自第一線業務的回饋。</LI>
                      <LI>他們的洞察能讓產品更有競爭力，也避免過度設計師視角的決策。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>3. 支持團隊成長</H3>
                    <UL>
                      <LI>透過 1-on-1 了解每位夥伴的動機與投入狀態。</LI>
                      <LI>在分派任務時兼顧挑戰與成長，並鼓勵善用資源精進技能。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2 id="反思">反思</H2>

              <div>
                <P>
                  設計 Mentor 不只是視覺或功能挑戰，更是一段高度協作、跨團隊反覆迭代的過程。回顧設計主管的角色，我整理出三個重要反思：
                </P>
                <H3>1. 讓每個人都在同一個資訊節奏上</H3>
                <UL>
                  <LI>面對宏大的產品願景與複雜需求，清楚且即時的溝通是推進的關鍵。</LI>
                  <LI>
                    我克服過去「委婉迂迴」的習慣，學會在設計與跨職能討論中更直接清楚地表達，保護團隊並確保進度順暢。
                  </LI>
                </UL>
                <H3>2. 向市場學習</H3>
                <UL>
                  <LI>除了使用者研究，我也學會重視來自第一線業務的回饋。</LI>
                  <LI>他們的洞察能讓產品更有競爭力，也避免過度設計師視角的決策。</LI>
                </UL>
                <H3>3. 支持團隊成長</H3>
                <UL>
                  <LI>透過 1-on-1 了解每位夥伴的動機與投入狀態。</LI>
                  <LI>在分派任務時兼顧挑戰與成長，並鼓勵善用資源精進技能。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* conclusion */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="w-full md:w-2/3 mx-auto flex flex-col items-center justify-center mb-24">
            <P>
              設計 Mentor 不只是塑造介面，更是塑造團隊、故事與對學習的共同信念。一開始我仍偏向「執行者」：專注像素、流程與 UI 精緻度；但隨著產品規模擴大，我逐漸學會用「領導者」視角整合跨職能、賦能夥伴，並守住更大的方向。
            </P>
            <P>
              這些經驗讓我從獨立貢獻者成長為設計主管：更清楚地溝通、在不同角色之間翻譯想法，也更理解交付是一種團隊共同的節奏。最重要的是，我學到好的設計不只是清晰與工藝，更是讓願景、人才與結果對齊。
            </P>
            <img src={mentor} alt="mentor" className="w-24 h-24" />
            <p className="text-h3 font-light">Mentor</p>
            <p className="text-caption text-gray-300">2019/05 - 2024/06</p>
          </Container>
          <hr className="w-full my-8 border-gray-800" />
          <Footer />
        </SectionBlock>
      </main>
    </div>
  )
}

