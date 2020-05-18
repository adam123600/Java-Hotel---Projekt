import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL1 = '/api/test/';
const API_URL = '/api/users/';

class UserService {
  getUserById(id) {
    return axios.get(API_URL + id, {headers: authHeader()});
  }

  updatePasswordById(id, newPassword) {
    return axios.put(API_URL + id + '/change_password', newPassword, {headers: authHeader()});
  }


  getPublicContent() {
    return axios.get(API_URL1 + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL1 + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL1 + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL1 + 'admin', { headers: authHeader() });
  }
}

export default new UserService();