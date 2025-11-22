import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import About from './About.jsx'
import ProjectsList from './ProjectsListPage.jsx'
import BlogList from './BlogList.jsx'
import BlogPost from './BlogPost.jsx'
import NotFound from './NotFound.jsx'
import ProjectPageRouter from './ProjectPageRouter.jsx'
import LoadingAnimation from './components/utilities/LoadingAnimation.jsx'

function Router() {
  const [hash, setHash] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    // Normalize empty hash to root
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const path = (hash || '#/').replace(/^#/, '')

  if (path === '/about') return <About />
  if (path === '/blog') return <BlogList />
  if (path.startsWith('/blog/post/')) {
    const slug = decodeURIComponent(path.slice('/blog/post/'.length))
    return <BlogPost slug={slug} />
  }
  if (path === '/projects') return <ProjectsList />
  // Dynamic project detail route: #/project/:slug (JSON generation removed; JSX pages only)
  if (path.startsWith('/project/')) {
    const slug = decodeURIComponent(path.slice('/project/'.length))
    return <ProjectPageRouter slug={slug} />
  }
  if (path === '/404') return <NotFound />
  return <Home />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <LoadingAnimation />
      <Router />
    </>
  </StrictMode>,
)
