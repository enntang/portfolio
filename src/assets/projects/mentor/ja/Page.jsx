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

// Images (reuse EN assets; put localized images into ../ja/ later if needed)
import BG1 from '../en/projectInfo-mentor-bg-1.png'
import BG2 from '../en/projectInfo-mentor-bg-2.png'
import BG3 from '../en/projectInfo-mentor-bg-3.png'
import BG4 from '../en/projectInfo-mentor-bg-4.png'

const mentorBackgrounds = {
  purple: BG1,
  dark: BG2,
  blue: BG3,
  mentor: BG4,
}

import shineImage from '../en/projectInfo-mentor-shine.svg'
import glintImage from '../en/projectInfo-mentor-glint.svg'

import tabletMockup from '../en/projectInfo-mentor-tablet-mockup.png'
import mentor from '../en/projectInfo-mentor-mentor.png'
import arrowDown from '../../../../../public/icon-arrow-down.svg'
import quoteIcon from '../../../../../public/icon-quote.svg'
import phases from '../en/projectInfo-mentor-phase.png'
import chartImg from '../en/projectInfo-mentor-chart.png'
import deliverablesDraft from '../en/projectInfo-mentor-draft.png'
import deliverablesLayout1 from '../en/projectInfo-mentor-layout1.png'
import deliverablesLayout2 from '../en/projectInfo-mentor-layout2.png'
import guidelineImg from '../en/projectInfo-mentor-guideline.png'
import mentorDraft from '../en/projectInfo-mentor-draft-2.png'
import mentorVariants from '../en/projectInfo-mentor-variants.png'
import pyramid from '../en/projectInfo-mentor-pyramid.png'
import screenShot1 from '../en/projectInfo-mentor-screenshot1.png'
import screenShot2 from '../en/projectInfo-mentor-screenshot2.png'
import screenShot3 from '../en/projectInfo-mentor-screenshot3.png'
import screenShot4 from '../en/projectInfo-mentor-screenshot4.png'
import screenShot5 from '../en/projectInfo-mentor-screenshot5.png'
import screenShot6 from '../en/projectInfo-mentor-screenshot6.png'
import screenShot7 from '../en/projectInfo-mentor-screenshot7.png'
import screenShot8 from '../en/projectInfo-mentor-screenshot8.png'
import typesImg from '../en/projectInfo-mentor-4types.png'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function MentorPageJa() {
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
      content: '最適な学習ルートを選ぶ：週あたりどれくらい学習時間を確保するか。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 78,
      y: 55,
      content: 'システムが学習タイプを表示します。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 12,
      y: 20,
      content:
        '学習計画の設定は 4 ステップ：1. 学習期間の選択 2. 学習する曜日の選択 3. 学習目標の設定 4. 計画の確定。',
      arrowPosition: 'bottom',
    },
  ]
  const learningGoalHotspots = [
    {
      id: 'point1',
      x: 18,
      y: 14,
      content:
        'フローの最後に学習計画が表示されます。タイムライン／カレンダー表示を切り替えて確認できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content: '色の違うドットは科目の違いを表します。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: '1 日分の学習内容の概要。',
      arrowPosition: 'bottom',
    },
  ]
  const learningReportHotspots = [
    {
      id: 'point1',
      x: 38,
      y: 4,
      content:
        'レポートは 3 つの時間軸（毎日・毎週・毎月）で構成され、粒度の異なる学習状況を確認できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 8,
      y: 44,
      content: '保護者は子どもを切り替えてレポートを確認できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: '学習の成果と進捗の全体像。',
      arrowPosition: 'bottom',
    },
  ]
  const badgeCollectionHotspots = [
    {
      id: 'point1',
      x: 28,
      y: 4,
      content: 'コレクションの進捗を確認できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content:
        '各バッジは固有のビジュアルを持ち、「実績ホール」のUIで一覧できます。',
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
              <H3 className="mb-24">AI統合学習プラットフォーム</H3>
              <P className="w-full md:w-2/3">
                Mentor のデザインは、画面やフローを整えるだけではありません。チームと物語、そして「学び」への共通の信念を形にするプロセスでした。
              </P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container className="flex flex-col items-center justify-center">
            <div className="text-center mb-10">
              <H2>プロジェクト概要</H2>
            </div>
            <img src={tabletMockup} alt="Mentor デザインプレビュー" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  Samebest で私は、新規プロダクト「Mentor」の UI / グラフィックデザインチームのデザインリードを担当しました。
                  このアプリは、学生が学習の道筋を効率よく設計し、校内試験や受験（高校・大学入試を含む）に向けて準備できるよう支援します。
                  私はチームを率いてUIを設計し、スケール可能なブランド基盤も整えました。
                </P>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-h3">役割</p>
                <P>デザインリード</P>
                <p className="text-h3">期間</p>
                <P>2019/05 – 2024/06</P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Responsibilities (dark) */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2>主な担当領域</H2>

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
                    <H3>1. リーダーシップ</H3>
                    <UL>
                      <LI>4 名のデザイナーを率い、0→1 のプロダクト立ち上げを推進。</LI>
                      <LI>メンバーの強みを踏まえてタスクを割り当て、思考と実行を伴走支援。</LI>
                      <LI>PM・R&amp;D との連携を促進し、使いやすさと実装可能性を両立。</LI>
                    </UL>
                    <P>また、定期的にチームディスカッションを実施しました：</P>
                    <UL>
                      <LI>初期のコンセプト探索・競合分析を通じて差別化ポイントを整理。</LI>
                      <LI>デザインの進め方を検討し、開発ワークフローと整合。</LI>
                      <LI>複雑な構造・大規模要件下でも、UX と全体一貫性を担保。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. デザインシステム構築</H3>
                    <UL>
                      <LI>プロダクト全体のビジュアル方針を策定。</LI>
                      <LI>主要ユーザー（中高生）の感性や言語感覚に合わせてUX/視覚表現を最適化。</LI>
                      <LI>参考収集と整理を行い、一貫したデザイン言語を構築。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div>
                <H3>1. リーダーシップ</H3>
                <UL>
                  <LI>デザインと開発を横断するチームを率いて推進。</LI>
                  <LI>メンバーの強みを踏まえてタスクを割り当て、思考と実行を伴走支援。</LI>
                  <LI>PM・R&amp;D との連携を促進し、使いやすさと実装可能性を両立。</LI>
                </UL>
                <P>また、定期的にチームディスカッションを実施しました：</P>
                <UL>
                  <LI>初期のコンセプト探索・競合分析を通じて差別化ポイントを整理。</LI>
                  <LI>デザインの進め方を検討し、開発ワークフローと整合。</LI>
                  <LI>複雑な構造・大規模要件下でも、UX と全体一貫性を担保。</LI>
                </UL>
              </div>
              <div>
                <H3>2. デザインシステム構築</H3>
                <UL>
                  <LI>プロダクト全体のビジュアル方針を策定。</LI>
                  <LI>主要ユーザー（中高生）の感性や言語感覚に合わせてUX/視覚表現を最適化。</LI>
                  <LI>参考収集と整理を行い、一貫したデザイン言語を構築。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Workflow */}
        <SectionBlock className="pb-0" backgrounds={mentorBackgrounds}>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <H2>ワークフロー</H2>
              <UL className="md:col-span-2">
                <LI>各機能は約 2 か月サイクルで、クロスファンクショナルに設計・開発。</LI>
                <LI>探索〜発想フェーズは小チームで素早く検討し、効果的な解を導出。</LI>
                <LI>最終段階ではエンジニアと実現性を確認し、反復的に磨き込み。</LI>
              </UL>
            </div>
          </Container>
          <img src={phases} alt="ワークフローのフェーズ" />
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
                      Mentor は当初、録画授業を提供する既存のデスクトップ自学習ソフトを補完する「モバイルコンパニオン」として構想されました。
                    </P>
                    <P>
                      チームは早い段階で、学生がプラットフォームを利用する代表的なシーンに対応する<strong>3つの学習コンテキスト</strong>を想定しました。
                    </P>
                    <P className="text-xs text-gray-100">
                      当初のシステムは、デスクトップの動画自学習ソフトを操作する「リモートUI」として設計されていました。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">自宅：机に向かって学習</div>
                      <p className="pb-0">PC・タブレット・教科書を併用できる環境。</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">学校／図書館</div>
                      <p className="pb-0">タブレットと教科書のみで、授業の延長として学習。</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <div className="text-sm mb-2 opacity-70">移動中</div>
                      <p className="pb-0">タブレットのみで、主要な学習ツールとして利用。</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <TwoColumn>
                <div>
                  <H2>背景</H2>
                  <P>
                    Mentor は当初、録画授業を提供する既存のデスクトップ自学習ソフトを補完する「モバイルコンパニオン」として構想されました。
                  </P>
                  <P>
                    チームは早い段階で、学生がプラットフォームを利用する代表的なシーンに対応する<strong>3つの学習コンテキスト</strong>を想定しました。
                  </P>
                  <P className="text-xs text-gray-100">
                    当初のシステムは、デスクトップの動画自学習ソフトを操作する「リモートUI」として設計されていました。
                  </P>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">自宅：机に向かって学習</div>
                    <p className="pb-0">PC・タブレット・教科書を併用できる環境。</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">学校／図書館</div>
                    <p className="pb-0">タブレットと教科書のみで、授業の延長として学習。</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                    <div className="text-sm mb-2 opacity-70">移動中</div>
                    <p className="pb-0">タブレットのみで、主要な学習ツールとして利用。</p>
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
              <H2>リサーチインサイト</H2>
              <P>
                開発初期に、仮説検証と課題発掘のための基礎リサーチを実施しました。対象は 2 つの主要グループ：<strong>保護者と学生</strong>です。
              </P>
              <P>
                両者に共通する課題が見つかりました：<br />
                学習の進捗が見えず、フラストレーションにつながっていたこと。学生は「伸びていない」と感じ、保護者は「どう支援すればよいかわからない」と感じていました。
              </P>

              {/* two circles for infographic */}
              <div className="flex flex-row justify-center items-center my-16 relative isolate">
                {/* Parents Circle - Blue gradient */}
                <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">保護者</p>
                    <p className="text-xl leading-relaxed">「学校で何を学んでいるのか、なぜ成績が伸びないのかが分からない。」</p>
                  </div>
                </div>
                {/* Students Circle - Purple gradient */}
                <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-32 md:-ml-40 z-20 mix-blend-multiply">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">学生</p>
                    <p className="text-xl leading-relaxed">「ずっと間違えているのに、どこが間違いなのか分からない。」</p>
                  </div>
                </div>
              </div>
              <P>
                根本原因は共通していました：<strong>基礎理解の弱さと、構造化された復習戦略の欠如。</strong>
                <br />
                こうしたインサイトは「努力」と「成果」のギャップを可視化し、以降のデザイン目標の土台になりました。
              </P>
            </div>
          </Container>
        </SectionBlock>

        {/* how might we */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <img src={quoteIcon} alt="quote icon" className="mb-8" />
              <H2 className="text-gray-900">How Might We…</H2>
              <P className="mx-auto text-gray-900">
                学習の進捗が見えず、フィードバック不足で挫折している学生と保護者に対して、どうすれば「理解の明確さ」「継続の動機」「個別最適な次の一手」を提供できるだろうか？
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
                    <H2>デザイン目標</H2>
                    <P className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      リサーチで得たインサイトをもとに、保護者と学生の主要な不安に応える 3 つの目標を設定しました：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>1. 個別最適な目標設定と学習ガイダンス</H3>
                    <P>
                      認知負荷を下げ方向性を与えるため、Mentor は学力、過去の成績、直近の誤答傾向に基づいて学習計画を最適化します。AI のガイドに沿って進めるだけで、着実に前進できます。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. 分かりやすいフィードバックと次の一手</H3>
                    <P>
                      曖昧なスコアだけに頼らず、Mentor は視覚的な学習レポートを生成します。進捗を示し、弱点を明確化し、次の行動を提案することで、保護者と学生が同じ理解のもと前進できます。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>3. 達成感によるモチベーション強化</H3>
                    <P>
                      具体的な進捗指標（誤答の減少、タスク完了、学習ストリーク等）で成長を実感できるようにし、継続的な取り組みを後押しします。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div>
                <H2>デザイン目標</H2>
                <P className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  リサーチで得たインサイトをもとに、保護者と学生の主要な不安に応える 3 つの目標を設定しました：
                </P>
              </div>
              <div>
                <div className="mb-8">
                  <H3>1. 個別最適な目標設定と学習ガイダンス</H3>
                  <P>
                    認知負荷を下げ方向性を与えるため、Mentor は学力、過去の成績、直近の誤答傾向に基づいて学習計画を最適化します。AI のガイドに沿って進めるだけで、着実に前進できます。
                  </P>
                </div>
                <div className="mb-8">
                  <H3>2. 分かりやすいフィードバックと次の一手</H3>
                  <P>
                    曖昧なスコアだけに頼らず、Mentor は視覚的な学習レポートを生成します。進捗を示し、弱点を明確化し、次の行動を提案することで、保護者と学生が同じ理解のもと前進できます。
                  </P>
                </div>
                <div>
                  <H3>3. 達成感によるモチベーション強化</H3>
                  <P>
                    具体的な進捗指標（誤答の減少、タスク完了、学習ストリーク等）で成長を実感できるようにし、継続的な取り組みを後押しします。
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
                  <H2>コアコンセプト</H2>
                  <P>
                    Mentor は最終的に「パーソナライズされた学習コーチ」として再定義されました。明快で覚えやすいこのコンセプトにより、デザイン原則が統一され、感情面・機能面のニーズの両方に応えられるようになり、保護者と学生双方にとって親しみやすいプロダクトになりました。
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
                    <H2>デザイン成果物</H2>
                    <P>
                      Mentor を「パーソナライズ学習コーチ」として伝えるために、体験全体を物語として設計しました。Mentor は単なるアプリではなく、達成可能な目標設定、ペース維持、可視化された成長による自信形成を支えるスマートな相棒です。この視点のもと、私はビジュアルデザインとUIシステム構築をリードし、3つのデザイン目標に整合させました。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ProjectNote>
                      ワイヤーから中間精度のPOC、そして最終のテーマUIへ。各イテレーションを通じてレイアウトのロジックを明確にし、プロダクトのナラティブなアイデンティティを形作りました。
                    </ProjectNote>
                    <img src={deliverablesDraft} alt="デザイン草案" className="my-16" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={deliverablesLayout1} alt="レイアウト案 1" className="w-full" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={deliverablesLayout2} alt="レイアウト案 2" className="w-full" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>
                      デザインリードとしてビジュアルスタイルを定義し、チームと共に一貫したデザインシステムを構築しました。主要ユーザーが中高生であるため、感性や言語感覚に合わせる必要があり、UX設計はより難易度が高くなりました。参考を集め、方向性を検討しながら、プロダクトのトーンに合うシステムを作り上げました。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2>デザイン成果物</H2>
              <P>
                Mentor を「パーソナライズ学習コーチ」として伝えるために、体験全体を物語として設計しました。Mentor は単なるアプリではなく、達成可能な目標設定、ペース維持、可視化された成長による自信形成を支えるスマートな相棒です。この視点のもと、私はビジュアルデザインとUIシステム構築をリードし、3つのデザイン目標に整合させました。
              </P>

              <ProjectNote className="absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32">
                ワイヤーから中間精度のPOC、そして最終のテーマUIへ。各イテレーションを通じてレイアウトのロジックを明確にし、プロダクトのナラティブなアイデンティティを形作りました。
              </ProjectNote>
              <img src={deliverablesDraft} alt="デザイン草案" className="my-16" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={deliverablesLayout1} alt="レイアウト案 1" className="md:h-full md:object-cover" />
                <img src={deliverablesLayout2} alt="レイアウト案 2" className="md:h-full md:object-cover" />
              </div>
              <div className="my-16">
                <P>
                  デザインリードとしてビジュアルスタイルを定義し、チームと共に一貫したデザインシステムを構築しました。主要ユーザーが中高生であるため、感性や言語感覚に合わせる必要があり、UX設計はより難易度が高くなりました。参考を集め、方向性を検討しながら、プロダクトのトーンに合うシステムを作り上げました。
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
                    <H2>Mentor の物語</H2>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                      <P className="">
                        「Mentor」という言葉はギリシャ神話に由来します。賢明な守護者が、オデュッセウスの旅の間、息子を導く役目を託されたことに始まります。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>
                      AI と情報過多の時代、Mentor は導きの神となりますが、偶然にも宇宙のキューブに閉じ込められてしまいます。
                    </P>
                    <P>
                      力を取り戻し地球へ戻るために、Mentor は学生を導いて宇宙を巡る学習の旅へと連れ出し、成長の象徴であるバッジを集めます。<strong>学生一人ひとりの進歩が Mentor の進化を促し、学びを「共同の冒険」へ変えていきます。</strong>
                    </P>
                    <P>
                      この寓話的なストーリーによって、アプリ体験は単なる学習ツールではなく、学生と Mentor が共に変化していくミッションとして描かれます。
                    </P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2>Mentor の物語</H2>
              <TwoColumn>
                <div>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 ">
                    <P className="">
                      「Mentor」という言葉はギリシャ神話に由来します。賢明な守護者が、オデュッセウスの旅の間、息子を導く役目を託されたことに始まります。
                    </P>
                  </div>
                </div>
                <div>
                  <P>
                    AI と情報過多の時代、Mentor は導きの神となりますが、偶然にも宇宙のキューブに閉じ込められてしまいます。
                  </P>
                  <P>
                    力を取り戻し地球へ戻るために、Mentor は学生を導いて宇宙を巡る学習の旅へと連れ出し、成長の象徴であるバッジを集めます。<strong>学生一人ひとりの進歩が Mentor の進化を促し、学びを「共同の冒険」へ変えていきます。</strong>
                  </P>
                  <P>
                    この寓話的なストーリーによって、アプリ体験は単なる学習ツールではなく、学生と Mentor が共に変化していくミッションとして描かれます。
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
                初期スケッチ：宇宙の案内役としての Mentor の象徴性と、学び・リズム・対話・成長を抽象的に表現する試行。
              </P>
            </div>
            <div>
              <img src={mentorVariants} alt="mentor variants" className=" md:object-cover" />
              <P className="text-caption p-8 md:mr-24 mt-4 md:mt-8">
                学習者それぞれのユニークな旅を反映するため、Mentor は時間とともに進化します。外観は学生の行動、学習ペース、関与の仕方に応じて変化します。
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
                    <H2>UIガイドとしての Mentor</H2>
                    <P>
                      Mentor は画面右下に常駐し、リアルタイムの学習エージェントとして、操作に応じたフィードバック、リマインド、励ましを提供します。
                    </P>
                    <P>
                      発光するSF的キューブのアバターは「知性」と「神話性」を融合し、二層のインタラクションモデルを形作ります：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={pyramid} alt="pyramid chart" />
                    <P>
                      教育エージェント理論に基づき、Mentor はナラティブ駆動のUIエージェントとなります。情緒的な関与を高め、学習フローをより意味のある、前向きな体験にします。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={screenShot1} alt="updates screen" className="rounded-sm" />
                    <p className="text-caption p-8">Mentor は日々の更新を、励ましのあるインタラクションへ変えます。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={screenShot2} alt="first-time onboarding screen" className="rounded-sm" />
                    <p className="text-caption p-8">
                      初回オンボーディングでは、得意度（自信）に沿って科目を強い順に並べ替えます。
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2>UIガイドとしての Mentor</H2>
              <P>
                Mentor は画面右下に常駐し、リアルタイムの学習エージェントとして、操作に応じたフィードバック、リマインド、励ましを提供します。
              </P>
              <P>発光するSF的キューブのアバターは「知性」と「神話性」を融合し、二層のインタラクションモデルを形作ります：</P>
              <img src={pyramid} alt="pyramid chart" />
              <P>
                教育エージェント理論に基づき、Mentor はナラティブ駆動のUIエージェントとなります。情緒的な関与を高め、学習フローをより意味のある、前向きな体験にします。
              </P>
            </div>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-24">
            <div>
              <img src={screenShot1} alt="updates screen" className="rounded-sm" />
              <p className="text-caption p-8">Mentor は日々の更新を、励ましのあるインタラクションへ変えます。</p>
            </div>
            <div>
              <img src={screenShot2} alt="first-time onboarding screen" className="rounded-sm" />
              <p className="text-caption p-8">
                初回オンボーディングでは、得意度（自信）に沿って科目を強い順に並べ替えます。
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* features */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2>機能</H2>
            <P>
              フローは「週にいつ・1 回どれくらい学習したいか」を尋ねるところから始まります。曜日と学習時間は自由に選べるため、実生活のリズムに合わせて計画できます。
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
                    <H3>学習ペルソナ分類</H3>
                    <P>
                      学習をより身近でパーソナルなものにするため、Mentor は週あたりの学習時間に基づいて、4つの学習ペルソナのいずれかを自動で割り当てます：
                    </P>
                    <img src={typesImg} alt="types" />
                    <UL>
                      <LI>ゆるふわ学習者（Laid-back Learner）：気負わず、低ストレスなペースを好む。</LI>
                      <LI>コツコツ努力家（Consistent Striver）：規則的に取り組み、着実に前進する。</LI>
                      <LI>探究型チャレンジャー（Curious Achiever）：主体的に探求し、挑戦を好む。</LI>
                      <LI>トップ志向エリート（Elite Performer）：トップレベルの成果を目指す強い意欲がある。</LI>
                    </UL>
                    <P>
                      遊び心のあるこの仕組みは、自己理解を促し、学習の過程で成長の変化を追跡できるようにします。
                    </P>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div>
                    <H3>目標設定：パーソナライズ学習パス</H3>
                    <UL>
                      <LI>
                        計画はタイムラインとカレンダーの両方で提示され、日々のタスクカードには科目・知識ポイント・想定時間が表示されます。いつでも調整や並び替えが可能です。
                      </LI>
                      <LI>
                        各タスクには学習目標が明確に示され、動画レッスンも提供されます。
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
                        <strong>デザインの焦点：</strong>
                      </P>
                      <P>
                        学習計画を「共同で作る」体験と、全体構造の事前可視化により摩擦を減らし、主体感を高めました。情報の明瞭さと柔軟なリスケジュールは、長期的な継続の鍵です。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>学習レポート：可視化されたフィードバックと次の一手</H3>
                    <P>
                      「フィードバックが曖昧／遅い」ことによる不安に応えるため、PC とスマホの両方で使える Web レポートを設計し、保護者もリアルタイムに状況を把握できるようにしました。
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
                    <P className="mt-6">レポートは 3 つの時間軸で構成されます：</P>
                    <UL>
                      <LI>
                        <strong>日次レポート</strong>：完了タスク、知識ポイント、テスト結果を表示。
                      </LI>
                      <LI>
                        <strong>週次レポート</strong>：取り組み量、ペルソナの変化、成績トレンドを表示。
                      </LI>
                      <LI>
                        <strong>月次レポート</strong>：学習時間、科目別パフォーマンス、診断インサイトの全体像を提示。
                      </LI>
                    </UL>
                    <P>
                      すべてのレポートはシンプルなチャートと進捗指標で可視化し、保護者・学生ともに素早く理解できるようにしました。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                      <P>
                        <strong>デザインの焦点：</strong>
                      </P>
                      <P>
                        最大の課題は、複雑な成績データを「行動につながる示唆」へ翻訳しつつ、情緒的なサポートも保つことでした。ビジュアル言語と整合したトーンで、透明性と励ましを両立するレポート体験を構築し、保護者と学生のコミュニケーションを促進しました。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>バッジコレクション：マイルストーンで動機づけ</H3>
                    <P>
                      継続的な取り組みを促すため、ゲーム感のあるバッジ収集システムを導入しました。学生は学習のマイルストーンを達成することでバッジを解放できます（例：レッスン完了、日次目標の達成、学習計画の調整など）。
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
                      進捗の可視化と解放フィードバックが「集めたい」気持ちを満たし、習慣化を後押しします。
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
                        <strong>デザインの焦点：</strong>
                      </P>
                      <P>
                        コレクタブルの視覚的魅力とマイルストーン設計を組み合わせ、進歩が「報われる」体験になるようにしました。一方で、過度な競争に依存しないゲーム化を意識しています。
                      </P>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className=" mb-10  mx-auto">
                <H3>学習ペルソナ分類</H3>
                <P>
                  学習をより身近でパーソナルなものにするため、Mentor は週あたりの学習時間に基づいて、4つの学習ペルソナのいずれかを自動で割り当てます：
                </P>
                <img src={typesImg} alt="types" />
                <UL>
                  <LI>ゆるふわ学習者（Laid-back Learner）：気負わず、低ストレスなペースを好む。</LI>
                  <LI>コツコツ努力家（Consistent Striver）：規則的に取り組み、着実に前進する。</LI>
                  <LI>探究型チャレンジャー（Curious Achiever）：主体的に探求し、挑戦を好む。</LI>
                  <LI>トップ志向エリート（Elite Performer）：トップレベルの成果を目指す強い意欲がある。</LI>
                </UL>
                <P>
                  遊び心のあるこの仕組みは、自己理解を促し、学習の過程で成長の変化を追跡できるようにします。
                </P>
              </div>
              <div className=" mb-10  mx-auto">
                <H3>目標設定：パーソナライズ学習パス</H3>
                <UL>
                  <LI>
                    計画はタイムラインとカレンダーの両方で提示され、日々のタスクカードには科目・知識ポイント・想定時間が表示されます。いつでも調整や並び替えが可能です。
                  </LI>
                  <LI>
                    各タスクには学習目標が明確に示され、動画レッスンも提供されます。
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
                  <strong>デザインの焦点：</strong>
                </P>
                <P>
                  学習計画を「共同で作る」体験と、全体構造の事前可視化により摩擦を減らし、主体感を高めました。情報の明瞭さと柔軟なリスケジュールは、長期的な継続の鍵です。
                </P>
              </div>
              <div className=" mb-10  mx-auto">
                <H3>学習レポート：可視化されたフィードバックと次の一手</H3>
                <P>
                  「フィードバックが曖昧／遅い」ことによる不安に応えるため、PC とスマホの両方で使える Web レポートを設計し、保護者もリアルタイムに状況を把握できるようにしました。
                </P>
                <ImageWithHotspots
                  src={screenShot5}
                  alt="learning goal setting"
                  hotspots={learningReportHotspots}
                />
                <P className="mt-6">レポートは 3 つの時間軸で構成されます：</P>
                <UL>
                  <LI>
                    <strong>日次レポート</strong>：完了タスク、知識ポイント、テスト結果を表示。
                  </LI>
                  <LI>
                    <strong>週次レポート</strong>：取り組み量、ペルソナの変化、成績トレンドを表示。
                  </LI>
                  <LI>
                    <strong>月次レポート</strong>：学習時間、科目別パフォーマンス、診断インサイトの全体像を提示。
                  </LI>
                </UL>
                <P>
                  すべてのレポートはシンプルなチャートと進捗指標で可視化し、保護者・学生ともに素早く理解できるようにしました。
                </P>
                <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                  <P>
                    <strong>デザインの焦点：</strong>
                  </P>
                  <P>
                    最大の課題は、複雑な成績データを「行動につながる示唆」へ翻訳しつつ、情緒的なサポートも保つことでした。ビジュアル言語と整合したトーンで、透明性と励ましを両立するレポート体験を構築し、保護者と学生のコミュニケーションを促進しました。
                  </P>
                </div>
                <div className=" mb-10  mx-auto">
                  <H3>バッジコレクション：マイルストーンで動機づけ</H3>
                  <P>
                    継続的な取り組みを促すため、ゲーム感のあるバッジ収集システムを導入しました。学生は学習のマイルストーンを達成することでバッジを解放できます（例：レッスン完了、日次目標の達成、学習計画の調整など）。
                  </P>

                  <ImageWithHotspots
                    src={screenShot6}
                    alt="badge collection"
                    hotspots={badgeCollectionHotspots}
                  />
                  <P className="mt-6">進捗の可視化と解放フィードバックが「集めたい」気持ちを満たし、習慣化を後押しします。</P>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <img src={screenShot7} alt="badge 1" className="rounded-sm" />
                    <img src={screenShot8} alt="badge 2" className="rounded-sm" />
                  </div>
                </div>
                <div className="px-4 pb-3 pt-6 bg-gray-100 rounded-sm">
                  <P>
                    <strong>デザインの焦点：</strong>
                  </P>
                  <P>
                    コレクタブルの視覚的魅力とマイルストーン設計を組み合わせ、進歩が「報われる」体験になるようにしました。一方で、過度な競争に依存しないゲーム化を意識しています。
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
                    <H2>振り返り</H2>
                    <P>
                      Mentor のデザインは、見た目や機能の課題だけではなく、チームや職種をまたいだ密な協働と反復によって形作られました。デザインリードとして振り返ると、特に重要だった学びは次の 3 点です：
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>1. 情報の同期を保つ</H3>
                    <UL>
                      <LI>大きなプロダクトビジョンと複雑な要件のもとでは、明確でタイムリーなコミュニケーションが推進の鍵でした。</LI>
                      <LI>
                        これまでの「遠回し」な癖を改め、デザインやクロスファンクショナルな議論で、より率直かつ明確に伝えることを学びました。結果としてチームを守り、進行を滑らかにできました。
                      </LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>2. 市場から学ぶ</H3>
                    <UL>
                      <LI>ユーザーリサーチだけでなく、最前線で顧客と向き合う営業チームのフィードバックも重視するようになりました。</LI>
                      <LI>彼らの洞察は競争力を高め、デザイナー視点に偏りすぎた判断を防いでくれました。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H3>3. チームの成長を支える</H3>
                    <UL>
                      <LI>1on1 を通じて、各メンバーの動機や関与度を理解しました。</LI>
                      <LI>タスク配分では「挑戦」と「成長」を両立させ、利用可能なリソースを活用してスキルを磨くことを促しました。</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2>振り返り</H2>

              <div>
                <P>
                  Mentor のデザインは、見た目や機能の課題だけではなく、チームや職種をまたいだ密な協働と反復によって形作られました。デザインリードとして振り返ると、特に重要だった学びは次の 3 点です：
                </P>
                <H3>1. 情報の同期を保つ</H3>
                <UL>
                  <LI>大きなプロダクトビジョンと複雑な要件のもとでは、明確でタイムリーなコミュニケーションが推進の鍵でした。</LI>
                  <LI>
                    これまでの「遠回し」な癖を改め、デザインやクロスファンクショナルな議論で、より率直かつ明確に伝えることを学びました。結果としてチームを守り、進行を滑らかにできました。
                  </LI>
                </UL>
                <H3>2. 市場から学ぶ</H3>
                <UL>
                  <LI>ユーザーリサーチだけでなく、最前線で顧客と向き合う営業チームのフィードバックも重視するようになりました。</LI>
                  <LI>彼らの洞察は競争力を高め、デザイナー視点に偏りすぎた判断を防いでくれました。</LI>
                </UL>
                <H3>3. チームの成長を支える</H3>
                <UL>
                  <LI>1on1 を通じて、各メンバーの動機や関与度を理解しました。</LI>
                  <LI>タスク配分では「挑戦」と「成長」を両立させ、利用可能なリソースを活用してスキルを磨くことを促しました。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* conclusion */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="w-full md:w-2/3 mx-auto flex flex-col items-center justify-center mb-24">
            <P>
              Mentor のデザインは、UI を作るだけではなく、チームと物語、そして学びに対する共通の信念を形にすることでもありました。初期の私は「作り手」寄りで、ピクセルやフロー、UI の磨き込みに集中していました。しかしプロダクトがスケールするにつれ、「リーダー」としての視点でクロスファンクショナルな協働を整え、仲間をエンパワーし、より大きな方向性を守ることを学びました。
            </P>
            <P>
              これらの経験を通じて、私は個人貢献者からデザインリードへと成長しました。より明確にコミュニケーションし、役割間で意図を翻訳し、デリバリーはチーム全体のリズムだと理解できるようになりました。何より、良いデザインとは「分かりやすさ」や「クラフト」だけでなく、ビジョン・人・成果を揃えることだと学びました。
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

