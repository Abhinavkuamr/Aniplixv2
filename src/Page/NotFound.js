import React from 'react';
import './stylesheet/notfound.css';
import logo from '../Component/logo2.png';
function NotFound() {
  return (
    <div className='notfound'>
      <img className='notfound__logo' src={logo}></img>
      <h1 className='notfound__h1'>404 ERROR | Wrong Page</h1>
    </div>
  );
}

export default NotFound;
