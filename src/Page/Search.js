import React, { useEffect, useState } from 'react';
import './stylesheet/search.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anime, setAnime] = useState([]);

  const urlsearchParam = new URLSearchParams(location.search);
  const queryParam = {};
  for (const [key, value] of urlsearchParam.entries()) {
    queryParam[key] = value;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchAnime(search) {
      try {
        const response = await axios.get(
          `https://betaversion.vercel.app/api/search?id=${search}`
        );
        setAnime(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAnime(queryParam.search);
  }, [queryParam.search]);
  const closeSuggestions = () => {
    const search = document.querySelector('.search');
    search.classList.remove('active');
  };
  function onSubmit(e) {
    e.preventDefault();
    closeSuggestions();
  }

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }
  return (
    <div className='searchpage'>
      <div className='searchpage__contents'>
        <h2 className='searchpage__h5'>Search Results</h2>
        <div className='searchpage__row'>
          <div className='searchpage__row__posters'>
            {anime?.map(
              (anime) =>
                anime.image && (
                  <Link
                    to={`/info/${anime.title}?provider=gogoanime&id=${anime.id}`}
                    key={anime.id}
                    style={{ color: 'white' }}
                  >
                    <div className='searchpage__poster-container'>
                      <img
                        className={`searchpage__row__poster`}
                        key={anime.id}
                        src={anime.image}
                      ></img>
                      {
                        <p className='searchpage__overlay-text'>
                          {truncate(`${anime.title}`, 30)}
                        </p>
                      }
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
