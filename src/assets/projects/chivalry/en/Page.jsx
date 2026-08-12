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

const sectionStyle = { backgroundColor: PAGE_BG }
const sectionStyleAlt = { backgroundColor: PAGE_BG_ALT }

export default function ChivalryPageEn() {
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
              <h1 className="mt-10 text-large mobile:text-large-mobile hidden">Chivalry</h1>

              <div className="w-full max-w-[720px]">
                <img
                  src={coverTransparent}
                  alt="Chivalry project cover"
                  className="w-full h-auto rounded-2xl shadow-sm"
                  loading="lazy"
                />
              </div>
              <H3 className="text-white/90">Board Game Design｜Illustration, Visual Design｜2017</H3>
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock className="text-white" style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H2>Project Brief</H2>

            <TwoColumn className="items-start">
              <div>
                <P>
                  <em>Chivalry</em> is a medieval-themed board game where players act as aspiring knights striving to bring honor
                  to their families. Each gameplay element reflects a core value of knighthood—strength, wisdom, and charisma—
                  translated visually through symbols and textures that build a consistent, immersive atmosphere.
                </P>
                <P>
                  My role focused on defining the <strong>visual identity system</strong>, including iconography, typography, and card
                  illustration. The goal was to create a cohesive world that communicates the spirit of “chivalry” at first glance.
                </P>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                <p className="text-h3 mb-2">Role</p>
                <P className="text-white/90 mb-6">Graphic Designer</P>

                <p className="text-h3 mb-2">Timeline</p>
                <P className="text-white/90 mb-6">2017</P>

                <p className="text-h3 mb-2">Tools</p>
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
        <SectionBlock className="text-white" style={sectionStyle}>
        <FadeIn>
          <Container>
            <H2>Design Concept</H2>

            <P>
              I built the palette around a <strong>low-saturation brick red</strong>, paired with metallic gradients and embossed
              textures to create a grounded, understated sense of prestige.
            </P>
            <P>
              That visual language extends to the player boards and the rulebook: family colors and a shared layout system keep the
              cards, icons, and rule pages inside one consistent world.
            </P>

            <div className="mt-10">
              <img
                src={designConceptBoard}
                alt="Design concept: layout and color direction"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <P className="mt-10">
              The player tokens use a knight silhouette, marking each player’s position as they move.
            </P>

            <div className="mt-8">
              <img
                src={designConceptMockup}
                alt="Design concept: knight silhouette player tokens"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>
          </Container>
        </FadeIn>
        </SectionBlock>

        {/* Visual System */}
        <SectionBlock className="text-white" style={sectionStyleAlt}>
        <FadeIn>
          <Container>
            <H2>Visual System</H2>

            <H3>Typography</H3>
            <div className="mt-8">
              <img src={coverTransparent} alt="Chivalry logotype design" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              A Gothic typeface carries the medieval character, with embossed light and shadow evoking the fantasy of an imagined world.<br />
              The sword running through the letterforms points back to the core image of the knight.
            </P>

            <H3>Ability Cards</H3>
            <div className="mt-8 space-y-6">
              <img src={attributeCards} alt="Ability cards: Strength / Wisdom / Charm" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={attributeHandMockup} alt="Ability card mockup in hand" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              The three key abilities of a great knight—strength, wisdom, and charm—are represented by a sword, a book, and a rose,
              tied together by the shield motif that frames them all.
            </P>

            <H3>Chivalry Cards</H3>
            <div className="mt-8 space-y-6">
              <img src={chivalryCards1} alt="Chivalry cards: icon system" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={chivalryCards2} alt="Chivalry cards: card layout" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              Eight virtues define the path to victory. Each virtue has its own icon and color so players can recognize it at a glance
              during play.
            </P>

            <H3>Player Boards</H3>
            <P>
              Each player board builds on one of the five family crests, using the family color as its base to divide the areas for
              cards and dice.
            </P>
            <div className="mt-8 space-y-6">
              <img src={playerBoards1} alt="Player boards: family crests and color palette" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={playerBoards2} alt="Player boards: layout system" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <p className="mt-4 text-caption italic text-white/70">
              *Family crest illustrations by Tin Hsu
            </p>

            <H3>Scoring Board</H3>
            <TwoColumn className="items-start mt-8">
              <div>
                <img src={scoringBoard} alt="Scoring board" className="w-full h-auto rounded-2xl" loading="lazy" />
              </div>
              <div>
                <P>
                  The scoring board tracks each knight’s progress throughout the game. Players earn points by completing missions and
                  demonstrating virtues, advancing their markers upward.
                </P>
                <P>
                  The higher the score, the higher the knight’s rank, visually and symbolically moving closer to true chivalry.
                </P>
              </div>
            </TwoColumn>

            <H3>Packaging Design</H3>
            <div className="mt-8">
              <img src={packaging} alt="Packaging design" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              The outer box carries the theme’s brick red and the embossed patterns used on the cards, tying the whole set together.
            </P>
            <p className="mt-4 text-caption italic text-white/70">
              *Medieval street illustration by Tin Hsu
            </p>

            {/* Credits */}
            <dl className="mt-20 mobile:mt-16 border-t border-white/15 pt-8 space-y-3 text-caption text-white/80">
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-white/50">Client</dt>
                <dd>TRANSIT工作室</dd>
              </div>
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-white/50">Art Direction, Design</dt>
                <dd>湯靜恬 Enn Tang</dd>
              </div>
              <div className="flex gap-6 mobile:gap-4">
                <dt className="w-[200px] mobile:w-[120px] shrink-0 text-white/50">Illustration</dt>
                <dd>湯靜恬 Enn Tang, 許庭瑋 Tin Hsu</dd>
              </div>
            </dl>

            <div className="flex flex-col items-center justify-center mt-16">
              <img src={coverTransparent} alt="" className="w-40 h-auto mb-3 object-contain" />
              <p className="text-h3 font-light">Chivalry</p>
              <p className="text-caption text-white/60">2017</p>
            </div>
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

