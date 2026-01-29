import { useState } from 'react'
import Navbar from '../../../../components/utilities/Navbar'
import Footer from '../../../../components/utilities/Footer'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import RelatedProjects from '../../../../components/projects/RelatedProjects'
import TableOfContents from '../../../../components/utilities/TableOfContents'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

// Images referenced by src/assets/projects/chivalry/chivalry.md
import coverTransparent from '../image/chivalry-cover-transparent.png'
import designConceptBoard from '../image/chivalry-design-concept-board.jpg'
import designConceptMockup from '../image/chivalry-design-concept-mockup.jpg'
import attributeCards from '../image/chivalry-attribute-cards.png'
import attributeHandMockup from '../image/chivalry-attribute-card-hand.png'
import backgroundImage from '../image/chivalry-background-rulebook.png'
import chivalryCards1 from '../image/chivalry-virtue-cards-1.jpg'
import chivalryCards2 from '../image/chivalry-virtue-cards-2.jpg'
import playerBoards1 from '../image/chivalry-player-boards-1.png'
import playerBoards2 from '../image/chivalry-player-boards-2.png'
import scoringBoard from '../image/chivalry-scoring-board.png'
import packaging from '../image/chivalry-packaging.jpg'

const PAGE_BG = '#420C22'
const PAGE_BG_ALT = '#2E0817'

const sectionStyle = { backgroundColor: PAGE_BG }
const sectionStyleAlt = { backgroundColor: PAGE_BG_ALT }

