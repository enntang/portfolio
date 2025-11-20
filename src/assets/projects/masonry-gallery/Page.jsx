import { useState } from 'react'
import Navbar from '../../../components/utilities/Navbar'
import Footer from '../../../components/utilities/Footer'

const galleryImages = [
  {
    src: '/project-cover-mentor.png',
    alt: 'Mentor project cover',
  },
  {
    src: '/project-cover-ehairpos.png',
    alt: 'eHairPOS project cover',
  },
  {
    src: '/project-cover-penguin.png',
    alt: 'Penguin Territory project cover',
  },
  {
    src: '/project-cover-shopping.png',
    alt: 'Shopping site project cover',
  },
  {
    src: '/project-cover-basel.png',
    alt: 'Basel Convention project cover',
  },
  {
    // 使用一張長寬比明顯不同的立幅圖片來測試排版效果
    src: '/portrait.png',
    alt: 'Vertical portrait illustration',
  },
]

function MasonryGallery({ images, onImageClick }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
      {images.map((img, index) => (
        <div
          key={index}
          className="mb-6 break-inside-avoid"
        >
          <button
            type="button"
            className="group w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f59e0b] focus-visible:ring-offset-[#fef7ec]"
            onClick={() => onImageClick(index)}
          >
            <div className="overflow-hidden rounded-md bg-[#fffaf3] shadow-md shadow-black/5 border border-[#f2e5d9]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

function Lightbox({ image, onClose, onPrev, onNext }) {
  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[80vh] w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="hidden sm:inline-flex text-white/70 hover:text-white px-2"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="flex-1 flex flex-col items-center">
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-md shadow-2xl"
            />
            {image.alt && (
              <p className="mt-4 text-sm text-gray-200 text-center">
                {image.alt}
              </p>
            )}
          </div>

          <button
            type="button"
            className="hidden sm:inline-flex text-white/70 hover:text-white px-2"
            onClick={onNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MasonryGalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const handleOpen = index => setActiveIndex(index)
  const handleClose = () => setActiveIndex(null)

  const handlePrev = () => {
    setActiveIndex(prev =>
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    )
  }

  const handleNext = () => {
    setActiveIndex(prev =>
      prev === null ? null : (prev + 1) % galleryImages.length
    )
  }

  const activeImage =
    activeIndex === null ? null : galleryImages[activeIndex] || null

  return (
    <div className="min-h-screen bg-[#fef7ec]">
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
        variant="arrow"
      />

      <main className="pt-24 pb-24">
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-h1 mobile:text-mobile-h1 mb-3 text-[#1f2933]">
              Illustration Gallery
            </h1>
            <p className="text-p text-[#6b7280]">
              A waterfall-style layout that gently stacks illustrations of different
              sizes, similar to a printed portfolio spread. Click any piece to open
              a lightbox and view it in more detail.
            </p>
          </div>
        </section>

        <section className="px-4">
          <div className="max-w-5xl mx-auto">
            <MasonryGallery images={galleryImages} onImageClick={handleOpen} />
          </div>
        </section>

        <Footer />
      </main>

      <Lightbox
        image={activeImage}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}


