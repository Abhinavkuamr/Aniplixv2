import React, { useState } from 'react';
import './stylesheet/search.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  if (
    location.state === null &&
    location.pathname.split('/').splice(-1)[0] != null
  ) {
    console.log(location.pathname.split('/').splice(-1)[0]);
    window.location.href = '/wrong-page-mate';
  }
  const anime = location.state?.suggestions;
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }
  return (
    <div className='searchpage'>
      <div className='searchpage__contents'>
        <h2 className='searchpage__h5'>Search Results</h2>
        <div className='searchpage__row'>
          <div className='searchpage__row__posters'>
            {anime.map(
              (anime) =>
                anime.image && (
                  <Link
                    to={`/info/${anime.title.romaji.split(' ').join('-')}-${
                      anime.id
                    }`}
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
                          {truncate(
                            `${anime.title.english || anime.title.romaji}`,
                            20
                          )}
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
