import React, { useEffect, useState } from 'react';
import './Stylesheet/banner.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Page/Loading';

function Banner() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        'https://aniplix-scraper.vercel.app/meta/anilist/popular?perPage=500'
      );
      setAnime(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }

  const navigate = useNavigate();
  function handleClicks(id, title) {
    console.log('CLICK', id);
    navigate(`/info/${title.split(' ').join('-')}-${id}`);
  }
  function handlePlayClicks(id, title) {
    navigate(`/watch/${title.split(' ').join('-')}-${id}`);
  }
  if (loading) {
    return <Loading />;
  }
  if (anime?.cover === undefined || anime?.id === 97940) {
    window.location.reload();
  }
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${anime?.cover})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {anime?.title?.english ||
            anime?.title?.romaji ||
            anime?.title?.userPreferred}
        </h1>
        <div className='banner__buttons'>
          <button
            onClick={() => handlePlayClicks(anime?.id, anime?.title?.romaji)}
            className='banner_button'
          >
            Play
          </button>
          <button
            className='banner_button'
            onClick={() => handleClicks(anime?.id, anime?.title?.romaji)}
          >
            Info
          </button>
        </div>
        <h1 className='banner__description'>
          {truncate(`${anime?.description}`, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
