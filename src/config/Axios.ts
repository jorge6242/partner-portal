import axios from 'axios';

//'http://portal.api.com
//'http://localhost:8000
//'http://localhost/api/portalsocios

const AXIOS = axios.create({
  baseURL: 'http://localhost/api/portalsocios',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 100000,
});

export default AXIOS;