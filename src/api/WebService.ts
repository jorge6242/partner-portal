import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getStatusAccount() {
    return AXIOS.get(`${Prefix.api}/status-account`, { 
        headers: headers() 
    });
  },
  getUnpaidInvoices() {
    return AXIOS.get(`${Prefix.api}/get-unpaid-invoices`, { 
        headers: headers() 
    });
  },
  getReportedPayments() {
    return AXIOS.get(`${Prefix.api}/get-reported-payments`, { 
        headers: headers() 
    });
  },
  getBalance() {
    return AXIOS.get(`${Prefix.api}/get-balance`, { 
        headers: headers() 
    });
  },
  setOrder(data: object) {
    return AXIOS.get(`${Prefix.api}/set-order`, {
        params: {
          ...data
        },
        headers: headers() 
    });
  },
};

export default API;
