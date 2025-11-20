const modules = import.meta.glob('./blog/*/content.js', {
  eager: true,
  import: 'default',
})

function buildPostsMap() {
  const posts = []

  Object.entries(modules).forEach(([path, post]) => {
    const afterBase = path.split('/blog/')[1] || ''
    const slugFromPath = afterBase.split('/')[0] || ''
    const slug = post.slug || slugFromPath

    posts.push({
      ...post,
      slug,
    })
  })

  return posts
}

const blogPosts = buildPostsMap()

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export default blogPosts
