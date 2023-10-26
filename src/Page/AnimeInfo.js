import React, { useEffect, useState } from 'react';
import './stylesheet/AnimeInfo.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

function AnimeInfo() {
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const anime_id = location.pathname
    .split('/')
    .splice(-1)[0]
    .split('-')
    .splice(-1)[0]; //get the last part of path

  useEffect(() => {
    console.log(anime_id);
    window.scrollTo(0, 0);
    async function fetchAnime() {
      const response = await axios.get(
        `https://aniplix-scraper.vercel.app/meta/anilist/info/${anime_id}`
      );
      setAnime(response.data);
      setLoading(false);
    }
    fetchAnime();
  }, [anime_id]);
  console.log(anime.image);
  const navigate = useNavigate();
  function handlePlayClicks(id, title) {
    navigate(`/watch/${title.split(' ').join('-')}-${id}`);
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div
        className='animeinfo'
        style={{
          backgroundImage: `url(${anime?.cover})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div className='animeinfo__veil'></div>
        <div className='animeinfo__contents'>
          <img className='animeinfo__image' src={anime?.image} />
          <div className='animeinfo__texts'>
            <h1 className='animeinfo__text'>
              {anime?.title?.english ||
                anime?.title?.romaji ||
                anime?.title?.native}
            </h1>
            <button
              className='animeinfo__button'
              onClick={() => handlePlayClicks(anime?.id, anime?.title?.romaji)}
            >
              Play Now
            </button>
            <div className='animeinfo__des'>
              <p>{anime?.description}</p>
            </div>

            <h4>Status: {anime?.status}</h4>
            <h4>Released: {anime?.releaseDate}</h4>
            <h4>Total episodes: {anime?.totalEpisodes}</h4>
            <h4>Studio: {anime?.studios}</h4>
            <h4>Genre: {anime?.genres?.join(', ')}</h4>
          </div>
        </div>
      </div>
      <div className='animeinfo__row'>
        <h1>Recommendations</h1>
        <div className='animeinfo__row__posters'>
          {anime?.recommendations?.map(
            (anime) =>
              anime.image && (
                <Link
                  to={`/info/${anime.title.romaji.split(' ').join('-')}-${
                    anime.id
                  }`}
                  onClick={() => setLoading(true)}
                >
                  <img
                    className={`animeinfo__row__poster`}
                    key={anime.id}
                    src={anime.image}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default AnimeInfo;
