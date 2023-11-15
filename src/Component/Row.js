import React, { useEffect, useState } from 'react';
import './Stylesheet/row.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwipeButton from './SwipeButton';
import Loading from '../Page/Loading';

function Row({ title, fetchUrl, provider }) {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedProvider, setProvider] = useState('');
  useEffect(() => {
    setProvider(provider);
    let request = '';
    async function fetchData() {
      try {
        request = await axios.get(fetchUrl);
      } catch (err) {
        useNavigate.navigate('/wrong-page-mate');
      }
      setAnime(request.data.results);
      setLoading([false]);
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
      <div className='row__posters' data-aos='slide-right' data-aos-once='true'>
        <Swiper
          modules={[Navigation, Scrollbar]}
          Scrollbar={{ draggable: true }}
          breakpoints={{
            // when window width is >= 640px
            200: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 7,
            },
          }}
        >
          {anime.map(
            (anime) =>
              anime.image &&
              anime.id != 21 && (
                <SwiperSlide>
                  <Link
                    onClick={() => setLoading(true)}
                    to={`${
                      selectedProvider === 'gogoanime'
                        ? `/info/${anime.title}?provider=gogoanime&ep=${anime.episodeId}&id=${anime.id}`
                        : `/info/${anime.title.romaji.split(' ').join('-')}-${
                            anime.id
                          }?provider=anilist`
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
                            `${
                              selectedProvider === 'gogoanime'
                                ? anime.title
                                : anime.title.english || anime.title.romaji
                            }`,
                            30
                          )}
                        </p>
                      }
                    </div>
                  </Link>
                </SwiperSlide>
              )
          )}
          <SwipeButton></SwipeButton>
        </Swiper>
      </div>
    </div>
  );
}

export default Row;
