import React, { useState } from 'react';
import './stylesheet/search.css';
import { useLocation, Link } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const anime = location.state.suggestions;
  return (
    <div className='searchpage'>
      <div className='searchpage__contents'>
        <h2 className='searchpage__h5'>Search contents</h2>
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
                    <div className='poster-container'>
                      <img
                        className='searchpage__row__poster'
                        src={anime.image}
                        alt={anime.title.english || anime.title.romaji}
                      />
                      <p className='poster-text'>
                        {anime.title.english || anime.title.romaji}
                      </p>
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
