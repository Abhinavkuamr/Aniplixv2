import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './stylesheet/animeplayer.css';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Row from '../Component/Row';
import bkg from './static/steaming.jpg';

function AnimePlayer() {
  const [anime, setAnime] = useState([]);
  const [currentEpisode, SetCurrentEpisode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // State for the selected episode
  const iframeRef = useRef(null);
  const episodesPerPage = 10; // Number of episodes to display per page
  let location = useLocation();
  const buttonRef = useRef(null); // Create a ref for the first button
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
  console.log(queryParam);
  let anime_id = '';
  console.log('CHECK CONDITION', queryParam.id);

  if (queryParam.provider === 'gogoanime') {
    //keep an EYE

    anime_id = queryParam.id;
  } else {
    anime_id = location.pathname
      .split('/')
      .splice(-1)[0]
      .split('-')
      .splice(-1)[0]; //get the last part of path
  }

  useEffect(() => {
    window.scrollTo(0, 50);
    console.log(anime_id);
    async function fetchAnime() {
      let response = '';
      try {
        if (queryParam.provider === 'gogoanime') {
          response = await axios.get(
            `https://aniplix-scraper.vercel.app/anime/gogoanime/info/${anime_id}`
          );
        } else {
          response = await axios.get(
            `https://aniplix-scraper.vercel.app/meta/anilist/info/${anime_id}?provider=gogoanime`
          );
        }
      } catch (err) {
        useNavigate.navigate('/wrong-page-mate');
      }

      setAnime(response.data);
      setLoading(false);
      if (queryParam.episode !== 'null') {
        console.log('EPISODE IS NOT NULL');
        handleButtonClick(queryParam.episode);
      } else if (response.data.episodes?.length > 0) {
        handleButtonClick(response.data.episodes[0].id);
      }
    }
    fetchAnime();
  }, [anime_id]);
  console.log(anime);
  useEffect(() => {
    // Simulate a click on the first button when the buttons are rendered

    if (buttonRef.current) {
      buttonRef.current?.click();
      // You can adjust the delay as needed
    }
  }, []);

  async function handleButtonClick(ep_id) {
    //create the final link
    if (iframeRef.current) {
      iframeRef.current.src = 'https://loadingscreen.vercel.app/';
    }
    let response = '';
    try {
      response = await axios.get(
        `https://betaversion.vercel.app/api/eplink?id=${ep_id}`
      );
    } catch (err) {
      useNavigate.navigate('/wrong-page-mate');
    }
    const ep_link = response.data.sources;
    //console.log('here', ep_link[3]);
    //SetCurrentEpisode(ep_link[3].url);
    //console.log('Current episode', currentEpisode);
    if (iframeRef.current) {
      console.log('ALL qualities', ep_link);
      iframeRef.current.src = `https://plyr.link/p/player.html#${window.btoa(
        ep_link[3]?.url ||
          ep_link[4]?.url ||
          ep_link[2]?.url ||
          ep_link[1]?.url ||
          ep_link[0]?.url ||
          ep_link[5]?.url
      )}`;
    }

    setSelectedEpisode(ep_id);
    // Check if anime and anime.episodes are defined
    if (anime && anime.episodes) {
      // Calculate the page number based on the clicked episode
      const episodeIndex = anime.episodes.findIndex(
        (episode) => episode.id === ep_id
      );
      if (episodeIndex !== -1) {
        const pageNumber = Math.floor(episodeIndex / episodesPerPage) + 1;
        setCurrentPage(pageNumber);
      }
    }
  }
  useEffect(() => {
    // Check if anime and anime.episodes are defined
    if (anime && anime.episodes) {
      // Calculate the page number based on the clicked episode
      const episodeIndex = anime.episodes.findIndex(
        (episode) => episode.id === selectedEpisode
      );
      if (episodeIndex !== -1) {
        const pageNumber = Math.floor(episodeIndex / episodesPerPage) + 1;
        setCurrentPage(pageNumber);
      }
    }
  }, [selectedEpisode, anime, episodesPerPage]);

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = anime?.episodes?.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );
  if (loading) {
    return <Loading />;
  }
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ' ...' : string;
  }

  return (
    <>
      <div
        className='animeplayer'
        style={{
          backgroundImage: `url(${
            queryParam.provider === 'gogoanime' ? bkg : anime?.cover
          })`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
        data-aos='fade-down'
        data-aos-once='true'
      >
        <div className='animeplayer__veil' />
        {/*<div className='animeplayer__pagination_episode'> </div>*/}

        <div className='animeplayer__pagination'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev List
          </button>
          <button
            onClick={() => {
              // Check if there are more episodes to display
              if (currentEpisodes.length === episodesPerPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentEpisodes.length < episodesPerPage}
          >
            Next List
          </button>
        </div>
        <div className='animeplayer__contents'>
          <div className='animeplayer__episodes'>
            {currentEpisodes?.map((episode_id, index) => (
              <button
                ref={(ref) => index === 0 && (buttonRef.current = ref)}
                key={episode_id}
                onClick={() => handleButtonClick(episode_id.id)}
                style={{
                  backgroundColor:
                    selectedEpisode === episode_id.id && 'crimson',
                }}
              >
                {episode_id.id}
              </button>
            ))}
          </div>
          <div className='animeplayer__iframe'>
            <iframe
              scrolling='no'
              ref={iframeRef}
              src={`https://loadingscreen.vercel.app/`}
              allowFullScreen
              width={'700px'}
              height={'438px'}
            />
          </div>
        </div>
        <div className='animeplayer--fadeBottom' />
      </div>

      <div className='animeplayer__row'>
        {
          <>
            {queryParam.provider === 'gogoanime' ? (
              <>
                {
                  <div>
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

export default AnimePlayer;
