import React, { useEffect, useState } from 'react';
import './Stylesheet/row.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwipeButton from './SwipeButton';

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
