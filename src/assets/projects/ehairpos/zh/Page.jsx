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
import BG1 from '../en/projectInfo-ehairpos-bg-1.png'
import BG2 from '../en/projectInfo-ehairpos-bg-2.png'

// 定义 ehairpos 项目的背景图片映射
const ehairposBackgrounds = {
  purple: BG1,
  photo: BG2,
}
import iconEhairpos from '../en/projectList-icon-ehairpos.png'
import decoIcons1 from '../en/projectInfo-ehairpos-deco-icons1.svg'
import decoIcons2 from '../en/projectInfo-ehairpos-deco-icons2.svg'
import bgWave from '../en/projectInfo-ehairpos-bg-wave.svg'
import iconLink from '../en/projectInfo-ehairpos-icon-link.svg'
import iconIOS from '../en/projectInfo-ehairpos-icon-ios.svg'
import tablet from '../en/projectInfo-ehairpos-tablet.png'

import screenshot01 from '../en/projectInfo-ehairpos-screenshot01.png'
import screenshot02 from '../en/projectInfo-ehairpos-screenshot02.png'
import screenshot03 from '../en/projectInfo-ehairpos-screenshot03.png'
import screenshot04 from '../en/projectInfo-ehairpos-screenshot04.png'
import screenshot05 from '../en/projectInfo-ehairpos-screenshot05.png'
import screenshot06 from '../en/projectInfo-ehairpos-screenshot06.png'
import screenshot07 from '../en/projectInfo-ehairpos-screenshot07.png'
import screenshot08 from '../en/projectInfo-ehairpos-screenshot08.png'
import screenshot09 from '../en/projectInfo-ehairpos-screenshot09.png'
import screenshot10 from '../en/projectInfo-ehairpos-screenshot10.png'
import screenshot11 from '../en/projectInfo-ehairpos-screenshot11.png'
import screenshot12 from '../en/projectInfo-ehairpos-screenshot12.png'
import draft1 from '../en/projectInfo-ehairpos-draft1.png'
import draft2 from '../en/projectInfo-ehairpos-draft2.jpg'
import old1 from '../en/projectInfo-ehairpos-old1.jpg'
import old2 from '../en/projectInfo-ehairpos-old2.png'
import old3 from '../en/projectInfo-ehairpos-old3.png'
import logo from '../en/projectInfo-ehairpos-logo_concept1.png'
import logo2 from '../en/projectInfo-ehairpos-logo_concept2.png'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function EHairPOSPageZh() {
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
      content: '搜尋篩選可依生日、標籤與消費紀錄排序。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 4,
      y: 30,
      content: '設計師可用不同顏色星號為顧客加註標記，用於店內偏好或內部工作流程。',
      arrowPosition: 'top',
    },
  ]

  const customersNotesHotspots = [
    {
      id: 'point1',
      x: 64,
      y: 32,
      content: '不同分店的設計師可在共用時間軸留下備註。',
      arrowPosition: 'bottom',
    },
  ]

  const customersChartsHotspots = [
    {
      id: 'point1',
      x: 22,
      y: 42,
      content: '分析系統會標示每位顧客的消費力與購買偏好。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 64,
      y: 62,
      content: '此圖表以購買頻率排序。',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots1 = [
    {
      id: 'point1',
      x: 13,
      y: 4,
      content: '可在整月與單日視圖之間切換，符合不同排程需求。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 8,
      y: 42,
      content: '左側欄列出所選日期的所有預約顧客，方便快速查找。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 80,
      y: 18,
      content: '不同設計師的顧客會在同一條時間軸上一起顯示。',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots2 = [
    {
      id: 'point1',
      x: 60,
      y: 34,
      content: '列出所選日期的所有預約顧客，方便快速查找。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 49,
      y: 68,
      content: '休假資訊會直接標記在月曆格上。',
      arrowPosition: 'top',
    },
  ]
  const shoppingHistoryHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 52,
      content: '點選分類即可展開，快速瀏覽該分類下的所有品項。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 8,
      y: 22,
      content: '使用篩選器可更精準找到特定商品。',
      arrowPosition: 'bottom',
    },
  ]

  const checkoutHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 60,
      content: '金額可分拆為現金與信用卡同時付款。',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 12,
      y: 22,
      content: '列出所有交易明細。',
      arrowPosition: 'bottom',
    },
  ]


  const memberCardHotspots = [
    {
      id: 'point1',
      x: 30,
      y: 58,
      content: '儲值卡使用狀況一目了然。',
      arrowPosition: 'bottom',
    },
  ]

  const discountHotspots = [
    {
      id: 'point1',
      x: 70,
      y: 57,
      content: '設計師可發放優惠券給顧客；顧客可透過搜尋或篩選在 App 內快速找到。',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 9,
      y: 22,
      content: '透過篩選可更精準搜尋特定優惠券。',
      arrowPosition: 'top',
    },
  ]

  const performanceStoreHotspots = [
    {
      id: 'performance-store',
      x: 18,
      y: 24,
      content: '店鋪績效：各分店營收、來客數與關鍵 KPI。',
      arrowPosition: 'right',
    },
  ]

  const performancePersonalHotspots = [
    {
      id: 'performance-personal',
      x: 70,
      y: 30,
      content: '個人績效：設計師層級指標，用於輔導、獎勵與成長。',
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
              <H3 className='mb-24 text-gray-900'>美髮沙龍管理工具</H3>
              <P className='w-full md:w-2/3 text-gray-900'>專為美髮沙龍打造的全方位 POS 系統，從預約到結帳一站式串連，讓工作流程更順暢。</P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6" />
              <img src={decoIcons1} alt="decoIcons1" className='absolute top-4 md:top-0 right-0 w-32 md:w-60 ' />
              <img src={decoIcons2} alt="decoIcons2" className='absolute top-16 md:top-[10vh] left-0 w-24 md:w-32 ' />


            </Container>

          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container className='flex flex-col items-center justify-center'>

            <H2>專案簡介</H2>
            <LazyImage src={tablet} alt="tablet" className='w-full md:w-2/3 h-auto' />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  本專案起初是將公司內部自用的 POS 系統重新改版，並以美髮沙龍的實際需求為核心重新定義。
                  最終產出是一套為沙龍量身打造的解決方案：前台與後台流程被整合與簡化；日常由店內人員使用 iPad App 操作，並串接中控管理系統，統一管理庫存、顧客與銷售數據。
                </P>
                <p className='text-caption text-gray-500 font-light'>註：以下畫面中的姓名、電話與生日皆為電腦產生的假資料，與真實人物無關。</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-h3'>角色</p>
                <P>UI/UX 設計師</P>
                <p className='text-h3'>時程</p>
                <P>2020 – 2021</P>
                <p className='text-h3'>工具</p>
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
            <H2>主要職責</H2>

            <UL>
              <LI>主導改版規劃：從資訊架構、視覺方向到線框與 UI Mockup</LI>
              <LI>與 PHP 後端工程師與 iOS 工程師密切協作</LI>
              <LI>設計 App 的 Logo / Logotype</LI>
            </UL>
          </Container>
        </SectionBlock>

        {/* target audience */}
        <SectionBlock variant="photo" backgrounds={ehairposBackgrounds}>
          <Container>
         
              <H2>目標使用者</H2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">店主 / 店長</div>
                  <p className='pb-0'>台灣中高端美髮沙龍，常見多店營運</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">設計師與助理</div>
                  <p className='pb-0'>第一線人員：管理顧客、預約與銷售</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">合作培訓單位</div>
                  <p className='pb-0'>將 eHairPOS 納入美髮教育課程的技職院校</p>
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
                <H3>為何要改版？</H3>
                <P>原本的 POS 系統屬於通用型工具，較少考量沙龍現場使用情境；過時的 UI 與割裂的流程導致：</P>
                <UL>
                  <LI>新進員工上手時間長</LI>
                  <LI>顧客資料分散在不同頁面</LI>
                  <LI>結帳與預約流程效率低</LI>
                </UL>
                <P>因此我們希望打造一套真正符合沙龍日常工作方式的解決方案：直覺、整合，並同時兼顧營運目標與服務流程。</P>
              </div>
              <div>
                <H3>設計目標</H3>
                <UL>
                  <LI><strong>整合顧客操作：</strong>將顧客相關行為（預約、資料編輯、結帳、會員卡、優惠券）整合到同一畫面，設計師不必為服務單一顧客而在模組間來回跳轉。</LI>
                  <LI><strong>提升商業價值：</strong>不只解決每日交易，更提供長期洞察；透過視覺化報表協助店主看見顧客趨勢並規劃策略。</LI>
                </UL>
              </div>
            </div>
            <img src={draft1} alt="draft1" className='w-full h-auto mt-16 rounded-xs' />
            <p className='text-caption text-gray-500 font-light mt-4'>避免零碎式拼貼 UI；以整體角度先草擬並比較不同版面。</p>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
          <H2>設計成果</H2>
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
                   
                    <H3>顧客管理：進階篩選與分割視圖</H3>
                    <P>我們捨棄以彈窗為主的瀏覽方式，改採分割視圖。使用者可同時瀏覽顧客清單與右側完整資料，大幅縮短查找時間並減少點擊次數。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>舊版：瀏覽顧客清單時，點入明細會開啟全螢幕彈窗；必須先關閉才能回到清單。</P>
                    <div className='grid grid-cols-1 gap-4 mb-8'>
                      <img src={old1} alt="old1" className='w-full h-auto mt-8 rounded-xs' />
                      <img src={old2} alt="old2" className='w-full h-auto rounded-xs' />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>新版：採用分割視圖，點選清單中的顧客即可在右側即時顯示詳細資訊。</P>
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
                    <P>不同設計師的備註以時間軸形式呈現，讓團隊共享顧客偏好紀錄。</P>
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
                    <P>以圖表摘要來店頻率、消費與服務組合，協助店主快速辨識 VIP 顧客。</P>
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
              
              <H3>顧客管理：進階篩選與分割視圖</H3>
              <P>我們捨棄以彈窗為主的瀏覽方式，改採分割視圖。使用者可同時瀏覽顧客清單與右側完整資料，大幅縮短查找時間並減少點擊次數。</P>
              <P>舊版：瀏覽顧客清單時，點入明細會開啟全螢幕彈窗；必須先關閉才能回到清單。</P>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-16'>
                <img src={old1} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
                <img src={old2} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
              </div>
              <P>新版：採用分割視圖，點選清單中的顧客即可在右側即時顯示詳細資訊。</P>
              <ImageWithHotspots
                src={screenshot01}
                alt="Customers list"
                hotspots={customersHotspots}
                className='mb-8'
              />
              <P>不同設計師的備註以時間軸形式呈現，讓團隊共享顧客偏好紀錄。</P>

              <ImageWithHotspots
                src={screenshot02}
                alt="Customer notes"
                hotspots={customersNotesHotspots}
                className='mb-8'
              />

              <P>以圖表摘要來店頻率、消費與服務組合，協助店主快速辨識 VIP 顧客。</P>
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
                      我們借鑑使用者熟悉的互動模式（如 Google Calendar），支援快速拖曳排程、未排定的保留時段，以及日/週期（月）視圖切換。</P>
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
                      alt="行事曆視圖"
                      hotspots={calendarHotspots1}
                      className='mb-8'
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>行事曆可切換為月視圖，方便一眼檢視並調整整體排程。</P>
                    <ImageWithHotspots
                      src={screenshot05}
                      alt="行事曆視圖"
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
                我們借鑑使用者熟悉的互動模式（如 Google Calendar），支援快速拖曳排程、未排定的保留時段，以及日/週期（月）視圖切換。</P>

              <div className='flex justify-end'>
                <img src={draft2} alt="draft2" className='w-[80%] h-auto  rounded-xs mix-blend-multiply opacity-50 ' />
              </div>

              <ImageWithHotspots
                src={screenshot04}
                alt="Calendar view"
                hotspots={calendarHotspots1}
                className='mb-8'
              />
              <P>行事曆可切換為月視圖，方便一眼檢視並調整整體排程。</P>
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
                    <H3>結帳流程：因應沙龍現場的複雜性</H3>
                    <P>
                      Unlike retail POS, salon purchases are often complex: A client might get a cut, color, and buy a product—all in one visit.<br />
                      Our new UI lets staff apply discounts per item, choose payment types, and switch between products quickly. Visual hierarchy and iconography were improved for clarity and speed.</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <ProjectNote className='mb-4 text-gray-800'>舊版：留白過多，資訊層級不清，辨識度低。</ProjectNote>
                    <img src={old3} alt="old3" className='w-full h-auto rounded-xs mb-8' />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>新版以圖示建立清楚的商品分類，提升可讀性。</P>
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
                    <P>結帳時，側欄會顯示購買金額，方便店員檢視與確認。</P>
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
              <H3>結帳流程：因應沙龍現場的複雜性</H3>
              <P>
                Unlike retail POS, salon purchases are often complex: A client might get a cut, color, and buy a product—all in one visit.<br />
                Our new UI lets staff apply discounts per item, choose payment types, and switch between products quickly. Visual hierarchy and iconography were improved for clarity and speed.</P>

              <div className="relative">
                <ProjectNote className='absolute top-[30%] right-1/2 w-60 translate-y-1/2 translate-x-1/2 text-gray-800'>舊版：留白過多，資訊層級不清，辨識度低。</ProjectNote>
                <img src={old3} alt="old3" className='w-full h-auto rounded-xs mb-8' />
              </div>
              <div>

                <P>新版以圖示建立清楚的商品分類，提升可讀性。</P>

                <ImageWithHotspots
                  src={screenshot06}
                  alt="shopping list"
                  hotspots={shoppingHistoryHotspots}
                  className='mb-8'
                />
                <P>結帳時，側欄會顯示購買金額，方便店員檢視與確認。</P>
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
                    <H3>像真實錢包一樣的會員錢包</H3>
                    <P>
                      我們不再讓顧客持有多張會員卡，而是設計一個統一的數位錢包。
                      顧客只要提供手機號碼，店員即可立即查看儲值卡、會員點數與可用優惠券。<br />
                      介面以真實錢包為靈感：有條理、好閱讀，並能在結帳時快速套用。
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
              <H3>像真實錢包一樣的會員錢包</H3>
              <P>
                我們不再讓顧客持有多張會員卡，而是設計一個統一的數位錢包。
                顧客只要提供手機號碼，店員即可立即查看儲值卡、會員點數與可用優惠券。<br />
                介面以真實錢包為靈感：有條理、好閱讀，並能在結帳時快速套用。
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
                    <H3>視覺化報表：讓經營決策更有依據</H3>
                    <P>為了讓店主不只「看到數字」，更能「理解趨勢」，我們建立了兩層報表：</P>
                    <UL>
                      <LI><strong>店鋪儀表板：</strong>營收、來客數、客單價、活動 ROI，可依不同時間區間切換查看</LI>
                      <LI><strong>設計師報表：</strong>追蹤個人表現、回訪率與銷售目標的長期變化</LI>
                    </UL>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <LazyImage src={screenshot11} alt="screenshot11" className='w-full h-auto rounded-sm' />
                    <p className='text-caption text-gray-500 font-light mt-4'>店鋪儀表板：整合營收、來客數、客單價與成長指標，搭配時間篩選，清楚掌握經營表現。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <LazyImage src={screenshot12} alt="screenshot12" className='w-full h-auto rounded-sm' />
                    <p className='text-caption text-gray-500 font-light mt-4'>設計師儀表板：每位設計師可查看個人績效趨勢、顧客數與成長軌跡。</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P>這些儀表板讓店主與設計師都能更有掌控感：用數據制定計畫，而不是靠直覺猜測。</P>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <H3>視覺化報表：讓經營決策更有依據</H3>
              <P>為了讓店主不只「看到數字」，更能「理解趨勢」，我們建立了兩層報表：</P>
              <UL>
                <LI><strong>店鋪儀表板：</strong>營收、來客數、客單價、活動 ROI，可依不同時間區間切換查看</LI>
                <LI><strong>設計師報表：</strong>追蹤個人表現、回訪率與銷售目標的長期變化</LI>
              </UL>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-16'>
                <div>
                  <LazyImage src={screenshot11} alt="screenshot11" className='w-full h-auto rounded-sm' />
                  <p className='text-caption text-gray-500 font-light mt-4'>店鋪儀表板：整合營收、來客數、客單價與成長指標，搭配時間篩選，清楚掌握經營表現。</p>
                </div>
                <div>
                  <LazyImage src={screenshot12} alt="screenshot12" className='w-full h-auto rounded-sm' />
                  <p className='text-caption text-gray-500 font-light mt-4'>設計師儀表板：每位設計師可查看個人績效趨勢、顧客數與成長軌跡。</p>
                </div>
              </div>
              <P className='mt-16'>這些儀表板讓店主與設計師都能更有掌控感：用數據制定計畫，而不是靠直覺猜測。</P>
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
                    <H2>Logotype 設計</H2>
                    <P><strong>概念：</strong>將字母「e」與「P」結合無限符號與美髮剪刀，形成帶狀的視覺輪廓；兼具柔和與專業感，象徵沙龍產業中「無限延伸的服務」與「創意能量」。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <P><strong>色彩：</strong>延續 App 的核心視覺語言，採用相近色紫色系，維持品牌一致性與視覺和諧。</P>
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
              <H2>Logotype 設計</H2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div>
                  <P><strong>概念：</strong>將字母「e」與「P」結合無限符號與美髮剪刀，形成帶狀的視覺輪廓；兼具柔和與專業感，象徵沙龍產業中「無限延伸的服務」與「創意能量」。</P>

                </div>
                <div>
                  <P><strong>色彩：</strong>延續 App 的核心視覺語言，採用相近色紫色系，維持品牌一致性與視覺和諧。</P>
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
                    <H2>心得回顧</H2>
                    <P>上線後，系統被多家中大型連鎖沙龍採用。一位店主分享：</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                      <img src={quote} alt="quote" className='mb-8' />
                      <P className=''>「eHairPOS 解決了我們多店管理的痛點，營收與庫存一目了然；顧客也很喜歡線上預約。非常推薦！」</P>
                    </div>
                    <P>這段回饋驗證了我們的核心目標：讓 POS 從被動紀錄工具，轉變成協助決策的助手。</P>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <H2>重點收穫</H2>
                    <UL>
                      <LI>設計的起點是理解人如何工作，而不是他們點了哪些畫面</LI>
                      <LI>每一個版面決策都該回到一個問題：是否讓任務更容易、更清楚？</LI>
                      <LI>在設計過程中與第一線人員協作，能幫助我們交付真正重要的內容</LI>
                    </UL>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <H2>心得回顧</H2>
                  <P>上線後，系統被多家中大型連鎖沙龍採用。一位店主分享：</P>
                  <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                    <img src={quote} alt="quote" className='mb-8' />
                    <P className=''>「eHairPOS 解決了我們多店管理的痛點，營收與庫存一目了然；顧客也很喜歡線上預約。非常推薦！」</P>
                  </div>
                  <P>這段回饋驗證了我們的核心目標：讓 POS 從被動紀錄工具，轉變成協助決策的助手。</P>
                </div>
                <div>

                  <H2>重點收穫</H2>
                  <UL>
                    <LI>設計的起點是理解人如何工作，而不是他們點了哪些畫面</LI>
                    <LI>每一個版面決策都該回到一個問題：是否讓任務更容易、更清楚？</LI>
                    <LI>在設計過程中與第一線人員協作，能幫助我們交付真正重要的內容</LI>
                  </UL>
                </div>
              </div>
            </div>

          </Container>
        </SectionBlock>

        <SectionBlock variant="" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>後續發展與影響</H2>
            <P>雖然我在第一版完成後離開公司，但產品仍持續成長：</P>
            <UL>
              <LI>正式於 iOS App Store 上架（iPad 版）</LI>
              <LI>後續也演進為可跨裝置使用、包含手機端的系統</LI>
            </UL>
            <P>這些發展得以成立，關鍵在於前期設計打下的基礎：</P>
            <UL>
              <LI>可延展的架構：支援新裝置而不必從零重做 UI</LI>
              <LI>清楚的文件與一致的視覺規範：讓後續團隊能更容易延續與擴充</LI>
            </UL>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                <img src={quote} alt="quote" className='mb-8' />
                <P className=''>它提醒我：好的設計不只關乎這一版。<br />更重要的是建立一個讓後人能延續的基礎。</P>
              </div>
              <div className="grid grid-cols-1 ">
                <a href="https://www.ehairpos.com/" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconLink} alt="iconLink" /> 官方宣傳網站</a>
                <a href="https://apps.apple.com/us/app/ehairpos/id6477988989" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconIOS} alt="iconIOS" /> iOS 下載連結</a>
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

