import axios from 'axios';

//'http://portal.api.com

const AXIOS = axios.create({
  baseURL: 'http://portal.api.com',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 100000,
});

export default AXIOS;