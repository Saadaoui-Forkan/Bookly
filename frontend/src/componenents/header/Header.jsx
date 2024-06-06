import React, { useState } from 'react';
import './header.css';
import { Link, NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseFill } from "react-icons/ri";
import logo from '../../images/logo.png';

function Header() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className='logo'>
              <img src={ logo } alt='logo'/>
            </div>
            <span className="logo-icon">Bookly</span>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "active" : "nav-links"}
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? "active" : "nav-links"}
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <RiCloseFill />
              </span>
            ) : (
              <span className="icon">
                <CiMenuBurger />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header