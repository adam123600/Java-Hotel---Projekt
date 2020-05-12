import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/test/';
const API_URL_USERS='/api/users';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getManagerBoard(){
    return axios.get( API_URL + 'manager', { headers: authHeader() });
  }

  addNewUser(newWorker){
    return axios.post(API_URL_USERS, newWorker, {headers: authHeader()});
  }
}

export default new UserService();