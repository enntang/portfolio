import { useEffect, useRef, useState } from 'react'
import Navbar from './components/utilities/Navbar'
import Footer from './components/utilities/Footer'
import blogPosts from './assets/blogPosts'

function CategoryTabs({ current, onChange }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'design', label: 'Design' },
    { key: 'tooling', label: 'Tools & Practice' },
    { key: 'self', label: 'Self Growth' },
  ]

  return (
    <div className='flex flex-wrap items-center gap-6 text-sm text-gray-400'>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`pb-2 border-b-2 transition-colors ${
            current === t.key ? 'text-white border-white' : 'border-transparent hover:text-white'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function FeaturedCard({ post }) {
  if (!post) return null

  return (
    <a
      href={`#/blog/post/${post.slug}`}
      className='grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr] gap-0 bg-white rounded-3xl overflow-hidden shadow-sm group'
    >
      <div className='aspect-[16/9] md:aspect-auto md:h-72 bg-[#E5EEF6] flex items-center justify-center overflow-hidden'>
        <img src={post.heroImage || post.thumbnailImage} alt={post.title} className='w-full h-full object-cover' />
      </div>
      <div className='p-8 md:p-10 bg-[#0B0F1A] flex flex-col justify-between'>
        <div>
          <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 mb-3'>
            {post.categoryLabel}
          </div>
          <h2 className='text-xl md:text-2xl font-semibold text-white leading-snug mb-3 group-hover:text-highlight'>
            {post.title}
          </h2>
          <p className='text-sm text-gray-400 leading-relaxed line-clamp-3'>{post.subtitle}</p>
        </div>
        <div className='flex items-center justify-between mt-6 text-[11px] text-gray-500'>
          <span>{post.readingTime}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </a>
  )
}

function GridPostCard({ post }) {
  return (
    <a
      href={`#/blog/post/${post.slug}`}
      className='bg-[#101625] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all group flex flex-col'
    >
      <div className='aspect-[4/3] bg-[#1B2132] overflow-hidden'>
        <img
          src={post.thumbnailImage}
          alt={post.title}
          className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform'
        />
      </div>
      <div className='p-5 flex flex-col gap-2 flex-1'>
        <div className='text-[11px] uppercase tracking-[0.2em] text-blue-300'>{post.categoryLabel}</div>
        <h3 className='text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-highlight'>
          {post.title}
        </h3>
        <p className='text-[12px] text-gray-400 leading-relaxed line-clamp-2'>{post.subtitle}</p>
        <div className='mt-auto flex items-center justify-between text-[11px] text-gray-500 pt-2'>
          <span>{post.readingTime}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </a>
  )
}

function SpotlightItem({ post }) {
  return (
    <a
      href={`#/blog/post/${post.slug}`}
      className='flex gap-4 items-center py-4 hover:bg-[#151C2A] px-3 rounded-xl transition-colors group'
    >
      <div className='w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#1B2132]'>
        <img src={post.thumbnailImage} alt={post.title} className='w-full h-full object-cover' />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='text-[11px] uppercase tracking-[0.2em] text-blue-300'>{post.categoryLabel}</div>
        <div className='text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-highlight'>
          {post.title}
        </div>
        <div className='text-[11px] text-gray-500 mt-1'>{post.date}</div>
      </div>
    </a>
  )
}

function BlogList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [category, setCategory] = useState('all')
  const originalLangRef = useRef(null)

  useEffect(() => {
    // no-op: language pack removed
    originalLangRef.current = 'zh-TW'
  }, [])

  const filtered = blogPosts.filter((post) => (category === 'all' ? true : post.category === category))
  const featuredPost = filtered.find((p) => p.featured) || filtered[0]
  const remaining = filtered.filter((p) => p !== featuredPost)
  const spotlightPosts = filtered.filter((p) => p.spotlight)

  return (
    <div className='min-h-screen lg:flex flex-row bg-bg'>
      <Navbar
        isWhite={false}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <div className='w-full min-h-screen pt-24 px-6 md:px-10 xl:px-16 pb-20 flex flex-col gap-10'>
        {/* Header */}
        <header className='flex flex-col gap-3'>
          <p className='text-xs tracking-[0.25em] uppercase text-gray-500'>Enn’s Notes</p>
          <h1 className='text-4xl md:text-5xl font-semibold text-[#B4C0DF]'>Blog</h1>
          <p className='text-xs md:text-sm text-gray-400 max-w-xl'>
            紀錄我在產品設計、工具使用與職涯成長上的一些觀察與想法，目前內容以中文為主。
          </p>
        </header>

        {/* Tabs */}
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <CategoryTabs current={category} onChange={setCategory} />
        </div>

        {/* Main layout: left column cards + right column spotlight */}
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-8 lg:gap-12 pb-8'>
          <div className='space-y-8'>
            <FeaturedCard post={featuredPost} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {remaining.map((post) => (
                <GridPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <aside className='space-y-4'>
            <div>
              <div className='text-xs uppercase tracking-[0.25em] text-gray-500 mb-2'>Spotlight</div>
            </div>
            <div className='bg-[#101625] rounded-3xl p-3 md:p-4 flex flex-col divide-y divide-gray-800/60'>
              {spotlightPosts.map((post) => (
                <SpotlightItem key={post.id} post={post} />
              ))}
            </div>
          </aside>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default BlogList
