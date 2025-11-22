import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../../components/utilities/Navbar'
import { useFloatingAnimation } from '../../../hooks/useFloatingAnimation'
import ImageWithHotspots from '../../../components/utilities/ImageWithHotspots'
import Footer from '../../../components/utilities/Footer'
import ProjectNote from '../../../components/projects/ProjectNote'
import Container from '../../../components/projects/Container'
import SectionBlock from '../../../components/projects/SectionBlock'
import TwoColumn from '../../../components/projects/TwoColumn'
import TableOfContents from '../../../components/utilities/TableOfContents'
import LazyImage from '../../../components/utilities/LazyImage'

gsap.registerPlugin(ScrollTrigger)

// Import images - you'll need to add these images to the ehairpos folder
import arrowDown from '../../../../public/icon-arrow-down.svg'
import quote from '../../../../public/icon-quote.svg'


// Import ehairpos project images
import BG1 from './projectInfo-ehairpos-bg-1.png'
import BG2 from './projectInfo-ehairpos-bg-2.png'

// 定义 ehairpos 项目的背景图片映射
const ehairposBackgrounds = {
  purple: BG1,
  photo: BG2,
}
import iconEhairpos from './projectList-icon-ehairpos.png'
import decoIcons1 from './projectInfo-ehairpos-deco-icons1.svg'
import decoIcons2 from './projectInfo-ehairpos-deco-icons2.svg'
import bgWave from './projectInfo-ehairpos-bg-wave.svg'
import iconLink from './projectInfo-ehairpos-icon-link.svg'
import iconIOS from './projectInfo-ehairpos-icon-ios.svg'
import tablet from './projectInfo-ehairpos-tablet.png'

import screenshot01 from './projectInfo-ehairpos-screenshot01.png'
import screenshot02 from './projectInfo-ehairpos-screenshot02.png'
import screenshot03 from './projectInfo-ehairpos-screenshot03.png'
import screenshot04 from './projectInfo-ehairpos-screenshot04.png'
import screenshot05 from './projectInfo-ehairpos-screenshot05.png'
import screenshot06 from './projectInfo-ehairpos-screenshot06.png'
import screenshot07 from './projectInfo-ehairpos-screenshot07.png'
import screenshot08 from './projectInfo-ehairpos-screenshot08.png'
import screenshot09 from './projectInfo-ehairpos-screenshot09.png'
import screenshot10 from './projectInfo-ehairpos-screenshot10.png'
import screenshot11 from './projectInfo-ehairpos-screenshot11.png'
import screenshot12 from './projectInfo-ehairpos-screenshot12.png'
import draft1 from './projectInfo-ehairpos-draft1.png'
import draft2 from './projectInfo-ehairpos-draft2.jpg'
import old1 from './projectInfo-ehairpos-old1.jpg'
import old2 from './projectInfo-ehairpos-old2.png'
import old3 from './projectInfo-ehairpos-old3.png'
import logo from './projectInfo-ehairpos-logo_concept1.png'
import logo2 from './projectInfo-ehairpos-logo_concept2.png'

import P from '../../../components/post/P'
import H2 from '../../../components/post/H2'
import H3 from '../../../components/post/H3'
import UL from '../../../components/post/UL'
import LI from '../../../components/post/LI'

