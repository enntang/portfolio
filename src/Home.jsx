import { useState } from 'react'
import BtnWhite from './components/utilities/BtnWhite'
import Navbar from './components/utilities/Navbar'
import Projects from './components/projects/Projects'
import Contact from './components/home/Contact'
import ImageCarousel from './components/utilities/ImageCarousel'
import Recommendations from './components/home/Recommendations'
import Footer from './components/utilities/Footer'
import { getPublicPath } from './utils/path'


function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='h-screen lg:flex flex-row'>
      <Navbar
        isWhite={false}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />
      <div className='bg-white  w-full lg:w-1/2  h-full'>
        <ImageCarousel
          slides={[
            { src: getPublicPath('/bg-mentor.png'), title: 'Intuitive and visually appealing UI design', subtitle: 'I focused on', projectName: 'Mentor: AI-integrated learning platform', slug: 'mentor' },
            { src: getPublicPath('/bg-illustration.png'), title: 'Illustrations that tell stories', subtitle: 'I create', projectName: 'Star', href: '#/projects'},
            { src: getPublicPath('/bg-ehairpos.png'), title: 'Intuitive and visually appealing UI design', subtitle: 'I focused on', projectName: 'eHairPOS', slug: 'ehairpos' },
            { src: getPublicPath('/bg-textbook.png'), title: 'Graphic Design & Editorial Layout', subtitle: 'I specialize', projectName: "A Traveler's Guide for Young Historians", href: '#/projects' },
            { src: getPublicPath('/bg-penguin.png'), title: 'Playful Game UI Design', subtitle: 'I do', projectName: 'Penguin Game', slug: 'penguin-territory' },
            
          ]}
        />
      </div>
      <div className='w-full lg:w-1/2 relative p-8 xl:p-16 bg-bg bg-center bg-no-repeat overflow-visible md:overflow-scroll'>

        <div className='flex flex-col'>

          <section className='flex flex-col py-16 py-8 text-gray-900 md:w-2/3'>
            <h2 data-aos="fade-up" data-aos-duration="1000" className=' text-4xl text-2xl text-gray-300 mb-6 text-large text-large-mobile'>Hello, I'm ENN!</h2>
            <p data-aos="fade-up" className='text-p mb-6 mb-4'>I’m a passionate UI designer who puts users first. I create intuitive, user-centered interfaces that enhance usability while ensuring smooth collaboration between design and development teams.</p>
            <BtnWhite name={'More about me'} className='w-fit' href='#/about' />
          </section>

          {/* Projects Section */}
          <Projects />

          {/* Recommendations Section */}
          <Recommendations />

          <section className="relative py-16 mobile:py-8">         
            <Contact />
          </section>

          <Footer />


        </div>
      </div>
    </div>
  )
}

export default Home
