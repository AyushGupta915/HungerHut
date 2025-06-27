import { useState, useContext, useRef, useEffect } from 'react';
import React from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ showLogin, setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const Navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setShowDropdown(false);
    Navigate('/')
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/"><img src={assets.logo} alt="Logo" className="logo" /></Link>
        </div>

        <ul className="navbar-center">
          <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <a href="#footer"><li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</li></a>
        </ul>

        <div className="navbar-right">
          <div className="navbar-basket-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="basket" /></Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {token ? (
            <div className="profile-wrapper" ref={dropdownRef}>
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="profile-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <ul className="dropdown">
                  <li>
                    <Link to="/myorders" className="dropdown-link">
                      <img src={assets.bag_icon} alt="" />
                      <p>Orders</p>
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="signin-button">Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
