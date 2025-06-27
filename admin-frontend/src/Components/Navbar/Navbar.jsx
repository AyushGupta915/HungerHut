import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import Login from '../login/loginPopup';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    window.location.href = '/admin/login';
  };

  return (
    <>
      <div className="navbar">
        <img src={assets.logo} alt="Logo" className="logo" />

        {isLoggedIn ? (
          <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={assets.profile_image} alt="Admin" className="profile" />
            {dropdownOpen && (
              <ul className="dropdown">
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className="login-button">
            Admin Login
          </button>
        )}
      </div>

      {/* Login Popup Overlay */}
      {showLogin && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={() => setShowLogin(false)}>✖</button>
            <Login setShowLogin={setShowLogin} onLogin={() => setIsLoggedIn(true)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
