import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Navbar from '../../../../components/utilities/Navbar'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import ImageWithHotspots from '../../../../components/utilities/ImageWithHotspots'
import Footer from '../../../../components/utilities/Footer'
import ProjectNote from '../../../../components/projects/ProjectNote'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import TableOfContents from '../../../../components/utilities/TableOfContents'
import LazyImage from '../../../../components/utilities/LazyImage'

gsap.registerPlugin(ScrollTrigger)

// Import images - you'll need to add these images to the ehairpos folder
import arrowDown from '../../../../../public/icon-arrow-down.svg'
import quote from '../../../../../public/icon-quote.svg'


// Import ehairpos project images
import BG1 from '../image/projectInfo-ehairpos-bg-1.png'
import BG2 from '../image/projectInfo-ehairpos-bg-2.png'

// ehairpos の背景画像マップ
const ehairposBackgrounds = {
  purple: BG1,
  photo: BG2,
}
import iconEhairpos from '../image/projectList-icon-ehairpos.png'
import decoIcons1 from '../image/projectInfo-ehairpos-deco-icons1.svg'
import decoIcons2 from '../image/projectInfo-ehairpos-deco-icons2.svg'
import bgWave from '../image/projectInfo-ehairpos-bg-wave.svg'
import iconLink from '../image/projectInfo-ehairpos-icon-link.svg'
import iconIOS from '../image/projectInfo-ehairpos-icon-ios.svg'
import tablet from '../image/projectInfo-ehairpos-tablet.png'

