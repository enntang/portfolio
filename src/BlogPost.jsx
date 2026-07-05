import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Navbar from './components/utilities/Navbar'
import Footer from './components/utilities/Footer'
import TableOfContents from './components/utilities/TableOfContents'
import NotFound from './NotFound'
import blogPosts, { getPostBySlug } from './assets/blogPosts'
import { getPublicPath } from './utils/path'

// 解析圖片說明文字尾端的寬度標記，例如 "說明文字 |50%"
// 讓使用者可以直接在 Notion 圖片的 caption 欄位設定寬度，不需要碰程式碼
function parseImageMeta(alt) {
  const match = /\s*\|\s*(\d{1,3})%\s*$/.exec(alt || '')
  if (match) {
    const width = Math.min(100, Math.max(10, parseInt(match[1], 10)))
    return { caption: alt.slice(0, match.index).trim(), width }
  }
  return { caption: alt || '', width: 100 }
}

function getPostDescription(post) {
  return post.description || post.subtitle || ''
}

function getPostImage(post) {
  return post.image || post.heroImage || post.thumbnailImage || ''
}

function getPostCategoryLabel(post) {
  if (Array.isArray(post.categoryLabels) && post.categoryLabels.length > 0) {
    return post.categoryLabels.join(' / ')
  }
  return post.categoryLabel || post.category || ''
}

function getPostCategoryLabels(post) {
  if (Array.isArray(post.categoryLabels) && post.categoryLabels.length > 0) {
    return post.categoryLabels
  }
  return getPostCategoryLabel(post) ? [getPostCategoryLabel(post)] : []
}

function BlogPost({ slug }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const post = getPostBySlug(slug)
  const articleRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return <NotFound />
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)
  const postImage = getPostImage(post)
  const categoryLabels = getPostCategoryLabels(post)

  return (
    <div className='min-h-screen lg:flex flex-row bg-bg'>
      <Navbar
        isWhite={true}
        variant='arrow'
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <TableOfContents key={slug} selector='h1, h2' container={articleRef} />

      <div className='w-full min-h-screen flex flex-col'>
        <div className='relative w-full h-[400px] md:h-[560px] bg-gradient-to-br from-[#1B2132] to-[#101625]'>
          {postImage && (
            <img
              src={getPublicPath(postImage)}
              alt={post.title}
              className='absolute inset-0 w-full h-full object-cover'
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent' />
          <div className='absolute inset-x-0 bottom-0 px-6 md:px-10 xl:px-16 pb-10 md:pb-14'>
            <div className='max-w-3xl mx-auto w-full space-y-3'>
              {categoryLabels.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {categoryLabels.map((label) => (
                    <span
                      key={label}
                      className='rounded-full bg-highlight/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-900'
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
              <h1 className='text-3xl md:text-4xl font-semibold text-white leading-tight'>{post.title}</h1>
              <div className='flex items-center gap-3 text-xs text-white'>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='px-6 md:px-10 xl:px-16 pb-20 flex flex-col gap-12 pt-10'>
        <main className='max-w-3xl mx-auto w-full space-y-8'>
          <p className='text-sm text-gray-700 max-w-2xl'>{getPostDescription(post)}</p>

          <article ref={articleRef} className='prose prose-sm md:prose-base max-w-none prose-headings:text-gray-900 prose-headings:font-medium prose-p:text-gray-900 prose-p:font-extralight prose-strong:text-gray-900 prose-li:text-gray-900 prose-li:font-extralight prose-a:text-gray-900 prose-a:underline prose-a:decoration-highlight prose-a:decoration-[6px] prose-a:underline-offset-2 prose-img:rounded-lg prose-img:bg-[#101625] prose-code:text-highlight prose-code:bg-[#101625] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#101625] prose-pre:rounded-lg prose-h1:mt-16 prose-h2:mt-12 prose-h3:mt-8 [&_h1>strong]:font-medium [&_h2>strong]:font-medium [&_h3>strong]:font-medium'>
            {typeof post.content === 'string' ? (
              <ReactMarkdown
                components={{
                  img: ({ src, alt }) => {
                    const { caption, width } = parseImageMeta(alt)
                    return (
                      <figure className='my-8 flex flex-col items-center'>
                        <div
                          className='rounded-lg overflow-hidden bg-[#101625]'
                          style={{ width: `${width}%`, margin: 0 }}
                        >
                          <img
                            src={getPublicPath(src)}
                            alt={caption}
                            className='block w-full h-auto'
                            style={{ margin: 0 }}
                          />
                        </div>
                        {caption && (
                          <figcaption className='mt-3 text-[12px] text-center text-gray-600 max-w-md mx-auto'>
                            {caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  },
                  blockquote: ({ children }) => (
                    <blockquote className='not-prose relative my-10 px-6 py-2 md:px-10'>
                      <img
                        src={getPublicPath('/icon-quote.svg')}
                        alt=''
                        className='absolute w-10 md:w-14 h-auto opacity-60 select-none pointer-events-none origin-top-left'
                        style={{ top: '-4px', left: '0' }}
                      />
                      <div className='relative z-10 text-base md:text-lg font-light text-gray-700 leading-relaxed'>
                        {children}
                      </div>
                    </blockquote>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            ) : (
              // 向下相容舊格式（陣列）
              post.content?.map((block, index) => {
                if (typeof block === 'string') {
                  return <p key={index}>{block}</p>
                }
                if (block?.type === 'image') {
                  return (
                    <figure key={index} className='my-8 flex flex-col items-center'>
                      <div className='w-full rounded-3xl overflow-hidden bg-[#101625]'>
                        <img src={getPublicPath(block.src)} alt={block.alt || ''} className='w-full h-auto object-cover' />
                      </div>
                      {block.caption && (
                        <figcaption className='mt-3 text-[12px] text-center text-gray-600 max-w-xs mx-auto'>
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  )
                }
                return null
              })
            )}
          </article>
        </main>

        {related.length > 0 && (
          <section className='max-w-3xl mx-auto w-full'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-sm font-semibold tracking-[0.25em] uppercase text-gray-600'>
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
                    {getPostCategoryLabel(item)}
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
    </div>
  )
}

export default BlogPost
