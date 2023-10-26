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
        title='Trending Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/trending?perPage=100'
      />
      <Row
        title='Popular Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/popular?perPage=100'
      />
      <Row
        title='Slice of Life Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Slice of Life%22]'
      />
      <Row
        title='Romance Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Romance%22]'
      />
      <Row
        title='Psychological Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Psychological%22]'
      />
      <Row
        title='Action Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Action%22]'
      />
      <Row
        title='Supernatural Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Supernatural%22]'
      />

      <Row
        title='Adventure Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Adventure%22]'
      />
      <Row
        title='Sci-Fi Anime'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Sci-Fi%22]'
      />
      <Row
        title='Comedy ANIME'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Comedy%22]'
      />
      <Row
        title='Fantasy ANIME'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Fantasy%22]'
      />

      <Row
        title='ANIME RECENT'
        fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/recent?perPage=100'
      />

      {/*<Row 
      title='ANIME ACTION'
      fetchUrl='https://web-production-a8e9.up.railway.app/genre/action'
  />*/}
    </div>
  );
}
