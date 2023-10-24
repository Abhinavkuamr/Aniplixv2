import React from 'react';
import './stylesheet/homescreen.css';
import Nav from '../Component/Nav';
import Banner from '../Component/Banner';
import Row from '../Component/Row';

export default function HomeScreen() {
  return (
    <div className='homescreen'>
      <Banner />

      <Row
        title='ANIME TRENDING'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/trending?perPage=10'
      />
      <Row
        title='ANIME POPULAR'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/popular?perPage=10'
      />
      <Row
        title='ANIME RECENT'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/recent?perPage=10'
      />

      {/*<Row 
      title='ANIME ACTION'
      fetchUrl='https://web-production-a8e9.up.railway.app/genre/action'
  />*/}
    </div>
  );
}
