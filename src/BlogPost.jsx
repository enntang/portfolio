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

function PostNavCard({ post, direction }) {
  const isNext = direction === 'next'
  const thumbnail = post.thumbnailImage || post.heroImage

  return (
    <a
      href={`#/blog/post/${post.slug}`}
      className='group block rounded-2xl p-6 hover:bg-gray-100 transition-colors'
    >
      <div className='w-24 h-24 md:w-28 md:h-28 -mt-14 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#1B2132] to-[#101625]'>
        {thumbnail && (
          <img
            src={getPublicPath(thumbnail)}
            alt={post.title}
            className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
          />
        )}
      </div>
      <div className='text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-gray-500 transition-colors'>
        {post.title}
      </div>
      <div className='flex items-center gap-2 text-xs text-gray-500 mt-2'>
        <span>{post.date}</span>
        <span className='flex items-center gap-1 text-gray-700'>
          {isNext ? (
            <>下一篇<span aria-hidden='true'>→</span></>
          ) : (
            <><span aria-hidden='true'>←</span>上一篇</>
          )}
        </span>
      </div>
    </a>
  )
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

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(a.date.replace(/\//g, '-')) - new Date(b.date.replace(/\//g, '-'))
  )
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug)
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
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
                <span>{post.author}</span>
                <span>•</span>
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
                    <blockquote className='not-prose relative my-8 rounded-2xl border border-gray-200 px-8 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10'>
                      <img
                        src={getPublicPath('/icon-quote.svg')}
                        alt=''
                        className='absolute w-16 md:w-24 h-auto opacity-70 select-none pointer-events-none origin-top-left scale-[0.8]'
                        style={{ top: '6px', left: '6px' }}
                      />
                      <div className='relative z-10 text-center text-base md:text-lg font-medium text-gray-700 leading-relaxed'>
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

        {(previousPost || nextPost) && (
          <section className='max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
            {previousPost ? <PostNavCard post={previousPost} direction='previous' /> : <div />}
            {nextPost && <PostNavCard post={nextPost} direction='next' />}
          </section>
        )}

        <Footer />
        </div>
      </div>
    </div>
  )
}

export default BlogPost
