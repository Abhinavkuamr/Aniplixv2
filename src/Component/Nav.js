import React, { useEffect, useState, useRef } from 'react';
import logo from './logo2.png';
import './Stylesheet/nav.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const [show, handleShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isButtonActive, setButtonActive] = useState(false); // Add state for button active state
  const searchContainerRef = useRef(null);

  const transtitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  const activate = () => {
    const search = document.querySelector('.search');
    const bar = document.querySelector('.search-bar');
    search.classList.toggle('active');
    bar.value = '';
    setTimeout(() => bar.focus(), 750);
    setInputValue('');
    setSuggestions([]);
    bar.value = '';
  };
  useEffect(() => {
    window.addEventListener('scroll', transtitionNavBar);

    const btn = document.querySelector('.search-btn');

    btn.addEventListener('click', activate, false);
    document.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('scroll', transtitionNavBar);
      // ... other cleanup code
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  // Handle input value change
  const handleInputChange = async (e) => {
    setInputValue(e.target.value);
    try {
      const response = await axios.get(
        `https://betaversion.vercel.app/api/search?id=${e.target.value}`
      );
      setSuggestions(response.data.results);
    } catch {
      console.log('Nothing found yet');
    }
  };
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }
  const handleDocumentClick = (e) => {
    const search = document.querySelector('.search');
    if (search && search.classList.contains('active')) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        // Click occurred outside the search bar, and the search bar is active, so close it
        activate(false);
      }
    }
  };

  const handleSuggestionClick = () => {
    // Close the search bar when a suggestion is clicked
    activate(false);
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    navigate(`/search?search=${inputValue}`, { state: { suggestions } });
    activate(false);
  };

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      {/*console.log(suggestions)*/}
      <div className='nav__contents '>
        <Link to={'/'}>
          <img className='nav__logo' src={logo} alt='logo' />
        </Link>
        <div className='nav__search' ref={searchContainerRef}>
          <form class='search' onSubmit={onSubmit}>
            <input
              class='search-bar'
              type='search'
              name='q'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button class='search-btn' type='button'>
              <ion-icon
                class='search-icon search-glass'
                name='search-outline'
              ></ion-icon>
              <ion-icon
                class='search-icon search-close'
                name='close-outline'
              ></ion-icon>
            </button>
          </form>
          <div className='nav__suggestions'>
            {console.log(suggestions)}
            {suggestions?.slice(0, 2).map((element) => (
              <>
                <Link
                  style={{
                    color: 'white',
                  }}
                  to={`/info/${element.title}?provider=gogoanime&id=${element.id}&episode=""`}
                  onClick={handleSuggestionClick}
                >
                  <div className='nav__suggestion__content'>
                    <img
                      className='nav__suggestion_image'
                      src={`${element.image}`}
                    />
                    <h1
                      style={{ fontSize: '17px' }}
                      className='nav__suggestion_text'
                    >
                      {truncate(`${element.title}`, 20)}
                    </h1>
                  </div>
                </Link>
              </>
            ))}
            <Link
              style={{
                color: 'white',
              }}
              to={`/search?search=${inputValue}`}
              onClick={onSubmit}
            >
              <div className='nav__viewmore' style={{ textAlign: 'center' }}>
                <u>{suggestions?.length > 0 && <h5>view more</h5>}</u>
              </div>
            </Link>
            {/*inside loop whole div*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
