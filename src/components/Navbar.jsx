import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">我的網站</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">首頁</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/portfolio">作品集</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">部落格</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">聯絡方式</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;