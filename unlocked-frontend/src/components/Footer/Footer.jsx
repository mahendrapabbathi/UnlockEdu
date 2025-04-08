import React from 'react';
import './Footer.css';
import { Link, useLocation } from 'react-router-dom';

const Footer = ({ login }) => {
  const location = useLocation(); 

  const isHomePage = location.pathname === "/";
  const isDashboardOrCourses = ["/dashboard", "/courses"].includes(location.pathname);

  if (!login && isDashboardOrCourses) {
    return null;
  }

  return (
    <>
      <div id='footer' className='footer'>
        <div className='footer-child'>
          <Link to="/" className="logo1">
            <p className='logoo1'>U</p>
            <p className='unlock'>UnlockEdu</p>
          </Link>

          {!login && isHomePage && (
            <div className='right'>
              <div className='quick'>
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href='#skills'>Courses</a></li>
                  <li><a href='#contact'>Contact</a></li>
                </ul>
              </div>

              <div className='quick'>
                <h3>Legal</h3>
                <ul>
                  <li><a href='#'>Privacy Policy</a></li>
                  <li><a href='#'>Terms of Use</a></li>
                  <li><a href='#'>Refund & Cancellation</a></li>
                </ul>
              </div>

              <div className='quick-mail'>
                <h3>Get In Touch</h3>
                <div className='mail'>
                  <i className='fa-solid fa-envelope'></i>
                  <a href='#contact'>pabbathimahendra8@gmail.com</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(!login && isHomePage) && ( 
        <div className="footer-last">
          <p>Copyright © 2025 Sorting Code Help Technologies Pvt Ltd. All Rights Reserved.</p>
        </div>
      )}
    </>
  );
};

export default Footer;
