import { useState } from 'react'
import Navbar from './components/utilities/Navbar'
import Footer from './components/utilities/Footer'
import blogPosts from './assets/blogPosts'
import { getPublicPath } from './utils/path'
import LazyImage from './components/utilities/LazyImage'
import { useLanguage } from './contexts/LanguageContext'
import { useTranslation } from './hooks/useTranslation'
import { buildPath } from './utils/routing'

function CategoryTabs({ current, onChange, tabs }) {
  return (
    <div className='flex flex-wrap items-center gap-3 md:gap-8 text-sm md:text-base font-medium text-gray-800'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`h-11 px-5 rounded-full transition-colors ${
            current === tab.key ? 'bg-highlight text-gray-800' : 'bg-transparent hover:bg-highlight/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function getPostDescription(post) {
  return post.description || post.subtitle || ''
}

function getPostImage(post) {
  return post.image || post.heroImage || post.thumbnailImage || ''
}

function getPostCategories(post) {
  if (Array.isArray(post.categories) && post.categories.length > 0) return post.categories
  return post.category ? [post.category] : []
}

function getPostCategoryLabel(post) {
  if (Array.isArray(post.categoryLabels) && post.categoryLabels.length > 0) {
    return post.categoryLabels.join(' / ')
  }
  return post.categoryLabel || post.category || ''
}

function parsePostTime(post) {
  return new Date((post.date || '').replace(/\//g, '-')).getTime() || 0
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return b.featured ? 1 : -1
    return parsePostTime(b) - parsePostTime(a)
  })
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className='relative pb-5'>
      <div className='absolute -top-6 left-0 text-5xl md:text-7xl font-semibold text-gray-100 leading-none select-none'>
        {eyebrow}
      </div>
      <h2 className='relative text-2xl md:text-3xl font-semibold text-gray-800 tracking-normal'>
        {title}
      </h2>
    </div>
  )
}

function TagPills({ post, dense = false }) {
  const categories = getPostCategories(post)
  const labels = Array.isArray(post.categoryLabels) && post.categoryLabels.length > 0
    ? post.categoryLabels
    : categories.map((category) => category || getPostCategoryLabel(post)).filter(Boolean)

  if (labels.length === 0) return null

  return (
    <div className={`flex flex-wrap ${dense ? 'gap-2' : 'gap-x-8 gap-y-3'}`}>
      {labels.map((label) => (
        <span
          key={label}
          className={`font-medium text-gray-700 ${dense ? 'rounded-full bg-highlight/50 px-3 py-1 text-xs' : 'text-sm md:text-base'}`}
        >
          {dense ? label : <><span className='text-highlight'>#</span> {label}</>}
        </span>
      ))}
    </div>
  )
}

function TopFeatureCard({ post, buildHref }) {
  if (!post) return null

  return (
    <a
      href={buildHref(`/blog/post/${post.slug}`)}
      className='group block'
    >
      <div className='grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 md:gap-6 items-start'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl font-semibold text-gray-800 shadow-sm'>
          1
        </div>
        <div className='min-w-0'>
          <h3 className='text-xl md:text-2xl font-semibold leading-snug text-gray-800 group-hover:text-highlight transition-colors'>
            {post.title}
          </h3>
          <div className='mt-3'>
            <TagPills post={post} dense />
          </div>
        </div>
      </div>

      <div className='mt-5 aspect-[16/10] overflow-hidden rounded-lg bg-gray-100'>
        <LazyImage
          src={getPublicPath(getPostImage(post))}
          alt={post.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
        />
      </div>
    </a>
  )
}

function TopListItem({ post, rank, buildHref }) {
  return (
    <a
      href={buildHref(`/blog/post/${post.slug}`)}
      className='group grid grid-cols-[3rem_minmax(0,1fr)] gap-3 md:gap-5 border-b border-gray-300 py-5 first:pt-0'
    >
      <div className='text-3xl md:text-4xl font-semibold leading-none text-gray-800'>{rank}</div>
      <div className='min-w-0'>
        <h3 className='text-lg md:text-xl font-semibold leading-snug text-gray-800 group-hover:text-highlight transition-colors'>
          {post.title}
        </h3>
        <div className='mt-4'>
          <TagPills post={post} dense />
        </div>
      </div>
    </a>
  )
}

function ArticleCard({ post, buildHref }) {
  return (
    <a
      href={buildHref(`/blog/post/${post.slug}`)}
      className='group flex flex-col gap-4'
    >
      <div className='aspect-[16/10] overflow-hidden rounded-lg bg-gray-100'>
        <LazyImage
          src={getPublicPath(getPostImage(post))}
          alt={post.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
        />
      </div>
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg md:text-xl font-semibold leading-snug text-gray-800 group-hover:text-highlight transition-colors'>
          {post.title}
        </h3>
        <p className='text-sm leading-relaxed text-gray-600 line-clamp-2'>{getPostDescription(post)}</p>
        <TagPills post={post} />
      </div>
    </a>
  )
}

function BlogList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [category, setCategory] = useState('all')
  const { language } = useLanguage()
  const { t } = useTranslation()

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  const categoryTabs = [
    { key: 'all', label: t('blog.all') },
    ...Array.from(new Set(blogPosts.flatMap(getPostCategories))).map((key) => ({
      key,
      label: t(`blog.${key}`, key),
    })),
  ]

  const sortedPosts = sortPosts(blogPosts)
  const topPosts = sortedPosts.slice(0, 5)
  const topFeature = topPosts[0]
  const topList = topPosts.slice(1, 5)

  const filtered = sortedPosts.filter((post) => (
    category === 'all' ? true : getPostCategories(post).includes(category)
  ))

  return (
    <div className='min-h-screen lg:flex flex-row bg-[#F7F7F5]'>
      <Navbar
        isWhite={true}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <div className='w-full min-h-screen pt-24 px-6 md:px-10 xl:px-16 pb-20 flex flex-col gap-16 md:gap-20 overflow-hidden'>
        <header className='max-w-3xl mx-auto w-full text-center px-2'>
          <h1 className='text-h1 mobile:text-mobile-h1 mb-6 text-gray-800'>
            {t('blog.title')}
          </h1>
          <p className='text-p text-gray-600'>
            {t('blog.subtitle')}
          </p>
        </header>

        <section className='flex flex-col gap-8'>
          <SectionHeading eyebrow='TOP5' title={t('blog.topTitle', '熱門文章')} />
          <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] gap-8 lg:gap-20 items-start'>
            <TopFeatureCard post={topFeature} buildHref={buildHref} />
            <div className='flex flex-col'>
              {topList.map((post, index) => (
                <TopListItem
                  key={post.id}
                  post={post}
                  rank={index + 2}
                  buildHref={buildHref}
                />
              ))}
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-10 border-t border-gray-300 pt-14'>
          <SectionHeading eyebrow='Latest' title={t('blog.latestTitle', '最新專欄文章')} />

          <CategoryTabs current={category} onChange={setCategory} tabs={categoryTabs} />

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12'>
            {filtered.map((post) => (
              <ArticleCard key={post.id} post={post} buildHref={buildHref} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

export default BlogList
