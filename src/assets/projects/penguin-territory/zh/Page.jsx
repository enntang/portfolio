import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../../../components/utilities/Navbar'
import Footer from '../../../../components/utilities/Footer'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import RelatedProjects from '../../../../components/projects/RelatedProjects'
import TableOfContents from '../../../../components/utilities/TableOfContents'
import LazyImage from '../../../../components/utilities/LazyImage'
import ImageWithHotspots from '../../../../components/utilities/ImageWithHotspots'
import quote from '../../../../../public/icon-quote.svg'

gsap.registerPlugin(ScrollTrigger)

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

import arrowDown from '../../../../../public/icon-arrow-down.svg'
import iconLink from '../../../../../public/icon-link.svg'
import bgPenguin from '../../../../../public/bg-penguin.png'

// Images from markdown: src/assets/projects/penguin-territory/image/*
import thumb from '../image/penguin-territory-thumb-4x3.png'
import designGoal1 from '../image/penguin-territory-Untitled.png'
import designGoal2 from '../image/penguin-territory-Untitled 1.png'
import designGoal3 from '../image/penguin-territory-Untitled 2.png'
import miro from '../image/penguin-territory-miro.png'
import wireframe from '../image/penguin-territory-wireframe2.png'
import wireframeNoText1 from '../image/penguin-territory-wireframe-notext-1.jpg'
import wireframeNoText2 from '../image/penguin-territory-wireframe-notext-2.jpg'
import loginImg from '../image/penguin-territory-login.png'
import roomListImg from '../image/penguin-territory-room-list.png'
import roomWaitingImg from '../image/penguin-territory-room-waiting-not-ready.png'
import turn01 from '../image/penguin-territory-turn-self-01.png'
import turn02 from '../image/penguin-territory-turn-self-02.png'
import turn04 from '../image/penguin-territory-turn-self-04.png'
import tips1 from '../image/penguin-territory-tips-1.png'
import tips2 from '../image/penguin-territory-tips-2.png'
import tips3 from '../image/penguin-territory-tips-3.png'
import resultImg from '../image/penguin-territory-result.png'
import addRoomImg from '../image/penguin-territory-add-room.png'
import logoutPopupImg from '../image/penguin-territory-logout-popup.png'
import watercolorOriginal from '../image/penguin-territory-watercolor-original.jpg'
import bg1 from '../image/penguin-territory-bg-1.png'
import bg2 from '../image/penguin-territory-bg-2.png'
import penguin1 from '../image/penguin-territory-penguin-1.png'
import penguin2 from '../image/penguin-territory-penguin-2.png'
import penguin3 from '../image/penguin-territory-penguin-3.png'
import projectListIcon from '../image/penguin-territory-projectList-icon-penguin.png'

const penguinBackgrounds = {
  penguin: bgPenguin,
  penguinBg1: bg1,
  penguinBg2: bg2,
}

