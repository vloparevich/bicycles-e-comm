import axios from 'axios';
import * as USER_HELPERS from '../utils/userToken';
import { internalServerError } from './utils.service';

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

export function generateManagerToken(credentials) {
  return authService
    .post('/generate-manager-token', credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function login(credentials) {
  return authService
    .post('/login', credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn() {
  return authService
    .get(`session`, {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  return authService
    .post('/signup', credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return authService
    .delete('/logout', {
      headers: {
        Authorization: USER_HELPERS.getUserToken(),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}
