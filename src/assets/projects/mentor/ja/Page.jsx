import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Navbar from '../../../../components/utilities/Navbar'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import Footer from '../../../../components/utilities/Footer'
import Container from '../../../../components/projects/Container'
import ImageWithHotspots from '../../../../components/utilities/ImageWithHotspots'
import SectionBlock from '../../../../components/projects/SectionBlock'
import ProjectNote from '../../../../components/projects/ProjectNote'
import TwoColumn from '../../../../components/projects/TwoColumn'
import RelatedProjects from '../../../../components/projects/RelatedProjects'
import TableOfContents from '../../../../components/utilities/TableOfContents'

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
import mentorImg from '../image/projectInfo-mentor-mentor.png'
import arrowDown from '../../../../../public/icon-arrow-down.svg'
import quoteIcon from '../../../../../public/icon-quote.svg'
import teamChart from '../image/projectInfo-mentor-team-chart.png'
import priorityTable from '../image/projectInfo-mentor-priority-table.png'
import ipCharacter from '../image/projectInfo-mentor-ip-character.png'
import conceptDraft from '../image/projectInfo-mentor-concept-draft.png'
import ipVariants from '../image/projectInfo-mentor-ip-variants.png'
import uiGuide from '../image/projectInfo-mentor-ui-guide.png'
import uiGuideFull from '../image/projectInfo-mentor-ui-guide-full.png'
import screenShot1 from '../image/projectInfo-mentor-screenshot1.png'
import typesImg from '../image/projectInfo-mentor-4types.png'
import screenShot2 from '../image/projectInfo-mentor-screenshot2.png'
import iteration1 from '../image/projectInfo-mentor-iteration-1.png'
import iteration2 from '../image/projectInfo-mentor-iteration-2.png'
import wireframe1 from '../image/projectInfo-mentor-wireframe-1.png'
import wireframe2 from '../image/projectInfo-mentor-wireframe-2.png'
import designSystem from '../image/projectInfo-mentor-design-system.png'
import personaUi1 from '../image/projectInfo-mentor-persona-ui-1.png'
import personaUi2 from '../image/projectInfo-mentor-persona-ui-2.png'
import goalCalendar from '../image/projectInfo-mentor-goal-calendar.png'
import screenShot4 from '../image/projectInfo-mentor-screenshot4.png'
import screenShot6 from '../image/projectInfo-mentor-screenshot6.png'
import screenShot7 from '../image/projectInfo-mentor-screenshot7.png'
import screenShot8 from '../image/projectInfo-mentor-screenshot8.png'
import reportWeekly from '../image/projectInfo-mentor-report-weekly.png'
import reportMonthly from '../image/projectInfo-mentor-report-monthly.png'
import badgeOverview from '../image/projectInfo-mentor-badge-overview.png'
import badgeEarned from '../image/projectInfo-mentor-badge-earned.png'
import badgeLocked from '../image/projectInfo-mentor-badge-locked.png'
import lineTree from '../image/projectInfo-mentor-line-tree.png'
import lineMenu from '../image/projectInfo-mentor-screenshot9.png'
import tabletMockup from '../image/projectInfo-mentor-tablet-mockup.png'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function MentorJaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const learningPersonaHotspots = [
    { id: 'point2', x: 78, y: 55, content: 'システムが生徒の学習タイプを表示します。', arrowPosition: 'bottom' },
    { id: 'point3', x: 12, y: 20, content: '学習プランの作成は4ステップ：1. 学習期間を選択 2. 週の学習日を選択 3. 学習目標を設定 4. プランを確認。', arrowPosition: 'bottom' },
  ]
  const learningGoalHotspots = [
    { id: 'point1', x: 18, y: 14, content: 'フロー終了時に学習スケジュールが表示され、タイムラインとカレンダービューを切り替えられます。', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: '色付きのドットはそれぞれの教科を示します。', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: '当日の予定学習内容の概要。', arrowPosition: 'bottom' },
  ]
  const learningReportHotspots = [
    { id: 'point1', x: 38, y: 4, content: 'レポートは日次・週次・月次の3つの時間軸をカバーし、それぞれ異なる深さの学習活動を提示します。', arrowPosition: 'bottom' },
    { id: 'point2', x: 8, y: 44, content: '保護者は複数の子どものレポートを切り替えて確認できます。', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: '生徒のパフォーマンスと学習進捗の概要。', arrowPosition: 'bottom' },
  ]
  const badgeCollectionHotspots = [
    { id: 'point1', x: 28, y: 4, content: '生徒はコレクションの進捗を確認できます。', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: '各バッジは独自のビジュアルデザインを持ち、「実績の殿堂」インターフェースに展示されます。', arrowPosition: 'bottom' },
  ]
  const mentorImgRef = useFloatingAnimation({ y: -20, duration: 2 })
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })
  const parentsCircleRef = useRef(null)
  const studentsCircleRef = useRef(null)

  useEffect(() => {
    if (!parentsCircleRef.current || !studentsCircleRef.current) return

    const t1 = gsap.fromTo(
      parentsCircleRef.current,
      { x: -300, opacity: 0 },
      {
        x: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: parentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
    const t2 = gsap.fromTo(
      studentsCircleRef.current,
      { x: 300, opacity: 0 },
      {
        x: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: studentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
    return () => {
      t1.scrollTrigger?.kill()
      t2.scrollTrigger?.kill()
      t1.kill()
      t2.kill()
    }
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
          <SectionBlock bgVariant="purple" className="relative" backgrounds={mentorBackgrounds}>
            <TableOfContents />
            <img src={shineImage} alt="shine" className="absolute top-0 right-0" />
            <img src={glintImage} alt="glint" className="absolute bottom-0 left-0" />
            <Container className="flex flex-col items-center justify-center text-center">
              <img ref={mentorImgRef} src={mentorImg} alt="Mentor" className="h-48 w-48 md:h-64 md:w-64 rounded-lg" />
              <h1 className="text-large mobile:text-large-mobile">Mentor</h1>
              <H3 className="mb-4">プロダクトだけでなく、チームを作る</H3>
              <P className="w-full md:w-2/3 mb-24">
                1年間でゼロからAI統合学習プラットフォームを構築した記録
              </P>
              <img ref={arrowDownRef} src={arrowDown} alt="Scroll down" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="project-brief">プロジェクト概要</H2>
            <img src={tabletMockup} alt="Mentor design preview" className="rounded-lg mb-12 transition-transform duration-500 ease-out hover:scale-105" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-4">
              <div className="md:col-span-2">
                <P>
                  学習計画を立てることは、決して簡単ではありません。すべての生徒が異なるスタートラインを持ち、異なる目標を持っています。自分で学習の進捗を管理することは、ほとんどの生徒の能力を超えています。かつて、このギャップはカスタマーサービスや塾のコンサルタントが埋めていました——コストがかかり、スケールできない方法で。Mentor（AIスマートバッグ）は、この根本的な問題を解決するために作られました。
                </P>
                <P>
                  このプロジェクトでは、デザインリードとして、ゼロからデザインチームを構築・育成しました。PM、エンジニアリング、マーケティング、カリキュラムという5つの部門と協力し、1年間でコンセプトから正式リリースまでの完全な製品を届けました。<strong>リリース後、90%の生徒がAIを使って学習パスを構築することを選択し</strong>、私が育てた最初のデザイナーNomisは、私の退職後に私のポジションに昇進しました。
                </P>
                <blockquote className="border-l-4 border-current pl-6 mt-8 italic opacity-70">
                  このプロジェクトを通じて確信したこと：デザインリードの仕事は、優れたデザインを作ることだけではなく——優れたデザインが生まれるチームを作ることだ。
                </blockquote>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-h3">役割</p>
                <P>デザインリード</P>
                <p className="text-h3">期間</p>
                <P>2023 – 2024</P>
                <p className="text-h3">担当範囲</p>
                <P>チーム構築・スケジュール管理、デザイン方向性、UIシステム、クロスファンクショナルコラボレーション、ビジュアルアートディレクション</P>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-current/20">
              {[
                { stat: '1年', label: 'ゼロからイチへの製品ローンチ', sub: 'コンセプトからデリバリーまでの完全な製品' },
                { stat: '15人以上', label: 'クロスチームの協力者', sub: 'デザイン、PM、RD、マーケティング、カリキュラム' },
                { stat: '90%', label: 'AIパスを採用', sub: 'ユーザーに受け入れられたデザイン決定' },
                { stat: '後継者育成', label: 'チームメンバーがリードに昇進', sub: '育てた人材が後を引き継ぐ' },
              ].map(({ stat, label, sub }) => (
                <div key={stat} className="flex flex-col gap-2">
                  <p className="text-h2" style={{ fontWeight: '500' }}>{stat}</p>
                  <p className="text-body font-medium">{label}</p>
                  <p className="text-caption opacity-60">{sub}</p>
                </div>
              ))}
            </div>
          </Container>
        </SectionBlock>

        {/* Team Structure */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-structure">チーム構造とコラボレーション</H2>
            <img src={teamChart} alt="Team structure diagram" className="rounded-lg mb-12 mt-6" />
            <P>このプロジェクトでは、複数の並行するユニットとの密接なコラボレーションが必要でした。デザインは孤立した機能ではなく、製品エコシステム全体の一部でした：</P>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3" style={{ fontWeight: '500' }}>チーム</th>
                    <th className="pb-4 pr-6 text-h3 whitespace-nowrap" style={{ fontWeight: '500' }}>人数</th>
                    <th className="pb-4 text-h3" style={{ fontWeight: '500' }}>コラボレーション内容</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  {[
                    { team: 'デザインチーム', count: '5名（私を含む）', desc: 'UIデザイン、アートディレクション、フロントエンド実装を担当。' },
                    { team: 'PMチーム', count: '4名', desc: '製品の方向性と要件を定義。デザインの最終決定はPMリードが承認。' },
                    { team: 'エンジニアリング', count: '4名', desc: '機能開発と技術実装を担当。実現可能性とスペックの検証でデザインと直接連携。' },
                    { team: 'マーケティング', count: '2名', desc: 'デザインチームがマーケティング素材のリクエストも処理。製品デザインとマーケタスク間のリソース配分が必要。' },
                    { team: 'カリキュラム', count: '複数名', desc: 'K12教科コンテンツの制作を担当。学習コンテンツの構造が製品の情報アーキテクチャに直接影響。' },
                  ].map(({ team, count, desc }) => (
                    <tr key={team}>
                      <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>{team}</td>
                      <td className="py-4 pr-6 text-p opacity-70 whitespace-nowrap" style={{ fontWeight: '200' }}>{count}</td>
                      <td className="py-4 text-p opacity-80" style={{ fontWeight: '200' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P className="mt-8 opacity-70">
              すべてのユニット間でデザインの方向性を一貫させ、すべての機能を期限通りに届けること——それ自体がリードの役割の核心的な挑戦でした。
            </P>
          </Container>
        </SectionBlock>

        {/* Responsibilities */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="responsibilities">主な担当範囲</H2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
              <div>
                <H3>1. チームリーダーシップ</H3>
                <UL>
                  <LI>クロスファンクショナルなデザイン・エンジニアリングチームをリードし、製品を前進させる。</LI>
                  <LI>個人の強みに合わせてタスクを割り当て、実行をサポート。</LI>
                  <LI>PMとR&Dとのコラボレーションを促進し、デザインが使いやすく技術的に実現可能であることを確保。</LI>
                </UL>
              </div>
              <div>
                <H3>2. 定期シンクミーティング</H3>
                <UL>
                  <LI>初期コンセプト探索と競合分析で製品の差別化ポイントを特定。</LI>
                  <LI>デザイン実行戦略を定義し、エンジニアリングのワークフローと整合。</LI>
                  <LI>複雑な構造と大規模機能全体でUXの一貫性を維持。</LI>
                </UL>
              </div>
              <div>
                <H3>3. デザインシステム</H3>
                <UL>
                  <LI>製品全体のビジュアルスタイルの方向性を定義。</LI>
                  <LI>高校生ユーザーの美的感覚と言語習慣に合わせてUXとビジュアル表現を調整。</LI>
                  <LI>チームとビジュアルリファレンスを収集し、一貫したデザイン言語を確立。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Background */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="background">背景</H2>
            <H3>教育アプリのプロトタイプから、K12生徒向けAI学習コンパニオンへ</H3>
            <P>
              会社にはすでに高校生向けの大学受験プラットフォームがありましたが、モバイルデバイスが普及するにつれて、チームは探求を始めました：タブレット上でより完全な学習体験を提供できないか？最初のアイデアはシンプルでした——コンピューターで収録授業を視聴しながら、タブレットで電子教材を使用するためのモバイルコンパニオンアプリ。
            </P>
            <P>
              経営陣の議論を経て、このアイデアははるかに大きなビジョンに再定義されました：パーソナライズされたAI学習コーチ。
            </P>
            <P>
              <strong>「タブレット電子教材アプリ」として始まったものが、複数回のスコープ拡張と方向転換を経て、完全に統合されたAI学習プラットフォームへと進化しました。</strong>絶えず変化するこのプロセスの中で、デザインチームは決定を現実に変換する中核的な力であり続けました。
            </P>
            <P>
              Mentor（AIスマートバッグ）が誕生しました。私はデザインリードとして、4名のデザインチームをゼロから構築・育成し、1年間でコンセプトから正式リリースまでの完全な製品を届けました。
            </P>
            <H3>解決しようとした問題</H3>
            <P>
              より良いテスト結果を求める生徒の欲求が塾プロダクトの核心的な原動力ですが、どのような学習が本当の成績向上につながるかは、非常に難しい問題です。
            </P>
            <P>
              すべての生徒が異なるスタートラインと目標を持っています：授業の強度、成績向上のペース、主要試験に向けた教科戦略——すべて異なります。クラスの下位の生徒が次のテストで成績を上げたい場合と、トップ医学部を目指す理数系の生徒とでは、全く異なるアプローチが必要です。
            </P>
            <P>
              「自分の学習ペースを管理する」ことは、ほとんどの生徒の能力を超えています。<strong>かつて、このギャップはカスタマーサービスや塾のコンサルタントが埋めており、膨大なコミュニケーションコストと人的負担を生み出していました。</strong>
            </P>
            <P>
              ビジネス面では、保護者は子どもが実際にどのように学習しているかを把握できていませんでした。学費を払っても成果（成績向上）が見えないことを恐れ、投資が報われているかを知りたがっていましたが、既存のプロダクトは満足のいく答えを提供できていませんでした。
            </P>

            {/* Parents & Students infographic */}
            <div className="flex flex-row justify-center items-center my-16 relative isolate">
              <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">保護者</p>
                  <p className="text-sm md:text-xl leading-relaxed">「学校で何を教えているのか、なぜ子どもが試験に落ち続けるのかわからない。」</p>
                </div>
              </div>
              <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-12 md:-ml-40 z-20">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">生徒</p>
                  <p className="text-sm md:text-xl leading-relaxed">「ミスを繰り返しているが、どこで間違えているのかわからない。」</p>
                </div>
              </div>
            </div>
            <p className="text-caption opacity-70 text-center mt-4">コアユーザーグループ、同じフラストレーションを共有：<br />学習進捗の可視化不足が不満を引き起こす——生徒は行き詰まり、保護者は無力感を覚える。</p>

          </Container>
        </SectionBlock>

        {/* How Might We */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <P className="mx-auto text-gray-900 opacity-60">キックオフフェーズで、PMチームと私はHMWフレームワークを使用して、経営陣やビジネスステークホルダーからの散在した意見を1つの明確なデザイン問題に集約しました：</P>
              <img src={quoteIcon} alt="quote icon" className="mb-4 rounded-lg" style={{ marginTop: '20px' }} />
              <H2 className="text-gray-900">どうすれば...</H2>
              <P className="mx-auto text-gray-900">
                <strong>不明確な学習進捗とフィードバック不足にフラストレーションを感じる生徒と保護者に対して、明確さ・モチベーション・よりパーソナライズされた次のステップの提案を感じてもらうことができるか？</strong>
              </P>
            </div>
          </Container>
        </SectionBlock>

        {/* Design Goals */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-goals">デザイン目標</H2>
            <P>HMW問題を確立した後、まず製品の機能優先度レイヤーをマッピングしました——ユーザーのベースライン期待値から、本当に喜ばれる差別化体験まで。</P>
            <img src={priorityTable} alt="Feature priority layers" className="rounded-lg mt-6" />

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3 w-[28%]" style={{ fontWeight: '500' }}>レイヤー</th>
                    <th className="pb-4 pr-6 text-h3 w-[30%]" style={{ fontWeight: '500' }}>機能</th>
                    <th className="pb-4 text-h3 w-[42%]" style={{ fontWeight: '500' }}>説明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>基本</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>動画授業、練習問題</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>ユーザーの最低限の期待値；欠如すると即時離脱につながる</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>コア</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>学習レポート、パフォーマンス追跡、ノートレビュー</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>学習ニーズを満たすプライマリ機能</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>ハイライト</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>復習リマインダー、進捗追跡、パーソナライズされた提案</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>期待を超え、定着率を高める差別化体験</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <P className="mt-16">これらの製品レイヤーを軸に、実装中にチームをガイドするための3つのデザイン目標を同時に定義しました：</P>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10 mt-16">
              <div>
                <H3>1. パーソナライズされた目標設定と学習ガイダンス</H3>
                <P>認知的負荷を軽減し方向性の感覚を構築するために、製品は各生徒のレベル・適性分析・教科別ミス履歴に基づいて学習プランをカスタマイズする必要があります。生徒はガイドされたフローに従うだけで着実に前進できます。</P>
              </div>
              <div>
                <H3>2. 明確なフィードバックと実行可能な次のステップ</H3>
                <P>漠然としたスコアではなく、進捗を示し弱点を特定し次のステップを提案するビジュアル学習レポートを生成します——保護者と生徒の両方が前進し続けるために必要な明確さを提供します。</P>
              </div>
              <div>
                <H3>3. 達成を通じたモチベーションの維持</H3>
                <P>具体的な進捗指標（ミス減少、タスク完了、学習連続記録）が感情的な勢いを生む；実績システム（バッジコレクション）はゲーミフィケーションを使って継続モチベーションを強化する。</P>
              </div>
            </div>

            <div className="bg-[#3E3AFF] rounded-lg p-8 mt-16">
              <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                <div className="order-2 md:order-1 text-center md:text-left">
                  <H2>コアコンセプト</H2>
                  <P>
                    Mentorは最終的にパーソナライズされた学習コーチとして定義されました——明確で記憶に残るコンセプトで、デザイン原則を統一しながらユーザーの感情的・機能的ニーズの両方に応え、保護者と生徒の両方にとってより親しみやすい製品にします。
                  </P>
                </div>
                <img src={mentorImg} alt="Mentor" className="w-32 h-32 md:w-48 md:h-48 order-1 md:order-2 rounded-lg" />
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* The Birth of Mentor */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="mentor-birth">Mentorの誕生</H2>
            <P>
              会社が設定した製品ビジョンに応えて、デザインとPMチームは共同でデザイン目標にAIを統合するタスクを担いました。複数回の議論を経て、Mentor——「パーソナライズされた学習コーチ」——に行き着きました。独自のワールドビルディングナラティブに包まれ、ユーザーの感情的・機能的ニーズの両方に応え、保護者と生徒の両方にとってより親しみやすい製品にします。
            </P>

            <H3>Mentorの物語</H3>
            <blockquote className="border-l-4 border-current pl-6 my-6 italic opacity-80">
              「Mentor」という名前はギリシャ神話に由来します：オデュッセウスが不在の間、息子テレマコスを導くよう信頼された賢明な守護者。
            </blockquote>
            <P>
              AIと情報過多の時代に、Mentorは導きの神となりましたが、誤って宇宙の立方体の中に閉じ込められてしまいました。力を取り戻して地球に戻るために、生徒を宇宙を旅する学習の旅に導き、成長を象徴するバッジを集めなければなりません。<strong>すべての生徒の進捗がMentorの進化を促し、学習を共同の冒険に変えます。</strong>この寓話により、アプリは単なる教育ツールを超え、生徒とMentorが共に成長する挑戦になります。
            </P>
            <P>
              パーソナライズされた学習コーチとしてのMentorの価値を伝えるため、製品デザインは一貫してMentorが単なるAIツールではなく——達成可能な目標を設定し、リズムを維持し、可視化された進捗を通じて自信を構築するためのコンパニオンであることを伝えました。このレンズを通じて、私は3つのコアデザイン目標に沿ってビジュアルデザインとUIシステムをリードしました。
            </P>

          </Container>
        </SectionBlock>

        {/* Translating the IP Soul into Visual Language */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H3>IPの魂をビジュアル言語に翻訳する</H3>
            <P>
              Mentorのワールドビルディングナラティブは骨格であり、それを生き生きとさせUIデザインに組み込むことが肉付けです。
            </P>
            <P>
              アートデザインの背景を活かして、PMチームが定義したワールドを具体的なビジュアル言語に拡張する責任を担いました：4つの学習ペルソナキャラクターデザイン、心理テストのための宇宙シーンイラストスタイル、全体的なUIバックグラウンドのアートディレクション——「魂を持つ学習コンパニオンとしてのMentor」がすべてのフレームで感じられるようにしました。
            </P>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mt-12">
            <div>
              <div className="bg-white aspect-video md:rounded-tr-lg md:rounded-br-lg overflow-hidden flex items-center justify-center">
                <img src={conceptDraft} alt="Early concept sketches" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                初期スケッチ：知性、可能性、学習パートナーシップの概念を探求。さまざまな方向性を試し融合。チームは最終的に「立方体の中のM」というビジュアルシンボルを決定——過度に擬人的にならずに記憶に残るものを選択しました。
              </p>
            </div>
            <div>
              <div className="bg-white aspect-video md:rounded-tl-lg md:rounded-bl-lg overflow-hidden flex items-center justify-center">
                <img src={ipVariants} alt="IP variants" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                各学習者のユニークな旅を反映するために、Mentorは時間とともに進化します——外見は生徒の行動、ペース、エンゲージメントに基づいて変化します。アートディレクションは同じビジュアルシリーズ内で複数のバリアントを計画する必要がありました。
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* Mentor as Interface Guide */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H3>インターフェースガイドとしてのMentor</H3>
            <img src={uiGuide} alt="Mentor UI Guide" className="w-full rounded-lg mt-8" />
            <P className="mt-8">
              Mentorは通常、画面右下隅に常駐し、ユーザーがリアルタイムでインタラクションし会話できます。彼は<strong>機能レベルで製品にIPの魂を与える鍵です：ビジュアルと機能の両方のレイヤーで機能する学習コンパニオン。</strong>
            </P>
            <P>
              <strong>ビジュアルレイヤー</strong>：Mentorは右下隅に常時浮かぶ立方体として存在し、環境モーションと宇宙エレメントを使ってインターフェースのナラティブワールドを一貫させます——「あなたの学習は宇宙を旅する旅」。
            </P>
            <P>
              <strong>機能レイヤー</strong>：Mentorは現在のコンテキストに基づいてユーザーに応答します。ソフトウェアアップデート中は励ましを提供；初回ユーザーのオンボーディングフローでは、ガイドとして機能し、教科を自信レベル順にランク付けして初期学習の好みを確立するのを助けます。アプリ内では、学習プランのリマインダーと励まし、進捗追跡のインサイトフィードバックなど、ほぼすべてのコア機能にMentorが登場します。
            </P>
            <P>
              このアプローチは機能的なインターフェースの冷たさを軽減します——会話形式のコンパニオン的なインタラクションがユーザーにより没入感のある体験を生み出します。
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div>
                <img src={screenShot1} alt="Software update screen" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">Mentorがルーチンのアップデートを励ましのインタラクションに変えます。</p>
              </div>
              <div>
                <img src={screenShot2} alt="First-time onboarding screen" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">オンボーディング中、生徒は教科を最も得意なものから最も苦手なものへと自信レベル順にランク付けします。</p>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* How I Built and Led the Team */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-leadership">チームの構築とリード</H2>
            <P>
              4名のデザインチームはかなり多様なバックグラウンドを持っていました——美術やグラフィックデザイン出身の人もいれば、フロントエンドエンジニアリング寄りの人もいました。全員がUIデザインに成長したいと考えていましたが、それぞれ異なるスタートポイントと異なる制限がありました。
            </P>
            <P>
              私の仕事は単にタスクを割り当てることではありませんでした——<strong>まず各人を理解するための時間をとることです：どこで成長したいのか、すでに何が得意で、どこでトレーニングが必要か。</strong>その基盤の上に、詳細なスケジュールを構築し、デザインチームが吸収したマーケティング素材のリクエスト、各自の現在の作業負荷、誰が行き詰まってサポートが必要かをバランスさせました。
            </P>

            <H3>カオスと発散の中でデザイン方向性を見つける</H3>
            <P>
              このプロダクトは5つの部門にまたがっており、それぞれが異なる優先事項を持っていました：経営陣にはビジョンがあり、PMには要件があり、エンジニアリングには技術的な制約があり、営業には市場圧力があり——マーケティングには宣伝キャンペーンがありました。私の仕事は、これらの声が互いに打ち消し合わず、全員が前進できる方向に収束させることでした。
            </P>
            <P>
              具体的には：ミーティングを招集し、多様な意見を集め、散在する要件を実行可能なステップに集約し、PMとステークホルダーが決定できる具体的な選択肢を提示し、方向性が確認されたらUIの品質と修正の責任を持つ。
            </P>
          </Container>

          <div className="mt-12 md:px-16 md:py-4">
            <img src={iteration1} alt="Design iteration round 1" className="w-full md:w-4/5 md:mx-auto block" />
          </div>
          <Container>
            <div className="relative mt-2">
              <ProjectNote className="hidden md:block absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32 z-10 max-w-xs text-gray-800">
                粗いコンセプトからワイヤーフレーム、UIモックアップへ——収束とイテレーションの各ラウンドがすべてのチームメンバーの製品理解を深め、ビジョンの整合とフィードバックの焦点を絞りやすくしました。
              </ProjectNote>
              <img src={iteration2} alt="Design iteration round 2" className="w-full rounded-lg" />
            </div>
            <p className="md:hidden text-caption opacity-60 mt-4 mb-4" style={{ fontWeight: '200' }}>
              粗いコンセプトからワイヤーフレーム、UIモックアップへ——収束とイテレーションの各ラウンドがすべてのチームメンバーの製品理解を深め、ビジョンの整合とフィードバックの焦点を絞りやすくしました。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <img src={wireframe1} alt="Wireframe version 1" className="md:h-full md:object-cover rounded-lg" />
              <img src={wireframe2} alt="Wireframe version 2" className="md:h-full md:object-cover rounded-lg" />
            </div>
          </Container>

          <Container>
            <H3>適切な人を適切な舞台に</H3>
            <P>
              このプロジェクトで私が行った最も重要なデザインリードの決定は、適切なタスクを適切な人に割り当てることでした。
            </P>
            <P>
              3つのキープロダクト機能——学習目標設定、学習レポート、心理テスト——はすべてチームメンバーのNomisにリードさせました。これらの3つのタスクは性質が異なりましたが、1つの共通の糸を持っていました：すべてが複雑な情報アーキテクチャ、ユーザーリサーチ、論理的推論を同時に処理することを要求していました——それがまさに私がNomisに見たものでした。
            </P>
            <P>
              学習目標設定は、生徒の権限、AIの推薦ロジック、ステップバイステップのインタラクションフローのバランスを取ることを要求しました。学習レポートはより厳しいスタートポイントを持っていました：以前のバージョンは本質的に3回繰り返される同じデータとして上層部に却下されていました。Nomisはレポートを3つの全く異なるナラティブフレームワークに再設計しました：<strong>日次レポートは実行の詳細を語り、週次レポートは行動のインサイトを明らかにし、月次レポートは成長のストーリーを語る。</strong>このフレームワークはMentorローンチのフラッグシップ機能の1つになりました。
            </P>
            <P>
              心理テストはマーケティングのニーズと製品の宇宙ワールドビルディングを融合させました。Nomisは心理学のバックグラウンドを持ち、学術研究、コンテンツプランニング、フロントエンド実装を同時に処理できました。30以上の教育心理学論文をレビューし、64のパーソナライズされた学習ペルソナアウトカムを設計——社内からもユーザーからも強い反響を受けました。
            </P>
            <P>
              これらのアウトカムはNomisのポートフォリオの中で最も強力なケースになりました。詳細はNomisの視点からの記録をご覧ください：
            </P>
            <UL>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-goal" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  学習目標設定 ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-report" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  学習レポート ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-edu-psych-quiz" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  教育心理テスト ↗ by Nomis
                </a>
              </LI>
            </UL>

            <H3>市場から学ぶ</H3>
            <P>
              意思決定は内部チームの議論の中だけで行われるものではありません——ユーザーと直接接触している人々の最前線の観察も同様に重要です。
            </P>
            <P>
              クロス部門のコミュニケーションで、営業チームはデザイン側が見落としがちな現実を浮かび上がらせました：台湾の保護者はLINEを通じて情報を消費する習慣があり、ブラウザにログインすることは彼らにとって大きな摩擦点を意味します。この洞察により、学習レポートがどれだけ優れたデザインであっても、アクセスの障壁が高すぎれば意味がないと気づきました。
            </P>
            <P>
              そこでLINEを追加の配信チャンネルとして加えました。LINE OA（LINEオフィシャルアカウント）を通じて、レポートは自動的に保護者のスマートフォンにプッシュされます——最も使い慣れたプラットフォームに届けられます。定期的なレポートプッシュやライブカスタマーサポートに加えて、LINE OAはリッチメニューを通じてアクセスできる複数の機能を統合し、ユーザーがニーズに応じてタップできるようにしました。
            </P>
            <P>
              ビジュアル表現、プッシュタイミング、インタラクションフローは最終的に私とエンジニアリングチームが共同でデザインしました。営業側のユーザーインサイトからエンジニアリング側のスペック定義まで——これは3つの部門をまたいで完結した完全な意思決定チェーンでした。
            </P>
          </Container>

          {/* LINE OA */}
          <Container>
            <div className="flex flex-col gap-8 mt-8">
              <div>
                <img src={lineTree} alt="LINE OA tree diagram" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  LINE OAのリッチメニューをどう構造化すべきか？各サービスパスはどの条件で決まるべきか？これらの問いを明確にするため、デシジョンツリーとしてマッピングしました——ロジックをチームメンバーが理解しやすく、クロス部門での議論がしやすい形にしました。
                </p>
              </div>
              <div>
                <img src={lineMenu} alt="LINE OA rich menu" className="rounded-lg w-full md:w-1/2 md:mx-auto block" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  リッチメニューはマーケティング戦略（最も目立つボタン＝プライマリ製品）とユーザービリティのバランスを取ることが求められ、ビジュアルデザインに多大な労力が注がれました。
                </p>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Design System */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-system">スケーラブルなデザインシステム</H2>
            <P>
              デザインリードとして、製品全体のビジュアルスタイルをディレクションし、チームをリードして明確で一貫したデザインシステムを構築しました。プライマリユーザーは中高校生であるため、彼らのビジュアルの好みと言語習慣に対応する必要がありました——これによりデザインはより困難になりました。
            </P>
            <P>
              チームメンバーのデータ収集とスタイル探索をコーチングし、FigmaでUIシステムを実際に構築しました——色とタイポグラフィの階層の計画方法とコンポーネントライブラリの構築方法をデモンストレーションし、すべてのUIデザイナーに必要な基礎的な知識とスキルを積極的に発展させました。
            </P>
            <P>
              <strong>このデザインシステムは、その後のすべての機能インターフェースのベースラインとなりました</strong>。機能を担当する誰もが参照できる明確な基準を持ち、新しい要素もシステムのアーキテクチャに従って追加できます。
            </P>
          </Container>
        </SectionBlock>

        <SectionBlock className="!py-0" backgrounds={mentorBackgrounds}>
          <img src={designSystem} alt="Design system" className="w-full" />
        </SectionBlock>

        {/* UI Design */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="ui-design">ワールドと製品ビジョンに基づいたインターフェースデザイン</H2>
            <P>デザインシステムが整ったことで、すべての機能インターフェースはこのビジュアル言語の上に構築されました。目標は使いやすさだけでなく、すべての画面でMentorのワールドの存在をユーザーに感じさせることでした。</P>
          </Container>

          {/* Role Labels */}
          <Container className="mt-12">
            <H3>冷たい数字ではなくロールラベル</H3>
            <P>
              Mentorは生徒が週の学習日と時間を自由に選択できるようにガイドし、実際のニーズと生活リズムに合わせます。
            </P>
            <ImageWithHotspots
              src={personaUi1}
              alt="Learning persona UI design"
              hotspots={learningPersonaHotspots}
              className="rounded-lg mt-6"
            />
            <P className="mt-8">UIを単なる冷たい数字にしたくありませんでした。チームの議論の末、週の学習時間を4つのペルソナラベル（リラックス学習者、勤勉な生徒、学業成就者、トップスカラー）に変換することにしました——数字をアイデンティティに変えます。Mentorは週の学習時間に基づいて生徒がどのペルソナに属するかを表示します。</P>
            <img src={typesImg} alt="Learning persona labels" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決する痛点</p>
              <P>生徒は学習において方向性の感覚を欠き、どこから始めればいいかわからない。</P>
              <p className="font-medium text-white mb-3 mt-6">デザイン決定</p>
              <P>数字をアイデンティティに変えるプレイフルな自己評価システムで学習モチベーションを高める。生徒は単に時間のコミットメントを設定するのではなく——<strong>なりたい自分を選んでいる</strong>、内発的動機から学習の旅の最初の一歩を構築します。</P>
            </div>
          </Container>

          {/* Information Hierarchy */}
          <Container className="mt-20">
            <H3>情報階層デザイン</H3>
            <P>
              学習目標設定はカレンダーと週次プランのデュアルモードビューで提示され、異なる習慣を持つ学習者が切り替えられます。教科の色ブロックがプライマリビジュアルアンカーとなり、トピックタイトルが続き、推定時間と完了ステータスが補足情報として機能します。生徒は一行一行読まずにスキャンして必要なものを見つけられます。
            </P>
            <ImageWithHotspots
              src={screenShot4}
              alt="Learning goal setting interface"
              hotspots={[
                { id: 'point2', x: 38, y: 44, content: '各色付きドットは異なる教科を示します。', arrowPosition: 'bottom' },
                { id: 'point3', x: 78, y: 34, content: '学習プランの日次概要。', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <img src={goalCalendar} alt="Learning goal calendar view" className="rounded-lg mt-6" />
            <p className="text-caption opacity-50 mt-2">Figmaで詳細なコンポーネント状態とインタラクションフローをマッピング</p>
            <P className="mt-6">学習レポートは異なる時間軸で構成され、それぞれ独自のビジュアライゼーションアプローチを持ちますが——すべて同じビジュアルシステムを使用します。</P>
            <P>日次レポートはリストベースの構造を使用し、高い情報密度で各学習ユニットの完了詳細を強調します；週次レポートはチャートコンポーネントを導入し、数値トレンドが一目で読めるようにします；月次レポートはレーダーとドーナツチャートをプライマリビジュアルの中心に置きます。</P>
            <img src={reportWeekly} alt="Weekly report" className="rounded-lg mt-4" />
            <P className="mt-6">時間軸が長くなるほど、レポートは「トレンド」に焦点を当てます——保護者が行ごとの数字ではなく全体的なパターンを通じて学習進捗を理解できるように。</P>
            <img src={reportMonthly} alt="Monthly report" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決する痛点</p>
              <P>学習記録は量が多く、乾燥していて、次のステップのプロンプトがない——進捗計画が難しく、長期成長が見えない。</P>
              <p className="font-medium text-white mb-3 mt-6">デザイン決定</p>
              <P>慎重に階層化された情報構造により、生徒と保護者はプランの全体像を見ながら詳細にも掘り下げられます。過去を振り返り未来を見通せる能力が安心感をもたらします。</P>
            </div>
          </Container>

          {/* Badges */}
          <Container className="mt-12">
            <H3>マイルストーンをコレクタブルなビジュアル言語に変える</H3>
            <P>
              すべてのバッジは独自のビジュアルデザインを持っています。宇宙アートシステムの中で、これらのバッジは単なる報酬ではなく——Mentorワールドの拡張です。
            </P>
            <P>ゲーミフィケーションデザインを適用し、すべての生徒のマイルストーンが彼らの学習の冒険に残された痕跡になります。実績の殿堂の展示インターフェースは意図的にコレクタブルでブラウザブルにデザインされています——進捗追跡とアンロックフィードバックがコレクト欲を満たし、習慣形成を強化します。</P>
          </Container>

          <Container>
            <ImageWithHotspots
              src={screenShot6}
              alt="Hall of Achievements"
              hotspots={[
                { id: 'point1', x: 28, y: 8, content: '生徒はコレクション進捗を確認できます。', arrowPosition: 'bottom' },
                { id: 'point2', x: 52, y: 50, content: '各バッジは独自のビジュアルデザインを持ち、「実績の殿堂」インターフェースに展示されます。', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <p className="text-caption opacity-50 mt-2">実績の殿堂では、各タスクに紐づくすべてのバッジを生徒がブラウズできます。一部はシリーズバッジ——タスクをより徹底的に完了するほど、初心者からマスターへと高いティアを獲得できます。他は固有のスペシャルバッジで、ほとんどが予期しないトリガーでアンロックされます。</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img src={screenShot7} alt="Earned badges" className="rounded-lg" />
              <img src={screenShot8} alt="Locked badges" className="rounded-lg" />
            </div>
          </Container>

          <Container>
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決する痛点</p>
              <P>成績向上だけを追うのは意欲をそぐ——学習者は継続するための持続的な動機がない。</P>
              <p className="font-medium text-white mb-3 mt-6">デザイン決定</p>
              <P>コースの完了と学習連続記録の達成でバッジを獲得——即時フィードバックで動機を維持し、実績バッジの励ましで生徒が次の学習タスクに取り組む意欲を与えます。</P>
            </div>
          </Container>
        </SectionBlock>

        {/* Results */}
        <SectionBlock bgVariant="purple" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="results">成果</H2>
            <P>
              リリース後、<strong>90%の生徒が手動設定ではなくAIを使ってパーソナライズされた学習パスを構築することを選択</strong>——「パーソナライズされた次のステップの提案」というデザイン目標が本当に受け入れられたことの直接的な証拠です。
            </P>
            <P>
              営業チームによると、学習レポートは保護者が子どもの日次・週次・月次の学習状況を初めて明確に確認できるようにしました——「塾への投資は本当に報われているのか」というコアな不安に具体的な答えをもたらしました。
            </P>

            <H3 className="mt-12">主要な影響</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: 'Mentorは会社のフラッグシップAI製品ラインになった',
                  desc: '制約のある環境でゼロからイチへの完全な製品デザインシステムを構築できることを証明。',
                },
                {
                  title: '継続して機能するデザインシステム',
                  desc: '私が確立したデザインシステムとコラボレーションワークフローは、退職後も製品の反復をサポートし続けた。',
                },
                {
                  title: 'プロアクティブで協力的なチームカルチャー',
                  desc: 'メンバーはお互いの強みを理解し、助け合い方を知っている。私が構築したカルチャーが自律運営の基盤となった。',
                },
                {
                  title: '会社のデザインチームに対する認識を変えた',
                  desc: 'デザイナーはもはやビジュアルアウトプットだけの責任者ではなく——製品思考とクロスファンクショナルコミュニケーションスキルを持つ戦略的パートナーとして見られるようになった。',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="p-8 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-medium mb-3">{title}</p>
                  <P className="opacity-70 !mb-0">{desc}</P>
                </div>
              ))}
            </div>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="reflection">学習と振り返り</H2>
            <P>
              このプロジェクトを通じて、「物事をやる」から「適切な人が適切なことをやる」に焦点を移すことを学びました。実践を通じて、チームをリードするためのコアマインドセットを理解しました：完璧さよりも重要なのはリソースと期待のバランスをとること。実行中に欠かせないと感じた3つの原則：
            </P>

            <div className="flex flex-col gap-12 mt-8">
              <div>
                <H3>情報を透明に保ち、コミュニケーションチャンネルを開放する</H3>
                <P>
                  野心的な製品ビジョンと複雑な要件があるため、明確でタイムリーなコミュニケーションが不可欠になりました。要件は速く劇的に変わります——効果的なコミュニケーションチャンネルなしには、簡単に遅れをとります。
                </P>
                <P>
                  以前は、フォロワーであることがデフォルトでした。しかしこのプロジェクトのために、遠回しなコミュニケーションの習慣を克服し、デザインやクロス部門の議論でプロアクティブに発言することを学び、すべてのチームメンバーが大胆に意見を述べることを奨励しました——<strong>デザインチームを受動的なタスク実行者から、真の製品思考を持つ意思決定者へと変革しました。</strong>
                </P>
              </div>
              <div>
                <H3>市場から学ぶ</H3>
                <P>
                  内部チームの議論とリサーチを超えて、営業チームからのフィードバックを重視することを学びました。彼らは潜在的な顧客と直接接触している——本当のニーズに最も近い人々です。彼らのインサイトは製品の競争力を強め、プロジェクト期間中チームメンバーが彼らと積極的に関わることを奨励しました。<strong>デザイナーの視点を中心にした決定を避けるため</strong>に彼らの視点を活用しました。
                </P>
              </div>
              <div>
                <H3>チームの成長をサポートする</H3>
                <P>
                  個別のインタビューを通じて各メンバーの動機と期待を理解し、成長を助けるタスクを割り当て、プロアクティブな学習を奨励しました。<strong>彼らはそれぞれの仕事を通じて何かを得ました——新しい技術を試す機会、独自のアイデアを表現する場、あるいはリードする実際の経験</strong>——それぞれ自分のキャリアに残る意義ある実績を加えました。
                </P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Conclusion */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="flex flex-col items-center text-center">
            <P className="w-full md:w-2/3 opacity-80">
              Mentorをデザインするということは、画面を形作るだけではありませんでした——チームを、ストーリーを、そして学習への共通の信念を形作ることでした。
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              最初は「実行者」に傾いていました：ピクセル、フロー、UIの洗練度に集中していました。しかし製品がスケールするにつれて、クロスファンクショナルに統合し、チームメンバーを力づけ、より大きな方向性を守ることを——リーダーの視点から——学んでいきました。
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              これらの経験を通じて、個人のコントリビューターからデザインマネージャーへと成長しました：より明確にコミュニケーションし、異なる役割の中から問題を考えるように。最も重要なことは、優れたデザインとは完璧な成果物を届けることだけではなく——チームの努力と会社の期待を整合させることだと学びました。それが長く続けられる方法です。
            </P>
            <img src={mentorImg} alt="Mentor" className="h-32 w-32 md:h-48 md:w-48 rounded-lg mt-12 mb-4" />
            <p className="text-p opacity-80">Mentor</p>
            <p className="text-p opacity-60">2023/08 - 2024/06</p>
          </Container>
        </SectionBlock>

        <RelatedProjects currentSlug="mentor" />
        <Footer />
      </main>
    </div>
  )
}
