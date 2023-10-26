import React, { useEffect, useState } from 'react';
import './Stylesheet/row.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Row({ title, fetchUrl }) {
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setAnime(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(anime);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }
  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row__posters'>
        {anime.map(
          (anime) =>
            anime.image && (
              <Link
                to={`/info/${anime.title.romaji.split(' ').join('-')}-${
                  anime.id
                }`}
              >
                <div className='row__poster-container'>
                  <img
                    className={`row__poster`}
                    key={anime.id}
                    src={anime.image}
                  ></img>
                  {
                    <p className='overlay-text'>
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
  );
}

export default Row;
