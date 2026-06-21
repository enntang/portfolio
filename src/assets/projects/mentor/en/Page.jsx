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

import FadeIn from '../../../../components/utilities/FadeIn'
import P from '../../../../components/post/P'
import H2 from '../../../../components/post/H2'
import H3 from '../../../../components/post/H3'
import UL from '../../../../components/post/UL'
import LI from '../../../../components/post/LI'

export default function MentorEnPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const learningPersonaHotspots = [
    { id: 'point2', x: 78, y: 55, content: 'The system displays the student\'s learning type.', arrowPosition: 'bottom' },
    { id: 'point3', x: 12, y: 20, content: 'Creating a learning plan involves 4 steps: 1. Choose a study period 2. Select weekly study days 3. Set learning goals 4. Confirm the plan.', arrowPosition: 'bottom' },
  ]
  const learningGoalHotspots = [
    { id: 'point1', x: 18, y: 14, content: 'At the end of the flow, the system displays the study plan; students can switch between timeline and calendar views.', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: 'Different colored dots represent different subjects.', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: 'A daily overview of scheduled learning content.', arrowPosition: 'bottom' },
  ]
  const learningReportHotspots = [
    { id: 'point1', x: 38, y: 4, content: 'Reports cover three time dimensions: daily, weekly, and monthly, each presenting a different depth of learning activity.', arrowPosition: 'bottom' },
    { id: 'point2', x: 8, y: 44, content: 'Parents can switch between reports for different children.', arrowPosition: 'bottom' },
    { id: 'point3', x: 78, y: 34, content: 'An overview of the student\'s performance and learning progress.', arrowPosition: 'bottom' },
  ]
  const badgeCollectionHotspots = [
    { id: 'point1', x: 28, y: 4, content: 'Students can track their collection progress.', arrowPosition: 'bottom' },
    { id: 'point2', x: 38, y: 44, content: 'Each badge has a unique visual identity, displayed in the "Hall of Achievements" interface.', arrowPosition: 'bottom' },
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
              <H3 className="mb-4">Not just a product, but a team</H3>
              <P className="w-full md:w-2/3 mb-24">
                A 0-to-1 AI-integrated learning platform built in one year
              </P>
              <img ref={arrowDownRef} src={arrowDown} alt="Scroll down" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="project-brief">Project Brief</H2>
            <img src={tabletMockup} alt="Mentor design preview" className="rounded-lg mb-12 transition-transform duration-500 ease-out hover:scale-105" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-4">
              <div className="md:col-span-2">
                <P>
                  Learning planning has never been easy. Every student starts from a different place with different goals, and self-managing academic progress is beyond the capability of most students. In the past, this gap was filled by customer service staff and tutoring consultants — costly and unscalable. Mentor (AI Smart Backpack) was built to solve this fundamental problem.
                </P>
                <P>
                  In this project, I served as Design Lead, building and leading a design team from scratch. I collaborated across five departments — PM, Engineering, Marketing, and Curriculum — and over the course of one year delivered a complete product from concept to launch. <strong>After launch, 90% of students chose to use AI to build their learning paths</strong>, and the first designer I mentored, Nomis, was promoted to my position after I left.
                </P>
                <blockquote className="border-l-4 border-current pl-6 mt-8 italic opacity-70">
                  This project convinced me: the work of a Design Lead is not just making great design — it's building a team where great design can happen.
                </blockquote>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-h3">Role</p>
                <P>Design Lead</P>
                <p className="text-h3">Timeline</p>
                <P>2023 – 2024</P>
                <p className="text-h3">Responsibilities</p>
                <P>Team building & scheduling, design direction, UI system, cross-functional collaboration, visual art direction</P>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-current/20">
              {[
                { stat: '1 Year', label: '0-to-1 product launch', sub: 'Full product from concept to delivery' },
                { stat: '15+', label: 'Cross-team collaborators', sub: 'Design, PM, RD, Marketing, Curriculum' },
                { stat: '90%', label: 'Adopted AI-built paths', sub: 'Design decisions accepted by users' },
                { stat: 'Successor', label: 'Team member promoted to lead', sub: 'Mentored talent took over the role' },
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
        </FadeIn>

        {/* Team Structure */}
        <FadeIn>
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-structure">Team Structure & Collaboration</H2>
            <img src={teamChart} alt="Team structure diagram" className="rounded-lg mb-12 mt-6" />
            <P>This project involved close collaboration across multiple parallel units. Design was not an isolated function — it was part of the entire product ecosystem:</P>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3" style={{ fontWeight: '500' }}>Team</th>
                    <th className="pb-4 pr-6 text-h3 whitespace-nowrap" style={{ fontWeight: '500' }}>Size</th>
                    <th className="pb-4 text-h3" style={{ fontWeight: '500' }}>Collaboration Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  {[
                    { team: 'Design Team', count: '5 (including me)', desc: 'Covered UI design, art direction, and front-end implementation.' },
                    { team: 'PM Team', count: '4', desc: 'Defined product direction and requirements; final design decisions were approved by the PM lead.' },
                    { team: 'Engineering', count: '4', desc: 'Handled feature development and technical implementation; collaborated directly with design to validate feasibility and specs.' },
                    { team: 'Marketing', count: '2', desc: 'The design team also handled marketing material requests, requiring flexible resource allocation between product design and marketing tasks.' },
                    { team: 'Curriculum', count: 'Multiple', desc: 'Dedicated to producing K12 subject content; the structure of learning content directly influenced the product\'s information architecture.' },
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
              Keeping the design direction consistent across all these units — and delivering every feature on time — was itself one of the core challenges of the Lead role.
            </P>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Responsibilities */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="responsibilities">Key Responsibilities</H2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
              <div>
                <H3>1. Team Leadership</H3>
                <UL>
                  <LI>Led cross-functional design and engineering teams to advance the product.</LI>
                  <LI>Assigned tasks based on individual strengths and supported execution.</LI>
                  <LI>Facilitated collaboration with PM and R&D to ensure design was both usable and technically feasible.</LI>
                </UL>
              </div>
              <div>
                <H3>2. Regular Sync Meetings</H3>
                <UL>
                  <LI>Early concept exploration and competitive analysis to identify product differentiation.</LI>
                  <LI>Defined design execution strategy and aligned with engineering workflows.</LI>
                  <LI>Maintained UX coherence and consistency across complex structures and large-scale features.</LI>
                </UL>
              </div>
              <div>
                <H3>3. Design System</H3>
                <UL>
                  <LI>Defined the overall visual style direction for the product.</LI>
                  <LI>Adapted UX and visual expression to match the aesthetic and language habits of high school users.</LI>
                  <LI>Collected visual references with the team and established a consistent design language.</LI>
                </UL>
              </div>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Background */}
        <FadeIn>
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="background">Background</H2>
            <H3>From an education app prototype to an AI learning companion for K12 students</H3>
            <P>
              The company already had a college-prep platform serving high school students, but as mobile devices became ubiquitous, the team began exploring: could students get a more complete learning experience on a tablet? The initial idea was simple — a mobile companion app where students could watch recorded lessons on a computer while using a tablet for e-textbook materials.
            </P>
            <P>
              After a series of executive discussions, this idea was redefined into a much larger vision: a personalized AI-powered learning coach.
            </P>
            <P>
              <strong>What began as a "tablet e-textbook app" went through multiple rounds of scope expansion and directional shifts, eventually evolving into a fully integrated AI learning platform.</strong> Throughout this ever-changing process, the design team remained the core force translating decisions into reality.
            </P>
            <P>
              Mentor (AI Smart Backpack) was born. I served as Design Lead, building and leading a four-person design team from scratch and delivering the complete product from concept to launch within one year.
            </P>
            <H3>What problem were we solving</H3>
            <P>
              Students' pursuit of better exam scores is the core driver behind tutoring products, but what kind of learning actually leads to real improvement is a notoriously difficult question.
            </P>
            <P>
              Every student starts from a different place with different goals: course intensity, rate of improvement, and subject strategy for major exams all vary. A student in the bottom of their class wanting to improve on the next test needs a completely different approach from a student in an advanced math-science track aiming for a top medical school.
            </P>
            <P>
              "Managing your own learning pace" is already beyond the capability of most students. <strong>In the past, this gap was filled by customer service staff and tutoring consultants — generating enormous communication costs and labor burden.</strong>
            </P>
            <P>
              On the business side, parents typically had no visibility into how their children were actually learning. They feared paying tuition without seeing real results (grade improvement) and desperately wanted to know whether the money spent was paying off — but existing products offered no satisfying answer.
            </P>

            {/* Parents & Students infographic */}
            <div className="flex flex-row justify-center items-center my-16 relative isolate">
              <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">Parents</p>
                  <p className="text-sm md:text-xl leading-relaxed">"I don't know what's being taught at school, or why my child keeps failing."</p>
                </div>
              </div>
              <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-12 md:-ml-40 z-20">
                <div className="w-44 h-44 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-6 md:p-12 shadow-2xl">
                  <p className="mb-3 md:mb-6 text-h3 md:text-h2">Students</p>
                  <p className="text-sm md:text-xl leading-relaxed">"I keep making mistakes, but I don't know where I'm going wrong."</p>
                </div>
              </div>
            </div>
            <p className="text-caption opacity-70 text-center mt-4">The core user groups, both sharing the same frustration:<br />a lack of clear visibility into learning progress, leading to frustration — students feel stuck, parents feel helpless.</p>

          </Container>
        </SectionBlock>
        </FadeIn>

        {/* How Might We */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <P className="mx-auto text-gray-900 opacity-60">During the Kickoff phase, the PM team and I used a HMW framework to consolidate scattered input from executives and business stakeholders into a single, clear design question:</P>
              <img src={quoteIcon} alt="quote icon" className="mb-4 rounded-lg" style={{ marginTop: '20px' }} />
              <H2 className="text-gray-900">How Might We...</H2>
              <P className="mx-auto text-gray-900">
                <strong>How might we help students and parents who feel frustrated by unclear learning progress and a lack of feedback — build a sense of clarity, motivation, and more personalized next-step guidance?</strong>
              </P>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Design Goals */}
        <FadeIn>
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-goals">Design Goals</H2>
            <P>After establishing the HMW question, we first mapped out the product's feature priority layers — from users' baseline expectations to the differentiated experiences that would truly delight.</P>
            <img src={priorityTable} alt="Feature priority layers" className="rounded-lg mt-6" />

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20">
                    <th className="pb-4 pr-6 text-h3 w-[28%]" style={{ fontWeight: '500' }}>Layer</th>
                    <th className="pb-4 pr-6 text-h3 w-[30%]" style={{ fontWeight: '500' }}>Features</th>
                    <th className="pb-4 text-h3 w-[42%]" style={{ fontWeight: '500' }}>Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>Basic</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>Video lessons, practice questions</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>Minimum user expectation; absence leads to immediate churn</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>Core</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>Learning reports, performance tracking, note review</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>Primary features satisfying learning needs</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '400' }}>Highlight</td>
                    <td className="py-4 pr-6 text-p" style={{ fontWeight: '200' }}>Review reminders, progress tracking, personalized suggestions</td>
                    <td className="py-4 text-p opacity-70" style={{ fontWeight: '200' }}>Differentiated experience that exceeds expectations and builds retention</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <P className="mt-16">Anchored to these product layers, I simultaneously defined three design goals to guide the team during implementation:</P>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10 mt-16">
              <div>
                <H3>1. Personalized Goal-Setting & Learning Guidance</H3>
                <P>To reduce cognitive load and build a sense of direction, the product must customize study plans based on each student's level, aptitude analysis, and subject-specific mistake history. Students simply follow the guided flow to make steady progress.</P>
              </div>
              <div>
                <H3>2. Clear Feedback & Actionable Next Steps</H3>
                <P>Rather than vague scores, the product generates visual learning reports that show progress, identify weaknesses, and suggest next steps — giving both parents and students the clarity they need to keep moving forward.</P>
              </div>
              <div>
                <H3>3. Sustaining Motivation Through Achievement</H3>
                <P>Concrete progress indicators (fewer mistakes, completed tasks, learning streaks) build emotional momentum; an achievement system (badge collection) uses gamification to reinforce the motivation to keep going.</P>
              </div>
            </div>

            <div className="bg-[#3E3AFF] rounded-lg p-8 mt-16">
              <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
                <div className="order-2 md:order-1 text-center md:text-left">
                  <H2>Core Concept</H2>
                  <P>
                    Mentor was ultimately defined as a personalized learning coach — a clear, memorable concept that unified design principles while addressing both the emotional and functional needs of users, making the product more approachable for both parents and students.
                  </P>
                </div>
                <img src={mentorImg} alt="Mentor" className="w-32 h-32 md:w-48 md:h-48 order-1 md:order-2 rounded-lg" />
              </div>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* The Birth of Mentor */}
        <FadeIn>
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="mentor-birth">The Birth of Mentor</H2>
            <P>
              Responding to the product vision set by the company, the design and PM teams were jointly tasked with integrating AI into the design goals. After multiple rounds of discussion, we arrived at Mentor — "a personalized learning coach" — wrapped in a distinctive world-building narrative that addresses both the emotional and functional needs of users, making the product more relatable to both parents and students.
            </P>

            <H3>Mentor's Story</H3>
            <blockquote className="border-l-4 border-current pl-6 my-6 italic opacity-80">
              The name "Mentor" comes from Greek mythology: a wise guardian entrusted to guide Odysseus's son while Odysseus was away.
            </blockquote>
            <P>
              In the age of AI and information overload, Mentor became a guiding deity — but was accidentally trapped inside a cosmic cube. To reclaim his power and return to Earth, he must guide students on a learning journey through the universe, collecting badges that symbolize growth. <strong>Every student's progress drives Mentor's evolution, turning learning into a shared adventure.</strong> This fable transforms the app from a mere educational tool into a challenge where students and Mentor grow together.
            </P>
            <P>
              To communicate Mentor's value as a personalized learning coach, the product design consistently conveyed that Mentor is not just an AI tool — he's a companion who helps students set achievable goals, maintain their rhythm, and build confidence through visible progress. With this lens, I led the visual design and UI system, aligned with the three core design goals.
            </P>

          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Translating the IP Soul into Visual Language */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H3>Translating the IP Soul into Visual Language</H3>
            <P>
              Mentor's world-building narrative is the skeleton; bringing it to life and embedding it into the UI design is what gives it flesh.
            </P>
            <P>
              Drawing on my art design background, I was responsible for expanding the world defined by the PM team into a concrete visual language: the four learning persona character designs, the cosmic scene illustration style for the psych quiz, and the overall UI background art direction — ensuring that "Mentor as a learning companion with a soul" could be felt in every frame.
            </P>
          </Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mt-12">
            <div>
              <div className="bg-white aspect-video md:rounded-tr-lg md:rounded-br-lg overflow-hidden flex items-center justify-center">
                <img src={conceptDraft} alt="Early concept sketches" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                Early sketches: exploring concepts around intelligence, potential, and learning partnership — trying and merging various directions. The team ultimately decided on the "M inside a cube" visual symbol, avoiding something too anthropomorphic while keeping it memorable.
              </p>
            </div>
            <div>
              <div className="bg-white aspect-video md:rounded-tl-lg md:rounded-bl-lg overflow-hidden flex items-center justify-center">
                <img src={ipVariants} alt="IP variants" className="w-full h-full object-contain p-4" />
              </div>
              <p className="text-caption mt-4 opacity-70 p-4 md:px-12">
                To reflect each learner's unique journey, Mentor evolves over time — its appearance changes based on the student's behavior, pace, and engagement. The art direction therefore needed to plan multiple variants within the same visual series.
              </p>
            </div>
          </div>
        </SectionBlock>
        </FadeIn>

        {/* Mentor as Interface Guide */}
        <FadeIn>
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H3>Mentor as an Interface Guide</H3>
            <img src={uiGuide} alt="Mentor UI Guide" className="w-full rounded-lg mt-8" />
            <P className="mt-8">
              Mentor typically resides in the bottom-right corner of the screen, allowing users to interact and converse in real time. He is <strong>the key to giving the product its IP soul on a functional level: a learning companion that operates on both the visual and functional layers.</strong>
            </P>
            <P>
              <strong>Visual layer</strong>: Mentor floats as a persistent cube in the bottom-right corner, using ambient motion and cosmic elements to keep the narrative world of the interface coherent — "your learning is a journey through the universe."
            </P>
            <P>
              <strong>Functional layer</strong>: Mentor responds to users based on their current context. He provides encouragement during software updates; during the onboarding flow for first-time users, he acts as a guide, helping learners rank subjects by confidence level to establish initial learning preferences. Once inside the app, Mentor appears across virtually every core feature: reminders and encouragement for study plans, insight feedback on progress tracking, and more.
            </P>
            <P>
              This approach reduces the coldness of a functional interface — the conversational, companion-like interaction creates a more immersive experience for users.
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div>
                <img src={screenShot1} alt="Software update screen" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">Mentor turns a routine update into an encouraging interaction.</p>
              </div>
              <div>
                <img src={screenShot2} alt="First-time onboarding screen" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70">During onboarding, students rank subjects from strongest to weakest by confidence level.</p>
              </div>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* How I Built and Led the Team */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="team-leadership">How I Built and Led the Team</H2>
            <P>
              The four-person design team had quite diverse backgrounds — some came from fine arts and graphic design, others leaned toward front-end engineering. Everyone wanted to grow into UI design, but each person had a different starting point and different limitations.
            </P>
            <P>
              My job wasn't to just assign tasks — it was <strong>to first take the time to understand each person: where they wanted to grow, what they were already good at, and where they needed training before diving in.</strong> On that foundation, I built a detailed schedule, balancing marketing material requests the design team had absorbed, each person's current workload, and who was stuck and needed support.
            </P>

            <H3>Finding Design Direction in Chaos and Divergence</H3>
            <P>
              This product spanned five departments, each bringing a different set of priorities: executives had a vision, PM had requirements, engineering had technical constraints, sales had market pressure — and marketing had promotional campaigns to run. My job was to make sure these voices didn't cancel each other out, but converged into a direction everyone could move forward on.
            </P>
            <P>
              Concretely: convening meetings, gathering diverse input, distilling scattered requirements into executable steps, presenting concrete options for PM and stakeholders to decide on, and then taking ownership of UI quality and revision once the direction was confirmed.
            </P>
          </Container>

          <div className="mt-12 md:px-16 md:py-4">
            <img src={iteration1} alt="Design iteration round 1" className="w-full md:w-4/5 md:mx-auto block" />
          </div>
          <Container>
            <div className="relative mt-2">
              <ProjectNote className="hidden md:block absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32 z-10 max-w-xs text-gray-800">
                From rough concepts to wireframes to UI mockups, each round of convergence and iteration helped every team member better understand the product — making it easier to align on vision and focus feedback on what mattered most.
              </ProjectNote>
              <img src={iteration2} alt="Design iteration round 2" className="w-full rounded-lg" />
            </div>
            <p className="md:hidden text-caption opacity-60 mt-4 mb-4" style={{ fontWeight: '200' }}>
              From rough concepts to wireframes to UI mockups, each round of convergence and iteration helped every team member better understand the product — making it easier to align on vision and focus feedback on what mattered most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <img src={wireframe1} alt="Wireframe version 1" className="md:h-full md:object-cover rounded-lg" />
              <img src={wireframe2} alt="Wireframe version 2" className="md:h-full md:object-cover rounded-lg" />
            </div>
          </Container>

          <Container>
            <H3>Putting the Right People on the Right Stage</H3>
            <P>
              The most important Design Lead decision I made in this project was assigning the right tasks to the right person.
            </P>
            <P>
              Three key product features — Learning Goal Setting, Learning Reports, and the Psych Quiz — were all handed to team member Nomis to lead. These three tasks were different in nature but shared one common thread: they all required simultaneously handling complex information architecture, user research, and logical reasoning — which is exactly what I saw in Nomis.
            </P>
            <P>
              Learning Goal Setting required balancing student permissions, AI recommendation logic, and step-by-step interaction flow. The Learning Reports had a tougher starting point: the previous version had been rejected by senior management for being essentially the same data repeated three times. Nomis redesigned the reports into three distinctly different narrative frameworks: <strong>daily reports tell execution details, weekly reports reveal behavioral insights, monthly reports narrate growth stories.</strong> This framework became one of the flagship features of the Mentor launch.
            </P>
            <P>
              The Psych Quiz blended marketing needs with the product's cosmic world-building. Nomis had a psychology background, giving him the ability to handle academic research, content planning, and front-end implementation simultaneously. He reviewed 30+ educational psychology papers and designed 64 personalized learning persona outcomes — receiving strong responses both internally and from users.
            </P>
            <P>
              These outcomes became some of the strongest cases in Nomis's portfolio. For more detail, see the records from Nomis's perspective:
            </P>
            <UL>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-goal" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  Learning Goal Setting ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-learning-report" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  Learning Reports ↗ by Nomis
                </a>
              </LI>
              <LI>
                <a href="https://mudi0710.github.io/portfolio/#/projects/ai-smartbag-edu-psych-quiz" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100 transition-opacity">
                  Educational Psych Quiz ↗ by Nomis
                </a>
              </LI>
            </UL>

            <H3>Learning from the Market</H3>
            <P>
              Decision-making doesn't only happen in internal team discussions — front-line observations from people in direct contact with users matter just as much.
            </P>
            <P>
              In cross-departmental communication, the sales team surfaced a reality that we on the design side were prone to overlook: Taiwanese parents habitually consume information through LINE, and logging into a browser represents a significant friction point for them. This insight made us realize that no matter how well-designed the learning reports were, they'd be useless if the barrier to accessing them was too high.
            </P>
            <P>
              So we added LINE as an additional distribution channel. Through LINE OA (LINE Official Account), reports are automatically pushed to parents' phones — delivered to the platform they're most comfortable with. In addition to scheduled report pushes and live customer support, LINE OA integrated multiple functions accessible through a rich menu, letting users tap through based on their needs.
            </P>
            <P>
              The visual presentation, push timing, and interaction flow were ultimately co-designed by me and the engineering team. From sales-side user insights to engineering-side spec definition — this was a complete decision chain completed across three departments.
            </P>
          </Container>

          {/* LINE OA */}
          <Container>
            <div className="flex flex-col gap-8 mt-8">
              <div>
                <img src={lineTree} alt="LINE OA tree diagram" className="rounded-lg w-full" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  How should the LINE OA rich menu be structured? What conditions should determine each service path? To clarify these questions, I mapped it as a decision tree — making the logic easy for teammates to understand and discuss across departments.
                </p>
              </div>
              <div>
                <img src={lineMenu} alt="LINE OA rich menu" className="rounded-lg w-full md:w-1/2 md:mx-auto block" />
                <p className="text-caption mt-3 opacity-70" style={{ fontWeight: '200' }}>
                  The rich menu required balancing marketing strategy (most prominent button = primary product) with ease of use — significant effort went into the visual design.
                </p>
              </div>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Design System */}
        <FadeIn>
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="design-system">A Scalable Design System</H2>
            <P>
              As Design Lead, I directed the overall visual style of the product and led the team in building a clear, consistent design system. Since the primary users are middle and high school students, we needed to accommodate their visual preferences and language habits — which made the design more challenging.
            </P>
            <P>
              I coached team members through data collection and style exploration, and hands-on built the UI System in Figma — demonstrating how to plan color and typography hierarchies and build component libraries, actively developing the foundational knowledge and skills every UI designer needs.
            </P>
            <P>
              <strong>This design system became the baseline for every subsequent feature interface</strong>, giving anyone who picked up a feature a clear reference to work from; new elements could also be added by following the system's architecture.
            </P>
          </Container>
        </SectionBlock>
        </FadeIn>

        <FadeIn>
        <SectionBlock className="!py-0" backgrounds={mentorBackgrounds}>
          <img src={designSystem} alt="Design system" className="w-full" />
        </SectionBlock>
        </FadeIn>

        {/* UI Design */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="ui-design">Interface Design Built Around the World & Product Vision</H2>
            <P>With the design system in place, every feature interface was built on top of this visual language. The goal wasn't just usability — it was making sure users felt the presence of Mentor's world in every screen.</P>
          </Container>

          {/* Role Labels */}
          <Container className="mt-12">
            <H3>Role Labels Instead of Cold Numbers</H3>
            <P>
              Mentor guides students to freely choose their weekly study days and duration, fitting their real needs and life rhythm.
            </P>
            <ImageWithHotspots
              src={personaUi1}
              alt="Learning persona UI design"
              hotspots={learningPersonaHotspots}
              className="rounded-lg mt-6"
            />
            <P className="mt-8">We didn't want the UI to be just cold numbers. After team discussion, we decided to translate weekly study hours into four persona labels (Relaxed Learner, Diligent Student, Academic Achiever, Top Scholar) — turning a number into an identity. Mentor displays which persona the student belongs to based on their weekly study time.</P>
            <img src={typesImg} alt="Learning persona labels" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">Pain Point</p>
              <P>Students lack a sense of direction in learning and don't know where to start.</P>
              <p className="font-medium text-white mb-3 mt-6">Design Decision</p>
              <P>A playful self-assessment system that turns numbers into an identity, boosting learning motivation. Students aren't just setting a time commitment — they're choosing <strong>who they want to become</strong>, building the first step of their learning journey from intrinsic motivation.</P>
            </div>
          </Container>

          {/* Information Hierarchy */}
          <Container className="mt-20">
            <H3>Information Hierarchy Design</H3>
            <P>
              The learning goal setup is presented in a dual-mode view — calendar and weekly plan — so learners with different habits can switch between them. Subject color blocks serve as the primary visual anchor, followed by topic titles, with estimated time and completion status as supplementary information. Students can scan quickly and locate what they need without reading line by line.
            </P>
            <ImageWithHotspots
              src={screenShot4}
              alt="Learning goal setting interface"
              hotspots={[
                { id: 'point2', x: 38, y: 44, content: 'Each colored dot represents a different subject.', arrowPosition: 'bottom' },
                { id: 'point3', x: 78, y: 34, content: 'A daily overview of the learning plan.', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <img src={goalCalendar} alt="Learning goal calendar view" className="rounded-lg mt-6" />
            <p className="text-caption opacity-50 mt-2">Detailed component states and interaction flows mapped out in Figma</p>
            <P className="mt-6">Learning reports are organized around different time dimensions, each with its own visualization approach — but all using the same visual system.</P>
            <P>Daily reports use a list-based structure, emphasizing completion details for each learning unit at high information density; weekly reports introduce chart components so numerical trends are readable at a glance; monthly reports center on radar and donut charts as their primary visual.</P>
            <img src={reportWeekly} alt="Weekly report" className="rounded-lg mt-4" />
            <P className="mt-6">The longer the time span, the more the report focuses on "trends" — helping parents understand learning progress through overall patterns rather than line-by-line numbers.</P>
            <img src={reportMonthly} alt="Monthly report" className="rounded-lg mt-4" />
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">Pain Point</p>
              <P>Learning records are voluminous, dry, and lack any next-step prompts — making it difficult to plan progress and impossible to see long-term growth.</P>
              <p className="font-medium text-white mb-3 mt-6">Design Decision</p>
              <P>A carefully layered information hierarchy lets students and parents see the overall shape of the plan while also drilling into the details. The ability to look back at the past and look ahead to the future brings a sense of reassurance.</P>
            </div>
          </Container>

          {/* Badges */}
          <Container className="mt-12">
            <H3>Turning Milestones into a Collectible Visual Language</H3>
            <P>
              Every badge has its own unique visual design. Within the cosmic art system, these badges aren't just rewards — they're extensions of the Mentor world.
            </P>
            <P>We applied gamification design so that every student milestone becomes a mark left behind in their learning adventure. The Hall of Achievements display interface is intentionally designed to be collectible and browsable — progress tracking and unlock feedback satisfy the urge to collect and reinforce habit formation.</P>
          </Container>

          <Container>
            <ImageWithHotspots
              src={screenShot6}
              alt="Hall of Achievements"
              hotspots={[
                { id: 'point1', x: 28, y: 8, content: 'Students can track their collection progress.', arrowPosition: 'bottom' },
                { id: 'point2', x: 52, y: 50, content: 'Each badge has a unique visual design, displayed in the "Hall of Achievements" interface.', arrowPosition: 'bottom' },
              ]}
              className="rounded-lg mt-6"
            />
            <p className="text-caption opacity-50 mt-2">The Hall of Achievements lets students browse all badges tied to each task. Some are series badges — the more thoroughly a task is completed, the higher the tier earned, from beginner to master. Others are unique special badges, most of which are unlocked through unexpected triggers.</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <img src={screenShot7} alt="Earned badges" className="rounded-lg" />
              <img src={screenShot8} alt="Locked badges" className="rounded-lg" />
            </div>
          </Container>

          <Container>
            <div className="mt-8 p-8 rounded-xl bg-[#3E3AFF] text-white">
              <p className="font-medium text-white mb-3">Pain Point</p>
              <P>Chasing grade improvements alone is demoralizing — learners have no sustained motivation to keep going.</P>
              <p className="font-medium text-white mb-3 mt-6">Design Decision</p>
              <P>Completing courses and maintaining learning streaks earns badges — using immediate feedback to sustain motivation, giving students the drive to tackle their next learning task with the encouragement of achievement badges.</P>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Results */}
        <FadeIn>
        <SectionBlock bgVariant="purple" backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="results">Results</H2>
            <P>
              After launch, <strong>90% of students chose to use AI to build their personalized learning paths</strong> rather than setting them manually — direct evidence that the "personalized next-step guidance" design goal was genuinely adopted.
            </P>
            <P>
              According to the sales team, the learning reports gave parents clear visibility into their child's daily, weekly, and monthly learning activity for the first time — providing a concrete answer to the core anxiety of "is my investment in tutoring actually paying off?"
            </P>

            <H3 className="mt-12">Key Impact</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: 'Mentor became the company\'s flagship AI product line',
                  desc: 'Proved that the design team can build a complete product design system from 0 to 1 in a resource-constrained environment.',
                },
                {
                  title: 'A design system that keeps running',
                  desc: 'The design system and collaboration workflows I established continued to support product iteration after I left.',
                },
                {
                  title: 'A proactive, collaborative team culture',
                  desc: 'Members understood each other\'s strengths and knew how to help one another. The culture I built became the foundation for self-sustaining operations.',
                },
                {
                  title: 'Changed how the company perceives the design team',
                  desc: 'Designers are no longer seen as solely responsible for visual output — they\'re strategic partners with product thinking and cross-functional communication skills.',
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
        </FadeIn>

        {/* Reflection */}
        <FadeIn>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <H2 id="reflection">Reflection</H2>
            <P>
              This project taught me to shift my focus from "doing things" to "getting the right people to do the right things." Through practice, I came to understand the core mindset of leading a team: more important than perfection is balancing resources and expectations. Three principles I found indispensable throughout execution:
            </P>

            <div className="flex flex-col gap-12 mt-8">
              <div>
                <H3>Keep Information Transparent & Communication Channels Open</H3>
                <P>
                  With an ambitious product vision and complex requirements, clear and timely communication became non-negotiable. Requirements shifted fast and dramatically — without effective communication channels, it's easy to fall behind.
                </P>
                <P>
                  In the past, I defaulted to being a follower. But for this project, I overcame my habit of indirect communication, learning to speak up proactively in design and cross-departmental discussions, and encouraging every team member to voice their opinions boldly — <strong>transforming the design team from passive task executors into decision-makers with genuine product thinking.</strong>
                </P>
              </div>
              <div>
                <H3>Learn from the Market</H3>
                <P>
                  Beyond internal team discussion and research, I learned to value the feedback from the sales team. They're in direct contact with potential customers — the people closest to real needs. Their insights strengthened the product's competitiveness, and I encouraged team members to engage with them regularly during the project, drawing on their perspective to <strong>avoid decisions that were overly centered on a designer's point of view.</strong>
                </P>
              </div>
              <div>
                <H3>Support Team Growth</H3>
                <P>
                  Through individual conversations, I learned each member's motivations and expectations, then assigned tasks that would help them grow and encouraged proactive learning. <strong>Each of them gained something through their work — a chance to try new techniques, to express a distinctive idea, or even to step up and lead</strong> — adding a meaningful achievement to their own career stories.
                </P>
              </div>
            </div>
          </Container>
        </SectionBlock>
        </FadeIn>

        {/* Conclusion */}
        <FadeIn>
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className="flex flex-col items-center text-center">
            <P className="w-full md:w-2/3 opacity-80">
              Designing Mentor wasn't just about shaping screens — it was about shaping a team, a story, and a shared belief in learning.
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              At first, I leaned toward being an "executor": focused on pixels, flows, and UI polish. But as the product scaled, I gradually learned to integrate across functions, empower teammates, and hold the bigger direction — from the perspective of a leader.
            </P>
            <P className="w-full md:w-2/3 opacity-80">
              These experiences grew me from an individual contributor into a design manager: communicating more clearly, thinking from within different roles. Most importantly, I learned that great design isn't just about delivering a perfect artifact — it's about aligning the team's efforts with the company's expectations. That's what makes something sustainable.
            </P>
            <img src={mentorImg} alt="Mentor" className="h-32 w-32 md:h-48 md:w-48 rounded-lg mt-12 mb-4" />
            <p className="text-p opacity-80">Mentor</p>
            <p className="text-p opacity-60">2023/08 - 2024/06</p>
          </Container>
        </SectionBlock>
        </FadeIn>

        <RelatedProjects currentSlug="mentor" />
        <Footer />
      </main>
    </div>
  )
}
