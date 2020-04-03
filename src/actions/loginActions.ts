import Auth from '../api/Auth';
import AXIOS from '../config/Axios'
import SecureStorage from '../config/SecureStorage'
import snackBarUpdate from '../actions/snackBarActions';
import { ACTIONS } from '../interfaces/actionTypes/loginTypes';
import _ from 'lodash';
// import history from '../config/History';

export const login = (body: object) => async (dispatch: Function) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
        const {
            data,
            status
        } = await Auth.login(body);
        let authResponse: any = [];
        if (status === 200 || status === 201) {
            authResponse = {
                data,
                status
            };
            const { token, user } = data;
            const role = _.first(user.roles);
            const roles = user.roles;
            SecureStorage.setItem('token', token);
            dispatch({ type: ACTIONS.SET_LOADING, payload: false })
            dispatch({ type: ACTIONS.SET_USER, payload: {...user, role, roles} })
        }
        return authResponse;
    } catch (error) {
        let title = ''
        if (error.response) {
            const { status, data: { message } } = error.response
            if (status === 401) {
                title = message
            }
        }
        snackBarUpdate({
            payload: {
                message: title,
                status: true,
                type: 'error',
            },
        })(dispatch);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
        throw error;
    }
};

export const logout = () => ({ type: ACTIONS.LOGOUT })

export const checkLogin = () => async (dispatch: Function) => {
    try {
        const {
            data: { data },
            status
        } = await Auth.checkLogin();
        let checkLoginResponse = [];
        if (status === 200) {
            checkLoginResponse = data;
            const role = _.first(data.user.roles);
            const roles = data.user.roles;
            dispatch({ type: ACTIONS.SET_USER, payload: { ...data, role, roles } })
        }
        return checkLoginResponse;
    } catch (error) {
        return error;
    }
};

export function setupInterceptors() {
      AXIOS.interceptors.response.use(
        response => {
          return response;
        },
        error => {
        if (error.response && error.response.status === 401) {
            // if(history.location.hash !== '' && history.location.hash !== '#/' && error.response.data.message === "Unauthenticated.") {
            //     window.location.href = '/';
            // }
          }
          return Promise.reject(error);
        },
      );
  }


  export const setForcedLogin = (socio: any, token:any) => async (dispatch: Function) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
  try {
    const { data, status } = await Auth.forcedLogin(socio, token);
    let response = [];
    if (status === 200) {
      response = data;
      SecureStorage.setItem('token', data.token);
      const role = _.first(data.user.roles);
      const roles = data.user.roles;
      dispatch({ type: ACTIONS.SET_USER, payload: { ...data, role, roles } })
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
    return response;
  } catch (error) {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
   
    return error;
  }
};
  
