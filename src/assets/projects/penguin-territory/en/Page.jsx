import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../../../components/utilities/Navbar'
import Footer from '../../../../components/utilities/Footer'
import { useFloatingAnimation } from '../../../../hooks/useFloatingAnimation'
import Container from '../../../../components/projects/Container'
import SectionBlock from '../../../../components/projects/SectionBlock'
import TwoColumn from '../../../../components/projects/TwoColumn'
import TableOfContents from '../../../../components/utilities/TableOfContents'
import LazyImage from '../../../../components/utilities/LazyImage'
import ImageWithHotspots from '../../../../components/utilities/ImageWithHotspots'
import quote from '../../../../../public/icon-quote.svg'

gsap.registerPlugin(ScrollTrigger)

import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

import arrowDown from '../../../../../public/icon-arrow-down.svg'
import iconLink from '../../../../../public/icon-link.svg'
import bgPenguin from '../../../../../public/bg-penguin.png'

// Images from markdown: src/assets/projects/penguin-territory/image/*
import thumb from '../image/penguin-territory-thumb-4x3.png'
import designGoal1 from '../image/penguin-territory-Untitled.png'
import designGoal2 from '../image/penguin-territory-Untitled 1.png'
import designGoal3 from '../image/penguin-territory-Untitled 2.png'
import miro from '../image/penguin-territory-miro.png'
import wireframe from '../image/penguin-territory-wireframe2.png'
import wireframeNoText1 from '../image/penguin-territory-wireframe-notext-1.jpg'
import wireframeNoText2 from '../image/penguin-territory-wireframe-notext-2.jpg'
import loginImg from '../image/penguin-territory-login.png'
import roomListImg from '../image/penguin-territory-room-list.png'
import roomWaitingImg from '../image/penguin-territory-room-waiting-not-ready.png'
import turn01 from '../image/penguin-territory-turn-self-01.png'
import turn02 from '../image/penguin-territory-turn-self-02.png'
import turn04 from '../image/penguin-territory-turn-self-04.png'
import tips1 from '../image/penguin-territory-tips-1.png'
import tips2 from '../image/penguin-territory-tips-2.png'
import tips3 from '../image/penguin-territory-tips-3.png'
import resultImg from '../image/penguin-territory-result.png'
import addRoomImg from '../image/penguin-territory-add-room.png'
import logoutPopupImg from '../image/penguin-territory-logout-popup.png'
import watercolorOriginal from '../image/penguin-territory-watercolor-original.jpg'
import bg1 from '../image/penguin-territory-bg-1.png'
import bg2 from '../image/penguin-territory-bg-2.png'
import penguin1 from '../image/penguin-territory-penguin-1.png'
import penguin2 from '../image/penguin-territory-penguin-2.png'
import penguin3 from '../image/penguin-territory-penguin-3.png'
import projectListIcon from '../image/penguin-territory-projectList-icon-penguin.png'

const penguinBackgrounds = {
  penguin: bgPenguin,
  penguinBg1: bg1,
  penguinBg2: bg2,
}

