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

// Images referenced by src/assets/projects/chivalry/chivalry.md
import coverTransparent from '../image/chivalry-cover-transparent.png'
import designConceptBoard from '../image/chivalry-design-concept-board.jpg'
import designConceptMockup from '../image/chivalry-design-concept-mockup.jpg'
import attributeCards from '../image/chivalry-attribute-cards.png'
import attributeHandMockup from '../image/chivalry-attribute-card-hand.png'
import backgroundImage from '../image/chivalry-background-rulebook.png'
import chivalryCards1 from '../image/chivalry-virtue-cards-1.jpg'
import chivalryCards2 from '../image/chivalry-virtue-cards-2.jpg'
import playerBoards1 from '../image/chivalry-player-boards-1.png'
import playerBoards2 from '../image/chivalry-player-boards-2.png'
import scoringBoard from '../image/chivalry-scoring-board.png'
import packaging from '../image/chivalry-packaging.jpg'

const PAGE_BG = '#420C22'
const PAGE_BG_ALT = '#2E0817'

const sectionStyle = { backgroundColor: PAGE_BG }
const sectionStyleAlt = { backgroundColor: PAGE_BG_ALT }

export default function ChivalryPageJa() {
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
        </SectionBlock>

        {/* Design Concept */}
        <SectionBlock className="text-white" style={sectionStyle}>
          <Container>
            <H2>Design Concept</H2>

            <P>
              To convey a sense of nobility and balance between realism and fantasy, I chose a{' '}
              <strong>low-saturation brick-red palette</strong> paired with metallic gradients and embossed surfaces.
            </P>
            <P>The muted tone carries the warmth of aged parchment while keeping the visual atmosphere grounded.</P>
            <P>
              Metallic accents and embossed details add a quiet sense of prestige, echoing the shine of armor and the crafted textures
              of medieval design.
            </P>
            <P>
              This color direction extends across the player board and rulebook: from the scoring panel, where color-coded elements
              distinguish each family’s identity, to the instruction layout that visually unifies all game components.
            </P>

            <div className="mt-10 space-y-6">
              <img
                src={designConceptBoard}
                alt="Design concept: layout and color direction"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={designConceptMockup}
                alt="Design concept: overall visual presentation"
                className="w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <P className="mt-10">
              The result is a consistent world where every surface—cards, icons, and even rules—feels like part of the same knightly order.
            </P>
          </Container>
        </SectionBlock>

        {/* Visual System */}
        <SectionBlock className="text-white" style={sectionStyleAlt}>
          <Container>
            <H2>Visual System</H2>

            <H3>Typography</H3>
            <div className="mt-8">
              <img src={coverTransparent} alt="Chivalry logotype design" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">The logotype draws inspiration from Gothic calligraphy—structured yet elegant.</P>
            <P>
              By embedding a sword motif through the letterforms and adding embossed highlights, the type becomes both a decorative and
              narrative element, embodying the “knight’s code.”
            </P>

            <H3>Attribute Card</H3>
            <P>
              Each key ability—<strong>Strength, Wisdom, and Charm</strong>—was represented by its own emblem:
            </P>
            <UL>
              <LI>
                <strong>Sword</strong> for power and courage
              </LI>
              <LI>
                <strong>Book</strong> for intellect and strategy
              </LI>
              <LI>
                <strong>Rose</strong> for charm and empathy
              </LI>
            </UL>
            <div className="mt-8 space-y-6">
              <img src={attributeCards} alt="Attribute cards: Strength / Wisdom / Charm" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={attributeHandMockup} alt="Attribute card mockup in hand" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              The shield-like frame unites them under one family crest, creating a sense of order and collectability across the cards.
            </P>

            <H3>Chivalry Cards</H3>
            <P>Eight virtues define the path to victory.</P>
            <P>Each virtue was visualized with a unique icon and color theme to make its attribute immediately recognizable in gameplay.</P>
            <P>The icons follow a shared geometric rhythm, echoing heraldic symbols from medieval banners.</P>
            <div className="mt-8 space-y-6">
              <img src={chivalryCards1} alt="Chivalry cards: icon system" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={chivalryCards2} alt="Chivalry cards: card layout" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>

            <H3>Player Boards</H3>
            <P>
              Each of the five families is represented with its own <strong>crest and color</strong>, forming a distinctive visual identity while maintaining a consistent layout grid for cards and dice placement.
            </P>
            <div className="mt-8 space-y-6">
              <img src={playerBoards1} alt="Player boards: family crests and color palette" className="w-full h-auto rounded-2xl" loading="lazy" />
              <img src={playerBoards2} alt="Player boards: layout system" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>

            <H3>Scoring Board</H3>
            <TwoColumn className="items-start mt-8">
              <div>
                <img src={scoringBoard} alt="Scoring board" className="w-full h-auto rounded-2xl" loading="lazy" />
              </div>
              <div>
                <P>The scoring board tracks each knight’s progress throughout the game.</P>
                <P>Players earn points by fulfilling missions and demonstrating virtues, advancing their markers upward on the ladder.</P>
                <P>
                  As points accumulate, the knight ascends in rank—visually and symbolically moving closer to achieving true chivalry.
                </P>
              </div>
            </TwoColumn>

            <H3>Packaging Design</H3>
            <div className="mt-8">
              <img src={packaging} alt="Packaging design" className="w-full h-auto rounded-2xl" loading="lazy" />
            </div>
            <P className="mt-8">
              The outer box extends the game’s identity through <strong>brick-red tones and embossed shield patterns</strong>, creating tactile continuity from cards to box.
            </P>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock className="text-white" style={sectionStyle}>
          <Container>
            <H2>Reflection</H2>
            <P>
              To keep the visual style consistent, I mapped out all components at the start to plan color and texture as one system.
            </P>
            <P>
              Recreating a medieval look required careful study. I gathered references from manuscripts and heraldic designs to capture their essence and reinterpret them in a cleaner, modern way.
            </P>
            <P>
              In the end, I learned that the groundwork—researching, organizing, and connecting details—is never the step to skip.
            </P>
          </Container>
        </SectionBlock>

        <RelatedProjects />

        <div className="pt-6 pb-12" style={sectionStyle}>
          <Footer className="text-white/60" />
        </div>
      </main>
    </div>
  )
}

