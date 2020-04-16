import axios from 'axios';

//'http://portal.api.com
//'http://localhost:8000
//'http://localhost/api/portalsocios
//http://190.216.224.53/api/portalsocios/
//http://192.168.0.251/api/portalsocios/
//http://190.216.224.53/api/portalsocios/public/

const AXIOS = axios.create({
  baseURL: 'http://190.216.224.53/api/portalsocios/public',
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 100000,
});

export default AXIOS;