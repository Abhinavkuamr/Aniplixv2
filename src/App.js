import React from 'react';
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

function App() {
  return (
    <>
      <div className='app'>
        <Nav></Nav>

        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/info/:animeTitle' element={<AnimeInfo />} />
          <Route path='/watch/:animeTitle' element={<AnimePlayer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
