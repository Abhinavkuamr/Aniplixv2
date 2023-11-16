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
      const rand = Math.floor(Math.random() * request.data.results.length - 4);
      const banner_toShow = request.data.results[rand];

      if (
        banner_toShow === undefined ||
        banner_toShow.id === '21' ||
        banner_toShow.id === '97940'
      ) {
        const request = await axios.get(
          'https://aniplix-scraper.vercel.app/meta/anilist/info/145064'
        );
        setAnime(request.data);
      } else {
        setAnime(banner_toShow);
      }

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
    navigate(`/info/${title.split(' ').join('-')}-${id}?provider=anilist`);
  }
  function handlePlayClicks(id, title) {
    navigate(`/watch/${title.split(' ').join('-')}-${id}?provider=anilist`);
  }
  if (loading) {
    return <Loading />;
  }
  if (anime?.cover === undefined) {
    window.location.reload();
  }
  return (
    <header
      data-aos='fade-down'
      data-aos-once='true'
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${anime?.cover})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner--fadeUP' />
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {anime?.title?.english ||
            anime?.title?.romaji ||
            anime?.title?.userPreferred}
        </h1>
        <div className='banner__buttons'>
          {/*<button
            onClick={() => handlePlayClicks(anime?.id, anime?.title?.romaji)}
            className='banner_button'
          >
            Play
          </button>*/}
          <button
            className='banner_button'
            onClick={() => handleClicks(anime?.id, anime?.title?.romaji)}
          >
            Watch <i class='fa-solid fa-eye fa-beat-fade'></i>
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
