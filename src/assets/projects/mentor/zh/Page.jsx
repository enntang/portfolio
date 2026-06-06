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

export default function MentorZhPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const learningPersonaHotspots = [
    { id: 'point2', x: 78, y: 55, content: '系統會顯示學生類型。', arrowPosition: 'bottom' },
    { id: 'point3', x: 12, y: 20, content: '建立學習計畫共有 4 個步驟：1. 選擇學習期間 2. 選擇每週學習日 3. 設定學習目標 4. 確認計畫。', arrowPosition: 'bottom' },
  ]
  const learningGoalHotspots = [
    { id: 'point1', x: 18, y: 14, content: '流程最後，系統會顯示學習計畫；學生可在時間軸與月曆視圖之間切換，以查看規劃內容。', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: '不同顏色的圓點代表不同的學習科目。', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: '單日學習內容概覽。', arrowPosition: 'bottom' },
  ]
  const learningReportHotspots = [
    { id: 'point1', x: 38, y: 4, content: '報表涵蓋三種時間維度：每日、每週與每月，分別呈現不同深度的學習狀況。', arrowPosition: 'bottom' },
    { id: 'point2', x: 8, y: 44, content: '家長可以在不同孩子之間切換查看報表。', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: '學生的學習表現與進度總覽。', arrowPosition: 'bottom' },
  ]
  const badgeCollectionHotspots = [
    { id: 'point1', x: 28, y: 4, content: '學生可以查看自己的收集進度。', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: '每枚徽章都有獨特的視覺識別，並在「成就殿堂」介面中展示。', arrowPosition: 'bottom' },
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
              <H3 className="mb-4">不只是做產品，更是建立團隊</H3>
              <P className="w-full md:w-2/3 mb-24">
                一年從 0 到 1 打造整合 AI 的學習平台
              </P>
              <img ref={arrowDownRef} src={arrowDown} alt="往下捲動" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* 專案概覽 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="project-brief">專案概覽</H2>
            <img src={tabletMockup} alt="Mentor 設計預覽" className="rounded-lg mb-12 transition-transform duration-500 ease-out hover:scale-105" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-4">
              <div className="md:col-span-2">
                <P>
                  學習規劃從來都不是一件容易的事，每個學生的起點不同、目標不同，自己安排學習進度本就超出多數學生的能力範圍。過去，這個缺口靠客服與顧問人力填補，成本高、無法規模化。Mentor（AI 智能書包）就是為了解決這個根本問題而生的。
                </P>
                <P>
                  在這個專案裡，我擔任 Design Lead，從零開始組建並帶領一支設計團隊，合作對象跨越 PM、研發、行銷、課程五個單位，在持續擴張的需求與不斷變動的方向中，用一年的時間完成整個產品從概念到落地的完整交付。<strong>產品上線後，90% 的學生選擇採用 AI 建立學習路徑</strong>，而我培育的第一位設計師 Nomis，在我離開後接任了我的主管職位。
                </P>
                <blockquote className="border-l-4 border-current pl-6 mt-8 italic opacity-70">
                  這個專案讓我確信：Design Lead 的工作，不只是做出好的設計，而是建立一個讓好設計得以發生的團隊。
                </blockquote>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-h3">職稱</p>
                <P>Design Lead</P>
                <p className="text-h3">時間</p>
                <P>2023 – 2024</P>
                <p className="text-h3">負責範圍</p>
                <P>團隊組建與調度、需求收斂與設計方向提案、UI 系統建立與品質把關、跨職能協作、視覺美術設定主導</P>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-current/20">
              {[
                { stat: '1 年', label: '從 0 到 1 落地上線', sub: '完整產品從概念到交付' },
                { stat: '15+', label: '跨單位協作人數', sub: '設計、PM、RD、行銷、課程' },
                { stat: '90%', label: '採用 AI 建立路徑', sub: '設計決策被用戶接受' },
                { stat: '培育接班人', label: '團隊成員晉升主管', sub: '培育的人才接任職位' },
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

        {/* 團隊規模與協作架構 */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-structure">團隊規模與協作架構</H2>
            <img src={teamChart} alt="團隊架構圖" className="rounded-lg mb-12 mt-6" />
            <P>這個專案涉及多個平行單位的緊密協作，設計並非孤立運作，而是整個產品生態系的一部分：</P>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3" style={{ fontWeight: '500' }}>單位</th>
                    <th className="pb-4 pr-6 text-h3 whitespace-nowrap" style={{ fontWeight: '500' }}>人數</th>
                    <th className="pb-4 text-h3" style={{ fontWeight: '500' }}>協作說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  {[
                    { team: '設計團隊', count: '5 人（含我）', desc: '涵蓋 UI 設計、美術設定、前端切版實作。' },
                    { team: 'PM 團隊', count: '4 人', desc: '負責產品方向與需求定義，設計決策最終由 PM 主管拍板。' },
                    { team: '研發工程師', count: '4 人', desc: '負責功能開發與技術實作，與設計直接協作確認技術可行性與規格。' },
                    { team: '行銷團隊', count: '2 人', desc: '設計部同時承接行銷文宣需求，需在產品設計與行銷任務之間彈性調度資源。' },
                    { team: '課程部門', count: '多人', desc: '專職產出 K12 各科教學內容，學習內容的結構直接影響產品的資訊架構設計。' },
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
              能在這個跨單位的環境裡讓設計方向保持一致、讓每個功能如期交付，本身就是這個 Lead 角色最核心的挑戰之一。
            </P>
          </Container>
        </SectionBlock>

        {/* 主要職責 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="responsibilities">主要職責</H2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
              <div>
                <H3>1. 團隊領導</H3>
                <UL>
                  <LI>帶領跨設計與工程團隊推進產品。</LI>
                  <LI>依據成員優勢分配任務，協助其思考與落地。</LI>
                  <LI>促進與 PM、R&D 協作，確保設計成果兼顧可用性與可行性。</LI>
                </UL>
              </div>
              <div>
                <H3>2. 主持定期交流會議</H3>
                <UL>
                  <LI>早期概念探索與競品分析，找出產品差異化切入點。</LI>
                  <LI>設計執行策略，與工程端的工作流對齊。</LI>
                  <LI>在複雜結構與大型需求下，兼顧使用者體驗與整體一致性。</LI>
                </UL>
              </div>
              <div>
                <H3>3. 設計系統建立</H3>
                <UL>
                  <LI>制定產品整體視覺風格方向。</LI>
                  <LI>依國高中主要使用者的審美與語言習慣調整 UX 與視覺表現。</LI>
                  <LI>與團隊蒐集與整理視覺參考，建立一致的設計語言。</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* 背景 */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="background">背景</H2>
            <H3>從一個教育 App 的雛形，到 K12 學生的 AI 學習夥伴</H3>
            <P>
              公司旗下已有一款服務國高中學生的升學輔助平台，但隨著行動裝置的普及，團隊開始思考：能不能讓學生在平板上獲得更完整的學習體驗？最初的構想很單純：一個行動端的延伸產品，讓學生一邊在電腦觀看錄播課程、邊用平板觀看電子書教材。
            </P>
            <P>
              但在高層的一連串討論後，這個想法被重新定義成更大的目標：結合 AI 的個人化學習教練。
            </P>
            <P>
              於是，<strong>這個產品從「平板電子書 App」的最初構想，歷經多次需求擴充與方向調整，最終成長為整合 AI 的完整學習平台。</strong>設計團隊在這整個不斷變動的過程中，始終是讓各方決策能夠落地的核心。
            </P>
            <P>
              Mentor（AI 智能書包）就此誕生。我在這個專案中擔任 Design Lead，從零開始組建並帶領一支四人設計團隊，在一年內完成產品從概念到上線的完整交付。
            </P>
            <H3>我們要解決什麼問題</H3>
            <P>
              學生對考試成績的追求是推動補教產品發展的剛性需求，而何種學習方式才會有實質進步，是一個難以解決的大哉問。
            </P>
            <P>
              每一個學生的起點不同、目標不同：課程強度、進步幅度、大考考科的策略選擇，沒有一個放諸四海皆準的答案。例如，處於後段班程度的學生想在下次段考有所進步、數理資優班學生想挑戰國立醫科，這兩種類型本身需要的複習策略一定不同。
            </P>
            <P>
              「安排自己的學習進度」這件事，對大多數學生來說本就超出能力範圍。<strong>過去，這個缺口靠客服與顧問人力填補，產生了巨大的溝通成本與人力損耗。</strong>
            </P>
            <P>
              另一方面，從業務端得知的現況是，家長通常不曉得學生的學習狀況，害怕投注心力卻沒有得到實質收穫（成績進步），渴望「補習花費有所回饋」，但在現有產品中並沒有良好的解方。
            </P>

            {/* 家長 & 學生 圈圈 infographic */}
            <div className="flex flex-row justify-center items-center my-16 relative isolate">
              <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">家長</p>
                  <p className="text-sm md:text-xl leading-relaxed">「我不知道學校在教什麼，也不知道孩子為什麼考不好。」</p>
                </div>
              </div>
              <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-12 md:-ml-40 z-20">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">學生</p>
                  <p className="text-sm md:text-xl leading-relaxed">「我一直做錯，卻不知道錯在哪裡。」</p>
                </div>
              </div>
            </div>
            <p className="text-caption opacity-70 text-center mt-4">產品的核心族群，雙方都有同樣的困擾：<br />對學習進度缺乏清楚認知，導致挫折感—學生覺得沒有變好，家長則覺得無從協助。</p>

          </Container>
        </SectionBlock>

        {/* How Might We */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <P className="mx-auto text-gray-900 opacity-60">於是，在 Kickoff 階段，我與 PM 透過 HMW 框架，將來自高層與業務的分散需求，收斂成一個清楚的設計問題：</P>
              <img src={quoteIcon} alt="quote icon" className="mb-4 rounded-lg" style={{ marginTop: '20px' }} />
              <H2 className="text-gray-900">How Might We...</H2>
              <P className="mx-auto text-gray-900">
                <strong>我們如何協助學習進度不清、缺乏回饋而感到挫折的學生與家長，建立清晰感、動機，以及更個人化的下一步建議？</strong>
              </P>
            </div>
          </Container>
        </SectionBlock>

        {/* 設計目標 */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-goals">設計目標</H2>
            <P>在確立 HMW 問題之後，我們先梳理了產品功能的優先層次：從使用者的基本期待，到真正讓人驚艷的差異化體驗。</P>
            <img src={priorityTable} alt="功能優先層次" className="rounded-lg mt-6" />

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3 w-[28%]" style={{ fontWeight: '500' }}>層次</th>
                    <th className="pb-4 pr-6 text-h3 w-[30%]" style={{ fontWeight: '500' }}>功能</th>
                    <th className="pb-4 text-h3 w-[42%]" style={{ fontWeight: '500' }}>說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>基本層</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>觀看課程影片、題目練習</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>使用者的最低期待，缺乏則直接流失</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>核心層</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>學習報告、練習表現、筆記複習</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>滿足學習需求的主要功能</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>亮點層</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>複習提醒、進度追蹤、個人化學習建議</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>超越期待、強化黏著度的差異化體驗</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <P className="mt-16">緊扣著產品層次，我同步定義了三個設計目標，提供團隊成員在實作時可依循的準則：</P>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10 mt-16">
              <div>
                <H3>1. 個人化目標設定與學習引導</H3>
                <P>為降低認知負荷並建立方向感，產品須依學生程度、適性分析與各科錯題紀錄來客製化讀書計畫。學生只要跟著引導逐步完成，就能穩定進步。</P>
              </div>
              <div>
                <H3>2. 清楚易懂的回饋與下一步</H3>
                <P>不再只給模糊的分數，產品將生成視覺化學習報表，呈現進度、指出弱點並提供下一步建議，讓家長與學生都能在清楚的資訊下持續前進。</P>
              </div>
              <div>
                <H3>3. 透過成就感強化動機</H3>
                <P>以具體進度指標（錯誤減少、任務完成、連續學習等）建立情緒動能，並以成就系統（徽章收集）以遊戲化的方式加強持續努力的動機。</P>
              </div>
            </div>

            <div className="bg-[#3E3AFF] rounded-lg p-8 mt-16">
              <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                <div className="order-2 md:order-1 text-center md:text-left">
                  <H2>核心理念</H2>
                  <P>
                    Mentor 最終被定義為一位個人化學習教練：這個清楚且好記的概念，統一了設計原則，同時回應使用者的情感與功能需求，讓產品對家長與學生都更具親和力。
                  </P>
                </div>
                <img src={mentorImg} alt="Mentor" className="w-32 h-32 md:w-48 md:h-48 order-1 md:order-2 rounded-lg" />
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Mentor 的誕生 */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="mentor-birth">Mentor 的誕生</H2>
            <P>
              因應公司賦予的產品願景，設計與 PM 團隊同時肩負將設計目標融合 AI 的任務，在多次討論後，設計出了 Mentor ——「一位個人化學習教練」，以特殊的世界觀加以包裝，同時回應使用者的情感與功能需求，讓產品對家長與學生都更具親和力。
            </P>

            <H3>Mentor 的故事</H3>
            <blockquote className="border-l-4 border-current pl-6 my-6 italic opacity-80">
              「Mentor」一詞源自希臘神話：一位睿智的守護者，被託付在奧德修斯遠行時引導他的兒子。
            </blockquote>
            <P>
              在 AI 與資訊超載的時代，Mentor 成為指引之神，卻意外被困在宇宙方塊中。為了取回力量並回到地球，他必須引導學生穿越宇宙展開學習旅程，收集象徵成長的徽章。<strong>每位學生的進步都會推動 Mentor 的進化，讓學習成為共同冒險。</strong>這段寓言故事讓 App 體驗不僅是教育工具，更像是一場學生與 Mentor 共同成長的挑戰。
            </P>
            <P>
              為了傳達 Mentor 作為個人化學習教練的價值，我們在產品設計中多次傳達：Mentor 不只是一個 AI 工具，而是陪伴學生設定可達成目標、保持節奏、並在可見進步中建立自信的教練。以此視角，我主導了視覺設計與 UI 系統建立，並與三個核心設計目標對齊。
            </P>

          </Container>
        </SectionBlock>

        {/* 把 IP 的靈魂譯成視覺語言 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H3>把 IP 的靈魂譯成視覺語言</H3>
            <P>
              Mentor 的世界觀與故事主軸是骨架，將其具象化並融入 UI 設計則是賦予血肉的必要工作。
            </P>
            <P>
              我用美術設計背景，負責把 PM 定義的世界觀展開成具體的視覺語言：學習人格的四種角色視覺設計、心理測驗裡的宇宙場景插圖風格、整體 UI 的背景美術設定，讓「Mentor 作為一個有靈魂的學習夥伴」這個核心理念在每一幀畫面裡都能被感受到。
            </P>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mt-12">
            <div>
              <div className="bg-white aspect-video md:rounded-tr-lg md:rounded-br-lg overflow-hidden flex items-center justify-center">
                <img src={conceptDraft} alt="早期概念草圖" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                早期草圖：展開智慧、潛力、學習夥伴等概念，多方嘗試及相互融合，最後與團隊夥伴一起決議使用「方塊中的 M 字」這個視覺符號，避免太過擬人，也便於記憶。
              </p>
            </div>
            <div>
              <div className="bg-white aspect-video md:rounded-tl-lg md:rounded-bl-lg overflow-hidden flex items-center justify-center">
                <img src={ipVariants} alt="IP 多種變化體" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                為反映每位學習者的獨特旅程，Mentor 會隨時間進化，其外觀會依學生行為、步調與投入方式而改變。因此在美術設計上也需規劃同系列中的多種變化體。
              </p>
            </div>
          </div>
        </SectionBlock>

        {/* ui-guide: image left, text right */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H3>Mentor 作為介面引導者</H3>
            <img src={uiGuide} alt="Mentor UI Guide" className="w-full rounded-lg mt-8" />
            <P className="mt-8">
              Mentor 基本會待在畫面右下角，讓使用者可以即時對話、互動。他是<strong>基於功能訴求上形成產品 IP 靈魂的關鍵：一個同時在視覺層與功能層運作的學習夥伴。</strong>
            </P>
            <P>
              <strong>視覺層</strong>：Mentor 以懸浮方塊的形式常駐在畫面右下角，透過環境動態與宇宙元素，讓整個介面的敘事世界保持連貫，「你的學習而是一段宇宙旅程。」
            </P>
            <P>
              <strong>功能層</strong>：Mentor 會依據使用者當下的情境給出對話與回應。軟體更新時給予鼓勵；首次使用 App 的 Onboarding 流程中，化身引導者帶領學習者按照自信程度排列科目強弱，初步建立個人學習偏好。到正式進入 App 後，幾乎每一個核心功能也都有 Mentor 的身影：學習計畫的提醒與鼓勵、進度追蹤的洞察回饋等。
            </P>
            <P>
              這樣的呈現方式可以降低功能介面的冰冷感，以夥伴身份的對話過程能讓使用者更有沉浸體驗。
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div>
                <img src={screenShot1} alt="軟體更新畫面" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">Mentor 讓例行更新變成鼓勵式互動。</p>
              </div>
              <div>
                <img src={screenShot2} alt="首次引導畫面" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">首次引導中，學生需要依自信程度把科目從強到弱排序。</p>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* 我如何組建並帶領團隊 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-leadership">我如何組建並帶領團隊</H2>
            <P>
              這支四人設計團隊的背景相當多元，有人來自美術與平面設計，有人偏向前端工程，每個人都想往 UI 設計發展，但各自的能力起點和限制都不同。
            </P>
            <P>
              我的工作不是直接分派任務，而是<strong>先花時間了解每個人：他們想往哪個方向成長、目前最擅長什麼、又在哪裡需要事先接受教育訓練。</strong>在這個基礎上，我才開始做細緻的排程調度，同時考量設計部承接的行銷文宣工作、每個人的現有進度，以及誰在哪個環節卡住了需要拉人進來協助。
            </P>

            <H3>在混亂與分歧中找到設計方向</H3>
            <P>
              這個產品橫跨五個單位，每個人帶著不同的優先順序進來：高層有願景、PM 有需求、RD 有技術限制、業務有市場壓力；同時也要和行銷單位配合推廣任務。我的工作，是讓這些聲音不互相抵消，而是收斂成一個大家都能往前走的方向。
            </P>
            <P>
              具體來說：召集會議、凝聚各方意見、把分散的需求濃縮成可執行的步驟，提出具體方案讓 PM 與主管做選擇，並在最終方案確認後負責 UI 視覺呈現的把關與修正。
            </P>
          </Container>

          <div className="mt-12 md:px-16 md:py-4">
            <img src={iteration1} alt="設計迭代第一輪" className="w-full md:w-4/5 md:mx-auto block" />
          </div>
          <Container>
            <div className="relative mt-2">
              <ProjectNote className="hidden md:block absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32 z-10 max-w-xs text-gray-800">
                從粗略概念到 wireframe，再到 UI Mockup，每一次畫面的收斂和迭代都幫助每位成員更加理解產品的概貌，有利於大家凝聚共識、針對重點提出想法。
              </ProjectNote>
              <img src={iteration2} alt="設計迭代第二輪" className="w-full rounded-lg" />
            </div>
            <p className="md:hidden text-caption opacity-60 mt-4 mb-4" style={{ fontWeight: '200' }}>
              從粗略概念到 wireframe，再到 UI Mockup，每一次畫面的收斂和迭代都幫助每位成員更加理解產品的概貌，有利於大家凝聚共識、針對重點提出想法。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <img src={wireframe1} alt="線稿第一版" className="md:h-full md:object-cover rounded-lg" />
              <img src={wireframe2} alt="線稿第二版" className="md:h-full md:object-cover rounded-lg" />
            </div>
          </Container>

          <Container>
            <H3>賦予能者舞台，識人用人的 Lead 決策</H3>
            <P>
              這個專案裡，我最重要的 Design Lead 決策是把對的任務交給了對的人。
            </P>
            <P>
              產品中的三個重要功能：學習目標設定、學習報告、心理測驗，我都交給了設計團隊成員 Nomis 主導。這三個任務性質不同，卻有一個共同點：它們都需要同時處理複雜的資訊架構、使用者研究與邏輯推導，而這正是我在 Nomis 身上看見的能力。
            </P>
            <P>
              學習目標設定需要在學生授權範圍、AI 推薦邏輯、操作步驟三者之間取得平衡；學習報告則有一個更棘手的起點：前一版被大主管打槍，原因是三份報告本質上只是數據的重複堆疊。Nomis 把學習報告重新設計成三個截然不同的敘事邏輯：<strong>日報說執行細節、週報說行為洞察、月報說成長故事</strong>。這個框架最終成為 AI 智能書包上線後的主打亮點功能。
            </P>
            <P>
              心理測驗功能則融合了行銷需求與產品 IP 的宇宙世界觀。他有心理學背景，有能力同時處理學術研究、內容規劃與前端實作。他研究了 30+ 篇教育心理學文獻，設計出 64 種個人化學習人格結果，在公司內部反應與使用者回饋中都取得了好成績。
            </P>
            <P>
              這些成果後來成為 Nomis 作品集裡最強的案例之一，詳細可參考以 Nomis 視角呈現的紀錄：
            </P>
            <UL>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-goal" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  學習目標設定 ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-report" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  學習報告 ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-edu-psych-quiz" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  教育心理測驗 ↗ by Nomis
                </a>
              </LI>
            </UL>

            <H3>傾聽業務團隊，讓設計真正貼近市場</H3>
            <P>
              決策的起點不只會發生在團隊內部討論，實際接觸用戶的第一線觀察也很重要。
            </P>
            <P>
              在跨部門的溝通中，業務同仁反映了一個我們在設計端容易忽略的現實：台灣的家長習慣用 LINE 掌握資訊，登入瀏覽器對他們來說是一個不小的摩擦。這個洞察讓我們意識到，學習報告規劃得再完善，如果開啟使用的摩擦力太高也是枉然。
            </P>
            <P>
              於是我們把將報告的取得流程，追加 LINE 這一個渠道。透過 LINE OA（LINE Official Account）定時推播到家長手機，送到他們最熟悉的地方。LINE OA 中，除了定時推播學習報告以及真人客服之外，還結合了許多功能，透過圖文選單讓使用者可以依照需求點選。
            </P>
            <P>
              視覺呈現方式、推播時機與操作流程，最終由我與 RD 工程師共同制定落地。從業務端的使用者洞察，到技術端的規格制定，這是一個跨三個單位共同完成的完整決策鏈。
            </P>
          </Container>

          {/* LINE OA 上下排 */}
          <Container>
            <div className="flex flex-col gap-8 mt-8">
              <div>
                <img src={lineTree} alt="LINE OA 樹狀圖" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  如何安排 LINE OA 及圖文選單提供的服務？背後需要判斷的條件是什麼？為了釐清這些問題，我用樹狀圖的方式整理後讓同仁便於理解其中的關聯，便於跨部門討論。
                </p>
              </div>
              <div>
                <img src={lineMenu} alt="LINE OA 圖文選單" className="rounded-lg w-full md:w-1/2 md:mx-auto block" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  圖文選單需顧及到行銷策略（主打產品的按鈕最顯眼）及操作便利，在視覺設計上花了很多功夫。
                </p>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* 具有擴展性的設計系統 */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-system">具有擴展性的設計系統</H2>
            <P>
              身為 Design Lead，我主導了產品的整體視覺風格，並帶領團隊建立一套清晰一致的設計系統。由於主要用戶是國高中學生，我們需要配合他們的視覺偏好與語言習慣，這讓設計更具挑戰。
            </P>
            <P>
              我輔導團隊成員進行資料搜集、風格發想，並在設計過程中動手在 Figma 製作 UI System，說明如何規劃色彩與文字層級、建立元件庫，實際培養團隊成員養成 UI 設計師的必備知識與技能。
            </P>
            <P>
              <strong>這個設計系統成為後續每一個新功能介面設計時的基準</strong>，無論誰接手任一功能時都有所依據；若要加入新元素時也能依循系統架構進行擴展。
            </P>
          </Container>
        </SectionBlock>

        <SectionBlock className="!py-0" backgrounds={mentorBackgrounds}>
          <img src={designSystem} alt="設計系統" className="w-full" />
        </SectionBlock>

        {/* 圍繞世界觀與產品訴求展開的介面設計 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="ui-design">圍繞世界觀與產品訴求展開的介面設計</H2>
            <P>設計系統建立之後，每一個功能介面都在這套視覺語言的基礎上展開。不只要讓功能好用，更要讓使用者在每一個畫面裡都感受到 Mentor 世界觀的存在。</P>
          </Container>

          {/* 用角色標籤取代冰冷數字 */}
          <Container className="mt-12">
            <H3>用角色標籤取代冰冷數字</H3>
            <P>
              Mentor 會引導學生自由選擇每週學習日與時間長度，以貼合他的真實需求與生活步調。
            </P>
            <ImageWithHotspots
              src={personaUi1}
              alt="角色標籤 UI 設計"
              hotspots={learningPersonaHotspots}
              className="rounded-lg mt-6"
            />
            <P className="mt-8">我們不希望 UI 中盡是冰冷的數字。團隊討論之後，我們決定用四種角色標籤（佛系學生、勤奮學子、資優菁英、天才學霸）把它轉化成一種身份認同。Mentor 會依學生每週學習時間，顯示他屬於哪一種角色。</P>
            <img src={typesImg} alt="角色標籤" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決痛點</p>
              <P>學生缺乏學習方向感、不知道從哪裡開始。</P>
              <p className="font-medium text-white mb-3 mt-6">設計決策</p>
              <P>帶點趣味的自我評估系統，讓數字變成一種自我認同，促進學習動機。學生設定的不只是時間，而是<strong>自己想成為的樣子</strong>，從內在動機建立開始學習旅程的第一步。</P>
            </div>
          </Container>

          {/* 資訊層級的設計判斷 */}
          <Container className="mt-20">
            <H3>資訊層級的設計判斷</H3>
            <P>
              學習目標設定以月曆視圖與周計劃雙模式切換呈現，提供不同使用習慣的學習者做切換；科目色塊作為第一視覺錨點，知識點標題次之，預估時間與完成狀態作為輔助資訊。學生掃視時可以快速定位，不需要逐行閱讀。
            </P>
            <ImageWithHotspots
              src={screenShot4}
              alt="學習目標設定介面"
              hotspots={[
                { id: 'point2', x: 38, y: 44, content: '每個顏色的點代表不同科目。', arrowPosition: 'bottom' },
                { id: 'point3', x: 78, y: 34, content: '單日學習計劃一覽。', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <img src={goalCalendar} alt="學習目標月曆視圖" className="rounded-lg mt-6" />
            <p className="text-caption opacity-50 mt-2">在 Figma 進行詳盡的元件狀態設定與流程安排</p>
            <P className="mt-6">學習報告則依照不同時間維度規劃視覺化圖表，但採用了同一套視覺系統。</P>
            <P>例如，日報以列表為主結構，強調每個學習單元的完成細節，資訊密度高；週報引入圖表元件，讓數字趨勢一眼可讀；月報則以雷達圖、環形圖為視覺主體。</P>
            <img src={reportWeekly} alt="週報" className="rounded-lg mt-4" />
            <P className="mt-6">時間跨度越大的報告，越以「趨勢」為主軸，便於家長從整體分佈而非逐條數字來理解學習狀況。</P>
            <img src={reportMonthly} alt="月報" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決痛點</p>
              <P>學習紀錄資訊量龐大且乏味且缺乏下一步提示，讓學習進度安排困難重重；且看不見長期的進步軌跡。</P>
              <p className="font-medium text-white mb-3 mt-6">設計決策</p>
              <P>規劃細緻的資訊層級設計，讓學生與家長看見整體計畫的輪廓外，也能逐一確認細節。回顧過去、展望未來的模式能帶來安心感。</P>
            </div>
          </Container>

          {/* 把里程碑轉化為可收藏的視覺語言 */}
          <Container className="mt-12">
            <H3>把里程碑轉化為可收藏的視覺語言</H3>
            <P>
              每一枚徽章都有獨立的視覺設計，在宇宙風格的美術系統裡，這些徽章不只是獎勵，而是 Mentor 世界觀的延伸。
            </P>
            <P>我們採用了遊戲化設計，讓學生的每一個里程碑都是這段學習冒險留下的印記。成就殿堂的展示介面刻意設計成可收藏、可檢視的形式，進度追蹤與解鎖回饋滿足收集欲，並強化習慣養成。</P>
          </Container>

          <Container>
            <ImageWithHotspots
              src={screenShot6}
              alt="成就殿堂"
              hotspots={[
                { id: 'point1', x: 28, y: 8, content: '學生可以查看收藏進度。', arrowPosition: 'bottom' },
                { id: 'point2', x: 52, y: 50, content: '每一枚徽章都有獨立視覺設計，展示於「成就殿堂」介面。', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <p className="text-caption opacity-50 mt-2">在成就殿堂可以瀏覽所有任務對應的徽章，一部分是系列徽章：一件任務做得越徹底，依序可得到初階到最高階四種徽章；另一部分則是獨一無二的特殊徽章，大多靠意想不到的方式觸發獲得。</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img src={screenShot7} alt="已獲得的徽章" className="rounded-lg" />
              <img src={screenShot8} alt="未獲得的徽章" className="rounded-lg" />
            </div>
          </Container>

          <Container>
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">解決痛點</p>
              <P>只追逐成績進步容易有挫折感，學習者沒有持續學習的動力。</P>
              <p className="font-medium text-white mb-3 mt-6">設計決策</p>
              <P>完成課程和連續學習即可獲得徽章，用即時的回饋維持學習動力，讓學生在成就徽章鼓勵下更有動力進行接下來的學習任務。</P>
            </div>
          </Container>
        </SectionBlock>

        {/* 成果 */}
        <SectionBlock bgVariant="purple" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="results">成果</H2>
            <P>
              產品上線後，<strong>90% 的學生選擇採用 AI 建立個人化學習路徑</strong>，而非手動設定，這是「個人化下一步建議」這個設計目標被真正接受的直接證明。
            </P>
            <P>
              根據業務團隊回饋，學習報告讓家長第一次能清楚看見孩子每天、每週、每月的學習狀況，「補習花費有沒有回饋」這個最核心的焦慮有了具體的解方。
            </P>

            <H3 className="mt-12">關鍵影響力</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: 'Mentor 上線後成為公司 AI 主推產品線',
                  desc: '證明設計團隊有能力在資源有限的環境下，從 0 到 1 建立完整的產品設計體系。',
                },
                {
                  title: '持續運作的設計系統',
                  desc: '已建立的設計系統與協作流程，在我離開後仍持續支撐產品的功能迭代。',
                },
                {
                  title: '建立主動及互助的團隊文化',
                  desc: '成員彼此了解各自的需求長處，懂得互助。我建立的團隊文化成為自主運作的基礎。',
                },
                {
                  title: '改變了公司對設計團隊的定位認知',
                  desc: '設計師不再只是負責視覺呈現，而是具備產品思維與跨職能溝通能力的策略夥伴。',
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

        {/* 反思 */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="reflection">學習反思</H2>
            <P>
              這個專案讓我學會把專注點從「做事」，放到「讓對的人做對的事」。我也透過實踐了解到帶領團隊的核心思維：比起完美，更重要的是資源與期待的平衡。以下三點是我認為在執行過程中必不可少的：
            </P>

            <div className="flex flex-col gap-12 mt-8">
              <div>
                <H3>確保資訊透明、發聲管道暢通</H3>
                <P>
                  產品願景宏大、需求複雜，清晰且及時的溝通變得不可或缺。需求變化得快且劇烈，若不建立有效的溝通管道，很容易追不上。
                </P>
                <P>
                  過去，我習慣當個跟隨者。但為了本次專案，我克服了迂迴表達的習慣，學會在設計與跨部門討論中主動發聲，也鼓勵每位團隊成員大膽表達看法，如此<strong>讓設計團隊不再是被動的任務執行者，而能提升到具有產品思維的決策者。</strong>
                </P>
              </div>
              <div>
                <H3>從市場學習</H3>
                <P>
                  除了團隊內部討論與研究，我學會了重視業務團隊的回饋。他們直接與潛在客戶接觸，是最靠近真實需求的人。業務團隊的洞察讓產品更有競爭力，我在專案期間鼓勵團隊成員多與其接觸，借鑑他們的想法，<strong>避免過度以設計師視角為中心的決策。</strong>
                </P>
              </div>
              <div>
                <H3>支持團隊成長</H3>
                <P>
                  透過個別訪談了解每位成員的動機與期待，分配能幫助他們成長的任務，鼓勵主動學習與精進。<strong>他們分別在執行任務中獲得了新技術的嘗試、獨特想法的展現機會，甚至是號召、主導的實際經驗</strong>，在各自的職涯經歷中加入了不可忽視的一筆成績。
                </P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Conclusion */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="flex flex-col items-center text-center">
            <P className="w-full md:w-2/3 opacity-80">
              設計 Mentor 不只是塑造畫面，而是塑造一支團隊、一個故事，以及一個對學習的共同信念。
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              一開始我仍偏向「執行者」：專注像素、流程與 UI 精緻度；但隨著產品規模擴大，我逐漸學會用「領導者」視角整合跨職能、賦能夥伴，並守住更大的方向。
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              這些經驗讓我從獨立貢獻者成長為設計主管：更清楚地溝通、站在不同角色之間思考問題。最重要的是，我學到好的設計不只是交付完美的成品，更要讓團隊成員與公司的期望互相對齊，這才是能長久走下去的方式。
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
