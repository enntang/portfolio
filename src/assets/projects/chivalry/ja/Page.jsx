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

export default function ChivalryPageJa() {
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
            {/* Background image overlay */}
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
              aria-label="オーバーレイとメインビジュアルの表示を切り替える"
              className="absolute inset-0 z-20 cursor-pointer"
            />
            <div className="relative z-10" style={contentStyle}>
              <Container className="flex flex-col items-center justify-center text-center">
                <h1 className="mt-10 text-large mobile:text-large-mobile hidden">騎士道</h1>

                <div className="w-full max-w-[720px]">
                  <img
                    src={coverTransparent}
                    alt="『騎士道』プロジェクトカバー"
                    className="w-full h-auto rounded-2xl shadow-sm"
                    loading="lazy"
                  />
                </div>
                <H3 className="text-[#DFD6BC]/90">ボードゲームデザイン｜イラスト、ビジュアルデザイン｜2017</H3>
              </Container>
            </div>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H2>プロジェクト概要</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  <em>Chivalry（騎士道）</em>は中世をモチーフにしたボードゲームです。プレイヤーはまだ叙任されていない見習い騎士となり、任務の遂行と美徳の獲得を通じて、家門に栄誉をもたらします。ゲームの仕組みは騎士道の核となる価値——力・知恵・魅力——を骨格とし、記号と質感の語彙によって、その概念を一貫した没入感のある世界観へと落とし込んでいます。
                </P>
                <P>
                  私は主に<strong>ビジュアルアイデンティティシステム</strong>の構築を担当し、アイコン、書体設定、カードイラストを手がけました。ひと目で「騎士道」の空気と秩序が伝わることを目指しています。
                </P>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">役割</p>
                <P className="text-[#DFD6BC]/90 mb-6">グラフィックデザイナー</P>

                <p className="text-h3 mb-2">期間</p>
                <P className="text-[#DFD6BC]/90 mb-6">2017</P>

                <p className="text-h3 mb-2">ツール</p>
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
            <H2>デザインコンセプト</H2>

            <P>
              <strong>低彩度のブリックレッド</strong>を基調に、メタリックなグラデーションとエンボスの質感を合わせ、落ち着いた品格を表現しました。
            </P>
            <P>
              このビジュアル言語はプレイヤーボードとルールブックにも展開し、家門ごとの配色と統一したレイアウトによって、カード・アイコン・ルールページが同じ世界観を保つようにしています。
            </P>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* ルールブック見開き：全幅（fixed 背景） */}
        <SectionBlock
          className={BAND}
          bgVariant="rulebook"
          backgrounds={chivalryBackgrounds}
          role="img"
          aria-label="デザインコンセプト：レイアウトと配色の方向性"
        />

        <SectionBlock style={sectionStyle}>
        <FadeIn>
          <Container>
            <P>
              プレイヤーコマ（トークン）は騎士のシルエットを用い、移動した位置を示します。
            </P>

            <div className="mt-8">
              <img
                src={designConceptMockup}
                alt="デザインコンセプト：騎士のシルエットのプレイヤーコマ"
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
            <H2>ビジュアルシステム</H2>

            <H3>タイポグラフィ</H3>
            <div className="mt-8">
              <img
                src={coverTransparent}
                alt="『騎士道』ロゴタイプのデザイン"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              中世の雰囲気を表現できるゴシック体を使用し、浮き彫りのような陰影を加えることで、架空世界のファンタジーな空気をつくりました。<br />
              書体を貫く剣が、「騎士」という核となるイメージを示しています。
            </P>

            <H3>能力カード</H3>
            <div className="mt-8 space-y-6">
              <img
                src={attributeCards}
                alt="能力カード：力／知恵／魅力"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={attributeHandMockup}
                alt="能力カード：手に持った状態のモックアップ"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
            <P className="mt-8">
              優れた騎士に必要な3つの能力——力・知恵・魅力——を、それぞれ剣・書物・薔薇で表し、盾の紋様で全体をひとつにまとめました。
            </P>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* カード面のレイアウト：全幅（fixed 背景）、騎士道カードのブロックを重ねる */}
        <SectionBlock
          className={BAND_TEXT}
          bgVariant="virtueCards"
          backgrounds={chivalryBackgrounds}
        >
          {/* Sits against the band's left edge, not the centred content column */}
          <div className="w-full px-16 mobile:px-8">
            <FadeIn>
              <div className="w-1/2 mobile:w-full rounded-sm text-[#DFD6BC] bg-[#2E0817]/80 backdrop-blur-sm shadow p-8 mobile:p-6">
                <H3 className="!mt-0">騎士道カード</H3>
                <div className="mt-6">
                  <img
                    src={chivalryCards1}
                    alt="騎士道カード：アイコンシステム"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <P className="mt-6 !mb-0">
                  勝利への道は8つの美徳で構成されます。各美徳に固有のアイコンと配色を与え、プレイ中でもひと目で見分けられるようにしました。
                </P>
              </div>
            </FadeIn>
          </div>
        </SectionBlock>

        <SectionBlock className="!pb-12" style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H3>プレイヤーボード</H3>
            <P>
              それぞれ異なる家門の紋章を取り入れた個人ボード。家門のカラーをベースに、カードとダイスを置く欄を区切っています。
            </P>
            <p className="mt-4 text-caption italic text-[#DFD6BC]/70">
              ＊家紋デザイン｜許庭瑋 Tin Hsu
            </p>
          </Container>
        </FadeIn>
        </SectionBlock>

        {/* プレイヤーボード：2枚を並べ、Container を外して全幅に */}
        <SectionBlock className="!py-0" style={sectionStyleAlt}>
        <FadeIn>
          <div className="grid grid-cols-2 mobile:grid-cols-1">
            <img
              src={playerBoards1}
              alt="Player boards：家門の紋章と配色"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={playerBoards2}
              alt="Player boards：レイアウト構成"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </FadeIn>
        </SectionBlock>

        <SectionBlock style={sectionStyleAlt}>
        <FadeIn>
          <Container>

            <H3>スコアボード</H3>
            <TwoColumn className="items-start mt-8">
              <div>
                <img
                  src={scoringBoard}
                  alt="Scoring board：得点ボード"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div>
                <P>
                  スコアボードは、対局中の各騎士の成長を記録します。プレイヤーはミッションの達成と美徳の実践によって点数を獲得し、マーカーを上へ進めます。
                </P>
                <P>
                  点数が高くなるほど騎士の階級も上がり、視覚的にも象徴的にも、真の「騎士道」へと近づいていきます。
                </P>
              </div>
            </TwoColumn>

          </Container>
        </FadeIn>
        </SectionBlock>

        {/* パッケージ：全幅（fixed 背景）、ブロックを重ねる */}
        <SectionBlock
          className={BAND_TEXT}
          bgVariant="packaging"
          backgrounds={chivalryBackgrounds}
        >
          {/* Sits against the band's left edge, not the centred content column */}
          <div className="w-full px-16 mobile:px-8">
            <FadeIn>
              <div className="w-1/2 mobile:w-full rounded-sm text-[#DFD6BC] bg-[#2E0817]/80 backdrop-blur-sm shadow p-8 mobile:p-6">
                <H3 className="!mt-0">パッケージデザイン</H3>
                <P className="!mb-0">
                  外箱はテーマカラーのブリックレッドと、カードで用いた立体的な紋様を引き継ぎ、全体の統一感をつくっています。
                </P>
                <p className="mt-4 text-caption italic text-[#DFD6BC]/70">
                  ＊中世の街並みイラスト｜許庭瑋 Tin Hsu
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
              <p className="text-h3 font-light">騎士道</p>
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
