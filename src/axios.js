import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aniplix-scraper.vercel.app',
});

export default instance;
