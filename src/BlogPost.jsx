import { useEffect, useState } from 'react'
import Navbar from './components/utilities/Navbar'
import Footer from './components/utilities/Footer'
import NotFound from './NotFound'
import blogPosts, { getPostBySlug } from './assets/blogPosts'
import { getPublicPath } from './utils/path'

function BlogPost({ slug }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const post = getPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <NotFound />
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className='min-h-screen lg:flex flex-row bg-bg'>
      <Navbar
        isWhite={true}
        variant='arrow'
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <div className='w-full min-h-screen pt-24 px-6 md:px-10 xl:px-16 pb-20 flex flex-col gap-12'>
        <main className='max-w-3xl mx-auto w-full space-y-8'>
          <header className='space-y-4'>
            <div className='text-xs uppercase tracking-[0.25em] text-gray-500'>{post.categoryLabel}</div>
            <h1 className='text-3xl md:text-4xl font-semibold text-white leading-tight'>{post.title}</h1>
            <p className='text-sm text-gray-400 max-w-2xl'>{post.subtitle}</p>
            <div className='flex items-center gap-3 text-xs text-gray-500'>
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {post.heroImage && (
            <div className='rounded-3xl overflow-hidden bg-[#101625]'>
              <img src={getPublicPath(post.heroImage)} alt={post.title} className='w-full h-auto object-cover' />
            </div>
          )}

          <article className='prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-white prose-p:text-gray-200 prose-a:text-highlight'>
            {post.content?.map((block, index) => {
              // 純文字：當作一般段落
              if (typeof block === 'string') {
                return <p key={index}>{block}</p>
              }

              // 圖片 block：依照 width 套 Tailwind class
              if (block?.type === 'image') {
                const widthClassMap = {
                  full: 'w-full',
                  half: 'w-1/2',
                  third: 'w-1/3',
                }

                const widthClass = widthClassMap[block.width] || 'w-full'

                return (
                  <figure key={index} className='my-8 flex flex-col items-center'>
                    <div className={`${widthClass} rounded-3xl overflow-hidden bg-[#101625]`}>
                      <img src={getPublicPath(block.src)} alt={block.alt || ''} className='w-full h-auto object-cover' />
                    </div>
                    {block.caption && (
                      <figcaption className='mt-3 text-[12px] text-center text-gray-500 max-w-xs mx-auto'>
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }

              // 未定義型別：安全忽略
              return null
            })}
          </article>
        </main>

        {related.length > 0 && (
          <section className='max-w-3xl mx-auto w-full'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-sm font-semibold tracking-[0.25em] uppercase text-gray-500'>
                More from this blog
              </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {related.map((item) => (
                <a
                  key={item.id}
                  href={`#/blog/post/${item.slug}`}
                  className='bg-[#101625] rounded-2xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col gap-2'
                >
                  <div className='text-[11px] uppercase tracking-[0.2em] text-blue-300'>
                    {item.categoryLabel}
                  </div>
                  <div className='text-sm font-semibold text-white line-clamp-2'>{item.title}</div>
                  <div className='text-[11px] text-gray-500 mt-auto'>{item.date}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  )
}

export default BlogPost


