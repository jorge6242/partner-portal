import axios from 'axios';

//'http://club.api.com

const AXIOS = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 100000,
});

export default AXIOS;