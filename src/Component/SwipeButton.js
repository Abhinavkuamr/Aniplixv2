import React from 'react';
import { useSwiper } from 'swiper/react';

export default function SwipeButton() {
  const swiper = useSwiper();
  return (
    <div className='swiper-nav-btns'>
      <button className='swiper-nav-btn' onClick={() => swiper.slidePrev()}>
        <i class='fa-solid fa-arrow-left'></i>
      </button>
      <button className='swiper-nav-btn' onClick={() => swiper.slideNext()}>
        <i class='fa-solid fa-arrow-right'></i>
      </button>
    </div>
  );
}
