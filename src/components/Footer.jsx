import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <p>&copy; {new Date().getFullYear()} 我的網站 | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;