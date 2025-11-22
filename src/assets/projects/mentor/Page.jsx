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

gsap.registerPlugin(ScrollTrigger)
import BG1 from '../../../assets/projects/mentor/projectInfo-mentor-bg-1.png'
import BG2 from '../../../assets/projects/mentor/projectInfo-mentor-bg-2.png'
import BG3 from '../../../assets/projects/mentor/projectInfo-mentor-bg-3.png'
import BG4 from '../../../assets/projects/mentor/projectInfo-mentor-bg-4.png'

// 定义 mentor 项目的背景图片映射
const mentorBackgrounds = {
  purple: BG1,
  dark: BG2,
  blue: BG3,
  mentor: BG4,
}


import shineImage from '../../../assets/projects/mentor/projectInfo-mentor-shine.svg'
import glintImage from '../../../assets/projects/mentor/projectInfo-mentor-glint.svg'

import tabletMockup from '../../../assets/projects/mentor/projectInfo-mentor-tablet-mockup.png'
import mentor from '../../../assets/projects/mentor/projectInfo-mentor-mentor.png'
import arrowDown from '../../../../public/icon-arrow-down.svg'
import quoteIcon from '../../../../public/icon-quote.svg'
import phases from '../../../assets/projects/mentor/projectInfo-mentor-phase.png'
import chartImg from '../../../assets/projects/mentor/projectInfo-mentor-chart.png'
import deliverablesDraft from '../../../assets/projects/mentor/projectInfo-mentor-draft.png'
import deliverablesLayout1 from '../../../assets/projects/mentor/projectInfo-mentor-layout1.png'
import deliverablesLayout2 from '../../../assets/projects/mentor/projectInfo-mentor-layout2.png'
import guidelineImg from '../../../assets/projects/mentor/projectInfo-mentor-guideline.png'
import mentorDraft from '../../../assets/projects/mentor/projectInfo-mentor-draft-2.png'
import mentorVariants from '../../../assets/projects/mentor/projectInfo-mentor-variants.png'
import pyramid from '../../../assets/projects/mentor/projectInfo-mentor-pyramid.png'
import screenShot1 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot1.png'
import screenShot2 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot2.png'
import screenShot3 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot3.png'
import screenShot4 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot4.png'
import screenShot5 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot5.png'
import screenShot6 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot6.png'
import screenShot7 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot7.png'
import screenShot8 from '../../../assets/projects/mentor/projectInfo-mentor-screenshot8.png'
import typesImg from '../../../assets/projects/mentor/projectInfo-mentor-4types.png'


import P from '../../../components/post/P'
import H2 from '../../../components/post/H2'
import H3 from '../../../components/post/H3'
import UL from '../../../components/post/UL'
import LI from '../../../components/post/LI'