export default function EHairPOSPage() {
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
      content: 'Search filters allow sorting by birthday, tags, and purchase history.',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 4,
      y: 30,
      content: 'Stylists can tag customers with color-coded stars based on in-store preferences or internal workflows.',
      arrowPosition: 'top',
    },
  ]

  const customersNotesHotspots = [
    {
      id: 'point1',
      x: 64,
      y: 32,
      content: 'Stylists from different branches can leave notes on a shared timeline',
      arrowPosition: 'bottom',
    },
  ]

  const customersChartsHotspots = [
    {
      id: 'point1',
      x: 22,
      y: 42,
      content: 'The analysis system highlights each customer’s spending power and purchase preferences',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 64,
      y: 62,
      content: 'This chart is ranked by purchase frequency.',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots1 = [
    {
      id: 'point1',
      x: 13,
      y: 4,
      content: 'Switch between full-month and single-day views to match different planning needs.',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 8,
      y: 42,
      content: 'The left sidebar lists all customers scheduled for the selected day for quick reference.',
      arrowPosition: 'bottom',
    },
    {
      id: 'point3',
      x: 80,
      y: 18,
      content: 'Customers from different stylists are shown together on the same timeline.',
      arrowPosition: 'bottom',
    },
  ]

  const calendarHotspots2 = [
    {
      id: 'point1',
      x: 60,
      y: 34,
      content: 'List all customers scheduled for the selected day for quick reference.',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 49,
      y: 68,
      content: 'Day-off information is marked directly on the calendar cells.',
      arrowPosition: 'top',
    },
  ]
  const shoppingHistoryHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 52,
      content: 'Click a category to instantly expand and browse all items within it.',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 8,
      y: 22,
      content: 'Use filters to more accurately find specific products.',
      arrowPosition: 'bottom',
    },
  ]

  const checkoutHotspots = [
    {
      id: 'point1',
      x: 78,
      y: 60,
      content: 'Amounts can be split between cash and credit card payments (accept both simultaneously).',
      arrowPosition: 'bottom',
    },
    {
      id: 'point2',
      x: 12,
      y: 22,
      content: 'List all transaction details.',
      arrowPosition: 'bottom',
    },
  ]


  const memberCardHotspots = [
    {
      id: 'point1',
      x: 30,
      y: 58,
      content: 'The use of stored-value cards is clear at a glance.',
      arrowPosition: 'bottom',
    },
  ]

  const discountHotspots = [
    {
      id: 'point1',
      x: 70,
      y: 57,
      content: 'Stylists can offer coupons to clients, who can easily find them in the app through search or filters.',
      arrowPosition: 'top',
    },
    {
      id: 'point2',
      x: 9,
      y: 22,
      content: 'Filters allow more accurate searching for specific coupons.',
      arrowPosition: 'top',
    },
  ]

  const performanceStoreHotspots = [
    {
      id: 'performance-store',
      x: 18,
      y: 24,
      content: 'Store performance: revenue, visit count, and key KPIs across branches.',
      arrowPosition: 'right',
    },
  ]

  const performancePersonalHotspots = [
    {
      id: 'performance-personal',
      x: 70,
      y: 30,
      content: 'Personal performance: stylist-level metrics that support coaching, rewards, and growth.',
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
              <H3 className='mb-24 text-gray-900'>Salon Management Tool</H3>
              <P className='w-full md:w-2/3 text-gray-900'>A comprehensive POS system designed specifically for hair salons, streamlining workflows from appointment booking to payment processing.</P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6" />
              <img src={decoIcons1} alt="decoIcons1" className='absolute top-4 md:top-0 right-0 w-32 md:w-60 ' />
              <img src={decoIcons2} alt="decoIcons2" className='absolute top-16 md:top-[10vh] left-0 w-24 md:w-32 ' />


            </Container>

          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container className='flex flex-col items-center justify-center'>

            <H2>Project Brief</H2>
            <LazyImage src={tablet} alt="tablet" className='w-full md:w-2/3 h-auto' />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  This project began as a redesign of our company’s in-house POS system, reimagined specifically for the needs of hair salons.
                  The result was a tailored, salon-specific solution that streamlined both front-of-house and backend operations—built as an iPad app for daily use by salon staff, connected to a centralized management system for inventory, client, and sales data.
                </P>
                <p className='text-caption text-gray-500 font-light'>Note: All names, phone numbers, and birthdays shown in the following screens are computer-generated dummy data. They have no connection to real people.</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-h3'>Role</p>
                <P>UI/UX Designer</P>
                <p className='text-h3'>Timeline</p>
                <P>2020 – 2021</P>
                <p className='text-h3'>Tools</p>
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
            <H2>Key Responsibilities</H2>

            <UL>
              <LI>Led the redesign planning: from information architecture and visual direction to wireframes and UI mockups</LI>
              <LI>Worked closely with a PHP backend engineer and an iOS developer</LI>
              <LI>Created the app’s logotype</LI>
            </UL>
          </Container>
        </SectionBlock>

        {/* target audience */}
        <SectionBlock variant="photo" backgrounds={ehairposBackgrounds}>
          <Container>
          <TwoColumn>
              <H2>Target Audience</H2>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">Salon owners / managers</div>
                  <P>Mid- to high-end hair salons in Taiwan, often operating multiple locations</P>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">Stylists and assistants</div>
                  <P>Frontline staff who manage clients, appointments, and sales</P>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">Training partners</div>
                  <P>Vocational institutions incorporating eHairPOS into salon education programs</P>
                </div>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Background */}
        <SectionBlock variant="white" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>Background</H2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
              <div>
                <H3>Why Redesign?</H3>
                <P>The original POS system was a general-use tool with little consideration for the salon environment. Its outdated UI and disconnected workflows caused:</P>
                <UL>
                  <LI>Long onboarding times for new employees</LI>
                  <LI>Fragmented customer data across different screens</LI>
                  <LI>Inefficient checkout and booking processes</LI>
                </UL>
                <P>We set out to create a solution that actually matched how salon teams work day-to-day: intuitive, unified, and designed with both business goals and service flow in mind.</P>
              </div>
              <div>
                <H3>Design Goals</H3>
                <UL>
                  <LI><strong>Unify customer operations: </strong>All client-related actions (booking, record edits, checkout, membership cards, coupon use) were brought into a single screen. Stylists no longer need to jump between modules just to serve one client.</LI>
                  <LI><strong>Add business value: </strong>We designed not just for daily transactions, but for long-term insight. Visual reporting tools help owners see customer trends and plan strategies.</LI>
                </UL>
              </div>
            </div>
            <img src={draft1} alt="draft1" className='w-full h-auto mt-16 rounded-xs' />
            <p className='text-caption text-gray-500 font-light mt-4'>Avoided piecemeal UI; drafted and compared layouts as a whole.</p>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>Design Deliverables</H2>
            <H3>Customer Management with Advanced Filtering</H3>
            <P>We moved away from modal-based browsing and adopted a split-view layout. Users can now browse the customer list and view full details side-by-side—cutting down on lookup time and reducing clicks.</P>
            <P>Old version: When browsing the customer list, viewing details opened a full-screen modal. Closing it was required to return to the list.</P>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-16'>
              <img src={old1} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
              <img src={old2} alt="old1" className='w-full h-auto mt-16 rounded-xs' />
            </div>
            <P>The new version adopts a split-view layout: clicking a customer in the list will instantly show their details on the right side.</P>
            <ImageWithHotspots
              src={screenshot01}
              alt="Customers list"
              hotspots={customersHotspots}
              className='mb-8'
            />
            <P>Notes from different stylists are shown in a timeline view, giving teams a shared record of client preferences.</P>

            <ImageWithHotspots
              src={screenshot02}
              alt="Customer notes"
              hotspots={customersNotesHotspots}
              className='mb-8'
            />

            <P>Visual charts summarize visit frequency, spending, and service mix, helping owners spot VIPs.</P>
            <ImageWithHotspots
              src={screenshot03}
              alt="Customer charts"
              hotspots={customersChartsHotspots}
            />
          </Container>
        </SectionBlock>


        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container>
            <H3>Flexible, Intuitive Booking Flow</H3>
            <P className='w-2/3'>Bookings come from two sources: online forms and in-person entries.<br />
              We adopted interaction patterns from tools users already know—like Google Calendar—to allow for quick drag-and-drop booking, unscheduled holds, and both daily/monthly views.</P>

            <div className='flex justify-end'>
              <img src={draft2} alt="draft2" className='w-[80%] h-auto  rounded-xs mix-blend-multiply opacity-50 ' />
            </div>





            <ImageWithHotspots
              src={screenshot04}
              alt="Calendar view"
              hotspots={calendarHotspots1}
              className='mb-8'
            />
            <P>The calendar can be switched to a monthly view, making it easier to review and adjust the entire schedule at a glance.</P>
            <ImageWithHotspots
              src={screenshot05}
              alt="Calendar view"
              hotspots={calendarHotspots2}
            />
          </Container>
        </SectionBlock>


        <SectionBlock variant="photo" backgrounds={ehairposBackgrounds}>
          <Container>
            <H3>Checkout Flow Designed for Salon Complexity</H3>
            <P>
              Unlike retail POS, salon purchases are often complex: A client might get a cut, color, and buy a product—all in one visit.<br />
              Our new UI lets staff apply discounts per item, choose payment types, and switch between products quickly. Visual hierarchy and iconography were improved for clarity and speed.</P>

            <div className="relative">
              <ProjectNote className='absolute top-[30%] right-1/2 w-60 translate-y-1/2 translate-x-1/2 text-gray-800'>Old version: Lots of unused space. Information lacked hierarchy and was hard to distinguish.</ProjectNote>
              <img src={old3} alt="old3" className='w-full h-auto rounded-xs mb-8' />
            </div>
            <div>

              <P>The New version sets clear product categories with icons to improve readability.</P>

              <ImageWithHotspots
                src={screenshot06}
                alt="shopping list"
                hotspots={shoppingHistoryHotspots}
                className='mb-8'
              />
              <P>During checkout, the sidebar displays the purchase amount for staff to review and confirm.</P>
              <ImageWithHotspots
                src={screenshot07}
                alt="shopping list"
                hotspots={checkoutHotspots}
              />
            </div>

          </Container>
        </SectionBlock>

        <SectionBlock backgrounds={ehairposBackgrounds}>
          <Container>
            <H3>Membership Wallet That Feels Real</H3>
            <P>
              Instead of multiple loyalty cards, we designed a unified digital wallet.
              Clients simply provide their phone number, and staff can instantly access any stored-value cards, membership points, or available coupons.<br />
              The wallet interface mimics a real wallet—organized, easy to read, and quick to apply at checkout.
            </P>
            <ImageWithHotspots
              src={screenshot09}
              alt="membership wallet"
              hotspots={memberCardHotspots}
              className='mb-8'
            />
            <ImageWithHotspots
              src={screenshot10}
              alt="membership wallet"
              hotspots={discountHotspots}
              className='mb-8'
            />
          </Container>
        </SectionBlock>

        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            <H3>Visual Reports for Better Business Decisions</H3>
            <P>To help salon owners not only “see numbers” but actually “understand trends,” we built two layers of reporting:</P>
            <UL>
              <LI><strong>Salon-level dashboard:</strong> Revenue, visit counts, average ticket size, and campaign ROI—viewable over different timeframes</LI>
              <LI><strong>Stylist-level reports:</strong> Track individual performance, client return rate, and sales goals over time</LI>
            </UL>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-16'>
              <div>
                <LazyImage src={screenshot11} alt="screenshot11" className='w-full h-auto rounded-sm' />
                <p className='text-caption text-gray-500 font-light mt-4'>Salon Dashboard: Combines revenue, visits, ticket size, and growth metrics with time filters for a clear view of business performance.</p>
              </div>
              <div>
                <LazyImage src={screenshot12} alt="screenshot12" className='w-full h-auto rounded-sm' />
                <p className='text-caption text-gray-500 font-light mt-4'>Stylist Dashboard: Each stylist can view their performance trends, client count, and personal growth over time.</p>
              </div>
            </div>
            <P className='mt-16'>These dashboards allow both owners and stylists to take ownership of their performance and plan with data, not guesswork.</P>
          </Container>
        </SectionBlock>

        {/* Logotype Design */}
        <SectionBlock variant="white" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>Logotype Design</H2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div>
                <P><strong>Concept:</strong> The logo merges the letters “e” and “P” with the infinity symbol and a pair of salon scissors, creating a ribbon-like shape that feels both soft and professional—symbolizing endless service and creativity in the salon industry.</P>

              </div>
              <div>
                <P><strong>Color Palette:</strong> Inspired by the app’s core visual language, the logo uses an analogous purple color scheme to maintain brand consistency and visual harmony.</P>
              </div>
            </div>

            <img src={logo} alt="logo" className='w-full h-auto rounded-xs' />
            <img src={logo2} alt="logo2" className='w-full h-auto rounded-xs' />

          </Container>
        </SectionBlock>

        {/* Reflections */}
        <SectionBlock variant="purple" backgrounds={ehairposBackgrounds}>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <H2>Reflections</H2>
                <P>After launch, the system was adopted by several mid-to-large salon chains. One owner shared:</P>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                  <img src={quote} alt="quote" className='mb-8' />
                  <P className=''>“eHairPOS solved our multi-branch management pain points. Revenue and inventory are now clear at a glance. Our customers love the online booking, too. Highly recommended!”</P>
                </div>
                <P>That feedback validated our core goal—turning POS from a passive system into a decision-making assistant.</P>
              </div>
              <div>

                <H2>Takeaways</H2>
                <UL>
                  <LI>Design starts with understanding how people work, not what screens they tap</LI>
                  <LI>Every layout decision should answer: Does this make their task easier or clearer?</LI>
                  <LI>Collaborating with frontline staff during design helped us ship what truly mattered</LI>
                </UL>
              </div>
            </div>

          </Container>
        </SectionBlock>

        <SectionBlock variant="" backgrounds={ehairposBackgrounds}>
          <Container>
            <H2>Future Development and Ongoing Influence</H2>
            <P>Although I left the company after completing the first release, the product continued to grow:</P>
            <UL>
              <LI>It officially launched on the iOS App Store for iPad</LI>
              <LI>Later evolved into a cross-device system also usable on mobile</LI>
            </UL>
            <P>What made this possible was the early design work:</P>
            <UL>
              <LI>Scalable architecture that supported new devices without rethinking the UI from scratch</LI>
              <LI>Clear documentation and visual consistency that made it easy for future teams to continue</LI>
            </UL>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


              <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 mb-8">
                <img src={quote} alt="quote" className='mb-8' />
                <P className=''>It reminded me that good design isn’t just about this version.<br /> It’s about creating a foundation others can build on.</P>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <a href="https://www.ehairpos.com/" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconLink} alt="iconLink" /> Official promo site</a>
                <a href="https://apps.apple.com/us/app/ehairpos/id6477988989" className='flex flex-col items-center justify-center p-8 hover:opacity-60 transition-opacity duration-200' target="_blank" rel="noopener noreferrer"><img src={iconIOS} alt="iconIOS" /> iOS download link</a>
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

