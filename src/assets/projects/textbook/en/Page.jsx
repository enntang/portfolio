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

const PAGE_BG = '#F7F1E7'
const PAGE_BG_ALT = '#F1E8DA'

const sectionStyle = { backgroundColor: PAGE_BG }
const sectionStyleAlt = { backgroundColor: PAGE_BG_ALT }

export default function YoungHistoriansGuidePageEn() {
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
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(247,241,231,1) 55%, rgba(241,232,218,1) 100%)',
            }}
          >
            <TableOfContents />
            <Container className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-[840px]">
                <LazyImage
                  src={cover1}
                  alt="A Traveler’s Guide for Young Historians cover design"
                  className="w-full h-auto rounded-2xl shadow-sm"
                  preload
                />
              </div>

              <h1 className="mt-10 text-large mobile:text-large-mobile">
                A Traveler’s Guide for Young Historians
              </h1>
              <H3 className="text-gray-700/90">
                Senior High School History Textbook (NANI)｜Editorial design &amp; illustration｜2018
              </H3>
              <P className="mt-8 w-full md:w-2/3 text-gray-700">
                A thematic history textbook that breaks away from traditional chronological narratives.
              </P>
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock style={sectionStyleAlt}>
          <Container>
            <H2>Project Brief</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  I led the visual direction and editorial layout across the entire book, and also created illustrations to
                  help explain key concepts—bringing comics and diagrams into the textbook to make learning more engaging.
                </P>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">Role</p>
                <P className="text-gray-800 mb-6">Graphic Designer</P>

                <p className="text-h3 mb-2">Timeline</p>
                <P className="text-gray-800 mb-6">Dec 2017 – Nov 2018</P>

                <p className="text-h3 mb-2">Tools</p>
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
            <H2>Cover Design</H2>
            <P>The style and logotype evolved through multiple iterations.</P>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <LazyImage
                src={cover2}
                alt="Cover design iteration 01"
                className="w-full h-auto rounded-lg shadow-sm"
              />
              <LazyImage
                src={cover3}
                alt="Cover design iteration 02"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </Container>
        </SectionBlock>

        {/* Interior Design */}
        <SectionBlock style={sectionStyleAlt}>
          <Container>
            <H2>Interior Layout</H2>
            <P>
              Inside the book, we used illustrations and guided Q&amp;A prompts to reduce intimidation and encourage active
              thinking.
            </P>

            <div className="grid grid-cols-1 gap-6 mt-10">
              <LazyImage src={spread01} alt="Interior layout 01" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread02} alt="Interior layout 02" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread03} alt="Interior layout 03" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread04} alt="Interior layout 04" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread05} alt="Interior layout 05" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread06} alt="Interior layout 06" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread08} alt="Interior layout 08" className="w-full h-auto rounded-lg shadow-sm" />
              <LazyImage src={spread09} alt="Interior layout 09" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </Container>
        </SectionBlock>

        {/* Footer */}
        <SectionBlock style={sectionStyle}>
          <Container className="flex flex-col items-center justify-center mb-24">
            <p className="text-h3 font-light">A Traveler’s Guide for Young Historians</p>
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

