import { useState } from 'react'
import Navbar from '../../../../components/utilities/Navbar'
import ScrollHint from '../../../../components/utilities/ScrollHint'
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
import FadeIn from '../../../../components/utilities/FadeIn'
import { useHeroIntro } from '../useHeroIntro'

// Images referenced by src/assets/projects/chivalry/chivalry.md
import coverTransparent from '../image/chivalry-cover-transparent.png'
import designConceptBoard from '../image/chivalry-design-concept-board.jpg'
import designConceptMockup from '../image/chivalry-design-concept-mockup.jpg'
import attributeCards from '../image/chivalry-attribute-cards.png'
import attributeHandMockup from '../image/chivalry-attribute-card-hand.png'
import backgroundImage from '../image/chivalry-background-rulebook.png'
import chivalryCards1 from '../image/chivalry-virtue-cards-1.png'
import chivalryCards2 from '../image/chivalry-virtue-cards-2.jpg'
import playerBoards1 from '../image/chivalry-player-boards-1.png'
import playerBoards2 from '../image/chivalry-player-boards-2.png'
import scoringBoard from '../image/chivalry-scoring-board.png'
import packaging from '../image/chivalry-packaging.jpg'

const PAGE_BG = '#420C22'
const PAGE_BG_ALT = '#2E0817'

const PAGE_TEXT = '#DFD6BC'

const sectionStyle = { backgroundColor: PAGE_BG, color: PAGE_TEXT }
const sectionStyleAlt = { backgroundColor: PAGE_BG_ALT, color: PAGE_TEXT }

// Full-bleed bands: SectionBlock renders these as fixed-attachment backgrounds
// (and falls back to a scrolling tile on iOS, which does not support fixed).
const chivalryBackgrounds = {
  rulebook: designConceptBoard,
  virtueCards: chivalryCards2,
  packaging: packaging,
}

const BAND = '!py-0 h-[70vh] mobile:h-[50vh]'
// Bands that carry content keep their padding and grow with it.
const BAND_TEXT = 'min-h-[70vh] mobile:min-h-[50vh] flex items-end !pb-12 mobile:!pb-16'