import screenshot01 from '../image/projectInfo-ehairpos-screenshot01.png'
import screenshot02 from '../image/projectInfo-ehairpos-screenshot02.png'
import screenshot03 from '../image/projectInfo-ehairpos-screenshot03.png'
import screenshot04 from '../image/projectInfo-ehairpos-screenshot04.png'
import screenshot05 from '../image/projectInfo-ehairpos-screenshot05.png'
import screenshot06 from '../image/projectInfo-ehairpos-screenshot06.png'
import screenshot07 from '../image/projectInfo-ehairpos-screenshot07.png'
import screenshot08 from '../image/projectInfo-ehairpos-screenshot08.png'
import screenshot09 from '../image/projectInfo-ehairpos-screenshot09.png'
import screenshot10 from '../image/projectInfo-ehairpos-screenshot10.png'
import screenshot11 from '../image/projectInfo-ehairpos-screenshot11.png'
import screenshot12 from '../image/projectInfo-ehairpos-screenshot12.png'
import draft1 from '../image/projectInfo-ehairpos-draft1.png'
import draft2 from '../image/projectInfo-ehairpos-draft2.jpg'
import old1 from '../image/projectInfo-ehairpos-old1.jpg'
import old2 from '../image/projectInfo-ehairpos-old2.png'
import old3 from '../image/projectInfo-ehairpos-old3.png'
import logo from '../image/projectInfo-ehairpos-logo_concept1.png'
import logo2 from '../image/projectInfo-ehairpos-logo_concept2.png'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function EHairPOSPageJa() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Use floating animation for arrow down icon
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })
  const iconEhairposRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })

  // Hotspot modules (one per screen)
  // Coordinates are in percentage relative to image width/height and can be fine-tuned visually in the browser.
  const customersHotspots = [
    {
      id: 'point1',
      x: 18,
      y: 23,
      content: '検索フィルターで誕生日・タグ・購買履歴で並び替えできます。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 4,
      y: 30,
      content: 'スタイリストは色分けした星で顧客をタグ付けでき、店内の好みや内部ワークフローに活用できます。',
      arrowPosition: 'top',
    },
  ]

  const customersNotesHotspots = [
    {
      id: 'point1',
      x: 64,
      y: 32,
      content: '別店舗のスタイリストも、共有タイムラインにメモを残せます。',
      arrowPosition: 'bottom',
    },
  ]

  const customersChartsHotspots = [
    {
      id: 'point1',
      x: 22,
      y: 42,
      content: '分析では、各顧客の支出傾向や購買嗜好がハイライトされます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 64,
      y: 62,
      content: 'このチャートは購買頻度順に並んでいます。',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots1 = [
    {
      id: 'point1',
      x: 13,
      y: 4,
      content: '月表示／日表示を切り替えて、計画ニーズに合わせられます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 8,
      y: 42,
      content: '左サイドバーに選択日の予約顧客が一覧表示され、すぐに確認できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 80,
      y: 18,
      content: '担当スタイリストが異なる顧客も、同じタイムライン上でまとめて表示されます。',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots2 = [
    {
      id: 'point1',
      x: 60,
      y: 34,
      content: '選択日の予約顧客を一覧表示し、すぐに確認できます。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 49,
      y: 68,
      content: '休暇情報はカレンダーのセルに直接表示されます。',
      arrowPosition: 'top',
    },
  ]
  const shoppingHistoryHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 52,
      content: 'カテゴリをタップすると展開し、そのカテゴリ内の全商品を素早く閲覧できます。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 8,
      y: 22,
      content: 'フィルターで目的の商品をより正確に見つけられます。',
      arrowPosition: 'bottom',
    },
  ]

  const checkoutHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 60,
      content: '支払いは現金とクレジットカードに分割して同時に決済できます。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 12,
      y: 22,
      content: '取引明細を一覧表示します。',
      arrowPosition: 'bottom',
    },
  ]


  const memberCardHotspots = [
    {
      id: 'point1',
      x: 30,
      y: 58,
      content: 'プリペイドカードの利用状況がひと目で分かります。',
      arrowPosition: 'bottom',
    },
  ]

  const discountHotspots = [
    {
      id: 'point1',
      x: 70,
      y: 57,
      content: 'スタイリストがクーポンを配布でき、顧客は検索やフィルターでアプリ内から簡単に見つけられます。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 9,
      y: 22,
      content: 'フィルターで特定のクーポンをより正確に検索できます。',
      arrowPosition: 'top',
    },
  ]

  const performanceStoreHotspots = [
    {
      id: 'performance-store',
      x: 18,
      y: 24,
      content: '店舗パフォーマンス：各店舗の売上・来店数・主要KPI。',
      arrowPosition: 'right',
    },
  ]

  const performancePersonalHotspots = [
    {
      id: 'performance-personal',
      x: 70,
      y: 30,
      content: '個人パフォーマンス：スタイリスト単位の指標で、育成・評価・成長を支援します。',
      arrowPosition: 'left',
    },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <Navbar
        isWhite={false}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant="arrow"
      />
      <main className="bg-bg">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <SectionBlock className='w-full h-full relative' style={{ background: 'linear-gradient(30deg, #FFFFFF 0%, #FAEEFF 100%)' }} backgrounds={ehairposBackgrounds}>
            <TableOfContents />
            <img
              src={bgWave}
              alt="bgWave"
              className='pointer-events-none select-none absolute inset-x-0 bottom-0 w-full h-auto'
            />
            <Container className='flex flex-col items-center justify-center text-center relative z-10'>
              <img src={iconEhairpos} ref={iconEhairposRef} alt="eHairPOS" className='w-48 h-48 md:w-60 md:h-60 mb-8 z-10' />
              <h1 className='text-large mobile:text-large-mobile text-[#994FDE]'>eHairPOS</h1>
              <H3 className='mb-24 text-gray-900'>サロン管理ツール</H3>
              <P className='w-full md:w-2/3 text-gray-900'>美容サロン向けに設計した総合POSシステム。予約から会計までの流れを一気通貫でつなぎ、現場のオペレーションをスムーズにします。</P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6" />
              <img src={decoIcons1} alt="decoIcons1" className='absolute top-4 md:top-0 right-0 w-32 md:w-60 ' />
              <img src={decoIcons2} alt="decoIcons2" className='absolute top-16 md:top-[10vh] left-0 w-24 md:w-32 ' />


            </Container>

          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container className='flex flex-col items-center justify-center'>

            <H2>プロジェクト概要</H2>
            <LazyImage src={tablet} alt="tablet" className='w-full md:w-2/3 h-auto' />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  本プロジェクトは、社内で使用していたPOSシステムを「美容サロンの実務」に合わせて再設計することから始まりました。
                  結果として、サロン向けに最適化したソリューションを実現しました。フロント〜バックオフィスの流れを統合・整理し、日常業務はiPadアプリで運用。さらに在庫・顧客・売上データを一元管理する管理システムと連携しています。
                </P>
                <p className='text-caption text-gray-500 font-light'>注：以下の画面に表示される氏名・電話番号・誕生日は、すべて生成されたダミーデータであり実在の人物とは関係ありません。</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-h3'>役割</p>
                <P>UI/UX デザイナー</P>
                <p className='text-h3'>期間</p>
                <P>2020 – 2021</P>
                <p className='text-h3'>ツール</p>
                <P>
                  Sketch<br />
                  Adobe Photoshop<br />
                  Adobe Illustrator

                </P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Responsibilities */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>主な担当領域</H2>

            <UL>
              <LI>リデザイン計画の主導（情報設計・ビジュアル方針・ワイヤー・UIモック）</LI>
              <LI>PHPバックエンドエンジニア、iOSエンジニアと密に協業</LI>
              <LI>アプリのロゴタイプ設計</LI>
            </UL>
          </Container>
        </SectionBlock>

        {/* target audience */}
        <SectionBlock variant="photo" backgrounds={ehairposBackgrounds}>
          <Container>
         
              <H2>ターゲット</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">オーナー／マネージャー</div>
                  <p className='pb-0'>台湾のミドル〜ハイエンド美容サロン（複数店舗運営が多い）</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">スタイリスト／アシスタント</div>
                  <p className='pb-0'>顧客・予約・売上を扱う現場スタッフ</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">教育・研修パートナー</div>
                  <p className='pb-0'>eHairPOS を美容教育プログラムに取り入れる職業訓練機関</p>
                </div>
              </div>
         
          </Container>
        </SectionBlock>

        {/* Background */}
        <SectionBlock variant="white" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>背景</H2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
              <div>
                <H3>なぜリデザイン？</H3>
                <P>従来のPOSは汎用ツールで、サロンの現場環境への配慮が不足していました。古いUIと分断されたフローにより、以下の課題が発生していました：</P>
                <UL>
                  <LI>新人のオンボーディングに時間がかかる</LI>
                  <LI>顧客データが画面ごとに分散している</LI>
                  <LI>会計・予約の流れが非効率</LI>
                </UL>
                <P>そこで私たちは、サロンの「日常の働き方」に本当に合うソリューションを目指しました。直感的で統合された体験を提供しつつ、ビジネス目標とサービス導線の両方を支える設計です。</P>
              </div>
              <div>
                <H3>デザイン目標</H3>
                <UL>
                  <LI><strong>顧客オペレーションの統合：</strong>予約、情報編集、会計、会員カード、クーポンなどの顧客関連操作を1画面に集約。1人の顧客対応のためにモジュール間を行き来する必要をなくしました。</LI>
                  <LI><strong>ビジネス価値の向上：</strong>日々の取引だけでなく、長期的な洞察も提供。可視化レポートで顧客傾向を把握し、戦略立案を支援します。</LI>
                </UL>
              </div>
            </div>
            <img src={draft1} alt="draft1" className='w-full h-auto mt-16 rounded-xs' />
            <p className='text-caption text-gray-500 font-light mt-4'>断片的にUIを足すのではなく、全体としてレイアウトを草案化し比較検討しました。</p>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
          <H2>デザイン成果</H2>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="design-deliverables-swiper"
              >
                <SwiperSlide>
                  <div>
                   
                    <H3>顧客管理：高度なフィルターとスプリットビュー</H3>
                    <P>モーダル中心の閲覧から離れ、スプリットビューに変更しました。顧客リストと詳細情報を並べて確認できるため、検索時間を短縮しクリック数も削減できます。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>旧版：顧客リスト閲覧中に詳細を開くと全画面モーダルになり、閉じないとリストに戻れませんでした。</P>
                    <div className='grid grid-cols-1 gap-4 mb-8'>
                      <img src={old1} alt="old1" className='w-full h-auto mt-8 rounded-xs' />
                      <img src={old2} alt="old2" className='w-full h-auto rounded-xs' />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>新版：スプリットビューを採用。リストの顧客をクリックすると右側に即座に詳細が表示されます。</P>
                    <ImageWithHotspots
                      src={screenshot01}
                      alt="Customers list"
                      hotspots={customersHotspots}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>スタイリストごとのメモはタイムラインで表示され、顧客の好みをチームで共有できます。</P>
                    <ImageWithHotspots
                      src={screenshot02}
                      alt="Customer notes"
                      hotspots={customersNotesHotspots}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>来店頻度・支出・施術構成をチャートで要約し、VIP顧客を見つけやすくしました。</P>
                    <ImageWithHotspots
                      src={screenshot03}
                      alt="Customer charts"
                      hotspots={customersChartsHotspots}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              
              <H3>顧客管理：高度なフィルターとスプリットビュー</H3>
              <P>モーダル中心の閲覧から離れ、スプリットビューに変更しました。顧客リストと詳細情報を並べて確認できるため、検索時間を短縮しクリック数も削減できます。</P>
              <P>旧版：顧客リスト閲覧中に詳細を開くと全画面モーダルになり、閉じないとリストに戻れませんでした。</P>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-16'>
                <img src={old1} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
                <img src={old2} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
              </div>
              <P>新版：スプリットビューを採用。リストの顧客をクリックすると右側に即座に詳細が表示されます。</P>
              <ImageWithHotspots
                src={screenshot01}
                alt="Customers list"
                hotspots={customersHotspots}
                className='mb-8'
              />
              <P>スタイリストごとのメモはタイムラインで表示され、顧客の好みをチームで共有できます。</P>

              <ImageWithHotspots
                src={screenshot02}
                alt="Customer notes"
                hotspots={customersNotesHotspots}
                className='mb-8'
              />

              <P>来店頻度・支出・施術構成をチャートで要約し、VIP顧客を見つけやすくしました。</P>
              <ImageWithHotspots
                src={screenshot03}
                alt="Customer charts"
                hotspots={customersChartsHotspots}
              />
            </div>
          </Container>
        </SectionBlock>


        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="booking-flow-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H3>彈性且直覺的預約流程</H3>
                    <P>預約來源有兩種：線上表單與現場新增。<br />
                      ユーザーが馴染みのある操作（例：Google Calendar）を取り入れ、ドラッグ＆ドロップでの素早い予約登録、未確定枠の保持、日／月表示の切り替えを可能にしました。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className='flex justify-center'>
                      <img src={draft2} alt="draft2" className='w-full h-auto rounded-xs mix-blend-multiply opacity-50' />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ImageWithHotspots
                      src={screenshot04}
                      alt="カレンダービュー"
                      hotspots={calendarHotspots1}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>カレンダーは月表示に切り替えられ、全体の予定を俯瞰して調整しやすくなります。</P>
                    <ImageWithHotspots
                      src={screenshot05}
                      alt="カレンダービュー"
                      hotspots={calendarHotspots2}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H3>彈性且直覺的預約流程</H3>
              <P className='w-2/3'>預約來源有兩種：線上表單與現場新增。<br />
                ユーザーが馴染みのある操作（例：Google Calendar）を取り入れ、ドラッグ＆ドロップでの素早い予約登録、未確定枠の保持、日／月表示の切り替えを可能にしました。</P>

              <div className='flex justify-end'>
                <img src={draft2} alt="draft2" className='w-[80%] h-auto  rounded-xs mix-blend-multiply opacity-50 ' />
              </div>

              <ImageWithHotspots
                src={screenshot04}
                alt="Calendar view"
                hotspots={calendarHotspots1}
                className='mb-8'
              />
              <P>カレンダーは月表示に切り替えられ、全体の予定を俯瞰して調整しやすくなります。</P>
              <ImageWithHotspots
                src={screenshot05}
                alt="Calendar view"
                hotspots={calendarHotspots2}
              />
            </div>
          </Container>
        </SectionBlock>


        <SectionBlock variant="photo" backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="checkout-flow-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H3>会計フロー：サロン業務の複雑さに対応</H3>
                    <P>
                      Unlike retail POS, salon purchases are often complex: A client might get a cut, color, and buy a product—all in one visit.<br />
                      Our new UI lets staff apply discounts per item, choose payment types, and switch between products quickly. Visual hierarchy and iconography were improved for clarity and speed.</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ProjectNote className='mb-4 text-gray-800'>旧版：余白が多く、情報の階層が不明瞭で判別しづらい。</ProjectNote>
                    <img src={old3} alt="old3" className='w-full h-auto rounded-xs mb-8' />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>新版はアイコン付きのカテゴリで商品を整理し、視認性を高めました。</P>
                    <ImageWithHotspots
                      src={screenshot06}
                      alt="shopping list"
                      hotspots={shoppingHistoryHotspots}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>会計時にはサイドバーに購入金額が表示され、スタッフが確認しやすくなります。</P>
                    <ImageWithHotspots
                      src={screenshot07}
                      alt="shopping list"
                      hotspots={checkoutHotspots}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H3>会計フロー：サロン業務の複雑さに対応</H3>
              <P>
                Unlike retail POS, salon purchases are often complex: A client might get a cut, color, and buy a product—all in one visit.<br />
                Our new UI lets staff apply discounts per item, choose payment types, and switch between products quickly. Visual hierarchy and iconography were improved for clarity and speed.</P>

              <div className="relative">
                <ProjectNote className='absolute top-[30%] right-1/2 w-60 translate-y-1/2 translate-x-1/2 text-gray-800'>旧版：余白が多く、情報の階層が不明瞭で判別しづらい。</ProjectNote>
                <img src={old3} alt="old3" className='w-full h-auto rounded-xs mb-8' />
              </div>
              <div>

                <P>新版はアイコン付きのカテゴリで商品を整理し、視認性を高めました。</P>

                <ImageWithHotspots
                  src={screenshot06}
                  alt="shopping list"
                  hotspots={shoppingHistoryHotspots}
                  className='mb-8'
                />
                <P>会計時にはサイドバーに購入金額が表示され、スタッフが確認しやすくなります。</P>
                <ImageWithHotspots
                  src={screenshot07}
                  alt="shopping list"
                  hotspots={checkoutHotspots}
                />
              </div>
            </div>

          </Container>
        </SectionBlock>

        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="membership-wallet-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H3>リアルな財布のような会員ウォレット</H3>
                    <P>
                      複数のポイントカードを持ち歩く代わりに、統合されたデジタルウォレットを設計しました。
                      顧客は電話番号を提示するだけで、スタッフはプリペイドカード、ポイント、利用可能なクーポンを即座に確認できます。<br />
                      UIは「実際の財布」を想起させる構成で、整理されて見やすく、会計時にも素早く適用できます。
                    </P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ImageWithHotspots
                      src={screenshot09}
                      alt="會員錢包"
                      hotspots={memberCardHotspots}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ImageWithHotspots
                      src={screenshot10}
                      alt="會員錢包"
                      hotspots={discountHotspots}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H3>リアルな財布のような会員ウォレット</H3>
              <P>
                複数のポイントカードを持ち歩く代わりに、統合されたデジタルウォレットを設計しました。
                顧客は電話番号を提示するだけで、スタッフはプリペイドカード、ポイント、利用可能なクーポンを即座に確認できます。<br />
                UIは「実際の財布」を想起させる構成で、整理されて見やすく、会計時にも素早く適用できます。
              </P>
              <ImageWithHotspots
                src={screenshot09}
                alt="會員錢包"
                hotspots={memberCardHotspots}
                className='mb-8'
              />
              <ImageWithHotspots
                src={screenshot10}
                alt="會員錢包"
                hotspots={discountHotspots}
                className='mb-8'
              />
            </div>
          </Container>
        </SectionBlock>

        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="visual-reports-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H3>可視化レポート：意思決定を支える</H3>
                    <P>オーナーが「数字を見る」だけでなく「傾向を理解」できるよう、2層のレポートを用意しました：</P>
                    <UL>
                      <LI><strong>店舗ダッシュボード：</strong>売上、来店数、客単価、キャンペーンROIを期間別に確認</LI>
                      <LI><strong>スタイリスト別レポート：</strong>個人の成果、リピート率、売上目標の推移を追跡</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <LazyImage src={screenshot11} alt="screenshot11" className='w-full h-auto rounded-sm' />
                    <p className='text-caption text-gray-500 font-light mt-4'>店舗ダッシュボード：売上・来店数・客単価・成長指標を統合し、期間フィルターで経営状況を把握。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <LazyImage src={screenshot12} alt="screenshot12" className='w-full h-auto rounded-sm' />
                    <p className='text-caption text-gray-500 font-light mt-4'>スタイリストダッシュボード：個人の成果トレンド、顧客数、成長の推移を確認。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>これらのダッシュボードにより、オーナーもスタイリストも自分の成果を主体的に捉え、勘ではなくデータで計画できるようになります。</P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H3>可視化レポート：意思決定を支える</H3>
              <P>オーナーが「数字を見る」だけでなく「傾向を理解」できるよう、2層のレポートを用意しました：</P>
              <UL>
                <LI><strong>店舗ダッシュボード：</strong>売上、来店数、客単価、キャンペーンROIを期間別に確認</LI>
                <LI><strong>スタイリスト別レポート：</strong>個人の成果、リピート率、売上目標の推移を追跡</LI>
              </UL>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-16'>
                <div>
                  <LazyImage src={screenshot11} alt="screenshot11" className='w-full h-auto rounded-sm' />
                  <p className='text-caption text-gray-500 font-light mt-4'>店舗ダッシュボード：売上・来店数・客単価・成長指標を統合し、期間フィルターで経営状況を把握。</p>
                </div>
                <div>
                  <LazyImage src={screenshot12} alt="screenshot12" className='w-full h-auto rounded-sm' />
                  <p className='text-caption text-gray-500 font-light mt-4'>スタイリストダッシュボード：個人の成果トレンド、顧客数、成長の推移を確認。</p>
                </div>
              </div>
              <P className='mt-16'>これらのダッシュボードにより、オーナーもスタイリストも自分の成果を主体的に捉え、勘ではなくデータで計画できるようになります。</P>
            </div>
          </Container>
        </SectionBlock>

        {/* Logotype Design */}
        <SectionBlock variant="white" backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="logotype-design-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>ロゴタイプデザイン</H2>
                    <P><strong>コンセプト：</strong>「e」と「P」を無限記号、サロンのハサミと組み合わせ、リボンのような形状に落とし込みました。柔らかさとプロフェッショナルさを両立し、「終わりのないサービス」と「創造性」を象徴しています。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P><strong>カラーパレット：</strong>アプリのコアビジュアルに合わせ、近接したパープル系でブランド一貫性と調和を保ちました。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={logo} alt="logo" className='w-full h-auto rounded-xs' />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={logo2} alt="logo2" className='w-full h-auto rounded-xs' />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H2>ロゴタイプデザイン</H2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div>
                  <P><strong>コンセプト：</strong>「e」と「P」を無限記号、サロンのハサミと組み合わせ、リボンのような形状に落とし込みました。柔らかさとプロフェッショナルさを両立し、「終わりのないサービス」と「創造性」を象徴しています。</P>

                </div>
                <div>
                  <P><strong>カラーパレット：</strong>アプリのコアビジュアルに合わせ、近接したパープル系でブランド一貫性と調和を保ちました。</P>
                </div>
              </div>

              <img src={logo} alt="logo" className='w-full h-auto rounded-xs' />
              <img src={logo2} alt="logo2" className='w-full h-auto rounded-xs' />
            </div>

          </Container>
        </SectionBlock>

        {/* Reflections */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={1}
                className="reflections-swiper"
              >
                <SwiperSlide>
                  <div>
                    <H2>振り返り</H2>
                    <P>リリース後、本システムは複数の中〜大規模サロンチェーンに採用されました。あるオーナーからは次の声がありました：</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                      <img src={quote} alt="quote" className='mb-8' />
                      <P className=''>「eHairPOS は複数店舗の管理課題を解決してくれました。売上と在庫がひと目で分かり、オンライン予約もお客様に好評です。とてもおすすめです！」</P>
                    </div>
                    <P>このフィードバックは、POSを“受動的な記録ツール”から“意思決定を支えるアシスタント”へ変えるという私たちの目標を裏付けました。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H2>学び</H2>
                    <UL>
                      <LI>デザインは「どの画面をタップするか」ではなく「人がどう働くか」を理解することから始まる</LI>
                      <LI>レイアウトの判断は常に問い直す：作業はより簡単に、より明確になったか？</LI>
                      <LI>現場スタッフとの協業は、本当に重要なものを届ける助けになる</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <H2>振り返り</H2>
                  <P>リリース後、本システムは複数の中〜大規模サロンチェーンに採用されました。あるオーナーからは次の声がありました：</P>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                    <img src={quote} alt="quote" className='mb-8' />
                    <P className=''>「eHairPOS は複数店舗の管理課題を解決してくれました。売上と在庫がひと目で分かり、オンライン予約もお客様に好評です。とてもおすすめです！」</P>
                  </div>
                  <P>このフィードバックは、POSを“受動的な記録ツール”から“意思決定を支えるアシスタント”へ変えるという私たちの目標を裏付けました。</P>
                </div>
                <div>

                  <H2>学び</H2>
                  <UL>
                    <LI>デザインは「どの画面をタップするか」ではなく「人がどう働くか」を理解することから始まる</LI>
                    <LI>レイアウトの判断は常に問い直す：作業はより簡単に、より明確になったか？</LI>
                    <LI>現場スタッフとの協業は、本当に重要なものを届ける助けになる</LI>
                  </UL>
                </div>
              </div>
            </div>

          </Container>
        </SectionBlock>

        <SectionBlock variant="" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>その後の展開と影響</H2>
            <P>初回リリースの完了後に私は退職しましたが、プロダクトはその後も成長を続けました：</P>
            <UL>
              <LI>iOS App Store（iPad版）で正式リリース</LI>
              <LI>のちにモバイルでも使えるクロスデバイスシステムへ進化</LI>
            </UL>
            <P>これを可能にしたのは、初期に積み上げたデザインの土台でした：</P>
            <UL>
              <LI>拡張性のある設計：新デバイス追加でもUIをゼロから作り直さない</LI>
              <LI>明確なドキュメントと視覚的一貫性：後続チームが継続・拡張しやすい</LI>
            </UL>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                <img src={quote} alt="quote" className='mb-8' />
                <P className=''>この経験は私に教えてくれました。良いデザインは「この版」だけの話ではない。<br />次の人が積み上げられる土台を作ることが大切だと。</P>
              </div>
              <div className="grid grid-cols-1 ">
                <a href="https://www.ehairpos.com/" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconLink} alt="iconLink" /> 公式プロモサイト</a>
                <a href="https://apps.apple.com/us/app/ehairpos/id6477988989" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconIOS} alt="iconIOS" /> iOS ダウンロードリンク</a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-16">
              <img src={iconEhairpos} alt="ehairpos" className='w-24 h-24' />
              <p className='text-h3 font-light'>eHairPOS</p>
              <p className='text-caption text-gray-300'>2020 – 2021</p>
            </div>
          </Container>
          <hr className='w-full my-8 border-white' />
          <Footer />
        </SectionBlock>

      </main>
    </div>

  )
}

