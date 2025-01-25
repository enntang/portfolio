import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ProjectList />} />
        {/* <Route path="/project/:id" element={<ProjectDetail />} /> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
      </Routes>
  );
};

export default AppRoutes;