export default function ChivalryPageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { backgroundStyle, tintStyle, contentStyle, toggle, revealed } = useHeroIntro(PAGE_BG)

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
          <SectionBlock className="relative" style={sectionStyle}>
            <TableOfContents />
            {/* Background image overlay — 進場時單獨顯示，之後降回低透明度 */}
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
              style={backgroundStyle}
              loading="eager"
            />
            {/* Dark tint to keep background subtle */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0"
              style={tintStyle}
            />
            {/* 點擊切換遮罩與主視覺；用 button 才有鍵盤與螢幕閱讀器支援 */}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={revealed}
              aria-label="顯示或隱藏遮罩與主視覺"
              className="absolute inset-0 z-20 cursor-pointer"
            />
            <div className="relative z-10" style={contentStyle}>
              <Container className="flex flex-col items-center justify-center text-center">
                <h1 className="mt-10 text-large mobile:text-large-mobile hidden">騎士精神</h1>

                <div className="w-full max-w-[720px]">
                  <img
                    src={coverTransparent}
                    alt="《騎士精神》專案封面"
                    className="w-full h-auto rounded-2xl shadow-sm"
                    loading="eager"
                  />
                </div>
                <H3 className="text-[#DFD6BC]/90">桌上遊戲設計｜插畫、視覺設計｜2017</H3>
                <ScrollHint className="mt-6 text-[#DFD6BC]" label="往下捲動" />
              </Container>
            </div>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H2>專案簡介</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  <em>Chivalry（騎士精神）</em>是一款以中世紀為靈感的桌上遊戲。玩家扮演尚未受封的見習騎士，透過完成任務、累積美德，為家族贏得榮耀。遊戲機制以騎士精神的核心價值——力量、智慧、魅力——為骨架，並以符號與材質語彙把概念轉化成一致的沉浸式世界觀。
                </P>
                <P>
                  我主要負責建立<strong>視覺識別系統</strong>，包含圖像符號、字體設定與卡牌插畫。目標是讓玩家在第一眼就感受到「騎士精神」的氛圍與秩序。
                </P>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">角色</p>
                <P className="text-[#DFD6BC]/90 mb-6">平面設計師</P>

                <p className="text-h3 mb-2">時程</p>
                <P className="text-[#DFD6BC]/90 mb-6">2017</P>

                <p className="text-h3 mb-2">工具</p>
                <UL>
                  <LI>Adobe Photoshop</LI>
                  <LI>Adobe Illustrator</LI>
                </UL>
              </div>
            </TwoColumn>
          </Container>
        </FadeIn>
        </SectionBlock>

        {/* Design Concept */}
        <SectionBlock style={sectionStyle}>
        <FadeIn>
          <Container>
            <H2>設計概念</H2>

            <P>
              我以<strong>低飽和磚紅色</strong>為主調，搭配金屬漸層與壓紋質感，營造沉穩而低調的尊榮感。
            </P>
            <P>
              這套視覺語言延伸至玩家面板與規則書，透過家族配色與統一版式，讓卡牌、圖標與規則頁面皆維持一致的世界觀。
            </P>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* 規則書滿版（fixed 背景） */}
        <SectionBlock
          className={BAND}
          bgVariant="rulebook"
          backgrounds={chivalryBackgrounds}
          role="img"
          aria-label="設計概念：版面與色彩方向"
        />

        <SectionBlock style={sectionStyle}>
        <FadeIn>
          <Container>
            <P>
              採用騎士的剪影設計玩家代表物（Token），提供移動位置的標示。
            </P>

            <div className="mt-8">
              <img
                src={designConceptMockup}
                alt="設計概念：騎士剪影的玩家代表物"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
          </Container>
        </FadeIn>
        </SectionBlock>

        {/* Visual System */}
        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
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
              使用能表現中世紀風格的歌德字體，加以浮雕光影，營造架空世界的奇幻氛圍。<br />
              貫穿字體的長劍則點出「騎士」的核心意象。
            </P>

            <H3>能力卡</H3>
            <div className="mt-8 space-y-6">
              <img
                src={attributeCards}
                alt="能力卡：力量／智慧／魅力"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={attributeHandMockup}
                alt="能力卡：手持情境 mockup"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              優秀騎士的三項關鍵能力：力量、智慧與魅力，分別用長劍、典籍與玫瑰來作為代表，並以盾牌的紋飾來營造整體感。
            </P>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* 卡面版式滿版（fixed 背景），騎士精神卡整段疊在圖上 */}
        <SectionBlock
          className={BAND_TEXT}
          bgVariant="virtueCards"
          backgrounds={chivalryBackgrounds}
        >
          {/* Sits against the band's left edge, not the centred content column */}
          <div className="w-full px-16 mobile:px-8">
            <FadeIn>
              <div className="w-1/2 mobile:w-full rounded-sm text-[#DFD6BC] bg-[#2E0817]/80 backdrop-blur-sm shadow p-8 mobile:p-6">
                <H3 className="!mt-0">騎士精神卡</H3>
                <div className="mt-6">
                  <img
                    src={chivalryCards1}
                    alt="騎士精神卡：圖示系統"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <P className="mt-6 !mb-0">
                  通往勝利的道路由八項美德構成。每項美德都搭配獨立的圖示與配色，讓玩家在對局中能快速辨識屬性。
                </P>
              </div>
            </FadeIn>
          </div>
        </SectionBlock>

        <SectionBlock className="!pb-12" style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H3>玩家面板</H3>
            <P>
              融合不同家族家徽的玩家個人圖版，將其代表色做為基底，劃分卡牌及骰子擺放的欄位。
            </P>
            <p className="mt-4 text-caption italic text-[#DFD6BC]/70">
              ＊家徽圖案設計者｜許庭瑋 Tin Hsu
            </p>
          </Container>
        </FadeIn>
        </SectionBlock>

        {/* 玩家面板：兩張並排，跳出 Container 做滿版 */}
        <SectionBlock className="!py-0" style={sectionStyleAlt}>
        <FadeIn>
          <div className="grid grid-cols-2 mobile:grid-cols-1">
            <img
              src={playerBoards1}
              alt="Player boards：家族徽章與配色"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={playerBoards2}
              alt="Player boards：版面配置"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </FadeIn>
        </SectionBlock>

        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
          <Container>

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
                  計分板用來追蹤每位騎士在對局中的成長。玩家透過完成任務與實踐美德累積分數，推進指示物向上。
                </P>
                <P>
                  分數越高，騎士的階級也隨之晉升，在視覺與象徵層面，逐步靠近真正的「騎士精神」。
                </P>
              </div>
            </TwoColumn>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* 包裝設計滿版（fixed 背景），整段疊在圖上 */}
        <SectionBlock
          className={BAND_TEXT}
          bgVariant="packaging"
          backgrounds={chivalryBackgrounds}
        >
          {/* Sits against the band's left edge, not the centred content column */}
          <div className="w-full px-16 mobile:px-8">
            <FadeIn>
              <div className="w-1/2 mobile:w-full rounded-sm text-[#DFD6BC] bg-[#2E0817]/80 backdrop-blur-sm shadow p-8 mobile:p-6">
                <H3 className="!mt-0">包裝設計</H3>
                <P className="!mb-0">
                  外盒包裝延續主題的磚紅色及卡牌使用的立體紋飾，營造整體感。
                </P>
                <p className="mt-4 text-caption italic text-[#DFD6BC]/70">
                  ＊中世紀街道插畫｜許庭瑋 Tin Hsu
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionBlock>

        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <div className="flex flex-col items-center justify-center">
              <img src={coverTransparent} alt="" className="w-40 h-auto mb-3 object-contain" />
              <p className="text-h3 font-light">騎士精神</p>
              <p className="text-caption text-[#DFD6BC]/60">2017</p>
            </div>

            {/* Credits */}
            <dl className="mt-16 border-t border-white/15 pt-8 space-y-3 text-caption text-[#DFD6BC]/80">
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-[#DFD6BC]/50">Client</dt>
                <dd>TRANSIT工作室</dd>
              </div>
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-[#DFD6BC]/50">Art Direction, Design</dt>
                <dd>湯靜恬 Enn Tang</dd>
              </div>
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-[#DFD6BC]/50">Illustration</dt>
                <dd>湯靜恬 Enn Tang、許庭瑋 Tin Hsu</dd>
              </div>
            </dl>
          </Container>
        </FadeIn>
        </SectionBlock>

        <RelatedProjects invert />

        <div className="pt-6 pb-12" style={sectionStyle}>
          <Footer className="text-white/60" />
        </div>
      </main>
    </div>
  )
}