export default function PenguinTerritoryPageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })
  const penguin1Ref = useRef(null)
  const penguin3Ref = useRef(null)

  // Hotspot modules (one per screen)
  // Coordinates are in percentage relative to image width/height and can be fine-tuned visually in the browser.
  const loginHotspots = [
    {
      id: 'point1',
      x: 60,
      y: 20,
      content: '用雪堆與冰塊的意象製作面板。',
      arrowPosition: 'bottom',
    },
  ]

  const roomListHotspots = [
    {
      id: 'point1',
      x: 90,
      y: 8,
      content: '將登出按鈕安排在大眾已習慣的右上角。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 90,
      y: 90,
      content: '右下角可開關背景音樂。',
      arrowPosition: 'top',
    },
    {
      id: 'point3',
      x: 50,
      y: 50,
      content: '房間列表縱向捲動，不同狀態區別化顯示：開放中的房間可隨時加入；滿員的房間會顯示「即將開始」並且禁止進入。',
      arrowPosition: 'top',
    },
  ]
  const turnHotspots1 = [
    {
      id: 'point1',
      x: 12,
      y: 12,
      content: '側邊欄顯示輪到哪位玩家，顏色與六角形冰塊一致，方便對應查看戰況。',
      arrowPosition: 'bottom',
    },
  ]
  const turnHotspots2 = [
    {
      id: 'point1',
      x: 42,
      y: 82,
      content: '當玩家確認放置的行動後，出現按鈕提醒下一步行動。',
      arrowPosition: 'bottom',
    },
  ]

  const waitingHotspots = [
    {
      id: 'point1',
      x: 40,
      y: 30,
      content: '左右滑動選擇喜歡的代表企鵝，UI 利用大小和透明度營造遠近感。',
      arrowPosition: 'bottom',
    },
    
  ]

  const resultHotspots = [
    {
      id: 'point1',
      x: 20,
      y: 20,
      content: '最高分的勝利者會在最大的欄位閃耀光芒。',
      arrowPosition: 'bottom',
    },
   
  ]


  useEffect(() => {
    // Animate penguin1 from right to left
    gsap.fromTo(
      penguin1Ref.current,
      {
        x: 300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: penguin1Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )

    // Animate penguin3 from left to right
    gsap.fromTo(
      penguin3Ref.current,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: penguin3Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
  }, [])

  useEffect(() => {
    // Load Instagram embed script if not already loaded
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]')

    if (existingScript) {
      // Script already exists, just process embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
      return
    }

    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
    document.body.appendChild(script)
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
        <header className="relative overflow-hidden">
          <SectionBlock
            bgVariant="penguinBg1"
            className="relative"
            backgrounds={penguinBackgrounds}
            textDarkOnBg
          >
            <TableOfContents />
            <Container className="flex flex-col items-center justify-center text-center">

              <h1 className="mt-10  text-large mobile:text-large-mobile">企鵝搶地</h1>
              <H3 className="mb-16">回合制策略網頁遊戲｜UI/UX、插畫、視覺設計</H3>

              <img
                ref={arrowDownRef}
                src={arrowDown}
                alt="往下捲動"
                className="w-6 h-6 rounded-lg"
              />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock>
          <Container>
            <H2>專案簡介</H2>

            <TwoColumn>
              <div>
                <P>
                  這是一個 side project，我與一位前端工程師、一位後端工程師協作完成。
                </P>
                <P>
                  由於遊戲進行中有相當多資訊（地圖上的企鵝數量、玩家動作順序、最新戰況顯示等），如何妥善引導與清楚呈現，是 UI 設計的核心挑戰。
                </P>
                <P className="text-caption text-gray-500 font-light">
                  目標使用者：網頁桌遊玩家（習慣在桌機/筆電操作遊戲，且有連線對戰需求）
                </P>
                <div ref={penguin1Ref} className="w-48 h-auto self-end mb-4 absolute bottom-20 right-0">
                  <LazyImage src={penguin1} alt="" className="w-full h-auto -scale-x-100 rounded-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-2">

                <p className="text-h3">角色</p>
                <P>UI/UX Designer</P>
                <p className="text-h3">時程</p>
                <P>Aug 2024 - Dec 2024</P>
                <p className="text-h3">工具</p>
                <P>
                  Gouache / Watercolor
                  <br />
                  Figma
                  <br />
                  Procreate
                </P>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Design Goals */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>

            <H2>設計目標</H2>
            <div ref={penguin3Ref} className="w-48 h-auto self-end mb-4 absolute top-[-60px] left-0">
              <LazyImage src={penguin3} alt="" className="w-full h-auto -scale-x-100 rounded-lg" />
            </div>
            <div className="bg-white/60 backdrop-blur rounded-sm shadow p-6 md:p-8">
            <img src={quote} alt="quote" className='mb-2 rounded-lg' />
              <p>
                我們的目標很單純：創造具有視覺吸引力、且易於遊玩的線上桌遊。
              </p>

            </div>

            <P className="mt-8">開發者團隊最初已有可遊玩的雛形，但在 UI 介面上仍有優化空間：</P>
            <UL>
              <LI>整體美術風格不明，字體與按鈕層級需要梳理</LI>
              <LI>缺乏從登入到遊戲房間的 Onboarding 流程設計</LI>
            </UL>
            <div className="mt-8">
              <div className="relative flex flex-row mt-10 items-start">


                {/* Old version 2 with hover to new version */}
                <div className="relative group cursor-pointer transform -rotate-3 w-[640px] ">
                  <div className="relative overflow-hidden rounded-lg shadow aspect-[17/10]">
                    {/* Old version image */}
                    <div className="relative transition-opacity duration-300 group-hover:opacity-0 w-full h-full">
                      <LazyImage src={designGoal2} alt="早期介面截圖 2" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* New version image (shown on hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <LazyImage src={turn02} alt="新版介面截圖 2" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* OLD watermark overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className=" text-white/60 select-none">新舊對照：遊戲進行中畫面</span>
                    </div>
                  </div>
                </div>

                {/* Old version 3 with hover to new version */}
                <div className="relative group cursor-pointer transform rotate-3 w-[600px] ml-[-120px] mt-32">
                  <div className="relative overflow-hidden rounded-lg shadow aspect-[16:10]">
                    {/* Old version image */}
                    <div className="relative transition-opacity duration-300 group-hover:opacity-0 w-full h-full">
                      <LazyImage src={designGoal3} alt="早期介面截圖 3" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* New version image (shown on hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <LazyImage src={resultImg} alt="新版介面截圖 3" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* OLD watermark overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className="text-white/60 select-none">新舊對照：分數結算</span>
                    </div>
                  </div>
                </div>
              </div></div>
          </Container>
        </SectionBlock>

        {/* Collaboration artifacts */}
        <SectionBlock>
          <Container>
            <H2>流程與協作</H2>
            <P>
              我透過 wireframe 進行整體 layout 佈局調整，詳列所有遊戲進行中的狀態變化，並在 Miro 線上白板交換想法。
            </P>
            <LazyImage src={miro} alt="Miro 線上白板" className="w-full h-auto rounded-lg shadow mb-4" />
              <LazyImage src={wireframe} alt="Wireframe" className="w-full h-auto rounded-lg shadow" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LazyImage src={wireframeNoText1} alt="Wireframe（無文字）1" className="w-full h-auto rounded-lg shadow" />
              <LazyImage src={wireframeNoText2} alt="Wireframe（無文字）2" className="w-full h-auto rounded-lg shadow" />
            </div>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>
            <H2>設計產出</H2>

            <H3>清楚的 onboarding 流程</H3>
            <P>可選擇登入玩家帳號，或是以訪客身份進行遊玩。</P>
            <P>登入遊戲後的流程相當單純：使玩家進入等待序列 → 選企鵝 → 房間等待。</P>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <ImageWithHotspots src={loginImg} alt="登入畫面" hotspots={loginHotspots} className="w-full h-auto rounded-lg shadow" />
              <ImageWithHotspots src={roomListImg} alt="房間列表" hotspots={roomListHotspots} className="w-full h-auto rounded-lg shadow" />
              <ImageWithHotspots src={roomWaitingImg} hotspots={waitingHotspots} alt="房間等待：玩家本人尚未準備好" className="w-full h-auto rounded-lg shadow" />
            </div>
            <P className="mt-6">
              房間列表縱向捲動，不同狀態區別化顯示：開放中的房間可隨時加入；滿員的房間會顯示「即將開始」並且禁止進入。
              介面採用符合使用習慣的四角佈局：右上方為登出按鈕，右下角可開關背景音樂。
            </P>

            <div className="mt-16">
              <H3>核心互動流程：遊戲開始</H3>
              <P>玩家輪流在地圖外圈放置第一隻企鵝。遊戲以回合制進行，每一輪只有一個玩家的企鵝可以動作。</P>
              <P>規劃 UI 時，我採用的設計原則是：給玩家清楚的動作提示與反饋。實際方式如下：</P>
              <UL>
                <LI>六角格以不同色塊區隔，使目標格易辨識</LI>
                <LI>光暈＋箭頭提示現在可以放在哪裡</LI>
                <LI>Hover 顯示預覽位置</LI>
              </UL>
              <P>
                玩家確認動作結束後自動輪下一位玩家行動。當輪到該位玩家的時候，出現蓋版訊息，避免玩家忽略狀態、導致整體遊戲時間延宕。
              </P>
              <div className="grid grid-cols-1 gap-4 mt-8">
                <ImageWithHotspots src={turn01} alt="輪到玩家本人 01" className="w-full h-auto rounded-lg shadow" />
                <ImageWithHotspots src={turn02} alt="輪到玩家本人 02" hotspots={turnHotspots1} className="w-full h-auto rounded-lg shadow" />
                <ImageWithHotspots src={turn04} alt="輪到玩家本人 04" hotspots={turnHotspots2} className="w-full h-auto rounded-lg shadow" />
              </div>
              <P className="mt-6">
                我在設計上利用側邊欄顯示戰況，畫面左右分別是玩家順序和即時計分。分配時，來源與目的的「數字」是重要資訊，所以以黑色底襯托。
              </P>
            </div>

            <div className="mt-16">
              <H3>清楚的規則說明</H3>
              <P>遊戲過程中可隨時查看規則說明，每頁搭配簡化插圖，避免文字過長。</P>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <LazyImage src={tips1} alt="規則說明 1" className=" -rotate-3 w-full h-auto rounded-lg shadow" />
                <LazyImage src={tips2} alt="規則說明 2" className=" rotate-3 w-full h-auto rounded-lg shadow" />
                <LazyImage src={tips3} alt="規則說明 3" className=" -rotate-3 w-full h-auto rounded-lg shadow" />
              </div>
            </div>

            <div className="mt-16">
              <H3>讓勝利者具有成就感的結算畫面</H3>
              <P>
                當勝利條件達成時，遊戲結束並顯示結算畫面。最高分的勝利者會在最大的欄位閃耀光芒，其餘玩家的分數也會一並顯示在面板上、依序排名。
              </P>
              <ImageWithHotspots src={resultImg} alt="結算畫面" hotspots={resultHotspots} className="w-full h-auto rounded-lg shadow mt-8" />
            </div>
          </Container>
        </SectionBlock>

        {/* Visual Design */}
        <SectionBlock>
          <Container>
            <H2>視覺設計</H2>
            <P>
              整體使用冰原、海水為主的清爽配色，並且用手繪風格增加親切感。在介面上採用大量圓角、柔和陰影，營造友善輕鬆的遊戲氛圍。
            </P>

            <LazyImage src={addRoomImg} alt="新增房間" className="w-full h-auto rounded-lg shadow mb-10" />
            <LazyImage src={logoutPopupImg} alt="確認登出 popup" className="w-full h-auto rounded-lg shadow" />

            <P className="mt-10">
              企鵝插圖穿插在 UI 狀態與操作提示上，形成一致的風格增加遊玩沈浸感。為了讓視覺更具有故事感，企鵝美術以手繪完成，
              媒材主要是不透明水彩：紙上作畫後，拍照掃描進電腦後製完成。
            </P>
            <LazyImage
              src={watercolorOriginal}
              alt="使用不透明水彩繪製的原稿"
              className="w-full h-auto rounded-lg shadow mt-8"
            />
            <p className="text-caption text-gray-500 font-light mt-3">使用不透明水彩繪製的原稿</p>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container className="w-full">
            <TwoColumn>
              <div>
               
                <H2>反思</H2>
                <P>
                  在這個專案，我用 UI 元素簡化複雜規則，利用顏色、對比與動畫去做視覺階層，讓玩家在短時間內理解遊戲機制。
                  遊戲與 App 不同，<strong>動作回饋（Feedback）</strong> 對理解難度影響極大。
                </P>
                <P>如何在不干擾視覺的條件下給予「下一步提示」，是一個很大的挑戰。</P>
                <LazyImage src={penguin2} alt="" className="w-60 h-auto -scale-x-100 rounded-lg" />
                <P>
                  另外，我發揮了個人的多媒材風格，插畫與 UI 的融合讓產品更具吸引力，獲得了不錯的使用回饋。
                  在專案告一段落後，也用短影片把過程記錄了下來，歡迎點擊觀看。
                </P>
              </div>
              <div>
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: 'calc(100% - 2px)' }}
                >
                  <div style={{ padding: '16px' }}>
                    <a
                      href="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                      style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                        </div>
                      </div>
                      <div style={{ padding: '19% 0' }}></div>
                      <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                        <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                              <g>
                                <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div style={{ paddingTop: '8px' }}>
                        <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div>
                      </div>
                      <div style={{ padding: '12.5% 0' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                        <div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                        </div>
                        <div style={{ marginLeft: '8px' }}>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                          <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <div style={{ width: 0, borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                          <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                      </div>
                    </a>
                    <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a
                        href="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                        style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        A post shared by Enn Tang｜愛畫畫的 UX 設計師 (@enntang)
                      </a>
                    </p>
                  </div>
                </blockquote>
              </div>
            </TwoColumn>

            <div className="flex flex-col items-center justify-center mt-16">
              <img src={projectListIcon} alt="" className="w-14 h-14 mb-3 object-contain rounded-lg" />
              <p className="text-h3 font-light">企鵝搶地</p>
              <p className="text-caption">2024</p>
            </div>
          </Container>

          <RelatedProjects />

          <hr className="w-full my-8 border-white/20" />
          <Footer />
        </SectionBlock>
      </main>
    </div>
  )
}

