import { useState } from 'react'
import Navbar from '../../../../components/utilities/Navbar'
import Footer from '../../../../components/utilities/Footer'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import RelatedProjects from '../../../../components/projects/RelatedProjects'
import TableOfContents from '../../../../components/utilities/TableOfContents'
import LazyImage from '../../../../components/utilities/LazyImage'

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

// Images live in src/assets/projects/textbook/image
import cover1 from '../image/textbook-cover-01.png'
import cover2 from '../image/textbook-cover-02.png'
import cover3 from '../image/textbook-cover-03.png'

import spread01 from '../image/textbook-spread-01.jpg'
import spread02 from '../image/textbook-spread-02.jpg'
import spread03 from '../image/textbook-spread-03.jpg'
import spread04 from '../image/textbook-spread-04.jpg'
import spread05 from '../image/textbook-spread-05.jpg'
import spread06 from '../image/textbook-spread-06.jpg'
import spread08 from '../image/textbook-spread-08.jpg'
import spread09 from '../image/textbook-spread-09.jpg'

const PAGE_BG = '#f8f8f8'

const sectionStyle = { backgroundColor: PAGE_BG }
const sectionStyleAlt = { backgroundColor: PAGE_BG }

export default function YoungHistoriansGuidePageZh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAGE_BG }}>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        variant="arrow"
      />

      <main style={{ backgroundColor: PAGE_BG }}>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <SectionBlock
            className="relative"
            style={{
              backgroundColor: PAGE_BG,
            }}
          >
            <TableOfContents />
            <Container className="relative z-10 flex flex-col items-center justify-center text-center">
              {/* Background image overlay (same pattern as Chivalry hero) */}
              <img
                src={cover1}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-25"
                loading="lazy"
              />
              {/* Tint to keep background subtle and readable */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0"
                style={{ backgroundColor: PAGE_BG, opacity: 0.75 }}
              />

              <h1 className="mt-10 text-large mobile:text-large-mobile">
                給年輕史家的漫遊指南
              </h1>
              <H3 className="text-gray-700/90">
                南一書局高中歷史課本｜編排設計、插畫｜2018
              </H3>
              <P className="mt-8 w-full md:w-2/3 text-gray-700">
                這是一本因應新課綱，南一書局高中歷史組和作者群傾盡心血製作的課本，內容在講述語言、翻譯如何影響我們的日常生活，是一個跨越地理位置與時間軸來看歷史的嶄新方法。
              </P>
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock style={sectionStyleAlt}>
          <Container>
            <H2>專案簡介</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  我負責全書的美術風格定調、排版設計，並擔綱插畫師，進行重要知識點的圖文整合，讓有趣的漫畫與圖解走入教科書，課本不再生澀無聊。
                </P>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">角色</p>
                <P className="text-gray-800 mb-6">Graphic Designer</P>

                <p className="text-h3 mb-2">時程</p>
                <P className="text-gray-800 mb-6">Dec 2017 – Nov 2018</P>

                <p className="text-h3 mb-2">工具</p>
                <UL>
                  <LI>Adobe Photoshop</LI>
                  <LI>Adobe Illustrator</LI>
                  <LI>Adobe InDesign</LI>
                </UL>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Cover Design */}
        <SectionBlock style={sectionStyle}>
          <Container>
            <H2>封面設計</H2>
            <P>風格與標準字都經過多次的演進過程。</P>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <LazyImage
                src={cover2}
                alt="封面設計發想與演進 01"
                className="w-full h-auto rounded-lg shadow-sm"
              />
              <LazyImage
                src={cover3}
                alt="封面設計發想與演進 02"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </Container>
        </SectionBlock>

        {/* Interior Design */}
        <SectionBlock style={sectionStyleAlt}>
          <Container>
            <H2>內頁設計</H2>
            <P>在課本內，我們使用大量的插圖以及引導思考的問答，減去生硬感，增加學生投入意願。</P>

            <div className="grid grid-cols-1 gap-6 mt-10">
              <LazyImage src={spread01} alt="內頁設計 01" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread02} alt="內頁設計 02" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread03} alt="內頁設計 03" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread04} alt="內頁設計 04" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread05} alt="內頁設計 05" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread06} alt="內頁設計 06" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread08} alt="內頁設計 08" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread09} alt="內頁設計 09" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </Container>
        </SectionBlock>

        {/* Footer */}
        <SectionBlock style={sectionStyle}>
          <Container className="flex flex-col items-center justify-center mb-24">
            <p className="text-h3 font-light">給年輕史家的漫遊指南</p>
            <p className="text-caption text-gray-600">2018</p>
          </Container>

          <RelatedProjects />

          <hr className="w-full my-8 border-black/10" />
          <Footer />
        </SectionBlock>
      </main>
    </div>
  )
}

