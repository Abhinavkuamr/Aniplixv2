import React, { useEffect, useState } from 'react';
import './stylesheet/AnimeInfo.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import bkg from './static/steaming.jpg';
import Row from '../Component/Row';

function AnimeInfo() {
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const urlsearchParam = new URLSearchParams(location.search);
  const queryParam = {};
  const validGenres = [
    'Action',
    'Adventure',
    'Cars',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mahou Shoujo',
    'Mecha',
    'Music',
    'Mystery',
    'Psychological',
    'Romance',
    'Sci-Fi',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller',
  ];
  for (const [key, value] of urlsearchParam.entries()) {
    queryParam[key] = value;
  }
  let anime_id = '';

  console.log(queryParam.id === '16bit-sensation-another-layer');
  if (queryParam.id === 'jujutsu-kaisen-2nd-season') {
    anime_id = 'jujutsu-kaisen-tv-2nd-season';
  }
  if (queryParam.id === '16bit-sensation-another-layer') {
    anime_id = '16bit-sensation';
  } else {
    if (queryParam.provider === 'gogoanime') {
      anime_id = queryParam.id;
    } else {
      anime_id = location.pathname
        .split('/')
        .splice(-1)[0]
        .split('-')
        .splice(-1)[0]; //get the last part of path
    }
  }

  useEffect(() => {
    console.log(anime_id);
    window.scrollTo(0, 0);
    async function fetchAnime() {
      let response = '';
      try {
        if (queryParam.provider === 'gogoanime') {
          response = await axios.get(
            `https://aniplix-scraper.vercel.app/anime/gogoanime/info/${anime_id}`
          );
        } else {
          response = await axios.get(
            `https://aniplix-scraper.vercel.app/meta/anilist/info/${anime_id}`
          );
        }
      } catch (err) {
        navigate('/wrong-page-mate');
      }

      setAnime(response.data);
      setLoading(false);
    }

    setLoading(true); //whenever URL changes

    const handlePopstate = () => {
      // If the user navigates back, set loading to true
      setLoading(true);
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopstate);
    fetchAnime();
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [anime_id, queryParam.provider, location]);
  //console.log(anime.image);
  const navigate = useNavigate();
  function handlePlayClicks(first_episode, id, title, provider) {
    if (provider === 'gogoanime') {
      navigate(
        `/watch/${title
          .split(' ')
          .join('-')}-${id}?provider=gogoanime&id=${id}&episode=${
          queryParam.ep || null
        }`
      );
    } else {
      console.log('GGGGGGGGGGG', first_episode);
      navigate(
        `/watch/${title
          .split(' ')
          .join('-')}-${id}?provider=anilist&episode=${first_episode}`
      );
    }
  }
  if (loading) {
    return <Loading />;
  }
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }
  return (
    <>
      {console.log(anime)}
      <div
        data-aos='fade-down'
        data-aos-once='true'
        className='animeinfo'
        style={{
          backgroundImage: `url(${
            queryParam.provider === 'gogoanime' ? bkg : anime?.cover
          })`,
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
              {queryParam.provider === 'gogoanime'
                ? anime.title
                : anime?.title?.english ||
                  anime?.title?.romaji ||
                  anime?.title?.native}
            </h1>
            <button
              className='animeinfo__button'
              onClick={() =>
                handlePlayClicks(
                  anime?.episodes[0].id,
                  anime?.id,
                  queryParam.provider === 'gogoanime'
                    ? anime?.title
                    : anime?.title?.romaji,
                  queryParam.provider
                )
              }
            >
              Play Now
            </button>
            <div className='animeinfo__des'>
              <p>{anime?.description}</p>
            </div>

            <h4>Status: {anime?.status}</h4>
            <h4>Released: {anime?.releaseDate}</h4>
            <h4>Total episodes: {anime?.totalEpisodes}</h4>
            {queryParam.provider === 'gogoanime' ? (
              <h4>Type: {anime?.type}</h4>
            ) : (
              <h4>Studio: {anime?.studios}</h4>
            )}
            <h4>Genre: {anime?.genres?.join(', ')}</h4>
          </div>
        </div>
      </div>

      <div className='animeinfo__row'>
        {
          <>
            {queryParam.provider === 'gogoanime' ? (
              <>
                {
                  <div data-aos='slide-right' data-aos-once='true'>
                    <Row
                      title='Recommendation'
                      fetchUrl={`https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[${validGenres
                        .filter((genre) => anime?.genres.includes(genre))
                        ?.map((genre) => `"${genre}"`)
                        .join(', ')}]`}
                      provider='anilist'
                    />
                  </div>
                }
                <Row
                  title='Trending Anime'
                  fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/trending?perPage=100'
                  provider='anilist'
                />
              </>
            ) : (
              <>
                {' '}
                <h1>Recommendations</h1>
                <div className='animeinfo__row__posters'>
                  {anime?.recommendations?.map(
                    (anime) =>
                      anime.image && (
                        <Link
                          to={`/info/${anime.title.romaji
                            .split(' ')
                            .join('-')}-${anime.id}`}
                          onClick={() => setLoading(true)}
                        >
                          <div className='animeinfo__poster-container'>
                            <img
                              className={`row__poster`}
                              key={anime.id}
                              src={anime.image}
                            ></img>
                            {
                              <p className='animeinfo__overlay-text'>
                                {truncate(
                                  `${
                                    anime.title.english || anime.title.romaji
                                  }`,
                                  20
                                )}
                              </p>
                            }
                          </div>
                        </Link>
                      )
                  )}
                </div>{' '}
              </>
            )}
          </>
        }
      </div>
    </>
  );
}

export default AnimeInfo;
