import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './stylesheet/animeplayer.css';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Loading from './Loading';

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
  const anime_id = location.pathname
    .split('/')
    .splice(-1)[0]
    .split('-')
    .splice(-1)[0]; //get the last part of path

  useEffect(() => {
    console.log(anime_id);
    async function fetchAnime() {
      const response = await axios.get(
        `https://aniplix-scraper.vercel.app/meta/anilist/info/${anime_id}`
      );
      setAnime(response.data);
      setLoading(false);
      if (response.data.episodes?.length > 0) {
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
    const response = await axios.get(
      `https://betaversion-git-main-abhinavkuamrs-projects.vercel.app/api/eplink?id=${ep_id}`
    );
    const ep_link = response.data.sources;
    console.log('here', ep_link[3]);
    SetCurrentEpisode(ep_link[3].url);
    console.log('Current episode', currentEpisode);
    if (iframeRef.current) {
      iframeRef.current.src = `https://plyr.link/p/player.html#${window.btoa(
        ep_link[3].url ||
          ep_link[4].url ||
          ep_link[2].url ||
          ep_link[1].url ||
          ep_link[5].url
      )}`;
    }

    setSelectedEpisode(ep_id);
  }
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = anime?.episodes?.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className='animeplayer'
        style={{
          backgroundImage: `url(${anime?.cover})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div className='animeplayer__veil' />
        {/*<div className='animeplayer__pagination_episode'> </div>*/}

        <div className='animeplayer__pagination'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
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
            Next
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
                    selectedEpisode === episode_id.id
                      ? 'crimson'
                      : 'rgba(51, 51, 51, 0.5)',
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
        <h1>Recommendations</h1>
        <div className='animeplayer__row__posters'>
          {anime?.recommendations?.map(
            (anime) =>
              anime.image && (
                <Link
                  to={`/info/${anime.title.romaji.split(' ').join('-')}-${
                    anime.id
                  }`}
                >
                  <img
                    className={`animeplayer__row__poster`}
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

export default AnimePlayer;
