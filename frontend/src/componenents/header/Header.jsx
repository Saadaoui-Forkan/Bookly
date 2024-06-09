import React, { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseFill } from "react-icons/ri";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "./Dropdown";

function Header() {
  const [click, setClick] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <span className="logo-icon">Bookly</span>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active" : "nav-links"
                    }
                    onClick={handleClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active" : "nav-links nav-dropdown"
                    }
                    onClick={handleClick}
                  >
                    {user.name}
                    <BsThreeDotsVertical />
                    <Dropdown/>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active" : "nav-links"
                    }
                    onClick={handleClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active" : "nav-links"
                    }
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
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
  );
}

export default Header;