export default function MentorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const parentsCircleRef = useRef(null)
  const studentsCircleRef = useRef(null)

  // Use floating animation hook for mentor image
  const mentorImgRef = useFloatingAnimation({ y: -20, duration: 2 })
  // Use floating animation for arrow down icon
  const arrowDownRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })

  // Define hotspots
  const learningPersonaHotspots = [
    {
      id: 'point1',
      x: 20,
      y: 25,
      content: 'choose the most suitable learning path: how much time per week to study.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point2',
      x: 78,
      y: 55,
      content: 'The system will show the type of student.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point3',
      x: 12,
      y: 20,
      content: 'There are 4 steps to set up a learning plan: 1. Choose study duration, 2. Select weekdays, 3. Set learning goals, 4. Confirm the plan.',
      arrowPosition: 'bottom'
    },
  ]
  const learningGoalHotspots = [
    {
      id: 'point1',
      x: 18,
      y: 14,
      content: 'At the end of the flow, the system will show the learning plan, students can switch between timeline and calendar view to check the plan.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content: 'Every color of dot represents a different learning subject.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: 'Overview of one single day.',
      arrowPosition: 'bottom'
    },
  ]
  const learningReportHotspots = [
    {
      id: 'point1',
      x: 38,
      y: 4,
      content: 'Reports are available across three time dimensions: daily, weekly, and monthly, each showing a different depth of detail.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point2',
      x: 8,
      y: 44,
      content: 'Parents can switch reports between different children.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point3',
      x: 78,
      y: 34,
      content: 'An overview of the student’s learning performance and progress.',
      arrowPosition: 'bottom'
    },
  ]
  const badgeCollectionHotspots = [
    {
      id: 'point1',
      x: 28,
      y: 4,
      content: 'Students can view the progress of their collection.',
      arrowPosition: 'bottom'
    },
    {
      id: 'point2',
      x: 38,
      y: 44,
      content: 'Each badge has its own visual identity and is displayed in a "Hall of Achievement" interface.',
      arrowPosition: 'bottom'
    },
  ]


  useEffect(() => {
    // Animate parents circle from left
    gsap.fromTo(
      parentsCircleRef.current,
      {
        x: -300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: parentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )

    // Animate students circle from right
    gsap.fromTo(
      studentsCircleRef.current,
      {
        x: 300,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: studentsCircleRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    )
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
        <header className=" relative overflow-hidden">
          <SectionBlock bgVariant="purple" className='relative' backgrounds={mentorBackgrounds}>
            <img src={shineImage} alt="shine" className='absolute top-0 right-0' />
            <img src={glintImage} alt="glint" className='absolute bottom-0 left-0' />
            <Container className='flex flex-col items-center justify-center text-center'>
              <img ref={mentorImgRef} src={mentor} alt="Mentor" className="h-48 w-48 md:h-64 md:w-64" />
              <h1 className='text-large mobile:text-large-mobile'>Mentor</h1>
              <H3 className='mb-24'>AI-integrated learning platform</H3>
              <P className='w-full md:w-2/3'>Designing Mentor was more than just shaping screens—it was about shaping a team, a story, and a shared belief in learning.</P>
              <img ref={arrowDownRef} src={arrowDown} alt="Arrow Down" className="mt-16 md:mt-24 w-6 h-6 brightness-0 invert" />
            </Container>
          </SectionBlock>
        </header>

        {/* Project Brief */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container className='flex flex-col items-center justify-center'>
            <div className="text-center mb-10">
              <H2>Project Brief</H2>
            </div>
            <img src={tabletMockup} alt="Mentor design preview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="md:col-span-2">
                <P>
                  At Samebest, I served as the Design Lead of the UI and Graphic Design Team for a new product: "Mentor". This app aims to help students navigate their learning journey efficiently and effectively prepare for school exams, including high school and college entrance exams. I led the team in developing the interface and laying the foundation for scalable branding.
                </P>
              </div>
              <div className='flex flex-col gap-2'>
              <p className='text-h3'>Role</p>
                <P>Design Lead</P>
                <p className='text-h3'>Timeline</p>
                <P>May 2019 – June 2024</P>
              </div>
            </div>
          </Container>
        </SectionBlock>


        {/* Responsibilities (dark) */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2>Key Responsibilities</H2>

            <TwoColumn>
              <div>
                <H3>1. Leadership</H3>
                <UL>
                  <LI>
                    Lead a team of 10+ designers and developers
                  </LI>
                  <LI>
                    Assigned tasks based on each member's strengths, guiding their thinking and execution.
                  </LI>
                  <LI>
                    Facilitated collaboration with PMs and R&D to ensure user-friendly, feasible design output.
                  </LI>
                </UL>
                <P>Under my leadership, I also facilitated regular team discussions on:</P>
                <UL>
                  <LI>
                    Early concept exploration and competitor analysis to identify ways to highlight the product's unique strengths.
                  </LI>
                  <LI>
                    Design execution strategies, focusing on how to align with developers' workflows.
                  </LI>
                  <LI>
                    Enhancing user experience while managing complex structures and large-scale feature requirements.                </LI>
                </UL>
              </div>
              <div>
                <H3>2. Design System Development</H3>
                <UL>
                  <LI>
                    Directed the overall visual style of the product.                </LI>
                  <LI>
                    Adapted the UX and visuals to align with the aesthetics and language preferences of primary and secondary school students.                </LI>
                  <LI>
                    Gathered and refined visual references with the team to build a consistent design language.  </LI>
                </UL>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* Workflow */}
        <SectionBlock className='pb-0' backgrounds={mentorBackgrounds}>
          <Container>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              <H2>Workflow</H2>
              <UL className='md:col-span-2'>
                <LI>Each feature was designed and developed over a two-month cycle with cross-functional collaboration.</LI>
                <LI>The Discovery & Ideation phases were carried out in small teams to brainstorm the most effective solutions.</LI>
                <LI>Final handoff included feasibility checks and iterative refinement with engineers.</LI>

              </UL>
            </div>
          </Container>
          <img src={phases} alt="workflow phases" />
        </SectionBlock>

        {/* Background + Insights alternating backgrounds */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>

            <TwoColumn>
              <div>
                <H2>Background</H2>
                <P>
                  Originally, Mentor was envisioned as a mobile companion to the company's existing desktop-based self-learning software, which featured recorded subject lectures.
                </P>
                <P>
                  The team originally <strong>envisioned three distinct learning contexts for the app</strong>, each reflecting a typical scenario in which students would engage with the platform.
                </P>
                <P className="text-xs text-gray-100">The system was originally designed to control the desktop-based video self-learning software, acting as a remote interface.</P>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">At home, seated at a desk</div>
                  <P>with access to desktop, tablet, and textbooks. </P>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">At school or in a library</div>
                  <P>with only a tablet and textbooks, students used the platform as a lecture extension.</P>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5">
                  <div className="text-sm mb-2 opacity-70">On the go</div>
                  <P>with only a tablet, students relied on it as the main learning tool.</P>
                </div>
              </div>
            </TwoColumn>


          </Container>
        </SectionBlock>

        {/* Research Insight */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className=' overflow-hidden'>
            <div className=" mb-10 mx-auto">
              <H2>Research Insights</H2>
              <P>In the early phase of development, we conducted foundational user research to validate assumptions and uncover unmet needs among our two key groups:<strong> parents and students.</strong></P>
              <P>We found a shared problem: <br />
                neither group had clarity on learning progress, which led to frustration—students felt they weren’t improving, while parents felt unable to help.</P>

              {/* two circles for infographic */}
              <div className="flex flex-row justify-center items-center my-16 relative isolate">
                {/* Parents Circle - Blue gradient */}
                <div ref={parentsCircleRef} className="relative flex items-center justify-center z-10">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">For Parents</p>
                    <p className="text-xl leading-relaxed">"I don't know what the school is teaching or why my kid didn't do well."</p>
                  </div>
                </div>
                {/* Students Circle - Purple gradient */}
                <div ref={studentsCircleRef} className="relative flex items-center justify-center -ml-32 md:-ml-40 z-20 mix-blend-multiply">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-center p-12 shadow-2xl">
                    <p className="mb-6 text-h3 md:text-h2">For Student</p>
                    <p className="text-xl leading-relaxed">"I keep getting things wrong and don't know why."</p>
                  </div>
                </div>
              </div>
              <P>The root causes were consistent: <strong>weak foundational understanding and no structured review strategy.</strong><br />
                These insights highlighted a clear gap between effort and outcome, forming the basis for our design goals.</P>
            </div>

          </Container>
        </SectionBlock>

        {/* how might we */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className="text-center mb-10 flex flex-col items-center justify-center">
              <img src={quoteIcon} alt="quote icon" className='mb-8' />
              <H2 className="text-gray-900">How Might We...</H2>
              <P className="mx-auto text-gray-900">How might we help students and parents who struggle with unclear learning progress and lack of feedback gain clarity, motivation, and personalized next-step suggestions?</P>
            </div>
          </Container>
        </SectionBlock>

        {/* design goals */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container>
            <TwoColumn>
              <div>
                <H2>Design Goals</H2>
                <P className="bg-white/10 backdrop-blur rounded-sm shadow p-5">Based on the key insights gathered from our research, we distilled the following three design goals to address the specific concerns of both parents and students:</P>
              </div>
              <div>
                <div className="mb-8">
                  <H3>1. Personalized goal-setting and learning guidance</H3>
                  <P>To reduce cognitive load and give learners a stronger sense of direction, Mentor tailors study plans based on the student's level, performance history, and recent errors. Students can improve simply by following the AI-guided path step by step.</P>
                </div>
                <div className="mb-8">
                  <H3>2. Clear, easy-to-read feedback for the next step</H3>
                  <P>Instead of vague performance scores, Mentor generates visual learning reports that highlight progress, identify weaknesses, and suggest the next learning action. This helps both parents and students stay on track without ambiguity.</P>
                </div>
                <div>
                  <H3>3. Reinforcement through a sense of accomplishment</H3>
                  <P>By surfacing concrete progress markers—such as reduced mistakes, completed exercises, and streaks—we build emotional momentum and encourage students to keep going.</P>
                </div>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>

        {/* core philosophy */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container>
            <img src={chartImg} alt="chart" className='mt-[-200px] shadow-xl rounded-sm' />
            <div className='bg-[#3E3AFF] rounded-sm p-8 mt-16'>
              <div className='flex flex-col md:flex-row gap-4 items-center text-center md:text-left'>
                <div className='order-2 md:order-1 text-left'>
                  <H2>Core Philosophy</H2>
                  <P>Mentor was ultimately shaped into a personalized learning coach, a clear and memorable concept that unified our design principles, addressed users' emotional and functional needs, and made the product more relatable for both students and parents.</P>
                </div>
                <img src={mentor} alt="mentor" className='w-32 h-32 md:w-48 md:h-48 order-1 md:order-2' />
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Design Deliverables */}
        <SectionBlock className='pb-0' backgrounds={mentorBackgrounds}>
          <Container className='relative'>
            

              <H2>Design Deliverables</H2>
              <P>To communicate Mentor’s value as a personalized learning coach, we framed the product experience around a narrative: Mentor is not just an app—it’s a smart companion that helps students set achievable goals, stay on track, and gain confidence through visible progress. With this perspective, I led the visual design and UI system development in alignment with our three core design goals.</P>
            
            <ProjectNote className='absolute top-[40%] right-1/2 transform translate-x-1/2 translate-y-32'>
              From wireframes to a mid-fidelity POC to the final themed UI, each iteration helped us refine layout logic and shape the product's narrative identity.
            </ProjectNote>
            <img src={deliverablesDraft} alt="deliverables draft" className='my-16' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <img src={deliverablesLayout1} alt="deliverables layout 1" className='h-full object-cover' />
              <img src={deliverablesLayout2} alt="deliverables layout 2" className='h-full object-cover' />
            </div>
            <div className='my-16'>
              <P>As the design lead, I defined the product’s style and worked with the team to build a clear, consistent design system. Since our main users were junior and senior high school students, we needed to match their visual preferences and language habits. This made UX design more challenging. Together, we collected style references, explored different directions, and shaped a system that fits the product tone.</P>
            </div>
          </Container>
          <img src={guidelineImg} alt="guideline" />
        </SectionBlock>

        {/* story of mentor */}
        <SectionBlock bgVariant="mentor" backgrounds={mentorBackgrounds}>
          <Container>
            <H2>Story of Mentor</H2>
            <TwoColumn>
              <div>
                <div className="bg-white/10 backdrop-blur rounded-sm shadow p-5 ">
                  <P className=''>The term "Mentor" originates from Greek mythology, where a wise guardian was entrusted with guiding Odysseus's son during his journey.</P>
                </div>
              </div>
              <div>

                <P>Mentor becomes a god of guidance who, in the age of AI and information overload, is accidentally trapped in a cosmic cube.

                </P>
                <P>To regain his powers and return to Earth, he must guide students through a learning journey across the universe, collecting badges as symbols of growth.<strong> Each student's progress fuels Mentor's evolution, turning learning into a shared quest.</strong></P>
                <P>This allegorical story frames the app experience as more than just education: it's a mission of transformation for both Mentor and the learner.</P>
              </div>
            </TwoColumn>
          </Container>
        </SectionBlock>
        <SectionBlock backgrounds={mentorBackgrounds}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12'>
            <div>
              <img src={mentorDraft} alt="mentor draft" className=' md:object-cover' />
              <P className='text-caption p-8 md:ml-24 mt-4 md:mt-8'>Early sketches exploring Mentor’s symbolic role as a cosmic guide, along with abstract representations of learning, rhythm, dialogue, and growth.</P>
            </div>
            <div>
              <img src={mentorVariants} alt="mentor variants" className=' md:object-cover' />
              <P className='text-caption p-8 md:mr-24 mt-4 md:mt-8'>To reflect each learner’s unique journey, Mentor evolves over time—its appearance adapting to students’ behaviors, learning pace, and engagement style.</P>
            </div>
          </div>

          {/* Mentor as a UI Guide */}
        </SectionBlock>
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className='w-full md:w-2/3 mx-auto'>
            <H2>Mentor as a UI Guide</H2>
            <P>Mentor sits at the bottom-right corner as a real-time learning agent—offering feedback, reminders, and encouragement based on each student’s actions.
            </P>
            <P>Its glowing, sci-fi cube avatar blends intelligence with a sense of myth, creating a two-layer interaction model:</P>
            <img src={pyramid} alt="pyramid chart" />
            <P>Grounded in educational agent theory, Mentor becomes a narrative-driven interface agent: shaping emotional engagement and making the learning flow feel more meaningful and motivating.</P>

          </Container>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-24'>
            <div>
              <img src={screenShot1} alt="updates screen" className="rounded-sm" />
              <p className='text-caption p-8'>Mentor transforms routine updates into encouraging interactions.</p>
            </div>
            <div>
              <img src={screenShot2} alt="first-time onboarding screen" className="rounded-sm" />
              <p className='text-caption p-8'>During first-time onboarding, students are asked to rank subjects from strongest to weakest based on their confidence. </p>
            </div>
          </div>
        </SectionBlock>

        {/* features */}
        <SectionBlock backgrounds={mentorBackgrounds}>
          <Container>
            <div className=" mb-10  mx-auto">
              <H2>Features</H2>
              <P>The flow begins by asking students when and how long they prefer to study each week. Users can freely select weekdays and study duration to match their real-life rhythm.</P>
              <ImageWithHotspots
                src={screenShot3}
                alt="learning persona classification"
                hotspots={learningPersonaHotspots}
                
              />
              <H3>Learning Persona Classification</H3>
              <P>To make learning more relatable and personalized, Mentor uses students' weekly study duration to automatically assign one of four learning personas:</P>
              <img src={typesImg} alt="types" />
              <UL>
                <LI>佛系學生 (Laid-back Learner): Prefers a light, low-pressure pace.</LI>
                <LI>勤奮學子 (Consistent Striver): Studies regularly with determination.</LI>
                <LI>資優菁英 (Curious Achiever): Actively seeks knowledge and challenges.</LI>
                <LI>天才學霸 (Elite Performer): Pursues top performance with a strong academic drive.</LI>
              </UL>
              <P>This playful system helps learners build self-awareness and track their growth identity over time.</P>
            </div>
            <div className=" mb-10  mx-auto">
              <H3>Learning Goal Setting: Personalized Learning Paths</H3>
              <UL>
                <LI>Plans are presented in both timeline and calendar view, with daily task cards showing subject, knowledge point, and estimated time. Students can adjust or reshuffle plans anytime.</LI>
                <LI>For each task, the system clearly states the learning objective and provides video-based instruction.</LI>
              </UL>
              <ImageWithHotspots
                src={screenShot4}
                alt="learning goal setting"
                hotspots={learningGoalHotspots}
              />
            </div>
            <div className='px-4 pb-3 pt-6 bg-gray-100 rounded-sm'>
              <P><strong>Design Focus:</strong></P>
              <P>By letting students co-author their learning plans and visualize the structure ahead of time, we reduce friction and promote ownership. Visual clarity and flexible rescheduling are key to maintaining long-term engagement.</P>
            </div>
            <div className=" mb-10  mx-auto">
              <H3>Learning Reports: Visual Feedback and Next Steps</H3>
              <P>To address user anxiety around vague or delayed feedback, we designed a web-based report system accessible on both desktop and mobile—allowing parents to stay informed in real time.</P>
              <ImageWithHotspots
                src={screenShot5}
                alt="learning goal setting"
                hotspots={learningReportHotspots}
              />
              <P className='mt-6'>Reports are available across three time dimensions:</P>
              <UL>
                <LI><strong>Daily Reports</strong> highlight completed tasks, key knowledge points, and quiz results.</LI>
                <LI><strong>Weekly Reports</strong> show learning effort, persona updates, and performance trends.</LI>
                <LI><strong>Monthly Reports</strong> offer an overview of time spent, subject performance, and diagnostic insights.</LI>
              </UL>
              <P>All reports are visualized using simplified charts and progress indicators, ensuring clarity for both students and parents.</P>
              <div className='px-4 pb-3 pt-6 bg-gray-100 rounded-sm'>
                <P><strong>Design Focus:</strong></P>
                <P>The biggest challenge was turning complex performance data into actionable insights while staying emotionally supportive. By aligning the report tone with our visual language, we built a transparent and encouraging system that enhances communication between students and parents.</P>
              </div>
              <div className=" mb-10  mx-auto">
                <H3>Badge Collection: Motivation Through Milestones</H3>
                <P>To encourage consistent engagement, we introduced a game-inspired badge collection system. Students unlock badges by reaching learning milestones, such as completing lessons, meeting daily goals, or adjusting their study plans.</P>

                <ImageWithHotspots
                  src={screenShot6}
                  alt="badge collection"
                  hotspots={badgeCollectionHotspots}
                />
                <P className='mt-6'>Progress tracking and lock/unlock feedback satisfy users’ collection desire and reinforce habit formation.</P>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                  <img src={screenShot7} alt="badge 1" className="rounded-sm" />
                  <img src={screenShot8} alt="badge 2" className="rounded-sm" />
                </div>

              </div>
              <div className='px-4 pb-3 pt-6 bg-gray-100 rounded-sm'>
                <P><strong>Design Focus:</strong></P>
                <P>We combined the visual appeal of collectible items with milestone-driven design. The goal was to make progress feel rewarding without relying on competitive gamification.</P>
              </div>
            </div>
          </Container>
        </SectionBlock>

        {/* Reflection */}
        <SectionBlock bgVariant="blue" backgrounds={mentorBackgrounds}>
          <Container className='w-full md:w-2/3 mx-auto'>
            <H2>Reflection</H2>

            <div>
              <P>Designing Mentor was more than a visual or functional challenge—it was a deeply collaborative, iterative process that stretched across teams and disciplines. Looking back, here are three key reflections from my role as the design lead:</P>
              <H3>1. Keep everyone in the loop</H3>
              <UL>
                <LI>With a grand product vision and complex requirements, clear and timely communication became essential.</LI>
                <LI>I overcame my habit of being indirect and learned to be vocal in design and cross-functional discussions to protect my team and ensure smooth progress.</LI>
              </UL>
              <H3>2. Learning from the Market</H3>
              <UL>
                <LI>Beyond user research, I learned to value feedback from the sales team who directly interact with potential customers.</LI>
                <LI>Their insights helped make the product more competitive and prevented overly designer-centric decisions.</LI>
              </UL>
              <H3>3. Supporting Team Growth</H3>
              <UL>
                <LI>Held 1-on-1 meetings to understand each teammate’s motivations and engagement.</LI>
                <LI>Assigned tasks to help them grow, while encouraging them to learn and sharpen their skills using available resources.</LI>
              </UL>
            </div>
          </Container>
        </SectionBlock>

        {/* conclusion */}
        <SectionBlock bgVariant="dark" backgrounds={mentorBackgrounds}>
          <Container className='w-full md:w-2/3 mx-auto flex flex-col items-center justify-center mb-24'>
            <P>Designing Mentor was more than just shaping screens—it was about shaping a team, a story, and a shared belief in learning. Early on, I was still a maker: focused on pixels, flows, and UI polish. But as the product scaled, I learned to lead—aligning cross-functional efforts, empowering teammates, and holding the bigger picture.</P>
            <P>These lessons helped me grow from an individual contributor to a design lead. I learned to communicate clearly, translate ideas across roles, and recognize delivery as a collective rhythm. More than anything, this project taught me that good design is not just about clarity and craft, but about aligning vision, people, and outcomes.</P>
            <img src={mentor} alt="mentor" className='w-24 h-24' />
            <p className='text-h3 font-light'>Mentor</p>
            <p className='text-caption text-gray-300'>May 2019 - June 2024</p>
          </Container>
            <hr className='w-full my-8 border-gray-800' />
          <Footer />
        </SectionBlock>


      </main>
    </div>
  )
}


