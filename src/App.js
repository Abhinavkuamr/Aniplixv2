import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Page/HomeScreen';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from 'react-router-dom';
import AnimeInfo from './Page/AnimeInfo';
import AnimePlayer from './Page/AnimePlayer';
import Nav from './Component/Nav';
import Loading from './Page/Loading';
import NotFound from './Page/NotFound';
import Search from './Page/Search';
import { Analytics } from '@vercel/analytics/react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className='app'>
        <Analytics />
        <Nav></Nav>

        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/info/:animeTitle' element={<AnimeInfo />} />
          <Route path='/watch/:animeTitle' element={<AnimePlayer />} />
          <Route path='/search/:searchTerm' element={<Search />} />
          {/*Testing purpose Loading screen [remove it]*/}
          <Route path='/loading' element={<Loading />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
