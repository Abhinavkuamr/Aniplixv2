import React, { useEffect, useState } from 'react';
import logo from './logo2.png';
import './Stylesheet/nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  const [show, handleShow] = useState(false);

  const transtitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', transtitionNavBar);
    return () => window.removeEventListener('scroll', transtitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents '>
        <Link to={'/'}>
          <img className='nav__logo' src={logo} alt='logo' />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