export default function ChivalryPageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAGE_BG }}>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant="arrow"
      />

      <main style={{ backgroundColor: PAGE_BG }}>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <SectionBlock className="relative text-white" style={sectionStyle}>
            <TableOfContents />
            {/* Background image overlay */}
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-10"
              loading="lazy"
            />
            {/* Dark tint to keep background subtle */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0"
              style={{ backgroundColor: PAGE_BG, opacity: 0.72 }}
            />
            <Container className="relative z-10 flex flex-col items-center justify-center text-center">
              <h1 className="mt-10 text-large mobile:text-large-mobile hidden">騎士精神</h1>


              <div className="w-full max-w-[720px]">
                <img
                  src={coverTransparent}
                  alt="《騎士精神》專案封面"
                  className="w-full h-auto rounded-2xl shadow-sm"
                  loading="lazy"
                />
              </div>
              <H3 className="text-white/90">桌上遊戲設計｜插畫、視覺設計｜2017</H3>
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock className="text-white" style={sectionStyleAlt}>
          <Container>
            <H2>專案簡介</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  <em>Chivalry（騎士精神）</em>是一款以中世紀為靈感的桌上遊戲。玩家扮演尚未受封的見習騎士，
                  透過完成任務、累積美德，為家族贏得榮耀。遊戲機制以騎士精神的核心價值——力量、智慧、魅力——
                  為骨架，並以符號與材質語彙把概念轉化成一致的沉浸式世界觀。
                </P>
                <P>
                  我主要負責建立<strong>視覺識別系統</strong>，包含圖像符號、字體設定與卡牌插畫。
                  目標是讓玩家在第一眼就感受到「騎士精神」的氛圍與秩序。
                </P>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">角色</p>
                <P className="text-white/90 mb-6">平面設計師</P>

                <p className="text-h3 mb-2">時程</p>
                <P className="text-white/90 mb-6">2017</P>

                <p className="text-h3 mb-2">工具</p>
                <UL>
                  <LI>Adobe Photoshop</LI>
                  <LI>Adobe Illustrator</LI>
                </UL>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Design Concept */}
        <SectionBlock className="text-white" style={sectionStyle}>
          <Container>
            <H2>設計概念</H2>

            <P>
              為了呈現貴族氣質，並在寫實與幻想之間取得平衡，我選擇以<strong>低飽和的磚紅色</strong>為主調，
              搭配金屬漸層與壓紋質感。
            </P>
            <P>
              偏霧的色調帶有舊羊皮紙的溫度，同時讓整體氛圍更沉穩。
            </P>
            <P>
              金屬點綴與壓紋細節則提供低調的尊榮感，呼應盔甲的光澤與中世紀工藝的觸感。
            </P>
            <P>
              這套色彩方向延伸到玩家面板與規則書：從用色區分五大家族的計分區，到統一版式語言的說明排版，
              讓所有零件都屬於同一個世界。
            </P>

            <div className="mt-10 space-y-6">
              <img
                src={designConceptBoard}
                alt="設計概念：版面與色彩方向"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={designConceptMockup}
                alt="設計概念：整體視覺呈現"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <P className="mt-10">
              最終呈現出一個一致的世界觀：卡牌、圖標，甚至規則頁面，都像同屬於同一個騎士團。
            </P>
          </Container>
        </SectionBlock>

        {/* Visual System */}
        <SectionBlock className="text-white" style={sectionStyleAlt}>
          <Container>
            <H2>視覺系統</H2>

            <H3>字體設計</H3>
            <div className="mt-8">
              <img
                src={coverTransparent}
                alt="《騎士精神》標誌字體設計"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              標誌字以哥德書法為靈感——結構嚴謹卻不失優雅。
            </P>
            <P>
              在字形中融入劍的意象，並以壓紋高光強化立體感，使字體同時具備裝飾與敘事功能，
              象徵「騎士的準則」。
            </P>

            <H3>屬性卡</H3>
            <P>
              三項核心能力——<strong>力量、智慧、魅力</strong>——各自以一個象徵圖案呈現：
            </P>
            <UL>
              <LI>
                <strong>劍</strong>：力量與勇氣
              </LI>
              <LI>
                <strong>書</strong>：智慧與策略
              </LI>
              <LI>
                <strong>玫瑰</strong>：魅力與同理
              </LI>
            </UL>
            <div className="mt-8 space-y-6">
              <img
                src={attributeCards}
                alt="屬性卡：力量／智慧／魅力"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={attributeHandMockup}
                alt="屬性卡：手持情境 mockup"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              盾形框架把三張屬性卡統一在同一套家族紋章語彙之下，讓卡牌在對局與收集上都更有秩序感。
            </P>

            <H3>美德卡</H3>
            <P>通往勝利的道路由八項美德構成。</P>
            <P>
              每項美德都搭配獨立的圖示與配色，讓玩家在對局中能快速辨識屬性。
            </P>
            <P>
              圖示遵循一致的幾何節奏，呼應中世紀旗幟上的紋章語彙。
            </P>
            <div className="mt-8 space-y-6">
              <img
                src={chivalryCards1}
                alt="美德卡：圖示系統"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={chivalryCards2}
                alt="美德卡：卡面版式"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <H3>玩家面板</H3>
            <P>
              五大家族各以獨立的<strong>家徽與代表色</strong>呈現；在維持一致版面網格（放置卡牌與骰子）的前提下，
              建立清楚且可收集的家族識別。
            </P>
            <div className="mt-8 space-y-6">
              <img
                src={playerBoards1}
                alt="Player boards：家族徽章與配色"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={playerBoards2}
                alt="Player boards：版面配置"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <H3>計分板</H3>
            <TwoColumn className="items-start mt-8">
              <div>
                <img
                  src={scoringBoard}
                  alt="Scoring board：得分版"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div>
                <P>
                  計分板用來追蹤每位騎士在對局中的成長。
                </P>
                <P>
                  玩家透過完成任務與實踐美德累積分數，推進指示物向上。
                </P>
                <P>
                  分數越高，騎士的階級也隨之晉升——在視覺與象徵層面，逐步靠近真正的「騎士精神」。
                </P>
              </div>
            </TwoColumn>

            <H3>包裝設計</H3>
            <div className="mt-8">
              <img
                src={packaging}
                alt="包裝設計：外盒設計"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              外盒延續<strong>磚紅主色與盾形壓紋</strong>，讓卡牌到包裝之間形成一致且可觸摸的品牌連續性。
            </P>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock className="text-white" style={sectionStyle}>
          <Container>
            <H2>反思</H2>
            <P>
              為了維持視覺一致性，我在專案初期就先盤點所有零件，將配色與材質當作同一套系統規劃。
            </P>
            <P>
              要重現中世紀風格，我大量蒐集手稿與紋章參考，理解其結構與精神，再以更乾淨、現代的方式重新詮釋。
            </P>
            <P>
              最後我更確信：研究、整理與把細節串成整體，是不能省略的基本功。
            </P>
          </Container>
        </SectionBlock>

        <RelatedProjects />

        <div className="pt-6 pb-12" style={sectionStyle}>
          <Footer className="text-white/60" />
        </div>
      </main>
    </div>
  )
}

