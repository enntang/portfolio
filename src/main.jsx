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
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { parsePath } from './utils/routing'

function Router() {
  const [pathname, setPathname] = useState(() => {
    return window.location.pathname
  })

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }
    
    // 監聽瀏覽器前進/後退
    window.addEventListener('popstate', handlePopState)
    
    // 監聽自定義的導航事件（用於程式化導航）
    const handleNavigation = () => {
      setPathname(window.location.pathname)
    }
    window.addEventListener('navigate', handleNavigation)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('navigate', handleNavigation)
    }
  }, [])

  // 解析路徑，提取語言和實際路徑
  const { path } = parsePath(pathname)

  // 根路徑顯示首頁
  if (path === '/') return <Home />
  
  if (path === '/about') return <About />
  if (path === '/blog') return <BlogList />
  if (path.startsWith('/blog/post/')) {
    const slugPart = path.slice('/blog/post/'.length)
    const slug = decodeURIComponent(slugPart.split('/')[0])
    return <BlogPost slug={slug} />
  }
  if (path === '/projects') return <ProjectsList />
  // Dynamic project detail route: /project/:slug
  if (path.startsWith('/project/')) {
    const slugPart = path.slice('/project/'.length)
    const slug = decodeURIComponent(slugPart.split('/')[0])
    if (!slug) {
      return <NotFound />
    }
    return <ProjectPageRouter slug={slug} />
  }
  if (path === '/404') return <NotFound />
  return <Home />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <LoadingAnimation />
      <Router />
    </LanguageProvider>
  </StrictMode>,
)
