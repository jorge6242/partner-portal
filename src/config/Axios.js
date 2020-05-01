import axios from 'axios';

//'http://portal.api.com
//'http://localhost:8000
//'http://localhost/api/portalsocios
//http://190.216.224.53/api/portalsocios/
//http://192.168.0.251/api/portalsocios/
//http://190.216.224.53/api/portalsocios/public/


//http://192.168.0.252:9001/

//http://190.216.224.53:8081

//192.168.0.252:9001

const BASE_URL = window.BASE_URL;
console.log('window.BASE_URL ', window.BASE_URL);
const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Partners-Application': 'portal'
  },
  timeout: 100000,
});

export default AXIOS;