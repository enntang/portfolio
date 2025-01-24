import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes"; // 引入 routes.jsx

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* 導航欄 */}
        <Navbar />

        {/* 主內容 */}
        <main className="flex-grow-1 container mt-4">
          <AppRoutes /> {/* 使用 routes.jsx 配置路由 */}
        </main>

        {/* 頁腳 */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;