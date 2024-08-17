import React from 'react';
import "./footer.css"
import { useNavigate } from 'react-router';
const Footer = () => {
const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a  onClick={()=> navigate('/about')}>About Me</a>
          {/* <a href="#" onClick={()=> navigate('/')}>Blog</a> */}
          {/* <a  onClick={()=> window.location.href = "mailto:rockmondalsayantan@gmail.com"}>Contact</a> */}
        </div>
        <div className="social-icons">
          <a href="https://x.com/SayantanMondal_" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/GrimFighter" className="social-icon">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/sayantan-mondal-0b33a21a1/" className="social-icon">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} RouteRiot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
