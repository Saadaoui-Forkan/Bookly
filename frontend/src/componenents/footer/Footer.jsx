import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className='footer'>
        <Link to="/" className="nav-logo">
            <div className='logo'>
                <img src={ logo } alt='logo'/>
            </div>
            <span className="logo-icon">Bookly</span>
        </Link>
        <div className="social">
          <h1>WE ARE SOCIAL</h1>
          <div className="social-icons">
            <a href='https://www.linkedin.com/in/saadaoui-mahmoud' target='_blank' rel="noreferrer"><FaLinkedin /></a>
            <a href='https://github.com/Saadaoui-Forkan' target='_blank' rel="noreferrer"><FaGithub /></a>
            <a href='https://www.youtube.com/@mahmoudsaadaoui6110' target='_blank' rel="noreferrer"><FaYoutube/></a>
          </div>
        </div>
        <p> 
          &copy;{new Date().getFullYear()} Bookly | All rights reserved | Terms
          Of Service | Privacy
        </p>
    </div>
  )
}

export default Footer