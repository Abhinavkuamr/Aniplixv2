import React, { useEffect } from 'react';
import './stylesheet/notfound.css';
import logo from '../Component/logo2.png';
function NotFound() {
  useEffect(() => {
    // Simulate a 5-second delay
    const delay = 6000;

    // Set a timeout to redirect to the home page after the delay
    const timeoutId = setTimeout(() => {
      // Use window.location.href to redirect
      window.location.href = '/'; // Change this to the desired home page URL
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className='notfound'>
      <img className='notfound__logo' src={logo}></img>
      <h1 className='notfound__h1'>
        404 ERROR | Wrong Page | We are working on a fix.
      </h1>
    </div>
  );
}

export default NotFound;
