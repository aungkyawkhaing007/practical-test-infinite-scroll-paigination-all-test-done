import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    credentials: 'include',
  },
});

export default api;