export default function PenguinTerritoryPageEn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })
  const penguin1Ref = useRef(null)
  const penguin3Ref = useRef(null)

  // Hotspot modules (one per screen)
  // Coordinates are in percentage relative to image width/height and can be fine-tuned visually in the browser.
  const loginHotspots = [
    {
      id: 'point1',
      x: 60,
      y: 20,
      content: 'The panel is designed with the imagery of snow piles and ice blocks.',
      arrowPosition: 'bottom',
    },
  ]

  const roomListHotspots = [
    {
      id: 'point1',
      x: 90,
      y: 8,
      content: 'The logout button is placed in the top-right corner, following common user habits.',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 90,
      y: 90,
      content: 'Background music can be toggled in the bottom-right corner.',
      arrowPosition: 'top',
    },
    {
      id: 'point3',
      x: 50,
      y: 50,
      content: 'The room list scrolls vertically with differentiated states: open rooms can be joined anytime; full rooms display "Starting Soon" and are locked.',
      arrowPosition: 'top',
    },
  ]
  const turnHotspots1 = [
    {
      id: 'point1',
      x: 12,
      y: 12,
      content: 'The sidebar shows whose turn it is, with colors matching the hexagonal ice blocks for easy reference.',
      arrowPosition: 'bottom',
    },
  ]
  const turnHotspots2 = [
    {
      id: 'point1',
      x: 42,
      y: 82,
      content: 'After a player confirms their action, a button appears to remind them of the next step.',
      arrowPosition: 'bottom',
    },
  ]

  const waitingHotspots = [
    {
      id: 'point1',
      x: 40,
      y: 30,
      content: 'Swipe left and right to select your favorite penguin. The UI uses size and opacity to create depth.',
      arrowPosition: 'bottom',
    },
    
  ]

  const resultHotspots = [
    {
      id: 'point1',
      x: 20,
      y: 20,
      content: 'The highest-scoring winner shines in the largest panel.',
      arrowPosition: 'bottom',
    },
   
  ]


  useEffect(() => {
    // Animate penguin1 from right to left
    gsap.fromTo(
      penguin1Ref.current,
      {
        x: 300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: penguin1Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )

    // Animate penguin3 from left to right
    gsap.fromTo(
      penguin3Ref.current,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: penguin3Ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
  }, [])

  useEffect(() => {
    // Load Instagram embed script if not already loaded
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]')

    if (existingScript) {
      // Script already exists, just process embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
      return
    }

    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
    document.body.appendChild(script)
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
          <SectionBlock
            bgVariant="penguinBg1"
            className="relative"
            backgrounds={penguinBackgrounds}
            textDarkOnBg
          >
            <TableOfContents />
            <Container className="flex flex-col items-center justify-center text-center">

              <h1 className="mt-10  text-large mobile:text-large-mobile">Penguin Territory</h1>
              <H3 className="mb-16">Turn-based Strategy Web Game | UI/UX, Illustration, Visual Design</H3>

              <img
                ref={arrowDownRef}
                src={arrowDown}
                alt="Scroll down"
                className="w-6 h-6 rounded-lg"
              />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock>
          <Container>
            <H2>Project Overview</H2>

            <TwoColumn>
              <div>
                <P>
                  This is a side project completed in collaboration with a frontend engineer and a backend engineer.
                </P>
                <P>
                  With a lot of information during gameplay (penguin count on the map, player action order, latest battle status, etc.), properly guiding and clearly presenting this information was the core UI design challenge.
                </P>
                <P className="text-caption text-gray-500 font-light">
                  Target Users: Web board game players (accustomed to playing on desktop/laptop with online multiplayer needs)
                </P>
                <div ref={penguin1Ref} className="w-48 h-auto self-end mb-4 absolute bottom-20 right-0">
                  <LazyImage src={penguin1} alt="" className="w-full h-auto -scale-x-100 rounded-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-2">

                <p className="text-h3">Role</p>
                <P>UI/UX Designer</P>
                <p className="text-h3">Timeline</p>
                <P>Aug 2024 - Dec 2024</P>
                <p className="text-h3">Tools</p>
                <P>
                  Gouache / Watercolor
                  <br />
                  Figma
                  <br />
                  Procreate
                </P>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Design Goals */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>

            <H2>Design Goals</H2>
            <div ref={penguin3Ref} className="w-48 h-auto self-end mb-4 absolute top-[-60px] left-0">
              <LazyImage src={penguin3} alt="" className="w-full h-auto -scale-x-100 rounded-lg" />
            </div>
            <div className="bg-white/60 backdrop-blur rounded-sm shadow p-6 md:p-8">
            <img src={quote} alt="quote" className='mb-2 rounded-lg' />
              <p>
                Our goal is simple: create an online board game that is visually appealing and easy to play.
              </p>

            </div>

            <P className="mt-8">The development team initially had a playable prototype, but there was still room for improvement in the UI:</P>
            <UL>
              <LI>Unclear overall art style, typography and button hierarchy needed refinement</LI>
              <LI>Lacked onboarding flow design from login to game room</LI>
            </UL>
            <div className="mt-8">
              <div className="relative flex flex-row mt-10 items-start">


                {/* Old version 2 with hover to new version */}
                <div className="relative group cursor-pointer transform -rotate-3 w-[640px] ">
                  <div className="relative overflow-hidden rounded-lg shadow aspect-[17/10]">
                    {/* Old version image */}
                    <div className="relative transition-opacity duration-300 group-hover:opacity-0 w-full h-full">
                      <LazyImage src={designGoal2} alt="Early interface screenshot 2" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* New version image (shown on hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <LazyImage src={turn02} alt="New interface screenshot 2" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* OLD watermark overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className=" text-white/60 select-none">Before & After: In-game screen</span>
                    </div>
                  </div>
                </div>

                {/* Old version 3 with hover to new version */}
                <div className="relative group cursor-pointer transform rotate-3 w-[600px] ml-[-120px] mt-32">
                  <div className="relative overflow-hidden rounded-lg shadow aspect-[16:10]">
                    {/* Old version image */}
                    <div className="relative transition-opacity duration-300 group-hover:opacity-0 w-full h-full">
                      <LazyImage src={designGoal3} alt="Early interface screenshot 3" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* New version image (shown on hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <LazyImage src={resultImg} alt="New interface screenshot 3" className="w-full h-full object-cover block rounded-lg" />
                    </div>
                    {/* OLD watermark overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className="text-white/60 select-none">Before & After: Score summary</span>
                    </div>
                  </div>
                </div>
              </div></div>
          </Container>
        </SectionBlock>

        {/* Collaboration artifacts */}
        <SectionBlock>
          <Container>
            <H2>Process & Collaboration</H2>
            <P>
              I adjusted the overall layout through wireframes, detailed all state changes during gameplay, and exchanged ideas on Miro's online whiteboard.
            </P>
            <LazyImage src={miro} alt="Miro online whiteboard" className="w-full h-auto rounded-lg shadow mb-4" />
              <LazyImage src={wireframe} alt="Wireframe" className="w-full h-auto rounded-lg shadow" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LazyImage src={wireframeNoText1} alt="Wireframe (no text) 1" className="w-full h-auto rounded-lg shadow" />
              <LazyImage src={wireframeNoText2} alt="Wireframe (no text) 2" className="w-full h-auto rounded-lg shadow" />
            </div>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container>
            <H2>Design Deliverables</H2>

            <H3>Clear Onboarding Flow</H3>
            <P>Players can choose to log in with an account or play as a guest.</P>
            <P>After logging in, the flow is straightforward: players enter the waiting queue → select a penguin → wait in the room.</P>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <ImageWithHotspots src={loginImg} alt="Login screen" hotspots={loginHotspots} className="w-full h-auto rounded-lg shadow" />
              <ImageWithHotspots src={roomListImg} alt="Room list" hotspots={roomListHotspots} className="w-full h-auto rounded-lg shadow" />
              <ImageWithHotspots src={roomWaitingImg} hotspots={waitingHotspots} alt="Room waiting: player not ready" className="w-full h-auto rounded-lg shadow" />
            </div>
            <P className="mt-6">
              The room list scrolls vertically with differentiated states: open rooms can be joined anytime; full rooms display "Starting Soon" and are locked.
              The interface uses a familiar four-corner layout: logout button in the top-right, background music toggle in the bottom-right.
            </P>

            <div className="mt-16">
              <H3>Core Interaction Flow: Game Start</H3>
              <P>Players take turns placing their first penguin on the outer edge of the map. The game proceeds in turns, with only one player's penguins able to act per round.</P>
              <P>When planning the UI, my design principle was to provide clear action prompts and feedback. The approach includes:</P>
              <UL>
                <LI>Hexagonal grids separated by different color blocks for easy target identification</LI>
                <LI>Glow + arrow indicators showing where pieces can be placed</LI>
                <LI>Hover to preview placement position</LI>
              </UL>
              <P>
                After a player confirms their action, it automatically moves to the next player's turn. When it's a player's turn, a modal message appears to prevent players from missing the state and delaying the game.
              </P>
              <div className="grid grid-cols-1 gap-4 mt-8">
                <ImageWithHotspots src={turn01} alt="Player's turn 01" className="w-full h-auto rounded-lg shadow" />
                <ImageWithHotspots src={turn02} alt="Player's turn 02" hotspots={turnHotspots1} className="w-full h-auto rounded-lg shadow" />
                <ImageWithHotspots src={turn04} alt="Player's turn 04" hotspots={turnHotspots2} className="w-full h-auto rounded-lg shadow" />
              </div>
              <P className="mt-6">
                I designed the sidebar to display battle status, with player order on the left and real-time scoring on the right. When distributing, the "numbers" for source and destination are important information, so they're highlighted with a black background.
              </P>
            </div>

            <div className="mt-16">
              <H3>Clear Rule Instructions</H3>
              <P>Players can view rule instructions at any time during the game. Each page includes simplified illustrations to avoid lengthy text.</P>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <LazyImage src={tips1} alt="Rule instructions 1" className=" -rotate-3 w-full h-auto rounded-lg shadow" />
                <LazyImage src={tips2} alt="Rule instructions 2" className=" rotate-3 w-full h-auto rounded-lg shadow" />
                <LazyImage src={tips3} alt="Rule instructions 3" className=" -rotate-3 w-full h-auto rounded-lg shadow" />
              </div>
            </div>

            <div className="mt-16">
              <H3>A Rewarding Results Screen for Winners</H3>
              <P>
                When victory conditions are met, the game ends and displays the results screen. The highest-scoring winner shines in the largest panel, while other players' scores are also displayed in ranked order.
              </P>
              <ImageWithHotspots src={resultImg} alt="Results screen" hotspots={resultHotspots} className="w-full h-auto rounded-lg shadow mt-8" />
            </div>
          </Container>
        </SectionBlock>

        {/* Visual Design */}
        <SectionBlock>
          <Container>
            <H2>Visual Design</H2>
            <P>
              The overall design uses a refreshing color palette based on ice fields and ocean water, with hand-drawn style to add warmth. The interface employs extensive rounded corners and soft shadows to create a friendly, relaxed gaming atmosphere.
            </P>

            <LazyImage src={addRoomImg} alt="Add room" className="w-full h-auto rounded-lg shadow mb-10" />
            <LazyImage src={logoutPopupImg} alt="Confirm logout popup" className="w-full h-auto rounded-lg shadow" />

            <P className="mt-10">
              Penguin illustrations are integrated into UI states and operation hints, creating a consistent style that enhances immersion. To make the visuals more story-driven, the penguin artwork was hand-drawn,
              primarily using gouache: painted on paper, then photographed, scanned, and digitally finished.
            </P>
            <LazyImage
              src={watercolorOriginal}
              alt="Original artwork painted with gouache"
              className="w-full h-auto rounded-lg shadow mt-8"
            />
            <p className="text-caption text-gray-500 font-light mt-3">Original artwork painted with gouache</p>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock bgVariant="penguinBg2" backgrounds={penguinBackgrounds} textDarkOnBg>
          <Container className="w-full">
            <TwoColumn>
              <div>
               
                <H2>Reflection</H2>
                <P>
                  In this project, I simplified complex rules through UI elements, using color, contrast, and animation to create visual hierarchy, helping players understand game mechanics quickly.
                  Games differ from apps—<strong>action feedback</strong> greatly impacts comprehension difficulty.
                </P>
                <P>Providing "next step hints" without disrupting the visual experience was a major challenge.</P>
                <LazyImage src={penguin2} alt="" className="w-60 h-auto -scale-x-100 rounded-lg" />
                <P>
                  Additionally, I leveraged my multi-media style; the fusion of illustration and UI made the product more appealing and received positive user feedback.
                  After the project concluded, I also documented the process in a short video—feel free to click and watch.
                </P>
              </div>
              <div>
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%', width: '-webkit-calc(100% - 2px)', width: 'calc(100% - 2px)' }}
                >
                  <div style={{ padding: '16px' }}>
                    <a
                      href="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                      style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                        </div>
                      </div>
                      <div style={{ padding: '19% 0' }}></div>
                      <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                        <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                              <g>
                                <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div style={{ paddingTop: '8px' }}>
                        <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>View this post on Instagram</div>
                      </div>
                      <div style={{ padding: '12.5% 0' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                        <div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                        </div>
                        <div style={{ marginLeft: '8px' }}>
                          <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                          <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <div style={{ width: 0, borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                          <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                          <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                      </div>
                    </a>
                    <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a
                        href="https://www.instagram.com/reel/DQ0eWAQgVW8/?utm_source=ig_embed&amp;utm_campaign=loading"
                        style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        A post shared by Enn Tang｜愛畫畫的 UX 設計師 (@enntang)
                      </a>
                    </p>
                  </div>
                </blockquote>
              </div>
            </TwoColumn>

            <div className="flex flex-col items-center justify-center mt-16">
              <img src={projectListIcon} alt="" className="w-14 h-14 mb-3 object-contain rounded-lg" />
              <p className="text-h3 font-light">Penguin Territory</p>
              <p className="text-caption">2024</p>
            </div>
          </Container>
          <hr className="w-full my-8 border-white/20" />
          <Footer />
        </SectionBlock>
      </main>
    </div>
  )
}
