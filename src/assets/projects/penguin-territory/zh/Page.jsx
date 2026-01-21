import { useState } from 'react'
import Navbar from '../../../../components/utilities/Navbar'
import Footer from '../../../../components/utilities/Footer'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import TableOfContents from '../../../../components/utilities/TableOfContents'
import LazyImage from '../../../../components/utilities/LazyImage'

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
              <P className="w-full md:w-2/3">
                「企鵝搶地」是一款回合制策略遊戲。玩家操控企鵝在六角格冰原上移動、分裂、佔領區域，直到所有玩家皆無法再移動為止。
                我在既有可遊玩雛形之上，負責梳理介面層級、Onboarding 與視覺風格，讓資訊密度高的遊戲流程更清楚、好上手。
              </P>
              <img
                ref={arrowDownRef}
                src={arrowDown}
                alt="往下捲動"
                className="w-6 h-6 "
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
        <SectionBlock bgVariant="penguin" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>
            <H2>設計目標</H2>

            <div className="bg-white/10 backdrop-blur rounded-sm shadow p-6 md:p-8">
              <P className="pb-0">
                <strong>💡 我們的目標很單純：</strong>創造具有視覺吸引力、且易於遊玩的線上桌遊。
              </P>
            </div>

            <P className="mt-8">開發者團隊最初已有可遊玩的雛形，但在 UI 介面上仍有優化空間：</P>
            <UL>
              <LI>整體美術風格不明，字體與按鈕層級需要梳理</LI>
              <LI>缺乏從登入到遊戲房間的 Onboarding 流程設計</LI>
            </UL>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              <LazyImage src={designGoal1} alt="早期介面截圖 1" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={designGoal2} alt="早期介面截圖 2" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={designGoal3} alt="早期介面截圖 3" className="w-full h-auto rounded-sm shadow" />
            </div>
          </Container>
        </SectionBlock>

        {/* Collaboration artifacts */}
        <SectionBlock>
          <Container>
            <H2>流程與協作</H2>
            <P>
              我透過 wireframe 進行整體 layout 佈局調整，詳列所有遊戲進行中的狀態變化，並在 Miro 線上白板交換想法。
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <LazyImage src={miro} alt="Miro 線上白板" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={wireframe} alt="Wireframe" className="w-full h-auto rounded-sm shadow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LazyImage src={wireframeNoText1} alt="Wireframe（無文字）1" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={wireframeNoText2} alt="Wireframe（無文字）2" className="w-full h-auto rounded-sm shadow" />
            </div>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock bgVariant="penguin" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>
            <H2>設計產出</H2>

            <H3>清楚的 onboarding 流程</H3>
            <P>可選擇登入玩家帳號，或是以訪客身份進行遊玩。</P>
            <P>登入遊戲後的流程相當單純：使玩家進入等待序列 → 選企鵝 → 房間等待。</P>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <LazyImage src={loginImg} alt="登入畫面" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={roomListImg} alt="房間列表" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={roomWaitingImg} alt="房間等待：玩家本人尚未準備好" className="w-full h-auto rounded-sm shadow" />
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
                <LazyImage src={turn01} alt="輪到玩家本人 01" className="w-full h-auto rounded-sm shadow" />
                <LazyImage src={turn02} alt="輪到玩家本人 02" className="w-full h-auto rounded-sm shadow" />
                <LazyImage src={turn04} alt="輪到玩家本人 04" className="w-full h-auto rounded-sm shadow" />
              </div>
              <P className="mt-6">
                我在設計上利用側邊欄顯示戰況，畫面左右分別是玩家順序和即時計分。分配時，來源與目的的「數字」是重要資訊，所以以黑色底襯托。
              </P>
            </div>

            <div className="mt-16">
              <H3>清楚的規則說明</H3>
              <P>遊戲過程中可隨時查看規則說明，每頁搭配簡化插圖，避免文字過長。</P>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <LazyImage src={tips1} alt="規則說明 1" className="w-full h-auto rounded-sm shadow" />
                <LazyImage src={tips2} alt="規則說明 2" className="w-full h-auto rounded-sm shadow" />
                <LazyImage src={tips3} alt="規則說明 3" className="w-full h-auto rounded-sm shadow" />
              </div>
            </div>

            <div className="mt-16">
              <H3>讓勝利者具有成就感的結算畫面</H3>
              <P>
                當勝利條件達成時，遊戲結束並顯示結算畫面。最高分的勝利者會在最大的欄位閃耀光芒，其餘玩家的分數也會一並顯示在面板上、依序排名。
              </P>
              <LazyImage src={resultImg} alt="結算畫面" className="w-full h-auto rounded-sm shadow mt-8" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <LazyImage src={addRoomImg} alt="新增房間" className="w-full h-auto rounded-sm shadow" />
              <LazyImage src={logoutPopupImg} alt="確認登出 popup" className="w-full h-auto rounded-sm shadow" />
            </div>
            <P className="mt-10">
              企鵝插圖穿插在 UI 狀態與操作提示上，形成一致的風格增加遊玩沈浸感。為了讓視覺更具有故事感，企鵝美術以手繪完成，
              媒材主要是不透明水彩：紙上作畫後，拍照掃描進電腦後製完成。
            </P>
            <LazyImage
              src={watercolorOriginal}
              alt="使用不透明水彩繪製的原稿"
              className="w-full h-auto rounded-sm shadow mt-8"
            />
            <p className="text-caption text-gray-500 font-light mt-3">使用不透明水彩繪製的原稿</p>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock bgVariant="penguin" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container className="w-full md:w-2/3 mx-auto">
            <H2>反思</H2>
            <P>
              在這個專案，我用 UI 元素簡化複雜規則，利用顏色、對比與動畫去做視覺階層，讓玩家在短時間內理解遊戲機制。
              遊戲與 App 不同，<strong>動作回饋（Feedback）</strong> 對理解難度影響極大。
            </P>
            <P>如何在不干擾視覺的條件下給予「下一步提示」，是一個很大的挑戰。</P>
            <P>
              另外，我發揮了個人的多媒材風格，插畫與 UI 的融合讓產品更具吸引力，獲得了不錯的使用回饋。
              在專案告一段落後，也用短影片把過程記錄了下來，歡迎點擊觀看。
            </P>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <a
                href="https://www.instagram.com/reel/DQ0eWAQgVW8/"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition-colors rounded-sm px-5 py-4 w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={iconLink} alt="" className="w-5 h-5" />
                <span className="text-sm">Instagram Reel：專案過程短影片</span>
              </a>
              <a
                href="https://www.instagram.com/p/DQ0eWAQgVW8/"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 transition-colors rounded-sm px-5 py-4 w-fit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={iconLink} alt="" className="w-5 h-5" />
                <span className="text-sm">Instagram Post：企鵝搶地</span>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center mt-16">
              <img src={projectListIcon} alt="" className="w-14 h-14 mb-3 object-contain" />
              <p className="text-h3 font-light">企鵝搶地</p>
              <p className="text-caption text-gray-200">Aug 2024 - Dec 2024</p>
            </div>
          </Container>
          <hr className="w-full my-8 border-white/20" />
          <Footer />
        </SectionBlock>
      </main>
    </div>
  )
}

