import { useState } from 'react'
import Navbar from './components/utilities/Navbar'

function NotFound() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='min-h-screen bg-bg'>
      <Navbar
        isWhite={true}
        variant='arrow'
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        onBack={() => window.history.back()}
      />
      <main className='pt-24'>
        <div className='max-w-3xl mx-auto px-8 py-16 text-center'>
          <div className='text-8xl font-bold text-gray-200'>404</div>
          <h1 className='text-h2 text-gray-800 mt-4 mb-2'>Page Not Found</h1>
          <p className='text-p text-gray-600 mb-8'>The content you’re looking for doesn’t exist or has moved.</p>
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <a
              href='#/projects'
              className='px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800'
            >
              View Projects
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound


