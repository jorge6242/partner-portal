import axios from 'axios';

//'http://club.api.com

const AXIOS = axios.create({
  baseURL: 'http://portal.api.com',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 20000,
});

export default AXIOS;