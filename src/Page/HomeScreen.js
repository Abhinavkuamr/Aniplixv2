import React, { useEffect, useState } from 'react';
import './stylesheet/homescreen.css';
import Nav from '../Component/Nav';
import Banner from '../Component/Banner';
import Row from '../Component/Row';
import toast, { Toaster } from 'react-hot-toast';

export default function HomeScreen() {
  const [showToasts, setShowToasts] = useState(false);
  const notify = () =>
    toast(
      'Website is going under Maintenance. Sorry for Inconvenience'
    );

  const notify2 = () =>
    toast(
      'Aniplix v3.0 will be deployed soon. (fixing all the issues) Sorry for the Inconvenience. :)'
    );

  useEffect(() => {
    const hasShownToasts = localStorage.getItem('shownToasts');
    const lastToastTime = localStorage.getItem('lastToastTime');

    // Check if toasts have not been shown or if it's been more than 1 hour since the last toast
    if (
      !hasShownToasts ||
      (lastToastTime && Date.now() - lastToastTime > 3600000)
    ) {
      //notify();
      //setShowToasts(true);

      // Store in local storage to remember that toasts have been shown and update the last toast time
      localStorage.setItem('shownToasts', 'true');
      localStorage.setItem('lastToastTime', Date.now().toString());
    }
  }, []);
  return (
    <div className='homescreen'>
      <div>
        <Toaster />
      </div>
      <Banner />
      <div>
        <Row
          title='Recent uploads'
          fetchUrl='https://aniplix-scraper.vercel.app/anime/gogoanime/recent-episodes'
          provider='gogoanime'
        />
        <Row
          title='Trending Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/trending?perPage=100'
          provider='anilist'
        />
        <Banner />

        <Row
          title='Popular Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/popular?perPage=100'
          provider='anilist'
        />

        <Row
          title='Slice of Life Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Slice of Life%22]'
          provider='anilist'
        />
        <Banner />

        <Row
          title='Romance Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Romance%22]'
          provider='anilist'
        />

        <Row
          title='Psychological Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Psychological%22]'
          provider='anilist'
        />
        <Banner />

        <Row
          title='Action Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Action%22]'
          provider='anilist'
        />

        <Row
          title='Supernatural Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Supernatural%22]'
          provider='anilist'
        />
        <Banner />

        <Row
          title='Adventure Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Adventure%22]'
          provider='anilist'
        />

        <Row
          title='Sci-Fi Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Sci-Fi%22]'
          provider='anilist'
        />
        <Banner />

        <Row
          title='Comedy Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Comedy%22]'
          provider='anilist'
        />

        <Row
          title='Fantasy Anime'
          fetchUrl='https://aniplix-scraper.vercel.app/meta/anilist/advanced-search?genres=[%22Fantasy%22]'
          provider='anilist'
        />
      </div>

      {/*<Row 
      title='ANIME ACTION'
      fetchUrl='https://web-production-a8e9.up.railway.app/genre/action'
  />*/}
    </div>
  );
}
