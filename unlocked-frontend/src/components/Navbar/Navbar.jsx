import React, { useContext, useEffect, useState } from 'react';
import "./Navbar.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

const Navbar = ({ setLogin, isCourseDetailPage }) => {
  const [menu, setMenu] = useState('home');
  const { token, setToken, loading } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {

    localStorage.removeItem("token")
    setToken("");
    navigate("/");
    toast.success("Logged out successfully!");
  };


  useEffect(() => {
    console.log("Token in Navbar:", token);
  }, [token]);


  const handleScroll = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenu("home");
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      setMenu(id);
    }
  };

  // Define page conditions
  const isHomePage = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";
  const isCoursesPage = location.pathname === "/courses";
  const isResetPasswordPage = location.pathname === "/reset-password";
  // const isSendResetOtpPage = location.pathname === "/send-reset-otp";

  return (
    <div className='navbar'>
      <Link to="/" className="logo">
        <p className='logoo'>U</p>
        <p className='unlock'>UnlockEdu</p>
      </Link>


      {!isDashboard && !isCoursesPage && !isCourseDetailPage && !isResetPasswordPage && (
        <div className="nav-right">
          <ul className="elements">
            {isHomePage && (
              <>
                <Link to="/" onClick={() => handleScroll("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#testimonials' onClick={() => handleScroll("testimonials")} className={menu === "skills" ? "active" : ""}>Testimonials</a>
                <a href='#contact' onClick={() => handleScroll("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
                <a href='#footer' onClick={() => handleScroll("footer")} className={menu === "footer" ? "active" : ""}>Footer</a>
              </>
            )}
          </ul>
        </div>
      )}

      <div className="nav-right">
        {!loading && (!token ? (
          <button onClick={(e) => {
            e.preventDefault();
            setLogin(true);
          }}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ))}


      </div>

    </div>
  );
};

export default Navbar;
